import React from 'react';
import Header from '../../components/Header';
import CinematicCourseLayout from '../../components/layouts/CinematicCourseLayout';

export default function BalaoGastricoPage() {
    const courseWhatsappMessage = 'Olá! Gostaria de participar da próxima turma de Implante e Retirada de Balão Gástrico.';

    const handleWhatsAppClick = () => {
        const phoneNumber = '5562991980100';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(courseWhatsappMessage)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };
    const highlights = [
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'ROI em 2 Procedimentos',
            description: 'Com ticket médio de R$ 5.000 por implante, o investimento da formação se paga nos primeiros 2 pacientes. Margem líquida excepcional.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
            ),
            title: 'Implante + Explante Completo',
            description: 'Não só o implante — você domina a retirada segura, inclusive casos difíceis como balão hiperinsuflado e perda de alça.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
            ),
            title: 'Mercado com Altíssima Demanda',
            description: 'Obesidade afeta 1 em cada 4 brasileiros. Poucos médicos dominam esta técnica. Posicione-se agora no mercado que mais cresce.',
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
            title: 'Técnica de Implante',
            description: 'Preenchimento seguro, coloração do líquido e tração controlada. Como verificar a localização exata sem deixar margem a erros.',
        },
        {
            module: 'M3',
            title: 'Técnica de Retirada (Explante)',
            description: 'Extração segura. Dificuldades comuns como balão hiperinsuflado, perda da alça e técnica de aprisionamento profundo.',
        },
    ];

    return (
        <>
            <Header onWhatsAppClick={handleWhatsAppClick} whatsappMessage={courseWhatsappMessage} />
            <CinematicCourseLayout
                title="Balão Intragástrico"
                subtitle="O procedimento mais demandado no mercado de obesidade. Aprenda em um fim de semana e comece a oferecer na semana seguinte."
                description="Formação intensiva onde você domina implante e explante de balão intragástrico do zero — indicações, sedação, técnica, manejo dos primeiros dias e critérios de retirada segura. Mercado em alta em todo o Brasil."
                badge="Formação de Alta Demanda · Menor Ticket de Entrada"
                backgroundImage="/images/curso-balao-gastrico.png"
                highlights={highlights}
                curriculum={curriculum}
                whatsappMessage={courseWhatsappMessage}
                totalPrice="R$ 10.000"
                installmentPrice="12x de R$ 833,33"
                exclusiveNote="Procedimento privado. Ticket médio de R$ 4.000 a R$ 8.000 por implante."
            />
        </>
    );
}
