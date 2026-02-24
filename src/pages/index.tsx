import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ROICalculator from '../components/ROICalculator';
import CoursesShowcase from '../components/CoursesShowcase';
import CurriculumSection from '../components/CurriculumSection';
import Testimonials from '../components/Testimonials';
import BenefitsSection from '../components/BenefitsSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  const handleWhatsAppClick = () => {
    const message = 'Olá! Sou médico e gostaria de saber mais sobre a Imersão em EndoStart';
    const phoneNumber = '5511999999999'; // Replace with actual phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Head>
        <title>EndoStart - Abandone o plantão de 12h. Fature até R$ 2.000 por procedimento.</title>
        <meta name="description" content="Imersão em endoscopia com Dr. Alessandro. Aprenda 100% prático e transforme sua carreira médica." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://endostart.com.br" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header onWhatsAppClick={handleWhatsAppClick} />

        {/* Hero Section */}
        <HeroSection onWhatsAppClick={handleWhatsAppClick} />

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Courses Showcase */}
        <CoursesShowcase />

        {/* Curriculum Section */}
        <CurriculumSection />

        {/* Testimonials */}
        <Testimonials />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* FAQ */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
