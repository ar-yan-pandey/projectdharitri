'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Import all translation files
import en from '../translations/en.json';
import hi from '../translations/hi.json';
import mr from '../translations/mr.json';
import gu from '../translations/gu.json';
import or from '../translations/or.json';
import bn from '../translations/bn.json';

export const languages = {
  en: { name: 'English', translations: en },
  hi: { name: 'हिंदी', translations: hi },
  mr: { name: 'मराठी', translations: mr },
  gu: { name: 'ગુજરાતી', translations: gu },
  or: { name: 'ଓଡ଼ିଆ', translations: or },
  bn: { name: 'বাংলা', translations: bn }
};

type Language = keyof typeof languages;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState(languages.en.translations);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && languages[savedLanguage]) {
      setLanguage(savedLanguage);
      setTranslations(languages[savedLanguage].translations);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setTranslations(languages[lang].translations);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
