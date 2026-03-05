import React from 'react';
import { motion } from 'framer-motion';

export const RealitySection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
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
    <section className="relative py-20 md:py-32 bg-white">
      <div className="container max-w-[800px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center text-center"
        >
          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#01284A] mb-16 leading-tight"
          >
            A realidade que quase todo médico descobre depois de pegar o CRM
          </motion.h2>

          {/* Copy List */}
          <div className="space-y-10 text-lg md:text-xl text-[#3C3C3C] font-light text-center leading-relaxed max-w-[650px] mx-auto">
            <motion.p variants={itemVariants}>
              Você passa anos estudando medicina.<br />
              Provas difíceis. Internato. Madrugadas estudando.
            </motion.p>

            <motion.p variants={itemVariants}>
              Finalmente se forma.<br />
              Pega o CRM.<br />
              E imagina que agora a vida vai começar de verdade.
            </motion.p>

            <motion.p variants={itemVariants}>
              Mas o que acontece na prática é diferente.
            </motion.p>

            <motion.div variants={itemVariants} className="py-6 my-8 border-y border-brand-lightGray">
              <span className="block font-medium text-[#4A7CA8] text-xl md:text-2xl mb-2">Plantão. Outro plantão. Mais um plantão.</span>
              <span className="block italic">UPA cheia. Emergência lotada. Virando madrugada.</span>
            </motion.div>

            <motion.p variants={itemVariants}>
              E o dinheiro? Até entra.<br />
              Mas entra ao custo da sua energia, do seu tempo e da sua rotina.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-12 bg-brand-lightGray/50 p-8 rounded-2xl border border-brand-gold/20">
              <p className="mb-4">Porque existe uma regra simples na vida de plantão:</p>
              <p className="text-2xl md:text-3xl font-serif font-bold text-[#01284A]">
                Se você não trabalha… você não ganha.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RealitySection;
