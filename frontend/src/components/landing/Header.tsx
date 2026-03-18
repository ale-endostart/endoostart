'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'Curso', href: '#curso' },
  { label: 'Professor', href: '#professor' },
  { label: 'Investimento', href: '#investimento' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

export default function Header({ waUrl }: { waUrl: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'header-glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#inicio" className="text-xl font-black text-white tracking-tight">
          endo<span className="text-emerald-400">start</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[13px] font-medium text-white/70 hover:text-white transition-colors tracking-wide uppercase"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/signin"
            className="hidden sm:inline-flex text-[13px] font-semibold text-white/70 hover:text-white transition-colors"
          >
            Entrar
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-[13px] font-bold rounded-full transition-all"
          >
            Falar com Dr. Alessandro
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 mx-4 header-glass rounded-2xl p-5 space-y-3">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-white/80 hover:text-white py-2"
            >
              {n.label}
            </a>
          ))}
          <Link
            href="/auth/signin"
            className="block text-sm text-white/60 hover:text-white py-2"
          >
            Entrar na Área de Membros
          </Link>
        </div>
      )}
    </header>
  )
}
