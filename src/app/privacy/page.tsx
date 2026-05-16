import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import PrivacyPageContent from './PrivacyPageContent';

export const metadata: Metadata = {
  title: SITE_CONFIG.pageMeta.privacy.title,
  description: SITE_CONFIG.pageMeta.privacy.description,
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
