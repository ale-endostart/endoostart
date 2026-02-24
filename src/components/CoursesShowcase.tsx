import React from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  modules: string[];
  duration: string;
  color: string;
  icon: string;
}

const courses: Course[] = [
  {
    id: 'endoscopia',
    title: 'Imersão em Endoscopia',
    description: 'Domine a endoscopia digestiva alta, desde a empunhadura até o diagnóstico de tumores esofágicos e gástricos.',
    modules: ['DRGE', 'Tumores de Esôfago', 'Adenocarcinoma Gástrico'],
    duration: '6 meses',
    color: 'from-blue-500 to-blue-600',
    icon: '🔬',
  },
  {
    id: 'colonoscopia',
    title: 'Imersão em Colonoscopia',
    description: 'Técnicas avançadas de colonoscopia, polipectomia e manejo de urgências no intestino grosso.',
    modules: ['Identificação de Pólipos', 'Polipectomias', 'Hemostasia Colônica'],
    duration: '6 meses',
    color: 'from-emerald-500 to-emerald-600',
    icon: '🏥',
  },
  {
    id: 'balao',
    title: 'Imersão em Balão Gástrico',
    description: 'Procedimento de alta demanda no mercado. Aprenda desde a seleção de pacientes até o acompanhamento pós-procedimento.',
    modules: ['Seleção de Pacientes', 'Técnica de Inserção', 'Pós-operatório'],
    duration: '3 meses',
    color: 'from-amber-500 to-amber-600',
    icon: '⚕️',
  },
  {
    id: 'terapeutica',
    title: 'Imersão em Terapêutica',
    description: 'Intervenções avançadas em hemorragias, afecções anorretais e procedimentos minimamente invasivos.',
    modules: ['Hemorragia Digestiva', 'Afecções Anorretais', 'Urgências'],
    duration: '6 meses',
    color: 'from-rose-500 to-rose-600',
    icon: '⚡',
  },
];

export const CoursesShowcase: React.FC = () => {
  const handleWhatsApp = (courseTitle: string) => {
    const message = `Olá! Sou médico e gostaria de saber mais sobre a Imersão em ${courseTitle}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="cursos" className="section-padding bg-gradient-to-b from-white to-neutral-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Nossa Vitrine de <span className="gradient-text">Cursos</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Escolha a especialidade que melhor se alinha com sua carreira. Cada curso é 100% prático e focado em resultados reais do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card-premium overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* Header with Gradient */}
              <div className={`bg-gradient-to-r ${course.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <span className="text-4xl block mb-2">{course.icon}</span>
                  <h3 className="text-xl font-bold leading-tight">{course.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {course.description}
                </p>

                {/* Modules */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Módulos inclusos</p>
                  <div className="space-y-1">
                    {course.modules.map((module, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        <span className="text-sm text-neutral-700">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-neutral-600">Duração do Curso</p>
                  <p className="text-lg font-bold text-neutral-900">{course.duration}</p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleWhatsApp(course.title)}
                  className="btn-whatsapp w-full justify-center text-sm"
                >
                  Quero Saber Mais
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="mt-20 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <p className="text-neutral-700">Prática com supervisão</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">12+</div>
              <p className="text-neutral-700">Anos de experiência</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
              <p className="text-neutral-700">Médicos formados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesShowcase;
