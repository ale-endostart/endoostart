import React from 'react';
import CinematicCourseLayout from '../../components/layouts/CinematicCourseLayout';

export default function EndoscopiaPage() {
    const highlights = [
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            ),
            title: 'Turmas de 3 Alunos',
            description: 'Diferente de cursos de pós-graduação lotados, você terá a atenção quase particular dos nossos preceptores o tempo todo.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
            ),
            title: 'Foco Absoluto em Segurança',
            description: 'Aprenda não apenas a manusear o endoscópio, mas a sedação e anatomia, blindando sua prática médica contra intercorrências.',
        },
        {
            icon: (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
            ),
            title: 'Prática Intensiva (Hands-on)',
            description: 'Do simulador aos pacientes reais, você terá horas exaustivas de prática guiada até atingir a maestria dos movimentos.',
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
        <CinematicCourseLayout
            title="Endoscopia Digestiva Alta"
            subtitle="A elite da formação endoscópica brasileira. Aprenda com excelência e triplique o valor da sua hora médica."
            description="Uma imersão presencial de alto impacto projetada exclusivamente para médicos que exigem o que há de melhor. Turmas minúsculas garantem que você toque, sinta e treine até seus movimentos se tornarem automáticos."
            badge="Formação VIP - Vagas Muito Limitadas"
            backgroundImage="/images/medica-endoscopia.png"
            highlights={highlights}
            curriculum={curriculum}
            whatsappMessage="Olá Equipe EndoStart! Quero saber os detalhes (valores e datas) sobre a incrível Formação de Endoscopia Digestiva Alta (Vip - 3 Alunos)."
            priceDetails="Condições Especiais para os primeiros inscritos da próxima turma. Fale com um consultor para descobrir o bônus de laudos avançados."
            exclusiveNote="Apenas 3 alunos por turma. O fechamento costuma ser rápido."
        />
    );
}
