'use client';
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';
import { trackFormSubmit } from '@/lib/analytics';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const EXPERIENCE_OPTIONS = ['Less than 1 year', '1–3 years', '3–5 years', '5+ years'];
const AVAILABILITY_OPTIONS = ['Part-time (few hours)', 'Full-time (8 hrs)', 'Live-in', 'Any'];

export default function JoinForm() {
  const { t } = useLang();
  const ROLE_OPTIONS = SITE_CONFIG.services.map(s => t(`service_${s.slug.replace(/-/g, '_')}_title`));
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setError('');

    const data = new FormData(e.currentTarget);
    data.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '');
    data.append('subject', `New Helper Registration — ${SITE_CONFIG.name}`);
    data.append('from_name', `${SITE_CONFIG.name} Helper Registration`);

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        trackFormSubmit('join_helper', (data.get('city') as string) ?? undefined);
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
      <div className="joinFormSuccess card flex flex-col items-center text-center gap-4 py-16" role="status" aria-live="polite">
        <CheckCircle2 size={56} className="text-accent" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-strong">{t('form_join_sent_heading')}</h2>
        <p className="text-muted max-w-sm">{t('form_join_sent_body')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="joinForm card flex flex-col gap-5" aria-label="Helper registration form" noValidate>
      <h2 className="text-xl font-bold text-strong">{t('form_join_heading')}</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="join-name" className="text-sm font-medium text-label">{t('form_join_fullname')}</label>
          <input id="join-name" name="name" type="text" required placeholder={t('form_join_fullname')} className="input-field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="join-phone" className="text-sm font-medium text-label">{t('form_join_phone')}</label>
          <input id="join-phone" name="phone" type="tel" required placeholder="+91 98765 43210" className="input-field" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="join-age" className="text-sm font-medium text-label">{t('form_join_age')}</label>
          <input id="join-age" name="age" type="number" placeholder="25" min={18} max={65} className="input-field" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="join-city" className="text-sm font-medium text-label">{t('form_join_city')}</label>
          <input id="join-city" name="city" type="text" required placeholder={t('form_join_city_ph')} className="input-field" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="join-role" className="text-sm font-medium text-label">{t('form_join_role')}</label>
          <select id="join-role" name="role" required className="input-field">
            <option value="">Select role...</option>
            {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="join-experience" className="text-sm font-medium text-label">{t('form_join_exp')}</label>
          <select id="join-experience" name="experience" className="input-field">
            <option value="">Select experience...</option>
            {EXPERIENCE_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="join-availability" className="text-sm font-medium text-label">{t('form_join_avail')}</label>
        <select id="join-availability" name="availability" className="input-field">
          <option value="">Select availability...</option>
          {AVAILABILITY_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="join-message" className="text-sm font-medium text-label">{t('form_join_about')}</label>
        <textarea
          id="join-message" name="message" rows={3}
          placeholder={t('form_join_about_ph')}
          className="input-field resize-none"
        />
      </div>

      <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" />

      {error && (
        <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-2" role="alert">{error}</p>
      )}

      <button type="submit" disabled={state === 'submitting'} className="btn btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {state === 'submitting' ? t('form_sending') : <><Send size={16} /> {t('form_join_register')}</>}
      </button>
    </form>
  );
}

