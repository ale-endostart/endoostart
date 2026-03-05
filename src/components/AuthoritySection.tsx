import React from 'react';
import { motion } from 'framer-motion';

export const AuthoritySection: React.FC = () => {
    return (
        <section className="relative py-20 md:py-32 bg-brand-lightGray overflow-hidden">
            <div className="container relative z-10 max-w-[900px]">
                {/* Decorative Quote Icon or Line */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center mb-10"
                >
                    <div className="w-12 h-1 bg-brand-gold rounded-full"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center"
                >
                    <p className="text-xl md:text-3xl lg:text-[32px] leading-relaxed text-[#01284A] font-serif font-medium mb-8">
                        "Formação criada por médicos com atuação hospitalar e experiência prática em endoscopia."
                    </p>
                    <p className="text-lg md:text-xl text-[#3C3C3C] font-light leading-relaxed max-w-[800px] mx-auto">
                        O objetivo da EndoStart é ensinar médicos a compreender o procedimento com <strong className="font-semibold text-[#01284A]">segurança, raciocínio clínico e técnica adequada</strong>.
                    </p>
                </motion.div>
            </div>

            {/* Subtle background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full border border-brand-gold/10 opacity-50 pointer-events-none"></div>
        </section>
    );
};

export default AuthoritySection;
