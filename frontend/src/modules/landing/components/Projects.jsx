import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "../../../data/projects.json";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { 
  Building2, Factory, Snowflake, HelpCircle, HardHat, 
  Settings, ShoppingCart, Activity, Coffee, Cpu, 
  Search, ShieldAlert 
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

export default function Projects() {
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
    <section id="projects" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            Project Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A2463] mt-4">
            Industrial Investment Showcase
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Discover verified industrial setups and project concepts open for development. Click on any category below to filter our high-yielding project opportunities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${
                selectedCategory === category
                  ? "bg-[#0A2463] text-white border-[#0A2463]"
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
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, visibleCount).map((project, idx) => {
              const IconComponent = categoryIcons[project.category] || HelpCircle;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col justify-between border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white group">
                    {/* Top Decorative Banner */}
                    <div className="relative h-28 bg-gradient-to-br from-[#0A2463] to-blue-900 flex items-center justify-center p-4">
                      {/* Grid background effect */}
                      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                      
                      <div className="relative p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white transition-transform duration-300 group-hover:scale-110">
                        <IconComponent className="h-6 w-6 text-amber-400" />
                      </div>
                      
                      <Badge variant="accent" className="absolute top-3 right-3 text-[9px] font-bold tracking-wider uppercase bg-amber-500 text-slate-900 border-none shadow-md">
                        Coming Soon
                      </Badge>
                    </div>

                    {/* Content */}
                    <CardContent className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {project.category}
                        </span>
                        <h4 className="text-base font-bold font-heading text-slate-800 mt-1 mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Project Specs */}
                      <div className="border-t border-slate-100 pt-4 mt-4 grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                            Min Investment
                          </span>
                          <span className="font-bold text-[#0A2463] mt-0.5 block">
                            {project.investment}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                            Plot Size
                          </span>
                          <span className="font-bold text-slate-700 mt-0.5 block">
                            {project.plotSize}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="text-center mt-12">
            <Button
              onClick={showMore}
              variant="outline"
              className="px-8 border-[#0A2463] text-[#0A2463] hover:bg-[#0A2463] hover:text-white uppercase font-bold text-xs tracking-wider"
            >
              Load More Projects ({filteredProjects.length - visibleCount} Left)
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}
