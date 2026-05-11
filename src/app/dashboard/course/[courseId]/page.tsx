'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Content {
  id: string
  type: string
  title: string
  url: string
  order: number
}

interface Lesson {
  id: string
  name: string
  description: string
  order: number
  duration?: number
  contents: Content[]
}

interface Module {
  id: string
  name: string
  description: string
  order: number
  lessons: Lesson[]
}

interface Course {
  id: string
  name: string
  description: string
  modules: Module[]
}

export default function CoursePage() {
  const { data: session } = useSession()
  const params = useParams()
  const courseId = params?.courseId as string || ''

  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session?.user || !courseId) return

    async function fetchCourse() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/modules`,
          {
            headers: {
              Authorization: `Bearer ${(session as any).accessToken}`,
            },
          }
        )

        if (!res.ok) {
          const errData = await res.json().catch(() => null)
          throw new Error(errData?.error || 'Erro ao carregar curso')
        }
        const data = await res.json()
        setCourse(data)
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar curso')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [session, courseId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⌛</div>
          <p className="text-neutral-600">Carregando módulos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Link
          href="/dashboard"
          className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
        >
          ← Voltar
        </Link>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      </div>
    )
  }

  if (!course) {
    return <div>Curso não encontrado</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard"
          className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
        >
          ← Voltar aos Cursos
        </Link>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">{course.name}</h1>
        <p className="text-neutral-600">{course.description}</p>
      </div>

      {/* Modules */}
      <div className="space-y-6">
        {course.modules.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-lg border-2 border-dashed border-neutral-300">
            <p className="text-neutral-600">Nenhum módulo disponível</p>
          </div>
        ) : (
          course.modules.map((module) => (
            <div key={module.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Module Header */}
              <div className="bg-primary-50 p-6 border-l-4 border-primary-600">
                <h2 className="text-xl font-bold text-primary-900 mb-2">
                  {module.order}. {module.name}
                </h2>
                <p className="text-neutral-600">{module.description}</p>
              </div>

              {/* Lessons */}
              <div className="divide-y">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-6 hover:bg-neutral-50 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 mb-1">
                          {lesson.order}. {lesson.name}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-3">
                          {lesson.description}
                        </p>

                        {lesson.duration && (
                          <p className="text-xs text-neutral-500">
                            ⏱️ {lesson.duration} minutos
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contents */}
                    {lesson.contents.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {lesson.contents.map((content) => (
                          <Link
                            key={content.id}
                            href={`/dashboard/lesson/${lesson.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 rounded text-primary-700 hover:text-primary-900 font-semibold transition"
                          >
                            {content.type === 'PDF' && '📄'}
                            {content.type === 'VIDEO' && '🎥'}
                            {content.type === 'TEXT' && '📝'}
                            {content.type === 'LINK' && '🔗'}
                            {content.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
