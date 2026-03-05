import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  onWhatsAppClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWhatsAppClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const whatsappLink = 'https://wa.me/5511943375337';
  const handleCta = () => {
    if (onWhatsAppClick) onWhatsAppClick();
    else window.open(whatsappLink, '_blank');
  };

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#01284A] text-white">
      {/* Background Decor */}
      <motion.div style={{ y: yBg, opacity }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[80vw] lg:w-[40vw] h-[80vw] lg:h-[40vw] rounded-full bg-brand-lightBlue/10 blur-[100px] transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[60vw] lg:w-[30vw] h-[60vw] lg:h-[30vw] rounded-full bg-brand-gold/10 blur-[100px] transform -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </motion.div>

      <div className="container relative z-10 flex flex-col items-center text-center section-padding pt-24 md:pt-32 pb-20">
        {/* Text Content */}
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-medium">
              <svg className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Goiânia
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              Formação Presencial
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-medium">
              Turmas Reduzidas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[26px] sm:text-[48px] lg:text-[64px] leading-[1.15] font-bold text-white mb-6 font-serif tracking-tight"
          >
            Enquanto alguns médicos vivem de plantão…
            <span className="block text-brand-gold mt-3 text-[20px] sm:text-[36px] lg:text-[48px] font-normal italic">
              outros começam a mudar completamente a própria carreira dominando procedimentos.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-white/80 max-w-[600px] mb-10 leading-relaxed font-light"
          >
            Formação presencial que ensina médicos a realizar Endoscopia Digestiva Alta e Colonoscopia com segurança e técnica.<br /><br />
            Mesmo sem experiência prévia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full sm:w-auto"
          >
            <button
              onClick={handleCta}
              className="w-full sm:w-auto group relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-5 bg-brand-gold text-[#01284A] rounded-lg font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_40px_rgba(184,154,106,0.3)] hover:shadow-[0_0_60px_rgba(184,154,106,0.5)] hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Falar com a equipe no WhatsApp
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
