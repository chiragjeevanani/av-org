import React, { createContext, useContext, useState, useEffect } from 'react';
import projectsEn from '../data/projects_en.json';
import projectsHi from '../data/projects_hi.json';
import projectsMr from '../data/projects_mr.json';
import projectsGu from '../data/projects_gu.json';

import galleryEn from '../data/gallery_en.json';
import galleryHi from '../data/gallery_hi.json';
import galleryMr from '../data/gallery_mr.json';
import galleryGu from '../data/gallery_gu.json';

import { translations } from '../data/translations';

const LanguageContext = createContext();

const projectsMap = {
  en: projectsEn,
  hi: projectsHi,
  mr: projectsMr,
  gu: projectsGu
};

const galleryMap = {
  en: galleryEn,
  hi: galleryHi,
  mr: galleryMr,
  gu: galleryGu
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Nested key resolver helper
  const t = (path) => {
    const keys = path.split('.');
    let value = translations[language];
    
    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        // Fallback to English
        let fallbackValue = translations['en'];
        for (const fbKey of keys) {
          if (fallbackValue && fallbackValue[fbKey] !== undefined) {
            fallbackValue = fallbackValue[fbKey];
          } else {
            fallbackValue = path;
            break;
          }
        }
        return fallbackValue;
      }
    }
    return value;
  };

  const projects = projectsMap[language] || projectsEn;
  const gallery = galleryMap[language] || galleryEn;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, projects, gallery }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
