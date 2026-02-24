import { Router } from 'express'
import { ContentService } from './content.service'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'

const router = Router()
const contentService = new ContentService()

// GET /api/content/:contentId/download - Get signed download URL (protected)
router.get('/:contentId/download', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const url = await contentService.getSignedDownloadUrl(
      req.params.contentId,
      req.user!.id
    )
    res.json({ url, expiresIn: 3600 })
  } catch (error: any) {
    if (error.message.includes('Access denied')) {
      res.status(403).json({ error: error.message })
    } else if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

// POST /api/content/:contentId/track-view - Track content view (protected)
router.post('/:contentId/track-view', authMiddleware, async (req: AuthRequest, res) => {
  try {
    await contentService.trackView(req.params.contentId, req.user!.id)
    res.json({ message: 'View tracked successfully' })
  } catch (error: any) {
    if (error.message.includes('Access denied')) {
      res.status(403).json({ error: error.message })
    } else if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

export default router
