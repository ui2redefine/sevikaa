'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, HeartHandshake, Zap, BadgeCheck, CheckCircle2, type LucideIcon } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';

export default function AboutPageContent() {
  const { t } = useLang();
  const { name, stats, phone, phoneTel, phone2, phoneTel2 } = SITE_CONFIG;

  const VALUES: { Icon: LucideIcon; titleKey: string; descKey: string }[] = [
    { Icon: ShieldCheck,    titleKey: 'about_val_trust',    descKey: 'about_val_trust_desc' },
    { Icon: HeartHandshake, titleKey: 'about_val_personal', descKey: 'about_val_personal_desc' },
    { Icon: Zap,            titleKey: 'about_val_speed',    descKey: 'about_val_speed_desc' },
    { Icon: BadgeCheck,     titleKey: 'about_val_replace',  descKey: 'about_val_replace_desc' },
  ];

  const BELIEFS = [
    'about_belief_1', 'about_belief_2', 'about_belief_3', 'about_belief_4', 'about_belief_5',
  ] as const;

  return (
    <div className="aboutPage min-h-screen">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="aboutHero bg-surface-subtle section-y px-4 sm:px-6" aria-labelledby="about-heading">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <span className="badge bg-brand-100 text-brand mb-4 w-fit">{t('about_since_badge')}</span>
            <h1 id="about-heading" className="text-4xl md:text-5xl font-extrabold text-strong mb-4 tracking-tight">
              {t('about_heading')} <span className="text-brand">{name}</span>
            </h1>
            <p className="text-default text-lg leading-relaxed">{t('about_intro')}</p>
          </div>
          <div className="shrink-0">
            <Image
              src="/logo.jpg"
              alt={`${name} logo`}
              width={200}
              height={200}
              className="rounded-2xl shadow-lg object-contain bg-surface p-4"
            />
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────── */}
      <section className="aboutMission section-y px-4 sm:px-6 max-w-4xl mx-auto" aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="text-2xl font-bold text-strong mb-6">{t('about_mission_heading')}</h2>
        <div className="prose max-w-none">
          <p className="text-default leading-relaxed text-lg">{t('about_mission_p1')}</p>
          <p className="text-default leading-relaxed text-lg mt-4">
            <strong>{t('about_mission_diff')}</strong> {t('about_mission_p2')}
          </p>
        </div>

        {/* Belief bullets */}
        <div className="aboutBeliefs mt-8 grid sm:grid-cols-2 gap-3" aria-label="Our beliefs">
          {BELIEFS.map(key => (
            <div key={key} className="flex items-start gap-2 text-default">
              <CheckCircle2 size={18} className="text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
              <span className="text-sm">{t(key)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="aboutStats bg-brand py-14 px-4 sm:px-6" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Our Numbers</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map(({ value }, i) => {
            const labelKey = (['stat_happy_families', 'stat_verified_helpers', 'stat_satisfaction', 'stat_rating'] as const)[i];
            return (
            <div key={value}>
              <div className="text-4xl font-extrabold">{value}</div>
              <div className="text-brand-light text-sm mt-1">{t(labelKey)}</div>
            </div>
          );})}
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section className="aboutValues section-y px-4 sm:px-6 max-w-5xl mx-auto" aria-labelledby="values-heading">
        <h2 id="values-heading" className="section-heading mb-12">{t('about_values_heading')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(({ Icon, titleKey, descKey }) => (
            <div key={titleKey} className="card text-center flex flex-col items-center gap-3">
              <span className="icon-chip w-12 h-12" aria-hidden="true">
                <Icon size={24} />
              </span>
              <h3 className="font-semibold text-strong">{t(titleKey)}</h3>
              <p className="text-sm text-muted">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="aboutCta section-y px-4 text-center bg-surface-subtle" aria-labelledby="about-cta">
        <h2 id="about-cta" className="text-2xl font-bold mb-2 text-strong">{t('about_cta_heading')}</h2>
        <p className="text-muted mb-6">{t('about_cta_sub')}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/hire" className="btn btn-primary">{t('hire_cta')}</Link>
          <Link href="/join" className="btn btn-secondary">{t('join_cta')}</Link>
        </div>
        <p className="text-muted text-sm mt-4">
          {t('call_cta')}:{' '}
          <a href={`tel:${phoneTel}`} className="font-semibold text-brand hover:underline">{phone}</a>
          {' · '}
          <a href={`tel:${phoneTel2}`} className="font-semibold text-brand hover:underline">{phone2}</a>
        </p>
      </section>

    </div>
  );
}
