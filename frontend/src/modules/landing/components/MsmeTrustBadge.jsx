import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function MsmeTrustBadge() {
  const { t } = useLanguage();
  const tags = t('msmeBadge.tags');
  const tagList = Array.isArray(tags) ? tags : [];

  return (
    <div className="w-full bg-[#F8FAFC] border-y border-slate-100 py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 md:p-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Block: Icon + Description */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left flex-1">
            <div className="p-3 bg-amber-50 rounded-xl text-[#F59E0B] border border-amber-100 shrink-0">
              <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading font-black text-slate-800 text-sm md:text-base tracking-tight flex flex-wrap items-center justify-center md:justify-start gap-2">
                {t('msmeBadge.title')}
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
                  Udyam Registered
                </span>
              </h4>
              <p className="text-slate-500 text-xs md:text-sm font-body leading-relaxed max-w-3xl">
                {t('msmeBadge.description')}
              </p>
            </div>
          </div>

          {/* Right Block: Trust Chips */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 shrink-0 max-w-md">
            {tagList.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-600 transition-all hover:bg-slate-100 hover:border-slate-350 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
