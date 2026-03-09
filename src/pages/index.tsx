import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CustomCursor from '../components/CustomCursor';
import AuthoritySection from '../components/AuthoritySection';
import RealitySection from '../components/RealitySection';
import TwoPathsSection from '../components/TwoPathsSection';
import OpportunitySection from '../components/OpportunitySection';
import EndoStartSection from '../components/EndoStartSection';
import StructureSection from '../components/StructureSection';
import DifferentialsSection from '../components/DifferentialsSection';
import InstructorsSection from '../components/InstructorsSection';
import TargetAudienceSection from '../components/TargetAudienceSection';
import FAQSection from '../components/FAQSection';
import ScarcitySection from '../components/ScarcitySection';
import CtaFinalSection from '../components/CtaFinalSection';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Home() {
  const handleWhatsAppClick = () => {
    // Esse handler estava na landing velha. Mantive a prop nos componentes que a recebem se for o caso
    const message = 'Olá! Sou médico e gostaria de saber mais sobre a formação em Endoscopia e Colonoscopia da EndoStart.';
    const phoneNumber = '5511943375337';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Head>
        <title>EndoStart - Formação em Endoscopia com Segurança e Técnica</title>
        <meta name="description" content="Formação presencial que ensina médicos a realizarem Endoscopia Digestiva Alta e Colonoscopia com segurança, técnica e acompanhamento próximo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://endostart.com.br" />
      </Head>

      <div className="min-h-screen bg-brand-lightGray text-[#3C3C3C] selection:bg-brand-gold/30 selection:text-[#01284A]">
        <CustomCursor />
        <Header onWhatsAppClick={handleWhatsAppClick} />

        <main className="overflow-hidden">
          {/* Seção 1 */}
          <HeroSection onWhatsAppClick={handleWhatsAppClick} />

          {/* Seção 2 */}
          <AuthoritySection />

          {/* Seção 3 */}
          <RealitySection />

          {/* Seção 4 */}
          <TwoPathsSection />

          {/* Seção 5 */}
          <OpportunitySection />

          {/* Seção 6 */}
          <EndoStartSection />

          {/* Seção 7 */}
          <StructureSection />

          {/* Seção 8 */}
          <DifferentialsSection />

          {/* Seção 9 */}
          <InstructorsSection />

          {/* Seção 10 */}
          <TargetAudienceSection />

          {/* Seção 11 */}
          <FAQSection />

          {/* Seção 12 */}
          <ScarcitySection />

          {/* Seção 13 */}
          <CtaFinalSection />

        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
}
