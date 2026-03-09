import { Router } from 'express'
import dashboardRoutes from './admin-dashboard.routes'
import courseRoutes from './admin-courses.routes'
import moduleRoutes from './admin-modules.routes'
import lessonRoutes from './admin-lessons.routes'
import contentRoutes from './admin-content.routes'
import studentRoutes from './admin-students.routes'

const router = Router()

// Mount all admin sub-routes
// Each sub-route file handles its own auth + admin middleware
router.use('/', dashboardRoutes)
router.use('/', courseRoutes)
router.use('/', moduleRoutes)
router.use('/', lessonRoutes)
router.use('/', contentRoutes)
router.use('/', studentRoutes)

export default router
