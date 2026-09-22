> Owner correction, 22 September 2026: Preserve and restyle existing company history, founders and job postings. Lead the site with financial compliance and fighting financial crime globally. ARGUS is one unified platform for AML, fraud, trade surveillance and entity resolution, powered by the UDM enterprise warehouse. This direction supersedes conflicting proposals below.

# SqAId website rebuild blueprint

Planning baseline: 21 September 2026. Based on the current website and a targeted review of the seven local product projects. This is a website specification, not a production certification of those products. Product applications were not run or exhaustively audited during planning.

## 1. The central decision

Build the website around **connected data, specialized risk products, and one intelligence experience**.

Proposed primary message:

> **Your data. Your risk. One connected view.**
>
> Bring enterprise data, customer context, screening and financial-crime monitoring together. Explore the evidence and ask better questions with SqAId Brain.

The homepage must answer three questions immediately: what SqAId does, how its products fit together, and what a person can actually do with them. Demonstrate power through specific workflows and inspectable evidence rather than adjectives or unsupported performance figures.

## 2. Product architecture and naming

| Layer | Product | Role in the story |
|---|---|---|
| Intelligence experience | SqAId Brain | Cross-product analytics, conversational investigation, connected data exploration, configurable agents and workspaces |
| Customer lifecycle | SqAId KYC | Individual and business onboarding, policy-driven review, ownership context and ongoing KYC |
| Screening | ABACUS | Customer and payment-party sanctions/watchlist screening, candidate evidence and analyst review |
| Financial crime and surveillance | ARGUS | One product covering fraud, AML, trade surveillance and entity resolution, supported by UDM |
| Enterprise data foundation | UDM | Independently marketable enterprise warehouse and canonical data model; also the data foundation within the ARGUS proposition |

Architecture illustration: UDM forms the foundation; ARGUS, ABACUS and KYC occupy the product layer; Brain spans the top. Show labeled relationships and supported integration examples rather than implying that every integration is already deployed. Brain may connect to source systems directly; it is not restricted to accessing everything through UDM. UDM must remain visibly broader than a financial-crime database.

ARGUS's product page includes five areas: UDM foundation, Fraud, AML, Trade Surveillance and Entity Resolution. The four risk capabilities get dedicated detail pages, all under ARGUS. UDM has one canonical standalone page linked from both Products and ARGUS; no duplicate UDM page.

Use “SqAId KYC” as the descriptive working name until a final product name exists. Preserve the current SqAId capitalization. CAIS is present on the current website but no project was supplied: keep its existing URL accessible, audit its claims, and exclude it from the new primary product hierarchy pending evidence. Do not silently rename it Brain. FARO remains a legacy ARGUS redirect.

## 3. Findings that change the content

| Product | Evidence reviewed | Safe story | Limits affecting website claims |
|---|---|---|---|
| ABACUS | `sanction_screening_slm/README.md` | Versioned watchlists, names and aliases, four candidate-retrieval routes, calibrated evidence scoring, screening jobs, hit lifecycle and audit | README explicitly says the LLM adjudicator was removed; scoring over-retention remains an issue; weighted gates and delta screening are planned; laptop synthetic measurements are not production performance |
| Brain | `Brain/README.md`, `docs/FABRIC-STUDIO-IMPLEMENTED.md`, `docs/UDM-CONNECTION.md`, `INVESTIGATION-GUIDE.md` | Fabric discovery, mapped data products, tools, agents, published workspaces, conversational evidence and graph exploration | Distinguish live connections, bounded snapshots and synthetic investigation fixtures; no claim of unlimited autonomous agents or complete enterprise coverage |
| KYC | `KYC platform/README.md` | KYC/KYB intake, policies, maker-checker review, Party 360, periodic review, document workflows and audit | No external identity vendor is live in the documented baseline; document analysis validation is limited; README contains conflicting older/newer retention statements that need code-level reconciliation before detailed public claims |
| UDM | `ddl/`, `conform/`, `data_contracts/`, `etl/pipeline_runner.py`; Brain UDM connection documentation | Enterprise canonical model, contract-driven staging, conformance, reconciliation, promotion and downstream consumption | Engine-pluggable design does not establish equal runtime certification on every engine; contracts do not prove each source feed is live |
| ARGUS Fraud | `argus-clickhouse/AGENTS.md` implementation records | Governed message ingestion, streaming evaluation, Rule Lab, shadow/backtest workflows and traceability | Records distinguish implemented work, local verification, incomplete evaluations and deployments; do not turn individual local timings into a platform SLA |
| ARGUS AML | `profiling/`, `scenarios/catalog_144.py`, scenario compiler and threshold registry | Behavioral profiles, peer-group comparisons, scenario evaluation and alert context | Catalog existence is not detection validation; avoid scenario-count headlines and unsupported claims of ML coverage |
| Trade Surveillance | `order_chain/`, `scenarios/catalog_ts.py`, compiler | Order-chain reconstruction, market-conduct scenarios, account/trader context | Catalog prose and implementation differ, including parameterization claims; avoid “all thresholds configurable” and guaranteed abuse detection |
| Entity Resolution | User architecture plus Brain's implemented Neo4j mapping documentation | Linked identities, source records, relationship inspection and investigation context | AI + Neo4j is the intended positioning; the full entity-resolution service, automated merge controls and matching quality need further verification |

Internal content records should carry `implemented`, `demonstrated`, `planned`, or `unverified`, with a source and review date. Public pages use clear descriptions and selectively label previews. Technical status detail belongs in the content evidence file, not scattered throughout the marketing experience.

## 4. Navigation and complete route plan

Primary navigation: **Platform · Products · Solutions · Company · Request a demo**.

Products menu: Brain, ARGUS, ABACUS, KYC, UDM. ARGUS exposes its four capabilities inside its overview and product subnavigation. Desktop menu includes a concise platform diagram; mobile uses accessible expandable lists.

| Route | Purpose and treatment |
|---|---|
| `/` | Rebuild full platform narrative and product discovery |
| `/platform` | Explain architecture, independent adoption and how products connect |
| `/products/brain` | New flagship intelligence experience page |
| `/products/argus` | Rebuild as the unified ARGUS overview; retain graph interaction vocabulary |
| `/products/argus/fraud` | Fraud workflow and governed rule lifecycle |
| `/products/argus/aml` | Profiling, scenarios and investigation evidence |
| `/products/argus/trade-surveillance` | Order lifecycle and conduct review |
| `/products/argus/entity-resolution` | Identity/relationship evidence; limit claims to verified capabilities |
| `/products/abacus` | Complete content and visual-story rebuild |
| `/products/kyc` | New lifecycle page |
| `/products/udm` | New standalone enterprise data foundation page |
| `/solutions/financial-crime` | Buyer journey across monitoring, screening and investigation |
| `/solutions/customer-lifecycle` | Onboarding, screening, periodic review and changing risk |
| `/solutions/enterprise-intelligence` | Data foundations, cross-source analytics and evidence exploration |
| `/company` | Rewrite company purpose and approach using verified company information |
| `/company/careers` and existing job/application routes | Preserve functionality; publish only genuine current openings |
| `/contact` | Product-aware demo request with an explicit successful-submission state |
| `/privacy`, `/terms` | Publish reviewed company policies; do not invent legal commitments |
| Existing CAIS route | Preserve; remove unsupported statements; keep outside the new core product menu |
| 404 | Useful search/navigation recovery and contact link |

Legacy solution URLs map individually to the closest relevant new page. Replace blanket redirects that currently send every solution to ARGUS and every industry to the homepage. Do not add numerous thin industry pages: include evidence-backed buyer examples in the three solution pages first. Maintain a route migration table before changing links.

## 5. Homepage: the full scroll story

1. **Hero — “Your data. Your risk. One connected view.”** A short positioning paragraph, primary “Explore the platform” and secondary “Request a demo.” Visual: one synthetic customer thread linking an account, screening candidate, transactions and source evidence. Clicking a source changes the evidence drawer.
2. **Why context matters — “The signal is only part of the story.”** Three concise views: fragmented data, disconnected decisions, repeated investigation. Transform those views into one connected evidence trail on interaction.
3. **Architecture — “One foundation. Specialized products. Shared intelligence.”** Interactive layer diagram with UDM below, product capabilities in the middle and Brain above. Click opens a concise explanation and product link.
4. **Brain showcase — “Ask a question. Follow the evidence.”** Scripted, explicitly illustrative question-to-answer experience; select a cited source to inspect the underlying record. Include one operational analytics question and one investigation question.
5. **Product discovery.** Five distinct product tiles with outcome, compact visual and deep link. ARGUS visually contains four capabilities; UDM appears as an independent product, not a minor feature.
6. **Connected workflow — “From onboarding to ongoing understanding.”** KYC → screening → data context → risk monitoring → investigation. Distinguish the diagrammed target workflow from validated integrations in supporting copy.
7. **Trust through traceability.** Concrete evidence: source links, policy versions, review controls and lineage where supported. No invented clients, endorsements or certification badges.
8. **Adoption and CTA.** Explain that buyers can start with a product and discuss the integration path. “See SqAId with your use case.” Do not imply instant integration or a guaranteed deployment duration.

Keep one dominant visual per section. Each scroll should add a new idea rather than restate “unified AI.”

## 6. Product pages: content and visual direction

### SqAId Brain

Hero: **“Ask across your data. See the evidence.”**

Supporting copy: “Bring connected sources, specialist agents and investigation context into one workspace. Move from a question to an answer you can inspect.”

Sections in order:
1. Conversational hero with questions such as “Which customers show activity outside their expected profile?” and “What evidence connects these accounts?”
2. Fabric: discover sources, inspect schemas, define entity and relationship mappings.
3. Studio: connect dataset → tool → agent → workspace in an interactive dependency view.
4. Companion: follow execution activity, inspect evidence, ask follow-up questions.
5. Unified risk desk: switch customer, account, alert and relationship context without losing the investigation thread.
6. Governed workspaces: published versions, pinned configurations, saved run evidence and explicit source coverage.
7. Role examples: analyst investigation, data exploration and risk oversight.
8. CTA: “Explore a connected workspace.”

Signature interaction: choose a question → reveal the configured workflow → show an answer and chart from a fixed synthetic dataset → click a citation → open source details → change the follow-up. The marketing demo uses deterministic fixtures and clearly says “Interactive product illustration”; it is not connected to visitor data or a live model. Do not animate fabricated internal reasoning; show observable tool and retrieval activity.

### ARGUS overview

Hero: **“See financial crime in context.”**

Supporting copy: “Bring fraud, AML, trade surveillance and entity relationships into one product, supported by a shared enterprise data foundation.”

Sections: unified risk map → UDM foundation → four workload explorer → detection-to-review flow → rules/scenario governance → funds and relationship exploration → Brain connection → focused demo CTA.

Keep the strongest existing `WorkloadGraphs`, `FundsTrace` and source-inspector patterns. Rebuild their datasets and copy. Remove invented model confidence, arbitrary graph-hop promises, “AI everywhere,” and implied automatic regulatory filing. Explain why an edge exists and whether a relationship is verified, declared or inferred.

### ARGUS Fraud

Hero: **“Bring context to every fraud decision.”**

Flow: supported message intake → validation and normalization → contextual rules → evaluation result → alert/review → event trace. Follow with Rule Lab authoring, shadow comparison, backtesting and approval. Show a configurable synthetic rule and explain which events it would affect; a threshold change is an illustration, not a production optimization recommendation.

Visual: event stream with selectable rule evidence and a before/after rule comparison. No unsupported latency or throughput figures. An incomplete evaluation is visible as incomplete, never green “safe.” CTA: “Walk through a fraud scenario.”

### ARGUS AML

Hero: **“Understand behavior beyond a single transaction.”**

Flow: enterprise history → party/account profiles → peer comparison → scenario trigger → funds context → analyst review. Visual: linked timeline, behavioral profile and funds graph. Clearly distinguish a scenario threshold from an ML probability. CTA: “Explore an AML investigation.”

### ARGUS Trade Surveillance

Hero: **“Reconstruct the sequence. Understand the conduct.”**

Flow: orders and executions → order-chain reconstruction → scenario evidence → actor/account context → review. Visual: synchronized order, cancellation and execution replay with selectable evidence. Use a spoofing/layering illustration without implying that the pattern alone establishes misconduct. CTA: “Replay a surveillance scenario.”

### ARGUS Entity Resolution

Hero: **“Connect the records. Preserve the evidence.”**

Flow: fragmented source records → identifiers and attributes → candidate relationships → confidence/evidence inspection → connected risk context. Visual: several records converge into an inspectable identity view, with separate styling for verified ownership and possible association. Do not show automatic merges or guaranteed AI resolution until their implementation is verified. Explain Neo4j in the technical section, while the hero speaks to identity context. CTA: “Explore connected identities.”

### ABACUS: complete resurrection

Hero: **“Screen beyond the exact match.”**

Supporting copy: “Find candidate matches across names and aliases, inspect the evidence and bring screening decisions into an auditable review workflow.”

Sections:
1. Interactive name-to-candidate screening illustration.
2. Watchlist source ingestion, source versions and retained original records.
3. Four independent retrieval routes: use the implementation's exact names after verifying them in source; do not carry over the website's current invented five-gate sequence.
4. Evidence comparison: supporting and conflicting identity attributes, candidate provenance and scoring explanation.
5. Analyst workflow: queue → inspect → decision/reason → recorded history.
6. Screening operations: jobs, list/index status and traceability.
7. Customer and payment-party screening use cases, distinguishing supported payloads from planned formats.
8. Relationship to KYC and Brain, with validated integration scope.
9. CTA: “Explore a screening case.”

Signature visual: an amber-lit screening workbench. Select a synthetic name variant, watch parallel candidate retrieval converge, then inspect two candidates side by side. Use source labels, aliases and identifier differences instead of unsupported probability percentages. A candidate match is not a sanctions finding.

Remove: AI adjudication core, “five gates,” student/teacher/SLM claims, automatic learning after every review, zero false negatives, near-zero false positives and unqualified throughput guarantees. Planned weighted scoring and delta screening are not current features. Move conversational investigation positioning to Brain.

### SqAId KYC

Hero: **“Know the customer. Keep the context current.”**

Supporting copy: “Connect individual and business onboarding, policy-driven checks and ongoing review in one customer lifecycle.”

Sections: individual/business journey switch → intake and documents → declared ownership and verification state → policy-driven checks → maker-checker decision → Party 360 → periodic review → downstream context → demo CTA.

Signature visual: a customer dossier assembles step by step. Toggle individual/business; inspect a document, ownership edge, pending check and review decision. Unknown or unavailable checks visibly require review. Show periodic reviews accurately; do not imply all external changes are monitored continuously. Vendor connectivity is described by readiness, not as a wall of live partner logos. CTA: “Walk through onboarding.”

### UDM

Hero: **“One enterprise model. A foundation for every risk view.”**

Supporting copy: “Organize enterprise data through a shared canonical model, governed contracts and reconciliation—ready to support analytics, financial crime and surveillance.”

Sections:
1. Enterprise foundation and independent product value.
2. Business entities: parties, accounts, transactions, relationships, instruments, orders and executions, with room for broader enterprise domains.
3. Source-to-canonical contract mapping.
4. Staging, conformance and data quality checks.
5. Reconciliation and controlled promotion.
6. Source-to-consumer lineage and canonical catalog.
7. Consumers: AML, fraud, trade surveillance, entity resolution, KYC context and Brain.
8. Engine-pluggable architecture: describe compiler/design support and separately identify verified deployments.
9. CTA: “Map your data to UDM.”

Signature visual: choose a source field → trace its canonical mapping → inspect count/sum/duplicate/key checks → follow the resulting data to consuming products. Add a record with a missing key to show why promotion is withheld. UDM is a warehouse product; Brain's Fabric is the connection/discovery and intelligence experience above sources, not a replacement warehouse.

## 7. Platform, solutions and supporting pages

Platform: architecture hero → product boundaries → one worked integration story → standalone adoption paths → data access and governance → demo. Describe verified connections precisely; show the broader architecture as the product vision where integration remains incomplete.

Financial Crime solution: monitoring/screening handoffs → investigator questions → product mapping → evidence-led review. Customer Lifecycle: individual/business intake → screening/review → ongoing context. Enterprise Intelligence: governed data → connected exploration → reusable workspaces. Each has a unique illustrated workflow and relevant product links, not repeated generic feature grids.

Company: concrete purpose, actual product approach, verified team/company details and contact. Careers: preserve application behavior and verify openings. Footer: full product map, company links, contact and reviewed legal links. Contact form: name, work email, company, product interest and optional use case; never request actual customer records. Prefill product interest from CTAs. If no submission service exists, use an honest email flow until it is connected; never display a fake success message.

## 8. Visual system: preserve the identity, extend it deliberately

Preserve Inter, JetBrains Mono for technical labels, generous spacing, editorial type, fine borders, restrained surface depth, dark visualization panels, light/dark modes, graph lines and node inspectors. The current ARGUS and ABACUS page-level styles are the reference, not only the older global token comments. Those comments conflict with existing colored effects and must be reconciled with this brief during implementation.

| Product | Identity direction | Visual metaphor |
|---|---|---|
| ARGUS | Existing emerald/green | Connected risk and funds movement |
| ABACUS | Existing amber/gold; current page uses `#e7aa37` | Candidate search and evidence comparison |
| Brain | New electric indigo | Questions, connected sources and coordinated workflows |
| KYC | New teal/cyan | Customer dossier and lifecycle |
| UDM | New cobalt/steel blue | Structured data, contracts and lineage |
| CAIS | Preserve existing violet on its retained page | Case workflow |

New colors are proposed directions; tune exact light/dark tokens against existing rendered pages. Brain must remain visually distinguishable from CAIS, KYC from ARGUS, and UDM from global action blue. Use text labels, icons and structure as well as hue. Color belongs in diagrams, selected states, section markers and controlled accents. Maintain readable body copy and accessible contrast.

Motion: purposeful line drawing, evidence transitions, controlled pulses, reveal-on-scroll and timeline playback. Start after the visual enters the viewport; stop when hidden. Provide pause/replay, reduced-motion alternatives and manual controls. No scroll hijacking. Avoid forcing every section to fill a viewport. Mobile gets a compact diagram plus an equivalent evidence list instead of a tiny desktop canvas.

## 9. Shared interactive visual specification

Build reusable primitives: graph canvas, source drawer, timeline/replay, workflow steps, product panel, synthetic-data badge and product CTA. Share rendering primitives, not identical page compositions.

Fixture model: scenario ID, entities, relationships, records, events, source references, verification state and explanatory copy. Prefer one coherent fictional organization/customer thread across pages, plus product-specific examples. All amounts and counts must reconcile; display no real customer data.

Each interaction must communicate something: node selection explains a relationship; a timeline reveals ordering; a contract inspection shows field mapping; a citation identifies evidence; a rule comparison shows affected sample events. Avoid decorative controls with no meaningful result.

Show “Illustrative data” in every demonstration panel. Do not label simulations “LIVE.” Do not suggest clickable scripts are a real model conversation. Public website interactions remain self-contained and do not connect to local product databases.

## 10. Implementation plan

Keep React, Vite, TypeScript, CSS Modules, Framer Motion and React Router. This is an existing web project; a platform rewrite would delay the requested outcome.

1. **Baseline and content inventory.** Preserve local changes, inventory all routes and existing claims, capture existing desktop/mobile visual references, map legacy redirects. Current untracked `index 2.html` is user-owned and must remain untouched.
2. **Evidence and taxonomy.** Add a product registry and claim ledger. Reconcile README/code conflicts in areas used by copy. Replace stale product/solution descriptions in `src/lib/nav-data.ts`, `products-content.ts` and `site.ts`.
3. **Shared shell and tokens.** Update navigation/footer, add new product themes, centralize CTA behavior and make the core visual primitives accessible.
4. **First complete experience.** Rebuild homepage, platform overview, Brain and ARGUS overview together so the hierarchy is understandable immediately.
5. **ABACUS replacement.** Replace obsolete architecture and learning claims; deliver its dedicated screening workbench.
6. **New product pages.** Build UDM and KYC with their distinct visual stories.
7. **ARGUS details.** Implement fraud, AML, trade and entity pages with verified examples and reused visual infrastructure.
8. **Complete supporting routes.** Solutions, company, careers, contact, route migrations, metadata and legal-page content readiness.
9. **Quality and completion.** Verify the entire navigation and CTA journey, run technical checks, compare rendered desktop/mobile pages and remove stale/dead content.

Suggested files: `src/lib/product-registry.ts`, `src/content/products/`, `src/content/scenarios/`, `src/components/visuals/`, page-specific sections, and an internal content-evidence file. Keep prose separate from animation code. Do not migrate every existing component merely for consistency; retain the components that already work.

Fast delivery comes from one shared visual toolkit, a coherent fixture set, centralized content and an integrated first pass across all routes. Follow with product-specific polish. Complete the whole site before spending disproportionate time on one animation. No calendar promise until implementation starts and integration requirements are known.

## 11. Verification and definition of done

- All planned public routes render directly and on refresh, including hosting SPA fallback; legacy redirects land on relevant destinations.
- Global navigation, product subnavigation, footer links and demo CTAs work on desktop and mobile.
- `npm run lint`, `npm run verify:metrics` and `npm run build` pass. Extend the existing metrics guard where needed to cover new claim sources.
- Browser checks at 390, 768 and 1440px: no clipped text, overlapping graph labels, horizontal page overflow or unusable tap targets.
- Keyboard operation, visible focus, meaningful headings, accessible tabs/dialogs and non-color evidence states; test reduced motion and both themes.
- Heavy visuals load per route/viewport; avoid multiple continuous animation loops. Measure bundle and browser performance before adding a new graph library.
- Titles, descriptions, canonical URLs, social previews, sitemap and robots behavior cover every indexable route. Structured data uses only real company/product facts.
- Contact flow is tested through delivery if a provider is configured; otherwise a working email fallback is explicit.
- No unsupported outcomes, customer logos, certification claims, synthetic “case studies” presented as customer results, guaranteed AI accuracy, or unverified production metrics.
- Product screenshots, if used, contain only cleared synthetic data. Editorial mockups are labeled illustrations.
- Final handoff includes a route checklist, source-backed content ledger, remaining external dependencies and an explanation of what was verified.

## 12. Decisions that can be made without blocking the build

Use SqAId KYC as the working name; use the proposed new product hues; preserve CAIS outside the main menu; lead with the five-product hierarchy; use deterministic local demo fixtures; retain the current framework and design language. Verify entity-resolution claims before expanding that page. Obtain actual legal/company material before publishing those assertions. None of these dependencies prevents building the main experience.

The outcome should feel like the existing site's best moments expanded into a coherent product story: recognizable design, stronger interactions, distinct product identities and evidence-based content throughout.
