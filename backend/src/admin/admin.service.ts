import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class AdminService {
  async listStudents(courseId?: string) {
    const whereClause = courseId
      ? {
          enrollments: {
            some: {
              courseId,
            },
          },
        }
      : {}

    const students = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        ...whereClause,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        crm: true,
        phone: true,
        state: true,
        hasAccess: true,
        createdAt: true,
        enrollments: {
          select: {
            courseId: true,
            course: {
              select: {
                name: true,
              },
            },
            isActive: true,
            progress: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return students
  }

  async grantAccess(studentId: string, courseId?: string) {
    // Grant global access
    const user = await prisma.user.update({
      where: { id: studentId },
      data: {
        hasAccess: true,
        accessGrantedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        hasAccess: true,
        accessGrantedAt: true,
      },
    })

    // If courseId provided, also activate that enrollment
    if (courseId) {
      const enrollment = await prisma.studentCourse.update({
        where: {
          studentId_courseId: {
            studentId,
            courseId,
          },
        },
        data: {
          isActive: true,
          accessGrantedAt: new Date(),
        },
      })
      return { user, enrollment }
    }

    return { user }
  }

  async revokeAccess(studentId: string, courseId?: string) {
    // If courseId provided, revoke only that course
    if (courseId) {
      const enrollment = await prisma.studentCourse.update({
        where: {
          studentId_courseId: {
            studentId,
            courseId,
          },
        },
        data: {
          isActive: false,
          accessRevokedAt: new Date(),
        },
      })
      return { enrollment }
    }

    // Otherwise revoke global access
    const user = await prisma.user.update({
      where: { id: studentId },
      data: {
        hasAccess: false,
        accessRevokedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        hasAccess: true,
        accessRevokedAt: true,
      },
    })

    return { user }
  }

  async enrollStudent(studentId: string, courseId: string) {
    const enrollment = await prisma.studentCourse.upsert({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
      update: {
        isActive: true,
        accessGrantedAt: new Date(),
      },
      create: {
        studentId,
        courseId,
        isActive: true,
        accessGrantedAt: new Date(),
      },
      include: {
        course: {
          select: {
            name: true,
          },
        },
      },
    })

    return enrollment
  }
}
