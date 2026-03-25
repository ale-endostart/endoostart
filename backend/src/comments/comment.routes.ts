import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'

const router = Router()
const prisma = new PrismaClient()

// Helper: verify a user is enrolled in the course that contains a given lesson
async function verifyLessonEnrollment(userId: string, lessonId: string, role: string): Promise<boolean> {
  if (role === 'ADMIN') return true
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { select: { courseId: true } } },
  })
  if (!lesson) return false
  const enrollment = await prisma.studentCourse.findUnique({
    where: { studentId_courseId: { studentId: userId, courseId: lesson.module.courseId } },
  })
  return !!(enrollment && enrollment.isActive)
}

// GET /api/comments/lesson/:lessonId - Get comments for a lesson
router.get('/lesson/:lessonId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const hasAccess = await verifyLessonEnrollment(
      req.user!.id,
      req.params.lessonId,
      req.user!.role
    )
    if (!hasAccess) {
      res.status(403).json({ error: 'Access denied: not enrolled in this course' })
      return
    }

    const comments = await prisma.comment.findMany({
      where: { lessonId: req.params.lessonId, parentId: null },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
        replies: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json(comments)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /api/comments - Create a comment
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { lessonId, content, parentId } = req.body
    if (!lessonId || !content) {
      res.status(400).json({ error: 'lessonId and content are required' })
      return
    }

    const hasAccess = await verifyLessonEnrollment(req.user!.id, lessonId, req.user!.role)
    if (!hasAccess) {
      res.status(403).json({ error: 'Access denied: not enrolled in this course' })
      return
    }

    const comment = await prisma.comment.create({
      data: {
        lessonId,
        userId: req.user!.id,
        content: String(content).slice(0, 5000), // limit comment length
        parentId: parentId || null,
      },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
    })
    res.status(201).json(comment)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PUT /api/comments/:commentId/resolve - Toggle resolved (admin only)
router.put('/:commentId/resolve', authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Admin only' })
      return
    }
    const comment = await prisma.comment.findUnique({ where: { id: req.params.commentId } })
    if (!comment) { res.status(404).json({ error: 'Comment not found' }); return }
    const updated = await prisma.comment.update({
      where: { id: req.params.commentId },
      data: { isResolved: !comment.isResolved },
    })
    res.json(updated)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// DELETE /api/comments/:commentId - Delete comment (owner or admin)
router.delete('/:commentId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: req.params.commentId } })
    if (!comment) { res.status(404).json({ error: 'Comment not found' }); return }
    if (comment.userId !== req.user!.id && req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized' })
      return
    }
    await prisma.comment.delete({ where: { id: req.params.commentId } })
    res.json({ message: 'Comment deleted' })
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/comments/admin/all - Get all comments for admin (with lesson/course info)
router.get('/admin/all', authMiddleware, async (req: AuthRequest, res) => {
  try {
    if (req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Admin only' })
      return
    }
    const resolved = req.query.resolved as string | undefined
    const whereClause: any = { parentId: null }
    if (resolved === 'true') whereClause.isResolved = true
    if (resolved === 'false') whereClause.isResolved = false

    const comments = await prisma.comment.findMany({
      where: whereClause,
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, role: true } },
        lesson: {
          select: {
            id: true, name: true,
            module: { select: { id: true, name: true, course: { select: { id: true, name: true } } } },
          },
        },
        replies: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, role: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json(comments)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
