# CLAUDE.md — SqAId website (v2)

Guidance for AI agents working in this repo. Read this first.

## ⚠️ Standing rule: keep the design system in sync

**`.claude/design.md` is the single source of truth for all design decisions.**

- **Before** changing anything visual (colors, type, spacing, shadows,
  components, tokens), READ `.claude/design.md` and follow its hard rules.
- **Whenever a design decision is made or changed** — in the same change —
  UPDATE `.claude/design.md`: adjust the relevant section AND add a dated entry
  to the **Decision log** at the top of section 5.
- Never leave `design.md` describing something the code no longer does.

Treat `design.md` as a reusable skill: it should be complete enough that a
fresh agent can restyle any component correctly without re-deriving the rules.

### Non-negotiable design rules (summary — full detail in design.md)
1. Palette is **exactly five colors**: Black, White, Faro Blue, Argus Green,
   Case Violet. Vary with **opacity only**; never add a hue.
2. **No box-shadows, no glows.** Use real `border` + translucent surfaces.
3. **No color gradients** (including gradient text). Transparency & `mask`
   edge-fades are fine.
4. Reference **CSS variables**, never raw hex, in component styles.

## Project

- **Stack:** Vite + React 18 + TypeScript, React Router v6, CSS Modules +
  design tokens, Framer Motion + Lenis. Icons: lucide-react. No UI kit.
- **Fonts:** Sora (display) · Inter (body) · JetBrains Mono (data).
- See `README.md` for the full folder map and scripts.

## Conventions

- Path alias `@/` → `src/`.
- One component = one `.tsx` + optional co-located `.module.css`.
- Design tokens: `src/styles/tokens.css` (mode) + `src/styles/themes.css`
  (product accents). Base + utilities in `src/styles/global.css`.
- Content/taxonomy lives in `src/lib/nav-data.ts`; pages render from it.
- Animations must degrade under `prefers-reduced-motion`.

## Commands

```bash
npm run dev      # dev server
npm run build    # typecheck + production build
npm run lint     # typecheck only
```
