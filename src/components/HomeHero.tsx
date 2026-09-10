'use client';
import Link from 'next/link';
import { Phone, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
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
  const { phone, phoneTel, phone2, phoneTel2, whatsapp, whatsappMessage, stats } = SITE_CONFIG;

  return (
    <section
      className="heroSection hero-surface relative pt-10 pb-14 px-4 sm:px-6 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Decorative blobs — use surface tokens so they flip with the theme */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-40 blur-3xl translate-x-1/2 -translate-y-1/2"
          style={{ background: 'var(--surface-subtle)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-40 blur-3xl -translate-x-1/2 translate-y-1/2"
          style={{ background: 'var(--surface-subtle)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="heroCopy flex flex-col gap-6 animate-fade-up">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-strong"
          >
            {t('hero_title').includes('Verified') ? (
              <>
                {t('hero_title').split('Verified')[0]}
                <span className="text-brand">Verified</span>
                {t('hero_title').split('Verified')[1]}
              </>
            ) : t('hero_title')}
          </h1>

          <p className="text-lg max-w-lg text-muted">{t('hero_subtitle')}</p>

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
              <MessageCircle size={16} aria-hidden="true" /> {t('whatsapp_cta')}
            </a>
          </div>

          {/* Call card — both numbers in one compact block */}
          <div
            className="heroCallCard flex items-center gap-3 w-fit rounded-2xl px-5 py-3 border-2"
            style={{ background: 'var(--surface-accent)', borderColor: 'var(--accent-500)' }}
          >
            <div className="relative shrink-0" aria-hidden="true">
              <div
                className="relative w-10 h-10 rounded-full flex items-center justify-center shadow animate-pulse-ring"
                style={{ background: 'var(--accent-500)' }}
              >
                <Phone size={18} className="text-white" />
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-muted">
                {t('call_cta')} — {t('hero_free_consultation')}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 font-bold text-lg leading-tight" style={{ color: 'var(--accent-600)' }}>
                <a href={`tel:${phoneTel}`} className="hover:underline" aria-label={`Call us at ${phone}`}>{phone}</a>
                <span className="hidden sm:inline text-subtle font-normal" aria-hidden="true">·</span>
                <a href={`tel:${phoneTel2}`} className="hover:underline" aria-label={`Call us at ${phone2}`}>{phone2}</a>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <ul className="heroTrustBadges flex flex-wrap gap-2" aria-label="Trust badges">
            {TRUST_BADGE_KEYS.map(key => (
              <li
                key={key}
                className="flex items-center gap-1 text-xs rounded-full px-3 py-1.5 border border-subtle bg-surface shadow-sm text-label"
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
              <span className="text-sm text-muted">{t(STAT_KEYS[i])}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
