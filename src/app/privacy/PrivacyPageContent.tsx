'use client';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';

export default function PrivacyPageContent() {
  const { t } = useLang();

  return (
    <article
      className="privacyContainer max-w-3xl mx-auto px-4 sm:px-6 py-16 prose prose-gray"
      aria-labelledby="privacy-heading"
    >
      <h1 id="privacy-heading">{t('privacy_heading')}</h1>
      <p className="text-muted text-sm">{t('terms_last_updated')} {new Date().toLocaleDateString('en-IN')}</p>
      <p>{t('privacy_body')}</p>
      <p>
        {t('privacy_contact_prefix')}{' '}
        <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.
      </p>
    </article>
  );
}
