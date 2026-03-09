import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../utils/api';

interface Course {
  id: string;
  name: string;
  description: string;
  progress?: number;
  totalModules?: number;
  totalLessons?: number;
}

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    fetchCourses();
  }, [authLoading]);

  const fetchCourses = async () => {
    try {
      const data = await api.get('/api/students/courses');
      setCourses(data.courses || data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cursos');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-brand-blue mb-2">
          Bem-vindo, {user?.firstName}!
        </h1>
        <p className="text-neutral-600">Continue sua jornada de aprendizado em endoscopia</p>
      </motion.div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Courses */}
      <h2 className="text-xl font-serif font-bold text-brand-blue mb-6">Seus Cursos</h2>

      {courses.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-premium p-12 text-center">
          <svg className="w-16 h-16 text-brand-blue/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-neutral-600 text-lg mb-2">Nenhum curso disponível ainda</p>
          <p className="text-neutral-500 text-sm mb-6">Entre em contato com a equipe para obter acesso</p>
          <a
            href="https://wa.me/5511943375337?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20cursos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            Contatar Equipe
          </a>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-premium hover:shadow-card-hover transition-all group overflow-hidden"
            >
              <div className="h-28 bg-gradient-to-br from-brand-blue to-brand-blue/80 flex items-center justify-center px-6">
                <h3 className="text-white font-serif font-bold text-lg text-center">{course.name}</h3>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                {course.totalModules !== undefined && (
                  <p className="text-xs text-neutral-500 mb-3">
                    {course.totalModules} módulos · {course.totalLessons || 0} aulas
                  </p>
                )}

                {course.progress !== undefined && (
                  <div className="mb-5">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-neutral-500">Progresso</span>
                      <span className="text-xs font-bold text-brand-blue">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-gold rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                )}

                <Link
                  href={`/dashboard/course/${course.id}`}
                  className="block w-full text-center bg-brand-blue text-white py-2.5 rounded-lg text-sm font-medium hover:bg-brand-blue/90 transition-colors group-hover:bg-brand-gold group-hover:text-brand-blue"
                >
                  Acessar Curso
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
