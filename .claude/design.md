# SqAId — Design System (source of truth)

> This file is the canonical record of every design decision on this site.
> **Whenever a design decision is made or changed, update this file in the same
> change.** Treat it as a skill/reference: read it before touching styles.

Tokens live in `src/styles/tokens.css` (mode) and `src/styles/themes.css`
(accents). **Always reference CSS variables — never raw hex — in components.**

---

## 1. Hard rules (do not break without explicit sign-off)

1. **LIGHT is the default.** White canvas (`--bg`) with one neutral band
   (`--bg-1: #f5f5f7`) for alternating sections. Dark mode exists behind the
   nav toggle and must keep working, but light is what ships by default.
2. **ONE accent.** `--accent` (#1d4ed8) carries links, CTAs and focus rings —
   sitewide, on every page. Product hues do **not** override it.
3. **Product hues are non-text marks only.** A `.theme-*` class sets `--mark`,
   used for an icon tile, a 2px rule, or a bullet. Never for text, never as a
   large fill. This is why four products no longer read as a colour carousel.
4. **Accent stays under ~10% of any component's area.** Large regions use
   `--surface` / `--bg-1` with a `--line` hairline.
5. **No colour gradients.** `mask-image` fades and the single-colour 1px
   dot/grid technique are fine; a visible colour→colour fill is not.
6. **One shadow.** `--shadow-card` / `--shadow-card-hover` on raised cards
   only. No glows, no coloured shadows, no `inset box-shadow` as a border.
7. **`100svh`/`100vh` is not a section height.** Reserve full-viewport
   pinning for sections where **scroll *is* the interaction** — currently only
   Argus `FundsTrace` and Faro `CrossRail`. Everything else uses
   `padding-block: var(--section-y)` in normal document flow.
8. **Hierarchy comes from weight and spacing, not scale.** Headings are
   `--fw-semibold`; the scale tops out at `--fs-display` (64px) for a hero H1
   and `--fs-h2` (36px) for section headings. No local oversized titles.
9. **No decorative chrome.** No marquees, ghost numerals, particle fields,
   noise overlays, spinning geometry, or parallax drift. Motion is limited to
   a short fade-and-rise on scroll (`Reveal`) plus hover states.
10. **Reference CSS variables, never raw hex**, in component styles. The one
    exception is `#000` inside a `mask-image`, where it is an alpha stencil.
11. **Every number on the site comes from `lib/metrics.ts`.** See §2.5.

---

## 2. Colour

Every value below is contrast-verified against both canvases. Re-verify with
the script in the 2026-08-26 (c) decision-log entry before changing any of them.

### Light (default)
| Token | Value | On `#fff` | On `#f5f5f7` |
|-------|-------|-----------|--------------|
| `--text`   | `#1d1d1f` | 16.83 | 15.46 |
| `--text-2` | `#515154` |  7.91 |  7.26 |
| `--text-3` | `#6e6e73` |  5.07 |  4.66 |
| `--text-4` | `#86868b` |  3.62 |  3.33 — large text & non-text only |
| `--accent` | `#1d4ed8` |  6.70 |  6.15 |
| `--line`   | `#d2d2d7` | hairline borders | |

### Product marks (non-text, need 3:1)
| Product | `--mark` | On `#fff` | On `#f5f5f7` |
|---------|----------|-----------|--------------|
| Faro | `#1d4ed8` | 6.70 | 6.15 |
| Argus | `#00875a` | 4.55 | 4.18 |
| Case Manager | `#5b3fd9` | 6.65 | 6.11 |
| Abacus | `#9a6700` | 4.87 | 4.47 |

### Dark (toggle)
`--text #f5f5f7` (18.08) · `--text-2 #a1a1a6` (7.65) · `--text-3 #86868b`
(5.43) · `--accent #5b8dff` (6.28) on `#0a0b0d`. Product marks brighten to
`#5b8dff / #18e29a / #9d85ff / #ffc233`.

### 2.5 — Numbers are a colour-level rule
`lib/metrics.ts` is the only place a figure may be defined. Each carries a
`basis`: `derived` (computed from repo data), `spec` (needs an `owner`),
`statute` (needs a `citation`), or `customer` (needs a `source`). A `customer`
metric with no source is filtered out of every page by `publishedMetrics()`,
and `npm run verify:metrics` — which runs as part of `npm run build` — fails
if content hard-codes a stat or references an unknown id.

**Do not hard-code a number in a content file or component.** The one
exception is a product mockup carrying obviously-fake UI data, which must be
marked `metrics-guard:mock-ui` *and* visibly badged as sample data on screen.

---

## 3. Typography

**Inter only** for display and body; **JetBrains Mono** for figures, indices
and code-ish labels. Sora was dropped in the 2026-08-26 (c) rebuild — one
family, differentiated by weight, is the apple.com/Actimize pattern.

| Token | Range | Use |
|-------|-------|-----|
| `--fs-display` | 40 → 64px | hero `<h1>` only |
| `--fs-h1` | 32 → 48px | page titles, CTA headings |
| `--fs-h2` | 26 → 36px | section headings |
| `--fs-h3` | 20 → 24px | card / capability titles |
| `--fs-h4` | 17 → 19px | sub-headings |
| `--fs-lead` | 17 → 21px | ledes and intro paragraphs |
| `--fs-body` | 16px | body |
| `--fs-sm` / `--fs-xs` | 15 / 13px | secondary, meta |

- Headings are `--fw-semibold` (600), **not** bold. Hierarchy is weight and
  spacing, not scale contrast.
- `--tracking-tight: -0.022em` on headings; body sits at 0.
- `<em>` inside a heading is **not** recoloured. Emphasis is weight or wording.
- Do not define a local oversized title in a module. If a heading needs to be
  bigger than `--fs-h2`, that is a layout decision to raise here first.

---

## 4. Layout & motion

- **Containers:** `--container` (1024) for text-led sections — narrow enough to
  keep a readable measure; `--container-wide` (1280) for grids;
  `--container-narrow` (720) for prose. Section rhythm is `--section-y`
  (64 → 120px).
- **Section banding:** alternate `--bg` (white) and `--bg-1` (`#f5f5f7`) via the
  `.band` utility. That alternation *is* the visual rhythm — it replaces the
  decorative backdrops.
- **Radius:** `--r-md` (12) for tiles, `--r-lg` (18) for cards, `--r-pill` for
  buttons.
- **Depth:** a hairline `--line` border, plus `--shadow-card` on hover for
  raised cards. Nothing else.

### Motion
Framer Motion + Lenis smooth scroll. `--ease-out: cubic-bezier(.28,.11,.32,1)`.
The **only** entrance is `components/motion/Reveal` — a short fade-and-rise,
firing once. Plus hover states. That is the entire motion vocabulary.

All motion must degrade under `prefers-reduced-motion`.

### Removed — do not reintroduce
`ParticleField`, `GradientOrbs`, `NoiseOverlay`, `GridBackdrop`,
`IsometricCubes`, `Marquee`, `Magnetic`, `Parallax`, oversized ghost numerals,
spinning geometry, dot-grid backdrops, and the scroll-jacked landing sections
(`BigStatement`, `Capabilities`, `UseCasesScroll`, `SolutionsRoller`,
`TestimonialsScroll`). Glassmorphism is no longer used — surfaces are opaque.

**Kept:** Argus `FundsTrace` and Faro `CrossRail`. These are the only
full-viewport pinned sections on the site, because there the scroll *is* the
interaction rather than an effect applied to static content.

---

## 5. Decision log (append newest at top)

- **2026-08-26 (c)** — **Ground-up rebuild: light-first styling, 4 domain
  pages, typed metrics.** Requested as a complete overhaul referencing
  apple.com for styling and Actimize/Feedzai for structure.

  **What the references actually showed** (fetched, not recalled — I had
  Feedzai wrong from memory): Feedzai is **dark**, Actimize is **light**; both
  lead with heavy social proof (Actimize "1000+ clients · $6T protected daily"
  plus Celent/Datos recognition; Feedzai 12 tier-1 logos plus Chartis); both
  keep colour minimal (Actimize is white 80%+ with teal on 2–3 CTAs per
  section); Actimize manages hierarchy "via weight and spacing rather than
  extreme scale contrast". Direction chosen: apple.com restraint on a light
  canvas + Actimize's trust structure.

  - **Palette replaced — this required sign-off and got it.** The old brand
    blue `#2f6bff` scores **4.13 on the `#f5f5f7` band** (fails AA) and only
    4.50 on white; the neon green `#18e29a` and yellow `#ffc233` score **1.70
    and 1.61** on light and were unusable. A light rebuild was impossible
    without new hue values. New palette in §2, all verified. Verify script:
    ```
    python3 -c "
    def lin(v):
        v/=255.0
        return v/12.92 if v<=0.03928 else ((v+0.055)/1.055)**2.4
    def L(c):
        r,g,b=int(c[1:3],16),int(c[3:5],16),int(c[5:7],16)
        return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)
    def ratio(a,b):
        x,y=L(a),L(b); return (max(x,y)+0.05)/(min(x,y)+0.05)
    print(ratio('#1d4ed8','#ffffff'), ratio('#1d4ed8','#f5f5f7'))"
    ```
  - **`--accent` no longer varies per product.** `.theme-*` now sets only
    `--mark` (an icon tile / 2px rule). Links and CTAs are one blue sitewide.
  - **Solutions IA: 14 thin pages → 4 domain pages.** The 14 shared one
    skeleton and one set of stats, which is *why* the solution content read as
    filler. Each is now an anchored section inside its domain page with its own
    named typologies and detection signals. Pages went from ~350 words to
    **928–1160**. `lib/solutions-content.ts` deleted, replaced by
    `lib/domains-content.ts`. Legacy `/solutions/:capability` URLs redirect to
    `/solutions/:domain#:capability` via `LEGACY_SOLUTION_MAP`, so no link
    breaks.
  - **`lib/metrics.ts` + `npm run verify:metrics`.** The site carried ~72
    invented stat slots including "0 hallucinated facts" and "0 tolerated true
    misses" — legal exposure for a compliance vendor, not just weak copy. Every
    figure now declares a basis; unsourced `customer` claims are filtered out of
    the DOM and the guard fails the build on hard-coded stats. Currently
    **13/19 publishable**; the 6 pending are exactly the numbers a buyer cares
    about and need real data (see §2.5).
  - **`lib/trust.ts`** — empty registries for customer logos, analyst
    recognition and case studies. `TrustSection` renders nothing until they are
    populated, so the site never fakes social proof. **This is the biggest
    remaining gap versus both reference vendors.**
  - **Decoration stripped.** Deleted `ParticleField`, `GradientOrbs`,
    `NoiseOverlay`, `GridBackdrop`, `IsometricCubes`, `Marquee`, `Magnetic`,
    `Parallax`, and the scroll-jacked landing sections (`BigStatement`,
    `Capabilities`, `UseCasesScroll`, `SolutionsRoller`, `TestimonialsScroll`).
    Argus `FundsTrace` and Faro `CrossRail` kept — the scroll there *is* the
    interaction.
  - **Type:** Sora dropped; Inter carries display and body. Scale tops out at
    64px hero / 36px section, down from 192px section titles.

- **2026-08-26 (b)** — **Every placeholder page built out; icon registry completed.**
  `/solutions/:slug` (×14), `/industries/:slug` (×4) and `/company` were shipping
  a literal `[ … to be built ]` string — every nav dropdown link led to one.
  All now render real content. Page depth went **2.1 → ~7.5 screens** (solutions),
  **1.7 → ~7.3** (industries), **2.0 → ~7.3** (company).
  - **New content libraries:** `lib/solutions-content.ts` and
    `lib/industries-content.ts`. Body copy lives there; `nav-data.ts` keeps
    taxonomy only. Both carry a header note that `stats` are **marketing claims
    consistent with the landing hero figures, not audited benchmarks** — these
    need marketing/legal sign-off before launch.
  - **Section rhythm (shared by all three templates):** PageHeader → stat band →
    problem/context + pain cards → ordered "how it works" steps → capability grid
    → delivered-by products + regulatory touchpoints → related links → CTA. All
    normal document flow; no sticky, no viewport-height sections (rule 6).
  - **`pages/ProductPage.tsx`** — was also a placeholder. It is unreachable today
    (all four products have bespoke routes ahead of `:slug` in `App.tsx`) but
    would have shipped the placeholder the moment a fifth product was added to
    `nav-data.ts`. Now a real fallback built from `PRODUCT_CONTENT` plus every
    solution listing that product as a deliverer.
  - **`lib/icons.ts`** — the registry held **19** icons while content referenced
    **50**; `getIcon()` silently falls back to a generic `Box`, so 31 distinct
    icons would all have rendered identically. All 50 now registered. **When you
    add an `icon:` string to any content file, add it to `icons.ts`** — there is
    no build-time check for this.
  - **`Footer`** — had no Company column at all despite the nav having one. Added
    About / Contact / LinkedIn / X; grid 4 → 5 columns with a 1180px breakpoint.
  - **Ghost numerals** — `RulesDispatch`, `Schema`, `Workflow` and
    `ConvergenceDeepCut` used `clamp(8rem, 6rem + 6vw, 11–12rem)` = **176–192px**
    outlined numerals, forcing `-4rem` offsets on their headings. Now
    `clamp(4.5rem, 3rem + 3.5vw, 7rem)` = **112px**, offsets pulled in to match.
    Decorative outlined numerals are the one permitted exception to rule 7.
  - **Contrast — accent is not a body-text colour on dark.** Measured
    `--blue #2f6bff` on `--black`: **4.38:1**, under the 4.5 AA floor for normal
    text. (`--green` 11.61, `--violet` 4.53, `--yellow` 12.20 all pass.) The new
    templates' `.kicker` labels initially used `color: var(--accent)` at 12px;
    they now use `--text-2` with the accent as a leading dot — which is what
    `ui/Eyebrow` already did. **Do not set 12–14px text in `var(--accent)`;
    follow the Eyebrow pattern.**

- **2026-08-26** — **Landing page: de-scrolled and accent ratio rebalanced.**
  The homepage was **11,013px / 15.3 viewport-screens** for six sections because
  four separate blocks were pinned at `100svh`. Now **~8.4 screens**.
  - **`sections/landing/ProductShowcase`** — rebuilt. Was a pinned `100svh`
    title plus four `position: sticky; top: 0; height: 100svh` cards stacking on
    each other (5 screens). Now a **2×2 grid in normal document flow** (2
    screens): all four products compare side by side. **No sticky, no viewport
    units.**
  - **Accent ratio — new hard rule (see §1):** each card previously filled
    **46% of the viewport with solid `var(--accent)`**, cycling blue → green →
    violet → yellow back to back, which read as cheap at that area. Accent is now
    **≈5% of a card**: a 2px top rule, the icon tile, the category label, and the
    feature dots, over a neutral `--surface`. **Palette itself is unchanged** —
    this is an area-ratio decision, not a color decision.
  - **`sections/landing/Capabilities`** — was a pinned `100svh` heading over a
    `height: 400vh` scroll track that advanced the active domain (5 screens for
    one screen of content). Now a **click-driven tab switcher** (1.4 screens)
    using the WAI-ARIA tabs pattern: `role=tablist/tab/tabpanel`, roving
    `tabIndex`, and ←/→ arrow-key navigation. All four bespoke
    `CapabilityGraphics` are kept. Uses **keyed remount, not `AnimatePresence
    mode="wait"`** — on a click-driven tab an exit animation delays the incoming
    panel by its full duration, which reads as lag.
  - **Type scale** — both sections defined a local `.bigTitle` at
    `clamp(3.5rem, 1.5rem + 11vw, 12rem)` = **192px**, plus a 352px ghost
    numeral, bypassing the shared `SectionHeading`. Both now use
    **`SectionHeading` (`--fs-h2`, 48px max)**. `BigStatement` headline 96px →
    56px, marquee 96px → 60px. Resulting hierarchy: **hero 57px › section 48px ›
    card title 32px**.
  - **Rule of thumb going forward:** `100svh`/`100vh` pinning is reserved for
    sections where **scroll *is* the interaction** — i.e. Argus `FundsTrace`
    (hop 0–12 graph reveal) and Faro `CrossRail`, which are untouched. It is not
    a default section height.

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
    the top-level links). **Closes on navigation:** a `useLocation` effect closes
    the panel on any route change (trigger clicks, item clicks, same-route clicks,
    back/forward), plus a ~400ms `open()` block after a programmatic close so a
    stray post-nav `mouseenter` can't immediately re-open it.
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
