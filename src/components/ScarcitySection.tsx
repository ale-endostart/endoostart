import React from 'react';
import { motion } from 'framer-motion';
import { LP_CTA_URL } from '../utils/constants';

export const ScarcitySection: React.FC = () => {
    const whatsappUrl = LP_CTA_URL;

    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-[800px] mx-auto bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200 rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden"
                >
                    {/* Subtle warning pattern or icon */}
                    <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                        <svg className="w-32 h-32 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="inline-block mb-4">
                        <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">Urgente</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-red-700 mb-6 flex items-center justify-center gap-3">
                        <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Vagas Limitadas
                    </h2>

                    <div className="space-y-4 text-lg md:text-xl text-[#3C3C3C] leading-relaxed relative z-10">
                        <p className="font-semibold text-red-700">
                            As turmas são presenciais e com número muito limitado de alunos.
                        </p>
                        <p className="font-light">
                            Isso acontece porque o treinamento exige acompanhamento próximo e personalizado durante toda a formação.
                        </p>
                        <p className="font-bold text-[#01284A] text-lg mt-6 bg-white/60 py-4 px-4 rounded-xl">
                            Se você quer se inscrever, entre em contato agora mesmo.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-8 relative z-10"
                    >
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold uppercase tracking-wider text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437-9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                            </svg>
                            Garantir minha vaga agora
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ScarcitySection;
