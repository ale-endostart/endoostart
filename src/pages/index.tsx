import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CustomCursor from '../components/CustomCursor';
import { WhyEndoStartSection } from '../components/WhyEndoStartSection';
import { CoursePreviewSection } from '../components/CoursePreviewSection';
import DifferentialsSection from '../components/DifferentialsSection';
import InstructorsSection from '../components/InstructorsSection';
import TargetAudienceSection from '../components/TargetAudienceSection';
import FAQSection from '../components/FAQSection';
import CtaFinalSection from '../components/CtaFinalSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import DoctorRealitySection from '../components/DoctorRealitySection';
import TwoPathsSection from '../components/TwoPathsSection';
import VideoTeasersSection from '../components/VideoTeasersSection';

export default function Home() {
  const handleWhatsAppClick = () => {
    const message = 'Olá! Sou médico e gostaria de saber mais sobre os cursos de formação em Endoscopia da EndoStart.';
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

        <main className="overflow-hidden bg-[#020813]">
          {/* Seção 1: Cinematic Hero */}
          <HeroSection />

          {/* Seção 2: Brand/Origin Story */}
          <WhyEndoStartSection />

          {/* Seção Nova: A realidade médica */}
          <DoctorRealitySection />

          {/* Seção Nova: Dois Caminhos */}
          <TwoPathsSection />

          {/* Seção Nova: Realidade Prática (Vídeos de Conversão) */}
          <VideoTeasersSection />

          {/* Seção 3: Course Previews */}
          <CoursePreviewSection />

          {/* The rest of the legacy layout sections below could also be upgraded later or kept for extra info */}          {/* Seção 8 */}
          <DifferentialsSection />

          {/* Seção 9 */}
          <InstructorsSection />

          {/* Seção 10 */}
          <TargetAudienceSection />

          {/* Seção 11 */}
          <FAQSection />

          {/* Seção 12 */}
          <CtaFinalSection />

          {/* Seção 13 */}
          <ContactSection />
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
}
