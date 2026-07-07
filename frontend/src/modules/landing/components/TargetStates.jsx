import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../components/ui/card";
import { 
  Map, Landmark, ShieldCheck, Factory, 
  MapPin, ArrowUpRight 
} from "lucide-react";

const stateData = [
  {
    name: "Gujarat",
    tagline: "Industrial Powerhouse & Hub",
    gradient: "from-blue-900 to-indigo-950",
    hoverBorder: "hover:border-amber-400",
    opportunities: "High-density chemical, textile, and machinery manufacturing zones.",
    manufacturingGrowth: "Strong infrastructure featuring smart GIDC layouts and rapid cargo lanes.",
    investmentFriendly: "Ranked top in national Ease of Doing Business index with fast clearances.",
    financeSupport: "Direct integration with state industrial finance corporations and subsidies."
  },
  {
    name: "Maharashtra",
    tagline: "Financial & Logistics Capital",
    gradient: "from-slate-900 via-blue-950 to-indigo-950",
    hoverBorder: "hover:border-amber-400",
    opportunities: "Automotive engineering, electronics, pharma, and global port links.",
    manufacturingGrowth: "Expansive MIDC zones with continuous power grids and skilled labor pool.",
    investmentFriendly: "Extensive single-window portals for quick clearances.",
    financeSupport: "Empanelled with leading capital consortiums and bank headquarters."
  },
  {
    name: "Madhya Pradesh",
    tagline: "Central India Production Hub",
    gradient: "from-indigo-950 to-slate-900",
    hoverBorder: "hover:border-amber-400",
    opportunities: "Agro-processing clusters, food parks, and rich mineral fabrication.",
    manufacturingGrowth: "Central logistics node allowing fast transit to all national markets.",
    investmentFriendly: "Favorable land bank acquisition policies with friendly labor laws.",
    financeSupport: "Capital subsidies and special interest subventions for food processing."
  },
  {
    name: "Rajasthan",
    tagline: "Global Export Corridor",
    gradient: "from-blue-950 to-slate-900",
    hoverBorder: "hover:border-amber-400",
    opportunities: "Stone processing, handicrafts, solar parks, and wooden furniture.",
    manufacturingGrowth: "Rapidly expanding RIICO estates along the Delhi-Mumbai Corridor.",
    investmentFriendly: "Special investment incentives (RIPS) for export-oriented manufacturers.",
    financeSupport: "Subsidies targeting traditional crafts, solar setups, and packaging."
  }
];

export default function TargetStates() {
  return (
    <section id="states" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            Regional Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A2463] mt-4">
            Four Priority Industrial States
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            We provide full local advisory, land acquisition support, and bank finance coordination within these high-growth economic zones.
          </p>
        </div>

        {/* States Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stateData.map((state, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Card className={`h-full border border-slate-200 bg-white shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between group ${state.hoverBorder}`}>
                
                {/* State Card Banner Header */}
                <div className={`p-6 bg-gradient-to-br ${state.gradient} text-white relative`}>
                  {/* Blueprint Grid pattern */}
                  <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                      <MapPin className="h-5 w-5 text-amber-400" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/50 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  <h3 className="text-2xl font-black font-heading tracking-tight mt-6 relative z-10">
                    {state.name}
                  </h3>
                  <p className="text-[10px] text-slate-300 tracking-wider font-semibold uppercase mt-1 relative z-10">
                    {state.tagline}
                  </p>
                </div>

                {/* State specs Content */}
                <CardContent className="p-5 space-y-4 flex-1">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2.5">
                      <div className="p-1 bg-blue-50 text-primary rounded mt-0.5 shrink-0">
                        <Map className="h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                          Opportunities
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                          {state.opportunities}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <div className="p-1 bg-blue-50 text-primary rounded mt-0.5 shrink-0">
                        <Factory className="h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                          Manufacturing Growth
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                          {state.manufacturingGrowth}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <div className="p-1 bg-blue-50 text-primary rounded mt-0.5 shrink-0">
                        <ShieldCheck className="h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                          Investment Friendly
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                          {state.investmentFriendly}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5">
                      <div className="p-1 bg-blue-50 text-primary rounded mt-0.5 shrink-0">
                        <Landmark className="h-3 w-3" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                          Finance Support
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                          {state.financeSupport}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>

              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
