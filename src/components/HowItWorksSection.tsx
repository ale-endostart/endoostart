import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollReveal, variants } from '../hooks/useScrollReveal';

const steps = [
  { number: '01', label: '4 semanas presenciais', color: 'bg-brand-gold' },
  { number: '02', label: 'Prática supervisionada', color: 'bg-brand-blue' },
  { number: '03', label: 'Raciocínio clínico', color: 'bg-brand-lightBlue' },
  { number: '04', label: 'Acompanhamento direto', color: 'bg-brand-gold' },
];

const topics = [
  'Fundamentos da endoscopia',
  'Anatomia endoscópica aplicada',
  'Técnica do exame',
  'Manejo correto do aparelho',
  'Raciocínio clínico durante o procedimento',
  'Introdução à colonoscopia',
  'Segurança do paciente',
];

export const HowItWorksSection: React.FC = () => {
  const { ref, isInView } = useScrollReveal();

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const fadeItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="formacao" className="section-padding bg-white" ref={ref}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={variants.fadeSlideUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Como funciona a <span className="text-shimmer">formação</span>
            </h2>
          </motion.div>

          {/* Timeline — horizontal on desktop, vertical on mobile */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative mb-12"
          >
            {/* Desktop horizontal timeline */}
            <div className="hidden md:flex items-start justify-between relative">
              {/* Connector line SVG */}
              <svg className="absolute top-10 left-[10%] right-[10%] h-1 w-[80%]" preserveAspectRatio="none">
                <motion.line
                  x1="0"
                  y1="2"
                  x2="100%"
                  y2="2"
                  stroke="#B89A6A"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </svg>

              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={fadeItem}
                  className="flex flex-col items-center text-center w-1/4 relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center mb-4 shadow-premium`}
                  >
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </motion.div>
                  <p className="text-sm font-semibold text-neutral-800 max-w-[140px]">{step.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Mobile vertical timeline */}
            <div className="md:hidden space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={fadeItem}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center flex-shrink-0 shadow-premium`}
                  >
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="absolute left-7 mt-14 w-[2px] h-6 bg-brand-gold/30" />
                  )}
                  <p className="text-base font-semibold text-neutral-800">{step.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Topics */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.p variants={fadeItem} className="text-lg text-neutral-700 text-center">
              Durante esse período você terá contato com:
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <motion.div
                  key={topic}
                  variants={fadeItem}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl p-5 border-l-3 border-l-brand-gold border border-neutral-200 shadow-sm flex items-start gap-3 hover:shadow-premium transition-shadow duration-300"
                  style={{ borderLeftWidth: '3px', borderLeftColor: '#B89A6A' }}
                >
                  <svg className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span className="text-neutral-800 font-medium">{topic}</span>
                </motion.div>
              ))}
            </div>

            {/* Callout with bounce */}
            <motion.p
              variants={fadeItem}
              className="text-center text-lg text-neutral-600 pt-4"
            >
              Tudo com <strong className="text-neutral-900">acompanhamento direto dos professores.</strong>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
