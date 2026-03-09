import React from 'react';
import { motion, Variants } from 'framer-motion';

export const DifferentialsSection: React.FC = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    const differentials = [
        { title: "Formação presencial", description: "Aprendizado prático com contato direto com os pacientes e equipamentos" },
        { title: "Turmas hiper reduzidas", description: "Apenas 3 alunos por turma para garantir a máxima atenção e qualidade de ensino prática" },
        { title: "Acompanhamento direto dos professores", description: "Orientação individual durante todos os procedimentos" },
        { title: "Foco em prática e raciocínio clínico", description: "80% prático, 20% teórico para domínio real da técnica" }
    ];

    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container max-w-[1000px] px-4">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#01284A] mb-6">
                        Diferenciais da formação
                    </h2>
                    <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
                >
                    {differentials.map((diff, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-brand-lightGray/30 border border-brand-lightBlue/10 p-8 rounded-2xl flex items-start gap-4 hover:shadow-lg transition-shadow duration-300 group"
                        >
                            <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0 group-hover:bg-brand-gold transition-colors duration-300">
                                <svg className="w-6 h-6 text-brand-gold group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl text-[#3C3C3C] font-semibold mt-1 mb-2">
                                    {diff.title}
                                </h3>
                                <p className="text-[#3C3C3C]/80 font-light text-sm md:text-base">
                                    {diff.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default DifferentialsSection;
