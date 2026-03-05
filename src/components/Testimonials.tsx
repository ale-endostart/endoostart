import React, { useState } from 'react';

interface Testimonial {
  id: string | number;
  name: string;
  specialty: string;
  location: string;
  quote: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Dr. Carlos Silva',
    specialty: 'Cirurgião Geral',
    location: 'São Paulo, SP',
    quote:
      'Depois de 10 anos em plantões, consegui multiplicar meus ganhos em apenas 3 meses com a EndoStart. A metodologia prática do Dr. Alessandro é incomparável.',
    rating: 5,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Dra. Marina Costa',
    specialty: 'Clínica Médica',
    location: 'Brasília, DF',
    quote:
      'Nunca imaginei fazer endoscopia com essa segurança. As aulas práticas com o Dr. Alessandro me deram confiança que 5 anos de literatura nunca conseguiram.',
    rating: 5,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    name: 'Dr. Roberto Alves',
    specialty: 'Gastroenterologista',
    location: 'Rio de Janeiro, RJ',
    quote:
      'O melhor investimento que já fiz na minha carreira. Saí da imersão com 50+ procedimentos realizados sob supervisão. Puro aprendizado.',
    rating: 5,
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 4,
    name: 'Dra. Patricia Gomes',
    specialty: 'Cirurgia Geral',
    location: 'Salvador, BA',
    quote:
      'A EndoStart me permitiu criar meu próprio serviço de endoscopia. Hoje faturamento mensal é superior ao que ganhava em 3 meses de plantões.',
    rating: 5,
    image: 'https://via.placeholder.com/100',
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
  ];

  return (
    <section id="depoimentos" className="section-padding bg-gradient-to-b from-neutral-50 to-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Histórias de <span className="gradient-text">Sucesso</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Confira os depoimentos de médicos que transformaram suas carreiras com a EndoStart.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="card-premium p-8 space-y-6 animate-fadeIn"
                style={{
                  animation: `fadeIn 0.5s ease-in ${index * 0.2}s`,
                  animationFillMode: 'both',
                }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg text-neutral-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                    <p className="text-sm text-neutral-600">{testimonial.specialty}</p>
                    <p className="text-xs text-neutral-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === currentIndex ? 'bg-primary-600 w-8' : 'bg-neutral-300 w-2'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* About Dr. Alessandro */}
        <div className="mt-20 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl p-8 lg:p-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold">Quem é o Dr. Alessandro</h3>

              <div className="space-y-4">
                <p className="text-neutral-200 text-lg leading-relaxed">
                  Cirurgião Geral com mais de 12 anos de experiência prática em procedimentos endoscópicos e intervencionistas.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-success-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Ex-Responsável Técnico do Curso SEMA com mais de 100 alunos formados</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-success-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Speaker referência em Balão Gástrico em congressos nacionais</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-success-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Mentor de centenas de médicos em transição de carreira</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-success-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Especialista em empoderamento médico e qualidade de vida profissional</span>
                  </div>
                </div>
              </div>

              <p className="text-neutral-300">
                Sua missão é ensinar não apenas a teoria, mas a prática real: "lavar o aparelho", configurar a torre, resolver intercorrências e, acima de tudo, transformar a vida dos médicos que buscam liberdade profissional.
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-600/50 to-primary-800/50">
                  <svg className="w-32 h-32 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
