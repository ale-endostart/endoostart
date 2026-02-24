import React from 'react';

interface HeroSectionProps {
  onWhatsAppClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWhatsAppClick }) => {
  return (
    <section className="relative min-h-screen pt-20 pb-16 overflow-hidden bg-gradient-to-br from-neutral-900 via-primary-900 to-neutral-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Abandone o plantão de <span className="gradient-text">12h</span>
              </h1>
              <p className="text-xl md:text-2xl text-primary-200 font-semibold">
                Fature até R$ 2.000 por procedimento de 30 minutos.
              </p>
            </div>

            <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Domine a Endoscopia e a Colonoscopia com uma metodologia 100% prática, focada em transformar sua carreira médica e garantir a qualidade de vida que a residência prometeu, mas o mercado ainda não entregou.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                onClick={onWhatsAppClick}
                className="btn-whatsapp text-lg px-8 py-4 justify-center"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.558.946-2.846 2.435-3.682 4.142-1.119 2.151-1.187 4.568-.384 6.769 1.012 2.904 3.441 5.363 6.471 6.215 1.71.53 3.542.545 5.315.317l-.001.001c2.252-.311 4.226-1.409 5.66-3.067l.169-.184-.169.184a9.935 9.935 0 002.359-4.579c.44-1.393.597-2.878.472-4.335-.701-8.227-8.038-14.592-16.275-13.891-3.27.285-6.311 1.466-8.743 3.622C2.915 2.883 1.426 4.547.734 6.524c-.31.902-.426 1.867-.333 2.846.198 2.213 1.235 4.291 2.945 5.888 1.319 1.196 3.057 2.034 4.974 2.365 1.917.331 3.9.155 5.657-.529 1.757-.684 3.289-1.767 4.358-3.127.523-.662.997-1.379 1.396-2.133.133-.25.258-.512.374-.78.116-.268.203-.547.258-.83.056-.283.064-.573.024-.86-.04-.287-.143-.568-.305-.828-.162-.26-.387-.486-.655-.665-.268-.179-.576-.304-.897-.368z" />
                </svg>
                Falar com Consultor
              </button>
              <button
                onClick={onWhatsAppClick}
                className="btn-secondary text-lg px-8 py-4 justify-center"
              >
                Saiba Mais
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-neutral-200">100+ médicos já transformaram suas carreiras</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-neutral-200">12 anos de experiência do Dr. Alessandro</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-neutral-200">Metodologia 100% prática com supervisão direta</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Placeholder for Dr. Alessandro Image/Video */}
          <div className="relative animate-slideUp">
            <div className="relative h-96 lg:h-full min-h-96 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for image/video - in production, replace with actual media */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-600/50 to-primary-800/50">
                <div className="text-center space-y-4">
                  <svg className="w-24 h-24 mx-auto text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white/60 font-medium">Dr. Alessandro em Ação</p>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-6 right-6 bg-success-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Imersão Prática
              </div>
            </div>

            {/* Floating Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">R$ 2.000</div>
                <div className="text-sm text-neutral-300">Por procedimento</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">30 min</div>
                <div className="text-sm text-neutral-300">Duração média</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
