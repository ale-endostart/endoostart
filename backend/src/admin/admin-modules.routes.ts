import { Router } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { adminMiddleware } from '../common/middleware/admin.middleware'
import { validateRequest } from '../common/middleware/validate.middleware'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const createModuleSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().min(0).optional(),
})

const updateModuleSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
})

const reorderSchema = z.array(
  z.object({
    id: z.string().min(1),
    order: z.number().int().min(0),
  })
)

// POST /api/admin/courses/:courseId/modules - Create module
router.post('/courses/:courseId/modules', authMiddleware, adminMiddleware, validateRequest(createModuleSchema), async (req: AuthRequest, res) => {
  try {
    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: req.params.courseId },
    })

    if (!course) {
      res.status(404).json({ error: 'Course not found' })
      return
    }

    // Auto-assign order if not provided
    let order = req.body.order
    if (order === undefined) {
      const lastModule = await prisma.module.findFirst({
        where: { courseId: req.params.courseId },
        orderBy: { order: 'desc' },
        select: { order: true },
      })
      order = lastModule ? lastModule.order + 1 : 0
    }

    const module = await prisma.module.create({
      data: {
        courseId: req.params.courseId,
        name: req.body.name,
        description: req.body.description,
        order,
      },
    })

    res.status(201).json(module)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/admin/modules/:moduleId - Update module
router.put('/modules/:moduleId', authMiddleware, adminMiddleware, validateRequest(updateModuleSchema), async (req: AuthRequest, res) => {
  try {
    const module = await prisma.module.update({
      where: { id: req.params.moduleId },
      data: req.body,
    })

    res.json(module)
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Module not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// DELETE /api/admin/modules/:moduleId - Soft delete module
router.delete('/modules/:moduleId', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const module = await prisma.module.update({
      where: { id: req.params.moduleId },
      data: { isActive: false },
    })

    res.json({ message: 'Module deactivated', module })
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Module not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// PUT /api/admin/modules/reorder - Batch reorder modules
router.put('/modules/reorder', authMiddleware, adminMiddleware, validateRequest(reorderSchema), async (req: AuthRequest, res) => {
  try {
    const items: Array<{ id: string; order: number }> = req.body

    await prisma.$transaction(
      items.map((item) =>
        prisma.module.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    )

    res.json({ message: 'Modules reordered', count: items.length })
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'One or more modules not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

export default router
