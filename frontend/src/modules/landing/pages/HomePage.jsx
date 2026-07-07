import React from 'react';

// Import all sections
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeaturesSection from '../components/FeaturesSection';
import About from '../components/About';
import InvestmentEstimatorSection from '../components/InvestmentEstimatorSection';
import ProjectShowcaseSection from '../components/ProjectShowcaseSection';
import MapSection from '../components/MapSection';
import Industries from '../components/Industries';
import Gallery from '../components/Gallery';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaSection from '../components/CtaSection';
import FooterSection from '../components/FooterSection';

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen font-body text-slate-800 antialiased selection:bg-amber-500/30 selection:text-[#0A2463]">
      <Navbar />
      
      <main>
        <HeroSection />
        <StatsSection />
        <About />
        <HowItWorksSection />
        <FeaturesSection />
        <InvestmentEstimatorSection />
        <ProjectShowcaseSection />
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
