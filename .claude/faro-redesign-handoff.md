# Faro Product Page — Design Handoff Brief

> Self-contained packet for an external / specialist UI agent (v0, Lovable,
> Figma Make, Galileo, a design-focused Claude, or a human designer).
> They do **not** have our repo, so everything they need is here.
> Two parts: **(A) Current design context** and **(B) The redesign prompt.**
> Companion to `argus-redesign-handoff.md` and `case-manager-redesign-handoff.md`.

---

## A. CURRENT DESIGN CONTEXT (what exists today)

### The product
**Faro** is a **real-time fraud & AML platform** — one of four products under
**SqAId**, an AI-native risk & compliance company. Faro's core thesis: most banks
run **fraud** and **anti-money-laundering** on two separate stacks, two teams,
looking at the same customer. Faro **unifies them into one real-time scoring
pipeline** — so signals compound instead of conflict, and every transaction gets
a single explainable verdict shipped back downstream with full evidence + audit
lineage. Faro is the brand's **primary/flagship** product (its blue is the
default site accent). Audience: **fraud & financial-crime teams at banks /
fintechs / PSPs** — serious, regulator-facing buyers. Tone = confident, precise,
enterprise-grade.

### Brand & design system (HARD constraints — must not break)
Strict, deliberately-constrained visual system. A redesign may re-imagine
**layout, hierarchy, motion and interaction**, but must stay inside these rules:

1. **Palette = 5 colors only:** Black `#0a0b0d`, White `#ffffff`, and four
   product accents. **Faro's accent is blue `#2f6bff`** (and blue is the site's
   default brand accent). Vary with **opacity only** — never introduce another
   hue. Blue is the ONLY accent on this page.
2. **No box-shadows, no glows, no drop-shadows.** Depth = translucent surfaces +
   1px hairline borders only.
3. **No color gradients** (no multi-hue fills, no gradient text). *Allowed:*
   single-color + alpha `mask-image` edge fades, 1px grid lines, dot grids
   (radial-gradient dots of one color), `backdrop-filter: blur()` glass, subtle
   noise/texture overlays.
4. **Typography:** Display/headings = **Sora** (700/800, tracking `-0.03em`,
   line-height ~1). Body = **Inter**. Data / labels / eyebrows / code =
   **JetBrains Mono** (uppercase, letter-spaced). Signature type moment = a big
   bold headline with an accent-blue `<em>` phrase.
5. **Dark-first, with a light mode.** Recurring structural device = a **half-light
   / half-dark split** where one region renders the *opposite* of the current
   mode (and the halves swap when the theme flips). Accent (blue) stays constant
   across both halves. (We implement this with an `.invert` utility class.)
6. **Motion:** smooth-scroll (Lenis) + reveal-on-scroll + parallax. Signature
   easing `cubic-bezier(.22,1,.36,1)`. **Everything degrades under
   `prefers-reduced-motion`.**

Decorative language (since gradients/shadows are banned): geometry (concentric
circles, crosshair lines, dot grids, oversized "ghost" numerals, hairline rules),
glassmorphism (translucent surface + blur + 1px border), and solid-accent blocks
(a section painted solid blue with white text = intentional contrast).

### Current page structure (top → bottom)
The current Faro page is well-built and its **signature device is a full-bleed
vertical split-screen hero**. Sections:

1. **Hero — vertical split-screen.** LEFT half = current mode (dark), messaging:
   eyebrow, big Sora headline *"Catch the fraud. **Stop the laundering.** In real
   time."*, sub-paragraph, two CTAs (magnetic "Request a Demo" + "What it does").
   RIGHT half = **`.invert` (light) showcase**: a dot-grid backdrop + a framed
   product screenshot (parallax) + a floating **"Live risk score" verdict card**
   (0.98/1.00, HOLD pill, three signal bars: Velocity / Sanctions proximity /
   Device anomaly). Both halves parallax.
2. **Stats band** (full width): Real-time · 1 platform · All channels · 24/7.
3. **Marquee** — infinite scroll of coverage keywords (Cards, Wires, ACH, SEPA,
   UPI, Crypto, SWIFT, RTP, Sanctions, Structuring, Layering, Device risk).
4. **Capabilities bento** — 4 cards with parallax columns: Real-time fraud
   scoring / AML same flow / AI copilot for analysts / One consolidated verdict.
5. **Channels carousel** — *"Wherever money moves, Faro is there."* — a drag
   carousel of 6 payment rails (Card, Wires & RTGS, ACH & SEPA, UPI & instant,
   Crypto & wallets, Sanctions screening).
6. **How it works — light `.invert` band, pipeline rail.** A 5-stage rail
   (Ingest → Detect → Triage → Decide → Report) whose accent fill *grows on
   scroll*.
7. **One verdict** — screenshot (parallax) + a checklist (One number / Full
   evidence / Audit lineage / Built for change).
8. **CTA** — accent panel with concentric-circle geometry + demo buttons.

### What's underwhelming about it (why we're redesigning)
- The hero screenshot + verdict card is nice but static; the **"fraud + AML in
  one real-time score"** — the whole thesis — isn't *demonstrated*, only stated.
- The **"one score across every channel"** idea (cross-rail structuring that hides
  between systems) is the most ownable story and is currently just a card
  carousel — it could be a live cross-rail visualization.
- The pipeline rail is good but conventional. Little sense of a transaction
  *flowing through* the system and resolving to a verdict in real time.
- Fraud + AML *convergence* (two signal streams merging into one verdict) is a
  strong visual metaphor that's never drawn.

### Key content to preserve (facts — tighten copy, keep meaning)
- One-liner territory: "Catch the fraud. Stop the laundering. In real time."
- Thesis: fraud + AML unified in **one real-time pipeline**; one explainable
  verdict shipped downstream with **full evidence + audit lineage**.
- 4 capabilities: real-time fraud scoring (all rails); AML in the same flow
  (structuring/layering/rapid transfers/sanctions); AI copilot (explains the
  *why*, drafts the narrative, recommends next action); one consolidated verdict.
- 6 channels: Card payments (auth-time), Wires & RTGS/SWIFT, ACH & SEPA, UPI &
  instant (sub-second), Crypto & wallets (on-chain ↔ customer graph), Sanctions
  screening (fuzzy, zero-miss).
- 5 pipeline stages: Ingest → Detect → Triage → Decide → Report.
- Verdict points: one explainable number · full replayable evidence · end-to-end
  audit lineage · new detection logic deploys without disruption.
- Stats: Real-time on every txn · 1 platform (fraud+AML) · all channels · 24/7.
- CTA: "See it on your data — 20 minutes on a transaction profile like yours."

---

## B. THE REDESIGN PROMPT (paste this into the specialist agent)

> Copy everything below the line into the external UI agent. If it accepts
> images, also attach a screenshot of the current page + the rules above.

---

You are a senior product designer specializing in **modern fintech / enterprise
SaaS marketing sites** (Linear, Ramp, Mercury, Stripe, Vercel, Sardine,
Unit21). Redesign the **product page for "Faro"**, a **real-time fraud & AML
platform** that unifies fraud detection and anti-money-laundering into a single
real-time scoring pipeline: every transaction, across every payment rail (cards,
wires, ACH/SEPA, UPI, crypto), gets one explainable risk verdict shipped
downstream with full evidence and audit lineage.

**Goal:** a page that *demonstrates* the core thesis — **two signal streams
(fraud + AML) converging into one real-time verdict, across every channel** —
rather than just stating it. A skeptical fraud/AML buyer should feel a
transaction flow in, get scored from multiple angles, and resolve to a verdict.

**Hard brand constraints (do not break):**
- Palette = **only** black `#0a0b0d`, white `#ffffff`, and one accent — **Faro
  blue `#2f6bff`**. All other variation is opacity of black/white. No other hue.
- **No shadows, no glows, no color gradients, no gradient text.** Depth = 1px
  hairline borders + translucent surfaces + glass blur. Single-color alpha
  mask-fades, 1px grid lines, and dot grids are allowed.
- Type: **Sora** (bold display, tight tracking), **Inter** (body), **JetBrains
  Mono** (labels/data/code, uppercase). Signature = big headline with one blue
  `<em>`.
- **Dark-first**, must also work in light mode. Use a **half-dark / half-light
  split** somewhere as a structural device (the current hero already does).
- All motion degrades under `prefers-reduced-motion`.

**Deliverables:**
1. **3 hero concepts** (described + wireframe/mock), each a *different* way to
   visualize "fraud + AML → one real-time verdict." Ideas to beat: (a) a live
   transaction flowing through a scoring pipeline that resolves to a verdict card;
   (b) two converging signal streams (fraud lane + AML lane) merging into a single
   score; (c) a real-time "decision tape" of transactions being scored
   approve/hold/escalate. Recommend one.
2. **A full-page section map** (hero → … → CTA) with a narrative arc:
   *transaction in → scored across channels & both risk lenses → triaged →
   one verdict → evidence/audit out.* Per section: purpose, layout, the
   interactive/motion idea, and which content it carries.
3. **A "one score, every channel" signature moment** — reimagine the 6 payment
   rails as a *live cross-rail visualization* (money moving across cards/wires/
   ACH/SEPA/UPI/crypto, all feeding one engine; show cross-rail structuring being
   caught) rather than a plain card carousel.
4. **A fraud+AML convergence visual** — the two-streams-into-one-verdict metaphor,
   interactive or scroll-driven, on-palette (blue over dark, hairline links).
5. Modern-UI details: scroll choreography, sticky/pinned moments, micro-
   interactions, bento vs. editorial layout calls, rhythm/whitespace. Keep it
   **enterprise-serious, not playful.**
6. Note what needs real data/screenshots vs. pure UI.

**Content to work with** (tighten copy, keep facts): headline "Catch the fraud.
Stop the laundering. In real time." · thesis = fraud+AML in one real-time
pipeline, one explainable verdict + full evidence & audit lineage · 4
capabilities (real-time fraud scoring; AML same flow; AI copilot that explains
the why + drafts narrative + recommends next action; one consolidated verdict) ·
6 channels (card auth-time, wires/RTGS/SWIFT, ACH/SEPA, UPI/instant sub-second,
crypto/wallets, sanctions screening) · 5 pipeline stages (Ingest → Detect →
Triage → Decide → Report) · verdict points (one number, full evidence, audit
lineage, deploy-without-disruption) · CTA "see it on your data in 20 minutes."

**Output format:** section-by-section design spec with wireframes/mocks, the
recommended hero, interaction/motion notes per section, and a short rationale.
Assume React + CSS with Framer-Motion-style animation — keep interactions
web-feasible.

---

### Handoff logistics
- Attach a screenshot of the live page (run `npm run dev`, open `/products/faro`,
  capture dark + light) so the agent sees the real starting point.
- Whatever comes back must be re-checked against `.claude/design.md` before we
  build — the 5-color / no-shadow / no-gradient rules are non-negotiable.
