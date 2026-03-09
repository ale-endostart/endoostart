import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { api } from '../../../utils/api';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  crm?: string;
  hasAccess: boolean;
  createdAt: string;
  _count?: { enrollments: number };
}

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // New student form
  const [showForm, setShowForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', email: '', password: '' });

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      const data = await api.get('/api/admin/students');
      setStudents(data.students || data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar alunos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrant = async (id: string) => {
    try {
      await api.post(`/api/admin/students/${id}/grant`);
      setStudents(prev => prev.map(s => s.id === id ? { ...s, hasAccess: true } : s));
      setSuccess('Acesso concedido');
      setTimeout(() => setSuccess(''), 3000);
    } catch {}
  };

  const handleRevoke = async (id: string) => {
    try {
      await api.post(`/api/admin/students/${id}/revoke`);
      setStudents(prev => prev.map(s => s.id === id ? { ...s, hasAccess: false } : s));
      setSuccess('Acesso revogado');
      setTimeout(() => setSuccess(''), 3000);
    } catch {}
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/register', { ...newStudent });
      setSuccess('Aluno adicionado');
      setShowForm(false);
      setNewStudent({ firstName: '', lastName: '', email: '', password: '' });
      fetchStudents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar aluno');
    }
  };

  const filtered = students.filter(s =>
    `${s.firstName} ${s.lastName} ${s.email}`.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <AdminLayout title="Alunos">
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Alunos">
      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6"><p className="text-red-700 text-sm">{error}</p></div>}
      {success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6"><p className="text-green-700 text-sm">{success}</p></motion.div>}

      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 text-sm"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-white rounded-lg font-medium hover:bg-brand-goldHover transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Novo Aluno
        </button>
      </div>

      {/* Add student form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleAddStudent}
          className="bg-white rounded-2xl shadow-premium p-6 mb-6"
        >
          <h3 className="font-serif font-bold text-brand-blue mb-4">Adicionar Aluno</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Nome" required value={newStudent.firstName} onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })}
              className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-brand-gold" />
            <input type="text" placeholder="Sobrenome" required value={newStudent.lastName} onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })}
              className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-brand-gold" />
            <input type="email" placeholder="E-mail" required value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
              className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-brand-gold" />
            <input type="password" placeholder="Senha (mín. 8 caracteres)" required minLength={8} value={newStudent.password} onChange={e => setNewStudent({ ...newStudent, password: e.target.value })}
              className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-brand-gold" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-5 py-2 bg-brand-blue text-white rounded-lg text-sm font-medium hover:bg-brand-blue/90 transition-colors">Salvar</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 border border-neutral-300 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 transition-colors">Cancelar</button>
          </div>
        </motion.form>
      )}

      {/* Students table */}
      <div className="bg-white rounded-2xl shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-lightGray border-b border-neutral-200">
                <th className="px-6 py-3 text-left text-xs font-bold text-brand-blue uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-brand-blue uppercase tracking-wider">E-mail</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-brand-blue uppercase tracking-wider hidden md:table-cell">CRM</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-brand-blue uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-brand-blue uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-neutral-500 text-sm">Nenhum aluno encontrado</td></tr>
              ) : (
                filtered.map((student) => (
                  <tr key={student.id} className="border-b border-neutral-100 hover:bg-brand-lightGray/30 transition-colors">
                    <td className="px-6 py-3">
                      <Link href={`/admin/students/${student.id}`} className="font-medium text-neutral-900 hover:text-brand-gold transition-colors">
                        {student.firstName} {student.lastName}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-sm text-neutral-600">{student.email}</td>
                    <td className="px-6 py-3 text-sm text-neutral-600 hidden md:table-cell">{student.crm || '—'}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${student.hasAccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {student.hasAccess ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {student.hasAccess ? (
                        <button onClick={() => handleRevoke(student.id)} className="text-red-600 hover:text-red-700 text-sm font-medium">Revogar</button>
                      ) : (
                        <button onClick={() => handleGrant(student.id)} className="text-green-600 hover:text-green-700 text-sm font-medium">Conceder</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
