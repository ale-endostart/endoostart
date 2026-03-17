'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Course {
  id: string; slug: string; name: string; description: string; shortDescription: string
  price: number; durationWeeks: number; difficulty: string; imageUrl: string
  isActive: boolean; totalModules: number; totalLessons: number; totalEnrollments: number
}

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function AdminCourses() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [processing, setProcessing] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({ name: '', slug: '', description: '', shortDescription: '', price: 0, durationWeeks: 4, difficulty: 'BEGINNER', imageUrl: '' })

  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user || session?.user?.role !== 'ADMIN') { router.push('/dashboard'); return }
    fetchCourses()
  }, [session, status])

  const token = (session as any)?.accessToken

  async function fetchCourses() {
    try {
      setIsLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setCourses(await res.json())
    } catch (err) { console.error(err) } finally { setIsLoading(false) }
  }

  async function createCourse(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setProcessing('creating')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: Number(form.price), durationWeeks: Number(form.durationWeeks) }),
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Erro ao criar curso'); return }
      setSuccess('Curso criado com sucesso!')
      setShowModal(false)
      setForm({ name: '', slug: '', description: '', shortDescription: '', price: 0, durationWeeks: 4, difficulty: 'BEGINNER', imageUrl: '' })
      fetchCourses()
      setTimeout(() => setSuccess(''), 3000)
    } catch { setError('Erro ao criar curso') } finally { setProcessing('') }
  }

  async function deleteCourse(id: string, name: string) {
    if (!confirm(`Desativar o curso "${name}"?`)) return
    setProcessing(id)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/courses/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      fetchCourses()
    } finally { setProcessing('') }
  }

  const difficultyLabel: Record<string, string> = { BEGINNER: 'Iniciante', INTERMEDIATE: 'Intermediario', ADVANCED: 'Avancado' }
  const difficultyColor: Record<string, string> = { BEGINNER: 'bg-blue-50 text-blue-700', INTERMEDIATE: 'bg-amber-50 text-amber-700', ADVANCED: 'bg-red-50 text-red-700' }

  if (isLoading) return <div className="flex items-center justify-center h-96"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Gerenciar Cursos</h1>
          <p className="text-neutral-500 text-sm mt-1">Crie e gerencie seus cursos</p>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Novo Curso
        </button>
      </div>

      {success && <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">{success}</div>}

      {courses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
          <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84" /></svg>
          <p className="text-neutral-500">Nenhum curso criado ainda</p>
          <button onClick={() => setShowModal(true)} className="mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg">Criar Primeiro Curso</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map(c => (
            <div key={c.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${c.isActive ? 'border-neutral-200' : 'border-red-200 opacity-60'}`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[c.difficulty] || 'bg-neutral-100 text-neutral-600'}`}>
                    {difficultyLabel[c.difficulty] || c.difficulty}
                  </span>
                  {!c.isActive && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-600">Desativado</span>}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">{c.name}</h3>
                <p className="text-sm text-neutral-500 mb-4 line-clamp-2">{c.shortDescription}</p>
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="bg-neutral-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-neutral-900">{c.totalModules}</p>
                    <p className="text-[10px] text-neutral-500 uppercase">Modulos</p>
                  </div>
                  <div className="bg-neutral-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-neutral-900">{c.totalLessons}</p>
                    <p className="text-[10px] text-neutral-500 uppercase">Aulas</p>
                  </div>
                  <div className="bg-neutral-50 rounded-lg py-2">
                    <p className="text-lg font-bold text-neutral-900">{c.totalEnrollments}</p>
                    <p className="text-[10px] text-neutral-500 uppercase">Alunos</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/courses/${c.id}`} className="flex-1 text-center py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-lg transition-colors">
                    Editar
                  </Link>
                  <button onClick={() => deleteCourse(c.id, c.name)} disabled={processing === c.id}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-900">Novo Curso</h2>
            </div>
            <form onSubmit={createCourse} className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Nome do Curso *</label>
                <input type="text" required value={form.name} onChange={e => { setForm({...form, name: e.target.value, slug: slugify(e.target.value)}) }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Slug</label>
                <input type="text" required value={form.slug} onChange={e => setForm({...form, slug: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Descricao Curta *</label>
                <input type="text" required value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Descricao Completa *</label>
                <textarea required rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Preco (R$)</label>
                  <input type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Semanas</label>
                  <input type="number" min="1" value={form.durationWeeks} onChange={e => setForm({...form, durationWeeks: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Nivel</label>
                  <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option value="BEGINNER">Iniciante</option>
                    <option value="INTERMEDIATE">Intermediario</option>
                    <option value="ADVANCED">Avancado</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">URL da Imagem</label>
                <input type="text" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="https://..." />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-neutral-600">Cancelar</button>
                <button type="submit" disabled={processing === 'creating'} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg disabled:opacity-50">
                  {processing === 'creating' ? 'Criando...' : 'Criar Curso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}