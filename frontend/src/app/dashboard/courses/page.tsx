'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Course {
  id: string
  name: string
  description: string
  shortDescription: string
  imageUrl: string
  difficulty: string
  durationWeeks: number
  progress: number
  enrolledAt: string
}

export default function CoursesPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session?.user) return

    async function fetchCourses() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/students/courses`,
          {
            headers: {
              Authorization: `Bearer ${(session as any).accessToken}`,
            },
          }
        )

        if (!res.ok) throw new Error('Falha ao carregar cursos')
        const data = await res.json()
        setCourses(data)
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar cursos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [session])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">&#8987;</div>
          <p className="text-neutral-600">Carregando cursos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Meus Cursos</h1>
        <p className="text-neutral-600">Todos os seus cursos em um só lugar</p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-lg border-2 border-dashed border-neutral-300">
          <p className="text-neutral-600 mb-4">
            Você ainda não está inscrito em nenhum curso
          </p>
          <p className="text-sm text-neutral-500">
            Entre em contato com um administrador para ser inscrito
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/dashboard/course/${course.id}`}
              className="group bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-6xl">
                {course.imageUrl ? (
                  <img src={course.imageUrl} alt={course.name} className="w-full h-full object-cover" />
                ) : (
                  <span>&#128218;</span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-primary-900 mb-2 group-hover:text-primary-600 transition">
                  {course.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {course.shortDescription || course.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                    {course.difficulty === 'BEGINNER'
                      ? 'Iniciante'
                      : course.difficulty === 'INTERMEDIATE'
                      ? 'Intermediário'
                      : 'Avançado'}
                  </span>
                  {course.durationWeeks && (
                    <span className="text-xs text-neutral-500">
                      {course.durationWeeks} semanas
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-neutral-600">Progresso</p>
                    <p className="text-sm font-semibold text-primary-600">
                      {course.progress}%
                    </p>
                  </div>
                  <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-500 transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/dashboard/course/${course.id}`) }}
                  className="w-full mt-6 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition"
                >
                  Continuar
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
