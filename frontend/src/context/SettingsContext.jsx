import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const defaultSettings = {
  companyName: 'AV Group Organization',
  footerDescription: 'Leading provider of sustainable clean energy, wind engineering, EV charging infrastructure and MSME advisory solutions.',
  logo: '',
  footerLogo: '',
  sectionImages: {
    windEnergy: '',
    evCharging: ''
  },
  galleryImages: {
    gallery1: '',
    gallery2: '',
    gallery3: ''
  },
  contact: {
    phone: '+91 99786 55799',
    email: 'info@worldexportbhc.com',
    serviceArea: 'Gujarat • Maharashtra • Madhya Pradesh • Rajasthan',
    address: 'Gujarat, India'
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com'
  }
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    fetchPublicSettings();
  }, []);

  const fetchPublicSettings = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/settings/public`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.settings) {
          const s = data.settings;
          setSettings({
            companyName: s.companyName || defaultSettings.companyName,
            footerDescription: s.footerDescription || defaultSettings.footerDescription,
            logo: s.logo || defaultSettings.logo,
            footerLogo: s.footerLogo || defaultSettings.footerLogo,
            sectionImages: {
              windEnergy: s.sectionImages?.windEnergy || defaultSettings.sectionImages.windEnergy,
              evCharging: s.sectionImages?.evCharging || defaultSettings.sectionImages.evCharging
            },
            galleryImages: {
              gallery1: s.galleryImages?.gallery1 || defaultSettings.galleryImages.gallery1,
              gallery2: s.galleryImages?.gallery2 || defaultSettings.galleryImages.gallery2,
              gallery3: s.galleryImages?.gallery3 || defaultSettings.galleryImages.gallery3
            },
            contact: {
              phone: s.contact?.phone || defaultSettings.contact.phone,
              email: s.contact?.email || defaultSettings.contact.email,
              serviceArea: s.contact?.serviceArea || defaultSettings.contact.serviceArea,
              address: s.contact?.address || defaultSettings.contact.address
            },
            socialLinks: {
              facebook: s.socialLinks?.facebook || defaultSettings.socialLinks.facebook,
              twitter: s.socialLinks?.twitter || defaultSettings.socialLinks.twitter,
              linkedin: s.socialLinks?.linkedin || defaultSettings.socialLinks.linkedin,
              youtube: s.socialLinks?.youtube || defaultSettings.socialLinks.youtube
            }
          });
        }
      }
    } catch (err) {
      console.warn('[SettingsContext] Could not fetch public settings, using fallbacks:', err);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, defaultSettings, refreshSettings: fetchPublicSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    return { settings: defaultSettings, defaultSettings, refreshSettings: () => {} };
  }
  return context;
};
