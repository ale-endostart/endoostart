import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const InstructorsSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="professores" className="py-24 bg-[#020813] border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-lightBlue/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container max-w-[1200px] px-4 relative z-10">

        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Nossos Professores
          </h2>
          <div className="w-16 h-[2px] bg-brand-gold mx-auto opacity-80"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Card Dr. Alessandro */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-brand-gold/20 transition-all duration-300 group"
          >
            {/* Image Box */}
            <div className="w-40 h-40 sm:w-48 sm:h-auto shrink-0 relative rounded-xl overflow-hidden bg-gradient-to-b from-[#01284A]/30 to-black/50">
              <Image
                src="/images/doutor-alessandro.webp"
                alt="Dr. Alessandro"
                fill
                className="object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 160px, 200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content Box */}
            <div className="flex flex-col justify-center text-center sm:text-left flex-1 py-2">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Dr. Alessandro
              </h3>
              <p className="text-white/60 text-sm md:text-base font-light mb-6 leading-relaxed line-clamp-3">
                Especialista em Endoscopia Digestiva e Cirurgia Geral. Responsável técnico pelo serviço de Endoscopia, com vasta experiência em procedimentos terapêuticos.
              </p>

              <button className="self-center sm:self-start inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold rounded font-semibold text-xs uppercase tracking-wider hover:bg-brand-gold hover:text-[#020813] transition-colors duration-300">
                <span>+ Mais detalhes</span>
              </button>
            </div>
          </motion.div>

          {/* Card Dra. Tamara */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-brand-gold/20 transition-all duration-300 group"
          >
            {/* Image Box */}
            <div className="w-40 h-40 sm:w-48 sm:h-auto shrink-0 relative rounded-xl overflow-hidden bg-gradient-to-b from-[#01284A]/30 to-black/50">
              <Image
                src="/images/doutora-tamara.webp"
                alt="Dra. Tamara Husein"
                fill
                className="object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 160px, 200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content Box */}
            <div className="flex flex-col justify-center text-center sm:text-left flex-1 py-2">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Dra. Tamara Husein
              </h3>
              <p className="text-white/60 text-sm md:text-base font-light mb-6 leading-relaxed line-clamp-3">
                Especialista em Gastroenterologia e Clínica Médica. Ampla experiência clínica e foco direcionado para o treinamento médico em Endoscopia Diagnóstica.
              </p>

              <button className="self-center sm:self-start inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-gold/10 border border-brand-gold/40 text-brand-gold rounded font-semibold text-xs uppercase tracking-wider hover:bg-brand-gold hover:text-[#020813] transition-colors duration-300">
                <span>+ Mais detalhes</span>
              </button>
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <button className="px-8 py-3.5 bg-gradient-to-r from-[#D4B87A] to-[#B89A6A] text-[#020813] font-bold rounded-lg text-sm uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_20px_rgba(184,154,106,0.3)] transition-all duration-300">
            Ver todos os professores
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default InstructorsSection;
