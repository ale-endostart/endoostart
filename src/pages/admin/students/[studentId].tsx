import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { api } from '../../../utils/api';

interface Enrollment {
  id: string;
  courseId: string;
  course: { id: string; name: string; slug: string };
  isActive: boolean;
  progress: number;
  enrolledAt: string;
  accessGrantedAt: string | null;
}

interface Completion {
  lessonId: string;
  completedAt: string;
  lesson: {
    id: string;
    name: string;
    module: { id: string; name: string; courseId: string };
  };
}

interface ActivityItem {
  id: string;
  eventType: string;
  metadata: any;
  timestamp: string;
}

interface StudentDetail {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  crm: string | null;
  phone: string | null;
  state: string | null;
  role: string;
  hasAccess: boolean;
  accessGrantedAt: string | null;
  accessRevokedAt: string | null;
  createdAt: string;
  enrollments: Enrollment[];
  completions: Completion[];
  activityLogs: ActivityItem[];
}

interface CourseOption {
  id: string;
  name: string;
}

export default function StudentDetailPage() {
  const router = useRouter();
  const { studentId } = router.query;
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [enrollCourseId, setEnrollCourseId] = useState('');
  const [showEnrollForm, setShowEnrollForm] = useState(false);

  useEffect(() => {
    if (!studentId) return;
    fetchStudent();
    fetchCourses();
  }, [studentId]);

  const fetchStudent = async () => {
    try {
      const data = await api.get(`/api/admin/students/${studentId}`);
      setStudent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar aluno');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await api.get('/api/admin/courses');
      const list = Array.isArray(data) ? data : (data.courses || []);
      setCourses(list);
    } catch {}
  };

  const handleGrant = async () => {
    if (!student) return;
    try {
      await api.post(`/api/admin/students/${student.id}/grant`);
      setStudent(prev => prev ? { ...prev, hasAccess: true, accessGrantedAt: new Date().toISOString() } : null);
      showMessage('Acesso concedido com sucesso');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conceder acesso');
    }
  };

  const handleRevoke = async () => {
    if (!student) return;
    try {
      await api.post(`/api/admin/students/${student.id}/revoke`);
      setStudent(prev => prev ? { ...prev, hasAccess: false, accessRevokedAt: new Date().toISOString() } : null);
      showMessage('Acesso revogado');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao revogar acesso');
    }
  };

  const handleEnroll = async () => {
    if (!student || !enrollCourseId) return;
    try {
      await api.post(`/api/admin/students/${student.id}/enroll`, { courseId: enrollCourseId });
      showMessage('Aluno matriculado com sucesso');
      setShowEnrollForm(false);
      setEnrollCourseId('');
      fetchStudent();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao matricular aluno');
    }
  };

  const showMessage = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  const enrolledCourseIds = new Set(student?.enrollments.map(e => e.courseId) || []);
  const availableCourses = courses.filter(c => !enrolledCourseIds.has(c.id));

  if (isLoading) {
    return (
      <AdminLayout title="Detalhes do Aluno">
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (error && !student) {
    return (
      <AdminLayout title="Detalhes do Aluno">
        <div className="bg-white rounded-2xl shadow-premium p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/admin/students" className="text-brand-gold font-medium hover:underline">Voltar para Alunos</Link>
        </div>
      </AdminLayout>
    );
  }

  if (!student) return null;

  return (
    <AdminLayout title={`${student.firstName} ${student.lastName}`}>
      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6"><p className="text-red-700 text-sm">{error}</p></div>}
      {success && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6"><p className="text-green-700 text-sm">{success}</p></motion.div>}

      {/* Back link */}
      <Link href="/admin/students" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-gold mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Voltar para Alunos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-premium overflow-hidden">
            <div className="bg-gradient-to-r from-brand-blue to-brand-blue/80 px-6 py-8 text-center">
              <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl mx-auto mb-3">
                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
              </div>
              <h2 className="text-xl font-serif font-bold text-white">{student.firstName} {student.lastName}</h2>
              <p className="text-white/70 text-sm mt-1">{student.email}</p>
              <div className="mt-3">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${student.hasAccess ? 'bg-green-400/20 text-green-200' : 'bg-red-400/20 text-red-200'}`}>
                  {student.hasAccess ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">CRM</label>
                <p className="text-neutral-900 font-medium">{student.crm || 'Nao informado'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">Telefone</label>
                <p className="text-neutral-900 font-medium">{student.phone || 'Nao informado'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">Estado</label>
                <p className="text-neutral-900 font-medium">{student.state || 'Nao informado'}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">Cadastro</label>
                <p className="text-neutral-900 font-medium">{new Date(student.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
              {student.accessGrantedAt && (
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Acesso concedido em</label>
                  <p className="text-neutral-900 font-medium">{new Date(student.accessGrantedAt).toLocaleDateString('pt-BR')}</p>
                </div>
              )}

              {/* Access Actions */}
              <div className="pt-4 border-t border-neutral-200">
                {student.hasAccess ? (
                  <button onClick={handleRevoke} className="w-full px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Revogar Acesso
                  </button>
                ) : (
                  <button onClick={handleGrant} className="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    Conceder Acesso
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enrolled Courses */}
          <div className="bg-white rounded-2xl shadow-premium overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 bg-brand-lightGray flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-brand-blue">Cursos Matriculados</h3>
              <button
                onClick={() => setShowEnrollForm(!showEnrollForm)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold text-white rounded-lg text-xs font-medium hover:bg-brand-goldHover transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Matricular
              </button>
            </div>

            {showEnrollForm && availableCourses.length > 0 && (
              <div className="px-6 py-4 bg-brand-lightGray/50 border-b border-neutral-200">
                <div className="flex gap-3">
                  <select
                    value={enrollCourseId}
                    onChange={e => setEnrollCourseId(e.target.value)}
                    className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-brand-gold"
                  >
                    <option value="">Selecionar curso...</option>
                    {availableCourses.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleEnroll}
                    disabled={!enrollCourseId}
                    className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-medium hover:bg-brand-blue/90 disabled:opacity-40 transition-colors"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            )}

            {showEnrollForm && availableCourses.length === 0 && (
              <div className="px-6 py-4 bg-brand-lightGray/50 border-b border-neutral-200">
                <p className="text-sm text-neutral-500">Aluno ja matriculado em todos os cursos disponiveis</p>
              </div>
            )}

            <div className="divide-y divide-neutral-100">
              {student.enrollments.length === 0 ? (
                <div className="px-6 py-8 text-center text-neutral-500 text-sm">Nenhuma matricula encontrada</div>
              ) : (
                student.enrollments.map(enrollment => (
                  <div key={enrollment.id} className="px-6 py-4 hover:bg-brand-lightGray/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-neutral-900">{enrollment.course.name}</h4>
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${enrollment.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {enrollment.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <span>Matriculado: {new Date(enrollment.enrolledAt).toLocaleDateString('pt-BR')}</span>
                      <span>Progresso: {enrollment.progress}%</span>
                    </div>
                    {enrollment.progress > 0 && (
                      <div className="mt-2 w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-gold rounded-full transition-all" style={{ width: `${enrollment.progress}%` }} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Lesson Completions */}
          <div className="bg-white rounded-2xl shadow-premium overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 bg-brand-lightGray">
              <h3 className="text-lg font-serif font-bold text-brand-blue">
                Aulas Concluidas ({student.completions.length})
              </h3>
            </div>
            <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
              {student.completions.length === 0 ? (
                <div className="px-6 py-8 text-center text-neutral-500 text-sm">Nenhuma aula concluida</div>
              ) : (
                student.completions.map(completion => (
                  <div key={completion.lessonId} className="px-6 py-3 hover:bg-brand-lightGray/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-neutral-900">{completion.lesson.name}</p>
                          <p className="text-xs text-neutral-500">{completion.lesson.module.name}</p>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400">{new Date(completion.completedAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-2xl shadow-premium overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 bg-brand-lightGray">
              <h3 className="text-lg font-serif font-bold text-brand-blue">Atividade Recente</h3>
            </div>
            <div className="divide-y divide-neutral-100 max-h-60 overflow-y-auto">
              {student.activityLogs.length === 0 ? (
                <div className="px-6 py-8 text-center text-neutral-500 text-sm">Nenhuma atividade registrada</div>
              ) : (
                student.activityLogs.map(activity => (
                  <div key={activity.id} className="px-6 py-3 hover:bg-brand-lightGray/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-neutral-900">{activity.eventType}</p>
                      <p className="text-xs text-neutral-400">
                        {new Date(activity.timestamp).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
