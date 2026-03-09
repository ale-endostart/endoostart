import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  name: string;
  description: string;
  progress?: number;
  modules?: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/signin');
      return;
    }

    setUser(JSON.parse(userData));
    fetchCourses(token);
  }, [router]);

  const fetchCourses = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/students/courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar cursos');
      }

      const data = await response.json();
      setCourses(data.courses || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

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
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-brand-blue">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-neutral-600">{user?.email}</p>
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-serif font-bold text-brand-blue mb-2">
            Bem-vindo, {user?.firstName}!
          </h1>
          <p className="text-lg text-neutral-600">
            Continue sua jornada de aprendizado em endoscopia
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Courses Section */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-brand-blue mb-8">
            Seus Cursos
          </h2>

          {courses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-premium p-12 text-center"
            >
              <p className="text-neutral-600 text-lg mb-4">
                Você ainda não tem acesso a nenhum curso.
              </p>
              <p className="text-neutral-500 mb-6">
                Entre em contato com nossa equipe via WhatsApp para acessar os cursos.
              </p>
              <a
                href="https://wa.me/5511943375337?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20cursos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004c-1.742-.048-3.437-.5-4.962-1.32l-.356-.19-3.69.968.984-3.595-.21-.334a9.828 9.828 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contatar Equipe
              </a>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-premium hover:shadow-card-hover transition-all overflow-hidden group"
                >
                  {/* Course Header */}
                  <div className="h-32 bg-gradient-to-br from-brand-blue to-brand-blue/80 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-brand-gold text-sm font-medium mb-2">Curso</p>
                      <h3 className="text-white font-serif font-bold text-lg">
                        {course.name}
                      </h3>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <p className="text-neutral-600 text-sm mb-4">
                      {course.description}
                    </p>

                    {course.modules && (
                      <div className="mb-4">
                        <p className="text-xs text-neutral-500 mb-2">
                          {course.modules} módulos disponíveis
                        </p>
                      </div>
                    )}

                    {course.progress !== undefined && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-neutral-600">Progresso</p>
                          <p className="text-xs font-medium text-brand-blue">
                            {course.progress}%
                          </p>
                        </div>
                        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-gold transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <Link
                      href={`/dashboard/course/${course.id}`}
                      className="block w-full text-center bg-brand-blue text-white py-2 rounded-lg font-medium text-sm hover:bg-brand-blue/90 transition-colors group-hover:bg-brand-gold group-hover:text-brand-blue"
                    >
                      Acessar Curso
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
