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
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#01284A]/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container max-w-[1000px] px-4 mx-auto relative z-10">

        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-brand-lightGray mb-4">
            Nossos <span className="font-bold">Professores</span>
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto opacity-50 mt-4"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8"
        >
          {/* Card Dr. Alessandro */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center md:items-stretch relative group h-auto md:h-64"
          >
            {/* Background Shape */}
            <div className="absolute inset-0 top-16 md:top-0 md:left-[10%] bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl border-l border-t border-white/[0.05] z-0 transition-colors duration-500 group-hover:from-white/[0.05]"></div>

            {/* Watermark Logo */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0 w-32 h-32 opacity-[0.03] pointer-events-none z-0 transition-opacity duration-500 group-hover:opacity-[0.06]">
              <Image src="/images/logo_endostart_transparente.png" alt="" fill className="object-contain" />
            </div>

            {/* Transparent Image Box */}
            <div className="w-56 h-auto md:w-[280px] shrink-0 relative z-10 flex items-end justify-center drop-shadow-2xl md:-ml-8 md:-mt-12">
              <Image
                src="/images/doutor-alessandro-transparente.png"
                alt="Dr. Alessandro"
                width={280}
                height={350}
                className="object-contain object-bottom filter contrast-[1.05] transition-transform duration-700 ease-out origin-bottom group-hover:scale-105"
                sizes="(max-width: 768px) 224px, 280px"
              />
            </div>

            {/* Content Box */}
            <div className="flex flex-col justify-center text-center md:text-left flex-1 p-6 z-10 md:pr-10 pt-4 md:pt-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">
                Dr. Alessandro
              </h3>
              <p className="text-white/60 text-[13px] md:text-sm font-light mb-6 leading-relaxed max-w-sm mx-auto md:mx-0">
                Especialista em Endoscopia Digestiva, com foco em terapêutica e pesquisa clínica. Professor e orientador.
              </p>

              <button className="self-center md:self-start inline-flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-[#D4B87A] to-[#B89A6A] text-[#020813] rounded font-bold text-[11px] uppercase tracking-wider hover:opacity-90 transition-all duration-300">
                <span>+ Mais detalhes</span>
              </button>
            </div>
          </motion.div>

          {/* Card Dra. Tamara */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center md:items-stretch relative group h-auto md:h-64 mt-16 lg:mt-0"
          >
            {/* Background Shape */}
            <div className="absolute inset-0 top-16 md:top-0 md:left-[10%] bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl border-l border-t border-white/[0.05] z-0 transition-colors duration-500 group-hover:from-white/[0.05]"></div>

            {/* Watermark Logo */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0 w-32 h-32 opacity-[0.03] pointer-events-none z-0 transition-opacity duration-500 group-hover:opacity-[0.06]">
              <Image src="/images/logo_endostart_transparente.png" alt="" fill className="object-contain" />
            </div>

            {/* Transparent Image Box */}
            <div className="w-56 h-auto md:w-[280px] shrink-0 relative z-10 flex items-end justify-center drop-shadow-2xl md:-ml-8 md:-mt-12">
              <Image
                src="/images/doutora-tamara-transparente.png"
                alt="Dra. Tamara Husein"
                width={280}
                height={350}
                className="object-contain object-bottom filter contrast-[1.05] transition-transform duration-700 ease-out origin-bottom group-hover:scale-105"
                sizes="(max-width: 768px) 224px, 280px"
              />
            </div>

            {/* Content Box */}
            <div className="flex flex-col justify-center text-center md:text-left flex-1 p-6 z-10 md:pr-10 pt-4 md:pt-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">
                Dra. Tamara Husein
              </h3>
              <p className="text-white/60 text-[13px] md:text-sm font-light mb-6 leading-relaxed max-w-sm mx-auto md:mx-0">
                Especialista em Endoscopia Diagnóstica e Terapêutica. Experiência internacional em treinamentos médicos.
              </p>

              <button className="self-center md:self-start inline-flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-[#D4B87A] to-[#B89A6A] text-[#020813] rounded font-bold text-[11px] uppercase tracking-wider hover:opacity-90 transition-all duration-300">
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
          className="flex justify-center mt-20"
        >
          <button className="px-10 py-3 bg-gradient-to-r from-[#D4B87A] to-[#B89A6A] text-[#020813] font-bold rounded text-sm tracking-widest hover:scale-105 transition-all duration-300">
            Ver todos os professores
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default InstructorsSection;
