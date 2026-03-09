import { Router } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { adminMiddleware } from '../common/middleware/admin.middleware'
import { validateRequest } from '../common/middleware/validate.middleware'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const createLessonSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().min(0).optional(),
  duration: z.number().int().min(0).optional(),
})

const updateLessonSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  order: z.number().int().min(0).optional(),
  duration: z.number().int().min(0).nullable().optional(),
  isActive: z.boolean().optional(),
})

const reorderSchema = z.array(
  z.object({
    id: z.string().min(1),
    order: z.number().int().min(0),
  })
)

// POST /api/admin/modules/:moduleId/lessons - Create lesson
router.post('/modules/:moduleId/lessons', authMiddleware, adminMiddleware, validateRequest(createLessonSchema), async (req: AuthRequest, res) => {
  try {
    // Verify module exists
    const module = await prisma.module.findUnique({
      where: { id: req.params.moduleId },
    })

    if (!module) {
      res.status(404).json({ error: 'Module not found' })
      return
    }

    // Auto-assign order if not provided
    let order = req.body.order
    if (order === undefined) {
      const lastLesson = await prisma.lesson.findFirst({
        where: { moduleId: req.params.moduleId },
        orderBy: { order: 'desc' },
        select: { order: true },
      })
      order = lastLesson ? lastLesson.order + 1 : 0
    }

    const lesson = await prisma.lesson.create({
      data: {
        moduleId: req.params.moduleId,
        name: req.body.name,
        description: req.body.description,
        order,
        duration: req.body.duration || null,
      },
    })

    res.status(201).json(lesson)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/admin/lessons/:lessonId - Update lesson
router.put('/lessons/:lessonId', authMiddleware, adminMiddleware, validateRequest(updateLessonSchema), async (req: AuthRequest, res) => {
  try {
    const lesson = await prisma.lesson.update({
      where: { id: req.params.lessonId },
      data: req.body,
    })

    res.json(lesson)
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Lesson not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// DELETE /api/admin/lessons/:lessonId - Soft delete lesson
router.delete('/lessons/:lessonId', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const lesson = await prisma.lesson.update({
      where: { id: req.params.lessonId },
      data: { isActive: false },
    })

    res.json({ message: 'Lesson deactivated', lesson })
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Lesson not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// PUT /api/admin/lessons/reorder - Batch reorder lessons
router.put('/lessons/reorder', authMiddleware, adminMiddleware, validateRequest(reorderSchema), async (req: AuthRequest, res) => {
  try {
    const items: Array<{ id: string; order: number }> = req.body

    await prisma.$transaction(
      items.map((item) =>
        prisma.lesson.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    )

    res.json({ message: 'Lessons reordered', count: items.length })
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'One or more lessons not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

export default router
