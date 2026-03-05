import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { useScrollReveal, variants } from '../hooks/useScrollReveal';
import useParallax from '../hooks/useParallax';

export const AboutEndoStartSection: React.FC = () => {
  const { ref, isInView } = useScrollReveal();
  const { ref: parallaxRef, y: bgY } = useParallax({ speed: 0.2 });

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const slideIn: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const differentials = [
    'Sem anos esperando oportunidade.',
    'Sem depender exclusivamente de residência.',
    'Sem teoria infinita.',
  ];

  return (
    <section
      ref={parallaxRef}
      data-section-theme="dark"
      className="relative section-padding overflow-hidden"
    >
      {/* Dark background with parallax + noise */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20 bg-brand-blue">
        {/* Diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(184,154,106,0.3) 40px, rgba(184,154,106,0.3) 41px)`,
          }}
        />
        <div className="noise-overlay" />
      </motion.div>

      <div className="container relative z-10" ref={ref}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            variants={variants.fadeSlideUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10"
          >
            Foi por isso que nasceu a <span className="text-shimmer">EndoStart</span>
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6 text-lg text-white/80 leading-relaxed"
          >
            <motion.p variants={slideIn}>A EndoStart foi criada com um objetivo simples:</motion.p>

            {/* Mission statement with gold border */}
            <motion.div
              variants={slideIn}
              className="bg-white/5 rounded-2xl p-8 border border-brand-gold/30 backdrop-blur-sm"
            >
              <p className="text-xl md:text-2xl font-semibold text-white">
                ensinar médicos a aprender Endoscopia Digestiva Alta e Colonoscopia com segurança e raciocínio clínico.
              </p>
            </motion.div>

            {/* Differentials with gold checkmarks */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
            >
              {differentials.map((item) => (
                <motion.div
                  key={item}
                  variants={slideIn}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <p className="text-white font-semibold text-left text-sm">{item}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={slideIn}
              className="text-xl text-white font-semibold pt-4"
            >
              Aqui o foco é <span className="text-brand-gold">formação prática</span> e entendimento real do procedimento.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutEndoStartSection;
