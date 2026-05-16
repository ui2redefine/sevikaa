import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import AboutPageContent from './AboutPageContent';

export const metadata: Metadata = {
  title: SITE_CONFIG.pageMeta.about.title,
  description: SITE_CONFIG.pageMeta.about.description,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
