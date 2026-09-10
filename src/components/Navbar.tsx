'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X , Languages } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import LanguageSwitcher from './LanguageSwitcher';
import { useLang } from '@/i18n/LanguageContext';
import ThemeToggle from './ThemeToggle';
import ColorThemePicker from './ColorThemePicker';
import HtmlLangSync from './HtmlLangSync';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  const { name, phone, phoneTel, phone2, phoneTel2 } = SITE_CONFIG;
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu when clicking outside the header
  useEffect(() => {
    if (!open) return;
    function onOutsideClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function onEscape(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [open]);

  const NAV_LINKS = [
    { href: '/',         label: t('nav_home') },
    { href: '/services', label: t('nav_services') },
    { href: '/about',    label: t('nav_about') },
    { href: '/contact',  label: t('nav_contact') },
  ];

  return (
    <>
      <HtmlLangSync />

      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        {t('skip_to_content')}
      </a>

      <header
        ref={navRef}
        className="navRoot sticky z-50 bg-surface border-b border-subtle shadow-sm backdrop-blur-md"
        style={{ top: 'env(safe-area-inset-top)' }}
        role="banner"
      >
        <div className="navInner max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center justify-between h-16 gap-6"
            aria-label="Main navigation"
          >
            {/* ── Logo ── */}
            <Link
              href="/"
              className="navLogo flex items-center gap-2.5 shrink-0"
              aria-label={`${name} — Home`}
            >
              <Image
                src="/sevikaa.jpg"
                alt=""
                width={36}
                height={36}
                className="rounded-xl object-contain shrink-0"
                priority
                aria-hidden="true"
              />
              <span className="font-bold text-base text-brand">{name}</span>
            </Link>

            {/* ── Desktop nav links ── */}
            <ul
              className="navLinks hidden lg:flex items-center gap-0.5 text-sm font-medium text-muted flex-1"
              role="list"
            >
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'text-brand font-semibold bg-surface-subtle'
                          : 'hover:bg-surface-subtle hover:text-brand'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ── Right controls ── */}
            <div className="navControls flex items-center gap-1.5 shrink-0">
              {/* Utility icons — dark mode + colour theme (dev only) + lang */}
              <ThemeToggle />
              {process.env.NODE_ENV !== "production" && <ColorThemePicker />}
              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>

              {/* Primary CTAs — desktop only */}
              <div className="hidden lg:flex items-center gap-2 ml-2">
                <Link href="/join" className="btn btn-secondary btn-sm">
                  {t('nav_join')}
                </Link>
                <Link href="/hire" className="btn btn-primary btn-sm">
                  {t('hire_cta')}
                </Link>
              </div>

              {/* Mobile: call links + hamburger */}
              <a
                href={`tel:${phoneTel}`}
                className="lg:hidden p-2 rounded-lg text-muted hover:text-brand hover:bg-surface-subtle transition-colors text-base leading-none"
                aria-label={`Call ${phone}`}
              >
                📞
              </a>
              <button
                onClick={() => setOpen(v => !v)}
                className="lg:hidden p-2 rounded-lg hover:bg-surface-subtle text-default transition-colors"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </button>
            </div>
          </nav>
        </div>

        {/* ── Mobile drawer ── */}
        {open && (
          <div
            id="mobile-menu"
            className="mobileMenu lg:hidden border-t border-subtle bg-surface px-5 pt-3 pb-7 animate-slide-down"
            role="dialog"
            aria-modal="false"
            aria-label="Mobile navigation menu"
          >
            <ul className="mobileMenuLinks flex flex-col gap-0.5 mb-4" role="list">
              {[...NAV_LINKS,
                { href: '/hire', label: t('hire_cta') },
                { href: '/join', label: t('nav_join') },
              ].map(({ href, label }) => {
                const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center px-4 py-3.5 rounded-xl font-medium transition-colors text-base ${
                        isActive
                          ? 'bg-surface-subtle text-brand font-semibold'
                          : 'hover:bg-surface-subtle text-default hover:text-brand'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mobileMenuFooter border-t border-subtle pt-4 flex flex-col gap-6">
              {/* <a
                href={`tel:${phoneTel}`}
                className="btn btn-whatsapp w-full btn-lg"
                aria-label={`Call us at ${phone}`}
              >
                {t('call_cta')} — {phone}
              </a>
              <a
                href={`tel:${phoneTel2}`}
                className="btn btn-whatsapp w-full btn-lg"
                aria-label={`Call us at ${phone2}`}
              >
                {t('call_cta')} — {phone2}
              </a> */}
              <Link
                href="/hire"
                className="btn btn-primary w-full btn-lg"
                onClick={() => setOpen(false)}
              >
                {t('hire_cta')}
              </Link>
              <div className="flex items-center gap-4 pt-1">
                <div className='flex items-center gap-2'>
                  <span className="text-sm font-medium">{t('nav_language')}:
                  </span>
                  <Languages size={20} className="text-muted mr-1 shrink-0" aria-hidden="true" />
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}