import React from 'react';
import CinematicCourseLayout from '../../components/layouts/CinematicCourseLayout';

export default function TerapeuticaPage() {
    const highlights = [
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
            ),
            title: 'Do Diagnóstico ao Tratamento',
            description: 'Eleve o nível da sua prática: passe a diagnosticar e realizar a intervenção corretiva no mesmo procedimento.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
            ),
            title: 'Técnicas Avançadas',
            description: 'Polipectomias, mucosectomias, tratamento de sangramentos e uso avançado do eletrocautério.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Gestão de Complicações',
            description: 'A base da Terapêutica segura é saber gerenciar perfurações e grandes sangramentos. Nós ensinamos como.',
        },
    ];

    const curriculum = [
        {
            module: 'M1',
            title: 'Física do Eletrocautério',
            description: 'Entenda os vetores de força, coagulação e corte para máxima eficácia sem riscos colaterais térmicos.',
        },
        {
            module: 'M2',
            title: 'Terapêutica do Trato Superior',
            description: 'Hemostasia de úlceras, ligadura elástica de varizes esofágicas e dilatações e estenoses.',
        },
        {
            module: 'M3',
            title: 'Terapêutica do Trato Inferior',
            description: 'Polipectomia com alça quente e fria, Mucosectomia em níveis (EMR) e ressecções avançadas.',
        },
        {
            module: 'M4',
            title: 'Manejo e Tratamento de Perfurações',
            description: 'Treinamento rápido e incisivo no uso de clipes endoscópicos profiláticos e reativos.',
        },
        {
            module: 'M5',
            title: 'Prática em Simuladores Orgânicos (Estativo Orgânico)',
            description: 'Práticas realistas para desenvolver e automatizar habilidades terapêuticas finas.',
        },
    ];

    return (
        <CinematicCourseLayout
            title="Terapêutica em Endoscopia"
            subtitle="O próximo nível da sua prática: Domine as técnicas de intervenção minimamente invasivas mais complexas e desejadas."
            description="Um curso exclusivo para médicos endoscopistas e residentes cirúrgicos que querem ir além do laudo. Este é o treinamento masterclass onde a intervenção terapêutica definitiva é colocada em suas mãos sob extrema cautela e precisão técnica."
            badge="Formação Masterclass"
            backgroundImage="/images/medica-endoscopia.png"
            highlights={highlights}
            curriculum={curriculum}
            whatsappMessage="Olá! Gostaria de ter mais informações sobre a Imersão em Endoscopia Terapêutica."
            priceDetails="Condicionado à comprovação de experiência endoscópica básica."
        />
    );
}
