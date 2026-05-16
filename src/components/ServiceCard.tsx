'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

interface Props {
  icon: string;
  title: string;
  shortDesc: string;
  slug: string;
}

export default function ServiceCard({ icon, title, shortDesc, slug }: Props) {
  const { t } = useLang();

  return (
    <article
      className="serviceCard card flex flex-col gap-3 group hover:-translate-y-1 transition-transform duration-300"
      aria-labelledby={`service-card-${slug}`}
    >
      <div className="serviceCardIcon text-4xl" aria-hidden="true">{icon}</div>
      <h3 id={`service-card-${slug}`} className="serviceCardTitle text-lg font-semibold text-strong">{title}</h3>
      <p className="serviceCardDesc text-sm text-muted flex-1">{shortDesc}</p>
      <Link
        href={`/services#${slug}`}
        className="serviceCardLink inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand transition-colors group-hover:gap-2"
        aria-label={`${t('service_card_learn_more')} ${title}`}
      >
        {t('service_card_learn_more')} <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </article>
  );
}
