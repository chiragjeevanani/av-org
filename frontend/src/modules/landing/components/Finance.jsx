import React from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, CheckCircle2, TrendingUp, HelpCircle, 
  Map, FileText, ArrowRight, ShieldCheck 
} from "lucide-react";
import { Button } from "../../../components/ui/button";

const financeFeatures = [
  {
    icon: DollarSign,
    title: "Finance & Bank Support",
    description: "Empanelled with leading commercial banks and NBFC institutions to facilitate secure corporate term loans, working capital limits, and credit facilities."
  },
  {
    icon: ShieldCheck,
    title: "Government Subsidies",
    description: "Full coordination with state industrial directorates to claim eligible MSME capital incentives, interest subsidies, and power tariff concessions."
  },
  {
    icon: FileText,
    title: "Project Report Assistance",
    description: "Preparation of detailed project reports (DPR) and bankable feasibility studies matching standard valuation guidelines of institutional lenders."
  },
  {
    icon: Map,
    title: "Setup & Land Allocation",
    description: "Guidance on identifying pre-demarcated plots inside government GIDC, MIDC, MPIDC, and RIICO estates featuring standard utilities."
  }
];

export default function Finance() {
  return (
    <section id="finance" className="py-24 bg-[#0F172A] relative overflow-hidden">
      
      {/* Background Graphic elements */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#F59E0B]/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner header grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Callouts */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              Capital Assistance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Structured Project Finance & Advisory
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Establishing a new industry requires secure credit backing and state regulatory checks. We align eligible promoters with banks, verify subsidy eligibility, and prepare bank-compliant files to ensure smooth loan approvals.
            </p>

            {/* Infographic Main Callout Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A2463] border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="h-24 w-24 text-white" />
              </div>
              <div className="relative z-10">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  Target Project Size
                </span>
                <h3 className="text-3xl sm:text-4xl font-black font-heading text-white mt-1 mb-2">
                  ₹85 Lakhs - ₹10 Crore+
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                  Investment limit matching state priority sector development standards.
                </p>
                <div className="mt-4 flex items-center text-[10px] text-amber-400 font-bold uppercase tracking-wider space-x-2">
                  <span>Typical Land Size: 5000 sq.ft. (500 sq.m.)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Infographic Details */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {financeFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-[#F59E0B]/35 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 bg-white/5 rounded-xl text-amber-400 w-fit border border-white/10 mb-4">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-white font-heading text-base mb-2">
                      {feat.title}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span>Guidance Included</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* CTA Strip */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white font-heading">
              Wondering if your project qualifies for debt funding?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Submit your project details online for a preliminary financial criteria assessment.
            </p>
          </div>
          <Button
            variant="accent"
            size="sm"
            className="text-slate-900 font-bold uppercase text-[10px] tracking-widest shrink-0"
            asChild
          >
            <a href="#contact">Check Eligibility</a>
          </Button>
        </div>

      </div>
    </section>
  );
}
