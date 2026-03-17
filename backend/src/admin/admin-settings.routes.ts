import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware, AuthRequest } from '../common/middleware/auth.middleware'
import { adminMiddleware } from '../common/middleware/admin.middleware'

const router = Router()
const prisma = new PrismaClient()

// GET /api/admin/settings - Get platform settings
router.get('/settings', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    let settings = await prisma.platformSettings.findUnique({ where: { id: 'default' } })
    if (!settings) {
      settings = await prisma.platformSettings.create({ data: { id: 'default' } })
    }
    res.json(settings)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /api/admin/settings - Update platform settings
router.put('/settings', authMiddleware, adminMiddleware, async (req: AuthRequest, res) => {
  try {
    const { platformName, logoUrl, faviconUrl, primaryColor, accentColor, footerText, whatsappNumber } = req.body
    const settings = await prisma.platformSettings.upsert({
      where: { id: 'default' },
      update: {
        ...(platformName !== undefined && { platformName }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(faviconUrl !== undefined && { faviconUrl }),
        ...(primaryColor !== undefined && { primaryColor }),
        ...(accentColor !== undefined && { accentColor }),
        ...(footerText !== undefined && { footerText }),
        ...(whatsappNumber !== undefined && { whatsappNumber }),
      },
      create: {
        id: 'default',
        platformName: platformName || 'EndoStart',
        logoUrl: logoUrl || '',
        faviconUrl: faviconUrl || '',
        primaryColor: primaryColor || '#16a34a',
        accentColor: accentColor || '#22c55e',
        footerText: footerText || '',
        whatsappNumber: whatsappNumber || '',
      },
    })
    res.json(settings)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
