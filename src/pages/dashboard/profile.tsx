import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  crm?: string;
  phone?: string;
  state?: string;
  enrolledCourses?: number;
  joinedAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth/signin');
      return;
    }

    setProfile(JSON.parse(userData));
    setIsLoading(false);
  }, [router]);

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
          <p className="text-brand-blue font-medium">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-lightGray">
        <div className="bg-white rounded-2xl shadow-premium p-8 max-w-md">
          <p className="text-red-600 font-medium mb-4">Erro ao carregar perfil</p>
          <Link
            href="/dashboard"
            className="inline-block bg-brand-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-blue/90 transition-colors"
          >
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-lightGray">
      {/* Header */}
      <header className="bg-white shadow-premium sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-brand-blue hover:text-brand-gold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Voltar ao Dashboard</span>
            </Link>
            <h1 className="text-xl font-serif font-bold text-brand-blue">
              Meu Perfil
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-premium overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-brand-blue to-brand-blue/80 px-6 sm:px-8 py-12">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-3xl">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </div>
                <div className="text-white pt-2">
                  <h2 className="text-3xl font-serif font-bold mb-2">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-white/90">{profile.email}</p>
                </div>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-6 py-2 bg-brand-gold text-brand-blue rounded-lg font-medium hover:bg-brand-goldHover transition-colors"
              >
                {editMode ? 'Cancelar' : 'Editar Perfil'}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div>
                <h3 className="text-lg font-bold text-brand-blue mb-6">
                  Informações Pessoais
                </h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                      E-mail
                    </label>
                    <p className="text-neutral-900 font-medium">{profile.email}</p>
                  </div>

                  {/* CRM */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                      CRM
                    </label>
                    <p className="text-neutral-900 font-medium">
                      {profile.crm || 'Não informado'}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                      Telefone
                    </label>
                    <p className="text-neutral-900 font-medium">
                      {profile.phone || 'Não informado'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-lg font-bold text-brand-blue mb-6">
                  Atividade
                </h3>

                <div className="space-y-6">
                  {/* Enrolled Courses */}
                  <div className="bg-brand-lightGray rounded-lg p-4">
                    <p className="text-sm text-neutral-600 mb-1">
                      Cursos Inscritos
                    </p>
                    <p className="text-3xl font-serif font-bold text-brand-blue">
                      {profile.enrolledCourses || 0}
                    </p>
                  </div>

                  {/* Joined Date */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-2">
                      Membro desde
                    </label>
                    <p className="text-neutral-900 font-medium">
                      {profile.joinedAt
                        ? new Date(profile.joinedAt).toLocaleDateString('pt-BR')
                        : 'Informação não disponível'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-200 my-8" />

            {/* Security Section */}
            <div>
              <h3 className="text-lg font-bold text-brand-blue mb-6">
                Segurança
              </h3>

              <button className="px-6 py-3 border-2 border-brand-blue text-brand-blue rounded-lg font-medium hover:bg-brand-blue/5 transition-colors">
                Alterar Senha
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-200 my-8" />

            {/* Danger Zone */}
            <div>
              <h3 className="text-lg font-bold text-red-600 mb-4">
                Zona de Perigo
              </h3>

              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Sair da Conta
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
