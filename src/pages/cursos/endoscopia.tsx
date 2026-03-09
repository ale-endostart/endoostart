import React from 'react';
import Header from '../../components/Header';
import CinematicCourseLayout from '../../components/layouts/CinematicCourseLayout';

export default function EndoscopiaPage() {
    const courseWhatsappMessage = 'Olá Equipe EndoStart! Quero saber os detalhes (valores e datas) sobre a incrível Formação de Endoscopia Digestiva Alta (Vip - 3 Alunos).';

    const handleWhatsAppClick = () => {
        const phoneNumber = '5511943375337';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(courseWhatsappMessage)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };
    const highlights = [
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: '3 Alunos. Atenção Total.',
            description: 'Cada movimento seu é visto e corrigido em tempo real. Não há como sair sem dominar.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Fature R$ 2.000 por Exame',
            description: 'Endoscopia Digestiva Alta no setor privado paga entre R$ 800 e R$ 2.000 por procedimento de 30 minutos.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
            ),
            title: 'Do Simulador ao Paciente Real',
            description: 'Memória muscular construída do zero: simuladores de alta fidelidade → pacientes supervisionados → laudo independente.',
        },
    ];

    const curriculum = [
        {
            module: 'M1',
            title: 'Conhecendo e Dominando o Aparelho',
            description: 'Fundamentos essenciais da torre de endoscopia. Conhecendo engrenagens, limpeza, defeitos comuns e ajustes de imagem.',
        },
        {
            module: 'M2',
            title: 'Treinamento Realístico com Simuladores',
            description: 'Antes do paciente real, desenvolva memória muscular através de nossos simuladores de alta fidelidade anatômica.',
        },
        {
            module: 'M3',
            title: 'Sedação com Anestesista Especialista',
            description: 'Dose segura, vias oblíquas e resgate. Um módulo crucial ministrado por anestesiologistas voltados para endoscopia.',
        },
        {
            module: 'M4',
            title: 'Anatomia e Patologias (Esôfago, Estômago e Intestino)',
            description: 'Gastroenterologistas detalham o reconhecimento exato das doenças locais, do diagnóstico visual à biópsia precisa.',
        },
        {
            module: 'M5',
            title: 'Hands-on e Prática em Cenários Reais',
            description: 'A hora da verdade. Sob supervisão constante, você assumirá a ponta do endoscópio, ganhando confiança a cada laudo.',
        },
    ];

    return (
        <>
            <Header onWhatsAppClick={handleWhatsAppClick} whatsappMessage={courseWhatsappMessage} />
            <CinematicCourseLayout
                title="Endoscopia Digestiva Alta"
                subtitle="De plantão de 12h a R$ 150 para uma manhã de endoscopias a R$ 4.000. Esse é o impacto real desta formação."
                description="Imersão presencial VIP com apenas 3 médicos por turma. Em poucos dias você vai tocar o endoscópio, interpretar imagens, laudar com segurança e sair com o protocolo completo para montar sua agenda de exames."
                badge="Formação VIP · Apenas 3 Alunos"
                backgroundImage="/images/curso-endoscopia.png"
                highlights={highlights}
                curriculum={curriculum}
                whatsappMessage={courseWhatsappMessage}
                totalPrice="R$ 45.000"
                installmentPrice="12x de R$ 3.750"
                exclusiveNote="Atenção quase 1:1 dos preceptores. Turmas fecham ao atingir 3 inscrições."
            />
        </>
    );
}
