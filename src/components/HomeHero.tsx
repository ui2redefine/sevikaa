'use client';
import Link from 'next/link';
import { Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';

const TRUST_BADGE_KEYS = [
  'trust_police_verified',
  'trust_bg_checked',
  'trust_free_replacement',
  'trust_support',
] as const;

const STAT_KEYS = [
  'stat_happy_families',
  'stat_verified_helpers',
  'stat_satisfaction',
  'stat_rating',
] as const;

export default function HomeHero() {
  const { t } = useLang();
  const { phone, phoneTel, whatsapp, whatsappMessage, stats } = SITE_CONFIG;

  return (
    <section
      className="heroSection relative pt-8 pb-20 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--brand-50) 0%, var(--surface) 50%, var(--brand-50) 100%)' }}
      aria-labelledby="hero-heading"
    >
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-25 blur-3xl translate-x-1/2 -translate-y-1/2"
          style={{ background: 'var(--brand-100)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-30 blur-3xl -translate-x-1/2 translate-y-1/2"
          style={{ background: 'var(--brand-50)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="heroCopy flex flex-col gap-6 animate-fade-up">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            style={{ color: 'var(--gray-900)' }}
          >
            {t('hero_title').includes('Verified') ? (
              <>
                {t('hero_title').split('Verified')[0]}
                <span style={{ color: 'var(--brand-700)' }}>Verified</span>
                {t('hero_title').split('Verified')[1]}
              </>
            ) : t('hero_title')}
          </h1>

          <p className="text-lg max-w-lg" style={{ color: 'var(--gray-600)' }}>
            {t('hero_subtitle')}
          </p>

          <div className="heroCtaGroup flex flex-wrap gap-3">
            <Link href="/hire" className="btn btn-primary btn-lg">
              {t('hire_cta')} <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              aria-label="Chat on WhatsApp"
            >
              💬 {t('whatsapp_cta')}
            </a>
          </div>

          {/* Prominent call card */}
          <a
            href={`tel:${phoneTel}`}
            className="heroCallCard flex items-center gap-3 w-fit rounded-2xl px-5 py-3 transition-colors group border-2"
            style={{
              background: 'var(--surface-accent)',
              borderColor: 'var(--accent-500)',
            }}
            aria-label={`Call us at ${phone}`}
          >
            <div className="relative shrink-0" aria-hidden="true">
              {/* outer ring — delayed so it staggers with the inner */}
              <span
                className="absolute inset-0 rounded-full animate-pulse-ring"
                style={{ background: 'transparent', animationDelay: '0.35s' }}
              />
              <div
                className="relative w-10 h-10 rounded-full flex items-center justify-center shadow animate-pulse-ring"
                style={{ background: 'var(--accent-500)' }}
              >
                <Phone size={18} className="text-white" />
              </div>
            </div>
            <div>
              <div className="text-xs font-medium" style={{ color: 'var(--gray-500)' }}>
                {t('call_cta')} — {t('hero_free_consultation')}
              </div>
              <div className="font-bold text-lg leading-tight" style={{ color: 'var(--accent-600)' }}>
                {phone}
              </div>
            </div>
          </a>

          {/* Trust badges */}
          <ul className="heroTrustBadges flex flex-wrap gap-2" aria-label="Trust badges">
            {TRUST_BADGE_KEYS.map(key => (
              <li
                key={key}
                className="flex items-center gap-1 text-xs rounded-full px-3 py-1.5 border shadow-sm"
                style={{
                  color: 'var(--gray-600)',
                  background: 'var(--surface)',
                  borderColor: 'var(--gray-100)',
                }}
              >
                <CheckCircle2 size={12} style={{ color: 'var(--accent-500)' }} aria-hidden="true" />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats grid */}
        <div className="heroStatsGrid grid grid-cols-2 gap-4" aria-label="Company statistics">
          {stats.map(({ value }, i) => (
            <div
              key={value}
              className="card flex flex-col items-center text-center gap-1 py-8 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-3xl font-extrabold text-brand">{value}</span>
              <span className="text-sm" style={{ color: 'var(--gray-500)' }}>{t(STAT_KEYS[i])}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
