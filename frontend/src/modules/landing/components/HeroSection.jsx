import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import logoEmblem from '../../../assets/logo.jpeg';
import { useLanguage } from '../../../context/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-white pt-20 [will-change:transform] [transform:translateZ(0)]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        {/* Subtle Navy background spots */}
        <div className="absolute top-[-10%] right-[-2%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-slate-100 blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-blue-50/40 blur-[80px]" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] overflow-hidden"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-10">
        {/* Text Content */}
        <motion.div
          className="w-full lg:flex-1 text-center lg:text-left pt-10 sm:pt-16 lg:pt-0"
        >
          <div className="max-w-[280px] sm:max-w-none mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {t('hero.badge')}
              </span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading text-[#0A2463] leading-[1.15] mb-6 tracking-tighter"
          >
            {t('hero.title')} <br className="hidden sm:inline" />
            <span className="text-[#F59E0B] italic">{t('hero.titleItalic')}</span>{t('hero.titleAnd')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-slate-600 mb-10 max-w-[280px] sm:max-w-xl mx-auto lg:mx-0 font-body leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full max-w-[280px] sm:max-w-none mx-auto lg:mx-0"
          >
            <button
              onClick={(e) => handleScroll(e, '#projects')}
              className="w-full sm:w-auto px-8 py-4 bg-[#0A2463] hover:bg-[#071c4d] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-blue-900/10"
            >
              {t('hero.btnProjects')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={(e) => handleScroll(e, '#contact')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-100 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
            >
              {t('hero.btnContact')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* Visual Content - Corporate Logo Emblem Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
            {/* Glowing Navy aura */}
            <div className="absolute inset-0 bg-slate-100/50 rounded-full blur-[80px]" />
            <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-slate-200 animate-[spin_120s_linear_infinite] pointer-events-none" />

            <div className="relative z-10 p-6 bg-white rounded-3xl border border-slate-100 shadow-2xl">
              <img
                src={logoEmblem}
                alt="AV Group Organization Management Emblem"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width="400"
                height="400"
                className="w-full h-auto object-contain rounded-2xl drop-shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 cursor-pointer"
        onClick={(e) => handleScroll(e, '#about')}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('hero.scroll')}</span>
        <div className="w-[1px] h-8 bg-slate-300" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
