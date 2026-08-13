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

- **2026-08-14** — **Nav dropdowns + Case Manager polish.**
  - **Global nav dropdowns** (`components/layout/Nav.tsx` + `.module.css`):
    replaced the placeholder link-only nav with real hover/focus dropdown
    panels — **Products** (2-col grid, icon tiles + taglines, "Soon" badge on
    the disabled Abacus), **Solutions** (4-column mega-menu grouped by domain
    with icons + descriptions, domain dots use the raw palette vars), and
    **Industries** (list with blurbs); **Company** stays a plain link. Content
    comes from `lib/nav-data.ts`; icons resolve via `lib/icons.ts` `getIcon()`.
    Panels are **solid** (`background: var(--bg)`, opaque) with a hairline
    `--line-2` border and **no shadow** (depth = solid fill + border, per the
    hard rules) — deliberately NOT translucent/glass so page content behind
    doesn't bleed through. Opens on hover/focus with a ~120ms close-delay bridge
    (`.dropdownRow` starts at `var(--nav-h)` so there's no hover gap), Escape to
    close, chevron rotates when open; hidden under 900px (mobile burger lists
    the top-level links).
  - **Case Manager fixes:** (1) RBAC AccessGraph node pills made **opaque**
    (`background: var(--bg)`; state via border/selected-fill only) so connector
    lines no longer show through the boxes; (2) `LineageStrip` given proper
    side gutters (`.inner` with `padding-inline: var(--gutter)`); (3) `Workflow`
    graph rebuilt — the edge SVG now uses a **pixel-accurate viewBox** measured
    via `ResizeObserver` (no `preserveAspectRatio="none"` stretching), so the
    main chain is clean straight horizontal connectors, the branch is a smooth
    cubic-bézier curve, and `<marker>` arrowheads render true-size; node cards
    are opaque and sit above the edges.

- **2026-08-14** — **Case Manager page rebuilt from the reference design**
  (supersedes the 2026-08-06 bespoke layout). Ported the bespoke Case Manager
  page from the external reference build (`sqaid-website-reference`,
  `case-manager` branch — CRA + Tailwind + shadcn) onto our stack via the same
  faithful **token translation** as Argus/Faro. New structure in
  `pages/products/case-manager/` (one `.tsx` + `.module.css` per section)
  composed by `CaseManagerPage.tsx`, plus shared `data.ts` and `primitives.tsx`.
  - **Signature device — alternating `Band` rhythm:** the page stacks
    `<Band tone="dark">` / `<Band tone="light">` sections; a `light`-tone band
    renders in the OPPOSITE mode via the global `.invert` utility, so the page
    reads as stacked light/dark halves that all swap when the site theme flips.
    The `Band` primitive also exposes SPACE-separated neutral channels
    `--fg-rgb` / `--bg-rgb` (tracking the band's effective mode) that child
    sections use for arbitrary-alpha hairlines and the dense `DotGrid` backdrop.
  - **Shared primitives** (`case-manager/primitives.tsx`): `Band`, `MonoLabel`,
    `GhostNumeral`, `MaskLines`, `Crosshair`, `DotGrid`, `BrowserChrome`,
    `PlaybackControls` (scripted replay/step/reset + pips). Sections, in order:
    **Hero** (live case-Designer canvas), **Schema** (configurable field model →
    live JSON), **DesignerDeepCut** (case-view builder + audit log),
    **Workflow** (lifecycle graph with a branch reveal), solid-violet **Marquee**
    divider (black-on-violet), **RBAC** (policy composer + access graph),
    **LegacyScenario** (legacy-vs-SqAId dual rail race + procurement table),
    **AuditView** (lifecycle mock + live audit feed, parallax), **LineageStrip**,
    solid-violet **Cta**.
  - **RBAC AccessGraph re-laid-out:** the reference graph looked distorted
    (crammed nodes, crossing straight edges). Rebuilt as a clean padded
    tripartite grid (roles | policies | scopes, x≈10/50/90, y≈18..84 in
    `data.ts`) with column headers + guide lines and **smooth horizontal
    cubic-bézier connectors** instead of straight diagonals.
  - **One intentional fixed-mode exception** — LegacyScenario's two rails are a
    deliberate side-by-side dark/light contrast that does NOT flip with the
    theme: each rail is a self-contained CSS scope pinning `--bg`/`--fg-rgb`
    (LEGACY always dark, SQAID always light).
  - **Closing moment:** the Marquee band and the Cta are the deliberate
    BLACK-on-violet moments (`background: var(--accent); color: var(--black)`;
    translucent-black hairlines via a local `--on: 10 11 13` channel) — unlike
    Argus/Faro CTAs which used `--accent-contrast`. Reuses the Argus/Faro
    learnings (space-separated channels, no Framer-animated SVG geometry, DOM
    pulse rings, relative scroll targets). Verified in dark + light. Build green.

- **2026-08-14** — **Faro page rebuilt from the reference design** (supersedes the
  2026-08-06 Faro split-screen layout). Ported the bespoke Faro page from the
  external reference build (`sqaid-website-reference/`, `faro` branch — CRA +
  Tailwind + shadcn) onto our stack via the same faithful **token translation**
  established for Argus (Tailwind → CSS Modules; `#2f6bff`/`rgb(var(--fg-rgb)/α)`/
  `.hair`/`.glass`/`.noise` → `var(--accent)`/`--text*`/`--line*`/`--surface*`/
  glass/omit). New structure lives in `pages/products/faro/` (one `.tsx` +
  `.module.css` per section) composed by `FaroPage.tsx`, plus shared `data.ts`
  (scrubbed content) and `primitives.tsx` (same `MonoLabel`/`GhostNumeral`/
  `MaskLines`/`FrameChrome` set as Argus). Sections, in order: **Hero** (masked
  headline + live **ConvergenceCanvas** — fraud-lane + AML-lane signal chips
  converging via animated connectors onto one center verdict card, replay/step +
  pips), **ConvergenceDeepCut** ("one pipeline, two lenses" taxonomy → one scoring
  function), **CrossRail** (300vh scroll-driven cross-rail money trace down vertical
  rail columns — a clean structured zig-zag, not random), **PipelineRail** (rAF
  traveling-txn rail; rendered in a global `.invert` band = half-light/half-dark),
  editorial **Marquee** strip, **Copilot** (analyst-rationale ↔ raw-evidence split
  with center stitch), **VerdictEvidence** (parallax verdict mock + one-number
  checklist), **LineageStrip**, ambient decision-tape + solid-accent **DecisionTapeCTA**.
  - **Reused the Argus learnings verbatim:** the Hero SVG foreground uses the local
    **space-separated** `--gfg` channel (`255 255 255` dark / `10 11 13` light) so
    `rgb(var(--gfg)/α)` stays valid (comma-separated → black/invisible); traveling
    dots use SMIL `<animateMotion>` (never Framer-animated SVG geometry attrs);
    pulse rings are DOM `<motion.span>` scale/opacity; useScroll targets are
    `position: relative`. Verified visible in **both dark and light** modes.
  - **Build:** two stray `*/` inside header comments (a token list `--text*/…` in
    JSX and a CSS comment) prematurely closed comments and broke tsc/postcss —
    fixed by rewording the comments. `npm run build` green.
  - Delivered via a Sonnet dev-agent fan-out (foundation `data.ts`/`primitives`
    hand-authored for a stable contract, then one agent per section, then integration).

- **2026-08-13** — **Argus page rebuilt from the reference design** (supersedes the
  2026-08-06 Argus "agent fleet" layout below — the `Marquee` + crew `Carousel` +
  screenshot gallery are **replaced**). Ported the bespoke Argus page from the
  external reference build (`sqaid-website-reference/`, a CRA + Tailwind + shadcn
  design) onto our stack via a faithful **token translation** (Tailwind utility
  classes → CSS Modules; the reference's `#18e29a`/`rgb(var(--fg-rgb)/α)`/`.hair`/
  `.glass`/`.noise` → `var(--accent)`/`--text*`/`--line*`/`--surface*`/glass/
  `<NoiseOverlay>`). New structure lives in `pages/products/argus/` (one `.tsx` +
  `.module.css` per section) composed by `ArgusPage.tsx`, plus shared `data.ts`
  (content + graph data) and `primitives.tsx` (`MonoLabel`, `GhostNumeral`,
  `MaskLines`, `FrameChrome`). Sections, in order: **Hero** (masked headline +
  auto-playing knowledge-graph with replay/step), **AlertSarSplit** (full-bleed
  raw-alert-JSON / SAR-narrative split with a scroll-grown center stitch),
  **RulesDispatch** (sequential dispatch viz), **FleetComposer** (interactive
  build-your-own-squad), **FundsTrace** (340vh scroll-driven hop-0→12 graph),
  editorial **Marquee** strip, **SurfacesGallery** (parallax surface mocks),
  **LineageStrip**, solid-accent **Cta**.
  - **Half-light/half-dark:** the reference toggled a page-local `data-theme`; we
    dropped that and use the global `[data-theme]` + the **`.invert`** utility for
    opposite-mode regions (AlertSarSplit bottom half; SurfacesGallery band). No
    page-local nav/footer/theme-toggle — the global Layout provides them.
  - **Scroll graph is a STRUCTURED layered DAG (not spiral, not random):** the
    reference's funds-trace layout was a radial/spiral (`angle = spread*300 +
    hop*17°`), rejected. A first pass used a fully random scatter — also rejected
    (looked messy). Final: `data.ts::buildHopGraph()` builds a **seeded
    (deterministic) left→right layered DAG** — each hop is a column, nodes spread
    across a vertical band that widens with node count, so the trace fans out from
    the seed and converges toward the horizon. Structured/legible, no ring/spiral/
    grid; seeding removes per-render jitter.
  - **Rule fix during port:** the reference hop-decay legend used a
    `linear-gradient` (banned) — replaced with **5 discrete stepped-opacity
    swatches** of `var(--accent)`. No gradients/shadows introduced anywhere.
  - **Glitch fixes:** (a) Hero pulse ring used Framer to animate the SVG `r`
    attribute → emitted `<circle r="undefined">`; swapped to a SMIL `<animate>`
    (matches FundsTrace). (b) RulesDispatch loop snapped `0→len+1→0` with a
    visible flash → now a self-scheduling timeout chain that holds the complete
    state then fades before restart. (c) `SurfacesGallery .row` (a `useScroll`
    target) made `position: relative`. All motion guards on reduced-motion.
  - **Review-round refinements (same day):** (1) Hero graph — the VERDICT node
    chip was too small so "SAR · 92" overflowed; widened the rect + shrank the
    label to fit, and boosted node-label / node-stroke / secondary-edge contrast
    for legibility. (2) FundsTrace graph reworked from random → structured layered
    DAG (see above). (3) FleetComposer — the hover detail expanded the chip
    in-flow which, with Framer `layout`, reflowed every sibling ("distortion");
    made `.chipMeta` an **absolute glass popover** (chip size never changes → no
    reflow; `.canvas` set `overflow: visible`). (4) SurfacesGallery — replaced the
    bespoke placeholder mocks (which also referenced a non-existent `--fg-rgb`
    token) with the **real product screenshots** from
    `public/assets/products/argus/` (ingestion/signals/agents/flows/graph-explorer/
    mcp).
  - Build green; verified in browser dark + light (the `.invert` split flips
    correctly; funds-trace graph confirmed structured; fleet hover popover no
    longer reflows; surfaces show real screenshots). Two handoff briefs added for
    the other flagships: `.claude/faro-redesign-handoff.md` and
    `.claude/case-manager-redesign-handoff.md` (companions to
    `argus-redesign-handoff.md`).

- **2026-08-06** — **Argus bespoke page + dynamic elements on all product pages.**
  - **Argus** (`pages/products/ArgusPage.tsx`, green) now exists as a bespoke
    page (was falling through to the bare `ProductPage` placeholder). Signature =
    the **agent fleet**: a `Marquee` of agent names, an interactive drag
    **`Carousel` of the 12-agent "crew"** in a light `.invert` band, and a
    swipeable **screenshot gallery `Carousel`** (dashboard/ingestion/signals/
    agents/flows/graph-explorer/mcp copied into `public/assets/products/argus/`).
    Route added before the dynamic template.
  - **Dynamic elements added to every product page** (reusing existing
    primitives): a **`Marquee`** keyword strip, an interactive **`Carousel`** of
    product-specific cards (Faro = payment channels, Case Manager = alert types,
    Abacus = boards-you'll-build with mini sparklines, Argus = agent crew +
    screenshot gallery), and the primary hero/CTA buttons wrapped in
    **`Magnetic`** (cursor-follow, reduced-motion safe).
  - **Faro radar removed.** The hero right/light half no longer has the rotating
    radar; it now uses a masked **dot-grid backdrop** (single accent color +
    mask fade — allowed) behind the enlarged screenshot panel + floating verdict
    card (both parallaxed).
  - Carousel/Marquee/Magnetic all degrade under `prefers-reduced-motion`
    (Marquee stops, Magnetic no-ops) and stay within the palette / no-gradient /
    no-shadow rules.
- **2026-08-06** — **Bespoke product pages** for Faro, Case Manager, and Abacus
  (Argus got its own bespoke page the same day — see the entry above; the
  data-driven `ProductPage` template now only serves fallback/unknown slugs).
  Each page has a **unique
  structural signature** but shares the palette, type, parallax, and
  no-shadow/no-gradient rules:
  - **`.invert` primitive** (in `global.css`): a class that always renders the
    OPPOSITE of the current mode (light panel in dark mode, dark panel in light
    mode, and it flips when the theme flips). It re-declares only the mode
    tokens (bg/surface/line/text/scrim); **accent tokens are untouched** so the
    product accent carries across both halves. This is the shared mechanism
    behind every "half light / half dark" split — no new hues, no gradients.
  - **Faro** (`pages/products/FaroPage.tsx`) — signature = full-bleed **vertical
    split-screen** hero (left = current mode, right = `.invert`), a live
    "risk-score" verdict card + radar over the light half. Capabilities bento
    with parallax columns; a **light `.invert` "pipeline" band** whose accent
    rail fills on scroll (`useScroll`); verdict section with the faro.png frame
    (parallax); accent CTA with concentric-circle geometry.
  - **Case Manager** (`pages/products/CaseManagerPage.tsx`) — signature =
    **stacked alternating bands** (each section flips `.invert` ↔ current mode,
    so the page reads as horizontal light/dark halves that swap with the theme).
    Hero "configuration canvas" (floating glass chips + connectors, CSS float,
    NOT Parallax — a transformed Parallax wrapper becomes a zero-height
    containing block and collapses `%` offsets); 6-feature bento; designer band
    with case-manager.png; **workflow node-graph** with a scroll-independent
    SMIL dot (gated off under reduced-motion); RBAC IAM-policy code card;
    legacy-vs-SqAId comparison; CTA.
  - **Abacus** (`pages/products/AbacusPage.tsx`) — signature = **diagonal
    clip-path split** hero (one wedge is `.invert`) + a **checkerboard** of
    metric tiles where every other tile is `.invert` (literal light/dark
    checker). Coming-soon forward: bar/line data-viz (parallax), capability
    cards, illustrative preview tiles with mini sparklines, status meta, CTA.
  - Routing: explicit `/products/faro|case-manager|abacus` lazy routes added
    BEFORE the dynamic `/products/:slug` in `App.tsx`.
  - Bespoke-page icons are imported directly from `lucide-react` (not via the
    `icons.ts` registry, which is only for `nav-data` string names).
- **2026-07-30** — Product screenshots (Faro/Argus/Case Manager) added under
  `public/assets/products/` and shown as a **uniformly darkened, faded**
  background behind each card's Key-features grid (`opacity .28` + `brightness`
  filter on solid black — NO gradient/vignette mask; kept symmetric).
- **2026-07-30** — Chose **Option B (pinned focus rail)** for Capabilities and
  wired it into the landing; deleted the preview page + Option A. The right-side
  numeral was replaced with a **bespoke line-art SVG set** (one per domain:
  Fraud=shield/scan, AML=node graph, Compliance=document/check, AI=processor)
  in `CapabilityGraphics.tsx` — stroke `currentColor` so each takes the domain
  accent, cohesive faint outer ring, no gradients. Graphics parallax + swap on
  scroll. (Note: hand-built SVGs, not AI raster art, to stay on-system.)
- **2026-07-30** — Bento Capabilities felt off-language vs the rest of the page;
  preserved on branch **`capabilities-bento`**. Building alternatives on
  **`capabilities-parallax`** that keep the big pinned section heading + overlap
  + parallax: **Option A** (overlap bento + parallax columns) and **Option B**
  (pinned focus rail with a huge parallax numeral). Compare at
  `/preview/capabilities`; the chosen one gets wired into the landing.
  Hero H1 enlarged and reworded to two balanced lines ("Turn alert overload
  into / decisions you can defend.").
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
