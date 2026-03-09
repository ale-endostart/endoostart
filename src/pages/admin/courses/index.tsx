import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../utils/api';

interface Course {
  id: string;
  name: string;
  slug: string;
  modulesCount: number;
  lessonsCount: number;
  studentsEnrolled: number;
  isActive: boolean;
  price: number;
  difficulty: string;
}

export default function AdminCoursesList() {
  const { isLoading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (authLoading) return;
    fetchCourses();
  }, [authLoading]);

  const fetchCourses = async () => {
    try {
      setError('');
      const result = await api.get<{ courses: Course[] }>('/api/admin/courses');
      setCourses(result.courses || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cursos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (courseId: string, currentStatus: boolean) => {
    try {
      setError('');
      setSuccess('');
      await api.put(`/api/admin/courses/${courseId}`, { isActive: !currentStatus });
      setCourses((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, isActive: !currentStatus } : c))
      );
      setSuccess(currentStatus ? 'Curso desativado com sucesso' : 'Curso ativado com sucesso');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar curso');
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading || authLoading) {
    return (
      <AdminLayout title="Cursos">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-brand-blue font-medium">Carregando...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Cursos">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6"
        >
          <p className="text-red-700 text-sm">{error}</p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6"
        >
          <p className="text-green-700 text-sm">{success}</p>
        </motion.div>
      )}

      {/* Header Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div className="relative w-full sm:w-80">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar curso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
          />
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-white font-medium rounded-lg hover:bg-brand-goldHover transition-colors whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Curso
        </Link>
      </motion.div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-premium p-12 text-center"
        >
          <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-neutral-500">Nenhum curso encontrado</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-premium overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-serif font-bold text-brand-blue leading-tight">{course.name}</h3>
                  <span
                    className={`flex-shrink-0 ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      course.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {course.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 mb-4 font-mono">{course.slug}</p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="text-center p-2 bg-brand-lightGray rounded-lg">
                    <p className="text-lg font-bold text-brand-blue">{course.modulesCount}</p>
                    <p className="text-xs text-neutral-500">Modulos</p>
                  </div>
                  <div className="text-center p-2 bg-brand-lightGray rounded-lg">
                    <p className="text-lg font-bold text-brand-blue">{course.lessonsCount}</p>
                    <p className="text-xs text-neutral-500">Aulas</p>
                  </div>
                  <div className="text-center p-2 bg-brand-lightGray rounded-lg">
                    <p className="text-lg font-bold text-brand-blue">{course.studentsEnrolled}</p>
                    <p className="text-xs text-neutral-500">Alunos</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="flex-1 text-center px-4 py-2 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-brand-blue/90 transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleToggleActive(course.id, course.isActive)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      course.isActive
                        ? 'border-red-300 text-red-600 hover:bg-red-50'
                        : 'border-green-300 text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {course.isActive ? 'Desativar' : 'Ativar'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
