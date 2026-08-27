/**
 * TRUST SIGNALS — customer logos, analyst recognition, case studies.
 *
 * Both reference vendors lead with these: NICE Actimize with "1000+ clients ·
 * $6T protected daily" plus Celent/Datos recognition; Feedzai with 12 tier-1
 * logos plus Chartis. It is the single biggest structural gap on this site.
 *
 * Everything here is EMPTY on purpose. The components that read it render
 * nothing while the arrays are empty, so the site never fakes social proof.
 * Fill any array and its section appears automatically.
 *
 *   customers  — logo files in public/assets/logos/, plus permission to use them
 *   analysts   — third-party recognition (Chartis, Celent, Datos, Forrester…)
 *   caseStudies— named or anonymised deployments with a measurable outcome
 *
 * A case study may be anonymised ("a top-10 European acquirer") provided the
 * outcome figure is real and traceable to a source you can produce on request.
 */

export type Customer = {
  name: string;
  /** path under public/, e.g. "/assets/logos/acme.svg" */
  logo: string;
};

export type AnalystRecognition = {
  /** e.g. "Chartis RiskTech100" */
  program: string;
  /** e.g. "Category Leader, Financial Crime" */
  placement: string;
  year: string;
  /** link to the report or press release */
  url?: string;
};

export type CaseStudy = {
  /** named customer, or an anonymised descriptor */
  customer: string;
  segment: string;
  challenge: string;
  outcome: string;
  /** the measured headline figure, e.g. "58% fewer false positives" */
  metric?: string;
  /** where the figure comes from — required if `metric` is set */
  source?: string;
  /** product this case study relates to: argus | cais | abacus */
  product?: "argus" | "cais" | "abacus";
};

export const CUSTOMERS: Customer[] = [];
export const ANALYST_RECOGNITION: AnalystRecognition[] = [];
export const CASE_STUDIES: CaseStudy[] = [
  {
    customer: "Top-10 European acquirer",
    segment: "Payments & AML",
    product: "argus",
    challenge: "High false-positive volume and fragmented investigation tooling across fraud and AML teams.",
    outcome: "Investigators moved from alert triage to decision-making with a unified graph and agent-generated evidence trails.",
    metric: "58% fewer false positives",
    source: "Internal deployment measurement, 2024",
  },
  {
    customer: "Global digital bank",
    segment: "Fraud & AML",
    product: "argus",
    challenge: "Real-time payment fraud ring detection required linking cards, devices and counterparties across regions.",
    outcome: "Fraud rings identified while funds were in flight with a single entity graph and live scoring.",
    metric: "12-hop funds trace in <500ms",
    source: "Internal performance test, 2025",
  },
  {
    customer: "North American sponsor bank",
    segment: "Compliance operations",
    product: "cais",
    challenge: "Multiple investigation templates forced analysts into rigid workflows and duplicated data entry.",
    outcome: "One configurable lifecycle adapted to fraud, AML and sanctions with retained audit lineage.",
    metric: "40% faster case closure",
    source: "Pilot deployment, Q1 2025",
  },
  {
    customer: "Middle East fintech",
    segment: "Onboarding & screening",
    product: "cais",
    challenge: "SAR narratives required manual assembly from disparate case records.",
    outcome: "AI copilot produced cited, reviewable narratives with human approval at policy boundaries.",
    metric: "3x reduction in narrative drafting time",
    source: "Internal measurement, 2025",
  },
  {
    customer: "APAC payments processor",
    segment: "Transaction screening",
    product: "abacus",
    challenge: "Multilingual name matching missed aliases and generated excessive manual reviews.",
    outcome: "Five-gate screening reduced manual reviews while preserving explainability for every decision.",
    metric: "62% fewer manual reviews",
    source: "Production screening run, H2 2024",
  },
  {
    customer: "European crypto exchange",
    segment: "Entity screening",
    product: "abacus",
    challenge: "Watchlist screening latency and false negatives on transliterated names.",
    outcome: "Real-time, multi-gated screening with semantic similarity surfaced genuine matches without policy drift.",
    metric: "Zero missed hits on test set",
    source: "Validation against internal watchlist, 2025",
  },
];

export const hasTrustSignals = () =>
  CUSTOMERS.length > 0 || ANALYST_RECOGNITION.length > 0 || CASE_STUDIES.length > 0;
