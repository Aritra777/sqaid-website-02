/**
 * Marketing content for the Product Showcase section (scroll-driven).
 * Keyed by product slug. Taxonomy/identity stays in nav-data.ts; this is the
 * richer per-product copy (category, description, use cases).
 */
export type ProductContent = {
  category: string;
  description: string;
  /** use cases / features revealed on the right as the panel scrolls */
  features: string[];
  /** product screenshot, shown darkened behind the Key features grid */
  image?: string;
};

export const PRODUCT_CONTENT: Record<string, ProductContent> = {
  faro: {
    category: "Fraud & AML",
    description:
      "Score every transaction the moment it arrives — across cards, wires, ACH, SEPA, UPI, and crypto — then act before money moves.",
    features: [
      "Real-time fraud scoring across all payment channels",
      "AML detection and fraud in a single unified pipeline",
      "Sub-5ms per-event rule evaluation at scale",
      "AI copilot that drafts investigation narratives in seconds",
    ],
    image: "/assets/products/faro.png",
  },
  argus: {
    category: "Investigation",
    description:
      "A configurable fleet of specialist AI agents triages every alert, walks the knowledge graph, and hands your team a recommended disposition with the full evidence trail.",
    features: [
      "Live graph: 2-hop sanctions exposure, 12-hop funds traces",
      "Configurable agent fleet fires automatically on every alert",
      "SAR-ready narratives — no hedging, clickable entity links",
      "Recommended disposition with a complete evidence trail",
    ],
    image: "/assets/products/argus.png",
  },
  "case-manager": {
    category: "Case Management",
    description:
      "Manage the full case lifecycle — from alert intake to SAR filing — in a single, drag-and-drop configurable workspace built for compliance teams.",
    features: [
      "Drag-and-drop workflow and rule builder — no code required",
      "Integrated SAR & CTR filing with pre-built templates",
      "End-to-end audit lineage on every case and decision",
      "Role-based queues, SLAs, and four-eyes review",
    ],
    image: "/assets/products/case-manager.png",
  },
  abacus: {
    category: "Analytics",
    description:
      "Unified analytics across the entire SqAId platform — surface trends, benchmark performance, and build the compliance dashboards your regulators expect.",
    features: [
      "Cross-product compliance dashboards in one view",
      "Trend, velocity, and benchmark analytics",
      "Regulator-ready exports and scheduled reports",
      "Model and rule performance monitoring",
    ],
  },
};
