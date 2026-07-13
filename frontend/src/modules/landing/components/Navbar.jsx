import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import logo from '/WhatsApp Image 2026-07-07 at 11.52.09.jpeg';
import { useLanguage } from '../../../context/LanguageContext';
import LanguageSwitcher from '../../../components/LanguageSwitcher';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile hamburger is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'whyUs', href: '#why-choose-us' },
    { key: 'finance', href: '#finance' },
    { key: 'states', href: '#states' },
    { key: 'industries', href: '#industries' },
    { key: 'gallery', href: '#gallery' },
    { key: 'faq', href: '#faq' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 pointer-events-auto',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm pt-2 pb-3 md:pt-3 md:pb-4'
          : 'bg-transparent pt-4 pb-6 md:pt-5 md:pb-8'
      )}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#home" 
          className="flex items-center group relative space-x-2"
          onClick={(e) => handleLinkClick(e, '#home')}
        >
          <img 
            src={logo} 
            alt="World Export Logo" 
            className="w-10 h-10 object-contain rounded transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="flex flex-col">
            <span className={cn(
              "text-sm md:text-base font-heading font-black tracking-tight transition-colors whitespace-nowrap uppercase leading-none",
              scrolled ? "text-[#0A2463]" : "text-[#0A2463]"
            )}>
              {t('nav.brandName')}
            </span>
            <span className="text-[9px] text-[#F59E0B] font-bold tracking-widest uppercase leading-none mt-1">
              {t('nav.brandSubtitle')}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.key} 
              href={link.href} 
              className={cn(
                "text-xs font-bold uppercase tracking-wider transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#F59E0B] after:transition-all hover:after:w-full",
                scrolled 
                  ? "text-slate-700 hover:text-[#0A2463]" 
                  : "text-slate-800 hover:text-[#0A2463]"
              )}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href="#contact"
            className="px-5 py-2.5 bg-[#0A2463] text-white hover:bg-[#F59E0B] hover:text-[#0F172A] rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            {t('nav.consultNow')}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            className="p-2 text-[#0A2463] relative z-[60]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-0 left-0 w-full bg-white shadow-2xl border-b border-slate-100 overflow-y-auto max-h-[100vh] lg:hidden z-50 pt-20 pb-10"
            data-lenis-prevent
          >
            <div className="flex flex-col gap-4 px-6 mt-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={link.href}
                    className="text-base font-heading font-bold text-slate-800 hover:text-[#F59E0B] transition-colors block py-1 border-b border-slate-50"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </motion.div>
              ))}
              <div className="pt-4">
                <a
                  href="#contact"
                  className="block text-center px-5 py-3 bg-[#0A2463] text-white rounded-xl text-xs font-bold uppercase tracking-widest"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                >
                  {t('nav.consultNow')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
