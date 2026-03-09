import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { adminMiddleware } from '../common/middleware/admin.middleware'

const router = Router()
const prisma = new PrismaClient()

// GET /api/admin/dashboard - Get admin dashboard stats
router.get('/dashboard', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const [
      totalStudents,
      activeStudents,
      totalCourses,
      totalContent,
      recentEnrollments,
      recentActivity,
    ] = await Promise.all([
      prisma.user.count({
        where: { role: 'STUDENT' },
      }),
      prisma.user.count({
        where: { role: 'STUDENT', hasAccess: true },
      }),
      prisma.course.count({
        where: { isActive: true },
      }),
      prisma.content.count({
        where: { isActive: true },
      }),
      prisma.studentCourse.findMany({
        take: 10,
        orderBy: { enrolledAt: 'desc' },
        include: {
          student: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          course: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      prisma.activityLog.findMany({
        take: 10,
        orderBy: { timestamp: 'desc' },
        include: {
          student: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
    ])

    res.json({
      totalStudents,
      activeStudents,
      totalCourses,
      totalContent,
      recentEnrollments,
      recentActivity,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
