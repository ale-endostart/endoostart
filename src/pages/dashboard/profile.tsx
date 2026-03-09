import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const fields = [
    { label: 'E-mail', value: user.email },
    { label: 'CRM', value: user.crm || 'Não informado' },
    { label: 'Telefone', value: user.phone || 'Não informado' },
  ];

  return (
    <DashboardLayout title="Meu Perfil">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-premium overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-brand-blue to-brand-blue/80 px-6 py-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-serif font-bold">{user.firstName} {user.lastName}</h2>
                <p className="text-white/80 text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {fields.map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-medium text-neutral-500 mb-1">{field.label}</label>
                <p className="text-neutral-900 font-medium">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-premium p-6">
          <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wide mb-4">Conta</h3>
          <button
            onClick={logout}
            className="px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Sair da Conta
          </button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
