import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Building2, Hospital, Stethoscope, HeartPulse } from 'lucide-react';
import { useScrollReveal, variants } from '../hooks/useScrollReveal';
import SplitText from './ui/SplitText';

const scenarios = [
  { label: 'clínicas', icon: Building2 },
  { label: 'hospitais', icon: Hospital },
  { label: 'centros diagnósticos', icon: Stethoscope },
  { label: 'consultórios especializados', icon: HeartPulse },
];

export const WhyEndoscopySection: React.FC = () => {
  const { ref, isInView } = useScrollReveal();

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const fadeItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <SplitText
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900"
              isInView={isInView}
            >
              Por que tantos médicos estão olhando para a endoscopia
            </SplitText>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6 text-lg text-neutral-700 leading-relaxed"
          >
            <motion.p variants={fadeItem}>Porque existe uma realidade simples no mercado.</motion.p>

            {/* Three statements with gold dividers */}
            <motion.div variants={fadeItem} className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
              {['Hospitais precisam.', 'Clínicas precisam.', 'Pacientes precisam.'].map((text, i) => (
                <React.Fragment key={text}>
                  {i > 0 && <div className="w-12 h-[1px] bg-brand-gold/40 my-3" />}
                  <p className="text-neutral-900 font-semibold text-xl">{text}</p>
                </React.Fragment>
              ))}
            </motion.div>

            <motion.p variants={fadeItem}>
              Mas ainda existem <strong className="text-neutral-900">poucos médicos que dominam o procedimento com segurança e técnica.</strong>
            </motion.p>

            {/* Gold callout */}
            <motion.div variants={fadeItem} className="relative pl-6">
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-gold origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              <p className="text-neutral-700">
                E quando um médico domina endoscopia, ele passa a ser requisitado em diferentes cenários da prática médica:
              </p>
            </motion.div>

            {/* Scenarios grid with icons */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 gap-4"
            >
              {scenarios.map((scenario) => {
                const Icon = scenario.icon;
                return (
                  <motion.div
                    key={scenario.label}
                    variants={fadeItem}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className="bg-primary-50 rounded-xl p-4 border border-primary-100 flex items-center gap-3 hover:border-brand-gold/40 hover:shadow-premium transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <span className="text-primary-800 font-medium">{scenario.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyEndoscopySection;
