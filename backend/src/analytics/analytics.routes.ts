import { Router } from 'express'
import { z } from 'zod'
import { AnalyticsService } from './analytics.service'
import { optionalAuthMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { validateRequest } from '../common/middleware/validate.middleware'

const router = Router()
const analyticsService = new AnalyticsService()

// Validation schemas
const trackEventSchema = z.object({
  eventType: z.string().min(1),
  metadata: z.record(z.any()).optional(),
})

const trackConversionSchema = z.object({
  eventType: z.string().optional(),
  metadata: z.record(z.any()).optional(),
})

// POST /api/analytics/events - Track anonymous event (public)
router.post('/events', validateRequest(trackEventSchema), async (req, res) => {
  try {
    const event = await analyticsService.trackEvent(
      req.body.eventType,
      undefined,
      req.body.metadata
    )
    res.json({ success: true, eventId: event.id })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/analytics/conversion - Track conversion (public, student optional)
router.post('/conversion', optionalAuthMiddleware, validateRequest(trackConversionSchema), async (req: AuthRequest, res) => {
  try {
    const event = await analyticsService.trackConversion(
      req.user?.id || '',
      req.body.eventType,
      req.body.metadata
    )
    res.json({ success: true, eventId: event.id })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
