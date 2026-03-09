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

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleCta = (e: React.MouseEvent) => {
    if (onWhatsAppClick) {
      e.preventDefault();
      onWhatsAppClick();
    } else {
      window.open('https://wa.me/5511943375337', '_blank');
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black text-white">
      {/* Cinematic Background Layer */}
      <motion.div style={{ y: yBg, opacity }} className="absolute inset-0 pointer-events-none z-0">
        {/* Soft dark gradient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020813_100%)] z-10" />

        {/* Dramatic Lighting Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-lightBlue/20 blur-[120px] mix-blend-screen animate-pulse-slow object-cover" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-brand-gold/15 blur-[150px] mix-blend-screen animate-float-slow" />

        {/* Ambient Noise / Grain */}
        <div className="noise-overlay z-20 opacity-5"></div>

        {/* Cinematic Grid/Lines for tech feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0 opacity-20" />
      </motion.div>

      <div className="container relative z-30 flex flex-col items-center text-center px-4 pt-32 pb-20">
        {/* Cinematic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gold/20 bg-brand-gold/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse shadow-[0_0_10px_rgba(184,154,106,0.8)]"></span>
            <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-brand-gold/90">A Elite da Educação Médica</span>
          </div>
        </motion.div>

        {/* Dramatic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="max-w-5xl text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] font-bold text-white mb-8 tracking-tight font-serif"
        >
          Domine Procedimentos.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#E5D3AF] to-brand-gold animate-shimmer" style={{ backgroundSize: '200% auto' }}>
            Transforme sua Carreira.
          </span>
        </motion.h1>

        {/* Premium Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mb-12 leading-relaxed font-light"
        >
          Formações exclusivas de alto padrão para médicos que buscam transição de carreira, excelência técnica e reconhecimento através da Endoscopia e procedimentos avançados.
        </motion.p>

        {/* Call to Action - Glowing Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <a
            href="#cursos-preview"
            onClick={handleCta}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-gold text-brand-black rounded-lg font-bold uppercase tracking-widest text-sm transition-all shadow-premium hover:shadow-gold-glow hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-premium" />
            <span className="relative z-10 flex items-center gap-2">
              Explorar Formações
              <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold/50 to-transparent"></div>
        <span className="text-[10px] tracking-widest uppercase text-brand-gold/50">Descubra</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
