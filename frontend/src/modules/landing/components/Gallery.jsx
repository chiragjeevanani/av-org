import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "../../../components/ui/dialog";
import { Play, ZoomIn, Eye, Image as ImageIcon, Video as VideoIcon } from "lucide-react";

const categories = ["All Assets", "Corporate Branding", "Global Operations", "Logistics & Fleet"];

export default function Gallery() {
  const { gallery: galleryData, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All Assets");
  const [activeItem, setActiveItem] = useState(null); // Item selected for lightbox

  const filteredItems = selectedCategory === "All Assets"
    ? galleryData
    : galleryData.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
            {t('gallery.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0A2463] mt-4">
            {t('gallery.title')}
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            {t('gallery.description')}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 border ${
                selectedCategory === category
                  ? "bg-[#0A2463] text-white border-[#0A2463]"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {t(`gallery.categories.${category}`)}
            </button>
          ))}
        </div>

        {/* Masonry CSS Column layout for premium staggered appearance */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="masonry-item break-inside-avoid relative"
              >
                <div 
                  onClick={() => setActiveItem(item)}
                  className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 cursor-pointer"
                >
                  {/* Thumbnail Image */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlays / Hover elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    
                    <div className="flex items-center space-x-2 text-white/80 text-[10px] uppercase font-bold tracking-wider mb-2">
                      {item.type === "video" ? (
                        <>
                          <VideoIcon className="h-3.5 w-3.5 text-amber-400" />
                          <span>{t('gallery.videoPres')}</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="h-3.5 w-3.5 text-amber-400" />
                          <span>{t('gallery.designAsset')}</span>
                        </>
                      )}
                    </div>

                    <h4 className="text-white font-bold font-heading text-base leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                      <span>{t('gallery.clickToView')}</span>
                      <ZoomIn className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Play button overlay if it is a video asset */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                      <div className="p-3.5 bg-amber-500 text-slate-900 rounded-full shadow-lg">
                        <Play className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Radix Dialog Lightbox Modal */}
        <Dialog open={activeItem !== null} onOpenChange={(open) => { if (!open) setActiveItem(null); }}>
          <DialogContent className="max-w-4xl p-2 bg-slate-900 border-slate-800 rounded-2xl overflow-hidden">
            {activeItem && (
              <div className="flex flex-col">
                {/* Media view */}
                <div className="relative w-full max-h-[75vh] flex justify-center bg-black">
                  {activeItem.type === "video" ? (
                    <video
                      src={activeItem.src}
                      controls
                      autoPlay
                      className="w-full h-auto object-contain max-h-[75vh]"
                    />
                  ) : (
                    <img
                      src={activeItem.src}
                      alt={activeItem.title}
                      className="w-full h-auto object-contain max-h-[75vh] rounded-t-xl"
                    />
                  )}
                </div>
                
                {/* Text specs */}
                <div className="p-6 bg-slate-900 text-white border-t border-slate-800">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">
                    {t(`gallery.categories.${activeItem.category}`)}
                  </span>
                  <DialogTitle className="text-xl font-extrabold text-white font-heading mt-1">
                    {activeItem.title}
                  </DialogTitle>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}
