import { Router } from 'express'
import { z } from 'zod'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { adminMiddleware } from '../common/middleware/admin.middleware'
import { validateQuery } from '../common/middleware/validate.middleware'
import { AnalyticsService } from '../analytics/analytics.service'

const router = Router()
const analyticsService = new AnalyticsService()

const getAnalyticsQuerySchema = z.object({
  startDate: z.string().datetime({ offset: true }).optional(),
  endDate: z.string().datetime({ offset: true }).optional(),
})

// GET /api/admin/analytics
router.get('/analytics', authMiddleware, adminMiddleware, validateQuery(getAnalyticsQuerySchema), async (req: AuthRequest, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined
    const data = await analyticsService.getAnalytics(startDate, endDate)
    res.json(data)
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
