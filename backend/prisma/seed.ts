import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.download.deleteMany()
  await prisma.activityLog.deleteMany()
  await prisma.analytics.deleteMany()
  await prisma.studentCourse.deleteMany()
  await prisma.content.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.module.deleteMany()
  await prisma.course.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user (Dr. Alessandro)
  const adminPassword = await bcrypt.hash('admin123456', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'dr.alessandro@endostart.com',
      passwordHash: adminPassword,
      firstName: 'Alessandro',
      lastName: 'Médico',
      crm: 'SP123456',
      phone: '+5562994338845',
      state: 'SP',
      role: 'ADMIN',
      hasAccess: true,
    },
  })
  console.log('✓ Admin user created:', admin.email)

  // Create test student
  const studentPassword = await bcrypt.hash('student123456', 10)
  const student = await prisma.user.create({
    data: {
      email: 'medico@example.com',
      passwordHash: studentPassword,
      firstName: 'João',
      lastName: 'Silva',
      crm: 'SP654321',
      phone: '+5585987654321',
      state: 'CE',
      role: 'STUDENT',
      hasAccess: true,
    },
  })
  console.log('✓ Test student created:', student.email)

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      slug: 'endoscopia-imersao',
      name: 'Imersão em Endoscopia',
      description: 'Aprenda as técnicas avançadas de endoscopia com o Dr. Alessandro',
      shortDescription: 'Curso prático de endoscopia',
      price: 45000,
      durationWeeks: 12,
      difficulty: 'ADVANCED',
      imageUrl: 'https://via.placeholder.com/400x300?text=Endoscopia',
      isActive: true,
    },
  })

  const course2 = await prisma.course.create({
    data: {
      slug: 'colonoscopia-avancada',
      name: 'Colonoscopia Avançada',
      description: 'Domine técnicas avançadas de colonoscopia',
      shortDescription: 'Curso especializado em colonoscopia',
      price: 35000,
      durationWeeks: 8,
      difficulty: 'INTERMEDIATE',
      imageUrl: 'https://via.placeholder.com/400x300?text=Colonoscopia',
      isActive: true,
    },
  })

  // course3 not used for now, but keeping structure for future expansion
  // const course3 = await prisma.course.create({
  //   data: {
  //     slug: 'balao-gastrico',
  //     name: 'Balão Gástrico',
  //     description: 'Procedimentos com balão gástrico para emagrecimento',
  //     shortDescription: 'Curso de balão gástrico',
  //     price: 25000,
  //     durationWeeks: 6,
  //     difficulty: 'BEGINNER',
  //     imageUrl: 'https://via.placeholder.com/400x300?text=Balao+Gastrico',
  //     isActive: true,
  //   },
  // })

  console.log('✓ Courses created: 3 courses')

  // Create modules for course 1
  const module1 = await prisma.module.create({
    data: {
      courseId: course1.id,
      name: 'Esôfago',
      description: 'Módulo sobre patologias do esôfago',
      order: 1,
      isActive: true,
    },
  })

  const module2 = await prisma.module.create({
    data: {
      courseId: course1.id,
      name: 'Estômago',
      description: 'Módulo sobre patologias gástricas',
      order: 2,
      isActive: true,
    },
  })

  // module3 not used in this seed, but model exists
  // const module3 = await prisma.module.create({
  //   data: {
  //     courseId: course1.id,
  //     name: 'Intestino Delgado',
  //     description: 'Procedimentos em intestino delgado',
  //     order: 3,
  //     isActive: true,
  //   },
  // })

  console.log('✓ Modules created: 3 modules')

  // Create lessons for module 1
  const lesson1 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      name: 'Anatomia do Esôfago',
      description: 'Revisão da anatomia esofágica e variações',
      order: 1,
      duration: 45,
      isActive: true,
    },
  })

  const lesson2 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      name: 'DRGE e Acalasia',
      description: 'Diagnóstico e manejo de DRGE e acalasia',
      order: 2,
      duration: 60,
      isActive: true,
    },
  })

  // Create lessons for module 2
  const lesson3 = await prisma.lesson.create({
    data: {
      moduleId: module2.id,
      name: 'Tumores Gástricos',
      description: 'Diagnóstico e tratamento de tumores gástricos',
      order: 1,
      duration: 75,
      isActive: true,
    },
  })

  // lesson4 not used in this seed
  // const lesson4 = await prisma.lesson.create({
  //   data: {
  //     moduleId: module2.id,
  //     name: 'Hemorragias Digestivas',
  //     description: 'Manejo de hemorragias digestivas altas',
  //     order: 2,
  //     duration: 90,
  //     isActive: true,
  //   },
  // })

  console.log('✓ Lessons created: 4 lessons')

  // Create content (PDFs and videos)
  await prisma.content.create({
    data: {
      lessonId: lesson1.id,
      type: 'PDF',
      title: 'Guia Completo - Anatomia Esofágica',
      description: 'PDF com ilustrações e detalhes anatômicos',
      url: 'https://res.cloudinary.com/demo/raw/upload/v1/example.pdf',
      fileSize: 2.5,
      mimeType: 'application/pdf',
      order: 1,
      isActive: true,
    },
  })

  await prisma.content.create({
    data: {
      lessonId: lesson1.id,
      type: 'VIDEO',
      title: 'Demonstração Prática - Endoscopia Normal',
      description: 'Vídeo com procedimento endoscópico normal',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      fileSize: 0,
      mimeType: 'video/youtube',
      order: 2,
      isActive: true,
    },
  })

  await prisma.content.create({
    data: {
      lessonId: lesson2.id,
      type: 'PDF',
      title: 'Protocolos de Manejo - DRGE',
      description: 'Protocolos e algoritmos de decisão',
      url: 'https://res.cloudinary.com/demo/raw/upload/v1/drge-protocol.pdf',
      fileSize: 1.8,
      mimeType: 'application/pdf',
      order: 1,
      isActive: true,
    },
  })

  await prisma.content.create({
    data: {
      lessonId: lesson3.id,
      type: 'VIDEO',
      title: 'Casos Clínicos - Tumores Gástricos',
      description: 'Apresentação de casos clínicos reais',
      url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      fileSize: 0,
      mimeType: 'video/youtube',
      order: 1,
      isActive: true,
    },
  })

  console.log('✓ Content created: 4 items')

  // Enroll student in courses
  await prisma.studentCourse.create({
    data: {
      studentId: student.id,
      courseId: course1.id,
      isActive: true,
      accessGrantedAt: new Date(),
      progress: 25,
    },
  })

  await prisma.studentCourse.create({
    data: {
      studentId: student.id,
      courseId: course2.id,
      isActive: true,
      accessGrantedAt: new Date(),
      progress: 10,
    },
  })

  console.log('✓ Student enrolled in courses')

  // Create analytics events
  await prisma.analytics.create({
    data: {
      eventType: 'LANDING_VISIT',
      studentId: student.id,
      metadata: JSON.stringify({
        source: 'whatsapp',
        device: 'mobile',
      }),
    },
  })

  console.log('✓ Analytics events created')

  console.log('✅ Seeding completed!')
  console.log('')
  console.log('📋 Test Credentials:')
  console.log('   Admin:')
  console.log('     Email: dr.alessandro@endostart.com')
  console.log('     Password: admin123456')
  console.log('   Student:')
  console.log('     Email: medico@example.com')
  console.log('     Password: student123456')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
