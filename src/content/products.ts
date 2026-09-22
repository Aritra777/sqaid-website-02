export type Story = {
  title: string;
  role: string;
  problem: string;
  steps: string[];
  outcome: string;
};
export type Product = {
  slug: string;
  name: string;
  category: string;
  theme: string;
  headline: string;
  lead: string;
  question: string;
  answer: string;
  features: { title: string; body: string }[];
  shift: [string, string][];
  stories: Story[];
  related: string[];
  cta: string;
};
export const products: Product[] = [
  {
    slug: "brain",
    name: "SqAId Brain",
    category: "Multi-agent intelligence",
    theme: "brain",
    headline: "Ask across your data.\nSee the evidence.",
    lead: "Multi-agent intelligence above the SqAId financial compliance suite. Ask across ARGUS, ABACUS, KYC and UDM, connect financial crime evidence and explore your data in one workspace.",
    question: "The answer is somewhere. Why does finding it take so long?",
    answer:
      "A customer record in one system. A screening result in another. Transactions in a warehouse. Brain connects source discovery, configured tools and agents, so you can explore the question and inspect the evidence in the same workspace.",
    features: [
      {
        title: "Fabric. Connect the context.",
        body: "Discover source assets, inspect schemas and map entities and relationships. Make the meaning of your data available to the workspace.",
      },
      {
        title: "Studio. Shape the investigation.",
        body: "Configure tools, specialist agents and their source access. Publish a versioned workspace with explicit dependencies.",
      },
      {
        title: "Companion. Follow the evidence.",
        body: "Ask questions, explore findings and continue the conversation. Open source evidence and inspect saved execution activity.",
      },
    ],
    shift: [
      ["Separate dashboards", "Questions that span connected sources"],
      ["An answer with no trail", "Evidence you can open and inspect"],
      [
        "A fixed assistant",
        "Configurable tools, agents and published workspaces",
      ],
    ],
    stories: [
      {
        title: "The activity changed. The profile did not.",
        role: "Financial-crime investigator",
        problem:
          "A business that expects occasional supplier payments is now moving incoming funds onward quickly. The alert alone cannot explain why.",
        steps: [
          "Retrieve the customer’s expected activity and transaction evidence.",
          "Compare incoming funds, onward transfers and declared relationships.",
          "Inspect the source records and ask what remains unverified.",
        ],
        outcome:
          "An investigation with connected evidence and explicit open questions for the analyst.",
      },
      {
        title: "One question across the risk desk.",
        role: "Risk operations lead",
        problem:
          "The team needs to understand which review queues need attention without stitching together screenshots from separate systems.",
        steps: [
          "Connect the relevant operational sources to a workspace.",
          "Ask for the distribution by status, product or customer group.",
          "Inspect the underlying records before sharing the finding.",
        ],
        outcome:
          "A reusable analytics conversation grounded in the sources configured for that workspace.",
      },
      {
        title: "Build the next workspace yourself.",
        role: "Data and analytics team",
        problem:
          "A new use case needs a different dataset, tool and specialist prompt.",
        steps: [
          "Discover and describe the asset in Fabric.",
          "Bind a read tool and configure an agent in Studio.",
          "Publish a workspace release and inspect its execution.",
        ],
        outcome:
          "An explicit, versioned path from data to the intelligence experience.",
      },
    ],
    related: ["udm", "argus", "kyc"],
    cta: "Explore a connected workspace",
  },
  {
    slug: "argus",
    name: "ARGUS",
    category: "Unified financial crime platform",
    theme: "argus",
    headline: "One platform.\nAgainst financial crime.",
    lead: "ARGUS is one unified platform for AML, fraud, trade surveillance and entity resolution, powered by the UDM enterprise warehouse. Built for financial compliance teams fighting financial crime.",
    question: "Financial crime crosses boundaries. ARGUS unifies the response.",
    answer:
      "Money laundering, fraud and market abuse can involve the same accounts and entities. ARGUS brings AML, fraud, trade surveillance and entity resolution into one platform, powered by UDM warehouse data. Brain adds multi-agent investigation across the compliance suite.",
    features: [
      {
        title: "A foundation that carries context.",
        body: "UDM brings parties, accounts, transactions and market activity into a canonical enterprise model.",
      },
      {
        title: "Workloads with their own logic.",
        body: "Fraud evaluates events. AML examines behavior over time. Trade surveillance reconstructs market activity. Relationships connect the investigation.",
      },
      {
        title: "Evidence that follows the alert.",
        body: "Explore the records, rule or scenario context and relationships that help an analyst understand what happened.",
      },
    ],
    shift: [
      [
        "A queue of isolated signals",
        "Events connected to customer and relationship context",
      ],
      [
        "One approach for every risk",
        "Specialized workflows on a shared foundation",
      ],
      ["Repeated evidence gathering", "Connected exploration through Brain"],
    ],
    stories: [
      {
        title: "Follow the funds, then ask why.",
        role: "AML investigation",
        problem:
          "Multiple payments converge on a business and quickly leave for another account. The investigator needs both transaction history and relationship context.",
        steps: [
          "Review the AML scenario and relevant profile.",
          "Explore the incoming and onward transaction trail.",
          "Inspect linked parties and carry the question into Brain.",
        ],
        outcome:
          "A reviewable sequence of activity, with the relationship evidence kept separate from the conclusion.",
      },
      {
        title: "A rule change deserves evidence.",
        role: "Fraud operations",
        problem:
          "A proposed rule may find a suspicious pattern but also affect legitimate activity.",
        steps: [
          "Author the candidate rule.",
          "Inspect historical or shadow evaluation results.",
          "Review the evidence before approving a change.",
        ],
        outcome:
          "A governed rule lifecycle that makes the impact of a change visible.",
      },
      {
        title: "Orders tell a story in sequence.",
        role: "Market surveillance",
        problem:
          "A cancellation looks different when viewed alongside an opposite-side execution.",
        steps: [
          "Reconstruct the order chain.",
          "Examine the scenario and the event sequence.",
          "Connect the actor and account context for review.",
        ],
        outcome:
          "A conduct question supported by a timeline, rather than a disconnected flag.",
      },
    ],
    related: ["udm", "brain", "abacus"],
    cta: "Explore ARGUS with your use case",
  },
  {
    slug: "abacus",
    name: "ABACUS",
    category: "Sanctions & payment screening",
    theme: "abacus",
    headline: "Screen beyond\nthe exact match.",
    lead: "Search names and aliases through complementary retrieval routes. Bring candidate evidence, watchlist provenance and analyst review into one screening workspace.",
    question: "A similar name is the start of a question.",
    answer:
      "Names cross scripts, change spelling and share common fragments. Screening needs candidate coverage and careful comparison. ABACUS separates finding candidates from evaluating their evidence, so analysts can inspect the reason for a match.",
    features: [
      {
        title: "Search in complementary ways.",
        body: "Lexical trigrams, vector embeddings, exact or transliterated names, and identifiers or BICs retrieve a shared candidate set.",
      },
      {
        title: "Compare the identity evidence.",
        body: "Inspect aliases, available attributes and supporting or conflicting evidence alongside the watchlist record.",
      },
      {
        title: "Keep the screening history.",
        body: "Versioned source ingestion, durable screening jobs, hits, triage and audit records preserve the context of a review.",
      },
    ],
    shift: [
      [
        "Exact spelling as the starting point",
        "Complementary routes across names and aliases",
      ],
      [
        "A score without the source",
        "Candidate evidence beside the watchlist record",
      ],
      ["A disconnected review", "A recorded screening and triage lifecycle"],
    ],
    stories: [
      {
        title: "Same name. Different identity?",
        role: "Screening analyst",
        problem:
          "A customer name resembles a watchlist alias, but other available attributes differ.",
        steps: [
          "Retrieve the possible candidate across name routes.",
          "Compare identifiers, dates and source attributes.",
          "Record the review and unresolved verification needs.",
        ],
        outcome:
          "An evidence-led disposition, without treating a name match as a confirmed designation.",
      },
      {
        title: "The beneficiary uses another spelling.",
        role: "Payments screening",
        problem:
          "A payment party uses a spelling variation that a literal comparison may not surface.",
        steps: [
          "Screen the supported payment-party information.",
          "Review the union of candidates from the retrieval routes.",
          "Inspect the source version and candidate details.",
        ],
        outcome: "A traceable candidate review across name variations.",
      },
      {
        title: "Which source informed this review?",
        role: "Screening operations",
        problem:
          "An analyst needs to reconstruct what the screening system knew when it generated a hit.",
        steps: [
          "Open the screening record and candidate.",
          "Inspect the retained watchlist source and version.",
          "Follow the hit lifecycle and recorded review.",
        ],
        outcome: "A screening history that can be examined after the event.",
      },
    ],
    related: ["kyc", "brain", "argus"],
    cta: "Walk through a screening case",
  },
  {
    slug: "kyc",
    name: "SqAId KYC",
    category: "Customer lifecycle",
    theme: "kyc",
    headline: "Know the customer.\nKeep the context.",
    lead: "Individual and business onboarding, policy-driven checks and ongoing review. Give each customer decision a clear trail from intake to review.",
    question: "Onboarding is a decision, not a checklist.",
    answer:
      "Documents, ownership, screening and risk policy need to come together. SqAId KYC organizes that evidence around a customer journey, with explicit review when a check is unresolved and maker-checker controls for decisions.",
    features: [
      {
        title: "One lifecycle for people and businesses.",
        body: "Capture individual and organization applications, related persons, consent and declared ownership.",
      },
      {
        title: "Policies with accountability.",
        body: "Versioned jurisdiction and journey policies, explainable risk factors and separate authoring and approval responsibilities.",
      },
      {
        title: "Context beyond onboarding.",
        body: "Party views, document review, case queues and scheduled periodic reviews keep customer context accessible.",
      },
    ],
    shift: [
      [
        "A form followed by separate checks",
        "A policy-led journey with evidence in context",
      ],
      [
        "Missing information treated as complete",
        "Unresolved checks routed to review",
      ],
      [
        "A one-time customer snapshot",
        "A lifecycle with periodic review and recorded decisions",
      ],
    ],
    stories: [
      {
        title: "Who really sits behind the business?",
        role: "KYB reviewer",
        problem:
          "An application lists owners and directors, but a declared ownership link is not yet verified.",
        steps: [
          "Capture the company and related people.",
          "Inspect ownership declarations and required evidence.",
          "Resolve the checks and route the case for the appropriate approval.",
        ],
        outcome:
          "A business review that preserves the distinction between declared and verified ownership.",
      },
      {
        title: "A check is unavailable. The decision cannot be.",
        role: "Onboarding operations",
        problem:
          "A required check cannot complete. An empty result must not become an approval.",
        steps: [
          "Evaluate the active journey policy.",
          "Keep incomplete or errored checks visible.",
          "Send the application to the review queue.",
        ],
        outcome:
          "An explicit human review path instead of a silent assumption.",
      },
      {
        title: "The relationship continues after approval.",
        role: "Customer due diligence",
        problem:
          "The team needs to revisit a customer under the applicable periodic review policy.",
        steps: [
          "Schedule the review using policy configuration.",
          "Bring the customer profile and documents into context.",
          "Record the updated review and decision.",
        ],
        outcome:
          "A continued review lifecycle with the customer history intact.",
      },
    ],
    related: ["abacus", "udm", "brain"],
    cta: "Walk through a customer journey",
  },
  {
    slug: "udm",
    name: "UDM",
    category: "Enterprise warehouse / Powering ARGUS",
    theme: "udm",
    headline: "One enterprise model.\nMore possibilities.",
    lead: "The enterprise warehouse powering ARGUS across AML, fraud, trade surveillance and entity resolution. Also a standalone product for enterprise-wide data, with canonical models, contracts and reconciliation.",
    question: "Every team should not have to redefine the same customer.",
    answer:
      "When systems disagree on entities, fields and relationships, each new use case starts with another mapping exercise. UDM organizes enterprise data around shared definitions that can support risk, surveillance and analytics.",
    features: [
      {
        title: "Model the enterprise.",
        body: "Connect parties, accounts, transactions, ownership, instruments, orders and executions through canonical definitions.",
      },
      {
        title: "Make data movement explicit.",
        body: "Define source contracts, stage and conform records, and reconcile counts, amounts, duplicates and missing keys before promotion.",
      },
      {
        title: "Build beyond one workload.",
        body: "Serve AML, fraud, trade surveillance, entity context and Brain. The engine-pluggable design separates the canonical model from its physical deployment.",
      },
    ],
    shift: [
      [
        "A mapping for every downstream team",
        "Canonical definitions shared across consumers",
      ],
      [
        "Load first, discover problems later",
        "Reconciliation before controlled promotion",
      ],
      [
        "A warehouse tied to one use case",
        "An enterprise foundation with multiple consumers",
      ],
    ],
    stories: [
      {
        title: "The totals do not reconcile.",
        role: "Data operations",
        problem:
          "A source delivery has a missing business key. Publishing it would leave downstream views incomplete.",
        steps: [
          "Validate the data contract and stage the records.",
          "Inspect reconciliation checks and rejected records.",
          "Correct the issue before promoting the affected data.",
        ],
        outcome:
          "A visible quality boundary between received data and data ready for consumption.",
      },
      {
        title: "A new surveillance use case, familiar data.",
        role: "Enterprise architecture",
        problem:
          "A team needs customer and account context alongside orders and executions.",
        steps: [
          "Map the source into canonical entities.",
          "Conform and reconcile the records.",
          "Expose the relevant model to the surveillance consumer.",
        ],
        outcome:
          "A shared foundation that can support additional workloads without redefining the enterprise.",
      },
      {
        title: "Where did this field come from?",
        role: "Analytics team",
        problem:
          "An analyst sees a customer attribute but needs to understand its origin and meaning.",
        steps: [
          "Find the canonical entity and field.",
          "Inspect the published mapping and source contract.",
          "Follow the definition into the connected consumer.",
        ],
        outcome:
          "A more inspectable path from source data to an analytical question.",
      },
    ],
    related: ["argus", "brain", "kyc"],
    cta: "Map your data to UDM",
  },
];
export const workloads: Product[] = [
  {
    slug: "fraud",
    name: "ARGUS Fraud",
    category: "ARGUS / Fraud",
    theme: "argus",
    headline: "Every event has\na bigger context.",
    lead: "Connect governed event ingestion, rule evaluation and an inspectable decision trail. Test changes before they become part of your fraud controls.",
    question: "A rule should be understood before it is trusted.",
    answer:
      "Fraud operations need to know which events reached evaluation, why a rule matched and how a proposed change behaves. ARGUS connects the event lifecycle with a Rule Lab for historical and shadow evaluation.",
    features: [
      {
        title: "Govern the incoming event.",
        body: "Validate supported message representations and normalize them through declared contracts.",
      },
      {
        title: "Evaluate with context.",
        body: "Inspect rule evidence, relevant event attributes and evaluation outcomes.",
      },
      {
        title: "Review the change.",
        body: "Author candidates, compare evaluations and retain the evidence for approval.",
      },
    ],
    shift: [
      ["An opaque alert", "An inspectable event and rule trail"],
      ["Change and hope", "Evaluate a candidate before approval"],
      ["An empty result", "Explicit incomplete evaluation state"],
    ],
    stories: [
      products[1].stories[1],
      {
        title: "Was the event actually evaluated?",
        role: "Fraud operations",
        problem:
          "An accepted message does not prove that a fraud rule evaluated it.",
        steps: [
          "Inspect the ingestion and normalization stages.",
          "Follow the event into rule evaluation.",
          "Keep incomplete results separate from no-match results.",
        ],
        outcome:
          "An operational view that distinguishes processing gaps from genuine outcomes.",
      },
    ],
    related: ["argus", "udm", "brain"],
    cta: "Explore a fraud workflow",
  },
  {
    slug: "aml",
    name: "ARGUS AML",
    category: "ARGUS / AML",
    theme: "argus",
    headline: "Behavior tells\na longer story.",
    lead: "Bring party and account profiles, peer comparisons and scenario evidence together. Follow the activity that turns a single alert into a useful investigation.",
    question: "One transaction rarely tells you enough.",
    answer:
      "Behavioral patterns emerge over time. ARGUS AML evaluates profiles and scenarios against enterprise data, giving investigators a starting point for examining activity and related context.",
    features: [
      {
        title: "Build behavioral context.",
        body: "Party and account profiles summarize activity over configured windows.",
      },
      {
        title: "Examine the deviation.",
        body: "Peer-group comparisons and scenario logic help identify activity that merits a closer look.",
      },
      {
        title: "Follow the funds.",
        body: "Connect the triggered scenario to transaction history and relevant relationships.",
      },
    ],
    shift: [
      ["A transaction in isolation", "Activity viewed over time"],
      ["An unexplained flag", "Profile and scenario context"],
      ["Manual reconstruction", "A connected funds narrative"],
    ],
    stories: [
      products[1].stories[0],
      {
        title: "Different from whom?",
        role: "AML analyst",
        problem:
          "An unusual volume may be normal for one kind of business and unexpected for another.",
        steps: [
          "Inspect the customer and account profile.",
          "Review the relevant peer comparison.",
          "Check the scenario and source transactions.",
        ],
        outcome:
          "A better-framed investigation question with context for the analyst.",
      },
    ],
    related: ["argus", "udm", "brain"],
    cta: "Explore an AML investigation",
  },
  {
    slug: "trade-surveillance",
    name: "ARGUS Trade Surveillance",
    category: "ARGUS / Trade surveillance",
    theme: "argus",
    headline: "Reconstruct the sequence.\nUnderstand the conduct.",
    lead: "Connect orders, cancellations and executions to account and trader context. Make the sequence behind a surveillance scenario visible.",
    question: "An order makes more sense in the company it keeps.",
    answer:
      "A cancellation and an opposite-side execution are different events. Together, their timing can raise a conduct question. ARGUS reconstructs order chains and evaluates scenarios to support an evidence-led review.",
    features: [
      {
        title: "Reconstruct the lifecycle.",
        body: "Bring order events into a chain so amendments, cancellations and fills can be examined together.",
      },
      {
        title: "Inspect the scenario.",
        body: "Review market-conduct and account-activity scenarios with the relevant trigger context.",
      },
      {
        title: "Connect the actor.",
        body: "Carry trader, account and relationship context into the review.",
      },
    ],
    shift: [
      ["A disconnected cancellation", "An order lifecycle in sequence"],
      [
        "A pattern treated as a verdict",
        "Evidence that supports a review question",
      ],
      ["Separate actor records", "Account and trader context together"],
    ],
    stories: [
      products[1].stories[2],
      {
        title: "The account needs a closer look.",
        role: "Supervision team",
        problem:
          "Trading activity raises a question that needs account context alongside executions.",
        steps: [
          "Review the account-activity scenario.",
          "Inspect the supporting event sequence.",
          "Document the context and follow-up questions.",
        ],
        outcome:
          "A focused supervision review without treating the scenario as proof of misconduct.",
      },
    ],
    related: ["argus", "udm", "brain"],
    cta: "Replay a surveillance scenario",
  },
  {
    slug: "entity-resolution",
    name: "ARGUS Entity Resolution",
    category: "ARGUS / Entity intelligence",
    theme: "argus",
    headline: "Connect the records.\nPreserve the evidence.",
    lead: "Explore identities and relationships across source records. Bring AI-assisted investigation and Neo4j graph context into a clearer view of connected risk.",
    question: "A shared attribute is a clue. It is not an identity.",
    answer:
      "An account owner, a declared shareholder and someone using the same device represent different relationships. Entity intelligence should preserve those distinctions, the source record and the questions that remain open.",
    features: [
      {
        title: "Keep the source visible.",
        body: "Mapped entities retain source references and qualified identifiers.",
      },
      {
        title: "Describe the relationship.",
        body: "Distinguish account ownership, declared ownership and other associations in the graph.",
      },
      {
        title: "Explore the neighborhood.",
        body: "Use connected graph exploration to inspect paths and source context. Resolution quality and merge workflows depend on the configured implementation.",
      },
    ],
    shift: [
      [
        "Similar records treated as identical",
        "Attributes and relationships inspected in context",
      ],
      [
        "An unlabeled connection",
        "A relationship with source and verification state",
      ],
      [
        "A graph without boundaries",
        "Visible source coverage and bounded exploration",
      ],
    ],
    stories: [
      {
        title: "Shared device. Shared identity?",
        role: "Fraud investigator",
        problem:
          "Two people use the same device. That observation does not establish that they are the same person.",
        steps: [
          "Inspect the device relationship and source.",
          "Compare account ownership and identity records.",
          "Keep the association separate from a verified identity.",
        ],
        outcome:
          "A graph that supports investigation without silently merging people.",
      },
      {
        title: "Declared ownership needs verification.",
        role: "Business-risk analyst",
        problem:
          "A business application names a shareholder whose ownership has not been verified.",
        steps: [
          "Inspect the declared ownership edge.",
          "Open the source record and verification status.",
          "Identify which supporting evidence is still needed.",
        ],
        outcome:
          "A clear distinction between an asserted relationship and a verified one.",
      },
    ],
    related: ["argus", "kyc", "brain"],
    cta: "Explore connected identities",
  },
];
export const allProducts = [...products, ...workloads];
export const findProduct = (slug: string) =>
  allProducts.find((p) => p.slug === slug);
export const productUrl = (slug: string) =>
  `/products/${workloads.some((p) => p.slug === slug) ? "argus/" : ""}${slug}`;
