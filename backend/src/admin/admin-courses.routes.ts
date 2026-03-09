import { Router } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { adminMiddleware } from '../common/middleware/admin.middleware'
import { validateRequest } from '../common/middleware/validate.middleware'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const createCourseSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().min(1),
  price: z.number().min(0),
  durationWeeks: z.number().int().min(1),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  imageUrl: z.string().optional(),
})

const updateCourseSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  shortDescription: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  durationWeeks: z.number().int().min(1).optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
})

// GET /api/admin/courses - List all courses with module/lesson counts
router.get('/courses', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            modules: true,
            enrollments: true,
          },
        },
        modules: {
          select: {
            _count: {
              select: {
                lessons: true,
              },
            },
          },
        },
      },
    })

    const result = courses.map((course) => {
      const totalLessons = course.modules.reduce(
        (sum, mod) => sum + mod._count.lessons,
        0
      )
      const { modules: _modules, ...courseData } = course
      return {
        ...courseData,
        totalModules: course._count.modules,
        totalLessons,
        totalEnrollments: course._count.enrollments,
      }
    })

    res.json(result)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/admin/courses/:courseId - Get full course tree
router.get('/courses/:courseId', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.courseId },
      include: {
        _count: {
          select: {
            enrollments: true,
          },
        },
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              include: {
                contents: {
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
        },
      },
    })

    if (!course) {
      res.status(404).json({ error: 'Course not found' })
      return
    }

    res.json(course)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/admin/courses - Create course
router.post('/courses', authMiddleware, adminMiddleware, validateRequest(createCourseSchema), async (req: AuthRequest, res) => {
  try {
    const course = await prisma.course.create({
      data: {
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        shortDescription: req.body.shortDescription,
        price: req.body.price,
        durationWeeks: req.body.durationWeeks,
        difficulty: req.body.difficulty,
        imageUrl: req.body.imageUrl || '',
      },
    })

    res.status(201).json(course)
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'A course with this slug already exists' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// PUT /api/admin/courses/:courseId - Update course
router.put('/courses/:courseId', authMiddleware, adminMiddleware, validateRequest(updateCourseSchema), async (req: AuthRequest, res) => {
  try {
    const course = await prisma.course.update({
      where: { id: req.params.courseId },
      data: req.body,
    })

    res.json(course)
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Course not found' })
    } else if (error.code === 'P2002') {
      res.status(409).json({ error: 'A course with this slug already exists' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// DELETE /api/admin/courses/:courseId - Soft delete course
router.delete('/courses/:courseId', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const course = await prisma.course.update({
      where: { id: req.params.courseId },
      data: { isActive: false },
    })

    res.json({ message: 'Course deactivated', course })
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Course not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

export default router
