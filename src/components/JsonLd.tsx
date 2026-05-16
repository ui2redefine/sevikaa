import { SITE_CONFIG } from '@/config/site.config';
import { TRANSLATIONS } from '@/i18n/translations';

export default function JsonLd() {
  const en = TRANSLATIONS.en as unknown as Record<string, string>;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phoneTel,
    email: SITE_CONFIG.email,
    image: `${SITE_CONFIG.url}/logo.jpg`,
    logo: `${SITE_CONFIG.url}/logo.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.pincode,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.1339,
      longitude: 77.6101,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '08:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '09:00', closes: '17:00' },
    ],
    sameAs: Object.values(SITE_CONFIG.social).filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Domestic Helper Services',
      itemListElement: SITE_CONFIG.services.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name: en[`service_${s.slug.replace(/-/g, '_')}_title`], description: en[`service_${s.slug.replace(/-/g, '_')}_short`] },
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
