import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// Extract basic info from PDF filename (e.g., "01-Anatomia.pdf" -> {order: 1, name: "Anatomia"})
function parsePdfFilename(filename: string) {
  const basename = path.basename(filename, '.pdf')
  const match = basename.match(/^(\d+)[_-](.+)$/)

  if (match) {
    return {
      order: parseInt(match[1]),
      name: match[2].replace(/[_-]/g, ' '),
    }
  }

  return {
    order: 0,
    name: basename,
  }
}

interface CourseConfig {
  slug: string
  name: string
  description: string
  shortDescription: string
  price: number
  durationWeeks: number
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  imageUrl: string
  pdfPath: string
}

const coursesConfig: CourseConfig[] = [
  {
    slug: 'endoscopia-imersao',
    name: 'Imersão em Endoscopia',
    description: 'Aprenda as técnicas avançadas de endoscopia com o Dr. Alessandro. Inclui procedimentos diagnósticos e terapêuticos.',
    shortDescription: 'Curso completo de endoscopia diagnóstica e terapêutica',
    price: 45000,
    durationWeeks: 12,
    difficulty: 'ADVANCED',
    imageUrl: 'https://via.placeholder.com/400x300?text=Endoscopia',
    pdfPath: '/c/TurboOps/Code/public/cursos/endoscopia',
  },
  {
    slug: 'endoscopia-terapeutica',
    name: 'Endoscopia Terapêutica',
    description: 'Dominar técnicas de endoscopia terapêutica com foco em procedimentos avançados e manejo de complicações.',
    shortDescription: 'Especialização em endoscopia terapêutica',
    price: 38000,
    durationWeeks: 10,
    difficulty: 'ADVANCED',
    imageUrl: 'https://via.placeholder.com/400x300?text=Endoscopia+Terapeutica',
    pdfPath: '/c/TurboOps/Code/public/cursos/endoscopia-terapeutica',
  },
  {
    slug: 'balao-gastrico',
    name: 'Balão Gástrico',
    description: 'Procedimentos com balão gástrico para emagrecimento. Técnica segura e eficaz com excelentes resultados.',
    shortDescription: 'Curso especializado em balão gástrico',
    price: 25000,
    durationWeeks: 6,
    difficulty: 'INTERMEDIATE',
    imageUrl: 'https://via.placeholder.com/400x300?text=Balao+Gastrico',
    pdfPath: '/c/TurboOps/Code/public/cursos/balao-gastrico',
  },
  {
    slug: 'colonoscopia-avancada',
    name: 'Colonoscopia Avançada',
    description: 'Domine técnicas avançadas de colonoscopia com foco em rastreamento e remoção de lesões complexas.',
    shortDescription: 'Especialização em colonoscopia avançada',
    price: 35000,
    durationWeeks: 8,
    difficulty: 'ADVANCED',
    imageUrl: 'https://via.placeholder.com/400x300?text=Colonoscopia',
    pdfPath: '/c/TurboOps/Code/public/cursos/colonoscopia',
  },
]

async function seedCourses() {
  console.log('🌱 Seeding 4 new courses with PDF support...\n')

  for (const courseConfig of coursesConfig) {
    try {
      // Check if course already exists
      const existing = await prisma.course.findUnique({
        where: { slug: courseConfig.slug },
      })

      if (existing) {
        console.log(`⏭️  Course already exists: "${courseConfig.name}" (${courseConfig.slug})`)
        continue
      }

      // Create course
      const course = await prisma.course.create({
        data: {
          slug: courseConfig.slug,
          name: courseConfig.name,
          description: courseConfig.description,
          shortDescription: courseConfig.shortDescription,
          price: courseConfig.price,
          durationWeeks: courseConfig.durationWeeks,
          difficulty: courseConfig.difficulty,
          imageUrl: courseConfig.imageUrl,
          isActive: true,
        },
      })

      console.log(`✅ Course created: "${courseConfig.name}"`)
      console.log(`   Slug: ${courseConfig.slug}`)
      console.log(`   Price: R$ ${courseConfig.price}`)
      console.log(`   Duration: ${courseConfig.durationWeeks} weeks\n`)

      // Read PDFs from folder
      if (fs.existsSync(courseConfig.pdfPath)) {
        const files = fs.readdirSync(courseConfig.pdfPath)
        const pdfFiles = files.filter((f) => f.toLowerCase().endsWith('.pdf')).sort()

        if (pdfFiles.length > 0) {
          console.log(`   📁 Found ${pdfFiles.length} PDF(s) in ${courseConfig.pdfPath}`)

          // Create a default module for each course
          const module = await prisma.module.create({
            data: {
              courseId: course.id,
              name: courseConfig.name,
              description: `Materiais do curso ${courseConfig.name}`,
              order: 1,
              isActive: true,
            },
          })

          console.log(`   📚 Module created: "${module.name}"`)

          // Create lessons from PDF files
          for (const [index, pdfFile] of pdfFiles.entries()) {
            const { order, name } = parsePdfFilename(pdfFile)
            const lessonOrder = order > 0 ? order : index + 1

            const lesson = await prisma.lesson.create({
              data: {
                moduleId: module.id,
                name: name,
                description: `${name} - Material em PDF`,
                order: lessonOrder,
                duration: 0, // Will be calculated based on PDF
                isActive: true,
              },
            })

            // Create content (PDF file reference)
            const pdfUrl = `/cursos/${courseConfig.slug}/${pdfFile}`
            const fileStats = fs.statSync(path.join(courseConfig.pdfPath, pdfFile))
            const fileSizeMB = fileStats.size / (1024 * 1024)

            const content = await prisma.content.create({
              data: {
                lessonId: lesson.id,
                type: 'PDF',
                title: name,
                description: `PDF do módulo: ${name}`,
                url: pdfUrl,
                fileSize: parseFloat(fileSizeMB.toFixed(2)),
                mimeType: 'application/pdf',
                order: 1,
                isActive: true,
              },
            })

            console.log(`      📄 Aula criada: "${name}" (${fileSizeMB.toFixed(2)} MB)`)
          }
        } else {
          console.log(`   ⚠️  Nenhum PDF encontrado em ${courseConfig.pdfPath}`)
          console.log(`   💡 Coloque os PDFs nessa pasta e execute o script novamente\n`)
        }
      } else {
        console.log(`   ❌ Pasta não encontrada: ${courseConfig.pdfPath}\n`)
      }
    } catch (error) {
      console.error(`❌ Error seeding course "${courseConfig.name}":`, error)
    }
  }

  console.log('\n✅ Course seeding completed!')
  console.log('\n📋 Instructions:')
  console.log('   1. Coloque os PDFs nas pastas:')
  coursesConfig.forEach((c) => {
    console.log(`      - ${c.pdfPath}`)
  })
  console.log('\n   2. Nomeie os PDFs com este padrão:')
  console.log('      01-Nome-da-Aula.pdf')
  console.log('      02-Proxima-Aula.pdf')
  console.log('      (o número define a ordem)')
  console.log('\n   3. Execute o script novamente para carregar os PDFs:')
  console.log('      npx ts-node prisma/seed-courses.ts\n')
}

seedCourses()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
