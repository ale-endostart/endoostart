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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="professores" className="py-20 md:py-32 bg-brand-lightGray">
      <div className="container max-w-[1200px] px-4">

        {/* Decorative divider */}
        <div className="flex justify-center mb-16">
          <div className="w-1 h-12 bg-brand-gold rounded-full"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Card Dr. Alessandro */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-premium group hover:shadow-2xl transition-all duration-500"
          >
            <div className="w-full aspect-square md:aspect-[4/3] relative overflow-hidden bg-[#01284A]/10">
              <Image
                src="/images/doutor-alessandro.webp"
                alt="Dr. Alessandro"
                fill
                className="object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-8 right-8">
                <h3 className="text-3xl font-serif font-bold text-white mb-1">
                  Dr. Alessandro
                </h3>
                <div className="w-12 h-1 bg-brand-gold"></div>
              </div>
            </div>

            <div className="p-8 lg:p-10 flex-1 flex flex-col justify-center">
              <ul className="space-y-4 text-[#3C3C3C] font-light">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4A7CA8] rounded-full shrink-0 mt-2"></div>
                  <span>Graduação em Medicina pela UNIG.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4A7CA8] rounded-full shrink-0 mt-2"></div>
                  <span>Residência Médica em Cirurgia Geral.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4A7CA8] rounded-full shrink-0 mt-2"></div>
                  <span>Formação em Cirurgia de Urgência pelo Hospital Sírio Libanês.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4A7CA8] rounded-full shrink-0 mt-2"></div>
                  <span className="font-medium text-[#01284A]">Responsável técnico do serviço de Endoscopia e Colonoscopia do Hospital Sagrado Coração de Jesus.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Card Dra. Tâmara */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-premium group hover:shadow-2xl transition-all duration-500 md:mt-12"
          >
            <div className="w-full aspect-square md:aspect-[4/3] relative overflow-hidden bg-[#01284A]/10">
              <Image
                src="/images/doutora-tamara.webp"
                alt="Dra. Tâmara Husein Naciff"
                fill
                className="object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-8 right-8">
                <h3 className="text-3xl font-serif font-bold text-white mb-1">
                  Dra. Tâmara Husein Naciff
                </h3>
                <div className="w-12 h-1 bg-brand-gold"></div>
              </div>
            </div>

            <div className="p-8 lg:p-10 flex-1 flex flex-col justify-center">
              <ul className="space-y-4 text-[#3C3C3C] font-light">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4A7CA8] rounded-full shrink-0 mt-2"></div>
                  <span>Graduação em Medicina pela PUC Goiás.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4A7CA8] rounded-full shrink-0 mt-2"></div>
                  <span>Residência em Clínica Médica.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4A7CA8] rounded-full shrink-0 mt-2"></div>
                  <span>Residência em Gastroenterologia.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4A7CA8] rounded-full shrink-0 mt-2"></div>
                  <span className="font-medium text-[#01284A]">Experiência em endoscopia digestiva alta e colonoscopia.</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default InstructorsSection;
