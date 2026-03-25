'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Content { id: string; type: string; title: string; description: string; url: string; fileSize: number | null; mimeType: string | null; order: number }
interface Lesson { id: string; name: string; description: string; order: number; duration: number | null; contents: Content[] }
interface Module { id: string; name: string; description: string; order: number; lessons: Lesson[] }
interface Course { id: string; slug: string; name: string; description: string; shortDescription: string; price: number; durationWeeks: number; difficulty: string; isActive: boolean; _count: { enrollments: number }; modules: Module[] }

export default function CourseEditor() {
  const { data: session, status } = useSession()
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set())
  const [addingModule, setAddingModule] = useState(false)
  const [addingLessonTo, setAddingLessonTo] = useState<string | null>(null)
  const [addingContentTo, setAddingContentTo] = useState<string | null>(null)
  const [moduleForm, setModuleForm] = useState({ name: '', description: '' })
  const [lessonForm, setLessonForm] = useState({ name: '', description: '', duration: '' })
  const [contentForm, setContentForm] = useState({ title: '', description: '', type: 'VIDEO', url: '' })
  const [processing, setProcessing] = useState('')
  const [error, setError] = useState('')
  const [editingModule, setEditingModule] = useState<string | null>(null)
  const [editingLesson, setEditingLesson] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState<string | null>(null)
  const [editModuleForm, setEditModuleForm] = useState({ name: '', description: '' })
  const [editLessonForm, setEditLessonForm] = useState({ name: '', description: '', duration: '' })
  const [editContentForm, setEditContentForm] = useState({ title: '', description: '', type: 'VIDEO', url: '' })

  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user || session?.user?.role !== 'ADMIN') { router.push('/dashboard'); return }
    fetchCourse()
  }, [session, status, courseId])

  const token = (session as any)?.accessToken

  async function fetchCourse() {
    try {
      setIsLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${courseId}`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setCourse(data)
        // Expand all modules by default
        setExpandedModules(new Set(data.modules.map((m: Module) => m.id)))
      } else { router.push('/admin/courses') }
    } catch { router.push('/admin/courses') } finally { setIsLoading(false) }
  }

  async function addModule(e: React.FormEvent) {
    e.preventDefault()
    setProcessing('module')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${courseId}/modules`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(moduleForm),
      })
      if (res.ok) { setAddingModule(false); setModuleForm({ name: '', description: '' }); fetchCourse() }
      else { const d = await res.json(); setError(d.error) }
    } finally { setProcessing('') }
  }

  async function addLesson(e: React.FormEvent, moduleId: string) {
    e.preventDefault()
    setProcessing('lesson')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/modules/${moduleId}/lessons`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...lessonForm, duration: lessonForm.duration ? parseInt(lessonForm.duration) : null }),
      })
      if (res.ok) { setAddingLessonTo(null); setLessonForm({ name: '', description: '', duration: '' }); fetchCourse() }
      else { const d = await res.json(); setError(d.error) }
    } finally { setProcessing('') }
  }

  async function addContent(e: React.FormEvent, lessonId: string) {
    e.preventDefault()
    setProcessing('content')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons/${lessonId}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(contentForm),
      })
      if (res.ok) { setAddingContentTo(null); setContentForm({ title: '', description: '', type: 'VIDEO', url: '' }); fetchCourse() }
      else { const d = await res.json(); setError(d.error) }
    } finally { setProcessing('') }
  }

  async function deleteModule(moduleId: string) {
    if (!confirm('Desativar este módulo? As aulas ficarão inacessíveis para os alunos.')) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/modules/${moduleId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) fetchCourse()
      else { const d = await res.json(); setError(d.error || 'Erro ao desativar módulo') }
    } catch { setError('Erro de conexão') }
  }

  async function deleteLesson(lessonId: string) {
    if (!confirm('Desativar esta aula? O conteúdo ficará inacessível para os alunos.')) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons/${lessonId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) fetchCourse()
      else { const d = await res.json(); setError(d.error || 'Erro ao desativar aula') }
    } catch { setError('Erro de conexão') }
  }

  async function deleteContent(contentId: string) {
    if (!confirm('Excluir este conteúdo permanentemente? Esta ação não pode ser desfeita.')) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/${contentId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) fetchCourse()
      else { const d = await res.json(); setError(d.error || 'Erro ao excluir conteúdo') }
    } catch { setError('Erro de conexão') }
  }

  async function updateModule(e: React.FormEvent, moduleId: string) {
    e.preventDefault()
    setProcessing('editmodule-' + moduleId)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/modules/${moduleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editModuleForm),
      })
      if (res.ok) { setEditingModule(null); fetchCourse() }
      else { const d = await res.json(); setError(d.error || 'Erro ao atualizar módulo') }
    } catch { setError('Erro de conexão') }
    finally { setProcessing('') }
  }

  async function updateLesson(e: React.FormEvent, lessonId: string) {
    e.preventDefault()
    setProcessing('editlesson-' + lessonId)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons/${lessonId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...editLessonForm,
          duration: editLessonForm.duration ? parseInt(editLessonForm.duration, 10) : null,
        }),
      })
      if (res.ok) { setEditingLesson(null); fetchCourse() }
      else { const d = await res.json(); setError(d.error || 'Erro ao atualizar aula') }
    } catch { setError('Erro de conexão') }
    finally { setProcessing('') }
  }

  async function updateContent(e: React.FormEvent, contentId: string) {
    e.preventDefault()
    setProcessing('editcontent-' + contentId)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/${contentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editContentForm),
      })
      if (res.ok) { setEditingContent(null); fetchCourse() }
      else { const d = await res.json(); setError(d.error || 'Erro ao atualizar conteúdo') }
    } catch { setError('Erro de conexão') }
    finally { setProcessing('') }
  }

  function toggleModule(id: string) {
    const s = new Set(expandedModules)
    s.has(id) ? s.delete(id) : s.add(id)
    setExpandedModules(s)
  }

  function toggleLesson(id: string) {
    const s = new Set(expandedLessons)
    s.has(id) ? s.delete(id) : s.add(id)
    setExpandedLessons(s)
  }

  const typeIcon: Record<string, string> = { PDF: '\u{1F4C4}', VIDEO: '\u{1F3A5}', TEXT: '\u{1F4DD}', LINK: '\u{1F517}' }
  const typeLabel: Record<string, string> = { PDF: 'PDF', VIDEO: 'Video', TEXT: 'Texto', LINK: 'Link' }

  if (isLoading) return <div className="flex items-center justify-center h-96"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
  if (!course) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/courses" className="p-2 hover:bg-neutral-200 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-neutral-900">{course.name}</h1>
          <p className="text-neutral-500 text-sm">{course.shortDescription} &middot; {course._count.enrollments} alunos matriculados</p>
        </div>
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}<button onClick={() => setError('')} className="ml-2 font-bold">x</button></div>}

      {/* Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Modulos e Aulas</h2>
          <button onClick={() => setAddingModule(true)} className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Adicionar Modulo
          </button>
        </div>

        {/* Add Module Form */}
        {addingModule && (
          <form onSubmit={addModule} className="bg-white rounded-xl border border-emerald-200 p-4 space-y-3">
            <input type="text" required placeholder="Nome do modulo" value={moduleForm.name} onChange={e => setModuleForm({...moduleForm, name: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            <textarea placeholder="Descricao" value={moduleForm.description} onChange={e => setModuleForm({...moduleForm, description: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" rows={2} />
            <div className="flex gap-2">
              <button type="submit" disabled={processing === 'module'} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">{processing === 'module' ? 'Salvando...' : 'Salvar'}</button>
              <button type="button" onClick={() => setAddingModule(false)} className="px-4 py-2 text-sm text-neutral-600">Cancelar</button>
            </div>
          </form>
        )}

        {/* Module List */}
        {course.modules.length === 0 && !addingModule && (
          <div className="text-center py-12 bg-white rounded-xl border border-neutral-200"><p className="text-neutral-400">Nenhum modulo ainda. Clique em "Adicionar Modulo" para comecar.</p></div>
        )}

        {course.modules.map((mod, mi) => (
          <div key={mod.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            {/* Module Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-neutral-50 border-b border-neutral-100 cursor-pointer" onClick={() => toggleModule(mod.id)}>
              <svg className={`w-4 h-4 text-neutral-400 transition-transform ${expandedModules.has(mod.id) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">M{mi + 1}</span>
              <div className="flex-1">
                <p className="font-semibold text-neutral-900 text-sm">{mod.name}</p>
                <p className="text-xs text-neutral-500">{mod.lessons.length} aula(s)</p>
              </div>
              <button
                onClick={e => {
                  e.stopPropagation()
                  setEditingModule(editingModule === mod.id ? null : mod.id)
                  setEditModuleForm({ name: mod.name, description: mod.description || '' })
                }}
                className="p-1.5 text-neutral-400 hover:text-blue-500 rounded transition-colors"
                title="Editar módulo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                </svg>
              </button>
              <button onClick={e => { e.stopPropagation(); deleteModule(mod.id) }} className="p-1.5 text-neutral-400 hover:text-red-500 rounded transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
              </button>
            </div>

            {editingModule === mod.id && (
              <form
                onSubmit={e => updateModule(e, mod.id)}
                onClick={e => e.stopPropagation()}
                className="mx-4 mt-2 mb-3 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3"
              >
                <p className="text-sm font-semibold text-blue-800">Editar módulo</p>
                <input
                  type="text" required value={editModuleForm.name}
                  onChange={e => setEditModuleForm({ ...editModuleForm, name: e.target.value })}
                  placeholder="Nome do módulo"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  value={editModuleForm.description}
                  onChange={e => setEditModuleForm({ ...editModuleForm, description: e.target.value })}
                  placeholder="Descrição (opcional)"
                  rows={2}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <button type="submit" disabled={processing === 'editmodule-' + mod.id}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">
                    {processing === 'editmodule-' + mod.id ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button type="button" onClick={e => { e.stopPropagation(); setEditingModule(null) }}
                    className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-800">
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {/* Lessons */}
            {expandedModules.has(mod.id) && (
              <div className="divide-y divide-neutral-100">
                {mod.lessons.map((lesson, li) => (
                  <div key={lesson.id}>
                    {/* Lesson Header */}
                    <div className="flex items-center gap-3 px-5 py-3 pl-12 hover:bg-neutral-50 cursor-pointer" onClick={() => toggleLesson(lesson.id)}>
                      <svg className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${expandedLessons.has(lesson.id) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                      <span className="text-xs text-neutral-400 font-mono">{mi + 1}.{li + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-800">{lesson.name}</p>
                        <p className="text-xs text-neutral-400">{lesson.contents.length} conteudo(s){lesson.duration ? ` \u00B7 ${lesson.duration}min` : ''}</p>
                      </div>
                      <button onClick={e => { e.stopPropagation(); setAddingContentTo(addingContentTo === lesson.id ? null : lesson.id) }} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="Adicionar conteudo">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          setEditingLesson(editingLesson === lesson.id ? null : lesson.id)
                          setEditLessonForm({
                            name: lesson.name,
                            description: lesson.description || '',
                            duration: lesson.duration ? String(lesson.duration) : '',
                          })
                        }}
                        className="p-1 text-neutral-400 hover:text-blue-500 rounded transition-colors"
                        title="Editar aula"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                        </svg>
                      </button>
                      <button onClick={e => { e.stopPropagation(); deleteLesson(lesson.id) }} className="p-1.5 text-neutral-400 hover:text-red-500 rounded transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                      </button>
                    </div>

                    {editingLesson === lesson.id && (
                      <form
                        onSubmit={e => updateLesson(e, lesson.id)}
                        onClick={e => e.stopPropagation()}
                        className="mx-4 mt-2 mb-3 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3"
                      >
                        <p className="text-sm font-semibold text-blue-800">Editar aula</p>
                        <input type="text" required value={editLessonForm.name}
                          onChange={e => setEditLessonForm({ ...editLessonForm, name: e.target.value })}
                          placeholder="Nome da aula"
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                        <textarea value={editLessonForm.description}
                          onChange={e => setEditLessonForm({ ...editLessonForm, description: e.target.value })}
                          placeholder="Descrição (opcional)" rows={2}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                        <input type="number" value={editLessonForm.duration}
                          onChange={e => setEditLessonForm({ ...editLessonForm, duration: e.target.value })}
                          placeholder="Duração em minutos (opcional)"
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                        <div className="flex gap-2">
                          <button type="submit" disabled={processing === 'editlesson-' + lesson.id}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">
                            {processing === 'editlesson-' + lesson.id ? 'Salvando...' : 'Salvar'}
                          </button>
                          <button type="button" onClick={e => { e.stopPropagation(); setEditingLesson(null) }}
                            className="px-4 py-2 text-sm text-neutral-600">Cancelar</button>
                        </div>
                      </form>
                    )}

                    {/* Content items - visible only when expanded */}
                    {expandedLessons.has(lesson.id) && lesson.contents.length > 0 && (
                      <div className="pl-20 pr-5 pb-2 space-y-1">
                        {lesson.contents.map(c => (
                          <div key={c.id}>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-sm">
                              <span>{typeIcon[c.type] || '\u{1F4CE}'}</span>
                              <span className="flex-1 text-neutral-700">{c.title}</span>
                              <span className="text-[10px] text-neutral-400 uppercase">{typeLabel[c.type]}</span>
                              {c.fileSize && <span className="text-[10px] text-neutral-400">{(c.fileSize / 1024 / 1024).toFixed(1)}MB</span>}
                              <button
                                onClick={e => {
                                  e.stopPropagation()
                                  setEditingContent(editingContent === c.id ? null : c.id)
                                  setEditContentForm({ title: c.title, description: c.description || '', type: c.type, url: c.url || '' })
                                }}
                                className="p-1 text-neutral-400 hover:text-blue-500 rounded transition-colors"
                                title="Editar conteúdo"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                                </svg>
                              </button>
                              <button onClick={e => { e.stopPropagation(); deleteContent(c.id) }} className="p-1 text-neutral-400 hover:text-red-500">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Content edit forms - rendered outside expansion guard so they survive collapse */}
                    {lesson.contents.map(c => (
                      editingContent === c.id ? (
                        <div
                          key={c.id}
                          onClick={e => e.stopPropagation()}
                          className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-xl"
                        >
                          <form onSubmit={e => updateContent(e, c.id)} className="space-y-3">
                            <p className="text-sm font-semibold text-blue-800">Editar conteúdo</p>
                            <input type="text" required value={editContentForm.title}
                              onChange={e => setEditContentForm({ ...editContentForm, title: e.target.value })}
                              placeholder="Título"
                              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                            <select value={editContentForm.type}
                              onChange={e => setEditContentForm({ ...editContentForm, type: e.target.value })}
                              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm">
                              <option value="VIDEO">Vídeo</option>
                              <option value="PDF">PDF</option>
                              <option value="TEXT">Texto</option>
                              <option value="LINK">Link</option>
                            </select>
                            {editContentForm.type !== 'TEXT' && (
                              <input type="text" value={editContentForm.url}
                                onChange={e => setEditContentForm({ ...editContentForm, url: e.target.value })}
                                placeholder="URL"
                                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                            )}
                            <textarea value={editContentForm.description}
                              onChange={e => setEditContentForm({ ...editContentForm, description: e.target.value })}
                              placeholder="Descrição (opcional)" rows={2}
                              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                            <div className="flex gap-2">
                              <button type="submit" disabled={processing === 'editcontent-' + c.id}
                                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">
                                {processing === 'editcontent-' + c.id ? 'Salvando...' : 'Salvar'}
                              </button>
                              <button type="button" onClick={() => setEditingContent(null)}
                                className="px-4 py-2 text-sm text-neutral-600">Cancelar</button>
                            </div>
                          </form>
                        </div>
                      ) : null
                    ))}

                    {/* Add Content Form */}
                    {addingContentTo === lesson.id && (
                      <form onSubmit={e => addContent(e, lesson.id)} className="mx-5 mb-3 ml-12 p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                        <p className="text-sm font-semibold text-emerald-800">Adicionar conteudo a &quot;{lesson.name}&quot;</p>
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" required placeholder="Titulo" value={contentForm.title} onChange={e => setContentForm({...contentForm, title: e.target.value})}
                            className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                          <select value={contentForm.type} onChange={e => setContentForm({...contentForm, type: e.target.value})}
                            className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                            <option value="VIDEO">Video</option>
                            <option value="PDF">PDF</option>
                            <option value="TEXT">Texto</option>
                            <option value="LINK">Link</option>
                          </select>
                        </div>
                        <input type="text" placeholder="Descricao (opcional)" value={contentForm.description} onChange={e => setContentForm({...contentForm, description: e.target.value})}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                        {contentForm.type !== 'TEXT' && (
                          <input type="url" placeholder={contentForm.type === 'PDF' ? 'Link do Google Drive' : 'URL do video ou link'} value={contentForm.url} onChange={e => setContentForm({...contentForm, url: e.target.value})}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                        )}
                        <div className="flex gap-2">
                          <button type="submit" disabled={processing === 'content'} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">{processing === 'content' ? 'Enviando...' : 'Adicionar'}</button>
                          <button type="button" onClick={() => setAddingContentTo(null)} className="px-4 py-2 text-sm text-neutral-600">Cancelar</button>
                        </div>
                      </form>
                    )}
                  </div>
                ))}

                {/* Add Lesson */}
                {addingLessonTo === mod.id ? (
                  <form onSubmit={e => addLesson(e, mod.id)} className="mx-5 mb-3 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
                    <p className="text-sm font-semibold text-blue-800">Nova aula em &quot;{mod.name}&quot;</p>
                    <input type="text" required placeholder="Nome da aula" value={lessonForm.name} onChange={e => setLessonForm({...lessonForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <textarea placeholder="Descricao" value={lessonForm.description} onChange={e => setLessonForm({...lessonForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={2} />
                    <input type="number" placeholder="Duracao (minutos)" value={lessonForm.duration} onChange={e => setLessonForm({...lessonForm, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <div className="flex gap-2">
                      <button type="submit" disabled={processing === 'lesson'} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">{processing === 'lesson' ? 'Salvando...' : 'Salvar'}</button>
                      <button type="button" onClick={() => setAddingLessonTo(null)} className="px-4 py-2 text-sm text-neutral-600">Cancelar</button>
                    </div>
                  </form>
                ) : (
                  <div className="px-5 py-3">
                    <button onClick={() => setAddingLessonTo(mod.id)} className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                      Adicionar Aula
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}