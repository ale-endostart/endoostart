'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const STATES = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']

interface Student {
  id: string
  email: string
  firstName: string
  lastName: string
  crm?: string
  phone?: string
  state?: string
  hasAccess: boolean
  createdAt: string
  enrollments: { courseId: string; course: { id: string; name: string }; isActive: boolean; progress: number }[]
}

export default function AdminStudents() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [processing, setProcessing] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '', crm: '', phone: '', state: '', hasAccess: false })

  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user || session?.user?.role !== 'ADMIN') { router.push('/dashboard'); return }
    fetchStudents()
  }, [session, status])

  const token = (session as any)?.accessToken

  async function fetchStudents() {
    try {
      setIsLoading(true)
      const url = search
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/students?search=${encodeURIComponent(search)}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/students`
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setStudents(await res.json())
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    fetchStudents()
  }

  async function createStudent(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setProcessing('creating')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Erro ao criar aluno')
        return
      }
      setSuccess('Aluno criado com sucesso!')
      setShowModal(false)
      setForm({ email: '', firstName: '', lastName: '', password: '', crm: '', phone: '', state: '', hasAccess: false })
      fetchStudents()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Erro ao criar aluno')
    } finally {
      setProcessing('')
    }
  }

  async function grantAccess(id: string) {
    setProcessing(id)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/students/${id}/grant`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: '{}',
      })
      fetchStudents()
    } finally { setProcessing('') }
  }

  async function revokeAccess(id: string) {
    setProcessing(id)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/students/${id}/revoke`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: '{}',
      })
      fetchStudents()
    } finally { setProcessing('') }
  }

  async function deleteStudent(id: string, name: string) {
    if (!confirm(`Tem certeza que deseja excluir "${name}"? Esta ação não pode ser desfeita.`)) return
    setProcessing(id)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/students/${id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
      })
      fetchStudents()
      setSuccess('Aluno removido com sucesso')
      setTimeout(() => setSuccess(''), 3000)
    } finally { setProcessing('') }
  }

  const activeCount = students.filter(s => s.hasAccess).length
  const inactiveCount = students.length - activeCount

  if (isLoading && students.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Gerenciar Alunos</h1>
          <p className="text-neutral-500 text-sm mt-1">Adicione, edite e gerencie o acesso dos alunos</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Adicionar Aluno
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">{success}</div>
      )}

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <button type="submit" className="px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
          Buscar
        </button>
      </form>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <p className="text-xs text-neutral-500 font-medium">Total</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{students.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <p className="text-xs text-neutral-500 font-medium">Ativos</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-neutral-200">
          <p className="text-xs text-neutral-500 font-medium">Inativos</p>
          <p className="text-2xl font-bold text-red-500 mt-1">{inactiveCount}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Aluno</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">CRM</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Cursos</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {students.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-neutral-400 text-sm">Nenhum aluno encontrado</td></tr>
              ) : (
                students.map(s => (
                  <tr key={s.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-xs font-semibold text-neutral-600">
                          {s.firstName.charAt(0)}{s.lastName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-neutral-900">{s.firstName} {s.lastName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{s.email}</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{s.crm || '-'}</td>
                    <td className="px-6 py-4">
                      {s.hasAccess ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">Ativo</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">Inativo</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {s.enrollments.length === 0 ? (
                        <span className="text-xs text-neutral-400">Nenhum</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {s.enrollments.map(e => (
                            <span key={e.courseId} className={`text-xs px-2 py-0.5 rounded-full ${e.isActive ? 'bg-blue-50 text-blue-700' : 'bg-neutral-100 text-neutral-500'}`}>
                              {e.course.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {s.hasAccess ? (
                          <button onClick={() => revokeAccess(s.id)} disabled={processing === s.id}
                            className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50">
                            Revogar
                          </button>
                        ) : (
                          <button onClick={() => grantAccess(s.id)} disabled={processing === s.id}
                            className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors disabled:opacity-50">
                            Conceder
                          </button>
                        )}
                        <button onClick={() => deleteStudent(s.id, `${s.firstName} ${s.lastName}`)} disabled={processing === s.id}
                          className="px-3 py-1.5 text-xs font-medium text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-900">Adicionar Novo Aluno</h2>
              <p className="text-sm text-neutral-500 mt-1">Preencha os dados do novo membro</p>
            </div>
            <form onSubmit={createStudent} className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Nome *</label>
                  <input type="text" required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Sobrenome *</label>
                  <input type="text" required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Senha</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Deixe vazio para gerar depois" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">CRM</label>
                  <input type="text" value={form.crm} onChange={e => setForm({...form, crm: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Telefone</label>
                  <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Estado</label>
                <select value={form.state} onChange={e => setForm({...form, state: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option value="">Selecione...</option>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.hasAccess} onChange={e => setForm({...form, hasAccess: e.target.checked})}
                  className="w-4 h-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-sm text-neutral-700">Conceder acesso imediatamente</span>
              </label>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={processing === 'creating'}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50">
                  {processing === 'creating' ? 'Criando...' : 'Criar Aluno'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
