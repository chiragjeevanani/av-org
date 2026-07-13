import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const CtaSection = () => {
  const { t } = useLanguage();

  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background with abstract graphic */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-tr from-amber-500/10 via-blue-500/5 to-[#0A2463]/10 rounded-[100%] blur-[100px] opacity-70" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-[#0A2463] rounded-[3rem] p-10 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Inner card graphical elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
             <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mx-auto w-16 h-16 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md mb-8 text-amber-400"
             >
               <Sparkles className="w-8 h-8" />
             </motion.div>

             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight mb-6 tracking-tight">
               {t('cta.title')} <br className="hidden md:block"/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-amber-300">{t('cta.titleGradient')}</span>
             </h2>

             <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-body">
               {t('cta.description')}
             </p>

             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <a 
                   href="#contact"
                   onClick={(e) => handleScroll(e, '#contact')}
                   className="w-full sm:w-auto px-8 py-4 bg-[#F59E0B] hover:bg-amber-600 text-slate-900 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
                 >
                   {t('cta.btnSchedule')}
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </a>
                 <a 
                   href="#projects"
                   onClick={(e) => handleScroll(e, '#projects')}
                   className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 transform hover:scale-105 hover:bg-white/20 flex items-center justify-center gap-2"
                 >
                   {t('cta.btnView')}
                 </a>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
