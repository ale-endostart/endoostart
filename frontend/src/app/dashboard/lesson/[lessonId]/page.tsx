'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import PDF viewer to avoid server-side issues
const PDFViewer = dynamic(
  () => import('@/components/members/PDFViewer').then((mod) => mod.PDFViewer),
  { ssr: false, loading: () => <div>Carregando visualizador de PDF...</div> }
)

import { VideoEmbed } from '@/components/members/VideoEmbed'

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
}

export default function LessonPage() {
  const { data: session } = useSession()
  const params = useParams()
  const lessonId = params.lessonId as string
  const router = useRouter()

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [activeContent, setActiveContent] = useState<Content | null>(null)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isTracking, setIsTracking] = useState(false)

  // Fetch lesson (simulated - in real app would call API)
  useEffect(() => {
    if (!session?.user || !lessonId) return

    // Mock lesson data - in production, fetch from API
    const mockLesson: Lesson = {
      id: lessonId,
      name: 'Técnicas Avançadas de Endoscopia',
      description: 'Aprenda as técnicas mais avançadas para procedimentos de endoscopia',
      contents: [
        {
          id: '1',
          type: 'PDF',
          title: 'Guia Completo - Técnicas Avançadas',
          url: 'https://example.com/pdf1.pdf',
          description: 'PDF com instruções passo a passo',
          order: 1,
        },
        {
          id: '2',
          type: 'VIDEO',
          title: 'Demonstração Prática',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          description: 'Vídeo de demonstração prática',
          order: 2,
        },
      ],
    }

    setLesson(mockLesson)
    setActiveContent(mockLesson.contents[0])
    setIsLoading(false)

    // Track view
    trackView()
  }, [session, lessonId])

  async function trackView() {
    if (!session?.user) return

    try {
      setIsTracking(true)
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/content/${activeContent?.id}/track-view`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${(session as any).accessToken}`,
          },
        }
      )
    } catch (err) {
      console.error('Failed to track view:', err)
    } finally {
      setIsTracking(false)
    }
  }

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

  if (!lesson) {
    return <div>Aula não encontrada</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard"
          className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
        >
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">{lesson.name}</h1>
        <p className="text-neutral-600">{lesson.description}</p>
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
                <Suspense fallback={<div>Carregando PDF...</div>}>
                  <div className="h-96 md:h-[600px]">
                    <PDFViewer
                      url={activeContent.url}
                      title={activeContent.title}
                      onDownload={() => handleDownload(activeContent.id)}
                    />
                  </div>
                </Suspense>
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
            <h3 className="font-bold text-neutral-900 mb-4">📚 Conteúdo da Aula</h3>
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
          </div>
        </div>
      </div>
    </div>
  )
}
