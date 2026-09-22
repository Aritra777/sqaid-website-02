export const solutions = [
  {
    slug: "financial-crime",
    name: "Financial crime",
    headline: "Connect the signal\nto the bigger story.",
    lead: "Move from isolated alerts to an investigation with customer, screening, transaction and relationship context.",
    problem:
      "An investigator has a payment alert, a screening candidate and a customer file. Each answers part of the question. The work is in connecting them without confusing an association with proof.",
    steps: [
      [
        "Establish the context",
        "Use UDM definitions and the relevant customer records to identify the entities and activity.",
      ],
      [
        "Examine the signal",
        "Review ARGUS scenario or event evidence and ABACUS candidate information in their respective workflows.",
      ],
      [
        "Ask across the evidence",
        "Use a configured Brain workspace to explore connected sources and identify unresolved questions.",
      ],
    ],
    products: ["argus", "abacus", "brain"],
    storyProduct: "argus",
    difference:
      "Specialized detection and screening workflows retain their meaning, while the investigator gains a connected view.",
  },
  {
    slug: "customer-lifecycle",
    name: "Customer lifecycle",
    headline: "Know more at every\ncustomer decision.",
    lead: "Connect onboarding, business ownership, screening and ongoing review around the customer relationship.",
    problem:
      "A business application looks complete, but its ownership is declared rather than verified and a required check is pending. The journey needs a clear review path, not a green checkbox.",
    steps: [
      [
        "Capture the relationship",
        "Use KYC intake to bring the customer, related people, documents and consent together.",
      ],
      [
        "Resolve what needs review",
        "Inspect required checks and screening candidates, with explicit treatment of missing evidence.",
      ],
      [
        "Keep the history",
        "Record the decision and continue the relationship through periodic review and connected context.",
      ],
    ],
    products: ["kyc", "abacus", "brain"],
    storyProduct: "kyc",
    difference:
      "The customer lifecycle preserves what is known, what is declared and what still needs to be verified.",
  },
  {
    slug: "enterprise-intelligence",
    name: "Enterprise intelligence",
    headline: "Make your enterprise data\npart of the conversation.",
    lead: "Shared definitions below. Connected exploration above. Bring data teams and risk teams closer to the same evidence.",
    problem:
      "The answer spans a warehouse, a customer system and a graph. Before asking the business question, teams spend time finding and reconciling what the data means.",
    steps: [
      [
        "Create a common foundation",
        "Map enterprise sources into UDM canonical entities through contracts and reconciliation.",
      ],
      [
        "Discover and connect",
        "Use Brain Fabric to inspect supported sources and define entity and relationship mappings.",
      ],
      [
        "Publish a workspace",
        "Configure tools and agents, then explore questions with an inspectable source trail.",
      ],
    ],
    products: ["udm", "brain", "argus"],
    storyProduct: "udm",
    difference:
      "A canonical foundation and configurable intelligence workspace support new questions without treating every use case as a new data project.",
  },
];
