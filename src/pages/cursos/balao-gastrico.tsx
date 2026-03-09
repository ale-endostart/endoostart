import React from 'react';
import CinematicCourseLayout from '../../components/layouts/CinematicCourseLayout';

export default function BalaoGastricoPage() {
    const highlights = [
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Mercado em Expansão',
            description: 'O tratamento da obesidade é uma área incrivelmente valorizada e de alta procura no mercado particular de clínicas.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
            ),
            title: 'Técnica Integral',
            description: 'Dominar o implante é apenas 50% do processo. Você dominará totalmente o manejo de retirada segura.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
            ),
            title: 'Segurança e Acompanhamento',
            description: 'O que fazer nos primeiros 3 dias de sintomatologia intensa? Prepare-se para atuar e tranquilizar seu paciente com laudos impecáveis.',
        },
    ];

    const curriculum = [
        {
            module: 'M1',
            title: 'Tipos de Balão e Indicações Clássicas',
            description: 'Quando indicar e contraindicar um balão. Diferenças mecânicas e fisiológicas entre os volumes gástricos.',
        },
        {
            module: 'M2',
            title: 'Preparo Anestésico e Farmacológico',
            description: 'Protocolo de resgate anti-emético. A arte de evitar as maiores queixas dos primeiros dias e gerar conforto absoluto pro paciente.',
        },
        {
            module: 'M3',
            title: 'Técnica de Implante',
            description: 'Preenchimento seguro, coloração do líquido e tração controlada. Como verificar a localização exata sem deixar margem a erros.',
        },
        {
            module: 'M4',
            title: 'Técnica de Retirada (Explante)',
            description: 'Extração segura. Dificuldades comuns como balão hiperinsuflado, perda da alça e técnica de aprisionamento profundo.',
        },
        {
            module: 'M5',
            title: 'Avaliação Nutricional Simbiótica',
            description: 'Visão de equipe multidisciplinar. Quando e como encaminhar o paciente no pós-procedimento.',
        },
    ];

    return (
        <CinematicCourseLayout
            title="Balão Intragástrico"
            subtitle="Implante e Explante na Prática. Transforme a vida de pacientes com obesidade."
            description="Uma imersão rápida e de alta retenção onde o endoscopista aprende a realizar o tratamento endoscópico da obesidade de forma 100% segura e confiante, atraindo um fluxo altamente qualificado para o próprio consultório."
            badge="Formação de Alta Demanda"
            backgroundImage="/images/medica-endoscopia.png"
            highlights={highlights}
            curriculum={curriculum}
            whatsappMessage="Olá! Gostaria de participar da próxima turma de Implante e Retirada de Balão Gástrico."
        />
    );
}
