import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 text-slate-400 py-16 relative overflow-hidden">
      
      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-slate-800 pb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/WhatsApp Image 2026-07-07 at 11.51.59.jpeg"
                alt="World Export Emblem"
                className="h-10 w-auto rounded object-contain"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white uppercase leading-none">
                  World Export
                </span>
                <span className="text-[9px] text-[#F59E0B] font-semibold tracking-wider uppercase leading-none mt-1">
                  Business Housing Centre
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              turnkey project consultants and financial facilitators enabling manufacturing excellence across Gujarat, Maharashtra, Madhya Pradesh & Rajasthan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Profile</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">Project Portfolio</a>
              </li>
              <li>
                <a href="#finance" className="hover:text-amber-400 transition-colors">Finance assistance</a>
              </li>
              <li>
                <a href="#states" className="hover:text-amber-400 transition-colors">Target Regions</a>
              </li>
            </ul>
          </div>

          {/* Support / Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Consultation Desk
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Hotline: +91 93286 50500 <br />
              Email: info@worldexportbhc.com <br />
              Mon - Sat: 9:00 AM - 6:00 PM
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div>
            &copy; {new Date().getFullYear()} World Export Business Housing Centre. All Rights Reserved.
          </div>
          
          {/* Social icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6.5C12 5.67 12.5 5 13.5 5H15V2h-2.5C10.5 2 9 3.5 9 5.5V8z"/>
              </svg>
            </a>
            <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-amber-400 hover:bg-slate-855 transition-all">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <button
              onClick={scrollUp}
              className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all"
              title="Scroll back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
