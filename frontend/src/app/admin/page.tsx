'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface DashboardData {
  stats: {
    totalStudents: number
    activeStudents: number
    totalCourses: number
    totalContents: number
  }
  recentEnrollments: {
    id: string
    studentName: string
    studentEmail: string
    courseName: string
    enrolledAt: string
  }[]
  recentActivity: {
    id: string
    eventType: string
    description: string
    studentName: string
    timestamp: string
  }[]
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user || session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    fetchDashboard()
  }, [session, status])

  async function fetchDashboard() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`,
        { headers: { Authorization: `Bearer ${(session as any).accessToken}` } }
      )
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  }

  function formatEventType(type: string) {
    const map: Record<string, string> = {
      CONTENT_VIEW: 'Visualizou conteudo',
      LESSON_COMPLETE: 'Completou aula',
      LOGIN: 'Fez login',
      DOWNLOAD: 'Fez download',
    }
    return map[type] || type
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const stats = data?.stats || { totalStudents: 0, activeStudents: 0, totalCourses: 0, totalContents: 0 }
  const inactiveStudents = stats.totalStudents - stats.activeStudents

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500 text-sm mt-1">Visao geral da sua plataforma</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Total de Alunos</span>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{stats.totalStudents}</p>
          <p className="text-xs text-neutral-400 mt-1">{stats.activeStudents} ativos, {inactiveStudents} inativos</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Alunos Ativos</span>
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{stats.activeStudents}</p>
          <p className="text-xs text-neutral-400 mt-1">{stats.totalStudents > 0 ? Math.round((stats.activeStudents / stats.totalStudents) * 100) : 0}% do total</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Cursos Ativos</span>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{stats.totalCourses}</p>
          <p className="text-xs text-neutral-400 mt-1">cursos publicados</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-neutral-500">Conteudos</span>
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{stats.totalContents}</p>
          <p className="text-xs text-neutral-400 mt-1">PDFs, videos e materiais</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/students" className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all group">
          <div className="w-10 h-10 bg-emerald-50 group-hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">Adicionar Aluno</p>
            <p className="text-xs text-neutral-500">Cadastrar novo membro</p>
          </div>
        </Link>

        <Link href="/admin/courses" className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all group">
          <div className="w-10 h-10 bg-purple-50 group-hover:bg-purple-100 rounded-lg flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">Novo Curso</p>
            <p className="text-xs text-neutral-500">Criar curso do zero</p>
          </div>
        </Link>

        <Link href="/admin/comments" className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all group">
          <div className="w-10 h-10 bg-blue-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">Comentarios</p>
            <p className="text-xs text-neutral-500">Ver duvidas dos alunos</p>
          </div>
        </Link>
      </div>

      {/* Two Column: Recent Enrollments + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-900">Matriculas Recentes</h2>
            <Link href="/admin/students" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {(!data?.recentEnrollments || data.recentEnrollments.length === 0) ? (
              <div className="px-6 py-8 text-center text-neutral-400 text-sm">Nenhuma matricula recente</div>
            ) : (
              data.recentEnrollments.slice(0, 5).map((e) => (
                <div key={e.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{e.studentName}</p>
                    <p className="text-xs text-neutral-500">{e.courseName}</p>
                  </div>
                  <span className="text-xs text-neutral-400">{formatDate(e.enrolledAt)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
          <div className="px-6 py-4 border-b border-neutral-100">
            <h2 className="font-semibold text-neutral-900">Atividade Recente</h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {(!data?.recentActivity || data.recentActivity.length === 0) ? (
              <div className="px-6 py-8 text-center text-neutral-400 text-sm">Nenhuma atividade recente</div>
            ) : (
              data.recentActivity.slice(0, 5).map((a) => (
                <div key={a.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{a.studentName}</p>
                    <p className="text-xs text-neutral-500">{formatEventType(a.eventType)}</p>
                  </div>
                  <span className="text-xs text-neutral-400">{formatDate(a.timestamp)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
