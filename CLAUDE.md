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

### Non-negotiable design rules (summary — full detail in design.md §1)
1. **Light is the default.** White canvas + one `#f5f5f7` band. Dark mode
   exists behind the nav toggle and must keep working.
2. **One accent** (`--accent`) sitewide for links and CTAs. Product hues set
   only `--mark` — icon tiles and 2px rules, never text, never a large fill.
3. Saturated accent stays under **~10%** of any component's area.
4. **No colour gradients.** One shadow token on cards; no glows.
5. **`100svh` is not a section height** — only Argus `FundsTrace` and Faro
   `CrossRail` pin, because there the scroll *is* the interaction.
6. Hierarchy from **weight and spacing**, not scale. Headings are semibold;
   64px hero / 36px section is the ceiling.
7. **No decorative chrome** — see design.md §4 "Removed, do not reintroduce".
8. Reference **CSS variables**, never raw hex, in component styles.
9. **Every number comes from `lib/metrics.ts`.** Never hard-code a stat;
   `npm run verify:metrics` fails the build if you do.

## Project

- **Stack:** Vite + React 18 + TypeScript, React Router v6, CSS Modules +
  design tokens, Framer Motion + Lenis. Icons: lucide-react. No UI kit.
- **Fonts:** Inter (display + body) · JetBrains Mono (figures/labels).
- **Design reference:** apple.com for restraint and rhythm; niceactimize.com
  for enterprise trust structure.
- See `README.md` for the full folder map and scripts.

## Conventions

- Path alias `@/` → `src/`.
- One component = one `.tsx` + optional co-located `.module.css`.
- Design tokens: `src/styles/tokens.css` (mode) + `src/styles/themes.css`
  (product accents). Base + utilities in `src/styles/global.css`.
- Content/taxonomy lives in `src/lib/nav-data.ts`; body copy in
  `src/lib/domains-content.ts` and `industries-content.ts`; pages render from it.
- **Icons:** add every new `icon:` string to `src/lib/icons.ts` — unregistered
  names silently fall back to a generic `Box` glyph, with no build-time check.
- **Numbers:** `src/lib/metrics.ts` only. Customer claims need a `source` or
  they are filtered out of the page.
- **Trust signals:** `src/lib/trust.ts` (logos / analyst recognition / case
  studies) is intentionally empty; sections self-hide until it is populated.
- Animations must degrade under `prefers-reduced-motion`.

## Commands

```bash
npm run dev             # dev server
npm run build           # typecheck + metrics guard + production build
npm run lint            # typecheck only
npm run verify:metrics  # what is publishable / still awaiting real data
```
