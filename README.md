# Sevikaa — Your Trusted Home Care Partner

Website for domestic helper placement services.

**Tech stack:** Next.js 16 · Tailwind CSS v4 · Web3Forms · Vercel Analytics · GA4 (optional)

---

## 🚀 Quick Start

```bash
git clone git@ssh_github_gs:sevikaa/sevikaa.git
cd sevikaa
npm install
cp .env.local.example .env.local   # fill in your keys
npm run dev                        # → http://localhost:4700
```

> Preview the production build locally: `npm run preview` → http://localhost:4700

---

## 🔑 Environment Variables

Copy `.env.local.example` → `.env.local` and fill in:

| Variable | Required | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | **Yes** | [web3forms.com](https://web3forms.com) → enter email → verify → copy Access Key |
| `NEXT_PUBLIC_GA_ID` | No | [analytics.google.com](https://analytics.google.com) → GA4 property → Measurement ID `G-XXXXXX` |
| `NEXT_PUBLIC_SITE_URL` | No | Your Vercel domain after first deploy |

> **Never commit `.env.local`** — it's already in `.gitignore`.

---

## 📝 Updating Business Details

**All contact info, services, social links in ONE file:**

```
src/config/site.config.ts
```

Change phone, email, address, WhatsApp number, social links, services, stats, testimonials here and it updates everywhere on the site automatically.

---

## 🌍 Adding / Updating Translations

Edit `src/i18n/translations.ts` — add new keys to all 3 language objects (`en`, `kn`, `hi`).

To add a new language:
1. Add to `SITE_CONFIG.languages` in `site.config.ts`
2. Add translation object to `TRANSLATIONS` in `translations.ts`
3. Add the `LangCode` type union in `translations.ts`

---

## 📲 PWA (Progressive Web App)

The site is installable on mobile as a PWA:
- `public/manifest.json` — app name, icons, theme colour
- iOS: "Add to Home Screen" from Safari
- Android: "Install App" banner auto-appears in Chrome

To add proper PWA icons, place:
- `public/icon-192.png` (192×192 PNG)
- `public/icon-512.png` (512×512 PNG)
...and update `manifest.json` icon `src` paths + `type` to `image/png`.

---

## ☁️ Deploy to Vercel

### Option A — GitHub → Vercel (recommended)

1. Push to GitHub (already done if you're reading this ✅)
2. Go to [vercel.com/new](https://vercel.com/new) → **Import Git Repository**
3. Select `sevikaa/sevikaa` → **Import**
4. Framework preset: **Next.js** (auto-detected)
5. **Environment Variables** — add before first deploy:
   - `NEXT_PUBLIC_WEB3FORMS_KEY` → your Web3Forms access key
   - `NEXT_PUBLIC_GA_ID` → `G-XXXXXX` (optional)
   - `NEXT_PUBLIC_SITE_URL` → `https://sevikaa.vercel.app` (or your custom domain)
6. Click **Deploy** — done in ~2 minutes

Every `git push` to `main` triggers a new production deploy automatically.

### Option B — CLI deploy
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Add env vars after first deploy
Vercel Dashboard → Project → **Settings** → **Environment Variables** → add → **Redeploy**.

### Enable Vercel Analytics
Vercel Dashboard → Project → **Analytics** tab → Enable

---

## 📁 Project Structure

```
src/
  app/                  # Next.js App Router pages
    page.tsx            # Home
    hire/               # Hire a Helper (form)
    join/               # Join as Helper (form)
    services/           # All services listing
    about/              # About Us
    contact/            # Contact (form + info)
    privacy/            # Privacy Policy
    terms/              # Terms of Service
    sitemap.ts          # Auto-generated sitemap.xml
    robots.ts           # robots.txt
  components/           # Shared UI components
    Navbar.tsx          # Sticky nav with skip link + language switcher
    Footer.tsx          # Footer with social links
    WhatsAppFAB.tsx     # Floating WhatsApp button
    HomeHero.tsx        # Hero section (client — uses translations)
    ServiceCard.tsx     # Service grid card
    TestimonialCard.tsx # Review card
    JsonLd.tsx          # Schema.org structured data
    Analytics.tsx       # Vercel Analytics + GA4
    LanguageSwitcher.tsx# EN / ಕನ್ನಡ / हिंदी switcher
  config/
    site.config.ts      # ★ SINGLE SOURCE OF TRUTH — update this file
  i18n/
    translations.ts     # All UI strings in EN, KN, HI
    LanguageContext.tsx  # React context + localStorage persistence
public/
  sevikaa.jpg           # Business logo
  manifest.json         # PWA manifest
scripts/
  deploy.sh             # One-command Vercel deploy
  update-all.js         # Master file-writer script
```

---

## 🔍 SEO Checklist

- [x] `<title>` and `<meta description>` on every page
- [x] OpenGraph + Twitter Card meta tags
- [x] Schema.org `LocalBusiness` JSON-LD
- [x] `sitemap.xml` auto-generated
- [x] `robots.txt` auto-generated
- [x] Canonical URLs
- [x] Mobile-first responsive
- [x] All images have `alt` text
- [ ] Add `public/og-image.png` (1200×630px) for social sharing previews
- [ ] Register on [Google Search Console](https://search.google.com/search-console) after deploy
- [ ] Submit sitemap URL: `https://your-domain.com/sitemap.xml`

---

## 📊 Analytics

### What's already wired (zero config)
| Event | How it's tracked |
|---|---|
| All pageviews | Vercel Analytics auto-tracks every route change |
| Web Vitals (LCP, CLS, INP) | Vercel Analytics collects automatically |
| Unique visitors, devices, countries | Vercel Analytics dashboard |

### What needs `NEXT_PUBLIC_GA_ID` + manual `gtag()` calls
GA4 loads automatically once the env var is set. **Custom events require calling `window.gtag()` in the relevant component.** A helper `src/lib/analytics.ts` is already in the codebase:

```ts
import { trackEvent } from '@/lib/analytics';

// Inside a form submit handler:
trackEvent('form_submit', { form_name: 'hire_helper', city: data.city });

// Inside a button click handler:
trackEvent('whatsapp_click', { source: 'hire_page' });
trackEvent('call_click', { source: 'navbar' });
```

| Event to track | Where to add it | GA4 event name |
|---|---|---|
| Form submissions | `HireForm`, `JoinForm`, `ContactForm` — after successful POST | `form_submit` |
| WhatsApp button tap | `WhatsAppFAB` + any inline WhatsApp links | `whatsapp_click` |
| Call button tap | Navbar call link + Hire page | `call_click` |
| PWA install | `PwaInstallPrompt` — after `outcome === 'accepted'` | `pwa_install` |

Vercel Analytics tracks **all** of the above as page-level signals automatically; GA4 events give you filterable funnel data.

---

## 📋 Forms

There are **3 contact forms**, all using [Web3Forms](https://web3forms.com) (free, no backend needed):

| Form | Route | File | Who fills it |
|---|---|---|---|
| **Hire a Helper** | `/hire` | `src/app/hire/HireForm.tsx` | Customer — service type, area, contact |
| **Join as Helper** | `/join` | `src/app/join/JoinForm.tsx` | Worker — skills, area, availability |
| **Contact Us** | `/contact` | `src/app/contact/ContactForm.tsx` | Anyone — general enquiry |

### Web3Forms — how it works
- **Free forever** — no account dashboard, no database, no server needed
- You submit a `POST` to `https://api.web3forms.com/submit` with `multipart/form-data`
- Web3Forms emails the submission to whichever email you verified your access key with
- **No fixed schema** — you can add any field name and it appears in the email
- Only **one required field**: `access_key` (the rest is free-form)

### Fields Web3Forms uses if present
| Field name | Purpose |
|---|---|
| `access_key` | **Required** — your account key from web3forms.com |
| `subject` | Email subject line you'll see in your inbox |
| `from_name` | Sender display name in the email |
| `redirect` | URL to redirect after submit (we handle it in JS instead) |
| `botcheck` | Hidden honeypot field — leave empty, bots fill it |
| Anything else | `name`, `phone`, `city`, `service` — all appear in the email body |

> **One form or three?** Three is better for this business — it lets you pre-fill `subject` per form ("Hire Request", "Helper Registration", "Contact") so your inbox is instantly scannable. You could use one generic form, but you'd lose that context.

### To create a new form
1. Add `*Form.tsx` (client component) in `src/app/<route>/` — copy any existing form as template
2. Set `access_key` from `SITE_CONFIG.web3formsKey` (or `process.env.NEXT_PUBLIC_WEB3FORMS_KEY`)
3. Set a descriptive `subject` and `from_name`
4. Add whatever fields make sense — no registration needed on web3forms.com
5. Add i18n keys to `src/i18n/translations.ts` (all 3 language blocks)
6. Create a thin `page.tsx` server wrapper for metadata, import the form component

---

## 🛠️ Common Tasks

### Add a new service
Edit `SITE_CONFIG.services` array in `src/config/site.config.ts` — auto-appears in nav, services page, forms.

### Change phone number
Update `phone` and `phoneTel` in `site.config.ts`.

### Update social media URLs
Update `social.facebook`, `social.instagram`, `social.twitter` in `site.config.ts`.

### Add a new testimonial
Add to `SITE_CONFIG.testimonials` array in `site.config.ts`.

### Update stats (families served, etc.)
Update `SITE_CONFIG.stats` array in `site.config.ts`.

---
