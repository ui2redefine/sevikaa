import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import ServicesPageContent from './ServicesPageContent';

export const metadata: Metadata = {
  title: SITE_CONFIG.pageMeta.services.title,
  description: SITE_CONFIG.pageMeta.services.description,
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
