# Website content evidence

Reviewed 22 September 2026. This ledger records the basis of the marketing rewrite. Reading implementation/documentation is not independent validation of a product's production readiness.

| Product | Local source | Basis used in the website | Excluded or qualified |
|---|---|---|---|
| Brain | `../Brain/docs/FABRIC-STUDIO-IMPLEMENTED.md`, `README.md`, `docs/UDM-CONNECTION.md`, `INVESTIGATION-GUIDE.md` | Documented local implementation of source discovery, tools/agents, workspace releases, saved evidence, mapped graph exploration | No unlimited source coverage, no autonomous disposition, no production performance guarantees; website conversation is a deterministic illustration |
| ABACUS | `../sanction_screening_slm/README.md`, especially screening pipeline and current-state sections | Four retrieval routes: lexical trigram, vector, exact/transliterated, identifier/BIC; source versions, calibrated evidence, screening jobs, hits and review history | Removed the obsolete five-gate LLM adjudicator and automatic learning loop; no zero-miss or precision guarantee; scoring redesign and delta screening remain outside current claims |
| KYC | `../KYC platform/README.md` | Intake, declared ownership, versioned policies, maker-checker review, periodic review and customer context | Provider activation is explicitly qualified; no live identity-verification claim; contradictory retention documentation is not used as a public promise |
| UDM | `../Argus UDM/ddl/`, `conform/`, `data_contracts/`, `etl/pipeline_runner.py`; Brain UDM connection documentation | Canonical entities, mapping contracts, staging, reconciliation and promotion; enterprise and standalone positioning supplied by owner | Engine-pluggable design is distinguished from validated runtime support; no assumption that all feeds are live |
| ARGUS Fraud | `../argus-clickhouse/AGENTS.md` implementation records | Contract-based event intake, evaluation traceability, candidate authoring, shadow/historical rule evaluation | No laptop timing presented as SLA, no implication accepted ingestion means successful rule evaluation |
| ARGUS AML | `../Argus AML/profiling/`, `scenarios/catalog_144.py`, compiler and threshold registry | Party/account profiles, peer context, scenarios and transaction investigation | No scenario-count marketing claim, no unsupported machine-learning quality claims |
| Trade surveillance | `../Argus - Trade_Surveillance/order_chain/`, `scenarios/catalog_ts.py` | Order reconstruction, event sequence, market/account scenarios | Pattern shown as review evidence, not proof of misconduct; no assertion that all thresholds are parameterized |
| Entity resolution | Owner's AI + Neo4j architecture; Brain implementation documentation | Source-qualified entities, mapped relationships, explicit verification state and graph exploration | No automatic identity merge guarantee; matching quality and merge workflow depend on implementation |

## Illustrations and stories

`src/content/products.ts` owns product positioning, workflow explanations, use cases and before/after comparisons. `src/content/solutions.ts` owns the cross-product buyer journeys. `src/components/experience/Workspace.tsx` contains synthetic UI fixtures; every panel is visibly labeled illustrative data. Stories describe the problem, workflow and intended outcome. They are not represented as customer case studies or measured benefits.

No product APIs, source databases, secrets or customer records are connected to the public site. Brain's website questions select authored examples; they do not invoke a model.

## Previous content

The new router only publishes the rebuilt experience pages and the existing 404. Historical page/components remain in source for reference and potential reuse but are not linked into the new route graph. In particular, the retired ABACUS AI adjudication page, old application form with a fake success state is not published. Company history, founder biographies and all original job postings were restored at the owner’s explicit request, using the new styling. Founder portraits use initials rather than unrelated stock faces.

CAIS retains a conservative availability/inquiry page. FARO points to ARGUS Fraud. Previously advertised solution slugs redirect individually to a relevant product or solution; industry routes lead to relevant buyer journeys.

## External content still needed before publication

- Approved privacy/terms documents and legal/company identity details. No legal text or regulatory commitments were invented; a privacy-inquiry contact link is available.
- The owner has explicitly requested restoration of all existing job listings. Original role content and posting dates are retained.
- Verified customer permissions and outcome evidence before adding testimonials, logos or measured results.
- A submission provider if the owner wants server-delivered demo requests; the current flow openly prepares an email in the visitor's client.

## Owner correction — 22 September 2026

Positioning now leads with financial compliance and the global fight against financial crime. ARGUS is explicitly one unified platform for AML, fraud, trade surveillance and entity resolution, powered by UDM, the enterprise warehouse. Brain spans the compliance suite. Company history, founders, mission, principles, six original job postings, full role details and application pages are restored. Applications prepare an email and require the applicant to attach the resume in their email client; no fake submission success is shown.
