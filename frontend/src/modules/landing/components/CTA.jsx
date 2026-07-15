import React from "react";
import { Button } from "../../../components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0A2463] to-blue-900 text-white relative overflow-hidden">
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Glowing light spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
          Partner With Us
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          Ready to Establish Your Industrial Footprint?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
          Get in touch with our investment advisors to discuss land allocation, commercial feasibility reports, and structured bank loans between ₹85 Lakhs and ₹10 Crore+.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            variant="accent"
            size="lg"
            className="w-full sm:w-auto text-slate-900 font-bold uppercase text-xs tracking-wider"
            asChild
          >
            <a href="#contact">Schedule Advisory Meetup</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 uppercase font-bold text-xs tracking-wider group"
            asChild
          >
            <a href="#projects">
              Browse Project Concepts
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
