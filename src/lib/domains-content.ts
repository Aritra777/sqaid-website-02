/**
 * Deep content for the four solution domain pages (/solutions/:slug).
 *
 * Replaces the previous 14 thin per-solution pages, which shared one skeleton
 * and one set of stats and therefore read as filler. Each of those 14 is now a
 * substantial anchored section inside its domain page, with material specific
 * to it: the named typologies it detects, the concrete signals it uses, and the
 * regulation it answers to.
 *
 * NUMBERS: none are written here. Sections reference metric ids resolved
 * through lib/metrics.ts, which drops anything unsubstantiated. See that file.
 */

export type DomainCapability = {
  /** legacy /solutions/:slug — now the anchor id on the domain page */
  slug: string;
  name: string;
  /** one line: what this actually is */
  summary: string;
  /** the specific failure of the status quo */
  problem: string;
  /** how it works here — concrete, not adjectives */
  approach: string;
  /** named typologies / attack patterns detected */
  detects: string[];
  /** the signals actually used to detect them */
  signals: string[];
  icon: string;
};

export type DomainContent = {
  slug: string;
  /** page title + positioning */
  title: string;
  lede: string;
  /** metric ids — resolved and filtered by lib/metrics.ts */
  metricIds: string[];
  /** regulatory and threat landscape for this domain */
  context: {
    heading: string;
    body: string[];
    /** the pressures driving change in this domain right now */
    pressures: { title: string; body: string }[];
  };
  capabilities: DomainCapability[];
  /** end-to-end pipeline for the domain */
  pipeline: { title: string; body: string }[];
  /** products delivering this domain */
  products: string[];
  /** regulation this domain answers to */
  frameworks: { name: string; detail: string }[];
};

export const DOMAINS: Record<string, DomainContent> = {
  /* ═══════════════════════════ FRAUD DETECTION ═══════════════════════════ */
  "fraud-detection": {
    slug: "fraud-detection",
    title: "Fraud Detection",
    lede: "Score every event inline — account opening, login, and payment — across every rail, and decide before the money moves.",
    metricIds: ["latency", "rails", "availability"],
    context: {
      heading: "Faster payments removed the recovery window.",
      body: [
        "Fraud controls were designed around a settlement delay that no longer exists. When a payment took days to clear, a next-morning alert still left time to recall the funds. On instant rails — FedNow, RTP, UPI, SEPA Instant, on-chain — settlement is final in seconds. A detection system that reports after the fact is producing a loss report, not a control.",
        "At the same time the fraud itself moved. The growth is no longer in stolen cards; it is in scams where the customer authorises the payment themselves, and in synthetic identities assembled specifically to satisfy onboarding checks. Neither trips a control built to spot an unauthorised transaction.",
      ],
      pressures: [
        {
          title: "Irreversible settlement",
          body: "Instant rails give no post-hoc recovery, so the decision has to happen inside the authorisation window or not at all.",
        },
        {
          title: "Reimbursement liability",
          body: "APP scam reimbursement rules shift the cost of authorised-push-payment fraud onto the institution, making scam detection a P&L line rather than a customer-service issue.",
        },
        {
          title: "Cross-rail actors",
          body: "The same actor blocked on cards reappears on ACH and then on-chain. One engine per rail means each one meets a first-time customer.",
        },
      ],
    },
    capabilities: [
      {
        slug: "transaction-monitoring",
        name: "Real-Time Transaction Monitoring",
        summary: "Inline scoring on every transaction, on every rail, inside the authorisation window.",
        problem:
          "Batch monitoring scores transactions after they settle, and static thresholds tuned years ago fire constantly on customers whose behaviour has since changed. The team clears noise while the actual intervention window closes.",
        approach:
          "Events from every rail normalise to one transaction schema at the edge, are enriched against customer profile, device, counterparty history and the entity graph, then scored by rules and models synchronously — so the verdict returns in time to decline rather than to observe.",
        detects: [
          "Velocity spikes against a per-customer baseline",
          "First-time-beneficiary payments at unusual value",
          "Round-dollar and just-under-threshold sequencing",
          "Dormant-then-active account reactivation",
          "Impossible-travel and geo-velocity conflicts",
        ],
        signals: [
          "Per-customer and per-segment behavioural baselines",
          "Device fingerprint and network reputation",
          "Counterparty history and mule-cluster proximity",
          "Channel, time-of-day, and amount distribution",
        ],
        icon: "Activity",
      },
      {
        slug: "ato-detection",
        name: "Account Takeover Detection",
        summary: "Continuous session scoring, so a hijack after authentication is still caught.",
        problem:
          "Login-time controls miss sessions hijacked after a legitimate authentication, and blunt device rules challenge travelling customers while real attackers pass quietly. The signals live in three separate tools that never compare notes.",
        approach:
          "Risk is re-evaluated throughout the session rather than at the door. Credential changes, contact-detail edits and new-beneficiary adds are treated as takeover precursors and correlated into one narrative, so the step-up lands at the point of highest signal and lowest friction.",
        detects: [
          "Credential stuffing and password spraying",
          "SIM-swap preceding a contact-detail change",
          "Session hijacking after valid authentication",
          "Remote-access-tool driven sessions",
          "Beneficiary add followed by immediate drain",
        ],
        signals: [
          "Device reputation, emulator and proxy detection",
          "Behavioural biometrics — navigation rhythm, interaction cadence",
          "Change-event sequencing across the session",
          "Destination-account mule-network proximity",
        ],
        icon: "ShieldOff",
      },
      {
        slug: "new-account-fraud",
        name: "New Account Fraud",
        summary: "Identity coherence and network position at onboarding, not element-by-element verification.",
        problem:
          "Synthetic identities are assembled from real fragments precisely so that each element verifies. The fraud is in the combination and in the behaviour that follows — a quiet account that builds limits for months and then busts out. Document-centric KYC cannot see either.",
        approach:
          "Verification signals are captured as inputs rather than as a verdict, the applicant is resolved into the entity graph to expose rings sharing devices, addresses or funding instruments, and monitoring continues post-approval so a bust-out trajectory is caught while it is still forming.",
        detects: [
          "Synthetic identities with valid but incoherent elements",
          "Application rings sharing device, address or funding source",
          "Bust-out trajectories in limit utilisation",
          "First-party fraud and never-pay accounts",
          "Shell entities in business onboarding",
        ],
        signals: [
          "Identity element coherence rather than element validity",
          "Shared-attribute graph linkage across applications",
          "Application-session behaviour — paste, hesitation, retries",
          "Post-approval velocity and repayment patterns",
        ],
        icon: "UserX",
      },
      {
        slug: "payment-fraud",
        name: "Payment Fraud & Scams",
        summary: "One decisioning layer across every rail, including authorised push payment scams.",
        problem:
          "A separate engine per rail means no shared memory of an actor. And on scam typologies the customer authorises the payment themselves, so unauthorised-transaction logic never fires — the victim is the one pressing send.",
        approach:
          "All rails share one schema, one model set and one memory, with rail-specific features layered on top. Beneficiary accounts and wallets are screened against mule clusters and on-chain exposure before release, and scam typologies are targeted through the behavioural fingerprint of a coerced payment rather than an unauthorised one.",
        detects: [
          "Authorised push payment scams — romance, investment, impersonation",
          "Invoice redirection and business email compromise",
          "Mule-account receipt and onward layering",
          "Card-not-present testing and enumeration",
          "Crypto off-ramp structuring",
        ],
        signals: [
          "Coerced-payment behavioural fingerprint — hesitation, guided entry",
          "Beneficiary risk and mule-cluster membership",
          "On-chain exposure at the fiat boundary",
          "Cross-rail actor identity resolution",
        ],
        icon: "CreditCard",
      },
    ],
    pipeline: [
      { title: "Ingest", body: "Events stream from every rail and normalise to one schema at the edge." },
      { title: "Enrich", body: "Profile, device, counterparty and graph context attach before any rule runs." },
      { title: "Evaluate", body: "Rules and models score the enriched event synchronously, inside the authorisation window." },
      { title: "Act", body: "Approve, challenge, hold or decline — with the full decision trace written to the audit log." },
    ],
    products: ["faro", "argus"],
    frameworks: [
      { name: "Reg E", detail: "Unauthorised electronic fund transfer liability and error resolution." },
      { name: "PSD2 / SCA", detail: "Strong customer authentication and transaction risk analysis exemptions." },
      { name: "Nacha WEB debit", detail: "Account validation requirements for internet-initiated debits." },
      { name: "FFIEC Authentication", detail: "Guidance on layered security and risk-based authentication." },
    ],
  },

  /* ═══════════════════════ AML & FINANCIAL CRIME ═══════════════════════ */
  "aml-financial-crime": {
    slug: "aml-financial-crime",
    title: "AML & Financial Crime",
    lede: "Typology-led detection, sanctions screening that survives an exam, and investigations that arrive already assembled.",
    metricIds: ["trace-hops", "ownership-hops", "availability"],
    context: {
      heading: "The alert queue is where AML programmes actually fail.",
      body: [
        "Few institutions fail an exam for having no controls. They fail for having controls that generate far more work than the team can absorb, so alerts are closed at speed rather than at depth, backlogs build, and the tuning that would fix it cannot be justified because the evidence to support a threshold change was never captured.",
        "Threshold-based detection is the root of it. A rule that fires on amount, velocity or geography catches structuring only when it is clumsy, and buries the team when it is not — while activity deliberately layered across accounts, entities and time windows never crosses any single threshold at all.",
      ],
      pressures: [
        {
          title: "Examiner focus on effectiveness",
          body: "Supervisors increasingly ask what a programme actually detects, not whether a policy document exists — which requires evidence a threshold-tuned system rarely retains.",
        },
        {
          title: "Beneficial ownership complexity",
          body: "Ownership and control structures put sanctioned exposure a hop or two away from any name a screening engine will ever match on.",
        },
        {
          title: "Model governance",
          body: "Anything model-driven now carries validation, explainability and monitoring obligations that have to be satisfied continuously rather than annually.",
        },
      ],
    },
    capabilities: [
      {
        slug: "aml-transaction-monitoring",
        name: "AML Transaction Monitoring",
        summary: "Behaviour-modelled typologies across the whole customer relationship, not thresholds per account.",
        problem:
          "Anyone structuring deliberately stays under the limit, so threshold rules catch only the careless while flooding the queue with legitimate activity. Alerts arrive as an account number and a rule name, leaving the analyst to assemble the story by hand.",
        approach:
          "Typologies are modelled as behaviours across every account, product and related party under one relationship. Related alerts consolidate into a single investigable case, and each one opens with counterparties, prior alerts, KYC context and the relevant graph neighbourhood already attached.",
        detects: [
          "Structuring and smurfing below reporting thresholds",
          "Layering through pass-through and funnel accounts",
          "Trade-based laundering — over- and under-invoicing",
          "Rapid movement of funds with no economic purpose",
          "Cross-border corridor and correspondent risk",
        ],
        signals: [
          "Relationship-level aggregation across accounts and products",
          "Expected versus actual activity from onboarding profile",
          "Counterparty network position in the entity graph",
          "Jurisdiction, corridor and correspondent exposure",
        ],
        icon: "ArrowLeftRight",
      },
      {
        slug: "sanctions-screening",
        name: "Sanctions & Watchlist Screening",
        summary: "Name matching tuned with evidence, plus the ownership traversal a string match cannot do.",
        problem:
          "Screening is a zero-miss obligation usually met with a fuzzy string match. Loose thresholds bury the team in hits on common names and transliterations; tight thresholds create strict-liability risk. Neither setting sees an unlisted entity that is majority-owned by someone who is listed.",
        approach:
          "Names normalise across transliteration, script and cultural ordering before comparison, and each candidate records why it matched rather than only how closely. Ownership and control links are then walked to surface indirect exposure, and cleared entities are remembered with their evidence so the same false hit stops recurring.",
        detects: [
          "Direct designations across OFAC, UN, EU and UK HMT lists",
          "Indirect exposure through ownership under the 50% rule",
          "Transliteration and script variants of designated names",
          "Vessel, aircraft and address-based designations",
          "Politically exposed persons and adverse-media subjects",
        ],
        signals: [
          "Culturally-aware name normalisation and ordering",
          "Ownership and control graph traversal",
          "Match-reason capture for every candidate",
          "Continuous portfolio rescreening on list change",
        ],
        icon: "ScanLine",
      },
      {
        slug: "customer-risk-rating",
        name: "Customer Risk Rating",
        summary: "Ratings that move when behaviour moves, with the factors that moved them on the record.",
        problem:
          "A rating scored at onboarding and revisited annually is wrong for most of the year, and the model behind it is often a spreadsheet whose weights nobody can justify. Review capacity goes to whoever is due rather than to whoever actually became risky.",
        approach:
          "Onboarding profile sets the baseline; actual behaviour is then compared against declared expectations continuously. Material divergence moves the rating automatically with the triggering evidence attached, and the new rating drives monitoring thresholds, review cadence and enhanced due diligence.",
        detects: [
          "Activity materially diverging from declared expectations",
          "Product or geography expansion beyond the onboarding profile",
          "Emerging adverse media or PEP status",
          "Ownership or control changes in business customers",
        ],
        signals: [
          "Expected-versus-actual activity comparison",
          "Behavioural drift against the customer's own baseline",
          "Network exposure to higher-rated counterparties",
          "Explainable factor decomposition on every score",
        ],
        icon: "Gauge",
      },
      {
        slug: "financial-crime-investigation",
        name: "Financial Crime Investigation",
        summary: "Deep funds tracing and assembled evidence, so the analyst starts at the conclusion.",
        problem:
          "Ask an investigator where the day goes and it is rarely analysis. It is pulling statements, cross-referencing counterparties, checking prior alerts and searching adverse media. The judgement takes minutes; the assembly around it takes hours, and manual tracing realistically reaches two or three hops when layering is designed to run deeper.",
        approach:
          "Agents walk the entity graph well beyond manual depth, following funds through intermediaries with hop-decay scoring so the trail stays meaningful. Counterparty history, adverse media, sanctions exposure and prior cases assemble into an evidence pack, and a proposed disposition arrives with every claim linked to its source.",
        detects: [
          "Funds flow through layered intermediaries",
          "Fan-in and fan-out mule structures",
          "Cross-chain and cross-border hand-offs",
          "Shell and pass-through entity chains",
          "Circular flows returning to origin",
        ],
        signals: [
          "Multi-hop graph traversal with hop-decay weighting",
          "Entity resolution across accounts and identifiers",
          "Adverse media resolved to the named entity",
          "Prior alert and case history on every party",
        ],
        icon: "GitMerge",
      },
    ],
    pipeline: [
      { title: "Detect", body: "Typology models run across the full customer relationship rather than one account at a time." },
      { title: "Assemble", body: "Each alert opens with counterparties, prior alerts, KYC context and graph neighbourhood attached." },
      { title: "Investigate", body: "Agents traverse the graph, gather evidence, and propose a disposition with its reasoning." },
      { title: "Dispose", body: "The analyst confirms, escalates or files — and the outcome returns as a training label." },
    ],
    products: ["argus", "case-manager"],
    frameworks: [
      { name: "FFIEC BSA/AML Manual", detail: "The examination standard for US programme adequacy and effectiveness." },
      { name: "31 CFR 1020.320", detail: "Suspicious activity reporting obligation and filing deadline." },
      { name: "OFAC 50 Percent Rule", detail: "Indirect sanctions exposure through ownership and control." },
      { name: "FATF Recommendations", detail: "Risk-based approach, CDD, and suspicious transaction reporting." },
    ],
  },

  /* ═══════════════════════ COMPLIANCE OPERATIONS ═══════════════════════ */
  "compliance-operations": {
    slug: "compliance-operations",
    title: "Compliance Operations",
    lede: "Case lifecycle, regulatory filing, and the reporting an examiner asks for — in one workspace with lineage on every action.",
    metricIds: ["sar-deadline", "retention", "ctr-threshold"],
    context: {
      heading: "Case management became four tools and a spreadsheet.",
      body: [
        "Alerts live in the monitoring system, notes in a ticketing tool, evidence on a shared drive, filings in a separate portal — and the queue tying them together is a spreadsheet somebody maintains by hand. Nothing reconciles, the audit trail spans four systems with timestamps that disagree, and every workflow change is a vendor ticket measured in weeks.",
        "The cost shows up twice: in the investigator's day, and in exam preparation, when weeks of senior capacity go into assembling numbers that should already exist and proving how each one was derived.",
      ],
      pressures: [
        {
          title: "Filing deadlines do not move",
          body: "Statutory clocks run from detection regardless of backlog, and a deadline tracked in a spreadsheet is a late filing waiting to happen.",
        },
        {
          title: "Segregation of duties",
          body: "Maker-checker and four-eyes requirements have to be enforced by the system, not by convention, to survive scrutiny.",
        },
        {
          title: "Evidence on demand",
          body: "Examiners increasingly ask to trace a specific figure back to source records, which a hand-assembled export cannot support.",
        },
      ],
    },
    capabilities: [
      {
        slug: "case-management",
        name: "Case Management",
        summary: "Intake to disposition in one configurable workspace, with immutable lineage throughout.",
        problem:
          "Reconstructing who did what and when means exporting from several systems and hoping they agree. Adding a queue or an approval step becomes a change request, and SLA breach depends on somebody noticing a spreadsheet.",
        approach:
          "Alerts, referrals and tips arrive in one queue with deduplication applied. Rules route by risk, type and skill with SLA clocks starting automatically, evidence and findings accumulate on the case record, and compliance teams change stages, queues and approvals themselves in a visual builder.",
        detects: [
          "SLA breach risk before the deadline is missed",
          "Duplicate and related alerts across systems",
          "Queue imbalance and analyst capacity drift",
          "Cases stalled without disposition",
        ],
        signals: [
          "Automatic ageing clocks with escalation paths",
          "Alert consolidation into single investigable cases",
          "Role-based access enforced at the data layer",
          "Immutable record of every view, edit and decision",
        ],
        icon: "Kanban",
      },
      {
        slug: "sar-filing",
        name: "SAR & CTR Filing",
        summary: "Evidence-linked narratives drafted for review, filed on time, retained to schedule.",
        problem:
          "A narrative has to be clear enough for a reader with no context and precise enough to survive scrutiny. Writing one well takes an experienced investigator real time; multiply by volume, add a statutory clock, and quality becomes the thing that gets sacrificed.",
        approach:
          "The draft is generated from the case evidence in the who/what/when/where/why structure reviewers expect, with every factual claim carrying a reference to the record behind it. The investigator verifies by clicking through and edits in place, four-eyes sign-off is enforced before submission, and retention is handled automatically.",
        detects: [
          "Continuing activity requiring a linked follow-up filing",
          "Filing deadline approach and breach risk",
          "Narrative claims lacking supporting evidence",
          "Missing mandatory fields before submission",
        ],
        signals: [
          "Generation constrained to the case record",
          "Per-claim evidence references in the draft",
          "Statutory clock tracked from detection date",
          "Maker-checker enforcement before submission",
        ],
        icon: "FilePen",
      },
      {
        slug: "regulatory-reporting",
        name: "Regulatory Reporting",
        summary: "Examiner-ready reporting generated from live data, with drill-through to source.",
        problem:
          "When the request list arrives the team starts exporting: alert volumes from one system, dispositions from another, filing counts from a third. Numbers get reconciled by hand under time pressure, and a challenged figure becomes its own project.",
        approach:
          "Detection, investigation and filing data land in one analytics layer with metric definitions specified once and versioned, so a number means the same thing over time. Reports build on a schedule from live data, and any aggregate decomposes to the individual records that produced it.",
        detects: [
          "Metric drift between systems and periods",
          "Model and rule performance degradation",
          "Coverage gaps against the risk assessment",
          "Figures that cannot be traced to source",
        ],
        signals: [
          "Versioned, single-definition metrics",
          "Drill-through from aggregate to record",
          "Continuous model performance monitoring",
          "Scheduled board and regulatory returns",
        ],
        icon: "ClipboardList",
      },
    ],
    pipeline: [
      { title: "Intake", body: "Alerts, referrals and tips arrive in one queue, deduplicated and consolidated." },
      { title: "Assign", body: "Rules route by risk, type and skill, with SLA clocks starting automatically." },
      { title: "Investigate", body: "Evidence, notes and agent findings accumulate on a single case record." },
      { title: "File", body: "Close, escalate or file — with four-eyes review and automatic retention." },
    ],
    products: ["case-manager", "abacus"],
    frameworks: [
      { name: "31 CFR 1020.320", detail: "SAR filing obligation, content, and the 30-day deadline." },
      { name: "31 CFR 1010.311", detail: "Currency transaction reporting above the statutory threshold." },
      { name: "31 CFR 1010.430", detail: "Record retention period and retrievability requirements." },
      { name: "SOX segregation of duties", detail: "Maker-checker separation across sensitive workflow actions." },
    ],
  },

  /* ═════════════════════════ AI & AUTOMATION ═════════════════════════ */
  "ai-automation": {
    slug: "ai-automation",
    title: "AI & Automation",
    lede: "Specialist agents that investigate every alert, show their reasoning, and leave the disposition to a person.",
    metricIds: ["trace-hops", "products", "availability"],
    context: {
      heading: "You cannot hire your way out of alert volume — and you cannot defend a black box.",
      body: [
        "Alert volume grows with the business; headcount does not. The usual response is to raise thresholds until volume fits capacity, which is a detection decision made for a staffing reason and an uncomfortable one to explain to an examiner.",
        "The obvious alternative is automation, and most teams cannot accept the version on offer. A model that outputs a disposition without reasoning is not defensible, and a general-purpose language model pointed at a case produces fluent prose that hedges where it should be specific and occasionally asserts what the evidence does not support. Reviewing that carefully costs back everything it saved.",
      ],
      pressures: [
        {
          title: "Detection set by headcount",
          body: "When thresholds are tuned to capacity, coverage is determined by staffing rather than by risk appetite — and that is what gets examined.",
        },
        {
          title: "Explainability obligations",
          body: "Model governance and emerging AI regulation both require that an automated conclusion can be traced, explained, and overseen by a person.",
        },
        {
          title: "Unverifiable output",
          body: "A narrative with no citations forces the reviewer to re-derive every fact, which removes the point of generating it.",
        },
      ],
    },
    capabilities: [
      {
        slug: "agentic-investigation",
        name: "Agentic Investigation",
        summary: "A configurable fleet of specialists works every alert end to end, in parallel, with sources attached.",
        problem:
          "Depth trades against volume: give every alert a full workup and the queue never clears; clear the queue and the workups are shallow. Automation would resolve it, but only if its conclusions can be defended.",
        approach:
          "Compose a fleet from specialist agents — graph traversal, adverse media, sanctions exposure, behavioural analysis — and set what fires on which alert types. Every qualifying alert triggers the fleet automatically; agents work in parallel, each contributing findings with its sources, and the analyst receives a recommendation plus the full reasoning chain.",
        detects: [
          "Graph exposure a threshold rule cannot express",
          "Adverse media relevant to the specific entity",
          "Sanctions proximity through intermediaries",
          "Behavioural divergence across the relationship",
        ],
        signals: [
          "Composable agent fleet, configured not coded",
          "Parallel specialist execution per alert",
          "Explicit reasoning chain on every conclusion",
          "Analyst decisions returned as training labels",
        ],
        icon: "Bot",
      },
      {
        slug: "ai-narrative",
        name: "AI Narrative Generation",
        summary: "Filing-ready prose grounded in the case record, with each claim linked to its evidence.",
        problem:
          "A fluent paragraph with no citations is a liability on a regulatory filing. Cautious models hedge, weakening the narrative; confident ones occasionally state what the evidence does not support. Either way the reviewer has to start over.",
        approach:
          "Generation is constrained to the case record, so claims outside the evidence are not produced. Output follows the structure FIU reviewers expect, names and accounts resolve to their records for instant verification, and every change from draft to filed version is retained for audit.",
        detects: [
          "Claims in a draft lacking supporting evidence",
          "Entity references that do not resolve to a record",
          "Missing elements against the expected structure",
          "Divergence from house filing standards",
        ],
        signals: [
          "Generation grounded in the case record only",
          "Clickable per-claim evidence references",
          "Configurable tone and terminology controls",
          "Full draft-to-filed edit history",
        ],
        icon: "PenLine",
      },
      {
        slug: "mcp-server",
        name: "MCP Server Integration",
        summary: "The whole platform exposed to any compliant client through one Model Context Protocol endpoint.",
        problem:
          "Teams want risk data where they already work — a chat client, an internal copilot, a notebook. Traditionally each means bespoke integration against a REST API with its own auth handling and its own permission logic to get wrong.",
        approach:
          "One standards-compliant endpoint advertises available tools and resources, so clients need no hardcoded schema and nothing breaks as the platform gains features. Every call is checked against the caller's existing platform permissions and logged with the same lineage as UI access.",
        detects: [
          "Calls exceeding the caller's platform permissions",
          "Programmatic access requiring the same audit trail",
        ],
        signals: [
          "Runtime tool and resource discovery",
          "RBAC parity with the platform UI",
          "Identical audit lineage to UI access",
          "Works with any MCP-compatible client",
        ],
        icon: "Plug",
      },
    ],
    pipeline: [
      { title: "Configure", body: "Compose the agent fleet and set what fires on which alert types." },
      { title: "Dispatch", body: "Every qualifying alert triggers the fleet automatically — nothing waits for a human to start it." },
      { title: "Investigate", body: "Specialists work in parallel, each contributing findings with sources attached." },
      { title: "Hand off", body: "The analyst receives a recommendation, the reasoning chain, and the evidence trail." },
    ],
    products: ["argus", "case-manager"],
    frameworks: [
      { name: "SR 11-7", detail: "Model risk management — validation, documentation, and ongoing monitoring." },
      { name: "EU AI Act", detail: "High-risk system obligations covering transparency and human oversight." },
      { name: "FinCEN SAR guidance", detail: "Narrative content expectations for filed reports." },
      { name: "Model Context Protocol", detail: "The open specification the integration endpoint implements." },
    ],
  },
};

export const DOMAIN_LIST = Object.values(DOMAINS);
export const getDomainContent = (slug: string): DomainContent | undefined =>
  DOMAINS[slug];

/** legacy /solutions/:slug → { domain, anchor } for redirects */
export const LEGACY_SOLUTION_MAP: Record<string, { domain: string; anchor: string }> =
  Object.fromEntries(
    DOMAIN_LIST.flatMap((d) =>
      d.capabilities.map((c) => [c.slug, { domain: d.slug, anchor: c.slug }])
    )
  );
