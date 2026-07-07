import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "../../../data/projects.json";
import { 
  Building2, Factory, HelpCircle, HardHat, 
  Settings, ShoppingCart, Activity, Coffee, Cpu 
} from "lucide-react";

// Categorized Icon mapping
const categoryIcons = {
  "Manufacturing": Factory,
  "Agriculture": Activity,
  "Food Processing": Coffee,
  "Furniture": Building2,
  "Infrastructure": HardHat,
  "Technology": Cpu,
  "Trading": ShoppingCart,
  "Finance": Settings
};

const categories = [
  "All Sectors",
  "Manufacturing",
  "Agriculture",
  "Food Processing",
  "Furniture",
  "Infrastructure",
  "Technology",
  "Trading",
  "Finance"
];

export default function ProjectShowcaseSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Sectors");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredProjects = selectedCategory === "All Sectors"
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(8); // Reset count on filter change
  };

  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, filteredProjects.length));
  };

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#F9FAFB] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[#F59E0B] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
            Project Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#0A2463] leading-[1.15] mb-6 tracking-tight">
            Verified Industrial <br />
            <span className="text-slate-400">Investment Showcases</span>
          </h2>
          <p className="text-base text-slate-500 font-body leading-relaxed max-w-2xl">
            Browse through 30 pre-researched manufacturing, agricultural, and commercial layout setups. Each comes with state clearances, DPR models, and empanelled bank loan facilities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${
                selectedCategory === category
                  ? "bg-[#0A2463] text-white border-[#0A2463] shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, visibleCount).map((project, idx) => {
              const IconComponent = categoryIcons[project.category] || HelpCircle;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col justify-between p-6 bg-white rounded-3xl border border-slate-150 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#0A2463] to-blue-800" />
                  
                  <div>
                    {/* Header Icon & Badge */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="p-3 bg-slate-50 text-[#0A2463] rounded-xl border border-slate-100 group-hover:bg-[#0A2463] group-hover:text-white transition-all duration-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-md border border-amber-100 text-[9px] font-bold tracking-widest uppercase">
                        Coming Soon
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h4 className="text-base font-bold font-heading text-slate-800 mt-1 mb-3 group-hover:text-[#0A2463] transition-colors leading-tight">
                      {project.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-body line-clamp-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Stats footer block */}
                  <div className="border-t border-slate-100 pt-4 mt-6 grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                        Est. Investment
                      </span>
                      <span className="font-bold text-[#0A2463] mt-0.5 block">
                        {project.investment}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                        Plot Dimension
                      </span>
                      <span className="font-bold text-slate-700 mt-0.5 block">
                        {project.plotSize}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="text-center mt-16">
            <button
              onClick={showMore}
              className="px-8 py-3.5 bg-white hover:bg-slate-50 text-[#0A2463] border-2 border-slate-100 rounded-full font-bold text-xs uppercase tracking-widest transition-all"
            >
              Load More Projects ({filteredProjects.length - visibleCount} Remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
