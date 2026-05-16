'use client';
import HireForm from './HireForm';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';
import { Phone, Mail } from 'lucide-react';

export default function HirePageContent() {
  const { t } = useLang();
  const { phone, phoneTel, phone2, phoneTel2, email, whatsapp, whatsappMessage } = SITE_CONFIG;

  return (
    <div className="hirePage min-h-screen bg-surface-subtle">

      {/* ── Page hero ─────────────────────────────────────── */}
      <section className="hireHero bg-surface-subtle py-14 px-4 sm:px-6 text-center" aria-labelledby="hire-heading">
        <h1 id="hire-heading" className="text-4xl font-extrabold text-strong mb-3">
          {t('hire_page_heading')}
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          {t('hire_page_subheading')}
        </p>
      </section>

      {/* ── Content grid ──────────────────────────────────── */}
      <div className="hireLayout max-w-5xl mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-3 gap-10">

        {/* Form column */}
        <div className="hireFormCol lg:col-span-2">
          <HireForm />
        </div>

        {/* Sidebar */}
        <aside className="hireSidebarCol flex flex-col gap-6" aria-label="Contact options">

          <div className="card flex flex-col gap-3">
            <h2 className="font-semibold text-strong">{t('hire_prefer_call')}</h2>
            <a
              href={`tel:${phoneTel}`}
              className="btn btn-primary w-full justify-center"
              aria-label={`Call ${phone}`}
            >
              <Phone size={16} /> {phone}
            </a>
            <a
              href={`tel:${phoneTel2}`}
              className="btn btn-primary w-full justify-center"
              aria-label={`Call ${phone2}`}
            >
              <Phone size={16} /> {phone2}
            </a>
          </div>

          <div className="card flex flex-col gap-3">
            <h2 className="font-semibold text-strong">{t('hire_whatsapp_us')}</h2>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp w-full justify-center"
              aria-label="Chat on WhatsApp"
            >
              {t('hire_open_whatsapp')}
            </a>
          </div>

          <div className="card flex flex-col gap-2 text-sm text-default">
            <h2 className="font-semibold text-strong">{t('hire_email_us')}</h2>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 hover:text-brand transition-colors"
              aria-label={`Email ${email}`}
            >
              <Mail size={14} />{email}
            </a>
          </div>

          <div className="hirePromiseCard card bg-surface-accent border-accent">
            <h3 className="font-semibold mb-2" style={{ color: 'var(--accent-600)' }}>{t('hire_our_promise')}</h3>
            <ul className="text-sm flex flex-col gap-1.5" style={{ color: 'var(--accent-600)' }}>
              <li>{t('hire_promise_callback')}</li>
              <li>{t('hire_promise_verified')}</li>
              <li>{t('hire_promise_replacement')}</li>
              <li>{t('hire_promise_charges')}</li>
            </ul>
          </div>

        </aside>
      </div>
    </div>
  );
}
