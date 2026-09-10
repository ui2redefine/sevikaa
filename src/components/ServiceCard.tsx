'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import { SERVICE_ICONS } from '@/components/serviceIcons';
import type { ServiceSlug } from '@/config/site.config';

interface Props {
  title: string;
  shortDesc: string;
  slug: ServiceSlug;
}

export default function ServiceCard({ title, shortDesc, slug }: Props) {
  const { t } = useLang();
  const Icon = SERVICE_ICONS[slug];

  return (
    <Link
      href={`/services#${slug}`}
      className="serviceCard card flex flex-col gap-3 group hover:-translate-y-1 transition-transform duration-300"
      aria-labelledby={`service-card-${slug}`}
    >
      <span className="icon-chip w-11 h-11" aria-hidden="true">
        <Icon size={22} />
      </span>
      <h3 id={`service-card-${slug}`} className="serviceCardTitle text-lg font-semibold text-strong">{title}</h3>
      <p className="serviceCardDesc text-sm text-muted flex-1">{shortDesc}</p>
      <span className="serviceCardLink inline-flex items-center gap-1 text-sm font-medium text-brand transition-all group-hover:gap-2">
        {t('service_card_learn_more')} <ArrowRight size={14} aria-hidden="true" />
      </span>
    </Link>
  );
}
