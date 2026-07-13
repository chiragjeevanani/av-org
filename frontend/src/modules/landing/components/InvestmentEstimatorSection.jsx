import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Wallet, Landmark, TrendingUp, HandCoins, Building } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const SmoothCounter = ({ value, isCrores = false, croresLabel = "Crores", lakhsLabel = "Lakhs" }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const count = useMotionValue(value);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.4,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(latest)
    });
    return controls.stop;
  }, [value, count]);

  if (isCrores) {
    return <span>{(displayValue / 100).toFixed(2)} {croresLabel}</span>;
  }
  return <span>{Math.round(displayValue).toLocaleString()} {lakhsLabel}</span>;
};

const InvestmentEstimatorSection = () => {
  const { t } = useLanguage();
  // slider values in Lakhs (85 Lakhs to 350 Lakhs)
  const [projectCost, setProjectCost] = useState(150); 

  // Calculation parameters:
  // Bank Loan: 75%
  // Government Subsidy: 15%
  // Promoter Margin: 10%
  const bankLoan = Math.round(projectCost * 0.75);
  const govSubsidy = Math.round(projectCost * 0.15);
  const promoterMargin = Math.round(projectCost * 0.10);

  const handleSliderChange = (e) => {
    setProjectCost(parseInt(e.target.value));
  };

  const crores = t('estimator.crores');
  const lakhs = t('estimator.lakhs');

  return (
    <section className="py-24 bg-white overflow-hidden" id="finance">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Side: Controls */}
          <div className="w-full lg:w-1/2">
            <span className="text-[#F59E0B] font-bold uppercase tracking-widest text-xs block mb-3">
              {t('estimator.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-slate-900 tracking-tighter mb-4">
              {t('estimator.title')} <br />
              <span className="text-[#0A2463] italic">{t('estimator.titleItalic')}</span>
            </h2>
            <p className="text-slate-500 mb-10 text-sm leading-relaxed">
              {t('estimator.description')}
            </p>

            <div className="space-y-12 bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
               {/* Cost Display */}
               <div className="relative">
                  <div className="flex justify-between items-end mb-6">
                     <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{t('estimator.scaleLabel')}</span>
                     <span className="text-2xl sm:text-3xl font-black font-heading text-slate-900 tracking-tighter">
                       ₹<SmoothCounter value={projectCost} isCrores={projectCost >= 100} croresLabel={crores} lakhsLabel={lakhs} />
                     </span>
                  </div>
                  
                  {/* Slider Control */}
                  <div className="relative h-1.5 w-full bg-slate-200 rounded-full cursor-pointer flex items-center group/slider">
                    <motion.div className="absolute left-0 h-full bg-[#0A2463] rounded-full" style={{ width: `${((projectCost - 85) / (350 - 85)) * 100}%` }} />
                    <input 
                      type="range"
                      min="85"
                      max="350"
                      step="5"
                      value={projectCost}
                      onChange={handleSliderChange}
                      className="absolute inset-x-0 w-full h-12 opacity-0 cursor-pointer z-20"
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-[6px] border-[#0A2463] rounded-full shadow-lg pointer-events-none z-30 group-hover/slider:scale-110 transition-transform"
                      style={{ left: `calc(${((projectCost - 85) / (350 - 85)) * 100}% - 16px)` }}
                    />
                  </div>
                  <div className="flex justify-between mt-4 text-[9px] font-black uppercase text-slate-400 tracking-widest px-1">
                    <span>₹85 {lakhs}</span>
                    <span>₹3.5 {crores}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Side: Visual HUD Gauge */}
          <div className="lg:w-1/2 w-full flex flex-col items-center overflow-hidden">
             <div className="relative w-full max-w-[280px] sm:max-w-[420px] aspect-square flex items-center justify-center">
                
                {/* Outer decorative circular rings */}
                <div className="absolute inset-0 border border-slate-100 rounded-full" />
                <div className="absolute inset-8 border border-dashed border-slate-200/60 rounded-full" />

                {/* Counter Central Indicator */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                   <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-3">
                      <Wallet className="w-5 h-5 text-amber-400" />
                   </div>
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">{t('estimator.loanLabel')}</p>
                   <div className="text-3xl sm:text-4xl font-black font-heading text-slate-900 tracking-tighter mb-1">
                      ₹<SmoothCounter value={bankLoan} isCrores={bankLoan >= 100} croresLabel={crores} lakhsLabel={lakhs} />
                   </div>
                   <p className="text-[10px] font-bold text-[#0A2463] uppercase tracking-widest">{t('estimator.loanSub')}</p>
                </div>

                {/* Satellite Subsidies card (Top Right) */}
                <motion.div 
                   initial={{ x: 20, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   className="absolute top-2 right-2 bg-white border border-slate-100 shadow-xl p-4 rounded-2xl flex items-center gap-3 backdrop-blur-sm z-20"
                >
                   <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                      <Landmark className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">{t('estimator.subsidyLabel')}</p>
                      <p className="text-xs font-black text-slate-800">₹<SmoothCounter value={govSubsidy} isCrores={govSubsidy >= 100} croresLabel={crores} lakhsLabel={lakhs} /></p>
                   </div>
                </motion.div>
 
                {/* Satellite Margin card (Bottom Left) */}
                <motion.div 
                   initial={{ x: -20, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.1 }}
                   className="absolute bottom-2 left-2 bg-white border border-slate-100 shadow-xl p-4 rounded-2xl flex items-center gap-3 backdrop-blur-sm z-20"
                >
                   <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#0A2463]">
                      <HandCoins className="w-4 h-4" />
                   </div>
                   <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">{t('estimator.promoterLabel')}</p>
                      <p className="text-xs font-black text-slate-800">₹<SmoothCounter value={promoterMargin} isCrores={promoterMargin >= 100} croresLabel={crores} lakhsLabel={lakhs} /></p>
                   </div>
                </motion.div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InvestmentEstimatorSection;
