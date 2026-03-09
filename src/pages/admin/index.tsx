import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  crm?: string;
  hasAccess: boolean;
  enrolledAt: string;
}

export default function AdminPanel() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/signin');
      return;
    }

    const parsedUser = JSON.parse(userData);

    // Check if user is admin
    if (parsedUser.role !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }

    setUser(parsedUser);
    fetchStudents(token);
  }, [router]);

  const fetchStudents = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/students', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar alunos');
      }

      const data = await response.json();
      setStudents(data.students || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrantAccess = async (studentId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/admin/students/${studentId}/grant`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao conceder acesso');
      }

      setStudents(prev =>
        prev.map(s => (s.id === studentId ? { ...s, hasAccess: true } : s))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRevokeAccess = async (studentId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/admin/students/${studentId}/revoke`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao revogar acesso');
      }

      setStudents(prev =>
        prev.map(s => (s.id === studentId ? { ...s, hasAccess: false } : s))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const filteredStudents = students.filter(
    s =>
      s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-lightGray">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brand-blue font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-lightGray">
      {/* Header */}
      <header className="bg-white shadow-premium sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo_endostart.webp"
                alt="EndoStart"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-serif font-bold text-brand-blue hidden sm:inline">
                EndoStart
              </span>
              <span className="text-sm font-bold bg-brand-gold text-brand-blue px-3 py-1 rounded-full">
                ADMIN
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-brand-blue">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-neutral-600">Administrador</p>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-medium hover:bg-brand-blue/90 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif font-bold text-brand-blue mb-2">
            Painel de Administração
          </h1>
          <p className="text-lg text-neutral-600">
            Gerencie o acesso de alunos aos cursos
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-premium p-6"
          >
            <p className="text-neutral-600 text-sm mb-2">Total de Alunos</p>
            <p className="text-4xl font-serif font-bold text-brand-blue">
              {students.length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-premium p-6"
          >
            <p className="text-neutral-600 text-sm mb-2">Com Acesso</p>
            <p className="text-4xl font-serif font-bold text-green-600">
              {students.filter(s => s.hasAccess).length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-premium p-6"
          >
            <p className="text-neutral-600 text-sm mb-2">Sem Acesso</p>
            <p className="text-4xl font-serif font-bold text-red-600">
              {students.filter(s => !s.hasAccess).length}
            </p>
          </motion.div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-premium p-6 mb-8">
          <input
            type="text"
            placeholder="Buscar aluno por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all"
          />
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-brand-lightGray">
                  <th className="px-6 py-4 text-left text-sm font-bold text-brand-blue">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-brand-blue">
                    E-mail
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-brand-blue">
                    CRM
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-brand-blue">
                    Inscrição
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-brand-blue">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-brand-blue">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-neutral-600">
                      Nenhum aluno encontrado
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-neutral-200 hover:bg-brand-lightGray/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-neutral-900">
                          {student.firstName} {student.lastName}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {student.crm || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {new Date(student.enrolledAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            student.hasAccess
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {student.hasAccess ? 'Com Acesso' : 'Sem Acesso'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {student.hasAccess ? (
                          <button
                            onClick={() => handleRevokeAccess(student.id)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                          >
                            Revogar
                          </button>
                        ) : (
                          <button
                            onClick={() => handleGrantAccess(student.id)}
                            className="text-green-600 hover:text-green-700 font-medium text-sm"
                          >
                            Conceder
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
