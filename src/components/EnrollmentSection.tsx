import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollReveal, variants } from '../hooks/useScrollReveal';
import MagneticWrapper from './ui/MagneticWrapper';

interface EnrollmentSectionProps {
  onWhatsAppClick: () => void;
}

const enrollSteps = [
  { number: '1', title: 'Clique no botão abaixo', description: 'Você será direcionado para o WhatsApp.' },
  { number: '2', title: 'Fale com a equipe', description: 'Nossa equipe vai explicar os detalhes.' },
  { number: '3', title: 'Reserve sua vaga', description: 'Garanta seu lugar na próxima turma.' },
];

const explanations = [
  'como funciona a formação',
  'datas da próxima turma',
  'detalhes da inscrição',
  'disponibilidade de vagas',
];

export const EnrollmentSection: React.FC<EnrollmentSectionProps> = ({ onWhatsAppClick }) => {
  const { ref, isInView } = useScrollReveal();

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const fadeItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="inscricao" className="section-padding bg-gradient-to-b from-neutral-50 to-white" ref={ref}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={variants.fadeSlideUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Como funciona a <span className="text-shimmer">inscrição</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6 text-lg text-neutral-700 leading-relaxed text-center mb-12"
          >
            <motion.p variants={fadeItem}>
              Para manter a qualidade da formação, todas as inscrições são feitas <strong className="text-neutral-900">diretamente com nossa equipe.</strong>
            </motion.p>
            <motion.p variants={fadeItem}>
              Ao clicar no botão abaixo você será direcionado para o WhatsApp.
            </motion.p>
          </motion.div>

          {/* Vertical numbered timeline */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative mb-12 pl-8 md:pl-0"
          >
            {/* Vertical connector line */}
            <motion.div
              className="absolute left-[22px] md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-brand-gold/20 origin-top"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            <div className="space-y-8">
              {enrollSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={fadeItem}
                  className="relative flex items-start gap-6 md:gap-0"
                >
                  {/* Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-11 h-11 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0 shadow-premium relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2"
                  >
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </motion.div>

                  {/* Content */}
                  <div className={`md:w-[45%] ${i % 2 === 0 ? 'md:ml-auto md:pl-10' : 'md:mr-auto md:pr-10 md:text-right'}`}>
                    <h4 className="font-bold text-neutral-900 text-lg">{step.title}</h4>
                    <p className="text-neutral-600 text-base">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Explanation grid */}
          <motion.div
            variants={variants.fadeSlideUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm mb-12"
          >
            <p className="text-neutral-700 mb-6 text-center">Nossa equipe vai explicar:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {explanations.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand-gold flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span className="text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            variants={variants.scaleReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-gradient-to-r from-brand-blue to-brand-blue/90 rounded-2xl p-8 lg:p-12 text-center space-y-6 relative overflow-hidden"
          >
            <div className="noise-overlay" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Falar com a equipe</h3>
              <p className="text-white/70 text-lg">
                Clique no botão abaixo e fale diretamente com nossa equipe no WhatsApp.
              </p>
              <MagneticWrapper className="inline-block" strength={0.15}>
                <button
                  onClick={onWhatsAppClick}
                  className="mt-4 px-10 py-5 bg-brand-gold text-brand-blue rounded-full font-bold text-lg hover:bg-brand-goldHover transition-all duration-300 inline-flex items-center gap-3 animate-pulse-glow"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004c-1.742-.048-3.437-.5-4.962-1.32l-.356-.19-3.69.968.984-3.595-.21-.334a9.828 9.828 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Falar com a equipe no WhatsApp
                </button>
              </MagneticWrapper>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentSection;
