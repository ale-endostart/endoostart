import React, { useState } from 'react';

const ROICalculator: React.FC = () => {
  const [examsPerWeek, setExamsPerWeek] = useState(8);
  const pricePerExam = 2000;
  const monthlyEarnings = examsPerWeek * 4 * pricePerExam;
  const onCallSalary = 6000;
  const monthlyROI = monthlyEarnings - onCallSalary;

  return (
    <section id="calculadora" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            A Matemática do <span className="gradient-text">Médico Inteligente</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Descubra quanto você pode faturar mensalmente com a EndoStart, comparado ao regime de plantões tradicionais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Calculator Widget */}
          <div className="card-premium p-8 lg:p-10">
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-neutral-900 mb-4">
                  Quantos exames você faria por semana?
                </label>

                {/* Slider */}
                <div className="space-y-4">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={examsPerWeek}
                    onChange={(e) => setExamsPerWeek(parseInt(e.target.value))}
                    className="w-full h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">1 exame</span>
                    <span className="text-3xl font-bold text-primary-600">{examsPerWeek}</span>
                    <span className="text-neutral-500">20 exames</span>
                  </div>
                </div>
              </div>

              {/* Input Alternative */}
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Ou digite o valor:
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={examsPerWeek}
                  onChange={(e) => setExamsPerWeek(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="px-4 py-3 border border-neutral-300 rounded-lg"
                />
              </div>

              {/* Price Info */}
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <p className="text-sm text-neutral-600">
                  <span className="font-semibold text-primary-600">Preço médio por exame:</span> R$ {pricePerExam.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="space-y-6">
            {/* Monthly Earnings Card */}
            <div className="card-premium p-8 bg-gradient-to-br from-success-50 to-success-100/50 border-success-200">
              <div className="space-y-2">
                <p className="text-neutral-600 font-medium">Faturamento Mensal com EndoStart</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-success-700">
                    R$ {monthlyEarnings.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-neutral-600">/mês</span>
                </div>
              </div>
            </div>

            {/* On-Call Salary Card */}
            <div className="card-premium p-8">
              <div className="space-y-2">
                <p className="text-neutral-600 font-medium">Salário em Plantões (Média)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-neutral-400">
                    R$ {onCallSalary.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-neutral-600">/mês</span>
                </div>
              </div>
            </div>

            {/* ROI Difference Card */}
            <div className="card-premium p-8 bg-gradient-to-br from-primary-50 to-primary-100/50 border-primary-200">
              <div className="space-y-2">
                <p className="text-neutral-600 font-medium">Diferença Mensal</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-primary-700">
                    R$ {(monthlyROI).toLocaleString('pt-BR')}
                  </span>
                  <span className="text-neutral-600">/mês</span>
                </div>
                <p className="text-sm text-primary-600 pt-2">
                  ou <span className="font-semibold">R$ {((monthlyROI) * 12).toLocaleString('pt-BR')}</span> por ano
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-neutral-900 text-white rounded-lg p-6 space-y-3">
              <p className="font-semibold">Benefícios Adicionais:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Noites livres com a família</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Sem turnos de madrugada</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Especialidade que agrega valor</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
