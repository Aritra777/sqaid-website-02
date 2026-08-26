/**
 * Navigation + product/solution/industry taxonomy.
 * Ported from v1 — this is the content backbone the whole site routes off.
 * `icon` values are lucide-react icon names (resolved where rendered).
 */

export type ProductLink = {
  slug: string;
  name: string;
  tagline: string;
  /** theme class from themes.css, e.g. "theme-faro" */
  theme: string;
  icon: string;
  status: "live" | "soon";
  disabled?: boolean;
};

export const PRODUCTS: ProductLink[] = [
  {
    slug: "argus",
    name: "ARGUS",
    tagline: "Real-time fraud, AML, entities and trade surveillance",
    theme: "theme-argus",
    icon: "Network",
    status: "live",
  },
  {
    slug: "cais",
    name: "CAIS",
    tagline: "Universal AI-native case management",
    theme: "theme-case-manager",
    icon: "FolderKanban",
    status: "live",
  },
  {
    slug: "abacus",
    name: "ABACUS",
    tagline: "Multi-gated entity and real-time transaction screening",
    theme: "theme-abacus",
    icon: "BarChart3",
    status: "live",
  },
];

export type SolutionItem = {
  label: string;
  slug: string;
  description: string;
  icon: string;
};

export type SolutionDomain = {
  name: string;
  /** own page: /solutions/:slug */
  slug: string;
  /** short label for nav / tabs */
  short: string;
  /** product theme class supplying --mark for this domain */
  theme: string;
  color: string;
  items: SolutionItem[];
};

export const SOLUTIONS: SolutionDomain[] = [
  {
    name: "Fraud Detection",
    slug: "fraud-detection",
    short: "Fraud",
    theme: "theme-faro",
    color: "var(--blue)",
    items: [
      {
        label: "Real-Time Transaction Monitoring",
        slug: "transaction-monitoring",
        description: "Score every transaction before money moves",
        icon: "Activity",
      },
      {
        label: "Account Takeover Detection",
        slug: "ato-detection",
        description: "Detect credential attacks before accounts are compromised",
        icon: "ShieldOff",
      },
      {
        label: "New Account Fraud",
        slug: "new-account-fraud",
        description: "Stop synthetic identities and first-party fraud at sign-up",
        icon: "UserX",
      },
      {
        label: "Payment Fraud & Scams",
        slug: "payment-fraud",
        description: "Block fraud across cards, wires, ACH, SEPA, and crypto",
        icon: "CreditCard",
      },
    ],
  },
  {
    name: "AML & Financial Crime",
    slug: "aml-financial-crime",
    short: "AML",
    theme: "theme-argus",
    color: "var(--green)",
    items: [
      {
        label: "Transaction Monitoring",
        slug: "aml-transaction-monitoring",
        description: "Detect structuring, layering, and cross-border risk",
        icon: "ArrowLeftRight",
      },
      {
        label: "Sanctions & Watchlist Screening",
        slug: "sanctions-screening",
        description: "Screen against global watchlists with zero-miss accuracy",
        icon: "ScanLine",
      },
      {
        label: "Customer Risk Rating",
        slug: "customer-risk-rating",
        description: "Dynamic risk scores that update as customer behavior shifts",
        icon: "Gauge",
      },
      {
        label: "Financial Crime Investigation",
        slug: "financial-crime-investigation",
        description: "12-hop graph analysis with AI-generated evidence trails",
        icon: "GitMerge",
      },
    ],
  },
  {
    name: "Compliance Operations",
    slug: "compliance-operations",
    short: "Compliance",
    theme: "theme-case-manager",
    color: "var(--violet)",
    items: [
      {
        label: "Case Management",
        slug: "case-management",
        description: "Manage the full lifecycle from alert intake to disposition",
        icon: "Kanban",
      },
      {
        label: "SAR & CTR Filing Automation",
        slug: "sar-filing",
        description: "AI-drafted narratives reviewed and filed in minutes",
        icon: "FilePen",
      },
      {
        label: "Regulatory Reporting",
        slug: "regulatory-reporting",
        description: "Audit-ready compliance reports generated automatically",
        icon: "ClipboardList",
      },
    ],
  },
  {
    name: "AI & Automation",
    slug: "ai-automation",
    short: "AI",
    theme: "theme-abacus",
    color: "var(--yellow)",
    items: [
      {
        label: "Agentic Investigation",
        slug: "agentic-investigation",
        description: "Configurable specialist AI agents work every alert end-to-end",
        icon: "Bot",
      },
      {
        label: "AI Narrative Generation",
        slug: "ai-narrative",
        description: "SAR-ready narratives with no hedging, no hallucinations",
        icon: "PenLine",
      },
      {
        label: "MCP Server Integration",
        slug: "mcp-server",
        description: "Expose the full platform to any LLM via a single MCP endpoint",
        icon: "Plug",
      },
    ],
  },
];

export type IndustryLink = { label: string; slug: string; blurb: string };

export const INDUSTRIES: IndustryLink[] = [
  { label: "Fintech", slug: "fintech", blurb: "Ship compliant, scale fast" },
  { label: "Banks & Credit Unions", slug: "banks", blurb: "Modernize legacy controls" },
  { label: "Crypto & Web3", slug: "crypto", blurb: "On-chain + off-chain risk" },
  { label: "Sponsor Banks", slug: "sponsor-banks", blurb: "Oversee every program" },
];

/** Flat lookup helpers */
export const ALL_SOLUTIONS: SolutionItem[] = SOLUTIONS.flatMap((d) => d.items);
export const getSolution = (slug: string) =>
  ALL_SOLUTIONS.find((s) => s.slug === slug);
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getDomain = (slug: string) => SOLUTIONS.find((d) => d.slug === slug);
/** the domain a legacy solution slug now lives under */
export const getDomainForSolution = (slug: string) =>
  SOLUTIONS.find((d) => d.items.some((i) => i.slug === slug));
export const getIndustry = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);
