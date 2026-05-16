'use client';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site.config';
import { useLang } from '@/i18n/LanguageContext';
import { Phone, Mail, MapPin } from 'lucide-react';

const SOCIAL_LINKS = [
  { href: SITE_CONFIG.social.facebook,  label: 'Facebook',   abbr: 'f',   color: 'hover:bg-blue-600' },
  { href: SITE_CONFIG.social.instagram, label: 'Instagram',  abbr: '📷',  color: 'hover:bg-pink-600' },
  { href: SITE_CONFIG.social.twitter,   label: 'Twitter / X', abbr: '𝕏', color: 'hover:bg-gray-700' },
  {
    href: `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMessage)}`,
    label: 'WhatsApp', abbr: '💬', color: 'hover:bg-green-600',
  },
];

export default function Footer() {
  const { t } = useLang();
  const { name, phone, phoneTel, email, address } = SITE_CONFIG;

  const SERVICE_LINKS = SITE_CONFIG.services.map(s => ({ href: `/services#${s.slug}`, label: t(`service_${s.slug.replace(/-/g, '_')}_title`) }));
  const QUICK_LINKS = [
    { href: '/',        label: t('nav_home') },
    { href: '/hire',    label: t('nav_hire') },
    { href: '/join',    label: t('nav_join') },
    { href: '/about',   label: t('nav_about') },
    { href: '/contact', label: t('nav_contact') },
    { href: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <footer className="footerRoot bg-gray-900 text-gray-300 pt-14 pb-6" role="contentinfo">
      <div className="footerInner max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="footerBrand">
          <Link href="/" className="flex items-center gap-2 mb-3" aria-label={`${name} — Home`}>
            <Image src="/logo.jpg" alt={`${name} logo`} width={40} height={40} className="rounded-lg" />
            <span className="text-white font-bold text-lg">{name}</span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400 mb-4">{t('footer_tagline')}</p>
          <div className="footerSocialLinks flex gap-2" role="list" aria-label="Social media links">
            {SOCIAL_LINKS.filter(s => s.href).map(({ href, label, abbr, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${label}`}
                role="listitem"
                className={`w-8 h-8 rounded-full bg-gray-700 ${color} flex items-center justify-center text-xs font-bold text-white transition-colors`}
              >
                {abbr}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <nav className="footerServicesNav" aria-label="Services links">
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">{t('footer_nav_services')}</h3>
          <ul className="space-y-2 text-sm">
            {SERVICE_LINKS.map(({ href, label }) => (
              <li key={href}><Link href={href} className="hover:text-orange-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Quick Links */}
        <nav className="footerQuickNav" aria-label="Quick links">
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">{t('footer_nav_quick')}</h3>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map(({ href, label }) => (
              <li key={href}><Link href={href} className="hover:text-orange-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="footerContactInfo">
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">{t('footer_nav_contact')}</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${phoneTel}`} className="flex items-start gap-2 hover:text-orange-400 transition-colors font-medium text-green-400" aria-label={`Call us at ${phone}`}>
                <Phone size={15} className="mt-0.5 shrink-0" aria-hidden="true" />{phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="flex items-start gap-2 hover:text-orange-400 transition-colors" aria-label={`Email us at ${email}`}>
                <Mail size={15} className="mt-0.5 shrink-0" aria-hidden="true" />{email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-orange-400" aria-hidden="true" />
              <a href={address.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
                {address.street}, {address.city}, {address.state} {address.pincode}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footerBottom max-w-6xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} {name}. {t('footer_rights')}</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
