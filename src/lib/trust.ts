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
};

export const CUSTOMERS: Customer[] = [];
export const ANALYST_RECOGNITION: AnalystRecognition[] = [];
export const CASE_STUDIES: CaseStudy[] = [];

export const hasTrustSignals = () =>
  CUSTOMERS.length > 0 || ANALYST_RECOGNITION.length > 0 || CASE_STUDIES.length > 0;
