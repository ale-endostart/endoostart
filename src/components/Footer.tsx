import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollReveal, variants } from '../hooks/useScrollReveal';
import MagneticWrapper from './ui/MagneticWrapper';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { ref, isInView } = useScrollReveal();

  const handleWhatsApp = () => {
    const message = 'Olá! Sou médico e gostaria de saber mais sobre a formação em Endoscopia e Colonoscopia da EndoStart';
    const whatsappUrl = `https://wa.me/5562991980100?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-neutral-900 text-white" ref={ref}>
      {/* Pre-footer CTA band */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-blue via-brand-blue/95 to-brand-blue">
        <div className="noise-overlay" />
        <div className="container relative z-10 py-16 md:py-20 text-center">
          <motion.div
            variants={variants.fadeSlideUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pronto para transformar sua carreira?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Fale com nossa equipe e descubra como a EndoStart pode abrir novas possibilidades na sua carreira médica.
            </p>
            <MagneticWrapper className="inline-block" strength={0.15}>
              <button
                onClick={handleWhatsApp}
                className="px-10 py-5 bg-brand-gold text-brand-blue rounded-full font-bold text-lg hover:bg-brand-goldHover transition-all duration-300 inline-flex items-center gap-3 animate-pulse-glow"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004c-1.742-.048-3.437-.5-4.962-1.32l-.356-.19-3.69.968.984-3.595-.21-.334a9.828 9.828 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Candidatar-se à Turma
              </button>
            </MagneticWrapper>
          </motion.div>
        </div>
      </div>

      {/* Main footer content — 4 columns */}
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/images/logo_endostart.webp"
                  alt="EndoStart Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <span className="font-serif font-bold text-xl text-white">EndoStart</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Formação presencial em Endoscopia Digestiva Alta e Colonoscopia com segurança e técnica.
            </p>
            {/* Added Patrocinador */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/40 text-xs mb-3 uppercase tracking-wider font-bold">Patrocínio</p>
              <div className="relative w-40 h-16">
                <Image
                  src="/images/patrocinador_endomarcas_transparent.png"
                  alt="Patrocinador Endomarcas"
                  fill
                  className="object-contain object-left"
                  sizes="160px"
                />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              {/* Facebook */}
              <a href="#" className="text-white/40 hover:text-brand-gold hover:rotate-[10deg] transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20v-7.21h-2.42V9.25h2.42V7.41c0-2.39 1.46-3.69 3.58-3.69 1.02 0 1.89.08 2.14.11v2.48h-1.47c-1.15 0-1.37.55-1.37 1.35v1.77h2.74l-.35 3.54h-2.39V20" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-white/40 hover:text-brand-gold hover:rotate-[10deg] transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Navegação</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '#formacao', label: 'A Formação' },
                { href: '#professores', label: 'Professores' },
                { href: '#inscricao', label: 'Inscrição' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Contato</h4>
            <div className="space-y-3 text-sm">
              <p>
                <span className="block text-white font-medium mb-1">WhatsApp</span>
                <a href="https://wa.me/5562991980100" className="text-white/40 hover:text-brand-gold transition-colors duration-300">
                  (62) 99198-0100
                </a>
              </p>
              <p>
                <span className="block text-white font-medium mb-1">Localização</span>
                <span className="text-white/40">Goiânia, GO</span>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold mb-6 text-white">Inscreva-se</h4>
            <p className="text-white/40 text-sm mb-4">
              Entre em contato para garantir sua vaga na próxima turma.
            </p>
            <button
              onClick={handleWhatsApp}
              className="btn-whatsapp text-sm w-full justify-center"
            >
              WhatsApp
            </button>
          </div>
        </div>

        {/* Gold divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-500">
          <p>
            © {currentYear} EndoStart. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 md:justify-end">
            <a href="#" className="text-white/30 hover:text-brand-gold transition-colors duration-300">
              Política de Privacidade
            </a>
            <a href="#" className="text-white/30 hover:text-brand-gold transition-colors duration-300">
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
