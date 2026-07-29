# SqAId — Design System (source of truth)

> This file is the canonical record of every design decision on this site.
> **Whenever a design decision is made or changed, update this file in the same
> change.** Treat it as a skill/reference: read it before touching styles.

Tokens live in `src/styles/tokens.css` (mode) and `src/styles/themes.css`
(accents). **Always reference CSS variables — never raw hex — in components.**

---

## 1. Hard rules (do not break without explicit sign-off)

1. **Palette = Black + White + four product accents:** Faro Blue, Argus Green,
   Case Violet, Abacus Yellow. Create variation with **opacity only** — never
   introduce a new hue. (cyan/rose/etc. are gone.)
2. **No box-shadows.** No drop-shadows, no glows. Depth = translucent surfaces
   + hairline borders. "Borders" are real `border`, never `inset box-shadow`.
3. **No color gradients.** No `linear-gradient`/`radial-gradient` used as a
   visible multi-hue or color→color fill. No gradient text.
4. **Transparency IS the effect.** rgba surfaces, rgba borders, and
   `mask-image` edge fades are encouraged (they use one color + alpha).

### Explicitly allowed (not considered "gradients/shadows")
- `mask-image: linear-gradient(...)` for edge fades (transparency, single color).
- The 1px grid-line technique in `GridBackdrop` (`linear-gradient` renders
  hard 1px solid lines from a single accent color — no visible fade).
- `backdrop-filter: blur()` for glass nav (transparency effect, not a shadow).
- SVG turbulence noise overlay (texture via alpha).

---

## 2. Color

### Raw palette (`--black --white --blue --green --violet`)
| Token | Value | Meaning |
|-------|-------|---------|
| `--black` | `#0a0b0d` | base / page bg (dark) |
| `--white` | `#ffffff` | base / page bg (light) |
| `--blue`  | `#2f6bff` | **Faro** accent |
| `--green` | `#18e29a` | **Argus** accent |
| `--violet`| `#7c5cff` | **Case Manager** accent |

### Surfaces & text — built from white/black + opacity
- Dark mode: surfaces are `rgba(255,255,255, .03–.09)` over `--black`; text is
  `rgba(255,255,255, .96 / .62 / .40 / .26)`.
- Light mode: mirror with `rgba(10,11,13, …)` over white.
- Borders: `--line / --line-2 / --line-strong` = white(or black) at .08/.14/.24.

### Accent tokens (per product, set in themes.css)
`--accent`, `--accent-contrast` (text on solid accent), `--accent-soft` (~10%
fill), `--accent-softer` (~5%), `--accent-border` (~40%), `--accent-line` (~16%,
for grids/hairlines). No `--accent-glow`, no gradients.

### Product ↔ color mapping (AXIS 2 · `.theme-*`)
| Product | Class | Accent |
|---------|-------|--------|
| Faro | `.theme-faro` | Blue |
| Argus | `.theme-argus` | Green (dark contrast text on solid) |
| Case Manager | `.theme-case-manager` | Violet |
| Abacus | `.theme-abacus` | Yellow `#ffc233` (dark contrast text on solid) |

Default accent (no theme wrapper) = **Faro Blue** (brand primary).

Solution **domains** map to the four accents too: Fraud→Blue, AML→Green,
Compliance→Violet, AI→Yellow (used by the Capabilities constellation).

---

## 3. Typography

- **Display / headings:** `Sora` (700/800 for big-bold moments). `--font-display`
- **Body:** `Inter`. `--font-sans`
- **Data / labels / eyebrows / code:** `JetBrains Mono`. `--font-mono`
- Loaded via Google Fonts in `index.html`.
- Fluid scale via `clamp()`: `--fs-display` (hero, up to 8rem) → `--fs-xs`.
- Display line-height `--lh-tight: 0.98`, tracking `--tracking-tight: -0.03em`.
- Big-bold beats (hero H1, `BigStatement`) use Sora 700, tight leading, and
  an accent-colored `<em>` (solid color, not gradient).

---

## 4. Layout & motion

- **Containers:** `--container` (1280→1440), `--container-wide` (1600→1880),
  `--container-narrow` (780). Landing sections use **wide** so content reaches
  toward the edges on large screens (no narrow centered column).
- Section rhythm: `--section-y` clamp.
- **Motion:** Framer Motion + Lenis smooth scroll. Signature easing
  `--ease-out: cubic-bezier(.22,1,.36,1)`. Reveal-on-scroll (`whileInView`,
  once) is the default entrance. All motion degrades under
  `prefers-reduced-motion`.
- **Graphics** (`components/graphics`): `GridBackdrop`, `ParticleField` (canvas
  network, recolors to `--accent`), `NoiseOverlay`. `GradientOrbs` was
  **removed** (gradient-based).

### Decorative language (replaces gradients for visual interest)
Because gradients are banned, depth/interest comes from **geometry + glass**:
- **Geometric shapes:** concentric circles, crosshair lines, dots/plus marks,
  oversized "ghost" numerals, hairline rules. Stroke in `currentColor`/accent at
  low opacity. Parallax them for motion.
- **Glassmorphism:** translucent surface (`--surface`/`--surface-glass`) +
  `backdrop-filter: blur()` + 1px border. Use for cards/rows over textured or
  colored backdrops (needs something behind to blur).
- **Solid accent blocks:** a half/section painted solid `--accent` with
  `--accent-contrast` text is an intentional, encouraged contrast device.

---

## 5. Decision log (append newest at top)

- **2026-07-30** — Capabilities redesigned again → **asymmetric bento grid**
  (the constellation read as gimmicky/unprofessional). Three columns of glass
  tiles (a lead tile with big count + corner arcs, four domain tiles listing
  their solutions, a "Unified by design" tile with a dot grid) that **drift at
  different parallax speeds** on scroll. Not pinned.
- **2026-07-30** — Abacus regained its color: **Yellow `#ffc233`** (4th product
  accent). Product Showcase cards now **overlap-stack** (each card is a sticky
  direct child of the section, increasing z-index — previous stays pinned while
  the next slides over it; no fade, feels stationary). Capabilities rebuilt as
  a **pinned, scroll-driven** section (matching the Showcase feel): big heading
  pinned behind, a panel overlaps it, and while pinned the scroll advances the
  active domain — left content swaps, right "SqAId Core" constellation
  highlights it.
- **2026-07-30** — Hero: removed the animated particle graph (static grid only),
  shrank the H1, made it two-column with an **infinite vertical roller** of real
  solution cards (`SolutionsRoller`) on the right. Product Showcase reworked to
  **stacking cards**: pinned "Our Products" title behind, cards slide up and
  overlay it continuously (no blank gaps); "Use cases" → **"Key features"** as a
  2×2 glass card grid with icons.
- **2026-07-30** — Established decorative language (geometry + glassmorphism)
  to replace gradients. Rebuilt Product Suite as **`ProductShowcase`**: a
  pinned, scroll-driven section — per product, a **solid accent half-panel**
  (left, per theme) whose name slides in from the left and settles, while use
  cases reveal on the right with parallax geometry (circles, ghost numerals).
- **2026-07-30** — Locked palette to Black/White/Blue/Green/Violet + opacity.
  Removed ALL box-shadows, glows, and color gradients (incl. gradient text →
  solid `--accent`). Removed `GradientOrbs`. Abacus → neutral accent.
- **2026-07-30** — Type system switched to **Sora + Inter + JetBrains Mono**
  (was Space Grotesk + Inter). Hero/BigStatement enlarged for big-bold look.
- **2026-07-30** — Widened containers; landing uses `--container-wide`; hero
  left-aligned & full-height (stats pinned to baseline) instead of centered.
- **2026-07-29** — Initial system: two-axis theming (mode × product accent),
  CSS Modules + tokens, Vite/React/Framer/Lenis, 2D-first graphics.
