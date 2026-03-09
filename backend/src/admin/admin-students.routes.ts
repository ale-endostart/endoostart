import { Router } from 'express'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { adminMiddleware } from '../common/middleware/admin.middleware'
import { validateRequest } from '../common/middleware/validate.middleware'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const enrollSchema = z.object({
  courseId: z.string().min(1),
})

// GET /api/admin/students - List all students with enrollment info
router.get('/students', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const search = req.query.search as string | undefined
    const courseId = req.query.courseId as string | undefined

    const whereClause: any = {
      role: 'STUDENT',
    }

    if (search) {
      whereClause.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (courseId) {
      whereClause.enrollments = {
        some: { courseId },
      }
    }

    const students = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        crm: true,
        phone: true,
        state: true,
        hasAccess: true,
        createdAt: true,
        enrollments: {
          select: {
            courseId: true,
            course: {
              select: {
                id: true,
                name: true,
              },
            },
            isActive: true,
            progress: true,
            enrolledAt: true,
            accessGrantedAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(students)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/admin/students/:studentId - Get student detail
router.get('/students/:studentId', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const student = await prisma.user.findUnique({
      where: { id: req.params.studentId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        crm: true,
        phone: true,
        state: true,
        role: true,
        hasAccess: true,
        accessGrantedAt: true,
        accessRevokedAt: true,
        createdAt: true,
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
          orderBy: { enrolledAt: 'desc' },
        },
        completions: {
          select: {
            lessonId: true,
            completedAt: true,
            lesson: {
              select: {
                id: true,
                name: true,
                module: {
                  select: {
                    id: true,
                    name: true,
                    courseId: true,
                  },
                },
              },
            },
          },
          orderBy: { completedAt: 'desc' },
          take: 50,
        },
        activityLogs: {
          orderBy: { timestamp: 'desc' },
          take: 20,
        },
      },
    })

    if (!student) {
      res.status(404).json({ error: 'Student not found' })
      return
    }

    res.json(student)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/admin/students/:studentId/grant - Grant access
router.post('/students/:studentId/grant', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const courseId = req.body.courseId as string | undefined

    // Grant global access
    const user = await prisma.user.update({
      where: { id: req.params.studentId },
      data: {
        hasAccess: true,
        accessGrantedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        hasAccess: true,
        accessGrantedAt: true,
      },
    })

    // If courseId provided, also activate that enrollment
    if (courseId) {
      const enrollment = await prisma.studentCourse.update({
        where: {
          studentId_courseId: {
            studentId: req.params.studentId,
            courseId,
          },
        },
        data: {
          isActive: true,
          accessGrantedAt: new Date(),
        },
      })
      res.json({ user, enrollment })
      return
    }

    res.json({ user })
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Student or course not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// POST /api/admin/students/:studentId/revoke - Revoke access
router.post('/students/:studentId/revoke', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const courseId = req.body.courseId as string | undefined

    // If courseId provided, revoke only that course
    if (courseId) {
      const enrollment = await prisma.studentCourse.update({
        where: {
          studentId_courseId: {
            studentId: req.params.studentId,
            courseId,
          },
        },
        data: {
          isActive: false,
          accessRevokedAt: new Date(),
        },
      })
      res.json({ enrollment })
      return
    }

    // Otherwise revoke global access
    const user = await prisma.user.update({
      where: { id: req.params.studentId },
      data: {
        hasAccess: false,
        accessRevokedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        hasAccess: true,
        accessRevokedAt: true,
      },
    })

    res.json({ user })
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Student or course not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// POST /api/admin/students/:studentId/enroll - Enroll in course
router.post('/students/:studentId/enroll', authMiddleware, adminMiddleware, validateRequest(enrollSchema), async (req: AuthRequest, res) => {
  try {
    const enrollment = await prisma.studentCourse.upsert({
      where: {
        studentId_courseId: {
          studentId: req.params.studentId,
          courseId: req.body.courseId,
        },
      },
      update: {
        isActive: true,
        accessGrantedAt: new Date(),
      },
      create: {
        studentId: req.params.studentId,
        courseId: req.body.courseId,
        isActive: true,
        accessGrantedAt: new Date(),
      },
      include: {
        course: {
          select: {
            name: true,
          },
        },
      },
    })

    res.json(enrollment)
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Student or course not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

export default router
