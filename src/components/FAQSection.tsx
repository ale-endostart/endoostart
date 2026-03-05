import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Preciso ter experiência prévia com endoscopia?",
      answer: "Não. A formação é estruturada para médicos sem experiência prévia. Começamos desde os fundamentos e evoluímos até procedimentos mais complexos com acompanhamento direto dos professores."
    },
    {
      question: "Qual é a localização da formação?",
      answer: "A formação presencial acontece em Goiânia, GO. É uma estrutura montada especificamente para o treinamento, com equipamentos modernos e ambiente controlado para máxima segurança durante os procedimentos."
    },
    {
      question: "Quanto tempo dura a formação?",
      answer: "A formação tem duração de 4 semanas presenciais, onde você terá contato com os principais pilares da área. Após a formação, há suporte contínuo para dúvidas e orientações."
    },
    {
      question: "Qualquer especialidade médica pode participar?",
      answer: "Sim! A formação é aberta para todos os médicos, independentemente da especialidade. Muitos cirurgiões, clínicos e médicos de urgência estão descobrindo novas oportunidades com a endoscopia."
    },
    {
      question: "Como são as vagas? Quantas pessoas por turma?",
      answer: "As vagas são muito limitadas. Cada turma tem no máximo 8 alunos para garantir acompanhamento próximo e personalizado. Por isso, é importante entrar em contato rapidamente para garantir sua vaga na próxima turma."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 md:py-32 bg-brand-lightGray">
      <div className="container max-w-[900px] px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#01284A] mb-6">
            Perguntas Frequentes
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full"></div>
          <p className="text-lg text-[#3C3C3C]/70 mt-6">
            Dúvidas sobre a formação? Aqui estão as respostas para as perguntas mais comuns.
          </p>
        </motion.div>

        {/* FAQs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-brand-lightGray/50 transition-colors duration-300"
              >
                <h3 className="text-lg md:text-xl font-semibold text-[#01284A] pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-brand-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8 text-[#3C3C3C] border-t border-brand-lightGray/50">
                  <p className="text-base md:text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-[#3C3C3C] mb-6">
            Ainda tem dúvidas?
          </p>
          <a
            href="https://wa.me/5511943375337"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-[#01284A] rounded-lg font-bold uppercase tracking-wider text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437-9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Fale com nossa equipe
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
