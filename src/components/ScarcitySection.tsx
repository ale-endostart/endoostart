import React from 'react';
import { motion } from 'framer-motion';

export const ScarcitySection: React.FC = () => {
    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-[800px] mx-auto bg-brand-lightGray/50 border border-brand-gold/30 rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden"
                >
                    {/* Subtle warning pattern or icon */}
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <svg className="w-32 h-32 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#01284A] mb-6 flex items-center justify-center gap-3">
                        <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Importante
                    </h2>

                    <div className="space-y-4 text-lg md:text-xl text-[#3C3C3C] leading-relaxed relative z-10">
                        <p>
                            As turmas são presenciais e com número limitado de alunos.
                        </p>
                        <p className="font-light">
                            Isso acontece porque o treinamento exige acompanhamento próximo durante a formação.
                        </p>
                        <p className="font-semibold text-[#01284A] text-xl mt-6">
                            Por isso as vagas são limitadas.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ScarcitySection;
