'use client';
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';
import { trackFormSubmit } from '@/lib/analytics';
import { type FieldErrors, required, validPhone, validEmail, minLen, isValid, clearError } from '@/lib/formValidation';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const { t } = useLang();
  const [state, setState] = useState<FormState>('idle');
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(data: FormData): FieldErrors {
    const errs: FieldErrors = {};
    const name    = (data.get('name')         as string) ?? '';
    const phone   = (data.get('phone')        as string) ?? '';
    const email   = (data.get('email')        as string) ?? '';
    const subject = (data.get('subject_line') as string) ?? '';
    const message = (data.get('message')      as string) ?? '';
    if (!required(name))             errs.name    = t('form_err_required');
    if (!required(phone))            errs.phone   = t('form_err_required');
    else if (!validPhone(phone))     errs.phone   = t('form_err_phone');
    if (email && !validEmail(email)) errs.email   = t('form_err_email');
    if (!required(subject))          errs.subject = t('form_err_required');
    if (!minLen(message, 10))        errs.message = t('form_err_message_short');
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (!isValid(errs)) { setErrors(errs); return; }
    setState('submitting'); setSubmitError(''); setErrors({});
    data.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '');
    data.append('subject', `New Contact Message — ${SITE_CONFIG.name}`);
    data.append('from_name', `${SITE_CONFIG.name} Website`);

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) { trackFormSubmit('contact'); setState('success'); }
      else throw new Error(json.message ?? 'Submission failed');
    } catch (err) {
      setState('error');
      setSubmitError(err instanceof Error ? err.message : t('form_error_generic'));
    }
  }

  const ec = (key: string) => `input-field${errors[key] ? ' input-error' : ''}`;

  if (state === 'success') {
    return (
      <div className="contactFormSuccess card flex flex-col items-center text-center gap-4 py-16" role="status" aria-live="polite">
        <CheckCircle2 size={56} className="text-accent" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-strong">{t('form_sent_heading')}</h2>
        <p className="text-muted">{t('form_sent_body')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contactForm card flex flex-col gap-5" aria-label="Contact form" noValidate>
      <h2 className="text-xl font-bold text-strong">{t('form_contact_heading')}</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="contact-name" className="text-sm font-medium text-label">{t('form_name')}</label>
          <input id="contact-name" name="name" type="text" placeholder={t('form_name_ph')}
            className={ec('name')} aria-invalid={!!errors.name}
            onChange={() => setErrors(e => clearError(e, 'name'))} />
          {errors.name && <p className="field-error-msg" role="alert">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="contact-phone" className="text-sm font-medium text-label">{t('form_phone_req')}</label>
          <input id="contact-phone" name="phone" type="tel" placeholder="+91 98765 43210"
            className={ec('phone')} aria-invalid={!!errors.phone}
            onChange={() => setErrors(e => clearError(e, 'phone'))} />
          {errors.phone && <p className="field-error-msg" role="alert">{errors.phone}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="contact-email" className="text-sm font-medium text-label">{t('form_email_opt')}</label>
        <input id="contact-email" name="email" type="email" placeholder="you@email.com"
          className={ec('email')} aria-invalid={!!errors.email}
          onChange={() => setErrors(e => clearError(e, 'email'))} />
        {errors.email && <p className="field-error-msg" role="alert">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="contact-subject" className="text-sm font-medium text-label">{t('form_subject')}</label>
        <input id="contact-subject" name="subject_line" type="text" placeholder={t('form_subject_ph')}
          className={ec('subject')} aria-invalid={!!errors.subject}
          onChange={() => setErrors(e => clearError(e, 'subject'))} />
        {errors.subject && <p className="field-error-msg" role="alert">{errors.subject}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="contact-message" className="text-sm font-medium text-label">{t('form_message_label')}</label>
        <textarea id="contact-message" name="message" rows={5} placeholder={t('form_message_ph')}
          className={`${ec('message')} resize-none`} aria-invalid={!!errors.message}
          onChange={() => setErrors(e => clearError(e, 'message'))} />
        {errors.message && <p className="field-error-msg" role="alert">{errors.message}</p>}
      </div>

      <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" />

      {submitError && <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-2" role="alert">{submitError}</p>}

      <button type="submit" disabled={state === 'submitting'} className="btn btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {state === 'submitting' ? t('form_sending') : <><Send size={16} /> {t('form_send_message')}</>}
      </button>
    </form>
  );
}
