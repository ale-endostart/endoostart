import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class AnalyticsService {
  async trackEvent(
    eventType: string,
    studentId?: string,
    metadata?: Record<string, any>
  ) {
    const event = await prisma.analytics.create({
      data: {
        eventType,
        studentId,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    })
    return event
  }

  async trackConversion(
    studentId: string,
    eventType: string,
    metadata?: Record<string, any>
  ) {
    const metadataStr = metadata ? JSON.stringify(metadata) : null
    const event = await prisma.analytics.create({
      data: {
        eventType: eventType || 'CONVERSION',
        studentId,
        metadata: metadataStr,
      },
    })

    // Log activity for student
    if (studentId) {
      await prisma.activityLog.create({
        data: {
          studentId,
          eventType: 'CONVERSION',
          metadata: metadataStr,
        },
      })
    }

    return event
  }

  async getAnalytics(startDate?: Date, endDate?: Date) {
    const events = await prisma.analytics.findMany({
      where: {
        ...(startDate && endDate && {
          timestamp: {
            gte: startDate,
            lte: endDate,
          },
        }),
      },
      orderBy: { timestamp: 'desc' },
      take: 1000,
    })

    // Aggregate by event type
    const aggregated = events.reduce((acc: Record<string, number>, event) => {
      acc[event.eventType] = (acc[event.eventType] || 0) + 1
      return acc
    }, {})

    return {
      totalEvents: events.length,
      byType: aggregated,
      events: events.slice(0, 100), // Last 100 events
    }
  }
}
