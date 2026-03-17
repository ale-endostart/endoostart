'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Comment {
  id: string
  content: string
  isResolved: boolean
  createdAt: string
  user: { id: string; firstName: string; lastName: string; email?: string; role: string }
  lesson: { id: string; name: string; module: { id: string; name: string; course: { id: string; name: string } } }
  replies: { id: string; content: string; createdAt: string; user: { id: string; firstName: string; lastName: string; role: string } }[]
}

export default function AdminComments() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [processing, setProcessing] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user || session?.user?.role !== 'ADMIN') { router.push('/dashboard'); return }
    fetchComments()
  }, [session, status, filter])

  const token = (session as any)?.accessToken

  async function fetchComments() {
    try {
      setIsLoading(true)
      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/comments/admin/all`
      if (filter === 'pending') url += '?resolved=false'
      if (filter === 'resolved') url += '?resolved=true'
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setComments(await res.json())
    } catch (err) { console.error(err) } finally { setIsLoading(false) }
  }

  async function toggleResolved(commentId: string) {
    setProcessing(commentId)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}/resolve`, {
        method: 'PUT', headers: { Authorization: `Bearer ${token}` },
      })
      fetchComments()
    } finally { setProcessing('') }
  }

  async function sendReply(commentId: string, lessonId: string) {
    if (!replyText.trim()) return
    setProcessing('reply')
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lessonId, content: replyText, parentId: commentId }),
      })
      setReplyingTo(null)
      setReplyText('')
      fetchComments()
    } finally { setProcessing('') }
  }

  async function deleteComment(commentId: string) {
    if (!confirm('Excluir este comentario?')) return
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
    })
    fetchComments()
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const pendingCount = comments.filter(c => !c.isResolved).length
  const resolvedCount = comments.filter(c => c.isResolved).length

  if (isLoading) return <div className="flex items-center justify-center h-96"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Comentarios e Duvidas</h1>
        <p className="text-neutral-500 text-sm mt-1">Gerencie as perguntas e comentarios dos alunos</p>
      </div>

      {/* Stats + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex gap-2">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === 'all' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}>
            Todos ({comments.length})
          </button>
          <button onClick={() => setFilter('pending')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === 'pending' ? 'bg-amber-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}>
            Pendentes ({pendingCount})
          </button>
          <button onClick={() => setFilter('resolved')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === 'resolved' ? 'bg-emerald-600 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}>
            Resolvidos ({resolvedCount})
          </button>
        </div>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
          <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
          <p className="text-neutral-500">Nenhum comentario encontrado</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map(c => (
            <div key={c.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${c.isResolved ? 'border-emerald-200' : 'border-neutral-200'}`}>
              <div className="p-5">
                {/* Comment Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-neutral-200 rounded-full flex items-center justify-center text-xs font-semibold text-neutral-600">
                      {c.user.firstName.charAt(0)}{c.user.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{c.user.firstName} {c.user.lastName}</p>
                      <p className="text-xs text-neutral-400">{formatDate(c.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.isResolved ? (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Resolvido</span>
                    ) : (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700">Pendente</span>
                    )}
                  </div>
                </div>

                {/* Context */}
                <div className="mb-3 px-3 py-2 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-500">
                    <span className="font-medium text-neutral-700">{c.lesson.module.course.name}</span> &rarr; {c.lesson.module.name} &rarr; {c.lesson.name}
                  </p>
                </div>

                {/* Comment Content */}
                <p className="text-sm text-neutral-800 mb-4">{c.content}</p>

                {/* Replies */}
                {c.replies.length > 0 && (
                  <div className="ml-6 space-y-3 mb-4">
                    {c.replies.map(r => (
                      <div key={r.id} className={`p-3 rounded-lg ${r.user.role === 'ADMIN' ? 'bg-emerald-50 border border-emerald-100' : 'bg-neutral-50'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-xs font-semibold text-neutral-700">{r.user.firstName} {r.user.lastName}</p>
                          {r.user.role === 'ADMIN' && <span className="text-[10px] font-medium bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded">Admin</span>}
                          <span className="text-[10px] text-neutral-400">{formatDate(r.createdAt)}</span>
                        </div>
                        <p className="text-sm text-neutral-700">{r.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {replyingTo === c.id && (
                  <div className="ml-6 mb-4">
                    <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Escreva sua resposta..."
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" rows={3} />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => sendReply(c.id, c.lesson.id)} disabled={processing === 'reply'} className="px-4 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">
                        {processing === 'reply' ? 'Enviando...' : 'Responder'}
                      </button>
                      <button onClick={() => { setReplyingTo(null); setReplyText('') }} className="px-4 py-1.5 text-sm text-neutral-600">Cancelar</button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-neutral-100 pt-3">
                  <button onClick={() => { setReplyingTo(replyingTo === c.id ? null : c.id); setReplyText('') }}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    Responder
                  </button>
                  <button onClick={() => toggleResolved(c.id)} disabled={processing === c.id}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${c.isResolved ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}>
                    {c.isResolved ? 'Reabrir' : 'Marcar Resolvido'}
                  </button>
                  <button onClick={() => deleteComment(c.id)} className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
