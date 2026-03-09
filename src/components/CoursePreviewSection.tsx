import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const courses = [
    {
        id: 'endoscopia',
        title: 'Endoscopia Digestiva Alta',
        description: 'Do zero ao domínio técnico completo. Formação presencial intensiva com turmas de apenas 3 alunos para máxima atenção prática.',
        image: '/images/medica-endoscopia.png',
        link: '/cursos/endoscopia',
        badge: 'Vagas Limitadas',
    },
    {
        id: 'colonoscopia',
        title: 'Colonoscopia',
        description: 'Especialize-se na prevenção e diagnóstico de condições do trato gastrointestinal inferior com precisão cinematográfica.',
        image: '/images/medica-endoscopia.png', // Placeholder shared image 
        link: '/cursos/colonoscopia',
        badge: 'Avançado',
    },
    {
        id: 'terapeutica',
        title: 'Terapêutica em Endoscopia',
        description: 'Para médicos que já realizam endoscopia e buscam avançar para procedimentos terapêuticos complexos.',
        image: '/images/medica-endoscopia.png', // Placeholder
        link: '/cursos/terapeutica',
        badge: 'Masterclass',
    },
    {
        id: 'balao',
        title: 'Balão Gástrico',
        description: 'Domine o implante e retirada do balão intragástrico, um dos procedimentos mais procurados no emagrecimento.',
        image: '/images/medica-endoscopia.png', // Placeholder
        link: '/cursos/balao-gastrico',
        badge: 'Alta Demanda',
    }
];

export const CoursePreviewSection: React.FC = () => {
    return (
        <section id="cursos-preview" className="relative py-24 md:py-32 bg-[#020813]">
            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <span className="w-12 h-[1px] bg-brand-gold"></span>
                        <span className="text-brand-gold uppercase tracking-widest text-xs font-bold">Portfólio de Elite</span>
                        <span className="w-12 h-[1px] bg-brand-gold"></span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
                        Nossas <span className="text-brand-gold italic">Formações</span>
                    </h2>
                    <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto font-light">
                        Escolha o seu próximo nível profissional. Cada imersão é desenhada meticulosamente para garantir segurança de alta performance na vida real.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {courses.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                        >
                            <Link href={course.link} className="group block relative rounded-2xl overflow-hidden glass-card p-4 transition-all hover:shadow-[0_0_40px_rgba(184,154,106,0.15)] hover:-translate-y-2 hover:border-brand-gold/20 h-full flex flex-col">
                                <div className="relative aspect-[16/9] md:aspect-[4/3] w-full overflow-hidden rounded-xl mb-6">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                    {/* Badge */}
                                    <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 rounded-full bg-brand-black/60 backdrop-blur-md border border-white/10 text-brand-gold text-xs font-bold tracking-widest uppercase">
                                        {course.badge}
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col px-2 pb-4">
                                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-white/60 font-light leading-relaxed mb-6 flex-1">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-brand-gold text-sm font-bold uppercase tracking-widest mt-auto group-hover:translate-x-2 transition-transform">
                                        Conhecer Formação
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursePreviewSection;
