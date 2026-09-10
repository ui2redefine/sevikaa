'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle2, ArrowRight, MessageCircle, Star } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';

const TRUST_BADGE_KEYS = [
  'trust_police_verified',
  'trust_bg_checked',
  'trust_free_replacement',
  'trust_support',
] as const;

export default function HomeHero() {
  const { t } = useLang();
  const { phone, phoneTel, whatsapp, whatsappMessage, stats } = SITE_CONFIG;

  return (
    <section
      className="heroSection hero-surface relative pt-10 pb-20 lg:pb-14 px-4 sm:px-6 overflow-hidden"
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
              <a
                href={`tel:${phoneTel}`}
                className="font-bold text-lg leading-tight hover:underline"
                style={{ color: 'var(--accent-600)' }}
                aria-label={`Call us at ${phone}`}
              >
                {phone}
              </a>
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

        {/* Hero visual */}
        <div className="heroVisual relative mx-auto w-full max-w-md lg:max-w-none animate-fade-up">
          <Image
            src="/services/house-maid.jpg"
            alt="A verified Sevikaa helper at work in a family home"
            width={750}
            height={900}
            priority
            sizes="(max-width: 1024px) 28rem, 40vw"
            className="w-full rounded-3xl object-cover aspect-[4/5] shadow-xl"
          />
          <div className="absolute -bottom-5 left-4 sm:-left-5 flex items-center gap-3 rounded-2xl bg-surface border border-subtle shadow-lg px-4 py-3">
            <span className="flex items-center gap-1 text-2xl font-extrabold text-brand">
              {stats[3].value.replace('★', '')}
              <Star size={18} className="fill-current" aria-hidden="true" />
            </span>
            <span className="text-xs text-muted leading-tight">
              {t('stat_rating')}
              <br />
              <span className="text-strong font-semibold">{stats[0].value} {t('stat_happy_families')}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
