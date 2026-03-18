import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  whatsappMessage?: string;
}

const WHATSAPP_NUMBER = '5511943375337';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/#sobre', label: 'Quem Somos' },
  {
    label: 'Cursos',
    isDropdown: true,
    items: [
      { href: '/cursos/endoscopia', label: 'Endoscopia' },
      { href: '/cursos/colonoscopia', label: 'Colonoscopia' },
      { href: '/cursos/terapeutica', label: 'Terapêutica' },
      { href: '/cursos/balao-gastrico', label: 'Balão Gástrico' },
    ],
  },
  { href: '/#professores', label: 'Professores' },
  { href: '/#depoimentos', label: 'Depoimentos' },
  { href: '/#contato', label: 'Contato' },
];

export const Header: React.FC<HeaderProps> = ({ whatsappMessage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [coursesExpanded, setCoursesExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCoursesExpanded(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const whatsappHref = whatsappMessage
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <>
      {/* ========== HEADER BAR ========== */}
      <header
        className={`
          fixed top-0 left-0 w-full z-[100] transition-all duration-500
          ${scrolled
            ? 'h-16 bg-[#01284A]/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'h-20 bg-[#01284A]/30 backdrop-blur-md border-b border-white/5'
          }
        `}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between h-full">

          {/* --- Logo (left) --- */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className={`relative transition-all duration-500 ${scrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
              <Image
                src="/images/logo_endostart.webp"
                alt="EndoStart"
                fill
                className="object-contain"
                sizes="56px"
                priority
              />
            </div>
            <span className="font-serif font-bold text-lg text-white hidden sm:block">
              EndoStart
            </span>
          </Link>

          {/* --- Desktop Nav (center) --- */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) =>
              link.isDropdown ? (
                <div key={i} className="relative group">
                  <button className="px-4 py-2 text-[13px] font-medium uppercase tracking-wider text-white/80 hover:text-white transition-colors flex items-center gap-1">
                    {link.label}
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-[#01284A]/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 min-w-[200px] shadow-xl shadow-black/30">
                      {link.items?.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="px-4 py-2 text-[13px] font-medium uppercase tracking-wider text-white/80 hover:text-white transition-colors relative group/link"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-gold scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              )
            )}
          </nav>

          {/* --- Right side (desktop) --- */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-[#01284A] rounded-full text-sm font-bold uppercase tracking-wide hover:bg-brand-glowHover hover:shadow-gold-glow transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              Área do Usuário
            </Link>
          </div>

          {/* --- Mobile: icons + hamburger --- */}
          <div className="flex lg:hidden items-center gap-1">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#25D366]"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* Hamburger / X button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-2 text-white"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========== MOBILE MENU (fullscreen overlay) ========== */}
      {menuOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Menu panel */}
          <div
            className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-[#01284A] shadow-2xl shadow-black/50 overflow-y-auto flex flex-col"
          >
            {/* Menu header with close */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 flex-shrink-0">
              <span className="font-serif font-bold text-white text-lg">Menu</span>
              <button
                onClick={closeMenu}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Fechar menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-6 py-6">
              <ul className="space-y-1">
                {navLinks.map((link, i) =>
                  link.isDropdown ? (
                    <li key={i}>
                      <button
                        onClick={() => setCoursesExpanded((prev) => !prev)}
                        className="w-full flex items-center justify-between py-3 px-3 text-white/90 hover:text-white text-base font-medium rounded-lg hover:bg-white/5 transition-colors"
                      >
                        {link.label}
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${coursesExpanded ? 'rotate-180' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {coursesExpanded && (
                        <ul className="ml-3 border-l-2 border-brand-gold/30 pl-4 space-y-1 pb-2">
                          {link.items?.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={closeMenu}
                                className="block py-2.5 px-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link
                        href={link.href!}
                        onClick={closeMenu}
                        className="block py-3 px-3 text-white/90 hover:text-white text-base font-medium rounded-lg hover:bg-white/5 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>

            {/* Bottom CTAs */}
            <div className="px-6 pb-8 pt-4 border-t border-white/10 space-y-3 flex-shrink-0">
              <Link
                href="/auth/signin"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-gold text-[#01284A] rounded-full text-sm font-bold uppercase tracking-wide hover:bg-brand-glowHover transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Área do Usuário
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white rounded-full text-sm font-bold uppercase tracking-wide hover:bg-[#1fbc5a] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
