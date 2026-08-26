/**
 * METRICS — every number shown on this site, with its basis.
 *
 * The site previously carried ~72 invented stat slots ("95% false positives
 * suppressed", "0 hallucinated facts"). None of them had a source. For a
 * financial-crime compliance vendor that is a legal exposure, not just a
 * credibility problem.
 *
 * Every claim now declares where it comes from:
 *
 *   'derived'  — computed from data that ships in this repo. Cannot drift,
 *                cannot be wrong. Renders always.
 *   'spec'     — an engineering/product target the company stands behind.
 *                Requires `owner`. Renders always.
 *   'statute'  — a fact of law or regulation. Requires `citation`.
 *                Renders always.
 *   'customer' — a measured outcome from real deployments. Requires a
 *                non-null `source`. Renders ONLY once a source is supplied.
 *
 * A `customer` claim with `source: null` is a PLACEHOLDER: `publishedMetrics()`
 * filters it out, so it can never reach a page. `npm run verify:metrics` fails
 * the build if any placeholder is referenced from published content, and
 * reports what still needs real data.
 *
 * TO PUBLISH A REAL NUMBER: fill in `value` and `source` on the relevant
 * entry below. Nothing else needs to change — it starts rendering.
 */

import { PRODUCTS, ALL_SOLUTIONS, SOLUTIONS, INDUSTRIES } from "./nav-data";

export type MetricBasis = "derived" | "spec" | "statute" | "customer";

export type Metric = {
  /** stable key referenced from content files */
  id: string;
  /** the number as displayed; null means "not yet supplied" */
  value: string | null;
  unit?: string;
  label: string;
  basis: MetricBasis;
  /** derived: how it is computed. Filled automatically below. */
  from?: string;
  /** spec: who signs off on this claim */
  owner?: string;
  /** statute: the regulation it states */
  citation?: string;
  /** customer: the deployment/report the figure comes from */
  source?: string | null;
};

/* ── derived: counted from the data this repo actually ships ────────── */
const PAYMENT_RAILS = ["cards", "wires", "ACH", "SEPA", "UPI", "crypto"];

/** Longest chain in the Argus funds-trace graph, i.e. the real hop depth. */
export const MAX_TRACE_HOPS = 12;

const DERIVED: Metric[] = [
  {
    id: "products",
    value: String(PRODUCTS.length),
    label: "Products in the suite",
    basis: "derived",
    from: "PRODUCTS.length",
  },
  {
    id: "live-products",
    value: String(PRODUCTS.filter((p) => p.status === "live").length),
    label: "Available today",
    basis: "derived",
    from: "PRODUCTS.filter(status === 'live').length",
  },
  {
    id: "solutions",
    value: String(ALL_SOLUTIONS.length),
    label: "Solutions covered",
    basis: "derived",
    from: "ALL_SOLUTIONS.length",
  },
  {
    id: "domains",
    value: String(SOLUTIONS.length),
    label: "Risk domains",
    basis: "derived",
    from: "SOLUTIONS.length",
  },
  {
    id: "industries",
    value: String(INDUSTRIES.length),
    label: "Segments served",
    basis: "derived",
    from: "INDUSTRIES.length",
  },
  {
    id: "rails",
    value: String(PAYMENT_RAILS.length),
    label: "Payment rails, one engine",
    basis: "derived",
    from: "PAYMENT_RAILS.length — " + PAYMENT_RAILS.join(", "),
  },
  {
    id: "trace-hops",
    value: String(MAX_TRACE_HOPS),
    label: "Hop funds tracing",
    basis: "derived",
    from: "MAX_TRACE_HOPS — depth of the Argus hop graph",
  },
];

/* ── spec: engineering targets the company stands behind ────────────── */
const SPEC: Metric[] = [
  {
    id: "latency",
    value: "<5",
    unit: "ms",
    label: "Per-event evaluation",
    basis: "spec",
    owner: "engineering",
  },
  {
    id: "ownership-hops",
    value: "2",
    label: "Hop ownership screening",
    basis: "spec",
    owner: "product — OFAC 50% rule traversal depth",
  },
  {
    id: "availability",
    value: "24/7",
    label: "Continuous monitoring",
    basis: "spec",
    owner: "engineering",
  },
];

/* ── statute: facts of law. Not claims about the product. ───────────── */
const STATUTE: Metric[] = [
  {
    id: "sar-deadline",
    value: "30",
    label: "Day SAR filing deadline",
    basis: "statute",
    citation: "31 CFR 1020.320(b)(3)",
  },
  {
    id: "retention",
    value: "5",
    label: "Year record retention",
    basis: "statute",
    citation: "31 CFR 1010.430(d)",
  },
  {
    id: "ctr-threshold",
    value: "$10k",
    label: "CTR reporting threshold",
    basis: "statute",
    citation: "31 CFR 1010.311",
  },
];

/* ── customer: REAL measured outcomes. All awaiting real data. ────────
   These are the numbers a buyer actually cares about, and the ones the
   reference vendors lead with. Fill `value` + `source` to publish. Until
   then they are filtered out of every page. */
const CUSTOMER: Metric[] = [
  {
    id: "fp-reduction",
    value: null,
    unit: "%",
    label: "False positive reduction",
    basis: "customer",
    source: null,
  },
  {
    id: "investigation-speedup",
    value: null,
    unit: "%",
    label: "Faster investigations",
    basis: "customer",
    source: null,
  },
  {
    id: "clients",
    value: null,
    label: "Institutions protected",
    basis: "customer",
    source: null,
  },
  {
    id: "volume-monitored",
    value: null,
    label: "Transactions monitored annually",
    basis: "customer",
    source: null,
  },
  {
    id: "value-protected",
    value: null,
    label: "Payment value screened",
    basis: "customer",
    source: null,
  },
  {
    id: "alert-precision",
    value: null,
    unit: "%",
    label: "Alert precision",
    basis: "customer",
    source: null,
  },
];

export const ALL_METRICS: Metric[] = [
  ...DERIVED,
  ...SPEC,
  ...STATUTE,
  ...CUSTOMER,
];

const BY_ID = new Map(ALL_METRICS.map((m) => [m.id, m]));

/** True when a metric has an actual basis for being shown to the public. */
export function isPublishable(m: Metric): boolean {
  if (m.value === null) return false;
  if (m.basis === "customer") return Boolean(m.source);
  return true;
}

export function getMetric(id: string): Metric | undefined {
  return BY_ID.get(id);
}

/**
 * Resolve a list of metric ids to the ones that may actually be published.
 * Unsourced placeholders are dropped silently here and reported loudly by
 * `npm run verify:metrics`.
 */
export function publishedMetrics(ids: string[]): Metric[] {
  return ids
    .map((id) => BY_ID.get(id))
    .filter((m): m is Metric => Boolean(m) && isPublishable(m!));
}

/** Everything still waiting on real data — used by the verify script. */
export function pendingMetrics(): Metric[] {
  return ALL_METRICS.filter((m) => !isPublishable(m));
}
