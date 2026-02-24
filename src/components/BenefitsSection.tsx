import React from 'react';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const benefits: Benefit[] = [
  {
    id: 'hands-on',
    title: '100% Prática',
    description: 'Aprenda fazendo. Todos os alunos realizam 50+ procedimentos sob supervisão direta do Dr. Alessandro.',
    icon: '🎓',
  },
  {
    id: 'market',
    title: 'Demanda Real de Mercado',
    description: 'Especialidades com demanda reprimida. Faturemente a R$ 1.500 a R$ 2.500 por procedimento.',
    icon: '💰',
  },
  {
    id: 'support',
    title: 'Suporte Contínuo',
    description: 'Após a imersão, acesso vitalício a dúvidas técnicas, cases e atualizações de técnicas.',
    icon: '📞',
  },
  {
    id: 'network',
    title: 'Rede de Networking',
    description: 'Conecte-se com outros médicos, compartilhe experiências e oportunidades de associações.',
    icon: '🤝',
  },
  {
    id: 'setup',
    title: 'Suporte na Montagem do Serviço',
    description: 'Orientation completa sobre como estruturar seu consultório ou procederia no interior ou metrópole.',
    icon: '🏗️',
  },
  {
    id: 'lifetime',
    title: 'Acesso Vitalício ao Acervo',
    description: 'Biblioteca de cases, técnicas avançadas e atualizações constantes dos protocolos.',
    icon: '📚',
  },
];

export const BenefitsSection: React.FC = () => {
  const handleWhatsApp = () => {
    const message = 'Olá! Sou médico e gostaria de saber mais sobre a Imersão';
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Por Que Escolher a <span className="gradient-text">EndoStart</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Não é apenas um curso. É uma transformação completa da sua carreira médica com suporte total do Dr. Alessandro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="card-premium p-8 space-y-4 group hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-neutral-900">{benefit.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            EndoStart vs. Residência Tradicional
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="px-6 py-4 text-left font-semibold text-neutral-900">Aspecto</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <span className="text-success-600">EndoStart</span>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <span className="text-neutral-400">Residência</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-6 py-4 text-neutral-900 font-medium">Duração</td>
                  <td className="px-6 py-4 text-center">
                    <svg className="w-6 h-6 text-success-500 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    3-6 meses
                  </td>
                  <td className="px-6 py-4 text-center text-neutral-500">3 anos</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-6 py-4 text-neutral-900 font-medium">Custo</td>
                  <td className="px-6 py-4 text-center">
                    <svg className="w-6 h-6 text-success-500 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    R$ 45k
                  </td>
                  <td className="px-6 py-4 text-center text-neutral-500">3 anos sem renda</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-6 py-4 text-neutral-900 font-medium">Prática Supervisionada</td>
                  <td className="px-6 py-4 text-center">
                    <svg className="w-6 h-6 text-success-500 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    50+ procedimentos
                  </td>
                  <td className="px-6 py-4 text-center text-neutral-500">Centenas</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-6 py-4 text-neutral-900 font-medium">ROI (Payback)</td>
                  <td className="px-6 py-4 text-center">
                    <svg className="w-6 h-6 text-success-500 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    40 procedimentos
                  </td>
                  <td className="px-6 py-4 text-center text-neutral-500">Carreira toda</td>
                </tr>
                <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-6 py-4 text-neutral-900 font-medium">Qualidade de Vida</td>
                  <td className="px-6 py-4 text-center">
                    <svg className="w-6 h-6 text-success-500 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    Sem plantões
                  </td>
                  <td className="px-6 py-4 text-center text-neutral-500">Plantões noturnos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-8 lg:p-16 text-center space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold">Pronto para Transformar Sua Carreira?</h3>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Poucas vagas disponíveis por turma para garantir a qualidade da prática. Fale com nosso consultor agora mesmo.
          </p>
          <button onClick={handleWhatsApp} className="btn-whatsapp bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-4">
            Reservar Minha Consultoria Gratuita
          </button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
