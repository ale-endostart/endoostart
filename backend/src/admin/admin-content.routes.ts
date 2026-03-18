import { Router } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { adminMiddleware } from '../common/middleware/admin.middleware'
import { validateRequest } from '../common/middleware/validate.middleware'

const router = Router()
const prisma = new PrismaClient()
const upload = multer() // para parsear multipart/form-data sem arquivos

// Validation schemas
const updateContentSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(['PDF', 'VIDEO', 'TEXT', 'LINK']).optional(),
  url: z.string().optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
})

// POST /api/admin/lessons/:lessonId/content - Create content with URL
// upload.none() parseia multipart/form-data sem arquivos (campos de texto)
router.post('/lessons/:lessonId/content', authMiddleware, adminMiddleware, upload.none(), async (req: AuthRequest, res) => {
  try {
    // Verify lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.lessonId },
    })

    if (!lesson) {
      res.status(404).json({ error: 'Lesson not found' })
      return
    }

    const { title, description, type, url, order } = req.body || {}

    if (!title || !type) {
      res.status(400).json({ error: 'title and type are required' })
      return
    }

    const validTypes = ['PDF', 'VIDEO', 'TEXT', 'LINK']
    if (!validTypes.includes(type)) {
      res.status(400).json({ error: `type must be one of: ${validTypes.join(', ')}` })
      return
    }

    if ((type === 'PDF' || type === 'VIDEO' || type === 'LINK') && !url) {
      res.status(400).json({ error: 'URL e obrigatoria para conteudo do tipo PDF, VIDEO ou LINK' })
      return
    }

    // Auto-assign order if not provided
    let contentOrder = order ? parseInt(order, 10) : undefined
    if (contentOrder === undefined || isNaN(contentOrder)) {
      const lastContent = await prisma.content.findFirst({
        where: { lessonId: req.params.lessonId },
        orderBy: { order: 'desc' },
        select: { order: true },
      })
      contentOrder = lastContent ? lastContent.order + 1 : 0
    }

    const content = await prisma.content.create({
      data: {
        lessonId: req.params.lessonId,
        title,
        description: description || '',
        type,
        url: url || '',
        order: contentOrder,
      },
    })

    res.status(201).json(content)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/admin/content/:contentId - Update content metadata
router.put('/content/:contentId', authMiddleware, adminMiddleware, validateRequest(updateContentSchema), async (req: AuthRequest, res) => {
  try {
    const content = await prisma.content.update({
      where: { id: req.params.contentId },
      data: req.body,
    })

    res.json(content)
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Content not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// DELETE /api/admin/content/:contentId - Delete content (hard delete)
router.delete('/content/:contentId', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    await prisma.content.delete({
      where: { id: req.params.contentId },
    })

    res.json({ message: 'Content deleted' })
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Content not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

export default router
