import { Router } from 'express'
import { AdminService } from './admin.service'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { adminMiddleware } from '../common/middleware/admin.middleware'

const router = Router()
const adminService = new AdminService()

// All admin routes require authentication + admin role

// GET /api/admin/students - List all students
router.get('/students', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const courseId = req.query.courseId as string | undefined
    const students = await adminService.listStudents(courseId)
    res.json(students)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/admin/students/:studentId/grant - Grant access
router.post('/students/:studentId/grant', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const courseId = req.body.courseId as string | undefined
    const result = await adminService.grantAccess(req.params.studentId, courseId)
    res.json(result)
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
    const result = await adminService.revokeAccess(req.params.studentId, courseId)
    res.json(result)
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Student or course not found' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// POST /api/admin/students/:studentId/enroll/:courseId - Enroll in course
router.post('/students/:studentId/enroll/:courseId', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const enrollment = await adminService.enrollStudent(
      req.params.studentId,
      req.params.courseId
    )
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
