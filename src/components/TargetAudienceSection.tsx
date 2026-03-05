import React from 'react';
import { motion } from 'framer-motion';

export const TargetAudienceSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const targets = [
    "médicos que querem ampliar sua atuação na medicina",
    "médicos interessados em aprender procedimentos",
    "médicos que desejam aumentar faturamento com procedimentos",
    "médicos que querem desenvolver novas habilidades clínicas"
  ];

  return (
    <section className="py-20 md:py-32 bg-[#01284A] relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-brand-lightBlue/10 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container max-w-[1000px] px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
              Para quem é essa formação
            </h2>
            <div className="w-16 h-1 bg-brand-gold mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-white/80 font-light">
              Essa formação é estruturada especificamente para <strong className="text-white font-semibold">construir autonomia clínica</strong> em quem deseja diversificar sua carreira.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-brand-gold/20 rounded-full blur-[20px]"></div>

              <ul className="space-y-6 relative z-10">
                {targets.map((target, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-4"
                  >
                    <svg className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#3C3C3C] font-medium text-lg leading-snug">
                      {target}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
