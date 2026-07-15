import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function Hero() {
  return (
    <div
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center bg-[#0F172A] overflow-hidden pt-20"
    >
      {/* Background Graphic/Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Subtle grid pattern for industrial blueprint feel */}
        <div 
          className="absolute inset-0 opacity-[0.07]" 
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
        {/* Animated ambient glowing spots */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#1E40AF] opacity-20 blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#0A2463] opacity-35 blur-[100px] animate-pulse-slow" />
        
        {/* Deep dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/90 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 flex-1 flex flex-col justify-center">
        {/* Main Logo emblem in Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6"
        >
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
            <img
              src="/WhatsApp Image 2026-07-07 at 11.51.59.jpeg"
              alt="World Export Emblem"
              className="h-20 w-auto rounded-xl object-contain"
            />
          </div>
        </motion.div>

        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm"
        >
          <ShieldCheck className="h-4 w-4 text-[#F59E0B]" />
          <span className="text-xs font-semibold text-slate-200 tracking-wider uppercase">
            Government Certified & Bank Empanelled Consultancy
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white font-heading"
        >
          Building Tomorrow's <br />
          <span className="bg-gradient-to-r from-white via-slate-200 to-[#F59E0B] bg-clip-text text-transparent">
            Industries & Futures
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Guiding entrepreneurs and institutional investors to set up high-growth manufacturing, infrastructure, and agro-processing businesses across{" "}
          <strong className="text-white font-semibold">Gujarat, Maharashtra, Madhya Pradesh & Rajasthan</strong>.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button
            variant="accent"
            size="lg"
            className="w-full sm:w-auto uppercase font-bold text-xs tracking-wider text-slate-900 shadow-xl shadow-amber-500/10 group"
            asChild
          >
            <a href="#projects">
              Explore Projects
              <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 uppercase font-bold text-xs tracking-wider"
            asChild
          >
            <a href="#contact">Contact Advisory</a>
          </Button>
        </motion.div>
      </div>

      {/* Stats Counter Strip */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl"
        >
          <div className="text-center md:border-r border-white/10 last:border-0 pb-4 md:pb-0">
            <h4 className="text-2xl sm:text-3xl font-bold font-heading text-white">40+</h4>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Industrial Projects
            </p>
          </div>
          <div className="text-center md:border-r border-white/10 last:border-0 pb-4 md:pb-0">
            <h4 className="text-2xl sm:text-3xl font-bold font-heading text-[#F59E0B]">
              ₹85L - ₹10Cr+
            </h4>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Investment Scale
            </p>
          </div>
          <div className="text-center md:border-r border-white/10 last:border-0">
            <h4 className="text-2xl sm:text-3xl font-bold font-heading text-white">4 States</h4>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Gujarat, MH, MP, RJ
            </p>
          </div>
          <div className="text-center last:border-0">
            <h4 className="text-2xl sm:text-3xl font-bold font-heading text-[#10B981] flex items-center justify-center gap-1">
              <CheckCircle2 className="h-5 w-5 text-[#10B981]" /> Available
            </h4>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-1">
              Finance & Bank Tie-ups
            </p>
          </div>
        </motion.div>
      </div>

      {/* Smooth scroll down indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center cursor-pointer opacity-75 hover:opacity-100"
      >
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">
          Scroll Down
        </span>
        <ArrowDown className="h-4 w-4 text-slate-400" />
      </motion.div>
    </div>
  );
}
