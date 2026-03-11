import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const WhyEndoStartSection: React.FC = () => {
    return (
        <section id="sobre" className="relative py-24 md:py-32 bg-brand-black overflow-hidden section-blend-top">
            {/* Background Decor */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-lightBlue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-[1px] bg-brand-gold"></div>
                            <span className="text-brand-gold uppercase tracking-widest text-xs font-bold">O Nosso Propósito</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 leading-[1.2]">
                            Por que a <span className="text-brand-gold italic">EndoStart</span> nasceu?
                        </h2>

                        <div className="space-y-6 text-white/70 text-lg font-light leading-relaxed">
                            <p>
                                A EndoStart não é apenas uma escola médica. Nós nascemos da necessidade de preencher uma lacuna crítica na formação médica brasileira: o <strong>treinamento prático intensivo e de excelência</strong>.
                            </p>
                            <p>
                                Acreditamos que todo médico tem o potencial de elevar sua carreira clínica dominando procedimentos de alta demanda. No entanto, o sistema tradicional de ensino muitas vezes deixa o médico inseguro para atuar na ponta.
                            </p>
                            <p className="text-white/90 border-l-2 border-brand-gold pl-6 py-2 italic text-xl font-serif">
                                "Nossa missão é pegar o médico pelo braço e entregá-lo ao mercado com total segurança técnica e teórica para realizar exames de Endoscopia e Colonoscopia."
                            </p>
                            <p>
                                Com turmas extremamente reduzidas (<strong>apenas 3 alunos</strong> por imersão), garantimos uma atenção cirúrgica ao seu desenvolvimento. Não vendemos cursos; entregamos uma transformação de vida e carreira.
                            </p>
                        </div>
                    </motion.div>

                    {/* Visual Content - Dr. Alessandro or Immersive Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass-card p-2 group">
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent z-10 opacity-60"></div>

                            <div className="w-full h-full relative rounded-xl overflow-hidden">
                                <Image
                                    src="/images/doutor-alessandro.webp"
                                    alt="Dr. Alessandro"
                                    fill
                                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            {/* Floating Info Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="absolute bottom-6 left-6 right-6 z-20 glass-panel p-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Dr. Alessandro Rodrigues</h4>
                                        <p className="text-brand-gold/80 text-sm">Fundador & Diretor Geral</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Cinematic frame borders */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand-gold/30 rounded-tr-3xl" />
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-brand-gold/30 rounded-bl-3xl" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default WhyEndoStartSection;
