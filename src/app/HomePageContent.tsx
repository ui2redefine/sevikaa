'use client';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import HomeHero from '@/components/HomeHero';
import { HOW_IT_WORKS_ICONS } from '@/components/serviceIcons';

export default function HomePageContent() {
  const { t } = useLang();
  const { name, services, testimonials, howItWorks } = SITE_CONFIG;

  return (
    <>
      <HomeHero />

      {/* ── Services ──────────────────────────────────────── */}
      <section className="homeServices section-y px-4 sm:px-6 bg-surface" id="services" aria-labelledby="services-heading">
        <div className="max-w-6xl mx-auto">
          <h2 id="services-heading" className="section-heading">{t('services_heading')}</h2>
          <p className="section-subheading">{t('home_services_sub')}</p>
          <div className="servicesGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((s, i) => (
              <div key={s.slug} style={{ animationDelay: `${i * 80}ms` }} className="animate-fade-up">
                <ServiceCard
                  slug={s.slug}
                  title={t(`service_${s.slug.replace(/-/g, '_')}_title`)}
                  shortDesc={t(`service_${s.slug.replace(/-/g, '_')}_short`)}
                />
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
      <section className="homeHowItWorks section-y px-4 sm:px-6 bg-surface-subtle" aria-labelledby="how-heading">
        <div className="max-w-5xl mx-auto">
          <h2 id="how-heading" className="section-heading">{t('how_heading')}</h2>
          <p className="section-subheading">{t('how_sub')}</p>
          <div className="howStepsGrid grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {howItWorks.map(({ step }) => {
              const titleKey = (`how_step${step}_title`) as 'how_step1_title' | 'how_step2_title' | 'how_step3_title';
              const descKey  = (`how_step${step}_desc`)  as 'how_step1_desc'  | 'how_step2_desc'  | 'how_step3_desc';
              const Icon = HOW_IT_WORKS_ICONS[step];
              return (
                <div key={step} className="howStep flex flex-col items-center text-center gap-4 animate-fade-up">
                  <div className="relative" aria-hidden="true">
                    <div className="w-14 h-14 rounded-2xl bg-brand text-white flex items-center justify-center shadow-md">
                      <Icon size={24} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface border border-default text-brand text-xs font-bold flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-strong">{t(titleKey)}</h3>
                  <p className="text-sm text-muted leading-relaxed">{t(descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="homeTestimonials section-y px-4 sm:px-6 bg-surface" aria-labelledby="reviews-heading">
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
      <section className="homeCta section-y px-4 sm:px-6 bg-brand-900 text-white" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white">{t('home_cta_heading')}</h2>
          <p className="text-brand-light text-lg max-w-xl">
            {t('home_cta_sub')} {name} {t('home_cta_sub2')}
          </p>
          <div className="homeCtaActions flex flex-wrap gap-3 justify-center mt-1">
            <Link href="/hire" className="btn bg-surface text-brand hover:opacity-90 px-8">
              {t('home_hire_today')}
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp px-8"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={16} aria-hidden="true" /> {t('whatsapp_cta')}
            </a>
          </div>
          <p className="text-brand-light text-sm">
            {t('call_cta')}:{' '}
            <a href={`tel:${SITE_CONFIG.phoneTel}`} className="font-semibold text-white hover:underline">{SITE_CONFIG.phone}</a>
            {' · '}
            <a href={`tel:${SITE_CONFIG.phoneTel2}`} className="font-semibold text-white hover:underline">{SITE_CONFIG.phone2}</a>
          </p>
        </div>
      </section>
    </>
  );
}
