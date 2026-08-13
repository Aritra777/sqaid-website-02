# Case Manager Product Page — Design Handoff Brief

> Self-contained packet for an external / specialist UI agent (v0, Lovable,
> Figma Make, Galileo, a design-focused Claude, or a human designer).
> They do **not** have our repo, so everything they need is here.
> Two parts: **(A) Current design context** and **(B) The redesign prompt.**
> Companion to `argus-redesign-handoff.md` and `faro-redesign-handoff.md`.

---

## A. CURRENT DESIGN CONTEXT (what exists today)

### The product
**Case Manager** is a **configurable case-management platform** for compliance
teams — one of four products under **SqAId**, an AI-native risk & compliance
company. Its thesis: **legacy case tools force teams to bend to the tool** — a new
alert type means editing XML and redeploying. Case Manager flips it: **every alert
type, view, workflow, and permission is configured once in the UI**, then used
forever by advisors and investigators — **zero code, no redeploys, no XML.** It's
the most "enterprise software" of the four products (RBAC, audit trails, workflow
engines). Built on **PostgreSQL + Spring Boot**, in-house (no Retool / CERBOS
lock-in). Audience: **compliance operations leaders & investigators** at banks /
fintechs — buyers who care about configurability, auditability, and control. Tone
= precise, credible, control-room serious.

### Brand & design system (HARD constraints — must not break)
Strict, deliberately-constrained visual system. A redesign may re-imagine
**layout, hierarchy, motion and interaction**, but must stay inside these rules:

1. **Palette = 5 colors only:** Black `#0a0b0d`, White `#ffffff`, and four
   product accents. **Case Manager's accent is violet `#7c5cff`.** Vary with
   **opacity only** — never introduce another hue. Violet is the ONLY accent on
   this page.
2. **No box-shadows, no glows, no drop-shadows.** Depth = translucent surfaces +
   1px hairline borders only.
3. **No color gradients** (no multi-hue fills, no gradient text). *Allowed:*
   single-color + alpha `mask-image` edge fades, 1px grid lines, dot grids,
   `backdrop-filter: blur()` glass, subtle noise/texture overlays.
4. **Typography:** Display/headings = **Sora** (700/800, tracking `-0.03em`,
   line-height ~1). Body = **Inter**. Data / labels / eyebrows / code =
   **JetBrains Mono** (uppercase, letter-spaced). Signature type moment = a big
   bold headline with an accent-violet `<em>` phrase.
5. **Dark-first, with a light mode.** Recurring structural device = a **half-light
   / half-dark split** where a region renders the *opposite* of the current mode
   (halves swap when the theme flips). Accent (violet) stays constant. The current
   Case Manager page's signature is **stacked alternating light/dark bands**
   (each section flips via an `.invert` utility).
6. **Motion:** smooth-scroll (Lenis) + reveal-on-scroll + parallax. Signature
   easing `cubic-bezier(.22,1,.36,1)`. **Everything degrades under
   `prefers-reduced-motion`.**

Decorative language (gradients/shadows banned): geometry (concentric circles,
crosshair lines, dot grids, ghost numerals, hairline rules, node-graphs),
glassmorphism (translucent surface + blur + 1px border), and solid-accent blocks.

### Current page structure (top → bottom)
The current page is strong; its **signature device is stacked alternating
light/dark bands** — the page reads as horizontal halves that swap with the theme.
Sections:

1. **Hero.** Left: eyebrow, big Sora headline *"The case-management platform that
   **bends to your workflow.**"*, sub-paragraph (legacy = edit XML & redeploy;
   SqAId = configure once in the UI), two CTAs (magnetic "Request a Demo" + "See
   the features"). Right: a **"configuration canvas"** — floating glass chips
   (Alert type / Extra fields / Designer / Workflow / RBAC) with SVG connectors,
   gently drifting (CSS float).
2. **Stats band:** Any alert type · 0 lines of code · 1 RBAC model · 5 modules.
3. **Marquee** — keywords (AML, Fraud, Sanctions, Trade surveillance, KYC, SAR,
   CTR, RBAC, Audit trail, Workflows, Designer, No XML).
4. **Alert types carousel** — *"One platform. Every case type."* — 6 draggable
   cards (AML transaction monitoring, payment fraud, sanctions screening hits,
   trade surveillance, KYC periodic review, adverse media).
5. **Features — `.invert` band, bento** — 6 cards: configurable schema, visual
   page designer, React-Flow-style workflow builder, AWS-IAM-inspired RBAC,
   everything-in-one-view lifecycle, full audit trail.
6. **Designer** — screenshot (parallax) + checklist (component palette, per alert
   type, bound to extra fields, built in-house).
7. **Workflow — `.invert` band, node graph** — a horizontal node graph (Intake →
   Assign → Investigate → SAR → Close) with a dot animating along the path;
   backend-enforced lifecycle copy.
8. **RBAC** — copy + a **JSON policy code card** (IAM-style allow/actions/
   resource/condition) + points (authorization wrapper, role caching, conditional
   authorization, in-house build).
9. **Comparison — `.invert` band** — a legacy-vs-SqAId table (adding an alert
   type, customizing the view, workflow changes, permissions, vendor lock-in).
10. **CTA** — *"Stop redeploying for every alert type. Configure it instead."*

### What's underwhelming about it (why we're redesigning)
- The **"configure it once in the UI, no code"** promise is the whole product, but
  it's *told* via bento cards and a static policy snippet — never *shown* as an
  actual configuration act (dragging a field, wiring a workflow, composing a view).
- The floating-chip hero canvas is pretty but abstract; it doesn't read as "this
  is the thing you configure."
- The strongest, most demo-able assets — the **visual page Designer** and the
  **React-Flow workflow builder** — are reduced to a screenshot and a simple node
  line. These are inherently interactive and could be the signature moments.
- Lots of alternating bands can feel evenly-weighted / repetitive; the page lacks
  a single "wow, it's genuinely configurable" beat.

### Key content to preserve (facts — tighten copy, keep meaning)
- One-liner territory: "The case-management platform that bends to your workflow."
- Thesis: configure alert types / views / workflows / permissions **once in the
  UI**, zero code, no XML, no redeploys (vs legacy: edit XML + redeploy).
- 6 features: configurable schema (shared mandatory fields + per-type extra fields
  with their own metadata, stored apart from values); visual page **Designer**
  (compose the alert-summary page from a component palette, saved per alert type);
  **workflow builder** (React-Flow-style; lifecycle enforced server-side, bound
  per alert type); **RBAC** (AWS-IAM-inspired: roles/policies/resource scopes,
  conditional access, union-cached on sign-in); one-view lifecycle (trades,
  positions, prior alerts, FA details, notes, evidence, audit, export, assign);
  full audit trail (actor + timestamp + immutable diff on every action).
- 6 alert types: AML transaction monitoring, payment fraud, sanctions screening,
  trade surveillance, KYC periodic review, adverse media.
- Workflow nodes: Intake → Assign → Investigate → SAR → Close.
- RBAC policy shape: `{ effect: allow, actions:[case:read, case:note,
  case:attach, sar:draft], resource: alert-type/aml, condition:{ state: in_review }}`.
- Comparison axes: adding an alert type · customizing the view · workflow changes ·
  permissions · vendor lock-in. Tech: PostgreSQL + Spring Boot, in-house.
- Stats: any alert type · 0 lines of code · 1 RBAC model · 5 modules.
- CTA: "Stop redeploying for every alert type. Configure it instead — 20 minutes
  on your alert types, workflow, and permission model."

---

## B. THE REDESIGN PROMPT (paste this into the specialist agent)

> Copy everything below the line into the external UI agent. If it accepts
> images, also attach a screenshot of the current page + the rules above.

---

You are a senior product designer specializing in **modern enterprise SaaS
marketing sites** (Linear, Retool, Ramp, Vanta, Vercel, Sardine, Hummingbird).
Redesign the **product page for "Case Manager"**, a **configurable
case-management platform** for financial-crime & compliance teams. Its whole
promise: **every alert type, case view, workflow, and permission is configured
once in the UI — zero code, no XML, no redeploys** (legacy tools make you edit XML
and redeploy for a new alert type). Built on PostgreSQL + Spring Boot, in-house,
no vendor lock-in.

**Goal:** a page that *shows configurability as a live act* — dragging a field
onto a schema, composing a case view from a component palette, wiring a workflow,
writing an IAM-style policy — rather than describing it with static cards. A
skeptical compliance-ops buyer should feel "I could actually reconfigure this
myself, without a developer."

**Hard brand constraints (do not break):**
- Palette = **only** black `#0a0b0d`, white `#ffffff`, and one accent — **Case
  Manager violet `#7c5cff`**. All other variation is opacity of black/white. No
  other hue.
- **No shadows, no glows, no color gradients, no gradient text.** Depth = 1px
  hairline borders + translucent surfaces + glass blur. Single-color alpha
  mask-fades, 1px grid lines, and dot grids are allowed.
- Type: **Sora** (bold display, tight tracking), **Inter** (body), **JetBrains
  Mono** (labels/data/code, uppercase). Signature = big headline with one violet
  `<em>`.
- **Dark-first**, must also work in light mode. Keep a **half-dark / half-light**
  structural device (the current page uses stacked alternating bands).
- All motion degrades under `prefers-reduced-motion`.

**Deliverables:**
1. **3 hero concepts** (described + wireframe/mock), each a *different* way to
   dramatize "configure it once, no code." Ideas to beat: (a) an interactive
   config canvas where a new alert type is assembled from fields in front of you;
   (b) a split "legacy XML + redeploy" vs "UI toggles, live in minutes"; (c) a
   live Designer canvas composing a case view from draggable components. Recommend
   one.
2. **A full-page section map** (hero → … → CTA) with a narrative arc:
   *define the alert type & fields → design the case view → wire the workflow →
   set permissions → audit everything.* Per section: purpose, layout, the
   interactive/motion idea, and content carried.
3. **Two signature interactive moments** built around the real product surfaces:
   the **visual page Designer** (drag components — trades, positions, prior
   alerts, FA profile — onto a canvas, bound to the schema) and the **workflow
   builder** (React-Flow-style nodes: Intake → Assign → Investigate → SAR →
   Close, enforced server-side). Make these feel like the actual tool.
4. **An RBAC / policy visual** — the AWS-IAM-inspired model (roles → policies →
   resource scopes, conditional access) shown as more than a static JSON block;
   e.g. a policy composer or an access-graph, on-palette (violet over dark).
5. Modern-UI details: scroll choreography, sticky/pinned moments, micro-
   interactions, how to keep alternating light/dark bands from feeling repetitive,
   rhythm/whitespace. Keep it **enterprise-serious, control-room precise.**
6. Note what needs real data/screenshots vs. pure UI.

**Content to work with** (tighten copy, keep facts): headline "The
case-management platform that bends to your workflow." · thesis = configure alert
types/views/workflows/permissions once in the UI, no code/XML/redeploys · 6
features (configurable schema with per-type extra fields; visual page Designer;
React-Flow workflow builder enforced server-side; AWS-IAM-inspired RBAC with
conditional access + union-caching; one-view case lifecycle; full audit trail
with actor+timestamp+immutable diff) · 6 alert types (AML txn monitoring, payment
fraud, sanctions screening, trade surveillance, KYC review, adverse media) ·
workflow Intake→Assign→Investigate→SAR→Close · IAM policy example `{effect:allow,
actions:[case:read,case:note,case:attach,sar:draft], resource:alert-type/aml,
condition:{state:in_review}}` · legacy-vs-SqAId comparison (alert type, view,
workflow, permissions, lock-in) · PostgreSQL + Spring Boot, in-house · CTA "stop
redeploying for every alert type — configure it instead, 20 minutes."

**Output format:** section-by-section design spec with wireframes/mocks, the
recommended hero, interaction/motion notes per section, and a short rationale.
Assume React + CSS with Framer-Motion-style animation — keep interactions
web-feasible.

---

### Handoff logistics
- Attach a screenshot of the live page (run `npm run dev`, open
  `/products/case-manager`, capture dark + light) so the agent sees the real
  starting point.
- Whatever comes back must be re-checked against `.claude/design.md` before we
  build — the 5-color / no-shadow / no-gradient rules are non-negotiable.
