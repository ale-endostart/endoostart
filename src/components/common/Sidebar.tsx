'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Sidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
    },
    {
      label: 'Meus Cursos',
      href: '/dashboard/courses',
      icon: '📚',
    },
    {
      label: 'Perfil',
      href: '/dashboard/profile',
      icon: '👤',
    },
  ]

  if (session?.user?.role === 'ADMIN') {
    menuItems.push({
      label: 'Painel Admin',
      href: '/admin',
      icon: '⚙️',
    })
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary-600 text-white"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static w-64 h-screen bg-primary-900 text-white overflow-y-auto transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Logo */}
          <Link href="/dashboard" className="text-2xl font-bold text-accent-400 mb-8 block">
            EndoStart
          </Link>

          {/* User Info */}
          {session?.user && (
            <div className="mb-8 p-4 bg-primary-800 rounded-lg">
              <p className="text-sm text-primary-200">Conectado como</p>
              <p className="font-semibold text-white mt-1">{session.user.name}</p>
              <p className="text-xs text-primary-300 mt-1">{session.user.email}</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  pathname === item.href
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-200 hover:bg-primary-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Sign Out Button */}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full mt-8 px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition font-semibold"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}
