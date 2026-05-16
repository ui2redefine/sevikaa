'use client';
import { Globe } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import { SITE_CONFIG } from '@/config/site.config';
import type { LangCode } from '@/i18n/translations';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="langSwitcher flex items-center gap-0.5" role="navigation" aria-label="Language selector">
      <Globe size={14} className="text-muted mr-1 shrink-0" aria-hidden="true" />
      {SITE_CONFIG.languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code as LangCode)}
          aria-pressed={lang === code}
          aria-label={`Switch to ${label}`}
          className={[
            'langBtn px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] inline-flex items-center',
            lang === code
              ? 'bg-brand text-white'
              : 'text-muted hover:text-strong hover:bg-surface-subtle',
          ].join(' ')}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
