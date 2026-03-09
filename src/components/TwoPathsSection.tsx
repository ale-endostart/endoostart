import React from 'react';
import { motion } from 'framer-motion';

export const TwoPathsSection: React.FC = () => {
    return (
        <section className="py-24 bg-[#FAF9F6] relative overflow-hidden flex flex-col items-center">
            <div className="container max-w-5xl px-4 mx-auto relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#01284A] mb-6 tracking-tight">
                        Dois caminhos na medicina.
                    </h2>
                    <div className="w-16 h-[2px] bg-[#B89A6A] mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative w-full pt-8">

                    {/* Decorative dot from user reference */}
                    <div className="absolute top-1/2 right-[-2rem] -translate-y-1/2 w-3 h-3 rounded-full bg-[#01284A]/60 hidden lg:block"></div>

                    {/* Card 1: Médico de Plantão (Bad Path) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border-t-4 border-[#E57373] relative overflow-hidden"
                    >
                        <div className="flex items-center gap-3 mb-10">
                            <svg className="w-6 h-6 text-[#E57373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-2xl font-bold text-[#3C3C3C]">Médico de plantão</h3>
                        </div>

                        <ul className="space-y-6">
                            {[
                                "depende de escala",
                                "troca tempo por dinheiro",
                                "vive de carga horária",
                                "sempre correndo entre hospitais"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-[#666666] font-medium text-[17px]">
                                    <span className="text-[#E57373] font-bold mt-0.5">×</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Card 2: Médico de Procedimentos (Good Path) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-[#01284A] rounded-2xl p-8 md:p-12 shadow-[0_20px_50px_rgba(1,40,74,0.2)] border-t-4 border-[#D4B87A] relative overflow-hidden transform md:-translate-y-4"
                    >
                        {/* Star Decoration */}
                        <div className="absolute top-10 left-6 text-[#D4B87A]">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-3 mb-8 pl-8">
                            <h3 className="text-2xl font-bold text-white leading-tight">Médico que domina procedimentos</h3>
                        </div>

                        <div className="w-full h-[1px] bg-white/10 mb-8 pl-8"></div>

                        <ul className="space-y-6 lg:pl-4">
                            {[
                                "pode atuar em clínicas",
                                "constrói agenda própria",
                                "realiza procedimentos valorizados",
                                "amplia possibilidades dentro da medicina"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-white/90 font-medium text-[17px]">
                                    <svg className="w-5 h-5 text-[#D4B87A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                </div>
            </div>

            {/* SVG transition to dark section below */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 rotate-180 pointer-events-none">
                <svg className="relative block w-full h-[40px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" fill="#020813"></path>
                </svg>
            </div>
        </section>
    );
};

export default TwoPathsSection;
