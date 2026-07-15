import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function CompletedProjectsSection() {
  const { t } = useLanguage();

  // Resolve completed projects list dynamically from translations
  const completedProjects = Array.from({ length: 6 }).map((_, idx) => {
    const tags = t(`completedProjects.items.${idx}.tags`);
    return {
      id: `completed-proj-${idx + 1}`,
      title: t(`completedProjects.items.${idx}.title`),
      location: t(`completedProjects.items.${idx}.location`),
      year: t(`completedProjects.items.${idx}.year`),
      category: t(`completedProjects.items.${idx}.category`),
      status: t(`completedProjects.items.${idx}.status`),
      description: t(`completedProjects.items.${idx}.description`),
      tags: Array.isArray(tags) ? tags : []
    };
  });

  return (
    <section id="completed-projects" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#0A2463_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Section Heading */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-[#F59E0B] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
            {t('completedProjects.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#0A2463] leading-[1.15] mb-6 tracking-tight">
            {t('completedProjects.title')}
          </h2>
          <p className="text-base text-slate-500 font-body leading-relaxed max-w-2xl">
            {t('completedProjects.description')}
          </p>
        </div>

        {/* Project Cards Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {completedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group bg-white rounded-3xl border border-slate-150 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden"
            >
              <div className="space-y-5">

                {/* Header: Category & Status Badge */}
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[9px] font-bold uppercase tracking-wider shrink-0">
                    <CheckCircle2 size={10} className="shrink-0" />
                    {project.status}
                  </span>
                </div>

                {/* Project Title */}
                <div>
                  <h4 className="text-lg font-bold font-heading text-slate-800 group-hover:text-[#0A2463] transition-colors leading-tight">
                    {project.title}
                  </h4>
                </div>

                {/* Metadata Row: Location & Year */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] text-slate-400 font-semibold border-y border-slate-100 py-3">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#F59E0B]" />
                    {project.location}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 hidden sm:inline-block" />
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#F59E0B]" />
                    {project.year}
                  </span>
                </div>

                {/* Summary / Description */}
                <p className="text-xs text-slate-500 leading-relaxed font-body">
                  {project.description}
                </p>



              </div>

              {/* Feature Tags (at the bottom) */}
              <div className="flex flex-wrap gap-1.5 pt-6">
                {project.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[9px] font-semibold bg-slate-50 border border-slate-200 text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
