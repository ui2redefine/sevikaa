'use client';
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';
import { trackFormSubmit } from '@/lib/analytics';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const DURATION_OPTIONS = ['Part-time (few hours/day)', 'Full-time (8 hrs/day)', 'Live-in (24x7)', 'On-demand / One-time'];

export default function HireForm() {
  const { t } = useLang();
  const SERVICE_OPTIONS = SITE_CONFIG.services.map(s => t(`service_${s.slug.replace(/-/g, '_')}_title`));
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setError('');

    const data = new FormData(e.currentTarget);
    data.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '');
    data.append('subject', `New Helper Request — ${SITE_CONFIG.name}`);
    data.append('from_name', `${SITE_CONFIG.name} Website`);

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        trackFormSubmit('hire_helper', (data.get('city') as string) ?? undefined);
        setState('success');
      } else {
        throw new Error(json.message ?? 'Submission failed');
      }
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : t('form_error_generic'));
    }
  }

  if (state === 'success') {
    return (
      <div className="hireFormSuccess card flex flex-col items-center text-center gap-4 py-16" role="status" aria-live="polite">
        <CheckCircle2 size={56} className="text-accent" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-strong">{t('form_hire_sent_heading')}</h2>
        <p className="text-muted max-w-sm">{t('form_hire_sent_body')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="hireForm card flex flex-col gap-5" aria-label="Hire a helper request form" noValidate>
      <h2 className="text-xl font-bold text-strong">{t('form_hire_heading')}</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="hire-name" className="text-sm font-medium text-label">{t('form_hire_fullname')}</label>
          <input id="hire-name" name="name" type="text" required placeholder={t('form_hire_name_ph')} className="input-field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="hire-phone" className="text-sm font-medium text-label">{t('form_hire_phone')}</label>
          <input id="hire-phone" name="phone" type="tel" required placeholder="+91 98765 43210" className="input-field" pattern="[+0-9 ]{10,15}" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="hire-email" className="text-sm font-medium text-label">{t('form_hire_email')}</label>
          <input id="hire-email" name="email" type="email" placeholder="you@email.com" className="input-field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="hire-city" className="text-sm font-medium text-label">{t('form_hire_city')}</label>
          <input id="hire-city" name="city" type="text" required placeholder={t('form_hire_city_ph')} className="input-field" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="hire-service" className="text-sm font-medium text-label">{t('form_hire_service')}</label>
          <select id="hire-service" name="service" required className="input-field">
            <option value="">Select service...</option>
            {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="hire-duration" className="text-sm font-medium text-label">{t('form_hire_duration')}</label>
          <select id="hire-duration" name="duration" className="input-field">
            <option value="">Select type...</option>
            {DURATION_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="hire-message" className="text-sm font-medium text-label">{t('form_hire_requirements')}</label>
        <textarea
          id="hire-message" name="message" rows={3}
          placeholder={t('form_hire_req_ph')}
          className="input-field resize-none"
        />
      </div>

      {/* Honeypot anti-spam */}
      <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" />

      {error && (
        <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-2" role="alert">{error}</p>
      )}

      <button type="submit" disabled={state === 'submitting'} className="btn btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {state === 'submitting' ? t('form_sending') : <><Send size={16} /> {t('form_send_request')}</>}
      </button>
    </form>
  );
}
