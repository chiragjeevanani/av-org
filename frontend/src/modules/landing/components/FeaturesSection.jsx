import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Cpu, Award, MapPin, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Experienced Team',
    description: 'Senior industrial engineers, chartered appraisers, and bank policy specialists guiding your setup.',
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: 'Investment Guidance',
    description: 'Direct allocations corresponding to priority MSME subsidies and cash flow yields.',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'Industrial Expertise',
    description: 'In-depth processing knowledge spanning 8 major domains and 30 manufacturing concepts.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Business Planning',
    description: 'Detailed project reports (DPR), cost breakups, and market feasibility valuations.',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Finance Assistance',
    description: 'Facilitating secure debt term limits, working capital approvals, and bank coordination.',
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Location Selection',
    description: 'Zoning clearances and pre-demarcated plots inside premium state industrial parks.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Government Clearances',
    description: 'NOCs from Pollution Boards, electricity boards, factory departments, and tax registers.',
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: 'End-to-End Commissioning',
    description: 'Turnkey advisory from layout drawing approval to machinery trials and commercial runs.',
  },
];

const FeaturesSection = () => {
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
            Why Choose Us
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#0A2463] leading-[1.15] mb-6 tracking-tight"
          >
            Industrial engineering built for <br />
            <span className="text-slate-400">performance & stability</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-500 font-body leading-relaxed max-w-2xl"
          >
            We manage structural project plans, capital subsidies, and operational requirements so you can deploy capital with confidence.
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
