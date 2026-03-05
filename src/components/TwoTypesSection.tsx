import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollReveal, variants } from '../hooks/useScrollReveal';

const checkIcon = (
  <svg className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

export const TwoTypesSection: React.FC = () => {
  const { ref, isInView } = useScrollReveal();

  const cardLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const cardRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 } },
  };

  const bulletStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.4 },
    },
  };

  const bulletItem: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="section-padding bg-gradient-to-b from-brand-blue/5 to-brand-lightGray" ref={ref}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={variants.fadeSlideUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Existem dois tipos de <span className="text-shimmer">médicos</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Com o tempo, muitos profissionais começam a perceber algo. Na prática existem dois caminhos dentro da medicina.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Médico de Plantão */}
            <motion.div
              variants={cardLeft}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="bg-neutral-100 rounded-2xl p-8 border-l-4 border-brand-blue/30 hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-500"
            >
              <h3 className="text-xl font-bold text-neutral-500 mb-6">Médico de plantão</h3>
              <motion.ul
                variants={bulletStagger}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="space-y-4"
              >
                {['depende de escala', 'troca tempo por dinheiro', 'vive de carga horária', 'sempre correndo entre hospitais'].map((item) => (
                  <motion.li key={item} variants={bulletItem} className="flex items-start gap-3">
                    <span className="text-neutral-400 mt-1">—</span>
                    <span className="text-neutral-600">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Médico que domina procedimentos */}
            <motion.div
              variants={cardRight}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 shadow-lg hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-500 overflow-hidden"
            >
              {/* Animated gold border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-brand-gold/40"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <h3 className="text-xl font-bold text-primary-900 mb-6 relative">Médico que domina procedimentos</h3>
              <motion.ul
                variants={bulletStagger}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="space-y-4 relative"
              >
                {[
                  'pode atuar em clínicas e centros diagnósticos',
                  'constrói agenda própria',
                  'realiza procedimentos valorizados',
                  'abre novas possibilidades na carreira',
                ].map((item) => (
                  <motion.li key={item} variants={bulletItem} className="flex items-start gap-3">
                    {checkIcon}
                    <span className="text-primary-800">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

          <motion.p
            variants={variants.fadeSlideUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center text-lg text-neutral-700 mt-12 max-w-2xl mx-auto"
          >
            E foi justamente olhando para esse segundo caminho que muitos médicos começaram a se interessar pela <strong className="text-brand-gold">endoscopia.</strong>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TwoTypesSection;
