# Sportshandicapper Build Plan

A premium dark-themed sports handicapping platform with aurora animations, glassmorphism cards, and three routes.

## Tech & Setup
- TanStack Start + React 19 + TS + Tailwind v4 (already scaffolded)
- Add Inter via Google Fonts in `__root.tsx`
- Lucide icons (already installed)
- Logo: I will generate a "Sportshandicapper" logo as `src/assets/logo.png` (you can swap it later for your own)

## Design System (`src/styles.css`)
Extend with:
- Color tokens (oklch equivalents of #060818, #1E90FF, #22D3EE, #A855F7, #10B981, slate #94A3B8)
- Utility classes: `.container-x`, `.btn-primary`, `.btn-secondary`, `.card-premium`, `.eyebrow`, `.gradient-text`, `.divider-glow`
- Keyframes: `aurora-float-1..4`, `conic-spin`, `scan-beam`, `fade-up`
- No grid background pattern

## Shared Components (`src/components/`)
- `AuroraBackground.tsx` — 4 blurred radial blobs, conic shimmer, scan beam, noise overlay, vignette
- `ParticleField.tsx` — canvas, ~110 particles, indigo/violet, line connections (client-only via `useEffect`)
- `Navbar.tsx` — floating pill, logo, center links with "New" badge & live dot, Data & Tools dropdown (Betting Tools, Live Odds, Consensus, Trends — all "Soon"), Log In, Join Now gradient CTA
- `Footer.tsx` — logo, tagline, product/legal links, 21+ disclaimer
- `ScrollReveal.tsx` — IntersectionObserver wrapper, fade-up + stagger
- `Counter.tsx` — animated count-up on scroll into view
- `PickCard.tsx`, `ArticleCard.tsx`, `PackageCard.tsx` — reusable
- `SiteLayout.tsx` — wraps Aurora + Particles + Navbar + Outlet + Footer (used in `__root.tsx`)

## Routes
1. **`src/routes/index.tsx`** — Hero (with ROI Simulator glass card), Exclusive Articles (1 featured + 2 stacked), Active Picks (1 whale featured + 3 stacked), Trust Stats Bar (4 counters), Membership Packages (6 cards, 3-col, Most Popular highlighted), Data & Tools (4 cards with "Soon"), About Us (2-col with stat grid)
2. **`src/routes/picks.tsx`** — 9 pick cards in 3-col grid, locked cards show blur + "Members Only" overlay
3. **`src/routes/packages.tsx`** — 4 tier cards (Free Trial, Weekly $79, Monthly $249 highlighted, Premium Season $899)

Each route sets unique `head()` meta (title, description, og:title, og:description).

## Root Updates
- `__root.tsx`: add Inter font link, wrap `<Outlet />` in `SiteLayout` (Aurora + Particles + Navbar + Footer)
- Update default meta to Sportshandicapper

## Content Specifics
All copy, prices, stats, matchups, authors, dates exactly as specified in your message.

## Technical Notes
- ParticleField & Counter use `useEffect` so SSR-safe (no `ssr: false` needed)
- Aurora animations: pure CSS keyframes on absolute-positioned blurred divs
- Logo: generated PNG asset, imported as ES6 module
- No backend / no Lovable Cloud (purely static marketing UI)

Ready to build on approval.