/**
 * Deep-dive content for /industries/:slug — one entry per slug in nav-data's
 * INDUSTRIES. Identity/blurb stays in nav-data.ts; this is the page body.
 *
 * NUMBERS: none are written here. `metricIds` reference lib/metrics.ts, which
 * drops any claim without a real basis, so an unsubstantiated figure cannot
 * reach the page.
 */

export type IndustryChallenge = { title: string; body: string; icon: string };

export type IndustryContent = {
  /** accent theme class for the page */
  theme: string;
  /** one-line positioning under the page title */
  summary: string;
  /** metric ids resolved (and filtered) through lib/metrics.ts */
  metricIds: string[];
  /** the operating reality for this segment */
  context: { title: string; body: string };
  challenges: IndustryChallenge[];
  /** solution slugs that matter most here, in priority order */
  solutions: string[];
  /** product slugs most relevant to this segment */
  products: string[];
  /** regulators / regimes this segment answers to */
  regulators: string[];
  /** what "good" looks like once deployed */
  outcomes: { title: string; body: string }[];
};

export const INDUSTRY_CONTENT: Record<string, IndustryContent> = {
  fintech: {
    theme: "theme-faro",
    metricIds: ["latency", "rails", "availability"],
    summary:
      "Ship compliant from day one and scale controls with volume — without a compliance team the size of a bank's.",
    context: {
      title: "Growth is the compliance problem.",
      body: "A fintech's risk profile changes every quarter: new products, new rails, new geographies, and volume that can multiply in a single campaign. Controls specified for last year's business break quietly, usually at exactly the moment a sponsor bank or regulator starts asking questions. Meanwhile the compliance function is a handful of people who cannot absorb a linear increase in alert volume.",
    },
    challenges: [
      {
        title: "Controls that do not scale with volume",
        body: "Alert volume grows with transactions; headcount does not. Thresholds end up tuned to capacity rather than to risk.",
        icon: "TrendingDown",
      },
      {
        title: "Sponsor and partner scrutiny",
        body: "Bank partners increasingly demand evidence of monitoring quality, not just the existence of a policy.",
        icon: "ClipboardList",
      },
      {
        title: "Vendor sprawl",
        body: "A separate tool for KYC, screening, monitoring, and cases means no shared view of a customer and four integrations to maintain.",
        icon: "Unplug",
      },
      {
        title: "Fraud arrives before the controls do",
        body: "New products attract fraud testing immediately, usually well before dedicated detection exists for them.",
        icon: "ShieldAlert",
      },
    ],
    solutions: [
      "fraud-detection",
      "aml-financial-crime",
      "compliance-operations",
    ],
    products: ["faro", "argus", "case-manager"],
    regulators: [
      "FinCEN (US MSB / BSA obligations)",
      "State money-transmitter licensing",
      "Sponsor bank oversight programmes",
      "FCA / EU equivalents where licensed",
    ],
    outcomes: [
      {
        title: "One platform instead of six",
        body: "KYC signals, monitoring, screening, cases, and filing share one customer view and one audit trail.",
      },
      {
        title: "Controls that grow with you",
        body: "Detection scales with volume because triage is automated, so thresholds stay set by risk rather than headcount.",
      },
      {
        title: "Diligence answered with evidence",
        body: "Sponsor and partner reviews are met with live reporting rather than a scramble for spreadsheets.",
      },
    ],
  },

  banks: {
    theme: "theme-argus",
    metricIds: ["trace-hops", "ownership-hops", "availability"],
    summary:
      "Modernise legacy monitoring without ripping it out — run in parallel, prove the numbers, then migrate.",
    context: {
      title: "The core system is not the problem. The alert queue is.",
      body: "Established institutions rarely suffer from a lack of controls — they suffer from controls that generate more work than the team can absorb. A legacy monitoring platform produces a very high false-positive rate, each alert takes an experienced analyst a long time to work, and the tuning history needed to defend any threshold change is scattered across a decade of documents. Replacing the system wholesale is a multi-year programme nobody wants to sponsor.",
    },
    challenges: [
      {
        title: "Alert volume outstrips capacity",
        body: "The overwhelming majority of alerts close as non-suspicious, but every one still costs analyst time.",
        icon: "Layers",
      },
      {
        title: "Tuning cannot be defended",
        body: "Threshold changes need evidence an examiner will accept, and that evidence usually does not exist.",
        icon: "SlidersHorizontal",
      },
      {
        title: "Replacement risk is unacceptable",
        body: "Ripping out a monitoring platform means a coverage gap no risk committee will approve.",
        icon: "ShieldAlert",
      },
      {
        title: "Institutional knowledge is walking out",
        body: "The analysts who know why a rule exists are retiring, and the rationale was never written down.",
        icon: "Users",
      },
    ],
    solutions: [
      "aml-financial-crime",
      "compliance-operations",
    ],
    products: ["argus", "case-manager", "abacus"],
    regulators: [
      "FFIEC BSA/AML examination",
      "OCC / FRB / FDIC supervision",
      "FinCEN SAR & CTR obligations",
      "OFAC sanctions compliance",
    ],
    outcomes: [
      {
        title: "Parallel run, then migrate",
        body: "Deploy alongside the existing platform, compare outcomes on real traffic, and move only once the evidence is in hand.",
      },
      {
        title: "Analyst time back on real risk",
        body: "Agentic triage absorbs the queue clearing that currently consumes most of the team's day.",
      },
      {
        title: "Tuning you can defend",
        body: "Every threshold change is simulated, versioned, and evidenced before it reaches production.",
      },
    ],
  },

  crypto: {
    theme: "theme-argus",
    metricIds: ["trace-hops", "ownership-hops", "rails"],
    summary:
      "One risk picture across on-chain and off-chain activity — because the trail does not stop at the exchange boundary.",
    context: {
      title: "Chain analytics stops exactly where your risk begins.",
      body: "On-chain analytics tells you a wallet is risky. Your compliance obligation is about a customer. Most teams run a blockchain analytics vendor on one side, a traditional monitoring system on the other, and reconcile the two by hand — which means the moment funds cross between fiat and chain, the trail breaks. Add pseudonymous counterparties, mixers, cross-chain bridges, and a market that never closes, and manual reconciliation is not a strategy.",
    },
    challenges: [
      {
        title: "The trail breaks at the fiat boundary",
        body: "Chain analytics and transaction monitoring are separate systems, so cross-boundary flows are reconstructed manually.",
        icon: "Split",
      },
      {
        title: "Travel Rule counterparty data",
        body: "Originator and beneficiary information must move with the transfer, across VASPs with wildly varying maturity.",
        icon: "ArrowLeftRight",
      },
      {
        title: "Mixers and bridges obscure origin",
        body: "Funds routed through mixing services or cross-chain bridges need hop-decay reasoning, not a binary flag.",
        icon: "GitMerge",
      },
      {
        title: "Sanctions exposure is indirect",
        body: "A wallet is rarely listed itself; exposure usually arrives through intermediaries a few hops away.",
        icon: "Network",
      },
    ],
    solutions: [
      "fraud-detection",
      "aml-financial-crime",
      "compliance-operations",
    ],
    products: ["argus", "faro", "case-manager"],
    regulators: [
      "FATF Travel Rule (Recommendation 16)",
      "FinCEN MSB registration & obligations",
      "OFAC designated wallet addresses",
      "MiCA (EU) where in scope",
    ],
    outcomes: [
      {
        title: "One trail, chain to fiat",
        body: "On-chain and off-chain activity resolve to the same customer in the same graph, so the trail never breaks.",
      },
      {
        title: "Hop-decay risk reasoning",
        body: "Exposure through intermediaries is scored by distance rather than treated as a binary contamination flag.",
      },
      {
        title: "Travel Rule data handled",
        body: "Counterparty information captured, validated, and retained with the transfer record.",
      },
    ],
  },

  "sponsor-banks": {
    theme: "theme-case-manager",
    metricIds: ["products", "solutions", "availability"],
    summary:
      "See every fintech programme you sponsor in one place — with the evidence your examiner will ask for.",
    context: {
      title: "You carry the regulatory risk for programmes you do not operate.",
      body: "Sponsor banks are accountable for the compliance of every fintech programme on their charter, but the actual monitoring usually happens inside each partner's stack. Oversight then becomes a quarterly document request: spreadsheets in different formats, metrics defined differently by each partner, and no way to compare one programme against another or spot a deteriorating one before an examiner does.",
    },
    challenges: [
      {
        title: "Oversight is a document request",
        body: "Partner reporting arrives quarterly in inconsistent formats, which is far too slow to manage risk.",
        icon: "Files",
      },
      {
        title: "Metrics are not comparable",
        body: "Each programme defines alert rates and dispositions differently, so no portfolio view is possible.",
        icon: "Split",
      },
      {
        title: "Problems surface late",
        body: "A deteriorating programme is usually identified by the examiner rather than by the sponsor.",
        icon: "Clock",
      },
      {
        title: "Accountability without control",
        body: "The charter carries the regulatory risk while the monitoring runs inside someone else's system.",
        icon: "ShieldAlert",
      },
    ],
    solutions: [
      "compliance-operations",
      "aml-financial-crime",
    ],
    products: ["abacus", "case-manager", "argus"],
    regulators: [
      "OCC / FRB / FDIC third-party risk guidance",
      "FFIEC BSA/AML examination",
      "FinCEN SAR obligations across programmes",
      "Interagency third-party relationship guidance",
    ],
    outcomes: [
      {
        title: "Every programme in one view",
        body: "Consistent metric definitions across partners make the whole portfolio comparable at a glance.",
      },
      {
        title: "Deterioration caught early",
        body: "Trend monitoring flags a slipping programme while there is still time to remediate it.",
      },
      {
        title: "Examiner requests already answered",
        body: "Oversight evidence is generated continuously rather than assembled ahead of each exam.",
      },
    ],
  },
};

export const getIndustryContent = (slug: string): IndustryContent | undefined =>
  INDUSTRY_CONTENT[slug];
