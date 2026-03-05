import React from 'react';
import { motion } from 'framer-motion';

export const StructureSection: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    const topics = [
        "fundamentos da endoscopia",
        "anatomia endoscópica aplicada",
        "técnica do exame",
        "manejo correto do aparelho",
        "raciocínio clínico durante o procedimento",
        "introdução à colonoscopia",
        "segurança do paciente"
    ];

    return (
        <section id="formacao" className="py-20 md:py-32 bg-brand-lightGray">
            <div className="container max-w-[1000px] px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#01284A] mb-8 leading-tight">
                            Como funciona a formação
                        </h2>
                        <p className="text-xl text-[#3C3C3C] font-light leading-relaxed">
                            A formação acontece em <strong className="font-semibold text-[#01284A]">4 semanas presenciais</strong>.
                            <br /><br />
                            Durante esse período você terá contato diretos com os principais pilares da área:
                        </p>
                    </motion.div>

                    {/* List of topics */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-white p-8 md:p-10 rounded-2xl shadow-premium border border-brand-lightBlue/10 relative overflow-hidden"
                    >
                        {/* Timeline line visual */}
                        <div className="absolute left-[44px] top-12 bottom-12 w-1 bg-brand-lightGray"></div>

                        <ul className="space-y-6 relative z-10">
                            {topics.map((topic, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-center gap-6"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#01284A] text-brand-gold flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_15px_rgba(1,40,74,0.3)]">
                                        {index + 1}
                                    </div>
                                    <span className="text-[#3C3C3C] font-medium text-lg leading-snug">
                                        {topic.charAt(0).toUpperCase() + topic.slice(1)}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default StructureSection;
