import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../../components/ui/card";
import { 
  Factory, Activity, Coffee, Building2, 
  HardHat, Cpu, Hotel, Briefcase 
} from "lucide-react";

const industriesData = [
  {
    icon: Factory,
    title: "Manufacturing",
    scope: "Readymade Garments, MS Fabrication, EV Converter workshops, Metal & Alloy casting lines.",
    desc: "Assisting promoters with structural factory layouts, automated engineering equipment selection, and vendor supply chain networks."
  },
  {
    icon: Activity,
    title: "Agriculture",
    scope: "Aquaponic Smart Farming, Organic Greenhouses, High-Density Floriculture, Dairy Farms.",
    desc: "Facilitating automated agro-infrastructure development, soil-water testing integration, and commercial crop output distribution ties."
  },
  {
    icon: Coffee,
    title: "Food Processing",
    scope: "Cold Storage warehouses, Multi-seed oil mills, Stevia sugar extraction, Fruit & Vegetable powders.",
    desc: "Ensuring setups match ISO 22000 & FSSAI standards, with advanced dehydration machinery and temperature-controlled logistics."
  },
  {
    icon: Building2,
    title: "Furniture",
    scope: "Wooden office systems, Steel wardrobes, Glass shelving units, lightweight Aluminium doors.",
    desc: "Designing high-output layouts utilizing CNC milling, sheet metal cutting, automatic glass tempering, and powder-coating booths."
  },
  {
    icon: HardHat,
    title: "Infrastructure",
    scope: "Cement fly-ash bricks, solid concrete blocks, interlocking pavers, Township road grids.",
    desc: "Structuring projects with high durability standards to supply growing state highways, metros, and corporate smart cities."
  },
  {
    icon: Cpu,
    title: "Technology",
    scope: "Electrical assemblies, LED smart panels, IT vocational institutes, SaaS marketing software.",
    desc: "Providing guidance on setting up ESD-protected workspaces, smart training labs, high-speed servers, and data centers."
  },
  {
    icon: Hotel,
    title: "Hospitality",
    scope: "40 Room Boutique Hotels, Fine-Dining Vegetarian eateries, family restaurants, Film Shooting studios.",
    desc: "Advising on building planning clearances, municipal approvals, acoustic soundproofing design, and luxury interior mockups."
  },
  {
    icon: Briefcase,
    title: "Industrial Projects",
    scope: "Turnkey layouts, custom production assembly lines, warehouse setups, B2B instrument trading.",
    desc: "Full program management advisory from commercial analysis to civil construction, trial runs, and factory commissioning."
  }
];

export default function Industries() {
  return (
    <section id="industries" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            Sector Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A2463] mt-4">
            Consulting Operations & Sectors
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Our experts support projects across eight core industrial domains. We align layouts with the regulatory guidelines of each industry.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriesData.map((ind, idx) => {
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
                        Sector Focus areas
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
