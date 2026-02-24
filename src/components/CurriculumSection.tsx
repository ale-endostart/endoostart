import React, { useState } from 'react';

interface Module {
  id: string;
  title: string;
  description: string;
  topics: string[];
  hours: string;
}

const modules: Module[] = [
  {
    id: 'drge',
    title: 'DRGE (Doença do Refluxo Gastroesofágico)',
    description: 'Compreenda a fisiopatologia, diagnóstico e tratamento da DRGE com classificação de Los Angeles.',
    topics: [
      'Fisiopatologia da DRGE',
      'Classificação de Los Angeles',
      'Diagnóstico por endoscopia',
      'Tratamento clínico e endoscópico',
      'Casos complicados e refratários',
    ],
    hours: '12h',
  },
  {
    id: 'tumores',
    title: 'Tumores Gástricos',
    description: 'Diagnóstico precoce e classificação de adenocarcinomas usando Lauren e Bormann.',
    topics: [
      'Epidemiologia do câncer gástrico',
      'Classificação de Lauren',
      'Classificação de Bormann',
      'Técnicas de biópsia aprimoradas',
      'Estadiamento endoscópico',
      'Abordagem diagnóstica integrada',
    ],
    hours: '14h',
  },
  {
    id: 'hemorragias',
    title: 'Hemorragias Digestivas Altas e Baixas',
    description: 'Manejo de urgências com técnicas de hemostasia, clipagem e cauterização.',
    topics: [
      'Avaliação clínica da hemorragia digestiva',
      'Estabilização do paciente',
      'Técnicas de hemostasia',
      'Clipagem endoscópica',
      'Cauterização (térmica e argônio)',
      'Manejo de varizes esofágicas',
      'Hemorragia digestiva baixa',
    ],
    hours: '16h',
  },
  {
    id: 'anorrectal',
    title: 'Afecções Anorretais',
    description: 'Diagnóstico e tratamento de afecções anorretais com técnicas minimamente invasivas.',
    topics: [
      'Fissura anal',
      'Hemorróidas internas e externas',
      'Fístulas anorretais',
      'Abscesso anorretal',
      'Doença diverticular',
      'Técnicas de tratamento',
      'Indicações para cirurgia',
    ],
    hours: '12h',
  },
];

interface ExpandedModule {
  [key: string]: boolean;
}

export const CurriculumSection: React.FC = () => {
  const [expandedModules, setExpandedModules] = useState<ExpandedModule>({});

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const colors = {
    drge: 'from-blue-500 to-blue-600',
    tumores: 'from-purple-500 to-purple-600',
    hemorragias: 'from-red-500 to-red-600',
    anorrectal: 'from-indigo-500 to-indigo-600',
  };

  return (
    <section id="curriculum" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Grade Curricular <span className="gradient-text">Técnica</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Cada módulo foi desenvolvido com base em casos reais e nas técnicas mais avançadas praticadas nos melhores centros endoscópicos do Brasil.
          </p>
        </div>

        <div className="space-y-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className="card-premium overflow-hidden transition-all duration-300"
            >
              {/* Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className={`w-full bg-gradient-to-r ${colors[module.id as keyof typeof colors] || 'from-primary-500 to-primary-600'} text-white p-6 flex items-center justify-between group hover:shadow-md transition-all`}
              >
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1">{module.title}</h3>
                  <p className="text-white/80 text-sm">{module.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${expandedModules[module.id] ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedModules[module.id] && (
                <div className="p-8 border-t border-neutral-100 space-y-6 animate-slideUp">
                  {/* Topics List */}
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 mb-4">Tópicos Abordados:</h4>
                    <ul className="space-y-2">
                      {module.topics.map((topic, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${colors[module.id as keyof typeof colors] || 'from-primary-500 to-primary-600'} flex-shrink-0 mt-2`}></span>
                          <span className="text-neutral-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Module Duration */}
                  <div className="bg-neutral-50 rounded-lg p-4 flex items-center justify-between">
                    <span className="text-neutral-600 font-medium">Duração do Módulo</span>
                    <span className="text-2xl font-bold text-neutral-900">{module.hours}</span>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const message = `Olá! Sou médico e gostaria de saber mais sobre o módulo ${module.title}`;
                      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="btn-whatsapp w-full justify-center"
                  >
                    Quero Participar Deste Módulo
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Total Hours Summary */}
        <div className="mt-12 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-3">Carga Horária Total</h3>
              <p className="text-5xl font-bold bg-gradient-to-r from-success-400 to-emerald-400 bg-clip-text text-transparent">
                54h
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-neutral-300">
                Incluso: Aulas práticas, supervisão direta do Dr. Alessandro, material técnico atualizado e acesso vitalício ao acervo de cases.
              </p>
              <button
                onClick={() => {
                  const message = 'Olá! Sou médico e gostaria de saber mais sobre a Imersão';
                  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="btn-whatsapp"
              >
                Começar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
