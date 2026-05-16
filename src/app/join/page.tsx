import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import JoinPageContent from './JoinPageContent';

export const metadata: Metadata = {
  title: SITE_CONFIG.pageMeta.join.title,
  description: SITE_CONFIG.pageMeta.join.description,
};

export default function JoinPage() {
  return <JoinPageContent />;
}
