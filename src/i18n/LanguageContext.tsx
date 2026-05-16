'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TRANSLATIONS, LangCode } from './translations';
import { SITE_CONFIG } from '@/config/site.config';

const LS_KEY = '_gs.lang';

interface LangContextValue {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
  mounted: boolean;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (k) => TRANSLATIONS.en[k] ?? k,
  mounted: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with 'en' on server — prevents SSR/client mismatch
  const [lang, setLangState] = useState<LangCode>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only runs on client after hydration
    const stored = localStorage.getItem(LS_KEY) as LangCode | null;
    if (stored && SITE_CONFIG.languages.some(l => l.code === stored)) {
      setLangState(stored);
    }
    setMounted(true);
  }, []);

  function setLang(l: LangCode) {
    setLangState(l);
    localStorage.setItem(LS_KEY, l);
  }

  function t(key: string): string {
    return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t, mounted }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
