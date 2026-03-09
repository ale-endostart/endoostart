import { Router } from 'express'
import { z } from 'zod'
import { StudentsService } from './students.service'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { validateRequest } from '../common/middleware/validate.middleware'
import { PrismaClient } from '@prisma/client'

const router = Router()
const studentsService = new StudentsService()
const prisma = new PrismaClient()

// Validation schemas
const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  state: z.string().optional(),
})

// GET /api/students/profile - Get student profile (protected)
router.get('/profile', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const profile = await studentsService.getProfile(req.user!.id)
    res.json(profile)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/students/profile - Update student profile (protected)
router.put('/profile', authMiddleware, validateRequest(updateProfileSchema), async (req: AuthRequest, res) => {
  try {
    const profile = await studentsService.updateProfile(req.user!.id, req.body)
    res.json(profile)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/students/courses - Get enrolled courses (protected)
router.get('/courses', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const courses = await studentsService.getCourses(req.user!.id)
    res.json(courses)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/students/progress - Get overall progress (protected)
router.get('/progress', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const progress = await studentsService.getProgress(req.user!.id)
    res.json(progress)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/students/lessons/:lessonId/complete - Mark lesson as complete
router.post('/lessons/:lessonId/complete', authMiddleware, async (req: AuthRequest, res) => {
  try {
    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.lessonId },
    })

    if (!lesson) {
      res.status(404).json({ error: 'Lesson not found' })
      return
    }

    const completion = await prisma.lessonCompletion.upsert({
      where: {
        studentId_lessonId: {
          studentId: req.user!.id,
          lessonId: req.params.lessonId,
        },
      },
      update: {
        completedAt: new Date(),
      },
      create: {
        studentId: req.user!.id,
        lessonId: req.params.lessonId,
      },
    })

    res.json(completion)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /api/students/lessons/:lessonId/complete - Unmark lesson completion
router.delete('/lessons/:lessonId/complete', authMiddleware, async (req: AuthRequest, res) => {
  try {
    await prisma.lessonCompletion.delete({
      where: {
        studentId_lessonId: {
          studentId: req.user!.id,
          lessonId: req.params.lessonId,
        },
      },
    })

    res.json({ message: 'Lesson completion removed' })
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Completion record not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// GET /api/students/courses/:courseId/completions - Get completed lesson IDs for a course
router.get('/courses/:courseId/completions', authMiddleware, async (req: AuthRequest, res) => {
  try {
    // Get all lesson IDs for this course, then find which ones are completed
    const completions = await prisma.lessonCompletion.findMany({
      where: {
        studentId: req.user!.id,
        lesson: {
          module: {
            courseId: req.params.courseId,
          },
        },
      },
      select: {
        lessonId: true,
        completedAt: true,
      },
    })

    res.json({
      courseId: req.params.courseId,
      completedLessonIds: completions.map((c) => c.lessonId),
      completions,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
