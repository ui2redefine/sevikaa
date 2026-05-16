'use client';
import { MapPin, ChevronDown } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';

// Future: expand this list when new cities are added
const LOCATIONS = [
  { city: 'Bengaluru', active: true },
  { city: 'Mysuru', active: false },
  { city: 'Mangaluru', active: false },
  { city: 'Hubballi', active: false },
] as const;

export default function LocationBanner() {
  const { t } = useLang();

  return (
    <div
      className="locationBanner w-full bg-brand-50 border-b border-subtle px-4 py-2"
      role="complementary"
      aria-label="Service location"
    >
      <div className="locationBannerInner max-w-6xl mx-auto flex items-center justify-between gap-3 text-sm">

        {/* Current location badge */}
        <div className="locationBadge flex items-center gap-1.5 text-brand font-medium">
          <MapPin size={14} aria-hidden="true" className="text-brand-700 shrink-0" />
          <span>
            {t('location_serving')} <strong>{SITE_CONFIG.address.city}</strong>
          </span>
          {/* "More cities coming" pill */}
          <span className="hidden sm:inline badge bg-brand-100 text-brand text-xs ml-1">
            {t('location_more_cities')}
          </span>
        </div>

        {/* Future: city selector — disabled for now, shown as coming-soon */}
        <div
          className="flex items-center gap-1 text-gray-400 text-xs cursor-not-allowed select-none"
          title="City selector — coming soon"
          aria-label="City selector coming soon"
        >
          <span className="hidden sm:inline">{t('location_change_city')}</span>
          <ChevronDown size={13} aria-hidden="true" />
        </div>

      </div>
    </div>
  );
}
