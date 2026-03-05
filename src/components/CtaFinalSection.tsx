import React from 'react';
import { motion } from 'framer-motion';

export const CtaFinalSection: React.FC = () => {
    const whatsappUrl = 'https://wa.me/5511943375337';

    return (
        <section id="inscricao" className="py-24 md:py-32 bg-[#01284A] text-white relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-lightBlue/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container relative z-10 max-w-[800px] px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight">
                        Fale com nossa equipe
                    </h2>

                    <p className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-[600px] mx-auto">
                        Clique no botão abaixo e fale diretamente com nossa equipe para saber:
                    </p>

                    <ul className="text-left md:text-center space-y-4 mb-12 max-w-[400px] mx-auto">
                        <li className="flex items-center md:justify-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                            <span className="text-lg tracking-wide">datas da próxima turma</span>
                        </li>
                        <li className="flex items-center md:justify-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                            <span className="text-lg tracking-wide">disponibilidade de vagas</span>
                        </li>
                        <li className="flex items-center md:justify-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                            <span className="text-lg tracking-wide">detalhes da inscrição</span>
                        </li>
                    </ul>

                    <motion.a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-gold text-[#01284A] rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-[0_4px_20px_rgba(184,154,106,0.4)] hover:shadow-[0_8px_30px_rgba(184,154,106,0.6)]"
                    >
                        Falar com a equipe no WhatsApp
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default CtaFinalSection;
