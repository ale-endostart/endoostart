import React from 'react';
import CinematicCourseLayout from '../../components/layouts/CinematicCourseLayout';

export default function ColonoscopiaPage() {
    const highlights = [
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Alta Demanda e Rentabilidade',
            description: 'O exame padrão-ouro para rastreamento de câncer colorretal é um dos procedimentos mais solicitados na rotina médica.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Técnica e Precisão',
            description: 'Navegação avançada de cólon, técnicas de intubação ileal, reversão de alças (looping) e reconhecimento precoce de lesões.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
            ),
            title: 'Treinamento Realista',
            description: 'Passo a passo com pacientes reais sob supervisão 1 para 1 dos melhores coloproctologistas e endoscopistas do Brasil.',
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
        <CinematicCourseLayout
            title="Colonoscopia"
            subtitle="Domínio diagnóstico do trato gastrointestinal inferior. Torne-se um especialista na prevenção do câncer colorretal."
            description="Um programa imersivo profundo que capacita o médico a realizar a colonoscopia com extrema destreza, superando os maiores desafios técnicos da anatomia intestinal inferior."
            badge="Formação Avançada"
            backgroundImage="/images/medica-endoscopia.png"
            highlights={highlights}
            curriculum={curriculum}
            whatsappMessage="Olá Equipe EndoStart! Quero me especializar em Colonoscopia. Podem me passar mais informações da próxima turma?"
            priceDetails="Formação premium com turmas extremamente limitadas. Consultoria particular bônus para estruturação da sua agenda."
        />
    );
}
