'use client';
import ContactForm from './ContactForm';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const HOURS = [
  { dayKey: 'Monday – Saturday', time: '8:00 AM – 8:00 PM' },
  { dayKey: 'Sunday',            time: '9:00 AM – 5:00 PM' },
];

export default function ContactPageContent() {
  const { t } = useLang();
  const { phone, phoneTel, email, address, whatsapp, whatsappMessage } = SITE_CONFIG;

  return (
    <div className="contactPage min-h-screen bg-surface-subtle">

      {/* ── Page hero ─────────────────────────────────────── */}
      <section className="contactHero bg-surface-subtle py-14 px-4 sm:px-6 text-center" aria-labelledby="contact-heading">
        <h1 id="contact-heading" className="text-4xl font-extrabold text-strong mb-3">
          {t('contact_page_heading')}
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          {t('contact_page_subheading')}
        </p>
      </section>

      {/* ── Content grid ──────────────────────────────────── */}
      <div className="contactLayout max-w-5xl mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-3 gap-10">

        <div className="contactFormCol lg:col-span-2">
          <ContactForm />
        </div>

        <aside className="contactSidebarCol flex flex-col gap-5" aria-label="Contact information">

          {/* Contact methods */}
          <div className="card flex flex-col gap-4">
            <h2 className="font-semibold text-strong">{t('contact_get_in_touch')}</h2>

            <a
              href={`tel:${phoneTel}`}
              className="flex items-center gap-3 text-sm text-label hover:text-brand transition-colors"
              aria-label={`Call ${phone}`}
            >
              <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center shrink-0" aria-hidden="true">
                <Phone size={15} className="text-brand" />
              </div>
              <div>
                <div className="font-medium">{t('contact_phone_label')}</div>
                <div className="text-muted">{phone}</div>
              </div>
            </a>

            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-label hover:text-accent transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0" aria-hidden="true">
                <MessageCircle size={15} className="text-green-600" />
              </div>
              <div>
                <div className="font-medium">{t('contact_wa_label')}</div>
                <div className="text-muted">{t('contact_wa_quick')}</div>
              </div>
            </a>

            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-sm text-label hover:text-brand transition-colors"
              aria-label={`Email ${email}`}
            >
              <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center shrink-0" aria-hidden="true">
                <Mail size={15} className="text-brand" />
              </div>
              <div>
                <div className="font-medium">{t('contact_email_label')}</div>
                <div className="text-muted">{email}</div>
              </div>
            </a>

            <div className="flex items-start gap-3 text-sm text-label">
              <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                <MapPin size={15} className="text-brand" />
              </div>
              <div>
                <div className="font-medium">{t('contact_address_label')}</div>
                <div className="text-muted">{address.city}, {address.state}</div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="contactHoursCard card flex flex-col gap-3">
            <h2 className="font-semibold text-strong flex items-center gap-2">
              <Clock size={15} className="text-brand" aria-hidden="true" />
              {t('contact_hours_label')}
            </h2>
            {HOURS.map(({ dayKey, time }) => (
              <div key={dayKey} className="flex justify-between text-sm text-default">
                <span>{dayKey}</span>
                <span className="font-medium">{time}</span>
              </div>
            ))}
          </div>

        </aside>
      </div>
    </div>
  );
}
