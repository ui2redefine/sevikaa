'use client';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';
import { SERVICE_ICONS } from '@/components/serviceIcons';

export default function ServicesPageContent() {
  const { t } = useLang();
  const { services, whatsapp, whatsappMessage } = SITE_CONFIG;

  return (
    <div className="servicesPage min-h-screen">

      {/* ── Page header ───────────────────────────────────── */}
      <section className="servicesHero bg-surface-subtle section-y px-4 sm:px-6 text-center" aria-labelledby="services-page-heading">
        <h1 id="services-page-heading" className="text-4xl md:text-5xl font-extrabold text-strong mb-4">
          {t('services_page_heading')}
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          {t('services_page_sub')}
        </p>
      </section>

      {/* ── Services list ─────────────────────────────────── */}
      <section className="servicesGrid section-y px-4 sm:px-6 max-w-5xl mx-auto flex flex-col gap-14">
        {services.map(({ slug, features }) => {
          const titleKey = `service_${slug.replace(/-/g, '_')}_title`;
          const fullKey  = `service_${slug.replace(/-/g, '_')}_full`;
          const Icon = SERVICE_ICONS[slug];
          return (
          <article
            key={slug}
            id={slug}
            className="serviceItem flex flex-col md:flex-row gap-6 md:gap-8 items-start scroll-mt-24"
            aria-labelledby={`service-${slug}`}
          >
            <span className="icon-chip w-14 h-14" aria-hidden="true">
              <Icon size={28} />
            </span>
            <div className="serviceItemBody flex flex-col gap-4">
              <h2 id={`service-${slug}`} className="text-2xl font-bold text-strong">{t(titleKey)}</h2>
              <p className="text-default leading-relaxed">{t(fullKey)}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" aria-label={`Features of ${t(titleKey)}`}>
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-default">
                    <CheckCircle2 size={15} className="text-accent shrink-0" aria-hidden="true" />{f}
                  </li>
                ))}
              </ul>
                <Link href={`/hire?service=${slug}`} className="btn btn-primary w-fit mt-2">
                {t('services_request')} {t(titleKey)} <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        );})}
      </section>

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <div className="servicesCta bg-surface-subtle py-12 text-center px-4">
        <p className="text-label font-semibold text-lg mb-4">{t('services_cta_question')}</p>
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank" rel="noopener noreferrer"
          className="btn btn-whatsapp"
          aria-label="Ask us on WhatsApp"
        >
          {t('services_cta_wa')}
        </a>
      </div>

    </div>
  );
}
