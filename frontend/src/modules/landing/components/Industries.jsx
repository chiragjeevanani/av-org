import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../components/ui/card";
import { useLanguage } from "../../../context/LanguageContext";
import { 
  Factory, Activity, Coffee, Building2, 
  HardHat, Cpu, Hotel, Briefcase 
} from "lucide-react";

const industriesData = [
  { icon: Factory },
  { icon: Activity },
  { icon: Coffee },
  { icon: Building2 },
  { icon: HardHat },
  { icon: Cpu },
  { icon: Hotel },
  { icon: Briefcase }
];

export default function Industries() {
  const { t } = useLanguage();

  const mappedIndustries = industriesData.map((ind, idx) => ({
    icon: ind.icon,
    title: t(`industries.items.${idx}.title`),
    desc: t(`industries.items.${idx}.desc`),
    scope: t(`industries.items.${idx}.scope`)
  }));

  return (
    <section id="industries" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            {t('industries.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A2463] mt-4">
            {t('industries.title')}
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            {t('industries.description')}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mappedIndustries.map((ind, idx) => {
            const IconComp = ind.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Card className="h-full border border-slate-100 bg-white hover:bg-slate-50/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-5 rounded-2xl group">
                  <CardContent className="p-0 space-y-4">
                    <div className="p-3 bg-blue-50/60 text-primary w-fit rounded-xl border border-blue-100 group-hover:bg-[#0A2463] group-hover:text-white transition-all duration-300">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 font-heading text-base group-hover:text-[#0A2463]">
                        {ind.title}
                      </h4>
                      <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                        {ind.desc}
                      </p>
                    </div>
                    <div className="border-t border-slate-100 pt-3">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        {t('industries.focusBadge')}
                      </span>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed mt-1">
                        {ind.scope}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
