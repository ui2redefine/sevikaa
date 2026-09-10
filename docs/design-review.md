# Sevikaa — Design Review & Improvement Plan

_Date: 2026-09-10. Reviewed: home, services, about, hire, contact — desktop (1280px) + mobile (390px), light + dark. Screenshots driven with headless Chrome._

## TL;DR

The site is functional and the new pink theme is applied everywhere, but it reads
as a generic template: emoji stand in for icons, every section shares the same pale-pink
background, type is uniformly extra-bold, and the home page repeats its stats and its
CTAs. Dark mode has one real bug (hero gradient). Mobile layout is sound — no overflow
(an earlier "clipping" report was a screenshotting artifact; verified `scrollWidth == clientWidth`
on every page at 390px). Hamburger and theme toggle both work when driven programmatically —
a user seeing them "dead" has a stale service worker cached from an earlier `npm run start`.

## A. Bugs / correctness (do regardless of the design pass)

1. **Dark-mode hero gradient.** `HomeHero.tsx:28` sets an inline
   `linear-gradient(135deg, var(--brand-50), var(--surface), var(--brand-50))`.
   `--brand-*` is deliberately *not* remapped in dark mode, so on a dark page this paints a
   light-pink → near-black → light-pink diagonal wash. Fix: drive it from a token that flips
   (e.g. `--surface-subtle` + `--surface`) or add a `[data-mode="dark"]` override. Same issue
   on the decorative blobs (`:36`).

2. **Stats rendered twice on the home page.** Hero stat cards (`HomeHero` `.heroStatsGrid`)
   and the pink stats band lower down (`HomePageContent`) show identical numbers. Keep one.
   Recommendation: drop the hero cards, keep the band — it frees the hero's right column.

3. ~~Dev-only colour-theme picker leaks into `npm run dev`.~~ **INTENTIONAL — leave as-is.**
   `Navbar.tsx:118` renders `<ColorThemePicker/>` in dev only; that second icon next to the
   dark-mode toggle is expected and never ships to production.

4. **Stale service worker.** Not a code bug in the current tree, but this repo has shipped a
   `sw.js` before (`aa46bb0`). A browser still controlled by that worker serves an old shell →
   "hamburger / toggle don't work", "old logo on About". Options: ship a self-unregistering
   `public/sw.js` kill-switch, or document the DevTools → Application → Unregister step.

5. ~~`LocationBanner` on every page.~~ **INTENTIONAL — leave as-is.** Only one location today;
   the disabled "Change city" selector is a deliberate coming-soon affordance.

## B. Design improvements (proposed — needs your sign-off on scope)

### B1. Iconography — replace emoji with `lucide-react` (already a dependency)
- Services (🏠 👨‍🍳 👶 👴 🏥 🏡), How-It-Works steps, and About's ✅ bullet list all use raw
  emoji. They render differently per OS and undercut the "verified / professional" message.
- Replace with lucide glyphs in a tinted circular chip (`bg-brand-50`, `text-brand-700`,
  `rounded-xl`, 40–48px). Map: house-maid→`Home`, cook→`ChefHat`, babysitter→`Baby`,
  elder-care→`HeartHandshake`, patient-care→`Stethoscope`, live-in→`House`.
- About bullets → `CheckCircle2` in `text-brand-600`.

### B2. Navbar
- The 1254px logo-with-tagline shrunk to 36px is an illegible smudge. Use just the "Sevikaa"
  wordmark on `< lg`, or a cropped emblem-only asset. Give the `<Image>` a fixed square with
  `object-cover` framing the emblem.
- Mobile control row is busy (moon, palette, phone, hamburger). Drop the palette (B3), and
  consider folding the phone link into the drawer.

### B3. Layout rhythm & backgrounds
- Hero, How-It-Works and the home CTA are all `bg-surface-subtle` (pale pink) → the page is
  one flat wash. Alternate: white → pale-pink → white → **deep-plum** (`--brand-900`) for the
  final CTA so it has weight.
- Introduce `--section-py` (e.g. `clamp(3rem, 8vw, 5.5rem)`) and use it everywhere instead of
  ad-hoc `py-16` / `py-12` / `py-14`.

### B4. Typography scale
- Everything is `font-extrabold`. Set a hierarchy: hero `800`, section headings `700`,
  card/step titles `600`, body `400`. Reduce hero to `text-4xl sm:text-5xl` (the `lg:text-6xl`
  is shouty on desktop).

### B5. Service cards (home + services page)
- Tighten vertical padding, make the **entire card** the link (not a weak "Learn more →"),
  add `hover:-translate-y-0.5` + shadow. Icon chip top-left, title, one-line description,
  a right-aligned chevron.

### B6. Hero (mobile especially)
- Sequence before any content: H1 + sub + 2 buttons + **2 large call cards** + 4 trust chips.
  Collapse the two call cards into a single compact "Call us — <n1> · <n2>" row; keep trust
  chips but as a tighter single-line scroll.

### B7. "How It Works" step markers
- Currently an emoji-in-pink-circle with a separate white-ringed number floating beneath.
  Redesign as one 56px circle: number top-corner badge OR a lucide icon, not both.

### B8. Footer
- Social buttons keep native brand colours (FB blue, IG gradient, X black, WA green) on the
  plum footer — noisy. Make them `bg-white/10` circles with white glyphs; let WhatsApp keep
  green as the one accent. (Bottom-bar legal text contrast was already fixed.)

### B9. CTA button overload
- Home CTA and About CTA each stack 4 buttons (primary + WhatsApp + 2 phone numbers).
  Reduce to **2 buttons** (Hire / WhatsApp) + a plain "or call 9180… / 7397…" line.

### B10. Colour discipline
- `btn-whatsapp` green appears all over next to pink. Restrict green to the FAB and literal
  "WhatsApp" actions; everything else uses `btn-primary` / `btn-secondary`.
- Replace inline `style={{ color: 'var(--gray-500)' }}` etc. in `HomeHero` with the existing
  `text-muted` / `text-subtle` utilities; audit `--gray-500` on `--brand-50` for contrast.

## Status — implemented 2026-09-10

- A3 (dev theme picker) and A5 (LocationBanner) — **intentional, closed.**
- **A1 done** — hero background moved to `.hero-surface` (surface tokens, flips with theme);
  blobs use `--surface-subtle`.
- **A2 done** — standalone home stats band removed; the hero stat cards are the single source.
- **B1 done** — `serviceIcons.ts` maps slugs/steps to lucide icons; emoji removed from
  ServiceCard, ServicesPageContent, AboutPageContent values + belief bullets. New `.icon-chip`.
- **B2 done** — nav shows wordmark only below `sm`; larger, tighter tracking.
- **B3 done** — `--section-py` + `.section-y` utility used across home/about/services;
  home CTA is now the deep-plum band (`.bg-brand-900`).
- **B4 done** — `.section-heading` to weight 700; hero capped at `text-5xl`.
- **B5 done** — whole ServiceCard is the link; icon chip; hover lift kept.
- **B6 done** — two hero call cards collapsed into one with both numbers.
- **B7 done** — How-It-Works marker is one rounded-square lucide icon + corner number badge.
- **B8 done** — footer social buttons monochrome `white/10`; WhatsApp keeps green.
- **B9 done** — home + about CTAs reduced to 2 buttons + an "or call" line.
- **B10 partial** — `MessageCircle` replaces 💬 in hero/CTA/contact; hero inline color
  styles swapped for `text-muted`/`text-subtle`/`text-strong`. `btn-whatsapp` green still
  used for WhatsApp actions by design.

## Suggested implementation order

1. **Bugs first** — A1, A2. Small, self-contained.
2. **B1 icons + B7 steps** — biggest visual credibility gain.
3. **B3 rhythm + B4 type + B5 cards** — fixes the "template" feel.
4. **B2 navbar, B6 hero, B8 footer, B9/B10 CTAs** — polish.

Each numbered item is independent; pick a subset.
