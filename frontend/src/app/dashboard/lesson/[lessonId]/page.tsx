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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
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
    <div className="space-y-4 md:space-y-6">
      {/* Header compacto */}
      <div className="space-y-1">
        <Link
          href={backHref}
          className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 min-h-[36px]"
        >
          {backLabel}
        </Link>
        {lesson.module && (
          <p className="text-xs md:text-sm text-neutral-500">{lesson.module.name}</p>
        )}
        <h1 className="text-lg md:text-3xl font-bold text-primary-900 leading-tight">
          {lesson.name}
        </h1>
        {lesson.description && (
          <p className="hidden md:block text-neutral-600 text-sm">{lesson.description}</p>
        )}
      </div>

      {error && (
        <div className="p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6">

        {/* Seletor de conteúdo — barra horizontal no mobile, sidebar no desktop */}
        <div className="md:col-span-1 md:order-2">
          <div className="bg-white rounded-lg shadow p-3 md:p-5">
            <h3 className="font-bold text-neutral-900 mb-2 md:mb-3 text-sm md:text-base">
              Conteúdo da Aula
            </h3>
            {/* Scroll horizontal no mobile, vertical no desktop */}
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-1 md:pb-0 md:space-y-2 snap-x md:snap-none">
              {lesson.contents.map((content) => (
                <button
                  key={content.id}
                  onClick={() => setActiveContent(content)}
                  className={`shrink-0 md:shrink-0 md:w-full text-left px-3 py-2.5 rounded-lg transition min-h-[44px] snap-start cursor-pointer ${
                    activeContent?.id === content.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="shrink-0">
                      {content.type === 'PDF' && '📄'}
                      {content.type === 'VIDEO' && '🎥'}
                      {content.type === 'TEXT' && '📝'}
                      {content.type === 'LINK' && '🔗'}
                    </span>
                    <span className="line-clamp-2">{content.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {completeError && (
              <p className="mt-3 text-xs text-red-600">{completeError}</p>
            )}
            <button
              onClick={handleMarkComplete}
              disabled={isCompleting || isCompleted}
              className={`w-full mt-3 px-4 py-3 rounded-lg font-semibold text-sm transition min-h-[44px] cursor-pointer ${
                isCompleted
                  ? 'bg-green-100 text-green-700 cursor-default border border-green-300'
                  : 'bg-green-600 hover:bg-green-700 text-white disabled:opacity-60'
              }`}
            >
              {isCompleting ? 'Salvando...' : isCompleted ? '✓ Aula concluída' : 'Marcar como concluída'}
            </button>
          </div>
        </div>

        {/* Content Player — ocupa quase toda a tela no mobile */}
        <div className="md:col-span-3 md:order-1">
          {activeContent && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {activeContent.type === 'PDF' && (
                <div className="flex flex-col">
                  {/* Toolbar do PDF */}
                  <div className="bg-white border-b px-3 py-2 md:px-4 md:py-3 flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-neutral-900 text-sm md:text-base truncate flex-1">
                      {activeContent.title}
                    </h3>
                    <button
                      onClick={() => handleDownload(activeContent.id)}
                      className="shrink-0 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm font-semibold min-h-[44px] cursor-pointer transition"
                    >
                      ⬇ Baixar PDF
                    </button>
                  </div>
                  {/* iframe — 70% da tela no mobile, fixo no desktop */}
                  <iframe
                    src={
                      activeContent.url.startsWith('/cursos/')
                        ? `${process.env.NEXT_PUBLIC_API_URL}${activeContent.url.replace('/cursos/', '/api/content/files/')}?token=${(session as any)?.accessToken}`
                        : getGoogleDriveEmbedUrl(activeContent.url)
                    }
                    className="w-full border-0"
                    style={{ height: 'max(65vh, 400px)' }}
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
              )}

              {activeContent.type === 'VIDEO' && (
                <div className="p-4 md:p-6">
                  <VideoEmbed
                    url={activeContent.url}
                    title={activeContent.title}
                    type="youtube"
                  />
                </div>
              )}

              {activeContent.type === 'TEXT' && (
                <div className="p-4 md:p-6">
                  <h3 className="font-bold text-base md:text-lg text-neutral-900 mb-3">
                    {activeContent.title}
                  </h3>
                  <p className="text-neutral-700 text-sm md:text-base leading-relaxed">
                    {activeContent.description}
                  </p>
                </div>
              )}

              {activeContent.type === 'LINK' && (
                <div className="p-4 md:p-6">
                  <h3 className="font-bold text-base md:text-lg text-neutral-900 mb-4">
                    {activeContent.title}
                  </h3>
                  <a
                    href={activeContent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-lg font-semibold min-h-[48px] transition cursor-pointer"
                  >
                    Abrir Link →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navegação prev/next — compacta, no final */}
      {(prevLessonId || nextLessonId) && (
        <div className="flex items-center justify-between gap-3 pt-2">
          {prevLessonId ? (
            <Link
              href={`/dashboard/lesson/${prevLessonId}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition min-h-[48px]"
            >
              ← Aula anterior
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextLessonId ? (
            <Link
              href={`/dashboard/lesson/${nextLessonId}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition min-h-[48px]"
            >
              Próxima aula →
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      )}
    </div>
  )
}
