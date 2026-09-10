'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import { SERVICE_ICONS, SERVICE_IMAGES } from '@/components/serviceIcons';
import type { ServiceSlug } from '@/config/site.config';

interface Props {
  title: string;
  shortDesc: string;
  slug: ServiceSlug;
}

export default function ServiceCard({ title, shortDesc, slug }: Props) {
  const { t } = useLang();
  const Icon = SERVICE_ICONS[slug];
  const image = SERVICE_IMAGES[slug];

  return (
    <Link
      href={`/services#${slug}`}
      className="serviceCard card p-0 overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300"
      aria-labelledby={`service-card-${slug}`}
    >
      <div className={`relative aspect-[5/6] w-full flex items-center justify-center overflow-hidden ${image ? 'bg-brand-50' : 'icon-chip rounded-none'}`}>
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        ) : (
          <Icon size={40} aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-col gap-2 p-5 flex-1">
        <h3 id={`service-card-${slug}`} className="serviceCardTitle text-lg font-semibold text-strong">{title}</h3>
        <p className="serviceCardDesc text-sm text-muted flex-1">{shortDesc}</p>
        <span className="serviceCardLink inline-flex items-center gap-1 text-sm font-medium text-brand transition-all group-hover:gap-2">
          {t('service_card_learn_more')} <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
