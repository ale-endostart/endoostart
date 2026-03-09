import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layouts/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../utils/api';

interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalCourses: number;
  totalContents: number;
}

interface RecentEnrollment {
  id: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  enrolledAt: string;
}

interface ActivityItem {
  id: string;
  eventType: string;
  description: string;
  studentName: string;
  timestamp: string;
}

interface DashboardData {
  stats: DashboardStats;
  recentEnrollments: RecentEnrollment[];
  recentActivity: ActivityItem[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export default function AdminDashboard() {
  const { isLoading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    fetchDashboard();
  }, [authLoading]);

  const fetchDashboard = async () => {
    try {
      setError('');
      const result = await api.get<DashboardData>('/api/admin/dashboard');
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar painel');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || authLoading) {
    return (
      <AdminLayout title="Painel">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-brand-blue font-medium">Carregando...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = data?.stats || { totalStudents: 0, activeStudents: 0, totalCourses: 0, totalContents: 0 };

  const statCards = [
    { label: 'Total Alunos', value: stats.totalStudents, color: 'text-brand-blue', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { label: 'Alunos Ativos', value: stats.activeStudents, color: 'text-green-600', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Total Cursos', value: stats.totalCourses, color: 'text-brand-gold', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { label: 'Total Conteudos', value: stats.totalContents, color: 'text-purple-600', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];

  return (
    <AdminLayout title="Painel">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6"
        >
          <p className="text-red-700 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-premium p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-neutral-500 text-sm font-medium">{card.label}</p>
              <svg className={`w-6 h-6 ${card.color} opacity-60`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
              </svg>
            </div>
            <p className={`text-4xl font-serif font-bold ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-white font-medium rounded-lg hover:bg-brand-goldHover transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Curso
        </Link>
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white font-medium rounded-lg hover:bg-brand-blue/90 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Aluno
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enrollments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-premium overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-neutral-200 bg-brand-lightGray">
            <h2 className="text-lg font-serif font-bold text-brand-blue">Matr{'\u00ed'}culas Recentes</h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {(!data?.recentEnrollments || data.recentEnrollments.length === 0) ? (
              <div className="px-6 py-8 text-center text-neutral-500 text-sm">
                Nenhuma matr{'\u00ed'}cula recente
              </div>
            ) : (
              data.recentEnrollments.slice(0, 10).map((enrollment) => (
                <div key={enrollment.id} className="px-6 py-3 hover:bg-brand-lightGray/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{enrollment.studentName}</p>
                      <p className="text-xs text-neutral-500">{enrollment.courseName}</p>
                    </div>
                    <p className="text-xs text-neutral-400">
                      {new Date(enrollment.enrolledAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-premium overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-neutral-200 bg-brand-lightGray">
            <h2 className="text-lg font-serif font-bold text-brand-blue">Atividade Recente</h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {(!data?.recentActivity || data.recentActivity.length === 0) ? (
              <div className="px-6 py-8 text-center text-neutral-500 text-sm">
                Nenhuma atividade recente
              </div>
            ) : (
              data.recentActivity.slice(0, 10).map((activity) => (
                <div key={activity.id} className="px-6 py-3 hover:bg-brand-lightGray/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{activity.description}</p>
                      <p className="text-xs text-neutral-500">{activity.studentName}</p>
                    </div>
                    <p className="text-xs text-neutral-400">
                      {new Date(activity.timestamp).toLocaleDateString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
