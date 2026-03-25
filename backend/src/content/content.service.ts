import { PrismaClient } from '@prisma/client'
import { getSignedDownloadUrl } from '../common/utils/cloudinary'

const prisma = new PrismaClient()

export class ContentService {
  async getLesson(lessonId: string, userId: string, role?: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId, isActive: true },
      include: {
        contents: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        module: {
          select: {
            id: true,
            name: true,
            courseId: true,
            course: {
              select: { id: true, name: true, slug: true },
            },
          },
        },
      },
    })

    if (!lesson) {
      throw new Error('Lesson not found')
    }

    // Admins have access to all lessons
    if (role !== 'ADMIN') {
      const enrollment = await prisma.studentCourse.findUnique({
        where: {
          studentId_courseId: {
            studentId: userId,
            courseId: lesson.module.courseId,
          },
        },
      })

      if (!enrollment || !enrollment.isActive) {
        throw new Error('Access denied to this lesson')
      }
    }

    return lesson
  }

  async getContent(contentId: string) {
    const content = await prisma.content.findUnique({
      where: { id: contentId },
      include: {
        lesson: {
          include: {
            module: {
              select: {
                courseId: true,
              },
            },
          },
        },
      },
    })
    return content
  }

  async getSignedDownloadUrl(contentId: string, userId: string, role?: string): Promise<string> {
    const content = await prisma.content.findUnique({
      where: { id: contentId },
      include: {
        lesson: {
          include: {
            module: {
              select: {
                courseId: true,
              },
            },
          },
        },
      },
    })

    if (!content) {
      throw new Error('Content not found')
    }

    // Admins have access to all content
    if (role !== 'ADMIN') {
      const enrollment = await prisma.studentCourse.findUnique({
        where: {
          studentId_courseId: {
            studentId: userId,
            courseId: content.lesson.module.courseId,
          },
        },
      })

      if (!enrollment || !enrollment.isActive) {
        throw new Error('Access denied to this content')
      }
    }

    // Record download
    await prisma.download.create({
      data: {
        studentId: userId,
        contentId,
      },
    })

    // Local file: return a backend-served URL
    if (content.url.startsWith('/cursos/')) {
      const apiBase = process.env.API_URL || 'http://localhost:3001'
      // /cursos/slug/file.pdf → /api/content/files/slug/file.pdf
      const servePath = content.url.replace('/cursos/', '/api/content/files/')
      return `${apiBase}${servePath}`
    }

    // Cloudinary: generate signed URL (1 hour expiry)
    const signedUrl = await getSignedDownloadUrl(content.url.split('/').pop()!, 3600)
    return signedUrl
  }

  async trackView(contentId: string, userId: string, role?: string): Promise<void> {
    const content = await prisma.content.findUnique({
      where: { id: contentId },
      include: {
        lesson: {
          include: {
            module: {
              select: {
                courseId: true,
              },
            },
          },
        },
      },
    })

    if (!content) {
      throw new Error('Content not found')
    }

    // Admins have access to all content
    if (role !== 'ADMIN') {
      const enrollment = await prisma.studentCourse.findUnique({
        where: {
          studentId_courseId: {
            studentId: userId,
            courseId: content.lesson.module.courseId,
          },
        },
      })

      if (!enrollment || !enrollment.isActive) {
        throw new Error('Access denied to this content')
      }
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        studentId: userId,
        eventType: 'CONTENT_VIEW',
        metadata: JSON.stringify({
          contentId,
          type: content.type,
        }),
      },
    })
  }
}
