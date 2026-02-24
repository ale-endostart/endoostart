'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface StudentEnrollment {
  courseId: string
  course: { name: string }
  isActive: boolean
  progress: number
}

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
  enrollments: StudentEnrollment[]
}

export default function AdminPanel() {
  const { data: session } = useSession()
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!session?.user) return

    if (session.user.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }

    fetchStudents()
  }, [session, router])

  async function fetchStudents() {
    try {
      setIsLoading(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/students`,
        {
          headers: {
            Authorization: `Bearer ${(session as any).accessToken}`,
          },
        }
      )

      if (!res.ok) throw new Error('Failed to fetch students')
      const data = await res.json()
      setStudents(data)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar estudantes')
    } finally {
      setIsLoading(false)
    }
  }

  async function grantAccess(studentId: string) {
    try {
      setIsProcessing(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/students/${studentId}/grant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${(session as any).accessToken}`,
          },
          body: JSON.stringify({}),
        }
      )

      if (!res.ok) throw new Error('Failed to grant access')
      await fetchStudents()
    } catch (err: any) {
      setError(err.message || 'Erro ao conceder acesso')
    } finally {
      setIsProcessing(false)
    }
  }

  async function revokeAccess(studentId: string) {
    try {
      setIsProcessing(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/students/${studentId}/revoke`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${(session as any).accessToken}`,
          },
          body: JSON.stringify({}),
        }
      )

      if (!res.ok) throw new Error('Failed to revoke access')
      await fetchStudents()
    } catch (err: any) {
      setError(err.message || 'Erro ao revogar acesso')
    } finally {
      setIsProcessing(false)
    }
  }

  const filteredStudents = students.filter(
    (s) =>
      s.email.toLowerCase().includes(filter.toLowerCase()) ||
      s.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      s.lastName.toLowerCase().includes(filter.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⌛</div>
          <p className="text-neutral-600">Carregando estudantes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          ⚙️ Painel Administrativo
        </h1>
        <p className="text-neutral-600">
          Gerencie o acesso dos estudantes aos cursos
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Buscar por email, nome..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
        />
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-neutral-600 text-sm mb-2">Total de Estudantes</p>
          <p className="text-4xl font-bold text-primary-600">{students.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-neutral-600 text-sm mb-2">Com Acesso</p>
          <p className="text-4xl font-bold text-green-600">
            {students.filter((s) => s.hasAccess).length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-neutral-600 text-sm mb-2">Sem Acesso</p>
          <p className="text-4xl font-bold text-red-600">
            {students.filter((s) => !s.hasAccess).length}
          </p>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary-900">
                  Estudante
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary-900">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary-900">
                  Cursos Inscritos
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-primary-900">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-primary-900">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-neutral-600">
                    Nenhum estudante encontrado
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {student.firstName} {student.lastName}
                        </p>
                        {student.crm && (
                          <p className="text-xs text-neutral-600">CRM: {student.crm}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{student.email}</td>
                    <td className="px-6 py-4">
                      {student.enrollments.length === 0 ? (
                        <span className="text-neutral-500 text-sm">-</span>
                      ) : (
                        <div className="space-y-1">
                          {student.enrollments.map((e) => (
                            <div
                              key={e.courseId}
                              className="text-sm text-neutral-700"
                            >
                              {e.course.name}
                              {e.isActive ? (
                                <span className="text-green-600 ml-1">✓</span>
                              ) : (
                                <span className="text-neutral-400 ml-1">✗</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {student.hasAccess ? (
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          ✓ Ativo
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          ✗ Inativo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {student.hasAccess ? (
                        <button
                          onClick={() => revokeAccess(student.id)}
                          disabled={isProcessing}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 text-white rounded text-sm font-semibold transition"
                        >
                          Revogar
                        </button>
                      ) : (
                        <button
                          onClick={() => grantAccess(student.id)}
                          disabled={isProcessing}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-neutral-400 text-white rounded text-sm font-semibold transition"
                        >
                          Conceder
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
