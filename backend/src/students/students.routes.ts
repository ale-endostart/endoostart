import { Router } from 'express'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { StudentsService } from './students.service'

const router = Router()
const studentsService = new StudentsService()

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
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/students/profile - Update current student's profile
router.put('/profile', authMiddleware, async (req: AuthRequest, res) => {
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
    res.status(500).json({ error: error.message })
  }
})

// GET /api/students/courses - Get current student's enrolled courses
router.get('/courses', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const courses = await studentsService.getCourses(req.user!.id)
    res.json(courses)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/students/progress - Get current student's progress
router.get('/progress', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const progress = await studentsService.getProgress(req.user!.id)
    res.json(progress)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/students/courses/:courseId/completions - Get lesson completions for a course
router.get('/courses/:courseId/completions', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const completions = await studentsService.getCourseCompletions(
      req.user!.id,
      req.params.courseId
    )
    res.json(completions)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
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
    res.status(500).json({ error: error.message })
  }
})

export default router
