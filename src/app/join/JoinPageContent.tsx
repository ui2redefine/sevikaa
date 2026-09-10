'use client';
import JoinForm from './JoinForm';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';

export default function JoinPageContent() {
  const { t } = useLang();

  const BENEFITS = [
    { icon: '💰', titleKey: 'join_benefit_pay_title',      descKey: 'join_benefit_pay_desc' },
    { icon: '🏠', titleKey: 'join_benefit_home_title',     descKey: 'join_benefit_home_desc' },
    { icon: '🎓', titleKey: 'join_benefit_training_title', descKey: 'join_benefit_training_desc' },
    { icon: '🛡️', titleKey: 'join_benefit_safe_title',    descKey: 'join_benefit_safe_desc' },
  ] as const;

  return (
    <div className="joinPage min-h-screen min-h-dvh bg-surface-subtle">

      {/* ── Page hero ─────────────────────────────────────── */}
      <section className="joinHero bg-surface-subtle py-14 px-4 sm:px-6 text-center" aria-labelledby="join-heading">
        <h1 id="join-heading" className="text-4xl font-extrabold text-strong mb-3">
          {t('join_page_heading')}
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          {t('join_page_subheading')}
        </p>
      </section>

      {/* ── Content grid ──────────────────────────────────── */}
      <div className="joinLayout max-w-5xl mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-3 gap-10">

        <div className="joinFormCol lg:col-span-2">
          <JoinForm />
        </div>

        <aside className="joinSidebarCol flex flex-col gap-5" aria-label="Benefits of joining">
          <h2 className="font-bold text-strong text-lg">{t('join_why_join')} {SITE_CONFIG.name}?</h2>

          {BENEFITS.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className="card flex items-start gap-3">
              <span className="text-2xl shrink-0" aria-hidden="true">{icon}</span>
              <div>
                <h3 className="font-semibold text-strong text-sm">{t(titleKey)}</h3>
                <p className="text-xs text-muted mt-0.5">{t(descKey)}</p>
              </div>
            </div>
          ))}

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Hi, I want to register as a helper with ${SITE_CONFIG.name}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-whatsapp w-full justify-center"
            aria-label="Register via WhatsApp"
          >
            {t('join_register_whatsapp')}
          </a>
        </aside>
      </div>
    </div>
  );
}
