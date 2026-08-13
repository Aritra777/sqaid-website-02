# Argus Product Page — Design Handoff Brief

> Self-contained packet for an external / specialist UI agent (v0, Lovable,
> Figma Make, Galileo, a design-focused Claude, a human designer, etc.).
> They do **not** have our repo, so everything they need is here.
> Two parts: **(A) Current design context** and **(B) The redesign prompt.**

---

## A. CURRENT DESIGN CONTEXT (what exists today)

### The product
**Argus** is an **agentic AML (anti-money-laundering) investigation platform** —
one of four products under **SqAId**, an AI-native risk & compliance company.
Argus's promise: *it doesn't just flag risk, it runs the whole investigation and
hands an analyst a recommended disposition with the full evidence trail attached.*

The differentiator is a **fleet of ~12 specialist AI agents** (an "agent crew")
that triage an alert, walk a live knowledge graph, trace funds up to 12 hops,
check behavioral/fraud/identity signals, and synthesize a SAR-ready narrative.
Audience: **compliance & financial-crime teams at banks / fintechs / PSPs** —
serious, skeptical, regulator-facing buyers. Tone = confident, precise,
enterprise-grade — *not* playful startup.

### Brand & design system (HARD constraints — must not break)
This site runs a strict, deliberately-constrained visual system. A redesign is
welcome to re-imagine **layout, hierarchy, motion and interaction**, but must
stay inside these rules:

1. **Palette = 5 colors only:** Black `#0a0b0d`, White `#ffffff`, and four
   product accents. **Argus's accent is green `#18e29a`.** Create all variation
   with **opacity only** — never introduce a new hue (no cyan, teal, purple,
   etc.). Green is the ONLY accent on this page.
2. **No box-shadows, no glows, no drop-shadows.** Depth comes from translucent
   surfaces + 1px hairline borders only.
3. **No color gradients** (no multi-hue fills, no gradient text). *Allowed:*
   single-color + alpha `mask-image` edge fades, 1px grid lines, `backdrop-filter:
   blur()` glass, subtle noise/texture overlays.
4. **Typography:** Display/headings = **Sora** (700/800, tight tracking
   `-0.03em`, line-height ~1). Body = **Inter**. Data / labels / eyebrows / code
   = **JetBrains Mono** (uppercase, letter-spaced). Big-bold hero headline with
   an accent-green `<em>` word is the signature type moment.
5. **Dark-first, with a light mode.** The site supports both. A recurring device
   is a **half-light / half-dark split** where one region renders the *opposite*
   of the current mode (and the halves swap when the theme flips). Product accent
   (green) stays constant across both halves.
6. **Motion:** smooth-scroll (Lenis) + reveal-on-scroll + parallax. Signature
   easing `cubic-bezier(.22,1,.36,1)`. **Everything must degrade gracefully
   under `prefers-reduced-motion`.**

Decorative language (since gradients/shadows are banned): geometry (concentric
circles, crosshair lines, dot grids, oversized "ghost" numerals/glyphs, hairline
rules), glassmorphism (translucent surface + blur + 1px border), and solid-accent
blocks (a section painted solid green with dark text = intentional contrast).

### Current page structure (top → bottom)
The current implementation is competent but conventional. Sections:

1. **Hero** — two-column. Left: eyebrow, big Sora headline *"The AML platform
   that **investigates** — not just alerts."*, sub-paragraph, two CTAs ("Request
   a Demo" magnetic button + "Meet the crew"). Right: a browser-chrome framed
   product screenshot (dashboard.png) with a parallax drift. Below: a 4-up stat
   row (`50+ rules`, `Custom fleet`, `<5ms eval`, `12× hop depth`).
2. **Marquee** — infinite horizontal scroll of the 12 agent names.
3. **Capabilities** — 4-column bento of cards (icon + mono tag + title + body),
   columns drift at alternating parallax speeds. Topics: Knowledge graph, Rules
   engine, Agent squad, Compliance/SAR.
4. **The Crew** — a light `.invert` band containing a **drag carousel** of 12
   agent cards (mono type-label, name, description, faint oversized 2-letter
   ghost glyph in the corner).
5. **Feature gallery** — a swipeable carousel of 6 framed product screenshots
   (ingestion, signals, agents, flows, graph-explorer, mcp).
6. **CTA** — centered, solid-ish green-tinted panel, "See Argus investigate one
   of your cases", demo buttons.

### What's underwhelming about it (why we're redesigning)
- The hero is a generic "headline left / screenshot right" SaaS template. It
  doesn't *show* the agentic investigation that is the entire point of Argus.
- The "agent fleet" — the strongest story — is reduced to a plain marquee + a
  card carousel. It should feel like a living, orchestrated system.
- Nothing visualizes the **knowledge graph / funds-tracing / hop-decay** which
  is Argus's most distinctive, ownable idea.
- Sections are stacked and evenly weighted; there's little narrative build or
  moment of "wow." No sense of an investigation unfolding from alert → decision.

### Key content to preserve (facts, use verbatim or tighten)
- **12 agents** (type · name · one-liner): Orchestrator (routing), Investigator
  (graph, 2-hop), ProfileShift (temporal, SCD-2 90-day), DarkWebScanner (threat
  intel), CustomerProfiler + AccountProfiler (behavioral), AccountTakeover +
  PaymentFraud (fraud), NetworkRing (network/mule rings), FundsTrace (12-hop
  follow-the-money), Resolver (identity resolution), Narrator (synthesis →
  ≤400-word SAR-ready narrative).
- **4 capabilities:** live knowledge graph w/ hop-decay risk propagation;
  rules engine that dispatches investigations (<5ms match); configurable agent
  squad per alert; regulator-ready SAR narratives w/ full correlation-ID lineage.
- **Stats:** 50+ production rules · configurable fleet · <5ms rule eval · 12-hop
  funds traces.
- **6 product surfaces** (have screenshots): ingestion, signals, agents, flows,
  graph explorer, MCP server.
- CTA: "Bring a real alert — we'll show the full investigation, alert to
  disposition, in 20 minutes."

---

## B. THE REDESIGN PROMPT (paste this into the specialist agent)

> Copy everything below the line into the external UI agent. If the tool accepts
> images, also attach a screenshot of the current page + the design system rules
> above.

---

You are a senior product designer specializing in **modern fintech / enterprise
SaaS marketing sites** (think Linear, Ramp, Mercury, Stripe, Vercel, Retool,
Sardine, Hummingbird — dark, precise, high-craft). Redesign the **product page
for "Argus"**, an **agentic AML investigation platform**: a fleet of ~12
specialist AI agents that autonomously investigate financial-crime alerts, walk a
live knowledge graph, trace funds up to 12 hops, and hand an analyst a
regulator-ready disposition with the full evidence trail.

**Goal:** a page that doesn't just *describe* agentic investigation — it *shows*
it. The hero and one signature section should make a skeptical compliance buyer
feel the system working: an alert coming in, agents dispatching, a graph lighting
up, funds being traced, a decision resolving.

**Hard brand constraints (do not break):**
- Palette = **only** black `#0a0b0d`, white `#ffffff`, and one accent —
  **Argus green `#18e29a`**. All other variation is opacity of black/white. No
  other hue whatsoever.
- **No shadows, no glows, no color gradients, no gradient text.** Depth = 1px
  hairline borders + translucent surfaces + glassmorphism (blur). Single-color
  alpha mask-fades, 1px grid lines, and dot grids are allowed.
- Type: **Sora** (bold display, tight tracking), **Inter** (body), **JetBrains
  Mono** (labels/data/code, uppercase). Signature = a big bold headline with one
  green `<em>` word.
- **Dark-first**, must also work in light mode. Bonus: use a **half-dark /
  half-light split** somewhere as a structural device.
- All motion must degrade under `prefers-reduced-motion`.

**Deliverables I want from you:**
1. **3 distinct hero concepts** (described + ASCII/wireframe or a rendered
   mock), each proposing a *different* way to visualize agentic investigation in
   the hero — e.g. (a) a live knowledge-graph that traces a path on load, (b) an
   "investigation timeline" where agent chips resolve one by one into a verdict,
   (c) a split screen: raw alert on one side, synthesized SAR narrative on the
   other. Pick and recommend one.
2. **A full-page section map** (hero → … → CTA) with a clear narrative arc:
   *alert → dispatch → investigate (graph + funds trace) → synthesize → decide.*
   For each section: purpose, layout, the interactive/motion idea, and which
   content from the list below it carries.
3. **The signature "agent fleet" moment** — reimagine the 12-agent crew as
   something more alive than a card carousel: an orchestration diagram, a
   dispatch animation, a graph of agents handing off, etc. Still must let a user
   browse all 12 agents and their roles.
4. **A knowledge-graph / funds-trace visualization** concept — Argus's most
   ownable idea, currently absent. Interactive or scroll-driven, on-palette
   (green nodes/edges over dark, hairline links, hop-decay shown via opacity).
5. Modern-UI details you'd apply: micro-interactions, scroll choreography,
   cursor effects, sticky/pinned moments, bento vs. editorial layout calls,
   empty-space and rhythm. Keep it **enterprise-serious, not playful.**
6. Note anything that would need real data/screenshots vs. can be pure UI.

**Content to work with** (tighten copy as needed, keep facts):
- Headline territory: "The AML platform that investigates — not just alerts."
- 12 agents (type · name · role): Orchestrator (routing/intent), Investigator
  (walks graph 2 hops), ProfileShift (90-day temporal profile changes),
  DarkWebScanner (credential-breach checks), CustomerProfiler & AccountProfiler
  (behavioral stats), AccountTakeover & PaymentFraud (fraud signals), NetworkRing
  (money-mule ring detection), FundsTrace (12-hop follow-the-money), Resolver
  (identity/synthetic-ID resolution), Narrator (synthesizes a ≤400-word SAR-ready
  narrative).
- 4 capabilities: live knowledge graph with hop-decay risk propagation; a rules
  engine that dispatches the investigation (<5ms match on SQL + graph); a
  configurable agent squad fired per alert; regulator-ready SAR narratives with
  full correlation-ID lineage (source event → rule → alert → agent → decision).
- Stats: 50+ production rules · configurable fleet · <5ms rule eval · 12-hop
  traces.
- 6 product surfaces (screenshots exist): ingestion, configurable signals,
  agents-wired-to-rules, detection flows, live graph explorer, MCP server.
- CTA: "Bring a real alert — we'll show the full investigation, alert to
  disposition, in 20 minutes."

**Output format:** section-by-section design spec with wireframes/mocks, the
recommended hero, the interaction/motion notes per section, and a short
rationale for the narrative arc. Assume it will be built in React + CSS with
Framer-Motion-style animation, so keep interactions web-feasible.

---

### Handoff logistics (for whoever runs this)
- If the agent can render visuals (Figma Make, v0, Lovable): let it produce mocks
  directly, then we translate on-system in code.
- If it's a spec-only agent: we take its section map + hero pick and build it in
  the repo against `.claude/design.md`.
- **Give it a screenshot of the live page** (run `npm run dev`, open
  `/products/argus`, capture dark + light) so it sees the real starting point.
- Whatever comes back, it must be re-checked against `.claude/design.md` before
  we build — the 5-color / no-shadow / no-gradient rules are non-negotiable.
