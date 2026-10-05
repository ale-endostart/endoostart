import Header from '../../components/Header';
import CinematicCourseLayout from '../../components/layouts/CinematicCourseLayout';
import { LP_CTA_URL } from '../../utils/constants';

export default function ColonoscopiaPage() {
    const courseWhatsappMessage = 'Olá Equipe EndoStart! Quero me especializar em Colonoscopia. Podem me passar mais informações da próxima turma?';

    const handleWhatsAppClick = () => {
        window.open(LP_CTA_URL, '_blank', 'noopener,noreferrer');
    };
    const highlights = [
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Técnica de Alças na Prática',
            description: 'O maior desafio da colonoscopia — intubação ileal e retificação de alças — treinado exaustivamente até virar memória muscular.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
            ),
            title: 'Supervisão 1:1 com Especialista',
            description: 'Cada exame prático é supervisionado de perto pelos melhores endoscopistas e coloproctologistas do Brasil.',
        },
    ];

    const curriculum = [
        {
            module: 'M1',
            title: 'Checklist e Equipamentos',
            description: 'Domine a configuração, limpeza do cólon e o manuseio avançado do colonoscópio.',
        },
        {
            module: 'M2',
            title: 'Dinâmica e Anatomia Colorretal',
            description: 'Diagnóstico visual avançado e identificação precoce das doenças mais perigosas do trato inferior.',
        },
        {
            module: 'M3',
            title: 'Anestesia e Sedação',
            description: 'Protocolos de segurança, gestão de crise e sedação específica para procedimentos de longa duração.',
        },
        {
            module: 'M4',
            title: 'Técnicas de Retificação de Alças',
            description: 'O grande desafio da colonoscopia. Domine técnicas para evitar desconforto e avançar com maestria.',
        },
        {
            module: 'M5',
            title: 'Identificação de Pólipos e Biópsia',
            description: 'O olhar clínico refinado para encontrar lesões minúsculas e coletar fragmentos com alta precisão.',
        },
    ];

    return (
        <>
            <Header onWhatsAppClick={handleWhatsAppClick} whatsappMessage={courseWhatsappMessage} />
            <CinematicCourseLayout
                title="Colonoscopia"
                subtitle="O exame mais demandado na medicina preventiva. Domine a colonoscopia e abra uma agenda que se paga em 2 dias de trabalho."
                description="Formação presencial intensiva que capacita o médico a navegar todo o cólon com precisão, contornar alças difíceis e identificar lesões precoces — procedimento mais solicitado no rastreamento de câncer colorretal."
                badge="Formação Avançada · Goiânia GO"
                backgroundImage="/images/curso-colonoscopia.png"
                highlights={highlights}
                curriculum={curriculum}
                whatsappMessage={courseWhatsappMessage}
                totalPrice="R$ 51.000"
                installmentPrice="18x de R$ 2.834"
            />
        </>
    );
}
