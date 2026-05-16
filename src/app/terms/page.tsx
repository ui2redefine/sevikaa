import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import TermsPageContent from './TermsPageContent';

export const metadata: Metadata = {
  title: SITE_CONFIG.pageMeta.terms.title,
  description: SITE_CONFIG.pageMeta.terms.description,
};

export default function TermsPage() {
  return <TermsPageContent />;
}
