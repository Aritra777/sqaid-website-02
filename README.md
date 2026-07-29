# SqAId — Website (v2)

A modern, high-tech marketing site for the SqAId AI-native risk & compliance
platform. Rebuilt design system; animation-first.

## Stack

- **Vite + React 18 + TypeScript**
- **React Router v6** — routing
- **Framer Motion** — component + scroll-linked animation, parallax, gestures
- **Lenis** — smooth scroll (the backbone for the parallax feel)
- **CSS Modules + design tokens** — bespoke styling, no UI component library
- **lucide-react** — icons
- Signature graphics are hand-built (SVG / Canvas 2D) — see `components/graphics`

> 3D is intentionally deferred. If a single 3D moment is wanted later, add
> `@react-three/fiber` lazy-loaded and scoped to one component.

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm run preview  # preview the build
npm run lint     # typecheck only
```

## Project structure

```
src/
├─ main.tsx                 App entry (Router + SmoothScroll + ScrollToTop)
├─ App.tsx                  Route table (lazy-loaded pages)
├─ styles/
│  ├─ reset.css             Modern reset
│  ├─ tokens.css            AXIS 1 — design tokens (mode: dark/light)
│  ├─ themes.css            AXIS 2 — per-product accent themes
│  └─ global.css            Base elements + utilities (imports the above)
├─ lib/                     Data + hooks + helpers
│  ├─ nav-data.ts           Products / solutions / industries taxonomy
│  ├─ site.ts               Site identity + contact constants
│  ├─ motion.ts             Shared Framer Motion presets/variants
│  ├─ use-theme.ts          Light/dark mode (AXIS 1)
│  ├─ use-document-title.ts Per-page <title>
│  ├─ use-prefers-reduced-motion.ts
│  └─ cn.ts                 classNames joiner
├─ providers/
│  ├─ SmoothScroll.tsx      Lenis provider (respects reduced motion)
│  └─ ScrollToTop.tsx       Reset scroll on route change
├─ components/
│  ├─ layout/               Nav, Footer, Layout, PageHeader, ThemeToggle
│  ├─ ui/                   Button, Container, Eyebrow, Badge, SectionHeading, Brand
│  ├─ motion/               Reveal, Parallax, Magnetic
│  └─ graphics/             ParticleField, GradientOrbs, GridBackdrop, NoiseOverlay
├─ sections/
│  └─ landing/              Hero, ProductSuite, ContactCTA (+ TODOs)
└─ pages/                   Landing, ProductPage, SolutionPage, IndustryPage,
                            Company, NotFound
```

## Design system — two axes

Theming is controlled by two independent axes (ported from v1, new palette):

1. **Mode** (`[data-theme="dark|light"]` on `<html>`) — surfaces, text, borders,
   shadows. Toggled in the navbar. Default = dark.
2. **Accent** (`.theme-faro`, `.theme-argus`, …) — per-product accent tokens.
   Wrap a page/section root in the class; it works in both modes.

**Always reference CSS variables**, never raw hex, in component styles.

## Conventions

- Path alias `@/` → `src/`.
- One component = one `.tsx` + optional co-located `.module.css`.
- Animations degrade gracefully under `prefers-reduced-motion`.
- Content lives in `lib/nav-data.ts`; pages/templates render from it.

## TODO / next up

- Landing sections: Problem, Platform, Process, Industries, About, social proof.
- Bespoke product pages (Argus graph explorer, Faro pipeline viz).
- Nav mega-menus (Solutions/Products/Industries dropdown panels).
- Real logo vector + OG/social images in `public/assets`.
```
