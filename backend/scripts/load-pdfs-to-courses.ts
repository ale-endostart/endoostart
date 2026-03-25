#!/usr/bin/env ts-node
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface CourseConfig {
  slug: string
  name: string
  pdfPath: string
}

const courses: CourseConfig[] = [
  {
    slug: 'endoscopia-imersao',
    name: 'Imersão em Endoscopia',
    pdfPath: 'C:\\TurboOps\\Code\\public\\cursos\\endoscopia',
  },
  {
    slug: 'endoscopia-terapeutica',
    name: 'Endoscopia Terapêutica',
    pdfPath: 'C:\\TurboOps\\Code\\public\\cursos\\endoscopia-terapeutica',
  },
  {
    slug: 'balao-gastrico',
    name: 'Balão Gástrico',
    pdfPath: 'C:\\TurboOps\\Code\\public\\cursos\\balao-gastrico',
  },
  {
    slug: 'colonoscopia-avancada',
    name: 'Colonoscopia Avançada',
    pdfPath: 'C:\\TurboOps\\Code\\public\\cursos\\colonoscopia',
  },
]

function parsePdfFilename(filename: string) {
  const basename = path.basename(filename, '.pdf')
  const match = basename.match(/^(\d+)[-_](.+)$/)

  if (match) {
    return {
      order: parseInt(match[1]),
      name: match[2]
        .replace(/[-_]/g, ' ')
        .replace(/-Parte-(\d+)/g, ' - Parte $1')
        .replace(/Parte-(\d+)/g, 'Parte $1'),
    }
  }

  return {
    order: 0,
    name: basename,
  }
}

async function loadPDFsToCourses() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗')
  console.log('║  📚 CARREGANDO PDFs NOS CURSOS DO BANCO DE DADOS              ║')
  console.log('╚════════════════════════════════════════════════════════════════╝\n')

  for (const courseConfig of courses) {
    try {
      console.log(`\n📖 PROCESSANDO: ${courseConfig.name}`)
      console.log('═'.repeat(70))

      // Find or create course
      const course = await prisma.course.findUnique({
        where: { slug: courseConfig.slug },
        include: { modules: true },
      })

      if (!course) {
        console.log(`❌ Curso não encontrado: ${courseConfig.slug}`)
        continue
      }

      console.log(`✓ Curso encontrado: ${course.name}`)

      // Find or create module
      let module = course.modules[0]
      if (!module) {
        module = await prisma.module.create({
          data: {
            courseId: course.id,
            name: course.name,
            description: `Materiais do curso ${course.name}`,
            order: 1,
            isActive: true,
          },
        })
        console.log(`✓ Módulo criado: "${module.name}"`)
      } else {
        console.log(`✓ Módulo encontrado: "${module.name}"`)
      }

      // Read PDFs from folder
      if (!fs.existsSync(courseConfig.pdfPath)) {
        console.log(`⚠️  Pasta não encontrada: ${courseConfig.pdfPath}`)
        continue
      }

      const files = fs.readdirSync(courseConfig.pdfPath)
      const pdfFiles = files.filter((f) => f.toLowerCase().endsWith('.pdf')).sort()

      if (pdfFiles.length === 0) {
        console.log(`⚠️  Nenhum PDF encontrado na pasta`)
        continue
      }

      console.log(`\n📄 Carregando ${pdfFiles.length} PDF(s):\n`)

      let lessonCount = 0

      for (const pdfFile of pdfFiles) {
        const { order, name } = parsePdfFilename(pdfFile)
        const lessonOrder = order > 0 ? order : lessonCount + 1

        // Check if lesson already exists
        const existingLesson = await prisma.lesson.findFirst({
          where: {
            moduleId: module.id,
            order: lessonOrder,
          },
        })

        if (existingLesson) {
          console.log(
            `  ⏭️  Aula ${lessonOrder} já existe: "${existingLesson.name}" (pulando)`
          )
          continue
        }

        // Create lesson
        const lesson = await prisma.lesson.create({
          data: {
            moduleId: module.id,
            name: name,
            description: `${name} - Material em PDF`,
            order: lessonOrder,
            duration: 0,
            isActive: true,
          },
        })

        // Get file size
        const fileStats = fs.statSync(path.join(courseConfig.pdfPath, pdfFile))
        const fileSizeMB = fileStats.size / (1024 * 1024)

        // Create content (PDF reference)
        const pdfUrl = `/cursos/${courseConfig.slug}/${pdfFile}`

        await prisma.content.create({
          data: {
            lessonId: lesson.id,
            type: 'PDF',
            title: name,
            description: `PDF: ${name}`,
            url: pdfUrl,
            fileSize: parseFloat(fileSizeMB.toFixed(2)),
            mimeType: 'application/pdf',
            order: 1,
            isActive: true,
          },
        })

        console.log(
          `  ✅ Aula ${lessonOrder}: "${name}" (${fileSizeMB.toFixed(2)} MB)`
        )
        lessonCount++
      }

      console.log(`\n→ Total: ${lessonCount} aulas carregadas\n`)
    } catch (error) {
      console.error(
        `❌ Erro ao processar "${courseConfig.name}":`,
        error instanceof Error ? error.message : error
      )
    }
  }

  console.log('\n' + '═'.repeat(70))
  console.log('\n✅ Carregamento de PDFs concluído!\n')

  // Show summary
  const coursesSummary = await prisma.course.findMany({
    where: { isActive: true },
    include: {
      modules: {
        include: {
          lessons: {
            include: { contents: true },
          },
        },
      },
    },
  })

  console.log('📊 RESUMO FINAL:\n')
  for (const course of coursesSummary) {
    const totalLessons = course.modules.reduce(
      (sum, m) => sum + m.lessons.length,
      0
    )
    const totalContent = course.modules.reduce(
      (sum, m) => sum + m.lessons.reduce((ls, l) => ls + l.contents.length, 0),
      0
    )
    console.log(`✓ ${course.name}`)
    console.log(`   └─ ${course.modules.length} módulo(s), ${totalLessons} aula(s), ${totalContent} arquivo(s)`)
  }

  console.log('\n' + '═'.repeat(70))
  console.log('\n🎉 Seus cursos estão prontos para uso!\n')
}

loadPDFsToCourses()
  .catch((e) => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
