import React from 'react';
import { ExternalLink, Bell, Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
          API Connected
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-white transition-all"
        >
          <span>View Public Website</span>
          <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
        </a>
      </div>
    </header>
  );
}
