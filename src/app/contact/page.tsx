import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site.config';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: SITE_CONFIG.pageMeta.contact.title,
  description: SITE_CONFIG.pageMeta.contact.description,
};

export default function ContactPage() {
  return <ContactPageContent />;
}
