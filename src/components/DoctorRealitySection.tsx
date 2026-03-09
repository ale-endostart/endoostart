import React from 'react';
import { motion } from 'framer-motion';

export const DoctorRealitySection: React.FC = () => {
    return (
        <section className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden flex flex-col items-center justify-center border-t border-black/5">
            <div className="container max-w-4xl px-4 mx-auto text-center relative z-10">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl lg:text-[54px] font-serif font-bold text-[#01284A] mb-16 leading-[1.15] tracking-tight"
                >
                    A realidade que quase todo médico descobre depois de pegar o CRM
                </motion.h2>

                <div className="space-y-12 text-[#3C3C3C] text-lg md:text-xl font-light leading-relaxed">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p>Você passa anos estudando medicina.</p>
                        <p>Provas difíceis. Internato. Madrugadas estudando.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p>Finalmente se forma.</p>
                        <p>Pega o CRM.</p>
                        <p>E imagina que agora a vida vai começar de verdade.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <p>Mas o que acontece na prática é diferente.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="py-8 my-8 border-y border-black/10 relative"
                    >
                        {/* Decorative subtle dot */}
                        <div className="absolute top-1/2 left-0 -translate-x-12 -translate-y-1/2 w-3 h-3 rounded-full bg-[#01284A]/20 hidden md:block"></div>
                        <div className="absolute top-1/2 right-0 translate-x-12 -translate-y-1/2 w-3 h-3 rounded-full bg-[#01284A]/20 hidden md:block"></div>

                        <p className="text-xl md:text-3xl font-medium text-[#01284A] mb-2">Plantão. Outro plantão. Mais um plantão.</p>
                        <p className="italic text-black/50 text-base md:text-lg">UPA cheia. Emergência lotada. Virando madrugada.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <p>E o dinheiro? Até entra.</p>
                        <p>Mas entra ao custo da sua energia, do seu tempo e da sua rotina.</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DoctorRealitySection;
