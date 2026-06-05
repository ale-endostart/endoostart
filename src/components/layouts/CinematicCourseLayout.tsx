import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Footer from '../Footer';
import { LP_CTA_URL } from '../../utils/constants';

interface Highlight {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface CurriculumItem {
    module: string;
    title: string;
    description: string;
}

interface CinematicCourseLayoutProps {
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    backgroundImage: string;
    highlights: Highlight[];
    curriculum: CurriculumItem[];
    whatsappMessage: string;
    priceDetails?: string;
    exclusiveNote?: string;
    totalPrice?: string;
    installmentPrice?: string;
}

export const CinematicCourseLayout: React.FC<CinematicCourseLayoutProps> = ({
    title,
    subtitle,
    description,
    badge,
    backgroundImage,
    highlights,
    curriculum,
    priceDetails,
    exclusiveNote,
    totalPrice,
    installmentPrice,
}) => {
    const whatsappUrl = LP_CTA_URL;

    return (
        <>
            <Head>
                <title>{title} | EndoStart</title>
                <meta name="description" content={description} />
            </Head>

            <div className="min-h-screen bg-brand-black text-[#E5E7EB] selection:bg-brand-gold/30 selection:text-white font-sans">

                <main className="overflow-hidden pt-28">
                    {/* Hero Section */}
                    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-4">
                        {/* Background elements */}
                        <div className="absolute inset-0 z-0">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity"
                                style={{ backgroundImage: `url(${backgroundImage})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#020813]/80 via-[#020813]/60 to-[#020813]" />
                            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
                        </div>

                        <div className="container relative z-10 max-w-5xl text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold tracking-widest uppercase mb-8"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
                                {badge}
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] tracking-tight mb-6"
                            >
                                {title.split(' ').map((word, i) => (
                                    <span key={i} className={i === title.split(' ').length - 1 ? 'text-brand-gold italic' : ''}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl md:text-3xl text-white/90 font-light mb-8 max-w-3xl mx-auto"
                            >
                                {subtitle}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="text-base md:text-lg text-white/60 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
                            >
                                {description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-brand-gold text-brand-black rounded-lg font-bold uppercase tracking-widest text-sm transition-all shadow-premium hover:shadow-gold-glow hover:-translate-y-1 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-premium" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        Garantir Minha Vaga
                                        <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </a>
                                {exclusiveNote && (
                                    <p className="mt-4 text-brand-gold/80 text-sm italic">{exclusiveNote}</p>
                                )}
                            </motion.div>
                        </div>
                    </section>

                    {/* Highlights Settings */}
                    <section className="py-24 relative z-10 bg-gradient-to-b from-[#020813] to-[#011425]">
                        <div className="container max-w-6xl">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {highlights.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                                        className="glass-card p-8 group hover:-translate-y-2 transition-all duration-500 border border-white/5 hover:border-brand-gold/30"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold/20 transition-all duration-500">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                        <p className="text-white/60 font-light leading-relaxed">{item.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Curriculum Section */}
                    <section className="py-24 md:py-32 relative bg-[#011425]">
                        <div className="container max-w-4xl relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">A Jornada de <span className="text-brand-gold italic">Transformação</span></h2>
                                <p className="text-white/70 text-lg">Metodologia prática estruturada passo a passo para o seu domínio absoluto.</p>
                            </div>

                            <div className="space-y-6">
                                {curriculum.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className="flex gap-6 p-6 rounded-2xl glass-panel group hover:shadow-gold-glow transition-all duration-300"
                                    >
                                        <div className="shrink-0 w-16 h-16 rounded-full bg-[#020813] border border-brand-gold/30 flex items-center justify-center text-brand-gold font-serif font-bold text-xl group-hover:scale-110 transition-transform duration-500">
                                            {item.module}
                                        </div>
                                        <div>
                                            <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h4>
                                            <p className="text-white/60 leading-relaxed font-light">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="py-32 relative overflow-hidden bg-brand-black">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,154,106,0.1)_0%,transparent_70%)]" />

                        <div className="container max-w-3xl text-center relative z-10">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
                                Pronto para se destacar na <span className="text-brand-gold italic">Medicina?</span>
                            </h2>
                            {installmentPrice && (
                                <div className="mb-10 inline-block rounded-2xl border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-sm px-10 py-6">
                                    <p className="text-white/50 text-sm tracking-widest uppercase mb-1">Investimento</p>
                                    <p className="text-4xl md:text-5xl font-serif font-bold text-brand-gold">{installmentPrice}</p>
                                    {totalPrice && (
                                        <p className="text-white/50 text-sm mt-1">ou {totalPrice} à vista</p>
                                    )}
                                </div>
                            )}
                            {priceDetails && !installmentPrice && (
                                <p className="text-xl text-white/90 mb-10 font-light p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                                    {priceDetails}
                                </p>
                            )}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 px-12 py-6 bg-brand-gold text-brand-black rounded-lg font-bold uppercase tracking-widest text-sm transition-all shadow-premium hover:shadow-gold-glow hover:-translate-y-1 overflow-hidden"
                            >
                                Falar com Consultor Agora
                            </a>
                        </div>
                    </section>

                </main>

                <Footer />
            </div>
        </>
    );
};

export default CinematicCourseLayout;
