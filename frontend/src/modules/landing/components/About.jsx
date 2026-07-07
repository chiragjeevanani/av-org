import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Compass, Award, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Heading & Intro */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#F59E0B] font-bold uppercase tracking-[0.2em] text-xs block mb-2">
              Corporate Profile
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-[#0A2463] leading-tight">
              World Export Business Housing Centre
            </h2>
            <p className="text-slate-500 text-sm italic font-medium leading-none">
              "Connecting Businesses, Building Futures"
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              We are a premier industrial project development, setup advisory, and business consultancy firm. We bridge the gap between ambitious entrepreneurs, industrial groups, and investment institutions. We identify high-potential sectors and deliver end-to-end guidance from site acquisition to full commercial operations.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <Compass className="h-4 w-4 text-[#F59E0B]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Turnkey Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-[#F59E0B]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Growth Models</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-[#F59E0B]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Transparency</span>
              </div>
            </div>
          </div>

          {/* Right: Vision & Mission Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 border border-slate-100 bg-[#F9FAFB] rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-blue-50 rounded-lg text-primary">
                  <Eye className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-[#0A2463] font-heading text-base">Our Vision</h4>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                To turn the four target states of Western and Central India into thriving hubs of production and logistics, bringing world-class infrastructure within reach of regional entrepreneurs.
              </p>
            </div>

            <div className="p-6 border border-slate-100 bg-[#F9FAFB] rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-50 rounded-lg text-[#F59E0B]">
                  <Target className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-[#0A2463] font-heading text-base">Our Mission</h4>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                To assist investors in successfully deploying capital between ₹85 Lakhs and ₹3.5 Crores into verified industrial sectors, providing risk mitigation, financial support, and turnkey setups.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
