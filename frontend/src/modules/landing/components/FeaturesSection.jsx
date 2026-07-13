import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Cpu, Award, MapPin, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: t('features.items.0.title'),
      description: t('features.items.0.description'),
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: t('features.items.1.title'),
      description: t('features.items.1.description'),
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: t('features.items.2.title'),
      description: t('features.items.2.description'),
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('features.items.3.title'),
      description: t('features.items.3.description'),
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t('features.items.4.title'),
      description: t('features.items.4.description'),
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('features.items.5.title'),
      description: t('features.items.5.description'),
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t('features.items.6.title'),
      description: t('features.items.6.description'),
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: t('features.items.7.title'),
      description: t('features.items.7.description'),
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 lg:py-32 bg-[#F9FAFB] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F59E0B] font-bold uppercase tracking-[0.2em] text-xs mb-4"
          >
            {t('features.badge')}
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#0A2463] leading-[1.15] mb-6 tracking-tight"
          >
            {t('features.title')} <br />
            <span className="text-slate-400">{t('features.titleGradient')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-500 font-body leading-relaxed max-w-2xl"
          >
            {t('features.description')}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-start group"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 text-[#0A2463] group-hover:border-[#F59E0B]/50 group-hover:bg-[#0A2463] group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold font-heading text-slate-800 mb-3 tracking-tight group-hover:text-[#0A2463] transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-body text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
