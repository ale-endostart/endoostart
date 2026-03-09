import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../utils/api';

interface Content { id: string; type: string; title: string; url: string; }
interface Lesson { id: string; name: string; description: string; order: number; contents: Content[]; }
interface Module { id: string; name: string; description: string; order: number; lessons: Lesson[]; }
interface CourseData { id: string; name: string; description: string; modules: Module[]; }

export default function CoursePage() {
  const router = useRouter();
  const { courseId } = router.query;
  const { isLoading: authLoading } = useAuth();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading || !courseId) return;
    fetchCourse();
  }, [courseId, authLoading]);

  const fetchCourse = async () => {
    try {
      const data = await api.get(`/api/courses/${courseId}/modules`);
      setCourse(data);
      // Expand all modules by default
      const moduleIds = new Set((data.modules || []).map((m: Module) => m.id));
      setExpandedModules(moduleIds);
      // Select first lesson
      if (data.modules?.[0]?.lessons?.[0]) {
        setSelectedLesson(data.modules[0].lessons[0]);
      }
      // Fetch completions
      try {
        const completions = await api.get(`/api/students/courses/${courseId}/completions`);
        setCompletedLessons(new Set(completions.completedLessonIds || completions.lessonIds || []));
      } catch {}
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar curso');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      next.has(moduleId) ? next.delete(moduleId) : next.add(moduleId);
      return next;
    });
  };

  const markComplete = async () => {
    if (!selectedLesson) return;
    try {
      await api.post(`/api/students/lessons/${selectedLesson.id}/complete`);
      setCompletedLessons(prev => new Set(prev).add(selectedLesson.id));
    } catch {}
  };

  const goToLesson = useCallback((direction: 'prev' | 'next') => {
    if (!course || !selectedLesson) return;
    const allLessons = course.modules.flatMap(m => m.lessons);
    const idx = allLessons.findIndex(l => l.id === selectedLesson.id);
    const target = direction === 'next' ? allLessons[idx + 1] : allLessons[idx - 1];
    if (target) setSelectedLesson(target);
  }, [course, selectedLesson]);

  const allLessons = course?.modules.flatMap(m => m.lessons) || [];
  const currentIdx = selectedLesson ? allLessons.findIndex(l => l.id === selectedLesson.id) : -1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < allLessons.length - 1;
  const pdfContent = selectedLesson?.contents?.find(c => c.type === 'PDF');

  if (isLoading || authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !course) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-2xl shadow-premium p-8 text-center">
          <p className="text-red-600 mb-4">{error || 'Curso não encontrado'}</p>
          <Link href="/dashboard" className="text-brand-gold font-medium hover:underline">Voltar ao Dashboard</Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-brand-lightGray">
      {/* Course Header */}
      <header className="bg-brand-blue text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1.5 hover:bg-white/10 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/dashboard" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm hidden sm:inline">Dashboard</span>
            </Link>
          </div>
          <h1 className="text-sm font-serif font-bold truncate max-w-xs sm:max-w-md">{course.name}</h1>
          <div className="text-xs text-white/70">
            {completedLessons.size}/{allLessons.length} aulas
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-72 bg-white border-r border-neutral-200 overflow-y-auto
          transform transition-transform duration-300 lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4">
            <div className="mb-3">
              <div className="flex justify-between text-xs text-neutral-500 mb-1">
                <span>Progresso</span>
                <span className="font-bold text-brand-blue">{allLessons.length > 0 ? Math.round((completedLessons.size / allLessons.length) * 100) : 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-gold rounded-full transition-all" style={{ width: `${allLessons.length > 0 ? (completedLessons.size / allLessons.length) * 100 : 0}%` }} />
              </div>
            </div>

            {course.modules.map((mod) => (
              <div key={mod.id} className="mb-2">
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-brand-blue hover:bg-brand-lightGray rounded-lg transition-colors"
                >
                  <span className="truncate">{mod.name}</span>
                  <svg className={`w-4 h-4 transition-transform ${expandedModules.has(mod.id) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {expandedModules.has(mod.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {mod.lessons.map((lesson) => {
                        const isActive = selectedLesson?.id === lesson.id;
                        const isComplete = completedLessons.has(lesson.id);
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => { setSelectedLesson(lesson); setSidebarOpen(false); }}
                            className={`w-full text-left px-3 py-2 ml-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                              isActive ? 'bg-brand-gold/15 text-brand-blue font-medium border-l-3 border-brand-gold' :
                              'text-neutral-600 hover:bg-brand-lightGray'
                            }`}
                          >
                            {isComplete ? (
                              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-neutral-300 flex-shrink-0" />
                            )}
                            <span className="truncate">{lesson.name}</span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-3.5rem)]">
          {selectedLesson ? (
            <div>
              {/* Lesson Header */}
              <div className="bg-white border-b border-neutral-200 px-6 py-5">
                <p className="text-xs text-brand-gold font-medium mb-1">Aula</p>
                <h2 className="text-2xl font-serif font-bold text-brand-blue">{selectedLesson.name}</h2>
                {selectedLesson.description && (
                  <p className="text-neutral-600 text-sm mt-1">{selectedLesson.description}</p>
                )}
              </div>

              {/* PDF Viewer */}
              <div className="p-6">
                {pdfContent ? (
                  <div className="bg-white rounded-2xl shadow-premium overflow-hidden">
                    <iframe
                      src={pdfContent.url}
                      className="w-full h-[70vh] border-0"
                      title={pdfContent.title}
                    />
                    <div className="p-4 border-t border-neutral-200 flex items-center justify-between">
                      <span className="text-sm text-neutral-600">{pdfContent.title}</span>
                      <a
                        href={pdfContent.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-brand-blue font-medium hover:text-brand-gold transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Baixar PDF
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-premium p-12 text-center">
                    <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-neutral-500">Nenhum conteúdo disponível nesta aula</p>
                  </div>
                )}

                {/* Action Bar */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={markComplete}
                    disabled={completedLessons.has(selectedLesson.id)}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      completedLessons.has(selectedLesson.id)
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-brand-gold text-brand-blue hover:bg-brand-goldHover'
                    }`}
                  >
                    {completedLessons.has(selectedLesson.id) ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        Aula Concluída
                      </>
                    ) : 'Marcar como Concluída'}
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={() => goToLesson('prev')}
                      disabled={!hasPrev}
                      className="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-default transition-colors"
                    >
                      ← Anterior
                    </button>
                    <button
                      onClick={() => goToLesson('next')}
                      disabled={!hasNext}
                      className="px-4 py-2.5 bg-brand-blue text-white rounded-lg text-sm font-medium hover:bg-brand-blue/90 disabled:opacity-30 disabled:cursor-default transition-colors"
                    >
                      Próxima →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-neutral-500">Selecione uma aula para começar</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
