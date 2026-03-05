import React from 'react';
import { motion } from 'framer-motion';

export const EndoStartSection: React.FC = () => {
    return (
        <section className="relative py-24 md:py-32 bg-[#01284A] text-white">
            {/* Abstract Background Curve */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-[60px] fill-white"
                >
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="container relative z-10 pt-10 px-4 max-w-[900px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden"
                >
                    {/* Subtle gold flare */}
                    <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-brand-gold/30 rounded-full blur-[80px] pointer-events-none"></div>

                    <h2 className="text-3xl md:text-5xl lg:text-5xl font-serif font-bold text-white mb-10 leading-tight">
                        Foi por isso que <span className="text-brand-gold italic font-normal">nasceu</span> a EndoStart.
                    </h2>

                    <div className="space-y-6 text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-[700px] mx-auto">
                        <p>
                            A EndoStart foi criada com um objetivo simples:
                            <br /><strong className="font-semibold text-white">ensinar médicos a aprender Endoscopia Digestiva Alta e Colonoscopia com segurança e raciocínio clínico.</strong>
                        </p>
                        <p>
                            Sem depender exclusivamente de residência.<br />
                            Sem anos esperando oportunidade.
                        </p>
                        <p className="text-xl md:text-2xl text-brand-gold font-serif italic pt-4">
                            Aqui o foco é formação prática e entendimento real do procedimento.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default EndoStartSection;
