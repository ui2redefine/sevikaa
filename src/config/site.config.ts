/**
 * ============================================================
 *  SITE CONFIGURATION — Single source of truth
 *  Update business details here; changes reflect site-wide.
 * ============================================================
 */

export const SITE_CONFIG = {
  // ── Business Identity ──────────────────────────────────────
  name: 'Gruha Saathi',
  tagline: 'Your Trusted Home Care Partner',
  description:
    'Gruha Saathi connects Bangalore families with verified, trained domestic helpers — house maids, cooks, nannies, elder care, and patient care. Fast placement. 100% verified.',
  url: 'https://gruhasaathi.vercel.app', // ← update after deploy

  // ── Contact ────────────────────────────────────────────────
  phone: '+91 77957 12371',
  phoneTel: '+917795712371',
  email: 'contact@gruhasaathi.com',
  whatsapp: '917795712371',
  whatsappMessage: 'Hi Gruha Saathi! I need help finding a domestic helper.',

  // ── Address ────────────────────────────────────────────────
  address: {
    street: '#71, 1st Floor, Country Nest, STS Road, Sathnur Village Bagalur',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560063',
    country: 'India',
    mapLink: 'https://maps.google.com/?q=Bagaluru+Bengaluru+Karnataka',
  },

  // ── Social ────────────────────────────────────────────────
  social: {
    facebook: 'https://facebook.com/gruhasaathi',    // ← update with real URL
    instagram: 'https://instagram.com/gruhasaathi',  // ← update with real URL
    twitter: 'https://twitter.com/gruhasaathi',      // ← update or remove
    youtube: '',
  },

  // ── Stats ─────────────────────────────────────────────────
  stats: [
    { value: '50+' },
    { value: '100+' },
    { value: '98%'  },
    { value: '4.9★' },
  ],

  // ── Services ──────────────────────────────────────────────
  services: [
    {
      slug: 'house-maid',
      icon: '🏠',
      features: ['Daily cleaning & mopping', 'Utensil washing', 'Laundry & ironing', 'Part-time or full-time'],
    },
    {
      slug: 'cook',
      icon: '👨‍🍳',
      features: ['Customised menu', 'Multi-cuisine', 'Dietary restrictions', 'Morning & evening shifts'],
    },
    {
      slug: 'babysitter',
      icon: '👶',
      features: ['Infant to toddler care', 'First-aid trained', 'Activity & learning support', 'Flexible hours'],
    },
    {
      slug: 'elder-care',
      icon: '👴',
      features: ['Medication reminders', 'Mobility assistance', 'Companionship', 'Doctor visit support'],
    },
    {
      slug: 'patient-care',
      icon: '🏥',
      features: ['Post-surgery care', 'Medication management', 'Hygiene assistance', 'Doctor coordination'],
    },
    {
      slug: 'live-in-helper',
      icon: '🏡',
      features: ['24x7 support', 'All-in-one domestic help', 'Long-term placements', 'Pre-screened & trained'],
    },
  ],

  // ── Testimonials ──────────────────────────────────────────
  testimonials: [
    {
      name: 'Priya Sharma',
      city: 'Bangalore',
      service: 'House Maid',
      rating: 5,
      text: 'Found a reliable maid within 24 hours! The helper is hardworking and trustworthy. Gruha Saathi made the whole process stress-free.',
    },
    {
      name: 'Rajesh Kumar',
      city: 'Bangalore',
      service: 'Elder Care',
      rating: 5,
      text: 'The caretaker for my father has been outstanding — punctual, caring, and professional. Highly recommend their elder care service.',
    },
    {
      name: 'Anita Desai',
      city: 'Mysore',
      service: 'Nanny',
      rating: 5,
      text: 'Our nanny is wonderful with our toddler. Background-verified and trained. We feel safe and our kid loves her!',
    },
    {
      name: 'Vikram Nair',
      city: 'Bangalore',
      service: 'Patient Care',
      rating: 5,
      text: 'Very professional patient care attendant for my mother post-surgery. Gruha Saathi verified everything — total peace of mind.',
    },
  ],

  // ── How It Works ──────────────────────────────────────────
  howItWorks: [
    { step: 1, icon: '📝' },
    { step: 2, icon: '🤝' },
    { step: 3, icon: '✅' },
  ],

  // ── SEO / OG ──────────────────────────────────────────────
  ogImage: '/og-image.png',
  twitterHandle: '@gruhasaathi',
  /** PWA / browser tab theme colour — matches --brand-700 in globals.css */
  themeColor: '#047857',
  keywords: [
    'domestic helpers Bangalore',
    'house maid Bangalore',
    'verified maid service Bengaluru',
    'nanny babysitter Bangalore',
    'elder care helper Bengaluru',
    'patient care attendant Bangalore',
    'cook helper Bangalore',
    'live-in helper Bangalore',
    'domestic staff agency Bengaluru',
    'Gruha Saathi',
    'gruhasaathi',
  ],

  // ── Supported languages ───────────────────────────────────
  languages: [
    { code: 'en', label: 'English' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'हिंदी' },
  ],

  // ── Colour theme swatches (= --brand-700 per theme) ───────
  // Used by ColorThemePicker; update if theme CSS vars change.
  themePrimaries: {
    default: '#047857',
    emerald: '#047857',
    rose:    '#be123c',
    saffron: '#c2410c',
    slate:   '#334155',
    teal:    '#0f766e',
    violet:  '#6d28d9',
  },

  // ── Per-page SEO metadata ─────────────────────────────────
  pageMeta: {
    home: {
      // title comes from name + tagline (see layout.tsx template)
      description: 'Gruha Saathi connects Bangalore families with verified, trained domestic helpers — house maids, cooks, nannies, elder care & patient care. Fast placement.',
    },
    hire: {
      title: 'Hire a Helper',
      description: 'Request a verified domestic helper — house maid, cook, nanny, elder or patient care. Gruha Saathi calls you back in 30 minutes with matched profiles.',
    },
    join: {
      title: 'Join as Helper',
      description: 'Register as a domestic helper with Gruha Saathi — maids, cooks, nannies, elder care. Free registration. Find steady work near your home.',
    },
    about: {
      title: 'About Us',
      description: 'Gruha Saathi — trusted domestic helper placements in Bangalore. We personally know and verify every helper we place.',
    },
    services: {
      title: 'Our Services',
      description: 'Explore verified domestic helper services: house maids, cooks, nannies, elder care, patient care, and live-in helpers across Bangalore.',
    },
    contact: {
      title: 'Contact Us',
      description: 'Get in touch with Gruha Saathi for domestic helper services in Bangalore. Call, WhatsApp, or use our contact form.',
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'Privacy policy for Gruha Saathi — how we collect, use, and protect your personal information.',
    },
    terms: {
      title: 'Terms of Service',
      description: 'Terms of service for Gruha Saathi domestic helper placement services.',
    },
  },
} as const;

export type ServiceSlug = typeof SITE_CONFIG.services[number]['slug'];
