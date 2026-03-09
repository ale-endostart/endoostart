import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ParticleNetwork from './ui/ParticleNetwork';

const courses = [
    {
        id: 'endoscopia',
        title: 'Endoscopia Digestiva Alta',
        description: 'Do zero ao domínio técnico completo. Formação presencial intensiva com turmas de apenas 3 alunos para máxima atenção prática.',
        image: '/images/medica-endoscopia.png',
        link: '/cursos/endoscopia',
        date: '2026',
        location: 'São Paulo - SP e Curitiba - PR',
        badge: 'Vagas Limitadas',
    },
    {
        id: 'colonoscopia',
        title: 'Colonoscopia',
        description: 'Especialize-se na prevenção e diagnóstico de condições do trato gastrointestinal inferior com precisão cinematográfica.',
        image: '/images/medica-endoscopia.png',
        link: '/cursos/colonoscopia',
        date: '2026',
        location: 'São Paulo - SP e Curitiba - PR',
        badge: 'Avançado',
    },
    {
        id: 'terapeutica',
        title: 'Terapêutica em Endoscopia',
        description: 'Para médicos que já realizam endoscopia e buscam avançar para procedimentos terapêuticos complexos.',
        image: '/images/medica-endoscopia.png',
        link: '/cursos/terapeutica',
        date: '2026',
        location: 'São Paulo - SP e Curitiba - PR',
        badge: 'Masterclass',
    },
    {
        id: 'balao',
        title: 'Balão Gástrico',
        description: 'Domine o implante e retirada do balão intragástrico, um dos procedimentos mais procurados no emagrecimento.',
        image: '/images/medica-endoscopia.png',
        link: '/cursos/balao-gastrico',
        date: 'A combinar',
        location: 'Online e Presencial',
        badge: 'Alta Demanda',
    }
];

export const CoursePreviewSection: React.FC = () => {
    return (
        <section id="cursos-preview" className="relative pb-24 md:pb-32 bg-[#f4f4f4]">
            {/* Background Dark Area with Particles */}
            <div className="relative pt-24 pb-48 bg-[#0B0D17] overflow-hidden">
                <ParticleNetwork />

                <div className="container relative z-10 text-center mb-10">
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                        Nossos Cursos
                    </h2>
                    <p className="mt-4 text-white/80 text-lg max-w-3xl mx-auto font-light leading-relaxed">
                        Oferecemos treinamentos avançados para médicos que desejam se especializar em procedimentos endoscópicos e cirúrgicos, com aulas teóricas e prática hands-on em pacientes reais.
                    </p>
                </div>

                {/* Curved SVG Divider pointing downwards */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
                    <svg className="relative block w-full h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#f4f4f4"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#f4f4f4"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f4f4f4"></path>
                    </svg>
                </div>
            </div>

            {/* Overlapping White Cards */}
            <div className="container relative z-20 -mt-24 md:-mt-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {courses.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className="h-full"
                        >
                            <Link href={course.link} className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Badge overlay on image */}
                                    <div className="absolute top-3 left-3 bg-[#0B0D17]/80 backdrop-blur text-brand-gold text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full z-10">
                                        {course.badge}
                                    </div>
                                </div>

                                <div className="flex-1 p-6 flex flex-col">
                                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#01284A] transition-colors">{course.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                                        {course.description}
                                    </p>

                                    <div className="flex flex-col gap-2 mb-6 text-sm text-gray-500 font-medium">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {course.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {course.location}
                                        </div>
                                    </div>

                                    <div className="w-full py-3 px-4 bg-gradient-to-r from-[#D4B87A] to-[#B89A6A] text-[#1A1A1A] font-bold text-center rounded md:rounded-lg text-sm md:text-base uppercase tracking-wider transition-transform hover:scale-[1.02] shadow-md">
                                        Saiba Mais
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
