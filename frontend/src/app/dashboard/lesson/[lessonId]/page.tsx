'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { VideoEmbed } from '@/components/members/VideoEmbed'

/**
 * Converts a Google Drive share link to an embeddable preview URL.
 * Supports formats:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   https://drive.google.com/open?id=FILE_ID
 */
function getGoogleDriveEmbedUrl(url: string): string {
  // Extract file ID from various Google Drive URL formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`
    }
  }
  // If it's not a recognizable Google Drive link, return as-is
  return url
}

interface Content {
  id: string
  type: 'PDF' | 'VIDEO' | 'TEXT' | 'LINK'
  title: string
  url: string
  description: string
  order: number
}

interface Lesson {
  id: string
  name: string
  description: string
  contents: Content[]
  module?: {
    id: string
    name: string
    courseId: string
    course?: {
      id: string
      name: string
      slug: string
    }
  }
}

function flattenLessons(
  modules: Array<{ order: number; lessons: Array<{ id: string; order: number }> }>
) {
  return [...modules]
    .sort((a, b) => a.order - b.order)
    .flatMap(m => [...m.lessons].sort((a, b) => a.order - b.order))
}

export default function LessonPage() {
  const { data: session, status } = useSession()
  const params = useParams()
  const lessonId = params.lessonId as string
  const router = useRouter()

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [activeContent, setActiveContent] = useState<Content | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [completeError, setCompleteError] = useState('')
  const [prevLessonId, setPrevLessonId] = useState<string | null>(null)
  const [nextLessonId, setNextLessonId] = useState<string | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Fetch lesson from API
  useEffect(() => {
    if (status === 'loading') return

    if (status === 'unauthenticated' || !session?.user) {
      setError('Sessão inválida. Faça login novamente.')
      setIsLoading(false)
      return
    }

    if (!lessonId) {
      setError('Aula não encontrada.')
      setIsLoading(false)
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20000)

    async function fetchLesson() {
      try {
        setIsLoading(true)
        setError('')

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/content/lessons/${lessonId}`,
          {
            headers: {
              Authorization: `Bearer ${(session as any).accessToken}`,
            },
            signal: controller.signal,
          }
        )

        if (res.status === 403) {
          const errData = await res.json().catch(() => null)
          setError(errData?.error || 'Você não tem acesso a esta aula. Verifique sua matrícula.')
          setIsLoading(false)
          return
        }

        if (res.status === 404) {
          setError('Aula não encontrada.')
          setIsLoading(false)
          return
        }

        if (!res.ok) {
          const errData = await res.json().catch(() => null)
          throw new Error(errData?.error || 'Erro ao carregar a aula')
        }

        const data: Lesson = await res.json()
        setLesson(data)

        if (data.contents && data.contents.length > 0) {
          setActiveContent(data.contents[0])
        }

        // Compute prev/next navigation
        if (data.module?.courseId) {
          try {
            const courseRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${data.module.courseId}/modules`,
              { headers: { Authorization: `Bearer ${(session as any).accessToken}` } }
            )
            if (courseRes.ok) {
              const courseData = await courseRes.json()
              const allLessons = flattenLessons(courseData.modules || [])
              const idx = allLessons.findIndex(l => l.id === lessonId)
              setPrevLessonId(idx > 0 ? allLessons[idx - 1].id : null)
              setNextLessonId(idx !== -1 && idx < allLessons.length - 1 ? allLessons[idx + 1].id : null)
            }
          } catch {
            // Navigation is non-critical, ignore errors
          }
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          setError('Tempo limite excedido. Verifique sua conexão ou tente novamente.')
        } else {
          setError(err.message || 'Erro ao carregar a aula')
        }
      } finally {
        clearTimeout(timeout)
        setIsLoading(false)
      }
    }

    fetchLesson()
    return () => { controller.abort() }
  }, [session, lessonId, status])

  // Track content view when active content changes
  useEffect(() => {
    if (!activeContent || !session?.user) return

    async function trackView() {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/content/${activeContent!.id}/track-view`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${(session as any).accessToken}`,
            },
          }
        )
      } catch (err) {
        console.error('Failed to track view:', err)
      }
    }

    trackView()
  }, [activeContent?.id, session])

  async function handleDownload(contentId: string) {
    if (!session?.user) return

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/content/${contentId}/download`,
        {
          headers: {
            Authorization: `Bearer ${(session as any).accessToken}`,
          },
        }
      )

      if (!res.ok) throw new Error('Download failed')

      const data = await res.json()
      window.open(data.url, '_blank')
    } catch (err: any) {
      setError('Erro ao fazer download')
    }
  }

  async function handleMarkComplete() {
    if (!session?.user || !lessonId || isCompleted || isCompleting) return

    setIsCompleting(true)
    setCompleteError('')
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/students/lessons/${lessonId}/complete`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${(session as any).accessToken}`,
          },
        }
      )

      if (res.ok) {
        setIsCompleted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setCompleteError(data.error || 'Erro ao marcar como concluída')
      }
    } catch {
      setCompleteError('Erro de conexão')
    } finally {
      setIsCompleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⌛</div>
          <p className="text-neutral-600">Carregando aula...</p>
        </div>
      </div>
    )
  }

  if (error && !lesson) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 mb-4">{error}</p>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold"
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return <div>Aula não encontrada</div>
  }

  // Build back link: go to course page if we have the courseId, otherwise dashboard
  const backHref = lesson.module?.courseId
    ? `/dashboard/course/${lesson.module.courseId}`
    : '/dashboard'
  const backLabel = lesson.module?.course?.name
    ? `← Voltar para ${lesson.module.course.name}`
    : '← Voltar'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href={backHref}
          className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
        >
          {backLabel}
        </Link>
        {lesson.module && (
          <p className="text-sm text-neutral-500 mb-1">
            {lesson.module.name}
          </p>
        )}
        <h1 className="text-3xl font-bold text-primary-900 mb-2">{lesson.name}</h1>
        <p className="text-neutral-600">{lesson.description}</p>
        {(prevLessonId || nextLessonId) && (
          <div className="flex items-center justify-between gap-4">
            {prevLessonId ? (
              <Link
                href={`/dashboard/lesson/${prevLessonId}`}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
              >
                ← Aula anterior
              </Link>
            ) : (
              <div />
            )}
            {nextLessonId ? (
              <Link
                href={`/dashboard/lesson/${nextLessonId}`}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition"
              >
                Próxima aula →
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Main Content Area */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Content Player */}
        <div className="md:col-span-3">
          {activeContent && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {activeContent.type === 'PDF' && (
                <div className="flex flex-col">
                  <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-neutral-900">{activeContent.title}</h3>
                    <button
                      onClick={() => handleDownload(activeContent.id)}
                      className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm font-semibold"
                    >
                      ⬇️ Baixar PDF
                    </button>
                  </div>
                  <iframe
                    src={
                      activeContent.url.startsWith('/cursos/')
                        ? `${process.env.NEXT_PUBLIC_API_URL}${activeContent.url.replace('/cursos/', '/api/content/files/')}?token=${(session as any)?.accessToken}`
                        : getGoogleDriveEmbedUrl(activeContent.url)
                    }
                    className="w-full h-96 md:h-[600px] border-0"
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
              )}

              {activeContent.type === 'VIDEO' && (
                <div className="p-6">
                  <VideoEmbed
                    url={activeContent.url}
                    title={activeContent.title}
                    type="youtube"
                  />
                </div>
              )}

              {activeContent.type === 'TEXT' && (
                <div className="p-6">
                  <h3 className="font-bold text-lg text-neutral-900 mb-4">
                    {activeContent.title}
                  </h3>
                  <p className="text-neutral-700">{activeContent.description}</p>
                </div>
              )}

              {activeContent.type === 'LINK' && (
                <div className="p-6">
                  <h3 className="font-bold text-lg text-neutral-900 mb-4">
                    {activeContent.title}
                  </h3>
                  <a
                    href={activeContent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg font-semibold"
                  >
                    Abrir Link →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Content List */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-neutral-900 mb-4">Conteúdo da Aula</h3>
            <div className="space-y-2">
              {lesson.contents.map((content) => (
                <button
                  key={content.id}
                  onClick={() => setActiveContent(content)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    activeContent?.id === content.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {content.type === 'PDF' && '📄'}
                    {content.type === 'VIDEO' && '🎥'}
                    {content.type === 'TEXT' && '📝'}
                    {content.type === 'LINK' && '🔗'}
                  </div>
                  <div className="text-sm font-semibold mt-1 line-clamp-2">
                    {content.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Mark as complete button */}
            {completeError && (
              <p className="mt-4 text-xs text-red-600">{completeError}</p>
            )}
            <button
              onClick={handleMarkComplete}
              disabled={isCompleting || isCompleted}
              className={`w-full mt-4 px-4 py-2 rounded-lg font-semibold text-sm transition ${
                isCompleted
                  ? 'bg-green-100 text-green-700 cursor-default border border-green-300'
                  : 'bg-green-600 hover:bg-green-700 text-white disabled:opacity-60'
              }`}
            >
              {isCompleting ? 'Salvando...' : isCompleted ? '✓ Aula concluída' : 'Marcar aula como concluída'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
