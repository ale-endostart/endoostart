'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Course {
  id: string
  name: string
  description: string
  progress: number
  imageUrl: string
  enrolledAt: string
  difficulty: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [courses, setCourses] = useState<Course[]>([])
  const [progress, setProgress] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'loading') return

    if (status === 'unauthenticated' || !session?.user) {
      setIsLoading(false)
      return
    }

    const accessToken = (session as any).accessToken
    if (!accessToken) {
      setError('Sessão inválida. Faça login novamente.')
      setIsLoading(false)
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20000)

    async function fetchData() {
      try {
        const headers = { Authorization: `Bearer ${accessToken}` }
        const opts = { headers, signal: controller.signal }

        const [coursesRes, progressRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students/courses`, opts),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students/progress`, opts),
        ])

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json()
          setCourses(Array.isArray(coursesData) ? coursesData : [])
        }

        if (progressRes.ok) {
          const progressData = await progressRes.json()
          setProgress(progressData)
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Dashboard fetch error:', err)
          setError('Erro ao carregar dados. Verifique sua conexão.')
        }
      } finally {
        clearTimeout(timeout)
        setIsLoading(false)
      }
    }

    fetchData()
    return () => { controller.abort() }
  }, [session, status])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⌛</div>
          <p className="text-neutral-600">Carregando...</p>
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          Bem-vindo, {session?.user?.name}! 👋
        </h1>
        <p className="text-neutral-600">
          Acompanhe seu progresso nos cursos
        </p>
      </div>

      {/* Progress Summary */}
      {progress && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-neutral-600 text-sm mb-2">Progresso Geral</p>
            <p className="text-4xl font-bold text-primary-600">
              {progress.overallProgress}%
            </p>
            <div className="mt-4 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 transition-all"
                style={{ width: `${progress.overallProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-neutral-600 text-sm mb-2">Cursos Inscritos</p>
            <p className="text-4xl font-bold text-accent-600">
              {progress.enrolledCoursesCount}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-neutral-600 text-sm mb-2">Status</p>
            <p className="text-lg font-semibold text-primary-600">
              {session?.user?.role === 'ADMIN' ? '🔑 Administrador' : '📚 Aluno'}
            </p>
          </div>
        </div>
      )}

      {/* Courses */}
      <div>
        <h2 className="text-2xl font-bold text-primary-900 mb-6">Meus Cursos</h2>

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
                {/* Course Image */}
                <div className="h-40 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-6xl">
                  📚
                </div>

                {/* Course Info */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-primary-900 mb-2 group-hover:text-primary-600 transition">
                    {course.name}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Difficulty */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                      {course.difficulty === 'BEGINNER'
                        ? 'Iniciante'
                        : course.difficulty === 'INTERMEDIATE'
                        ? 'Intermediário'
                        : 'Avançado'}
                    </span>
                  </div>

                  {/* Progress Bar */}
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

                  {/* Button */}
                  <button className="w-full mt-6 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition">
                    Continuar
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
