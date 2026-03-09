import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticWrapper } from './ui/MagneticWrapper';

interface HeaderProps {
  onWhatsAppClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onWhatsAppClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#sobre', label: 'Sobre Nós' },
    {
      label: 'Cursos',
      isDropdown: true,
      items: [
        { href: '/cursos/endoscopia', label: 'Endoscopia' },
        { href: '/cursos/colonoscopia', label: 'Colonoscopia' },
        { href: '/cursos/terapeutica', label: 'Terapêutica' },
        { href: '/cursos/balao-gastrico', label: 'Balão Gástrico' },
      ]
    },
    { href: '/#comunidade', label: 'Comunidade' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-premium ${scrolled || mobileMenuOpen
        ? 'glass-card border-x-0 border-t-0 rounded-none h-20'
        : 'bg-transparent h-28'
        }`}
    >
      <div className="container flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative flex items-center justify-center transition-all duration-500 ease-premium ${scrolled ? 'w-16 h-16' : 'w-24 h-24 md:w-28 md:h-28'}`}>
              <Image
                src="/images/logo_endostart.webp"
                alt="EndoStart Logo"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 96px, 112px"
              />
            </div>
            <span className={`font-serif font-bold text-xl hidden sm:inline transition-colors duration-300 ${scrolled || mobileMenuOpen ? 'text-white' : 'text-[#01284A]'}`}>
              EndoStart
            </span>
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link, idx) => (
            link.isDropdown ? (
              <div key={idx} className="relative group/dropdown">
                <button className={`flex items-center gap-1 py-1 font-medium tracking-widest text-xs uppercase transition-colors duration-300 ${scrolled || mobileMenuOpen ? 'text-white/80 hover:text-white' : 'text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}>
                  {link.label}
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover/dropdown:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-4 invisible group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 transition-all duration-500 ease-premium">
                  <div className="glass-panel w-56 p-2 flex flex-col gap-1 shadow-2xl">
                    {link.items?.map((item) => (
                      <Link key={item.href} href={item.href} className="px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors whitespace-nowrap">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href || '#'}
                className={`relative py-1 font-medium tracking-widest text-xs uppercase transition-colors duration-300 group/link ${scrolled || mobileMenuOpen ? 'text-white/80 hover:text-white' : 'text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'}`}
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-brand-gold origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 ease-premium" />
              </Link>
            )
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <MagneticWrapper strength={0.15}>
            <button
              onClick={onWhatsAppClick}
              className="btn-whatsapp text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004c-1.742-.048-3.437-.5-4.962-1.32l-.356-.19-3.69.968.984-3.595-.21-.334a9.828 9.828 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </button>
          </MagneticWrapper>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="https://wa.me/5511943375337"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#25D366] hover:scale-110 transition-transform"
            aria-label="WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437-9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </a>
          <button
            className="p-2 relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className={`block h-[2px] w-6 transition-colors ${scrolled || mobileMenuOpen ? 'bg-white' : 'bg-white drop-shadow-md'}`}
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block h-[2px] w-6 transition-colors ${scrolled || mobileMenuOpen ? 'bg-white' : 'bg-white drop-shadow-md'}`}
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className={`block h-[2px] w-6 transition-colors ${scrolled || mobileMenuOpen ? 'bg-white' : 'bg-white drop-shadow-md'}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide in from right */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-[80%] max-w-sm bg-[#01284A] z-40 md:hidden shadow-2xl overflow-y-auto"
            >
              <nav className="flex flex-col px-8 py-8 space-y-4">
                {navLinks.map((link, idx) => (
                  link.isDropdown ? (
                    <div key={idx} className="flex flex-col space-y-2 border-b border-white/10 pb-4">
                      <span className="text-sm font-bold tracking-widest text-brand-gold uppercase">
                        {link.label}
                      </span>
                      {link.items?.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="pl-4 py-2 text-xl font-serif text-white/80 hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href || '#'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-4 text-2xl font-serif text-white hover:text-brand-gold transition-colors border-b border-white/10"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
                <div className="pt-8">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onWhatsAppClick?.();
                    }}
                    className="btn-whatsapp w-full justify-center"
                  >
                    WhatsApp
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
