import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE_CONFIG } from '@/config/site.config';
import { LanguageProvider } from '@/i18n/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import JsonLd from '@/components/JsonLd';
import Analytics from '@/components/Analytics';
import PwaInstallPrompt from '@/components/PwaInstallPrompt';
import LocationBanner from '@/components/LocationBanner';
import ThemeProvider from '@/components/ThemeProvider';
import SwRegistration from '@/components/SwRegistration';

export const viewport: Viewport = {
  themeColor: SITE_CONFIG.themeColor,
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: SITE_CONFIG.name },
  formatDetection: { telephone: true },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: SITE_CONFIG.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    site: SITE_CONFIG.twitterHandle,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: SITE_CONFIG.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* ── No-FOUC: apply saved theme/mode before first paint ── */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var m = localStorage.getItem('_gs.mode');
            if (m === 'dark') document.documentElement.setAttribute('data-mode', 'dark');
            var t = localStorage.getItem('_gs.color-theme') || 'default';
            if (t && t !== 'default') document.documentElement.setAttribute('data-color-theme', t);
          } catch(e) {}
        `}} />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <JsonLd />
        <Analytics />
        <SwRegistration />
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <LocationBanner />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <WhatsAppFAB />
            <PwaInstallPrompt />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
