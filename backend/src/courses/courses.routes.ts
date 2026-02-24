import { Router } from 'express'
import { CoursesService } from './courses.service'
import { authMiddleware } from '../common/middleware/auth.middleware'

const router = Router()
const coursesService = new CoursesService()

// GET /api/courses - List all active courses (public)
router.get('/', async (_req, res) => {
  try {
    const courses = await coursesService.findAll()
    res.json(courses)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/courses/:courseId - Get course details (public)
router.get('/:courseId', async (req, res) => {
  try {
    const course = await coursesService.findById(req.params.courseId)
    if (!course) {
      res.status(404).json({ error: 'Course not found' })
      return
    }
    res.json(course)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/courses/:courseId/modules - Get course modules with content (protected)
router.get('/:courseId/modules', authMiddleware, async (req: any, res: any) => {
  try {
    const course = await coursesService.findModules(
      req.params.courseId,
      req.user!.id
    )
    if (!course) {
      res.status(404).json({ error: 'Course not found' })
      return
    }
    res.json(course)
  } catch (error: any) {
    res.status(403).json({ error: error.message })
  }
})

// GET /api/courses/:courseId/progress - Get course progress (protected)
router.get('/:courseId/progress', authMiddleware, async (req: any, res: any) => {
  try {
    const progress = await coursesService.getCourseProgress(
      req.params.courseId,
      req.user!.id
    )
    res.json(progress)
  } catch (error: any) {
    res.status(403).json({ error: error.message })
  }
})

export default router
