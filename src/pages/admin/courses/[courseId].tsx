import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../utils/api';

interface ContentItem {
  id?: string;
  title: string;
  type: string;
  url?: string;
  order: number;
  isActive: boolean;
}

interface Lesson {
  id?: string;
  name: string;
  description: string;
  order: number;
  isActive: boolean;
  contents: ContentItem[];
}

interface Module {
  id?: string;
  name: string;
  description: string;
  order: number;
  isActive: boolean;
  lessons: Lesson[];
}

interface CourseData {
  id?: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  durationWeeks: number;
  difficulty: string;
  isActive: boolean;
  modules: Module[];
}

const emptyCourse: CourseData = {
  name: '',
  slug: '',
  description: '',
  shortDescription: '',
  price: 0,
  durationWeeks: 1,
  difficulty: 'BEGINNER',
  isActive: true,
  modules: [],
};

export default function CourseEditor() {
  const router = useRouter();
  const { courseId } = router.query;
  const isNew = courseId === 'new';
  const { isLoading: authLoading } = useAuth();

  const [course, setCourse] = useState<CourseData>(emptyCourse);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (authLoading || !courseId) return;
    if (!isNew) {
      fetchCourse();
    } else {
      setIsLoading(false);
    }
  }, [authLoading, courseId]);

  const fetchCourse = async () => {
    try {
      setError('');
      const result = await api.get<CourseData>(`/api/admin/courses/${courseId}`);
      setCourse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar curso');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCourse = async () => {
    try {
      setIsSaving(true);
      setError('');
      setSuccess('');

      const payload = {
        name: course.name,
        slug: course.slug,
        description: course.description,
        shortDescription: course.shortDescription,
        price: course.price,
        durationWeeks: course.durationWeeks,
        difficulty: course.difficulty,
        isActive: course.isActive,
        modules: course.modules,
      };

      if (isNew) {
        const result = await api.post<CourseData>('/api/admin/courses', payload);
        setSuccess('Curso criado com sucesso!');
        setTimeout(() => {
          router.push(`/admin/courses/${result.id}`);
        }, 1000);
      } else {
        await api.put(`/api/admin/courses/${courseId}`, payload);
        setSuccess('Curso salvo com sucesso!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar curso');
    } finally {
      setIsSaving(false);
    }
  };

  const updateCourseField = (field: keyof CourseData, value: any) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  // Module operations
  const addModule = () => {
    const newModule: Module = {
      name: '',
      description: '',
      order: course.modules.length + 1,
      isActive: true,
      lessons: [],
    };
    setCourse((prev) => ({ ...prev, modules: [...prev.modules, newModule] }));
    setExpandedModules((prev) => new Set(prev).add(course.modules.length));
  };

  const updateModule = (moduleIdx: number, field: keyof Module, value: any) => {
    setCourse((prev) => {
      const modules = [...prev.modules];
      modules[moduleIdx] = { ...modules[moduleIdx], [field]: value };
      return { ...prev, modules };
    });
  };

  const removeModule = (moduleIdx: number) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== moduleIdx).map((m, i) => ({ ...m, order: i + 1 })),
    }));
  };

  const moveModule = (moduleIdx: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && moduleIdx === 0) ||
      (direction === 'down' && moduleIdx === course.modules.length - 1)
    )
      return;
    setCourse((prev) => {
      const modules = [...prev.modules];
      const swapIdx = direction === 'up' ? moduleIdx - 1 : moduleIdx + 1;
      [modules[moduleIdx], modules[swapIdx]] = [modules[swapIdx], modules[moduleIdx]];
      return { ...prev, modules: modules.map((m, i) => ({ ...m, order: i + 1 })) };
    });
  };

  // Lesson operations
  const addLesson = (moduleIdx: number) => {
    setCourse((prev) => {
      const modules = [...prev.modules];
      const newLesson: Lesson = {
        name: '',
        description: '',
        order: modules[moduleIdx].lessons.length + 1,
        isActive: true,
        contents: [],
      };
      modules[moduleIdx] = {
        ...modules[moduleIdx],
        lessons: [...modules[moduleIdx].lessons, newLesson],
      };
      return { ...prev, modules };
    });
    setExpandedLessons((prev) => {
      const next = new Set(prev);
      next.add(`${moduleIdx}-${course.modules[moduleIdx].lessons.length}`);
      return next;
    });
  };

  const updateLesson = (moduleIdx: number, lessonIdx: number, field: keyof Lesson, value: any) => {
    setCourse((prev) => {
      const modules = [...prev.modules];
      const lessons = [...modules[moduleIdx].lessons];
      lessons[lessonIdx] = { ...lessons[lessonIdx], [field]: value };
      modules[moduleIdx] = { ...modules[moduleIdx], lessons };
      return { ...prev, modules };
    });
  };

  const removeLesson = (moduleIdx: number, lessonIdx: number) => {
    setCourse((prev) => {
      const modules = [...prev.modules];
      modules[moduleIdx] = {
        ...modules[moduleIdx],
        lessons: modules[moduleIdx].lessons
          .filter((_, i) => i !== lessonIdx)
          .map((l, i) => ({ ...l, order: i + 1 })),
      };
      return { ...prev, modules };
    });
  };

  // Content operations
  const addContent = (moduleIdx: number, lessonIdx: number) => {
    setCourse((prev) => {
      const modules = [...prev.modules];
      const lessons = [...modules[moduleIdx].lessons];
      const newContent: ContentItem = {
        title: '',
        type: 'PDF',
        order: lessons[lessonIdx].contents.length + 1,
        isActive: true,
      };
      lessons[lessonIdx] = {
        ...lessons[lessonIdx],
        contents: [...lessons[lessonIdx].contents, newContent],
      };
      modules[moduleIdx] = { ...modules[moduleIdx], lessons };
      return { ...prev, modules };
    });
  };

  const updateContent = (
    moduleIdx: number,
    lessonIdx: number,
    contentIdx: number,
    field: keyof ContentItem,
    value: any
  ) => {
    setCourse((prev) => {
      const modules = [...prev.modules];
      const lessons = [...modules[moduleIdx].lessons];
      const contents = [...lessons[lessonIdx].contents];
      contents[contentIdx] = { ...contents[contentIdx], [field]: value };
      lessons[lessonIdx] = { ...lessons[lessonIdx], contents };
      modules[moduleIdx] = { ...modules[moduleIdx], lessons };
      return { ...prev, modules };
    });
  };

  const removeContent = (moduleIdx: number, lessonIdx: number, contentIdx: number) => {
    setCourse((prev) => {
      const modules = [...prev.modules];
      const lessons = [...modules[moduleIdx].lessons];
      lessons[lessonIdx] = {
        ...lessons[lessonIdx],
        contents: lessons[lessonIdx].contents
          .filter((_, i) => i !== contentIdx)
          .map((c, i) => ({ ...c, order: i + 1 })),
      };
      modules[moduleIdx] = { ...modules[moduleIdx], lessons };
      return { ...prev, modules };
    });
  };

  const handleFileUpload = async (
    moduleIdx: number,
    lessonIdx: number,
    contentIdx: number,
    file: File
  ) => {
    const lesson = course.modules[moduleIdx].lessons[lessonIdx];
    if (!lesson.id) {
      setError('Salve o curso antes de fazer upload de arquivos');
      return;
    }

    try {
      setError('');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', course.modules[moduleIdx].lessons[lessonIdx].contents[contentIdx].title || file.name);
      formData.append('type', 'PDF');

      const result = await api.upload<{ url: string; id: string }>(
        `/api/admin/lessons/${lesson.id}/content`,
        formData
      );

      updateContent(moduleIdx, lessonIdx, contentIdx, 'url', result.url);
      if (result.id) {
        updateContent(moduleIdx, lessonIdx, contentIdx, 'id', result.id);
      }
      setSuccess('Arquivo enviado com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar arquivo');
    }
  };

  const toggleModule = (idx: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleLesson = (key: string) => {
    setExpandedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  if (isLoading || authLoading) {
    return (
      <AdminLayout title={isNew ? 'Novo Curso' : 'Editar Curso'}>
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
    <AdminLayout title={isNew ? 'Novo Curso' : 'Editar Curso'}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
        <Link href="/admin/courses" className="hover:text-brand-blue transition-colors">
          Cursos
        </Link>
        <span>/</span>
        <span className="text-brand-blue font-medium">{isNew ? 'Novo' : course.name}</span>
      </div>

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

      {/* Course Info Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-premium p-6 mb-8"
      >
        <h2 className="text-xl font-serif font-bold text-brand-blue mb-6">Informacoes do Curso</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nome do Curso</label>
            <input
              type="text"
              value={course.name}
              onChange={(e) => updateCourseField('name', e.target.value)}
              placeholder="Ex: Imersao em Endoscopia"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Slug</label>
            <input
              type="text"
              value={course.slug}
              onChange={(e) => updateCourseField('slug', e.target.value)}
              placeholder="Ex: imersao-endoscopia"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm font-mono"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Descricao Curta</label>
            <input
              type="text"
              value={course.shortDescription}
              onChange={(e) => updateCourseField('shortDescription', e.target.value)}
              placeholder="Breve descricao do curso"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Descricao Completa</label>
            <textarea
              value={course.description}
              onChange={(e) => updateCourseField('description', e.target.value)}
              placeholder="Descricao detalhada do curso"
              rows={4}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Preco (R$)</label>
            <input
              type="number"
              value={course.price}
              onChange={(e) => updateCourseField('price', parseFloat(e.target.value) || 0)}
              min={0}
              step={0.01}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Duracao (semanas)</label>
            <input
              type="number"
              value={course.durationWeeks}
              onChange={(e) => updateCourseField('durationWeeks', parseInt(e.target.value) || 1)}
              min={1}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Dificuldade</label>
            <select
              value={course.difficulty}
              onChange={(e) => updateCourseField('difficulty', e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm bg-white"
            >
              <option value="BEGINNER">Iniciante</option>
              <option value="INTERMEDIATE">Intermediario</option>
              <option value="ADVANCED">Avancado</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={course.isActive}
                onChange={(e) => updateCourseField('isActive', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-brand-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
            <span className="text-sm font-medium text-neutral-700">Curso Ativo</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-200 flex justify-end">
          <button
            onClick={handleSaveCourse}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-gold text-white font-medium rounded-lg hover:bg-brand-goldHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Salvar Curso
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Modules Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-bold text-brand-blue">Modulos e Conteudo</h2>
          <button
            onClick={addModule}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-brand-blue/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Adicionar Modulo
          </button>
        </div>

        {course.modules.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-premium p-12 text-center">
            <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-neutral-500 mb-2">Nenhum modulo adicionado</p>
            <p className="text-neutral-400 text-sm">Adicione modulos para organizar o conteudo do curso</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {course.modules.map((module, moduleIdx) => (
                <motion.div
                  key={moduleIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-2xl shadow-premium overflow-hidden"
                >
                  {/* Module Header */}
                  <div
                    className="px-6 py-4 bg-brand-lightGray flex items-center justify-between cursor-pointer hover:bg-neutral-100 transition-colors"
                    onClick={() => toggleModule(moduleIdx)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); moveModule(moduleIdx, 'up'); }}
                          disabled={moduleIdx === 0}
                          className="text-neutral-400 hover:text-brand-blue disabled:opacity-30 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); moveModule(moduleIdx, 'down'); }}
                          disabled={moduleIdx === course.modules.length - 1}
                          className="text-neutral-400 hover:text-brand-blue disabled:opacity-30 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      <span className="w-8 h-8 bg-brand-blue text-white rounded-lg flex items-center justify-center text-sm font-bold">
                        {module.order}
                      </span>
                      <div>
                        <p className="font-serif font-bold text-brand-blue">
                          {module.name || 'Modulo sem nome'}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {module.lessons.length} aula{module.lessons.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Remover este modulo e todas suas aulas?')) removeModule(moduleIdx);
                        }}
                        className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <svg
                        className={`w-5 h-5 text-neutral-400 transition-transform ${expandedModules.has(moduleIdx) ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Module Content */}
                  {expandedModules.has(moduleIdx) && (
                    <div className="p-6 border-t border-neutral-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">Nome do Modulo</label>
                          <input
                            type="text"
                            value={module.name}
                            onChange={(e) => updateModule(moduleIdx, 'name', e.target.value)}
                            placeholder="Ex: Esofago"
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">Descricao</label>
                          <input
                            type="text"
                            value={module.description}
                            onChange={(e) => updateModule(moduleIdx, 'description', e.target.value)}
                            placeholder="Descricao do modulo"
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* Lessons */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider">Aulas</h4>
                          <button
                            onClick={() => addLesson(moduleIdx)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded-lg hover:bg-brand-gold/20 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Adicionar Aula
                          </button>
                        </div>

                        {module.lessons.length === 0 ? (
                          <p className="text-sm text-neutral-400 italic py-2">Nenhuma aula neste modulo</p>
                        ) : (
                          <div className="space-y-3">
                            {module.lessons.map((lesson, lessonIdx) => {
                              const lessonKey = `${moduleIdx}-${lessonIdx}`;
                              return (
                                <div key={lessonIdx} className="border border-neutral-200 rounded-xl overflow-hidden">
                                  {/* Lesson Header */}
                                  <div
                                    className="px-4 py-3 bg-neutral-50 flex items-center justify-between cursor-pointer hover:bg-neutral-100 transition-colors"
                                    onClick={() => toggleLesson(lessonKey)}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-6 h-6 bg-brand-gold text-white rounded flex items-center justify-center text-xs font-bold">
                                        {lesson.order}
                                      </span>
                                      <span className="text-sm font-medium text-neutral-800">
                                        {lesson.name || 'Aula sem nome'}
                                      </span>
                                      <span className="text-xs text-neutral-400">
                                        ({lesson.contents.length} conteudo{lesson.contents.length !== 1 ? 's' : ''})
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (confirm('Remover esta aula?')) removeLesson(moduleIdx, lessonIdx);
                                        }}
                                        className="p-1 text-red-400 hover:text-red-600 transition-colors"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                      <svg
                                        className={`w-4 h-4 text-neutral-400 transition-transform ${expandedLessons.has(lessonKey) ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Lesson Content */}
                                  {expandedLessons.has(lessonKey) && (
                                    <div className="p-4 border-t border-neutral-200 bg-white">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                        <div>
                                          <label className="block text-xs font-medium text-neutral-600 mb-1">Nome da Aula</label>
                                          <input
                                            type="text"
                                            value={lesson.name}
                                            onChange={(e) => updateLesson(moduleIdx, lessonIdx, 'name', e.target.value)}
                                            placeholder="Ex: Tumores Esofagicos"
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-xs font-medium text-neutral-600 mb-1">Descricao</label>
                                          <input
                                            type="text"
                                            value={lesson.description}
                                            onChange={(e) => updateLesson(moduleIdx, lessonIdx, 'description', e.target.value)}
                                            placeholder="Descricao da aula"
                                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all text-sm"
                                          />
                                        </div>
                                      </div>

                                      {/* Contents */}
                                      <div>
                                        <div className="flex items-center justify-between mb-2">
                                          <h5 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Conteudos</h5>
                                          <button
                                            onClick={() => addContent(moduleIdx, lessonIdx)}
                                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-brand-blue border border-brand-blue/30 rounded hover:bg-brand-blue/5 transition-colors"
                                          >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Adicionar Conteudo
                                          </button>
                                        </div>

                                        {lesson.contents.length === 0 ? (
                                          <p className="text-xs text-neutral-400 italic py-1">Nenhum conteudo</p>
                                        ) : (
                                          <div className="space-y-2">
                                            {lesson.contents.map((content, contentIdx) => (
                                              <div
                                                key={contentIdx}
                                                className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-brand-lightGray rounded-lg"
                                              >
                                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                  <input
                                                    type="text"
                                                    value={content.title}
                                                    onChange={(e) =>
                                                      updateContent(moduleIdx, lessonIdx, contentIdx, 'title', e.target.value)
                                                    }
                                                    placeholder="Titulo do conteudo"
                                                    className="px-3 py-1.5 border border-neutral-300 rounded text-sm focus:outline-none focus:border-brand-gold transition-all"
                                                  />
                                                  <div className="flex items-center gap-2">
                                                    <select
                                                      value={content.type}
                                                      onChange={(e) =>
                                                        updateContent(moduleIdx, lessonIdx, contentIdx, 'type', e.target.value)
                                                      }
                                                      className="px-2 py-1.5 border border-neutral-300 rounded text-sm bg-white focus:outline-none focus:border-brand-gold transition-all"
                                                    >
                                                      <option value="PDF">PDF</option>
                                                      <option value="VIDEO">Video</option>
                                                      <option value="TEXT">Texto</option>
                                                      <option value="LINK">Link</option>
                                                    </select>
                                                    {content.url && (
                                                      <span className="text-xs text-green-600 font-medium">Enviado</span>
                                                    )}
                                                  </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                  {content.type === 'PDF' && (
                                                    <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-blue text-white text-xs font-medium rounded cursor-pointer hover:bg-brand-blue/90 transition-colors">
                                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                      </svg>
                                                      Upload
                                                      <input
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={(e) => {
                                                          const file = e.target.files?.[0];
                                                          if (file) handleFileUpload(moduleIdx, lessonIdx, contentIdx, file);
                                                        }}
                                                        className="hidden"
                                                      />
                                                    </label>
                                                  )}
                                                  <button
                                                    onClick={() => removeContent(moduleIdx, lessonIdx, contentIdx)}
                                                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                                                  >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                  </button>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
}
