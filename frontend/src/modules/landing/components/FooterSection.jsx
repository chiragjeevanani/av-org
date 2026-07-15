import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../../assets/logo.jpeg';
import { useLanguage } from '../../../context/LanguageContext';

const FooterSection = () => {
  const { t } = useLanguage();

  const navigationLinks = [
    { name: t('nav.aboutProfile'), href: '#about' },
    { name: t('nav.projectShowcase'), href: '#projects' },
    { name: t('nav.financeSubsidies'), href: '#finance' },
    { name: t('nav.targetRegions'), href: '#states' },
  ];

  const industryLinks = [
    { name: t('projectShowcase.categories.Manufacturing'), href: '#industries' },
    { name: t('projectShowcase.categories.Food Processing'), href: '#industries' },
    { name: t('industries.items.6.title'), href: '#industries' }, // Hospitality
    { name: t('projectShowcase.categories.Agriculture'), href: '#industries' }, // Agriculture
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#home" className="flex items-center space-x-2 w-max">
              <img
                src={logo}
                alt="AV Group Organization Management Logo"
                className="w-10 h-10 object-contain rounded"
              />
              <div className="flex flex-col">
                <span className="text-base font-heading font-black tracking-tight text-[#0A2463] uppercase leading-none">
                  {t('nav.brandName')}
                </span>
                <span className="text-[9px] text-[#F59E0B] font-bold tracking-widest uppercase leading-none mt-1">
                  {t('nav.brandSubtitle')}
                </span>
              </div>
            </a>
            <p className="text-slate-600 leading-relaxed max-w-sm text-sm">
              {t('footer.desc')}
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0A2463] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6.5C12 5.67 12.5 5 13.5 5H15V2h-2.5C10.5 2 9 3.5 9 5.5V8z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0A2463] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0A2463] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="hidden md:block">
            <h4 className="font-bold font-heading text-slate-900 mb-6 text-sm">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-600 hover:text-[#F59E0B] transition-colors text-xs font-semibold uppercase tracking-wider">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="hidden md:block">
            <h4 className="font-bold font-heading text-slate-900 mb-6 text-sm">{t('footer.sectors')}</h4>
            <ul className="space-y-4">
              {industryLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-600 hover:text-[#F59E0B] transition-colors text-xs font-semibold uppercase tracking-wider">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="hidden md:block">
            <h4 className="font-bold font-heading text-slate-900 mb-6 text-sm">{t('footer.advisoryDesk')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                <span className="text-slate-600 text-xs leading-relaxed font-semibold">
                  {t('footer.serviceAreaLabel')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F59E0B] shrink-0" />
                <a href="tel:9978655799" className="text-slate-600 text-xs font-bold hover:text-[#0A2463] transition-colors">
                  +91 99786 55799
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F59E0B] shrink-0" />
                <a href="mailto:info@worldexportbhc.com" className="text-slate-600 text-xs font-bold hover:text-[#0A2463] transition-colors">
                  info@worldexportbhc.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} {t('nav.brandName')} {t('nav.brandSubtitle')}. {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-wider">
            <a href="#about" className="text-slate-500 hover:text-[#0A2463] transition-colors">{t('about.transparency')}</a>
            <a href="#about" className="text-slate-500 hover:text-[#0A2463] transition-colors">{t('footer.growth')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
