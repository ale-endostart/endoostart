import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class CoursesService {
  async findAll() {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      include: {
        modules: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            name: true,
            order: true,
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return courses
  }

  async findById(courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              where: { isActive: true },
              orderBy: { order: 'asc' },
              select: {
                id: true,
                name: true,
                description: true,
                order: true,
                duration: true,
              },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    })
    return course
  }

  async findModules(courseId: string, userId: string) {
    // Check if student has access to this course
    const enrollment = await prisma.studentCourse.findUnique({
      where: {
        studentId_courseId: {
          studentId: userId,
          courseId,
        },
      },
      select: { isActive: true },
    })

    if (!enrollment || !enrollment.isActive) {
      throw new Error('Access denied to this course')
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              where: { isActive: true },
              orderBy: { order: 'asc' },
              include: {
                contents: {
                  where: { isActive: true },
                  orderBy: { order: 'asc' },
                  select: {
                    id: true,
                    type: true,
                    title: true,
                    url: true,
                    order: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return course
  }

  async getCourseProgress(courseId: string, userId: string) {
    const enrollment = await prisma.studentCourse.findUnique({
      where: {
        studentId_courseId: {
          studentId: userId,
          courseId,
        },
      },
    })

    if (!enrollment) {
      throw new Error('Student not enrolled in this course')
    }

    return {
      progress: enrollment.progress,
      enrolledAt: enrollment.enrolledAt,
      accessGrantedAt: enrollment.accessGrantedAt,
      completedAt: enrollment.completedAt,
      isActive: enrollment.isActive,
    }
  }
}
