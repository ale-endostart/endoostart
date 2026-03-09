import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Lesson {
  id: string;
  name: string;
  description: string;
  order: number;
  duration?: string;
  isCompleted?: boolean;
}

interface Module {
  id: string;
  name: string;
  description: string;
  lessons: Lesson[];
}

interface CourseData {
  id: string;
  name: string;
  description: string;
  modules: Module[];
}

export default function CoursePage() {
  const router = useRouter();
  const { courseId } = router.query;
  const [course, setCourse] = useState<CourseData | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/signin');
      return;
    }

    if (courseId) {
      fetchCourse(token, courseId as string);
    }
  }, [courseId, router]);

  const fetchCourse = async (token: string, id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/courses/${id}/modules`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar curso');
      }

      const data = await response.json();
      setCourse(data);

      // Select first lesson by default
      if (data.modules && data.modules.length > 0 && data.modules[0].lessons) {
        setSelectedLesson(data.modules[0].lessons[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-lightGray">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brand-blue font-medium">Carregando curso...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-lightGray">
        <div className="bg-white rounded-2xl shadow-premium p-8 max-w-md">
          <p className="text-red-600 font-medium mb-4">
            {error || 'Erro ao carregar curso'}
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-brand-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-blue/90 transition-colors"
          >
            Voltar ao Dashboard
          </Link>
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
            <Link href="/dashboard" className="flex items-center gap-2 text-brand-blue hover:text-brand-gold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Voltar</span>
            </Link>
            <h1 className="text-xl font-serif font-bold text-brand-blue">
              {course.name}
            </h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Modules and Lessons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-premium p-6 sticky top-24">
              <h2 className="text-lg font-serif font-bold text-brand-blue mb-4">
                Módulos e Aulas
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {course.modules.map((module) => (
                  <div key={module.id}>
                    <h3 className="text-sm font-bold text-brand-blue mb-2">
                      {module.name}
                    </h3>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm ${
                            selectedLesson?.id === lesson.id
                              ? 'bg-brand-gold text-brand-blue font-medium'
                              : 'bg-brand-lightGray text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{lesson.name}</p>
                              {lesson.duration && (
                                <p className="text-xs opacity-70 mt-1">
                                  {lesson.duration}
                                </p>
                              )}
                            </div>
                            {lesson.isCompleted && (
                              <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-1">
                                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content - Lesson Viewer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {selectedLesson ? (
              <div className="bg-white rounded-2xl shadow-premium overflow-hidden">
                {/* Lesson Header */}
                <div className="bg-gradient-to-r from-brand-blue to-brand-blue/80 p-6 text-white">
                  <p className="text-sm text-brand-gold mb-2">Aula</p>
                  <h1 className="text-3xl font-serif font-bold mb-2">
                    {selectedLesson.name}
                  </h1>
                  {selectedLesson.description && (
                    <p className="text-white/90">{selectedLesson.description}</p>
                  )}
                </div>

                {/* Lesson Content */}
                <div className="p-8">
                  <div className="bg-brand-lightGray rounded-lg p-8 text-center min-h-96 flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-brand-blue/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className="text-neutral-600 mb-4">
                      O conteúdo em PDF será exibido aqui
                    </p>
                    <a
                      href={`http://localhost:3001/api/content/${selectedLesson.id}/download`}
                      className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-blue/90 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Baixar PDF
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex gap-4">
                    <button className="flex-1 bg-brand-gold text-brand-blue py-3 rounded-lg font-medium hover:bg-brand-goldHover transition-colors">
                      Marcar como Completo
                    </button>
                    <button className="flex-1 border-2 border-brand-blue text-brand-blue py-3 rounded-lg font-medium hover:bg-brand-blue/5 transition-colors">
                      Anotações
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-premium p-8 text-center">
                <p className="text-neutral-600">
                  Selecione uma aula para começar
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
