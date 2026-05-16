import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import HomePageContent from './HomePageContent';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  alternates: { canonical: SITE_CONFIG.url },
};

export default function HomePage() {
  return <HomePageContent />;
}
