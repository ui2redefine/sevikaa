'use client';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import HomeHero from '@/components/HomeHero';

export default function HomePageContent() {
  const { t } = useLang();
  const { name, services, testimonials, howItWorks, stats } = SITE_CONFIG;

  return (
    <>
      <HomeHero />

      {/* ── Services ──────────────────────────────────────── */}
      <section className="homeServices py-10 px-4 sm:px-6 bg-surface" id="services" aria-labelledby="services-heading">
        <div className="max-w-6xl mx-auto">
          <h2 id="services-heading" className="section-heading">{t('services_heading')}</h2>
          <p className="section-subheading">{t('home_services_sub')}</p>
          <div className="servicesGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((s, i) => (
              <div key={s.slug} style={{ animationDelay: `${i * 80}ms` }} className="animate-fade-up">
                <ServiceCard icon={s.icon} title={t(`service_${s.slug.replace(/-/g, '_')}_title`)} shortDesc={t(`service_${s.slug.replace(/-/g, '_')}_short`)} slug={s.slug} />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn btn-secondary">
              {t('home_view_all')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section className="homeHowItWorks py-20 px-4 sm:px-6 bg-surface-subtle" aria-labelledby="how-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="how-heading" className="section-heading">{t('how_heading')}</h2>
          <p className="section-subheading">{t('how_sub')}</p>
          <div className="howStepsGrid grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {howItWorks.map(({ step, icon }) => {
              const titleKey = (`how_step${step}_title`) as 'how_step1_title' | 'how_step2_title' | 'how_step3_title';
              const descKey  = (`how_step${step}_desc`)  as 'how_step1_desc'  | 'how_step2_desc'  | 'how_step3_desc';
              return (
              <div key={step} className="howStep flex flex-col items-center text-center gap-4 animate-fade-up">
                <div className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center text-3xl shadow-lg" aria-hidden="true">{icon}</div>
                <div
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-sm -mt-2"
                  style={{ background: 'var(--surface)', borderColor: 'var(--brand-200)', color: 'var(--brand-700)' }}
                  aria-hidden="true"
                >{step}</div>
                <h3 className="text-lg font-semibold text-strong">{t(titleKey)}</h3>
                <p className="text-sm text-muted leading-relaxed">{t(descKey)}</p>
              </div>
            );})}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="homeStats py-14 px-4 sm:px-6 bg-brand" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Our Numbers</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map(({ value }, i) => {
            const labelKey = (['stat_happy_families', 'stat_verified_helpers', 'stat_satisfaction', 'stat_rating'] as const)[i];
            return (
              <div key={value} className="statItem animate-fade-up">
                <div className="text-4xl font-extrabold">{value}</div>
                <div className="text-brand-light text-sm mt-1">{t(labelKey)}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="homeTestimonials py-20 px-4 sm:px-6 bg-surface" aria-labelledby="reviews-heading">
        <div className="max-w-6xl mx-auto">
          <h2 id="reviews-heading" className="section-heading">{t('reviews_heading')}</h2>
          <p className="section-subheading">{t('home_reviews_sub')} {name}.</p>
          <div className="testimonialsGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section className="homeCta py-16 px-4 sm:px-6 bg-brand-gradient text-white" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-extrabold">{t('home_cta_heading')}</h2>
          <p className="text-brand-light text-lg max-w-xl">
            {t('home_cta_sub')} {name} {t('home_cta_sub2')}
          </p>
          <div className="homeCtaActions flex flex-wrap gap-4 justify-center">
            <Link
              href="/hire"
              className="bg-surface text-brand font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-md"
            >
              {t('home_hire_today')}
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp px-8 py-3"
              aria-label="Chat on WhatsApp"
            >
              💬 {t('whatsapp_cta')}
            </a>
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="btn btn-whatsapp px-8 py-3 flex items-center gap-2"
              aria-label={`Call us at ${SITE_CONFIG.phone}`}
            >
              <Phone size={16} aria-hidden="true" /> {SITE_CONFIG.phone}
            </a>
            <a
              href={`tel:${SITE_CONFIG.phoneTel2}`}
              className="btn btn-whatsapp px-8 py-3 flex items-center gap-2"
              aria-label={`Call us at ${SITE_CONFIG.phone2}`}
            >
              <Phone size={16} aria-hidden="true" /> {SITE_CONFIG.phone2}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
