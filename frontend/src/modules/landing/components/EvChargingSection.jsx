import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BarChart3, Car, Activity, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { Card, CardContent } from '../../../components/ui/card';
import evChargingImg from "../../../assets/ev chagng.jpeg";

export default function EvChargingSection() {
  const { t } = useLanguage();

  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featureCards = [
    {
      title: t('ev.cards.solutionsTitle'),
      desc: t('ev.cards.solutionsDesc'),
    },
    {
      title: t('ev.cards.monitoringTitle'),
      desc: t('ev.cards.monitoringDesc'),
    },
    {
      title: t('ev.cards.powerTitle'),
      desc: t('ev.cards.powerDesc'),
    },
    {
      title: t('ev.cards.deploymentTitle'),
      desc: t('ev.cards.deploymentDesc'),
    },
  ];

  return (
    <section id="ev-charging" className="py-24 lg:py-32 bg-[#F9FAFB] relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-[-10%] w-[350px] h-[350px] rounded-full bg-blue-50/60 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[350px] h-[350px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual & Cards Block (Left Column) - Alternated Layout */}
          <div className="lg:col-span-6 flex flex-col gap-8 order-2 lg:order-1">
            
            {/* Visual charger panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-150 shadow-lg bg-slate-50 group flex items-center justify-center"
            >
              <img
                src={evChargingImg}
                alt="EV Charging Station Render"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
            </motion.div>

            {/* Feature Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="h-full"
                >
                  <Card className="h-full border border-slate-100 hover:border-amber-300 bg-white hover:bg-slate-50/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-5 flex flex-col justify-between group">
                    <CardContent className="p-0 space-y-2">
                      <h4 className="font-bold text-slate-800 font-heading text-sm sm:text-base group-hover:text-[#0A2463] transition-colors leading-snug">
                        {card.title}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed font-body">
                        {card.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Content Block (Right Column) - Alternated Layout */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#F59E0B] font-bold uppercase tracking-[0.2em] text-xs mb-4"
            >
              {t('ev.badge')}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#0A2463] leading-[1.15] mb-4 tracking-tight"
            >
              {t('ev.title')}
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-[#0A2463]/85 font-semibold font-body mb-6 leading-relaxed"
            >
              {t('ev.subheading')}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-500 font-body leading-relaxed mb-8 max-w-xl"
            >
              {t('ev.description')}
            </motion.p>

            {/* Premium Stats Row with Lucide Icons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-2 gap-y-4 gap-x-6 border-y border-slate-100 py-6 mb-8"
            >
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 bg-blue-50 rounded-lg text-[#0A2463]">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold font-heading">{t('ev.stats.chargers')}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 bg-blue-50 rounded-lg text-[#0A2463]">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold font-heading">{t('ev.stats.monitoring')}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 bg-blue-50 rounded-lg text-[#0A2463]">
                  <Car className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold font-heading">{t('ev.stats.fast')}</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 bg-blue-50 rounded-lg text-[#0A2463]">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold font-heading">{t('ev.stats.integration')}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={(e) => handleScroll(e, '#contact')}
                className="w-full sm:w-auto px-8 py-4 bg-[#0A2463] hover:bg-[#071c4d] text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-blue-900/10 hover:shadow-lg"
              >
                {t('ev.btnCta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
