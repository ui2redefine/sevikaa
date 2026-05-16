import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import HirePageContent from './HirePageContent';

export const metadata: Metadata = {
  title: SITE_CONFIG.pageMeta.hire.title,
  description: SITE_CONFIG.pageMeta.hire.description,
};

export default function HirePage() {
  return <HirePageContent />;
}
