'use client';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';

export default function TermsPageContent() {
  const { t } = useLang();

  return (
    <article
      className="termContainer max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-gray"
      aria-labelledby="terms-heading"
    >
      <h1 id="terms-heading">{t('terms_heading')}</h1>
      <p className="text-muted text-sm">{t('terms_last_updated')} {new Date().toLocaleDateString('en-IN')}</p>
      <p>{t('terms_body')}</p>
      <p>
        {t('terms_contact_prefix')}{' '}
        <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.
      </p>
    </article>
  );
}
