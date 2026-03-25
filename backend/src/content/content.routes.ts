import { Router } from 'express'
import * as path from 'path'
import * as fs from 'fs'
import { PrismaClient } from '@prisma/client'
import { ContentService } from './content.service'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'

const router = Router()
const contentService = new ContentService()
const prisma = new PrismaClient()

// Base path for local PDFs (relative to project root)
const PUBLIC_PATH = path.resolve(__dirname, '../../../public')

// Allowed file extensions for served files
const ALLOWED_EXTENSIONS = new Set(['.pdf'])

// GET /api/content/files/:slug/:filename - Serve local PDF files (protected)
// Accepts token via Authorization header OR ?token= query param (needed for iframes)
router.get('/files/:slug/:filename', async (req: AuthRequest, res) => {
  try {
    // Accept token from header or query param
    const authHeader = req.headers.authorization
    const token = (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null)
      || (req.query.token as string)

    if (!token) {
      res.status(401).json({ error: 'Missing token' })
      return
    }

    const { verifyToken } = await import('../common/utils/jwt')
    const payload = verifyToken(token)
    if (!payload) {
      res.status(401).json({ error: 'Invalid or expired token' })
      return
    }

    const { slug, filename } = req.params

    // Security: prevent path traversal
    const safeName = path.basename(filename)
    const safeSlug = path.basename(slug)

    // Security: only allow whitelisted file extensions
    const ext = path.extname(safeName).toLowerCase()
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      res.status(403).json({ error: 'File type not allowed' })
      return
    }

    const filePath = path.join(PUBLIC_PATH, 'cursos', safeSlug, safeName)

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'File not found' })
      return
    }

    // Security: verify enrollment (admins bypass)
    if (payload.role !== 'ADMIN') {
      const course = await prisma.course.findUnique({
        where: { slug: safeSlug },
        select: { id: true },
      })

      if (!course) {
        res.status(403).json({ error: 'Access denied' })
        return
      }

      const enrollment = await prisma.studentCourse.findUnique({
        where: {
          studentId_courseId: {
            studentId: payload.userId,
            courseId: course.id,
          },
        },
      })

      if (!enrollment || !enrollment.isActive) {
        res.status(403).json({ error: 'Access denied: not enrolled in this course' })
        return
      }
    }

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${safeName}"`)
    res.sendFile(filePath)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/content/lessons/:lessonId - Get lesson with contents (protected)
router.get('/lessons/:lessonId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const lesson = await contentService.getLesson(
      req.params.lessonId,
      req.user!.id,
      req.user!.role
    )
    res.json(lesson)
  } catch (error: any) {
    if (error.message.includes('Access denied')) {
      res.status(403).json({ error: error.message })
    } else if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

// GET /api/content/:contentId/download - Get signed download URL (protected)
router.get('/:contentId/download', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const url = await contentService.getSignedDownloadUrl(
      req.params.contentId,
      req.user!.id,
      req.user!.role
    )
    res.json({ url, expiresIn: 3600 })
  } catch (error: any) {
    if (error.message.includes('Access denied')) {
      res.status(403).json({ error: error.message })
    } else if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

// POST /api/content/:contentId/track-view - Track content view (protected)
router.post('/:contentId/track-view', authMiddleware, async (req: AuthRequest, res) => {
  try {
    await contentService.trackView(req.params.contentId, req.user!.id, req.user!.role)
    res.json({ message: 'View tracked successfully' })
  } catch (error: any) {
    if (error.message.includes('Access denied')) {
      res.status(403).json({ error: error.message })
    } else if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

export default router
