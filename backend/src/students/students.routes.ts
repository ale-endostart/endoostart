import { Router } from 'express'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { StudentsService } from './students.service'
import { z } from 'zod'
import { validateRequest } from '../common/middleware/validate.middleware'

const router = Router()
const studentsService = new StudentsService()

const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  phone: z.string().max(20).optional(),
  state: z.string().max(50).optional(),
})

// GET /api/students/profile - Get current student's profile
router.get('/profile', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const profile = await studentsService.getProfile(req.user!.id)
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' })
      return
    }
    res.json(profile)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PUT /api/students/profile - Update current student's profile
router.put('/profile', authMiddleware, validateRequest(updateProfileSchema), async (req: AuthRequest, res) => {
  try {
    const { firstName, lastName, phone, state } = req.body
    const profile = await studentsService.updateProfile(req.user!.id, {
      firstName,
      lastName,
      phone,
      state,
    })
    res.json(profile)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/students/courses - Get current student's enrolled courses
router.get('/courses', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const courses = await studentsService.getCourses(req.user!.id, req.user!.role)
    res.json(courses)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/students/progress - Get current student's progress
router.get('/progress', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const progress = await studentsService.getProgress(req.user!.id, req.user!.role)
    res.json(progress)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/students/courses/:courseId/completions - Get lesson completions for a course
router.get('/courses/:courseId/completions', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const completions = await studentsService.getCourseCompletions(
      req.user!.id,
      req.params.courseId,
      req.user!.role
    )
    res.json(completions)
  } catch (error: any) {
    if (error.message.includes('Access denied')) {
      res.status(403).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

// POST /api/students/lessons/:lessonId/complete - Mark a lesson as completed
router.post('/lessons/:lessonId/complete', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const result = await studentsService.completeLesson(
      req.user!.id,
      req.params.lessonId
    )
    res.json(result)
  } catch (error: any) {
    if (error.message.includes('Access denied') || error.message.includes('not found')) {
      res.status(403).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

export default router
