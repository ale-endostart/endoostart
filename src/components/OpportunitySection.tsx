import React from 'react';
import { motion } from 'framer-motion';

export const OpportunitySection: React.FC = () => {
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
        <section className="relative py-20 md:py-32 bg-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-brand-lightGray rounded-l-[100px] opacity-50 hidden lg:block"></div>

            <div className="container relative z-10">
                <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="order-2 lg:order-1"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-5xl font-serif font-bold text-[#01284A] mb-8 leading-tight"
                        >
                            Por que tantos médicos estão olhando para a endoscopia
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-xl text-[#3C3C3C] font-light mb-8">
                            Existe uma realidade simples no mercado.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex gap-4 mb-8">
                            <span className="px-5 py-2 rounded-full border border-brand-lightBlue/20 text-[#4A7CA8] font-medium text-sm">Hospitais precisam</span>
                            <span className="px-5 py-2 rounded-full border border-brand-lightBlue/20 text-[#4A7CA8] font-medium text-sm">Clínicas precisam</span>
                            <span className="px-5 py-2 rounded-full border border-brand-lightBlue/20 text-[#4A7CA8] font-medium text-sm">Pacientes precisam</span>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-lg text-[#3C3C3C] mb-8 leading-relaxed">
                            Mas ainda existem <strong className="text-[#01284A] font-semibold">poucos médicos treinados</strong> em endoscopia.
                        </motion.p>

                        <motion.div variants={itemVariants} className="bg-brand-lightGray p-8 rounded-2xl border-l-4 border-brand-gold">
                            <p className="font-semibold text-[#01284A] mb-4">Quando um médico domina esse procedimento, ele pode atuar em:</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div> hospitais
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div> clínicas
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div> centros diagnósticos
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div> consultórios especializados
                                </li>
                            </ul>
                            <p className="mt-6 text-[#01284A] font-medium italic">
                                Isso abre novas possibilidades dentro da carreira médica.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Visual Element Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="order-1 lg:order-2 w-full h-[400px] lg:h-[600px] rounded-2xl bg-gradient-to-br from-[#01284A] to-[#4A7CA8] relative overflow-hidden shadow-2xl flex items-center justify-center p-8"
                    >
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                        {/* Abstract visual representation of opportunity */}
                        <div className="relative z-10 w-full max-w-[300px] aspect-square rounded-full border border-white/20 flex items-center justify-center">
                            <div className="w-[80%] h-[80%] rounded-full border border-white/30 flex items-center justify-center">
                                <div className="w-[60%] h-[60%] rounded-full bg-brand-gold/90 shadow-[0_0_50px_rgba(184,154,106,0.5)]"></div>
                            </div>
                        </div>
                        {/* Overlay texts to emphasize "demand" */}
                        <span className="absolute top-12 right-12 text-white/40 text-sm font-bold tracking-widest uppercase">Demanda Alta</span>
                        <span className="absolute bottom-12 left-12 text-brand-gold/40 text-sm font-bold tracking-widest uppercase">Mercado</span>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default OpportunitySection;
