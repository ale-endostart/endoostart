import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    const message = 'Olá! Sou médico e gostaria de saber mais sobre a Imersão';
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">ES</span>
              </div>
              <span className="font-bold text-lg">EndoStart</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Transformando carreiras médicas através de imersão prática em endoscopia e procedimentos de alta demanda.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20v-7.21h-2.42V9.25h2.42V7.41c0-2.39 1.46-3.69 3.58-3.69 1.02 0 1.89.08 2.14.11v2.48h-1.47c-1.15 0-1.37.55-1.37 1.35v1.77h2.74l-.35 3.54h-2.39V20" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 1.5v5.5m-9 0V4.5m4.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6">Navegação</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li>
                <a href="#calculadora" className="hover:text-white transition-colors">
                  ROI Calculator
                </a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-white transition-colors">
                  Nossos Cursos
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-white transition-colors">
                  Grade Curricular
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-white transition-colors">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>

          {/* Cursos */}
          <div>
            <h4 className="font-semibold mb-6">Cursos</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li>
                <a href="#cursos" className="hover:text-white transition-colors">
                  Endoscopia
                </a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-white transition-colors">
                  Colonoscopia
                </a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-white transition-colors">
                  Balão Gástrico
                </a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-white transition-colors">
                  Terapêutica
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-6">Contato</h4>
            <div className="space-y-3 text-neutral-400 text-sm">
              <p>
                <span className="block text-white font-medium mb-1">WhatsApp</span>
                <a href="https://wa.me/5511999999999" className="hover:text-white transition-colors">
                  +55 11 99999-9999
                </a>
              </p>
              <p>
                <span className="block text-white font-medium mb-1">Email</span>
                <a href="mailto:contato@endostart.com.br" className="hover:text-white transition-colors">
                  contato@endostart.com.br
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Pronto para Começar?</h3>
          <button onClick={handleWhatsApp} className="btn-whatsapp bg-white text-primary-700 hover:bg-primary-50">
            Agendar Consultoria Gratuita
          </button>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-400">
            <p>
              © {currentYear} EndoStart. Todos os direitos reservados. Desenvolvido com premium design.
            </p>
            <div className="flex gap-6 md:justify-end">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Serviço
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-8 right-8 w-14 h-14 bg-success-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
        aria-label="Contact via WhatsApp"
        title="Fale conosco no WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.558.946-2.846 2.435-3.682 4.142-1.119 2.151-1.187 4.568-.384 6.769 1.012 2.904 3.441 5.363 6.471 6.215 1.71.53 3.542.545 5.315.317l-.001.001c2.252-.311 4.226-1.409 5.66-3.067l.169-.184-.169.184a9.935 9.935 0 002.359-4.579c.44-1.393.597-2.878.472-4.335-.701-8.227-8.038-14.592-16.275-13.891-3.27.285-6.311 1.466-8.743 3.622C2.915 2.883 1.426 4.547.734 6.524c-.31.902-.426 1.867-.333 2.846.198 2.213 1.235 4.291 2.945 5.888 1.319 1.196 3.057 2.034 4.974 2.365 1.917.331 3.9.155 5.657-.529 1.757-.684 3.289-1.767 4.358-3.127.523-.662.997-1.379 1.396-2.133.133-.25.258-.512.374-.78.116-.268.203-.547.258-.83.056-.283.064-.573.024-.86-.04-.287-.143-.568-.305-.828-.162-.26-.387-.486-.655-.665-.268-.179-.576-.304-.897-.368z" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
