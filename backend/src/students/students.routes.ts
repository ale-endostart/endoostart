import { Router } from 'express'
import { z } from 'zod'
import { StudentsService } from './students.service'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { validateRequest } from '../common/middleware/validate.middleware'

const router = Router()
const studentsService = new StudentsService()

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

export default router
