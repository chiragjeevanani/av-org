import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Dilip Patel',
    role: 'Managing Director, Cold Chain Solutions',
    state: 'Gujarat',
    text: "World Export's team guided us from conceptualizing our Cold Storage factory to acquiring land in Gandhinagar. They prepared the Detailed Project Report which helped us secure a ₹2.2 Crore bank term loan smoothly.",
    rating: 5
  },
  {
    id: 2,
    name: 'Sanjay Deshmukh',
    role: 'Promoter, Garment Kraft Industry',
    state: 'Maharashtra',
    text: "The Single Window Clearance guidance provided by World Export was invaluable. They coordinated all permissions including the MPCB NOC and factory license, launching our readymade apparel unit in record time.",
    rating: 5
  },
  {
    id: 3,
    name: 'Amit Rajawat',
    role: 'Founder, SteviaSweet Processing',
    state: 'Madhya Pradesh',
    text: "We deployed ₹1.8 Crores into Stevia Sugar Extraction. The team helped us secure MSME subsidies under the MP state scheme, saving us substantial interest overheads. Highly recommended industrial advisory.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const active = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#F9FAFB] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#F59E0B] font-bold uppercase tracking-widest text-xs block mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#0A2463] tracking-tighter">
            What Our Promoters Say
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-white rounded-[2rem] border border-slate-100 shadow-xl p-8 md:p-16 min-h-[350px] flex flex-col justify-between overflow-hidden">
          
          <div className="absolute top-8 right-8 text-slate-100 pointer-events-none">
            <Quote size={80} className="fill-current" />
          </div>

          <div className="relative h-full flex-1 flex flex-col justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={active.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#F59E0B] fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed italic max-w-3xl">
                  "{active.text}"
                </p>

                {/* Profile Details */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-[#0A2463]/10 text-[#0A2463] font-bold font-heading flex items-center justify-center text-lg">
                    {active.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">{active.name}</h4>
                    <p className="text-xs text-slate-400 font-semibold uppercase mt-0.5">
                      {active.role} • {active.state}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-end gap-3 mt-8 relative z-20">
            <button
              onClick={() => paginate(-1)}
              className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
