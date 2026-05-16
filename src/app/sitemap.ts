import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const now = new Date();

  const staticPages = ['', '/services', '/hire', '/join', '/about', '/contact'].map(path => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const servicePages = SITE_CONFIG.services.map(s => ({
    url: `${base}/services#${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
