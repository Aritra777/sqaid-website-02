# Website rebuild handoff

Implemented 22 September 2026 in the existing React/Vite repository. The design preserves Inter, JetBrains Mono, editorial spacing, dark interactive panels and product identities. The website includes product-specific use cases, selectable stories and concrete explanations of how the approach differs from disconnected workflows.

## Published local routes

- Home and platform: `/`, `/platform`.
- Products: `/products/brain`, `/products/argus`, `/products/abacus`, `/products/kyc`, `/products/udm`.
- ARGUS capabilities: `/products/argus/fraud`, `/products/argus/aml`, `/products/argus/trade-surveillance`, `/products/argus/entity-resolution`.
- Buyer journeys: `/solutions`, `/solutions/financial-crime`, `/solutions/customer-lifecycle`, `/solutions/enterprise-intelligence`.
- Company/contact: `/company`, `/company/careers`, `/contact`.
- Legacy case-management inquiry: `/products/cais`.
- All six original job detail and application routes are restored with the new styling; applications prepare an email draft. Old solution and industry URLs have relevant redirects; unknown routes show the existing 404.

## Interactions

- Selectable evidence graphs with source inspectors and separate AML/entity context.
- Brain questions, citations and the source → tool → agent → workspace Studio view.
- ARGUS workload switching, fraud rule comparison and trade event replay.
- ABACUS name variants, retrieval route explanations, candidate evidence and source-to-review history.
- KYC individual/business selection and intake/ownership/check/review stages.
- UDM source-to-canonical mapping and missing-key reconciliation/promotion example.
- Product and cross-product story selectors showing problem, steps and intended outcome.
- Product-aware email-draft contact flow, clearly distinguished from a sent request.

## Verification performed

- `npm run lint` and `npm run build` pass; build includes the metrics guard.
- Metrics guard now also covers new content and experience components.
- Browser route checks: 19 routes at 390, 768 and 1440px viewport widths; one H1 and no document-level horizontal overflow on each.
- Visually reviewed light/dark homepage, ABACUS desktop/mobile, mobile UDM, Brain Studio and story layout.
- Exercised the graph inspector, Brain question/citation/Studio, screening name and retrieval selection, UDM missing-key state, KYC individual/pending-check states, fraud candidate comparison, ARGUS workload switches and trade replay.
- Exercised story selection, mobile navigation and the contact email draft using synthetic test inputs; no message sent.
- Production preview: direct product links, FARO and sanctions redirects, legacy careers inquiry, desktop menu Escape dismissal and 404 verified; no browser console errors observed.
- Light product-label contrast checked against the neutral section background: all exceed 4.5:1.
- Reduced-motion styles disable visual transitions/graph motion; Reveal skips entrance motion under the preference. OS preference itself was not changed during testing.

## Editing and running

- `npm ci`
- `npm run dev -- --host 127.0.0.1 --port 5173`
- `npm run build`
- `npm run preview -- --host 127.0.0.1 --port 4173`

Content: `src/content/`. Route composition: `src/pages/experience/`. Interactive views: `src/components/experience/`. New product themes: `src/styles/themes.css`. Content evidence: `docs/CONTENT-EVIDENCE.md`.

Titles, descriptions and canonical URLs update per route. Root social metadata, a raster social preview, sitemap and robots file are included. This remains a client-rendered SPA: deployment needs an index.html history fallback. `public/_redirects` supplies the common static-host rule; configure equivalent behavior on other hosting. Route-specific social HTML prerendering is not included.

Nothing has been published or deployed. Contact uses the email client until a real form-delivery service is configured. Reviewed legal content remains an external publication dependency. Original job postings and company content are restored at the owner’s request. The user's existing untracked `index 2.html` was not modified.

## Restoration and positioning correction

At the owner’s request, restored company origin, founders, mission, principles, company facts, contact links and all six original job listings with role details and application pages. The new design is retained. Original job data remains in `src/pages/careers/jobs.ts`. Application fields prepare an email; the resume is attached in the email client.

The homepage, platform page, ARGUS/UDM/Brain positioning, navigation, footer, social preview and metadata now lead with financial compliance and fighting financial crime globally. The architecture encloses AML, fraud, trade surveillance and entity resolution within ARGUS, with the UDM enterprise warehouse powering them.

Validation: lint and production build pass. Restored careers navigation, Java AI Engineer details and application email preparation tested. Eleven affected routes checked at mobile width without document overflow; revised architecture and company page visually reviewed at desktop width.
