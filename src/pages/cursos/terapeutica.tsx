import React from 'react';
import Header from '../../components/Header';
import CinematicCourseLayout from '../../components/layouts/CinematicCourseLayout';

export default function TerapeuticaPage() {
    const courseWhatsappMessage = 'Olá! Gostaria de ter mais informações sobre a Imersão em Endoscopia Terapêutica.';

    const handleWhatsAppClick = () => {
        const phoneNumber = '5511943375337';
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
            title: 'Triplique o Valor do Exame',
            description: 'Um exame diagnóstico custa R$ 800. O mesmo exame com polipectomia pode custar R$ 2.500. A diferença é esta formação.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
            ),
            title: 'Técnicas Que Poucos Dominam',
            description: 'Polipectomias, mucosectomias (EMR), ligadura de varizes, hemostasia de úlceras — aprenda o que 95% dos endoscopistas não sabem fazer.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Segurança no Manejo de Complicações',
            description: 'Não existe Terapêutica segura sem dominar o manejo de perfurações e sangramentos. Você treina para agir, não para entrar em pânico.',
        },
    ];

    const curriculum = [
        {
            module: 'M1',
            title: 'Terapêutica do Trato Superior',
            description: 'Hemostasia de úlceras, ligadura elástica de varizes esofágicas e dilatações e estenoses.',
        },
        {
            module: 'M2',
            title: 'Terapêutica do Trato Inferior',
            description: 'Polipectomia com alça quente e fria, Mucosectomia em níveis (EMR) e ressecções avançadas.',
        },
        {
            module: 'M3',
            title: 'Prática em Simuladores Orgânicos (Estativo Orgânico)',
            description: 'Práticas realistas para desenvolver e automatizar habilidades terapêuticas finas.',
        },
    ];

    return (
        <>
            <Header onWhatsAppClick={handleWhatsAppClick} whatsappMessage={courseWhatsappMessage} />
            <CinematicCourseLayout
                title="Terapêutica em Endoscopia"
                subtitle="Quem domina a Terapêutica cobra 3x mais pelo mesmo exame. Polipectomias, mucosectomias e hemostasias que transformam seu valor de mercado."
                description="Para endoscopistas e residentes cirúrgicos que já realizam laudos diagnósticos e querem escalar radicalmente o valor dos seus procedimentos. Aqui você aprende as intervenções que separam o especialista do expert."
                badge="Formação Masterclass · Pré-requisito: Endoscopia Básica"
                backgroundImage="/images/curso-terapeutica.png"
                highlights={highlights}
                curriculum={curriculum}
                whatsappMessage={courseWhatsappMessage}
                totalPrice="R$ 10.000"
                installmentPrice="12x de R$ 833,33"
            />
        </>
    );
}
