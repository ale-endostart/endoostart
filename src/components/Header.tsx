import React, { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onWhatsAppClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onWhatsAppClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ES</span>
            </div>
            <span className="font-bold text-lg text-neutral-900 hidden sm:inline">EndoStart</span>
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#calculadora" className="text-neutral-600 hover:text-primary-600 transition-colors">
            ROI Calculator
          </a>
          <a href="#cursos" className="text-neutral-600 hover:text-primary-600 transition-colors">
            Cursos
          </a>
          <a href="#curriculum" className="text-neutral-600 hover:text-primary-600 transition-colors">
            Currículo
          </a>
          <a href="#depoimentos" className="text-neutral-600 hover:text-primary-600 transition-colors">
            Depoimentos
          </a>
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onWhatsAppClick}
            className="btn-whatsapp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.558.946-2.846 2.435-3.682 4.142-1.119 2.151-1.187 4.568-.384 6.769 1.012 2.904 3.441 5.363 6.471 6.215 1.71.53 3.542.545 5.315.317l-.001.001c2.252-.311 4.226-1.409 5.66-3.067l.169-.184-.169.184a9.935 9.935 0 002.359-4.579c.44-1.393.597-2.878.472-4.335-.701-8.227-8.038-14.592-16.275-13.891-3.270.285-6.311 1.466-8.743 3.622C2.915 2.883 1.426 4.547.734 6.524c-.31.902-.426 1.867-.333 2.846.198 2.213 1.235 4.291 2.945 5.888 1.319 1.196 3.057 2.034 4.974 2.365 1.917.331 3.900.155 5.657-.529 1.757-.684 3.289-1.767 4.358-3.127.523-.662.997-1.379 1.396-2.133.133-.25.258-.512.374-.78.116-.268.203-.547.258-.83.056-.283.064-.573.024-.86-.04-.287-.143-.568-.305-.828-.162-.26-.387-.486-.655-.665-.268-.179-.576-.304-.897-.368z" />
            </svg>
            WhatsApp
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white animate-slideUp">
          <nav className="container py-4 space-y-3">
            <a href="#calculadora" className="block py-2 text-neutral-600 hover:text-primary-600">
              ROI Calculator
            </a>
            <a href="#cursos" className="block py-2 text-neutral-600 hover:text-primary-600">
              Cursos
            </a>
            <a href="#curriculum" className="block py-2 text-neutral-600 hover:text-primary-600">
              Currículo
            </a>
            <a href="#depoimentos" className="block py-2 text-neutral-600 hover:text-primary-600">
              Depoimentos
            </a>
            <button
              onClick={onWhatsAppClick}
              className="btn-whatsapp w-full justify-center mt-4"
            >
              WhatsApp
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
