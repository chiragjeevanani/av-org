import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, CheckCircle2, Navigation } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

const MapSection = () => {
  const { t } = useLanguage();

  const stateData = [
    {
      id: "gujarat",
      name: t('map.states.gujarat.name'),
      growth: "12.8%",
      opportunities: t('map.states.gujarat.opportunities'),
      manufacturingGrowth: t('map.states.gujarat.infra'),
      investmentFriendly: t('map.states.gujarat.clearance')
    },
    {
      id: "maharashtra",
      name: t('map.states.maharashtra.name'),
      growth: "11.2%",
      opportunities: t('map.states.maharashtra.opportunities'),
      manufacturingGrowth: t('map.states.maharashtra.infra'),
      investmentFriendly: t('map.states.maharashtra.clearance')
    },
    {
      id: "madhya_pradesh",
      name: t('map.states.madhya_pradesh.name'),
      growth: "9.5%",
      opportunities: t('map.states.madhya_pradesh.opportunities'),
      manufacturingGrowth: t('map.states.madhya_pradesh.infra'),
      investmentFriendly: t('map.states.madhya_pradesh.clearance')
    },
    {
      id: "rajasthan",
      name: t('map.states.rajasthan.name'),
      growth: "10.4%",
      opportunities: t('map.states.rajasthan.opportunities'),
      manufacturingGrowth: t('map.states.rajasthan.infra'),
      investmentFriendly: t('map.states.rajasthan.clearance')
    }
  ];

  // We find the matching active state dynamically on language switch
  const [activeStateId, setActiveStateId] = useState(stateData[0].id);
  const activeState = stateData.find(s => s.id === activeStateId) || stateData[0];

  return (
    <section id="states" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Content (Left) */}
          <div className="lg:col-span-6 max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#F59E0B] font-bold uppercase tracking-[0.25em] text-[10px] mb-6"
            >
              {t('map.badge')}
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#0A2463] leading-[1.1] mb-8 tracking-tighter"
            >
              {t('map.title')} <br />
              {t('map.titleSub')}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-slate-500 leading-relaxed mb-12 font-medium"
            >
              {t('map.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-12"
            >
              <div className="border-l-4 border-[#0A2463] pl-6">
                <div className="text-4xl font-black font-heading text-[#0A2463] mb-1 tracking-tight">4</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('map.activeStates')}</div>
              </div>
              <div className="border-l-4 border-slate-100 pl-6">
                <div className="text-4xl font-black font-heading text-[#0A2463] mb-1 tracking-tight">28+</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('map.industrialHubs')}</div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Map/Tab UI (Right) */}
          <div className="lg:col-span-6 relative w-full bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-6">
            
            {/* Left buttons tabs */}
            <div className="flex flex-row md:flex-col gap-2 w-full md:w-1/3 shrink-0 overflow-x-auto pb-4 md:pb-0">
              {stateData.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStateId(st.id)}
                  className={`w-full text-left px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300 flex items-center justify-between shrink-0 ${
                    activeState.id === st.id 
                      ? "bg-[#0A2463] text-white border-[#0A2463] shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>{st.name}</span>
                  <Navigation className="h-3.5 w-3.5 rotate-45 opacity-50 hidden md:inline" />
                </button>
              ))}
            </div>

            {/* Right content view */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-200/60 p-6 shadow-md relative overflow-hidden min-h-[300px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeState.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-baseline border-b border-slate-100 pb-3">
                    <h3 className="text-xl font-bold font-heading text-slate-800">
                      {activeState.name}
                    </h3>
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded font-bold uppercase">
                      {t('map.gddpGrowth')}: {activeState.growth}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                        {t('map.opportunities')}
                      </span>
                      <p className="mt-0.5">{activeState.opportunities}</p>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                        {t('map.infraGrowth')}
                      </span>
                      <p className="mt-0.5">{activeState.manufacturingGrowth}</p>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                        {t('map.clearanceSupport')}
                      </span>
                      <p className="mt-0.5">{activeState.investmentFriendly}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>{t('map.capitalAvailable')}</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default MapSection;
