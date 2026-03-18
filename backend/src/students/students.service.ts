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

  async getCourses(userId: string, role?: string) {
    // Admins see all active courses
    if (role === 'ADMIN') {
      const courses = await prisma.course.findMany({
        where: { isActive: true },
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
        orderBy: { createdAt: 'desc' },
      })
      return courses.map((c) => ({
        ...c,
        progress: 0,
        enrolledAt: null,
        accessGrantedAt: null,
        completedAt: null,
      }))
    }

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

  async getProgress(userId: string, role?: string) {
    // Admins get a summary of all courses
    if (role === 'ADMIN') {
      const courses = await prisma.course.findMany({
        where: { isActive: true },
        select: { id: true, name: true },
      })
      return {
        overallProgress: 0,
        courseProgress: courses.map((c) => ({
          courseId: c.id,
          courseName: c.name,
          progress: 0,
        })),
        enrolledCoursesCount: courses.length,
      }
    }

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

  async getCourseCompletions(userId: string, courseId: string) {
    const completions = await prisma.lessonCompletion.findMany({
      where: {
        studentId: userId,
        lesson: {
          module: {
            courseId,
          },
        },
      },
      select: {
        lessonId: true,
        completedAt: true,
      },
    })

    return {
      completedLessonIds: completions.map((c) => c.lessonId),
      completions,
    }
  }

  async completeLesson(userId: string, lessonId: string) {
    // Check if already completed
    const existing = await prisma.lessonCompletion.findUnique({
      where: {
        studentId_lessonId: {
          studentId: userId,
          lessonId,
        },
      },
    })

    if (existing) {
      return { alreadyCompleted: true, completion: existing }
    }

    // Create completion
    const completion = await prisma.lessonCompletion.create({
      data: {
        studentId: userId,
        lessonId,
      },
    })

    // Update course progress
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          select: { courseId: true },
        },
      },
    })

    if (lesson) {
      const courseId = lesson.module.courseId

      // Count total lessons in course
      const totalLessons = await prisma.lesson.count({
        where: {
          module: { courseId },
          isActive: true,
        },
      })

      // Count completed lessons in course
      const completedLessons = await prisma.lessonCompletion.count({
        where: {
          studentId: userId,
          lesson: {
            module: { courseId },
          },
        },
      })

      const progress = totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0

      await prisma.studentCourse.updateMany({
        where: {
          studentId: userId,
          courseId,
        },
        data: {
          progress,
          ...(progress === 100 ? { completedAt: new Date() } : {}),
        },
      })
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        studentId: userId,
        eventType: 'LESSON_COMPLETED',
        metadata: { lessonId },
      },
    })

    return { alreadyCompleted: false, completion }
  }
}
