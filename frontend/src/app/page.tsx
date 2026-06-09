import Link from 'next/link'
import Header from '@/components/landing/Header'
import Reveal from '@/components/landing/Reveal'
import Counter from '@/components/landing/Counter'

// ============================================================
// CONSTANTS (server-side — zero JS sent to client)
// ============================================================

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5562994338845'
const WA_URL = `https://wa.me/${WA_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent('Olá, vim através do site e gostaria de mais informações sobre o curso ENDOSTART')}`
const LP_CTA_URL = 'https://inlead.digital/endostart01basico'

const WA_SVG =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

const CURRICULUM = [
  {
    title: 'Endoscopia Diagnostica',
    desc: 'Do manuseio do aparelho ao exame completo, com interpretacao de achados em tempo real.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  },
  {
    title: 'Sedacao e Anestesia',
    desc: 'Tecnicas seguras de sedacao para realizar procedimentos com autonomia total.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    title: 'Anatomia Digestiva',
    desc: 'Esofago, estomago, duodeno — anatomia aplicada a pratica endoscopica.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    title: 'Equipamentos',
    desc: 'Configuracao, manutencao, limpeza e operacao completa do aparelho endoscopico.',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Protocolos Clinicos',
    desc: 'DRGE, tumores, hernias, ulceras — conduta baseada em evidencias.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    title: 'Procedimentos Terapeuticos',
    desc: 'Polipectomia, gastrostomia, ligadura elastica — valor agregado ao seu curriculo.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
]

const TIMELINE = [
  { week: '01', title: 'Fundamentos', desc: 'Anatomia, manuseio do aparelho, configuracao do equipamento, processamento e primeiras praticas em simulador.' },
  { week: '02', title: 'Pratica Supervisionada', desc: 'Exames em pacientes reais com supervisao direta. Sedacao, diagnostico e interpretacao de achados.' },
  { week: '03', title: 'Procedimentos Avancados', desc: 'Endoscopia terapeutica, biopsias, polipectomia, hemostasia. Autonomia crescente com mentoria.' },
  { week: '04', title: 'Autonomia e Avaliacao', desc: 'Pratica autonoma supervisionada, avaliacao teorica e pratica. Certificacao de 200+ horas.' },
]

const TESTIMONIALS = [
  { name: 'Dr. Rafael Moreira', location: 'Maraba, PA', quote: 'Sai do plantao de UPA e hoje tenho meu proprio servico de endoscopia. Em 3 meses ja tinha recuperado o investimento do curso.', initial: 'R' },
  { name: 'Dra. Camila Torres', location: 'Cuiaba, MT', quote: 'A imersao e intensa mas extremamente bem conduzida. Dr. Alessandro tem uma didatica excepcional e te da seguranca para operar.', initial: 'C' },
  { name: 'Dr. Henrique Bastos', location: 'Natal, RN', quote: 'Hoje faco 8 endoscopias por dia no interior. Ganhei qualidade de vida e triplicou minha renda mensal.', initial: 'H' },
]

const OTHER_COURSES = [
  { name: 'Colonoscopia', desc: 'Diagnostico e terapeutica do intestino grosso', status: 'Em breve' },
  { name: 'Balao Gastrico', desc: 'Protocolo completo de emagrecimento endoscopico', status: 'Em breve' },
  { name: 'Terapeutica Digestiva', desc: 'Procedimentos avancados de alta complexidade', status: 'Em breve' },
]

// ============================================================
// PAGE — Server Component (HTML renderizado no servidor)
// ============================================================

export default function Home() {
  return (
    <>
      <Header waUrl={LP_CTA_URL} />

      {/* HERO */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Gradient orbs - CSS only, no JS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[800px] h-[800px] rounded-full animate-gradient-orbit"
            style={{
              top: '-20%',
              right: '-10%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full animate-gradient-orbit"
            style={{
              bottom: '-15%',
              left: '-5%',
              background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
              animationDelay: '-8s',
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="relative z-10 container text-center pt-32 pb-24">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 header-glass rounded-full px-5 py-2.5 mb-10">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[13px] text-white/70 font-medium tracking-wide">
                Goiania, GO &middot; Turmas Abertas 2025
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-[0.2em] mb-6">
              Imersao Presencial
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-white mb-8 max-w-5xl mx-auto">ENDOSCOPIA</h1>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light mb-12">
              Do plantao de 12 horas ao procedimento de 30 minutos.
              <br className="hidden sm:block" />
              Transforme sua carreira. Transforme sua renda. Transforme sua vida.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href={LP_CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={WA_SVG} />
                </svg>
                Garantir Minha Vaga
              </a>
              <a href="#curso" className="btn-outline text-base">
                Conhecer o Curso
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.65}>
            <div className="flex flex-wrap justify-center gap-8 text-[13px] text-white/30 uppercase tracking-[0.15em] font-medium">
              <span>4 Semanas</span>
              <span className="text-emerald-500/50">&middot;</span>
              <span>100% Presencial</span>
              <span className="text-emerald-500/50">&middot;</span>
              <span>Hands-on</span>
              <span className="text-emerald-500/50">&middot;</span>
              <span>Turmas Reduzidas</span>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-emerald-500 py-3 overflow-hidden">
        <div className="animate-ticker whitespace-nowrap">
          {[0, 1].map((i) => (
            <span key={i} className="inline-block">
              {[
                '+500 Medicos Formados',
                '12 Anos de Experiencia',
                'Speaker Balao Gastrico',
                'Ex-RT SEMA',
                'Turmas Reduzidas',
                'Goiania, GO',
                'Certificado 200+ Horas',
                '94% Taxa de Sucesso',
              ].map((item, j) => (
                <span key={j} className="inline-flex items-center gap-3 mx-6 text-sm font-bold text-white">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* THE TRANSFORMATION */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-emerald-600 text-sm font-bold uppercase tracking-[0.2em] mb-8">A Oportunidade</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-gray-900 mb-8">
                Voce ainda troca{' '}
                <span className="text-gray-300">12 horas da sua vida</span>{' '}
                por R$&nbsp;1.200?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-3xl font-light">
                Um turno de 7 a 10 endoscopias leva 2-3 horas e gera o mesmo valor que um plantao de 12 horas
                na UPA. Com a demanda reprimida no interior do Brasil, medicos que dominam endoscopia
                se tornam <strong className="text-gray-700">a referencia da regiao</strong>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="py-20 md:py-28 bg-black overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-white/10 max-w-4xl mx-auto">
            {[
              { prefix: 'R$ ', target: 2000, suffix: '+', label: 'por procedimento', sublabel: 'Valor medio no interior' },
              { prefix: '', target: 3, suffix: 'h', label: 'de trabalho', sublabel: 'Para faturar o mesmo que 12h de plantao' },
              { prefix: '', target: 94, suffix: '%', label: 'taxa de sucesso', sublabel: 'Dos nossos alunos atuam na area' },
            ].map((n, i) => (
              <Reveal key={i} delay={i * 0.15} className="text-center px-8">
                <p className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-3" style={{ letterSpacing: '-0.04em' }}>
                  <Counter target={n.target} prefix={n.prefix} suffix={n.suffix} />
                </p>
                <p className="text-white/40 text-sm uppercase tracking-[0.15em] font-semibold mb-1">{n.label}</p>
                <p className="text-white/20 text-xs">{n.sublabel}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curso" className="section-padding bg-white overflow-hidden">
        <div className="container">
          <div className="text-center mb-20">
            <Reveal>
              <p className="text-emerald-600 text-sm font-bold uppercase tracking-[0.2em] mb-4">O Curso</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-gray-900 mb-6">
                O que voce vai<br />dominar.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Do manuseio do aparelho ao procedimento completo. Uma formacao pratica e intensiva.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CURRICULUM.map((item, i) => (
              <Reveal key={i} delay={i * 0.08} direction="scale">
                <div className="card p-8 h-full group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-500">
                    <svg
                      className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="section-padding bg-gray-50 overflow-hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-20">
              <Reveal>
                <p className="text-emerald-600 text-sm font-bold uppercase tracking-[0.2em] mb-4">Metodologia</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-gray-900 mb-6">
                  4 semanas que<br />mudam tudo.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                  Flexivel: 1 semana por mes durante 4 meses ou 4 semanas corridas. Voce escolhe.
                </p>
              </Reveal>
            </div>

            <div className="space-y-0">
              {TIMELINE.map((step, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div className="flex gap-6 md:gap-10 pb-12 last:pb-0 group">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-2xl bg-white border-2 border-gray-200 group-hover:border-emerald-500 group-hover:bg-emerald-500 flex items-center justify-center transition-all duration-500 shadow-sm">
                        <span className="text-sm font-black text-gray-400 group-hover:text-white transition-colors duration-500">
                          {step.week}
                        </span>
                      </div>
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 mt-3" />
                      )}
                    </div>
                    <div className="pt-2 pb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DR. ALESSANDRO */}
      <section id="professor" className="section-padding bg-black overflow-hidden">
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center max-w-5xl mx-auto">
            <Reveal direction="left">
              <div className="relative">
                <div
                  className="w-full aspect-[3/4] rounded-3xl overflow-hidden flex flex-col items-center justify-center"
                  style={{ background: 'linear-gradient(160deg, #1a1a1a, #111)' }}
                >
                  <svg className="w-32 h-32 text-white/[0.06]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-white/10 text-sm mt-4">Dr. Alessandro</p>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white rounded-2xl px-5 py-4 text-center shadow-xl animate-float-delay">
                  <p className="text-3xl font-black leading-none">12+</p>
                  <p className="text-[11px] text-emerald-100 mt-1 uppercase tracking-wider font-semibold">Anos</p>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="text-emerald-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">Seu Professor</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-white mb-8">Dr. Alessandro</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-4 text-white/50 leading-relaxed mb-10">
                  <p>
                    Cirurgiao geral formado ha 12 anos com residencia concluida. Atuou como{' '}
                    <strong className="text-white/80">responsavel tecnico do curso SEMA</strong>,
                    por onde passaram mais de 80 alunos.
                  </p>
                  <p>
                    <strong className="text-white/80">Speaker da marca de balao gastrico</strong>{' '}
                    na regiao Centro-Oeste, desenvolveu protocolo proprio de emagrecimento com resultados comprovados.
                  </p>
                  <p>
                    Sua missao: dar a medicos do interior do Brasil a expertise para abrir servicos de
                    endoscopia e <strong className="text-white/80">transformar suas carreiras</strong>.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="grid grid-cols-3 gap-3 mb-10">
                  {[
                    { val: '500+', label: 'Alunos' },
                    { val: 'Speaker', label: 'Balao Gastrico' },
                    { val: 'Ex-RT', label: 'SEMA' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-4 text-center">
                      <p className="text-lg font-black text-emerald-400">{s.val}</p>
                      <p className="text-[11px] text-white/30 mt-1 uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <a
                  href={LP_CTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={WA_SVG} />
                  </svg>
                  Falar com Dr. Alessandro
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section id="investimento" className="section-padding bg-white overflow-hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="text-emerald-600 text-sm font-bold uppercase tracking-[0.2em] mb-4">Investimento</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-gray-900 mb-6">
                Invista na sua<br />transformacao.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-16">
                O retorno vem rapido. Faca as contas.
              </p>
            </Reveal>

            <Reveal delay={0.3} direction="scale">
              <div className="relative max-w-lg mx-auto">
                <div className="card p-10 md:p-14 text-center border-2 border-gray-100 relative overflow-hidden">
                  <div
                    className="absolute top-0 inset-x-0 h-1"
                    style={{ background: 'linear-gradient(90deg, #10b981, #34d399, #10b981)' }}
                  />
                  <p className="text-sm text-gray-400 uppercase tracking-[0.15em] font-bold mb-2">
                    Imersao em Endoscopia
                  </p>
                  <p className="text-sm text-gray-300 mb-8">4 semanas &middot; Goiania, GO</p>

                  <div className="mb-8">
                    <span className="text-sm text-gray-400 mr-2">R$</span>
                    <span className="text-6xl sm:text-7xl font-black text-gray-900" style={{ letterSpacing: '-0.04em' }}>
                      45.000
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-gray-500 mb-10 text-left max-w-xs mx-auto">
                    {[
                      'Simuladores de ultima geracao',
                      'Pratica com pacientes reais',
                      'Treinamento em sedacao',
                      'Material didatico completo',
                      'Acesso a plataforma de conteudo',
                      'Certificado de 200+ horas',
                      'Suporte pos-curso',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>

                  <a
                    href={LP_CTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center text-base"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={WA_SVG} />
                    </svg>
                    Quero Garantir Minha Vaga
                  </a>

                  <p className="text-xs text-gray-300 mt-4">Condicoes especiais de pagamento via WhatsApp</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-16 bg-black/[0.03] border border-black/[0.05] rounded-3xl p-8 md:p-12 max-w-lg mx-auto text-left">
                <p className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Retorno do Investimento</p>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span>Valor da endoscopia no interior</span>
                    <span className="font-bold text-gray-900">R$ 1.200</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span>Exames por dia (media)</span>
                    <span className="font-bold text-gray-900">7-10</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span>Faturamento diario</span>
                    <span className="font-bold text-emerald-600">R$ 8.400 - 12.000</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-gray-900">Retorno do investimento</span>
                    <span className="font-black text-emerald-600 text-lg">~5 dias</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="depoimentos" className="section-padding bg-black overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <p className="text-emerald-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">Depoimentos</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-white mb-4">
                Quem fez,<br />recomenda.
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="card-dark rounded-3xl p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-white/60 text-[15px] leading-relaxed flex-1 mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-6 border-t border-white/[0.06]">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-emerald-400 font-black text-sm">{t.initial}</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{t.name}</p>
                      <p className="text-white/30 text-xs">{t.location}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER COURSES */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="container">
          <div className="text-center mb-14">
            <Reveal>
              <p className="text-emerald-600 text-sm font-bold uppercase tracking-[0.2em] mb-4">Tambem oferecemos</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-gray-900 text-3xl md:text-4xl">Outras Imersoes</h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {OTHER_COURSES.map((c, i) => (
              <Reveal key={i} delay={i * 0.1} direction="scale">
                <div className="card p-7 text-center h-full">
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">{c.status}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{c.name}</h3>
                  <p className="text-gray-400 text-sm">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 md:py-44 bg-black overflow-hidden">
        <div className="container relative z-10 text-center">
          <Reveal>
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-[0.2em] mb-8">
              Sua carreira, reinventada
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="text-white max-w-4xl mx-auto mb-8">
              A proxima turma comeca em breve.
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-xl text-white/40 max-w-xl mx-auto mb-12 font-light">
              Vagas limitadas. Turmas reduzidas para atencao individualizada.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <a
              href={LP_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-12 py-5"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={WA_SVG} />
              </svg>
              Garantir Minha Vaga
            </a>
          </Reveal>
          <Reveal delay={0.55}>
            <p className="text-white/20 text-sm mt-8">
              Resposta em ate 2 horas &middot; Sem compromisso
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/[0.06] py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-xl font-black text-white mb-1">
                endo<span className="text-emerald-400">start</span>
              </p>
              <p className="text-[13px] text-white/20">
                Imersao em Endoscopia &middot; Goiania, GO
              </p>
            </div>

            <div className="flex gap-6 text-[13px] text-white/30">
              <a href="#curso" className="hover:text-white/60 transition-colors">Curso</a>
              <a href="#professor" className="hover:text-white/60 transition-colors">Professor</a>
              <a href="#investimento" className="hover:text-white/60 transition-colors">Investimento</a>
              <Link href="/auth/signin" className="hover:text-white/60 transition-colors">Area de Membros</Link>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/endostartimersao/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/70 transition-colors"
                aria-label="Instagram EndoStart"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <p className="text-[12px] text-white/15">
                &copy; 2025 EndoStart
              </p>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}
