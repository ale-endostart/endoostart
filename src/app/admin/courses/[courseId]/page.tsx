'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Content { id: string; type: string; title: string; description: string; url: string; fileSize: number | null; mimeType: string | null; order: number }
interface Lesson { id: string; name: string; description: string; order: number; duration: number | null; contents: Content[] }
interface Module { id: string; name: string; description: string; order: number; lessons: Lesson[] }
interface Course { id: string; slug: string; name: string; description: string; shortDescription: string; price: number; durationWeeks: number; difficulty: string; imageUrl: string; isActive: boolean; _count: { enrollments: number }; modules: Module[] }

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function CourseEditor() {
  const { data: session, status } = useSession()
  const params = useParams()
  const router = useRouter()
  const courseId = params?.courseId as string || ''
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set())

  // Add forms
  const [addingModule, setAddingModule] = useState(false)
  const [addingLessonTo, setAddingLessonTo] = useState<string | null>(null)
  const [addingContentTo, setAddingContentTo] = useState<string | null>(null)
  const [moduleForm, setModuleForm] = useState({ name: '', description: '' })
  const [lessonForm, setLessonForm] = useState({ name: '', description: '', duration: '' })
  const [contentForm, setContentForm] = useState({ title: '', description: '', type: 'VIDEO', url: '' })
  const [contentFile, setContentFile] = useState<File | null>(null)

  // Edit states
  const [editingCourse, setEditingCourse] = useState(false)
  const [courseForm, setCourseForm] = useState({ name: '', slug: '', description: '', shortDescription: '', price: 0, durationWeeks: 4, difficulty: 'BEGINNER', imageUrl: '' })
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null)
  const [editModuleForm, setEditModuleForm] = useState({ name: '', description: '' })
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null)
  const [editLessonForm, setEditLessonForm] = useState({ name: '', description: '', duration: '' })

  const [processing, setProcessing] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
        setExpandedModules(new Set(data.modules.map((m: Module) => m.id)))
      } else { router.push('/admin/courses') }
    } catch { router.push('/admin/courses') } finally { setIsLoading(false) }
  }

  // ---- COURSE EDIT ----
  function startEditCourse() {
    if (!course) return
    setCourseForm({
      name: course.name,
      slug: course.slug,
      description: course.description,
      shortDescription: course.shortDescription,
      price: course.price,
      durationWeeks: course.durationWeeks,
      difficulty: course.difficulty,
      imageUrl: course.imageUrl || '',
    })
    setEditingCourse(true)
  }

  async function saveCourse(e: React.FormEvent) {
    e.preventDefault()
    setProcessing('course')
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${courseId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...courseForm, price: Number(courseForm.price), durationWeeks: Number(courseForm.durationWeeks) }),
      })
      if (res.ok) {
        setEditingCourse(false)
        setSuccess('Curso atualizado!')
        fetchCourse()
        setTimeout(() => setSuccess(''), 3000)
      } else { const d = await res.json(); setError(d.error || 'Erro ao atualizar curso') }
    } finally { setProcessing('') }
  }

  // ---- MODULE CRUD ----
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

  function startEditModule(mod: Module) {
    setEditingModuleId(mod.id)
    setEditModuleForm({ name: mod.name, description: mod.description })
  }

  async function saveModule(e: React.FormEvent, moduleId: string) {
    e.preventDefault()
    setProcessing('editModule')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/modules/${moduleId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editModuleForm),
      })
      if (res.ok) { setEditingModuleId(null); fetchCourse(); setSuccess('Modulo atualizado!'); setTimeout(() => setSuccess(''), 3000) }
      else { const d = await res.json(); setError(d.error) }
    } finally { setProcessing('') }
  }

  async function deleteModule(moduleId: string) {
    if (!confirm('Desativar este modulo?')) return
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/modules/${moduleId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchCourse()
  }

  // ---- LESSON CRUD ----
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

  function startEditLesson(lesson: Lesson) {
    setEditingLessonId(lesson.id)
    setEditLessonForm({ name: lesson.name, description: lesson.description, duration: lesson.duration?.toString() || '' })
  }

  async function saveLesson(e: React.FormEvent, lessonId: string) {
    e.preventDefault()
    setProcessing('editLesson')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons/${lessonId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: editLessonForm.name, description: editLessonForm.description, duration: editLessonForm.duration ? parseInt(editLessonForm.duration) : null }),
      })
      if (res.ok) { setEditingLessonId(null); fetchCourse(); setSuccess('Aula atualizada!'); setTimeout(() => setSuccess(''), 3000) }
      else { const d = await res.json(); setError(d.error) }
    } finally { setProcessing('') }
  }

  async function deleteLesson(lessonId: string) {
    if (!confirm('Desativar esta aula?')) return
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons/${lessonId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchCourse()
  }

  // ---- CONTENT CRUD ----
  async function addContent(e: React.FormEvent, lessonId: string) {
    e.preventDefault()
    setProcessing('content')
    try {
      const formData = new FormData()
      formData.append('title', contentForm.title)
      formData.append('description', contentForm.description)
      formData.append('type', contentForm.type)
      if (contentForm.url) formData.append('url', contentForm.url)
      if (contentFile) formData.append('file', contentFile)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/lessons/${lessonId}/content`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData,
      })
      if (res.ok) {
        setAddingContentTo(null)
        setContentForm({ title: '', description: '', type: 'VIDEO', url: '' })
        setContentFile(null)
        fetchCourse()
        setSuccess('Conteudo adicionado!')
        setTimeout(() => setSuccess(''), 3000)
      } else { const d = await res.json(); setError(d.error) }
    } finally { setProcessing('') }
  }

  async function deleteContent(contentId: string) {
    if (!confirm('Excluir este conteudo?')) return
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/content/${contentId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchCourse()
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
  const difficultyLabel: Record<string, string> = { BEGINNER: 'Iniciante', INTERMEDIATE: 'Intermediario', ADVANCED: 'Avancado' }

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
        <button onClick={startEditCourse} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
          Editar Curso
        </button>
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}<button onClick={() => setError('')} className="ml-2 font-bold">x</button></div>}
      {success && <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">{success}</div>}

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditingCourse(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-900">Editar Curso</h2>
            </div>
            <form onSubmit={saveCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Nome do Curso *</label>
                <input type="text" required value={courseForm.name} onChange={e => setCourseForm({...courseForm, name: e.target.value, slug: slugify(e.target.value)})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Slug</label>
                <input type="text" required value={courseForm.slug} onChange={e => setCourseForm({...courseForm, slug: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Descricao Curta *</label>
                <input type="text" required value={courseForm.shortDescription} onChange={e => setCourseForm({...courseForm, shortDescription: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Descricao Completa *</label>
                <textarea required rows={3} value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Preco (R$)</label>
                  <input type="number" min="0" step="0.01" value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Semanas</label>
                  <input type="number" min="1" value={courseForm.durationWeeks} onChange={e => setCourseForm({...courseForm, durationWeeks: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Nivel</label>
                  <select value={courseForm.difficulty} onChange={e => setCourseForm({...courseForm, difficulty: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option value="BEGINNER">Iniciante</option>
                    <option value="INTERMEDIATE">Intermediario</option>
                    <option value="ADVANCED">Avancado</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">URL da Imagem</label>
                <input type="text" value={courseForm.imageUrl} onChange={e => setCourseForm({...courseForm, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setEditingCourse(false)} className="px-4 py-2 text-sm font-medium text-neutral-600">Cancelar</button>
                <button type="submit" disabled={processing === 'course'} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg disabled:opacity-50">
                  {processing === 'course' ? 'Salvando...' : 'Salvar Curso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Info Summary */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-neutral-500 text-xs font-medium mb-1">Nivel</p>
            <p className="font-semibold text-neutral-900">{difficultyLabel[course.difficulty] || course.difficulty}</p>
          </div>
          <div>
            <p className="text-neutral-500 text-xs font-medium mb-1">Preco</p>
            <p className="font-semibold text-neutral-900">R$ {course.price.toLocaleString('pt-BR')}</p>
          </div>
          <div>
            <p className="text-neutral-500 text-xs font-medium mb-1">Duracao</p>
            <p className="font-semibold text-neutral-900">{course.durationWeeks} semana(s)</p>
          </div>
          <div>
            <p className="text-neutral-500 text-xs font-medium mb-1">Status</p>
            <p className={`font-semibold ${course.isActive ? 'text-emerald-600' : 'text-red-600'}`}>{course.isActive ? 'Ativo' : 'Desativado'}</p>
          </div>
        </div>
      </div>

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
          <div className="text-center py-12 bg-white rounded-xl border border-neutral-200"><p className="text-neutral-400">Nenhum modulo ainda. Clique em &quot;Adicionar Modulo&quot; para comecar.</p></div>
        )}

        {course.modules.map((mod, mi) => (
          <div key={mod.id} className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            {/* Module Header */}
            {editingModuleId === mod.id ? (
              <form onSubmit={e => saveModule(e, mod.id)} className="px-5 py-4 bg-blue-50 border-b border-blue-200 space-y-3">
                <p className="text-sm font-semibold text-blue-800">Editar Modulo</p>
                <input type="text" required value={editModuleForm.name} onChange={e => setEditModuleForm({...editModuleForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <textarea value={editModuleForm.description} onChange={e => setEditModuleForm({...editModuleForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={2} />
                <div className="flex gap-2">
                  <button type="submit" disabled={processing === 'editModule'} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">{processing === 'editModule' ? 'Salvando...' : 'Salvar'}</button>
                  <button type="button" onClick={() => setEditingModuleId(null)} className="px-4 py-2 text-sm text-neutral-600">Cancelar</button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-3 px-5 py-4 bg-neutral-50 border-b border-neutral-100 cursor-pointer" onClick={() => toggleModule(mod.id)}>
                <svg className={`w-4 h-4 text-neutral-400 transition-transform ${expandedModules.has(mod.id) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">M{mi + 1}</span>
                <div className="flex-1">
                  <p className="font-semibold text-neutral-900 text-sm">{mod.name}</p>
                  <p className="text-xs text-neutral-500">{mod.lessons.length} aula(s)</p>
                </div>
                <button onClick={e => { e.stopPropagation(); startEditModule(mod) }} className="p-1.5 text-neutral-400 hover:text-blue-500 rounded transition-colors" title="Editar modulo">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                </button>
                <button onClick={e => { e.stopPropagation(); deleteModule(mod.id) }} className="p-1.5 text-neutral-400 hover:text-red-500 rounded transition-colors" title="Desativar modulo">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                </button>
              </div>
            )}

            {/* Lessons */}
            {expandedModules.has(mod.id) && (
              <div className="divide-y divide-neutral-100">
                {mod.lessons.map((lesson, li) => (
                  <div key={lesson.id}>
                    {/* Lesson Header */}
                    {editingLessonId === lesson.id ? (
                      <form onSubmit={e => saveLesson(e, lesson.id)} className="mx-5 my-3 ml-12 p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
                        <p className="text-sm font-semibold text-amber-800">Editar Aula</p>
                        <input type="text" required value={editLessonForm.name} onChange={e => setEditLessonForm({...editLessonForm, name: e.target.value})}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                        <textarea value={editLessonForm.description} onChange={e => setEditLessonForm({...editLessonForm, description: e.target.value})}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent" rows={2} />
                        <input type="number" placeholder="Duracao (minutos)" value={editLessonForm.duration} onChange={e => setEditLessonForm({...editLessonForm, duration: e.target.value})}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                        <div className="flex gap-2">
                          <button type="submit" disabled={processing === 'editLesson'} className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">{processing === 'editLesson' ? 'Salvando...' : 'Salvar'}</button>
                          <button type="button" onClick={() => setEditingLessonId(null)} className="px-4 py-2 text-sm text-neutral-600">Cancelar</button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex items-center gap-3 px-5 py-3 pl-12 hover:bg-neutral-50 cursor-pointer" onClick={() => toggleLesson(lesson.id)}>
                        <svg className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${expandedLessons.has(lesson.id) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        <span className="text-xs text-neutral-400 font-mono">{mi + 1}.{li + 1}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-800">{lesson.name}</p>
                          <p className="text-xs text-neutral-400">{lesson.contents.length} conteudo(s){lesson.duration ? ` \u00B7 ${lesson.duration}min` : ''}</p>
                        </div>
                        <button onClick={e => { e.stopPropagation(); startEditLesson(lesson) }} className="p-1.5 text-neutral-400 hover:text-amber-500 rounded transition-colors" title="Editar aula">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                        </button>
                        <button onClick={e => { e.stopPropagation(); setAddingContentTo(addingContentTo === lesson.id ? null : lesson.id) }} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="Adicionar conteudo">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        </button>
                        <button onClick={e => { e.stopPropagation(); deleteLesson(lesson.id) }} className="p-1.5 text-neutral-400 hover:text-red-500 rounded transition-colors" title="Desativar aula">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                        </button>
                      </div>
                    )}

                    {/* Content items */}
                    {expandedLessons.has(lesson.id) && lesson.contents.length > 0 && (
                      <div className="pl-20 pr-5 pb-2 space-y-1">
                        {lesson.contents.map(c => (
                          <div key={c.id} className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-sm">
                            <span>{typeIcon[c.type] || '\u{1F4CE}'}</span>
                            <span className="flex-1 text-neutral-700">{c.title}</span>
                            <span className="text-[10px] text-neutral-400 uppercase">{typeLabel[c.type]}</span>
                            {c.fileSize && <span className="text-[10px] text-neutral-400">{(c.fileSize / 1024 / 1024).toFixed(1)}MB</span>}
                            {c.url && (
                              <a href={c.url} target="_blank" rel="noopener noreferrer" className="p-1 text-blue-500 hover:text-blue-700" title="Abrir">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                              </a>
                            )}
                            <button onClick={() => deleteContent(c.id)} className="p-1 text-neutral-400 hover:text-red-500">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

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
                        {(contentForm.type === 'VIDEO' || contentForm.type === 'LINK') && (
                          <input type="url" placeholder="URL do video ou link" value={contentForm.url} onChange={e => setContentForm({...contentForm, url: e.target.value})}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                        )}
                        {contentForm.type === 'PDF' && (
                          <div>
                            <input type="file" accept=".pdf" onChange={e => setContentFile(e.target.files?.[0] || null)}
                              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white" />
                            <p className="text-xs text-neutral-500 mt-1">Maximo 50MB. O PDF sera enviado para o Cloudinary.</p>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button type="submit" disabled={processing === 'content'} className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">{processing === 'content' ? 'Enviando...' : 'Adicionar'}</button>
                          <button type="button" onClick={() => { setAddingContentTo(null); setContentFile(null) }} className="px-4 py-2 text-sm text-neutral-600">Cancelar</button>
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
