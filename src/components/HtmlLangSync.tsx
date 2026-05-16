'use client';
import { useEffect } from 'react';
import { useLang } from '@/i18n/LanguageContext';

/**
 * Syncs the <html lang="…"> attribute to the active language on the client.
 * Must be rendered inside LanguageProvider.
 */
export default function HtmlLangSync() {
  const { lang } = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
