import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class StudentsService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        crm: true,
        phone: true,
        state: true,
        role: true,
        hasAccess: true,
        createdAt: true,
      },
    })
    return user
  }

  async updateProfile(userId: string, data: {
    firstName?: string
    lastName?: string
    phone?: string
    state?: string
  }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.lastName && { lastName: data.lastName }),
        ...(data.phone && { phone: data.phone }),
        ...(data.state && { state: data.state }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        crm: true,
        phone: true,
        state: true,
        role: true,
      },
    })
    return user
  }

  async getCourses(userId: string) {
    const enrollments = await prisma.studentCourse.findMany({
      where: { studentId: userId, isActive: true },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            description: true,
            shortDescription: true,
            imageUrl: true,
            difficulty: true,
            durationWeeks: true,
            price: true,
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    })

    return enrollments.map((e) => ({
      ...e.course,
      progress: e.progress,
      enrolledAt: e.enrolledAt,
      accessGrantedAt: e.accessGrantedAt,
      completedAt: e.completedAt,
    }))
  }

  async getProgress(userId: string) {
    const enrollments = await prisma.studentCourse.findMany({
      where: { studentId: userId, isActive: true },
      select: {
        courseId: true,
        progress: true,
        course: {
          select: {
            name: true,
          },
        },
      },
    })

    const totalProgress =
      enrollments.length > 0
        ? enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length
        : 0

    return {
      overallProgress: Math.round(totalProgress),
      courseProgress: enrollments.map((e) => ({
        courseId: e.courseId,
        courseName: e.course.name,
        progress: e.progress,
      })),
      enrolledCoursesCount: enrollments.length,
    }
  }
}
