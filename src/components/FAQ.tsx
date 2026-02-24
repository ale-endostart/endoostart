import React, { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 'investment',
    question: 'O investimento de R$ 45k é realmente um bom retorno?',
    answer:
      'Sim. O valor se recupera em menos de 40 procedimentos realizados. Em cidades do interior com demanda reprimida, isso pode acontecer em menos de 2 meses. Considerando uma carreira de 20+ anos como especialista em endoscopia, o ROI é exponencial.',
  },
  {
    id: 'experience',
    question: 'Preciso de experiência prévia em endoscopia?',
    answer:
      'Não. Começamos do zero: empunhadura do aparelho, configuração de torres, técnicas básicas até os casos mais complexos. O único requisito é ser médico formado e ter vontade de aprender.',
  },
  {
    id: 'practice',
    question: 'Como funciona a prática supervisionada?',
    answer:
      'Você realiza cada procedimento com supervisão direta do Dr. Alessandro ou de médicos senior previamente treinados. Começamos com simuladores, depois pacientes reais em ambiente controlado. Segurança em primeiro lugar.',
  },
  {
    id: 'location',
    question: 'Sou médico do interior, consigo instalar um serviço de endoscopia?',
    answer:
      'Sim, esse é um dos focos da EndoStart. O Dr. Alessandro orienta desde a estrutura do consultório, aquisição de equipamentos até a capilarização de pacientes. Muitos alunos já montaram serviços lucrativos no interior.',
  },
  {
    id: 'network',
    question: 'Preciso viajar para uma capital?',
    answer:
      'A imersão é presencial para garantir a prática com supervisão. Porém, estamos expandindo com módulos online e presenciais em diferentes regiões. Consulte nosso assistente sobre as opções de turma disponíveis.',
  },
  {
    id: 'certificate',
    question: 'Recebo um certificado? É reconhecido?',
    answer:
      'Você recebe um certificado de conclusão da Imersão EndoStart. O certificado demonstra a competência prática comprovada. Para títulos de especialista, recomendamos também fazer a prova de título da SBAD ou similar.',
  },
  {
    id: 'support',
    question: 'E depois que terminar a imersão?',
    answer:
      'Você tem acesso vitalício ao acervo técnico, casos complexos resolvidos e suporte para dúvidas. Além disso, você entra em uma rede de alumni onde compartilhamos oportunidades, desafios e técnicas avançadas.',
  },
  {
    id: 'guarantee',
    question: 'Há alguma garantia ou política de reembolso?',
    answer:
      'Oferecemos uma garantia de satisfação. Se você comparece a 80% das aulas e não se sente preparado, oferecemos orientação personalizada adicional sem custo. Reembolso é raro porque os resultados falam por si.',
  },
];

interface ExpandedFAQ {
  [key: string]: boolean;
}

export const FAQ: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<ExpandedFAQ>({});

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleWhatsApp = () => {
    const message = 'Olá! Tenho uma dúvida sobre a imersão na EndoStart. Posso conversar com vocês?';
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-neutral-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Dúvidas Frequentes
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Esclarecemos as principais questões que médicos em transição de carreira costumam fazer.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} className="card-premium overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-neutral-900 text-left">{item.question}</h3>
                <svg
                  className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                    expandedItems[item.id] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {expandedItems[item.id] && (
                <div className="px-8 py-6 border-t border-neutral-100 bg-neutral-50/50 animate-slideUp">
                  <p className="text-neutral-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 text-center space-y-6">
          <p className="text-lg text-neutral-600">
            Ainda tem dúvidas? Nosso consultor está pronto para ajudar!
          </p>
          <button onClick={handleWhatsApp} className="btn-primary text-lg px-8 py-4">
            Falar com um Consultor
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
