import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from '../../../hooks/useCountUp';
import { useLanguage } from '../../../context/LanguageContext';

const StatsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const setupCount = useCountUp(120, 2000, inView);
  const promoterCount = useCountUp(80, 2000, inView);
  const capitalCount = useCountUp(250, 2000, inView);

  const stats = [
    { id: 1, name: t('stats.layouts'), value: setupCount, suffix: '+' },
    { id: 2, name: t('stats.promoters'), value: promoterCount, suffix: '+' },
    { id: 3, name: t('stats.capital'), value: `₹${capitalCount}`, suffix: t('estimator.crores') === 'Crores' ? 'Cr+' : ` ${t('estimator.crores')}+` },
  ];

  return (
    <section ref={ref} className="bg-[#0F172A] py-20 lg:py-28 text-white relative overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:divide-x md:divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="px-4"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                <span>{stat.value}</span>
                <span className="text-[#F59E0B] ml-1">{stat.suffix}</span>
              </div>
              <div className="text-sm lg:text-base font-semibold uppercase tracking-widest text-slate-400">
                {stat.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
