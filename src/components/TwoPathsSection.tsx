import React from 'react';
import { motion, Variants } from 'framer-motion';

export const TwoPathsSection: React.FC = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section className="py-20 md:py-32 bg-brand-lightGray">
            <div className="container px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="max-w-[1000px] mx-auto"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#01284A] mb-6">
                            Dois caminhos na medicina.
                        </h2>
                        <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Path 1: Médico de plantão */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-2xl p-8 lg:p-12 border border-brand-lightBlue/10 shadow-sm relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600 opacity-60"></div>

                            <h3 className="text-xl md:text-2xl font-bold text-[#3C3C3C] mb-8 pb-4 border-b border-gray-100 flex items-center gap-3">
                                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Médico de plantão
                            </h3>

                            <ul className="space-y-5 text-gray-600">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span>depende de escala</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span>troca tempo por dinheiro</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span>vive de carga horária</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-500 mt-1">✗</span>
                                    <span>sempre correndo entre hospitais</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Path 2: Médico que domina procedimentos */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-[#01284A] text-white rounded-2xl p-8 lg:p-12 shadow-xl relative overflow-hidden group transform md:-translate-y-4"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold"></div>
                            <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-brand-lightBlue/10 rounded-full blur-[80px] pointer-events-none"></div>

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 pb-4 border-b border-white/20 flex items-center gap-3">
                                <svg className="w-6 h-6 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A120.1 120.1 0 0010 1a120.16 120.16 0 00-1.3.046l-.5 8.5H4.25c-.27 0-.528.163-.64.408a.75.75 0 00.17 1.053l4.8 3.8-1.5 5.5a.75.75 0 001.07.9l4.55-2.6 4.54 2.6a.75.75 0 001.08-.9l-1.5-5.5 4.8-3.8a.75.75 0 00.17-1.053.75.75 0 00-.63-.408H12.83l-.5-8.5zM11.5 8h-3l.5-6h2l.5 6z" clipRule="evenodd" />
                                </svg>
                                Médico que domina procedimentos
                            </h3>

                            <ul className="space-y-5 text-white/90">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span>pode atuar em clínicas</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span>constrói agenda própria</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span>realiza procedimentos valorizados</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span>amplia possibilidades dentro da medicina</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TwoPathsSection;
