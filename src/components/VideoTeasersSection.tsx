import React from 'react';
import { motion } from 'framer-motion';

export const VideoTeasersSection: React.FC = () => {
    return (
        <section className="py-24 bg-[#020813] relative overflow-hidden border-t border-white/5">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 w-full max-w-[1000px] h-full bg-[radial-gradient(ellipse_at_top,rgba(212,184,122,0.05),transparent_50%)] -translate-x-1/2 pointer-events-none" />

            <div className="container max-w-6xl px-4 mx-auto relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-4 block">
                        Experiência Real
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
                        Veja o que acontece na <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-[#E2C792]">Prática</span>
                    </h2>
                    <div className="w-16 h-[1px] bg-brand-gold mx-auto opacity-50"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Video 1: Aula Prática */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="group relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-brand-lightBlue/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                        <div className="relative aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                            <video
                                src="/videos/aula_pratica_curso.MOV"
                                aria-label="Vídeo Aula Prática do Curso"
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                disablePictureInPicture
                                controls={true}
                                controlsList="nodownload"
                            />
                            {/* Overlay Gradient for text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                                <h3 className="text-xl font-bold text-white mb-2 shadow-black drop-shadow-md">
                                    Hands-on Intensivo
                                </h3>
                                <p className="text-white/80 text-sm drop-shadow-md">
                                    Apenas 3 alunos. Você no comando do endoscópio sob supervisão direta.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Video 2: Chamado Curso */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="group relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-lightBlue/20 to-brand-gold/20 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                        <div className="relative aspect-[9/16] md:aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                            <video
                                src="/videos/chamado_curso.MOV"
                                aria-label="Vídeo Chamada do Curso"
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                disablePictureInPicture
                                controls={true}
                                controlsList="nodownload"
                            />
                            {/* Overlay Gradient for text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                                <h3 className="text-xl font-bold text-white mb-2 shadow-black drop-shadow-md">
                                    O Próximo Nível da sua Carreira
                                </h3>
                                <p className="text-white/80 text-sm drop-shadow-md">
                                    Prepare-se para transformar sua realidade clínica num fim de semana.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default VideoTeasersSection;
