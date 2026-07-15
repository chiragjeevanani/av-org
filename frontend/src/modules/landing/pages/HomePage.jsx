import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

// Import all sections
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MsmeTrustBadge from '../components/MsmeTrustBadge';
import StatsSection from '../components/StatsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeaturesSection from '../components/FeaturesSection';
import WindEnergySection from '../components/WindEnergySection';
import EvChargingSection from '../components/EvChargingSection';
import About from '../components/About';
import InvestmentEstimatorSection from '../components/InvestmentEstimatorSection';
import ProjectShowcaseSection from '../components/ProjectShowcaseSection';
import CompletedProjectsSection from '../components/CompletedProjectsSection';
import MapSection from '../components/MapSection';
import Industries from '../components/Industries';
import Gallery from '../components/Gallery';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaSection from '../components/CtaSection';
import FooterSection from '../components/FooterSection';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen font-body text-slate-800 antialiased selection:bg-amber-500/30 selection:text-[#0A2463]">
      <Navbar />
      
      <main>
        <HeroSection />
        <MsmeTrustBadge />
        <StatsSection />
        <About />
        <HowItWorksSection />
        <FeaturesSection />
        <WindEnergySection />
        
        {/* Narrative Transition Divider */}
        <div className="bg-gradient-to-b from-white to-[#F9FAFB] py-12 border-y border-slate-100/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-[#0A2463]/90 italic leading-relaxed font-body">
              "{t('transition')}"
            </p>
          </div>
        </div>

        <EvChargingSection />
        <InvestmentEstimatorSection />
        <ProjectShowcaseSection />
        <CompletedProjectsSection />
        <MapSection />
        <Industries />
        <Gallery />
        <FAQ />
        <TestimonialsSection />
        <Contact />
        <CtaSection />
      </main>

      <FooterSection />
    </div>
  );
};

export default HomePage;
