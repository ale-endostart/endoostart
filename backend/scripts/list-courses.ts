#!/usr/bin/env ts-node
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function listCourses() {
  try {
    console.log('\n╔══════════════════════════════════════════════════════════════════╗')
    console.log('║           📚 CURSOS DISPONÍVEIS NA PLATAFORMA ENDOSTART          ║')
    console.log('╚══════════════════════════════════════════════════════════════════╝\n')

    const courses = await prisma.course.findMany({
      where: { isActive: true },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                contents: true,
              },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    if (courses.length === 0) {
      console.log('❌ Nenhum curso encontrado no banco de dados.\n')
      return
    }

    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.name}`)
      console.log(`   ├─ ID: ${course.id}`)
      console.log(`   ├─ Slug: ${course.slug}`)
      console.log(`   ├─ Preço: R$ ${course.price.toLocaleString('pt-BR')}`)
      console.log(`   ├─ Duração: ${course.durationWeeks} semanas`)
      console.log(`   ├─ Nível: ${course.difficulty}`)
      console.log(`   ├─ Descrição: ${course.shortDescription}`)
      console.log(`   ├─ Alunos inscritos: ${course._count.enrollments}`)

      if (course.modules.length > 0) {
        console.log(`   └─ Módulos (${course.modules.length}):`)
        course.modules.forEach((module) => {
          console.log(`      ├─ ${module.name}`)
          console.log(`      │  └─ Aulas (${module.lessons.length}):`)

          module.lessons.forEach((lesson) => {
            const contentCount = lesson.contents.length
            console.log(`      │     ├─ ${lesson.name}`)
            if (contentCount > 0) {
              console.log(`      │     │  └─ Conteúdo (${contentCount}):`)
              lesson.contents.forEach((content) => {
                const fileSize = content.fileSize > 0 ? `${content.fileSize} MB` : 'Vídeo'
                console.log(`      │     │     └─ [${content.type}] ${content.title} (${fileSize})`)
              })
            }
          })
        })
      } else {
        console.log(`   └─ Sem módulos criados`)
      }

      console.log()
    })

    console.log('╔══════════════════════════════════════════════════════════════════╗')
    console.log(`║  Total: ${courses.length} curso(s) | ${courses.reduce((sum, c) => sum + c.modules.length, 0)} módulo(s) | ${courses.reduce((sum, c) => sum + c.modules.reduce((ms, m) => ms + m.lessons.length, 0), 0)} aula(s)`)
    console.log('╚══════════════════════════════════════════════════════════════════╝\n')
  } catch (error) {
    console.error('❌ Erro ao listar cursos:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listCourses()
