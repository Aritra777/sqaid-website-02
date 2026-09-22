import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Database,
  FileText,
  GitBranch,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import s from "./Workspace.module.css";

// metrics-guard:mock-ui — all records and figures here are synthetic; every workspace is visibly labeled.
const records = [
  {
    label: "Customer",
    name: "Mira Bennett",
    detail:
      "Customer profile · retail customer. Account ownership is verified within this illustrative dataset.",
    source: "KYC · customer profile",
    x: 19,
    y: 26,
  },
  {
    label: "Account",
    name: "Primary account",
    detail:
      "The account belongs to Mira. The transaction record connects this account to the payment under review.",
    source: "UDM · account record",
    x: 19,
    y: 73,
  },
  {
    label: "Activity",
    name: "Onward payment",
    detail:
      "A payment to Aster Trading follows incoming activity. Timing provides context; it does not establish wrongdoing.",
    source: "ARGUS · transaction event",
    x: 51,
    y: 50,
  },
  {
    label: "Business",
    name: "Aster Trading",
    detail:
      "The beneficiary is a business. Its account relationship is available; the purpose of the transfer needs verification.",
    source: "UDM · beneficiary record",
    x: 81,
    y: 26,
  },
  {
    label: "Review",
    name: "Open question",
    detail:
      "Confirm the commercial purpose and compare it with the customer’s expected activity before deciding.",
    source: "Brain · review context",
    x: 81,
    y: 73,
  },
];
export function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${s.panel} ${className}`}>
      <div className={s.top}>
        <span>
          <i />
          {title}
        </span>
        <small>ILLUSTRATIVE DATA</small>
      </div>
      {children}
      <div className={s.bottom}>
        <ShieldCheck size={12} />
        <span>Interactive product illustration · synthetic records</span>
      </div>
    </div>
  );
}
const graphVariants: Record<string, typeof records> = {
  aml: [
    {
      label: "Incoming",
      name: "Supplier receipts",
      detail:
        "Incoming activity from several counterparties is visible in the synthetic transaction history.",
      source: "UDM · incoming transactions",
      x: 19,
      y: 26,
    },
    {
      label: "Profile",
      name: "Expected activity",
      detail:
        "The declared profile describes occasional supplier payments. Verify whether that expectation remains current.",
      source: "KYC · declared activity",
      x: 19,
      y: 73,
    },
    {
      label: "Account",
      name: "Aster account",
      detail:
        "Incoming activity and onward transfers meet at this account. Compare the sequence with its business context.",
      source: "UDM · account history",
      x: 51,
      y: 50,
    },
    {
      label: "Outgoing",
      name: "Onward transfers",
      detail:
        "Funds leave after incoming activity. The commercial purpose still needs supporting evidence.",
      source: "ARGUS · funds sequence",
      x: 81,
      y: 26,
    },
    {
      label: "Scenario",
      name: "Behavior review",
      detail:
        "The profile and transaction sequence create a review question. A scenario is a starting point for investigation.",
      source: "ARGUS AML · scenario context",
      x: 81,
      y: 73,
    },
  ],
  "entity-resolution": [
    {
      label: "Customer",
      name: "Mira Bennett",
      detail:
        "A customer record is mapped to a source-qualified entity. Its identity is distinct from any associated device.",
      source: "KYC · customer record",
      x: 19,
      y: 26,
    },
    {
      label: "Account",
      name: "Verified owner",
      detail:
        "The supplied account record links this account to Mira as its owner within the synthetic fixture.",
      source: "UDM · account ownership",
      x: 19,
      y: 73,
    },
    {
      label: "Entity",
      name: "Connected profile",
      detail:
        "The graph connects source records without making a new claim that every associated record is the same identity.",
      source: "Neo4j · mapped entity context",
      x: 51,
      y: 50,
    },
    {
      label: "Business",
      name: "Declared interest",
      detail:
        "A declared ownership relationship needs supporting verification. It is distinct from verified account ownership.",
      source: "KYC · declared ownership",
      x: 81,
      y: 26,
    },
    {
      label: "Association",
      name: "Shared device",
      detail:
        "A device association is an investigative clue. Shared use does not prove identity or business ownership.",
      source: "ARGUS · device association",
      x: 81,
      y: 73,
    },
  ],
};
export function EvidenceGraph({
  compact = false,
  mode = "default",
}: {
  compact?: boolean;
  mode?: string;
}) {
  const [selected, setSelected] = useState(2);
  const graphRecords = graphVariants[mode] || records;
  const record = graphRecords[selected];
  return (
    <Panel title="CONNECTED RISK VIEW">
      <div className={s.graphIntro}>
        <Network size={17} />
        <span>
          {mode === "aml"
            ? "Follow the activity over time."
            : mode === "entity-resolution"
              ? "Every relationship has a meaning."
              : "One event. A wider context."}
        </span>
        <small>SELECT A NODE</small>
      </div>
      <div className={`${s.graph} ${compact ? s.compact : ""}`}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M19 26V73 M19 26L51 50 M19 73L51 50 M51 50L81 26 M51 50L81 73 M81 26V73" />
          <path className={s.activePath} d={`M51 50L${record.x} ${record.y}`} />
        </svg>
        {graphRecords.map((r, i) => (
          <button
            key={r.label}
            style={{ left: `${r.x}%`, top: `${r.y}%` }}
            className={`${s.node} ${selected === i ? s.selected : ""}`}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span>
              {i === 0 ? (
                <UserRound size={18} />
              ) : i === 2 ? (
                <GitBranch size={18} />
              ) : i === 4 ? (
                <Search size={18} />
              ) : (
                <Database size={18} />
              )}
            </span>
            <small>{r.label}</small>
            <strong>{r.name}</strong>
          </button>
        ))}
      </div>
      <div className={s.inspector} aria-live="polite">
        <div>
          <span className={s.label}>{record.source}</span>
          <strong>{record.name}</strong>
        </div>
        <p>{record.detail}</p>
      </div>
    </Panel>
  );
}
const answers = [
  {
    q: "Why does this activity need a closer look?",
    text: "The onward payment follows incoming activity. Compare the commercial purpose with the customer’s expected behavior before drawing a conclusion.",
    sources: ["Transaction event", "Customer profile", "Beneficiary record"],
    evidence: [
      "An onward payment to Aster Trading appears after incoming activity. The sequence is evidence of timing, not intent.",
      "The illustrative customer profile describes occasional supplier payments. It does not explain this particular transaction.",
      "Aster Trading is the named beneficiary. The purpose of the payment remains unverified.",
    ],
    bars: [35, 46, 32, 78, 86, 64],
  },
  {
    q: "What do we know about this relationship?",
    text: "The account belongs to Mira Bennett. A payment links it to Aster Trading. A payment relationship does not establish ownership of the business.",
    sources: ["Account ownership", "Payment record", "Relationship mapping"],
    evidence: [
      "The account-to-customer relationship is verified within this synthetic fixture.",
      "The account paid Aster Trading. That is a transaction relationship only.",
      "No verified equity ownership edge is supplied between Mira and Aster Trading.",
    ],
    bars: [28, 28, 42, 42, 65, 65],
  },
  {
    q: "What should the reviewer verify next?",
    text: "Verify the purpose of the transfer and supporting documents. Then compare the explanation with the transaction and customer records. The available evidence does not settle that question.",
    sources: ["Review question", "Source coverage", "Customer record"],
    evidence: [
      "Obtain evidence of the commercial purpose of the transfer.",
      "This illustration includes a customer, account and payment context. It does not include an invoice.",
      "Use the declared expected activity as context, then check whether it is still current.",
    ],
    bars: [62, 48, 54, 38, 30, 24],
  },
];
export function BrainWorkspace() {
  const [question, setQuestion] = useState(0);
  const [source, setSource] = useState<number | null>(null);
  const a = answers[question];
  return (
    <Panel title="BRAIN / CONNECTED COMPANION">
      <div className={s.brainBody}>
        <div className={s.workspaceLabel}>
          <Sparkles size={16} /> Risk investigation workspace{" "}
          <span>PREVIEW</span>
        </div>
        <div className={s.questionList}>
          {answers.map((v, i) => (
            <button
              key={v.q}
              aria-pressed={question === i}
              className={question === i ? s.chosen : ""}
              onClick={() => {
                setQuestion(i);
                setSource(null);
              }}
            >
              {v.q}
              <ArrowUpRight size={14} />
            </button>
          ))}
        </div>
        <div className={s.activity}>
          <span>
            <Check size={12} /> Sources retrieved
          </span>
          <ChevronRight size={12} />
          <span>
            <Check size={12} /> Context assembled
          </span>
        </div>
        <div className={s.answer} key={question}>
          <div className={s.answerIcon}>
            <Sparkles size={17} />
          </div>
          <div>
            <small className={s.label}>CONNECTED FINDING</small>
            <p>{a.text}</p>
            <div className={s.sourceChips}>
              {a.sources.map((v, i) => (
                <button
                  key={v}
                  aria-pressed={source === i}
                  onClick={() => setSource(source === i ? null : i)}
                >
                  <FileText size={11} />
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
        {source !== null ? (
          <div className={s.sourceDetail} aria-live="polite">
            <span className={s.label}>SOURCE / {a.sources[source]}</span>
            <p>{a.evidence[source]}</p>
          </div>
        ) : (
          <div className={s.miniChart}>
            <span>Illustrative activity pattern</span>
            <div>
              {a.bars.map((v, i) => (
                <i key={i} style={{ height: `${v}%` }} />
              ))}
            </div>
            <small>Context is a starting point. Inspect the evidence.</small>
          </div>
        )}
      </div>
    </Panel>
  );
}
const candidates = [
  {
    query: "Aster Trading",
    tag: "BUSINESS NAME",
    title: "Aster Trade Group",
    state: "REVIEW CANDIDATE",
    rows: [
      ["Name", "Similar wording"],
      ["Registration", "Different identifier"],
      ["Jurisdiction", "Needs verification"],
    ],
    note: "Shared words surfaced a candidate. The identifier conflicts; further identity checks are needed.",
  },
  {
    query: "M. Bennett",
    tag: "ABBREVIATED NAME",
    title: "Mara Bennett",
    state: "INSUFFICIENT IDENTITY",
    rows: [
      ["Name", "Initial and surname"],
      ["Date of birth", "Not supplied"],
      ["Identifier", "Not supplied"],
    ],
    note: "An abbreviated name is not enough to establish identity. Request the missing attributes.",
  },
  {
    query: "Noura Al Karim",
    tag: "NAME VARIANT",
    title: "نورة الكريم",
    state: "POSSIBLE ALIAS",
    rows: [
      ["Name", "Cross-script candidate"],
      ["Date of birth", "Needs comparison"],
      ["Source", "Synthetic watchlist"],
    ],
    note: "A name variant retrieves a candidate across scripts. Compare the remaining attributes before disposition.",
  },
];
export function ScreeningWorkspace() {
  const [active, setActive] = useState(0);
  const [route, setRoute] = useState(0);
  const c = candidates[active];
  const routes = [
    "Lexical trigram",
    "Vector embedding",
    "Exact / transliterated",
    "Identifier / BIC",
  ];
  return (
    <Panel title="ABACUS / SCREENING WORKBENCH">
      <div className={s.screening}>
        <div className={s.queryTabs}>
          {candidates.map((v, i) => (
            <button
              key={v.query}
              aria-pressed={active === i}
              className={active === i ? s.chosen : ""}
              onClick={() => setActive(i)}
            >
              {v.query}
            </button>
          ))}
        </div>
        <div className={s.screenInput}>
          <Search size={22} />
          <div>
            <small className={s.label}>{c.tag}</small>
            <strong>{c.query}</strong>
          </div>
        </div>
        <div className={s.routes}>
          {routes.map((v, i) => (
            <button
              aria-pressed={route === i}
              className={route === i ? s.routeSelected : ""}
              onClick={() => setRoute(i)}
              key={v}
            >
              <i />
              <span>{v}</span>
              <ChevronRight size={12} />
            </button>
          ))}
        </div>
        <div className={s.routeNote}>
          {
            [
              "Retrieves similar character sequences across indexed names.",
              "Retrieves candidates through multilingual name embeddings.",
              "Retrieves exact indexed names and transliterated forms.",
              "Retrieves using supplied identifiers or bank identifiers.",
            ][route]
          }
        </div>
        <div className={s.candidate}>
          <span className={s.label}>{c.state}</span>
          <h3>{c.title}</h3>
          {c.rows.map(([key, value]) => (
            <div key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
          <p>{c.note}</p>
        </div>
      </div>
    </Panel>
  );
}
const flowSteps = [
  [
    "Source",
    "CRM.customer_id",
    "Customer identifier from the incoming source.",
  ],
  [
    "Contract",
    "Party.party_id",
    "Map the source field to the canonical party identifier.",
  ],
  [
    "Reconcile",
    "Business-key check",
    "Check that required keys exist before promoting records.",
  ],
  [
    "Publish",
    "Canonical party",
    "Make the reconciled data available to approved consumers.",
  ],
];
export function DataWorkspace() {
  const [active, setActive] = useState(1);
  const [invalid, setInvalid] = useState(false);
  return (
    <Panel title="UDM / CONTRACT EXPLORER">
      <div className={s.dataBody}>
        <div className={s.workspaceLabel}>
          <Database size={16} /> Source → canonical → consumer
        </div>
        <div className={s.dataFlow}>
          {flowSteps.map(([title], i) => (
            <button
              key={title}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              className={active === i ? s.chosen : ""}
            >
              <span>{i + 1}</span>
              {title}
            </button>
          ))}
        </div>
        <div className={s.mapping}>
          <div>
            <small>SOURCE FIELD</small>
            <code>CRM.customer_id</code>
            <span>Customer identity</span>
          </div>
          <ArrowUpRight />
          <div>
            <small>CANONICAL FIELD</small>
            <code>Party.party_id</code>
            <span>Shared definition</span>
          </div>
        </div>
        <div className={s.dataStatus}>
          <span className={s.label}>{flowSteps[active][0]}</span>
          <h3>
            {active === 3 && invalid
              ? "Promotion withheld"
              : flowSteps[active][1]}
          </h3>
          <p>
            {active === 3 && invalid
              ? "The sample record has no business key. Resolve the exception before publishing."
              : flowSteps[active][2]}
          </p>
        </div>
        <label className={s.checkLabel}>
          <input
            type="checkbox"
            checked={invalid}
            onChange={(e) => {
              setInvalid(e.target.checked);
              setActive(2);
            }}
          />{" "}
          Introduce a missing key in the sample
        </label>
        <div className={s.checks}>
          {["Record count", "Amount total", "Duplicates", "Required keys"].map(
            (v, i) => (
              <div key={v}>
                <span>{v}</span>
                <b>{i === 3 && invalid ? "REVIEW" : "PASS"}</b>
              </div>
            ),
          )}
        </div>
        <div className={s.consumers}>
          <span>AML</span>
          <span>Fraud</span>
          <span>Trade</span>
          <span>Brain</span>
        </div>
      </div>
    </Panel>
  );
}
export function KycWorkspace() {
  const [business, setBusiness] = useState(true);
  const [step, setStep] = useState(0);
  const stages = ["Intake", "Ownership", "Checks", "Review"];
  return (
    <Panel title="KYC / CUSTOMER JOURNEY">
      <div className={s.dataBody}>
        <div className={s.queryTabs}>
          <button
            aria-pressed={!business}
            className={!business ? s.chosen : ""}
            onClick={() => setBusiness(false)}
          >
            Individual
          </button>
          <button
            aria-pressed={business}
            className={business ? s.chosen : ""}
            onClick={() => setBusiness(true)}
          >
            Business
          </button>
        </div>
        <div className={s.dossier}>
          <div className={s.avatar}>{business ? "AT" : "MB"}</div>
          <div>
            <small className={s.label}>
              {business ? "BUSINESS APPLICATION" : "INDIVIDUAL APPLICATION"}
            </small>
            <h3>{business ? "Aster Trading" : "Mira Bennett"}</h3>
            <span>Review in progress</span>
          </div>
        </div>
        <div className={s.dataFlow}>
          {stages.map((v, i) => (
            <button
              key={v}
              aria-pressed={step === i}
              onClick={() => setStep(i)}
              className={step === i ? s.chosen : ""}
            >
              <span>{i + 1}</span>
              {v}
            </button>
          ))}
        </div>
        <div className={s.reviewCard} aria-live="polite">
          <span className={s.label}>{stages[step]} / EVIDENCE</span>
          <h3>
            {
              [
                business
                  ? "Understand the business."
                  : "Start with the customer.",
                business
                  ? "Declared is not verified."
                  : "Keep identity evidence together.",
                "An unknown result stays unknown.",
                "Keep the reviewer accountable.",
              ][step]
            }
          </h3>
          <p>
            {
              [
                business
                  ? "Company details, related people and consent belong to the application."
                  : "Capture the required identity information and consent under the active journey policy.",
                business
                  ? "Mira is a declared owner in this sample. Supporting ownership evidence still needs verification."
                  : "Documents and identity attributes stay attached to the application for review.",
                "The identity check in this sample is pending. The application cannot be treated as approved.",
                "Inspect the evidence and policy context before the maker-checker decision.",
              ][step]
            }
          </p>
          <div>
            <FileText size={15} />
            <span>
              {
                [
                  "Application record",
                  "Supporting document",
                  "Pending provider check",
                  "Review decision",
                ][step]
              }
            </span>
            <b>{["RECORDED", "UNVERIFIED", "PENDING", "REQUIRED"][step]}</b>
          </div>
        </div>
      </div>
    </Panel>
  );
}
export function TradeWorkspace() {
  const [step, setStep] = useState(0);
  const events = [
    ["Order placed", "Displayed buy-side liquidity increases."],
    ["Opposite fill", "An execution occurs on the other side."],
    ["Order cancelled", "The displayed order is cancelled."],
    [
      "Sequence reviewed",
      "Examine the timing and actor context. This sequence alone is not proof of misconduct.",
    ],
  ];
  return (
    <Panel title="ARGUS / ORDER REPLAY">
      <div className={s.dataBody}>
        <span className={s.label}>INSPECT THE EVENT SEQUENCE</span>
        <div className={s.orderBook}>
          <div>
            <small>BUY ORDERS</small>
            {[85, 63, 92, 40].map((v, i) => (
              <i
                key={i}
                style={{ width: `${step === 2 && i === 0 ? 20 : v}%` }}
              />
            ))}
          </div>
          <div>
            <small>SELL ORDERS</small>
            {[40, 80, 55, 65].map((v, i) => (
              <i key={i} style={{ width: `${v}%` }} />
            ))}
          </div>
        </div>
        <div className={s.dataFlow}>
          {events.map(([v], i) => (
            <button
              aria-pressed={step === i}
              key={v}
              className={step === i ? s.chosen : ""}
              onClick={() => setStep(i)}
            >
              <span>{i + 1}</span>
              {v}
            </button>
          ))}
        </div>
        <div className={s.dataStatus} aria-live="polite">
          <h3>{events[step][0]}</h3>
          <p>{events[step][1]}</p>
        </div>
        <button
          className={s.next}
          onClick={() => setStep((step + 1) % events.length)}
        >
          {step === 3 ? "Replay sequence" : "Next event"}
          <ChevronRight size={15} />
        </button>
      </div>
    </Panel>
  );
}
export function FraudWorkspace() {
  const [candidate, setCandidate] = useState(false);
  return (
    <Panel title="ARGUS / RULE LAB">
      <div className={s.dataBody}>
        <span className={s.label}>COMPARE A RULE CANDIDATE</span>
        <div className={s.queryTabs}>
          <button
            aria-pressed={!candidate}
            className={!candidate ? s.chosen : ""}
            onClick={() => setCandidate(false)}
          >
            Current rule
          </button>
          <button
            aria-pressed={candidate}
            className={candidate ? s.chosen : ""}
            onClick={() => setCandidate(true)}
          >
            Candidate rule
          </button>
        </div>
        <div className={s.ruleCode}>
          <small>REVIEW WHEN</small>
          <p>New beneficiary</p>
          <span>AND</span>
          <p>
            {candidate
              ? "Unusual activity + recent profile change"
              : "Unusual activity"}
          </p>
          <span>THEN</span>
          <p>Send for review</p>
        </div>
        <div className={s.checks}>
          {[
            "New payee + unusual activity",
            "New payee + profile change + unusual activity",
            "Event missing required context",
          ].map((v, i) => (
            <div key={v}>
              <span>{v}</span>
              <b>
                {i === 2
                  ? "INCOMPLETE"
                  : i === 0 && candidate
                    ? "NO MATCH"
                    : "REVIEW"}
              </b>
            </div>
          ))}
        </div>
        <p className={s.footnote}>
          Illustrative rule logic. Compare coverage and legitimate activity
          before approving a change.
        </p>
      </div>
    </Panel>
  );
}
export default function Workspace({ kind }: { kind: string }) {
  if (kind === "brain") return <BrainWorkspace />;
  if (kind === "abacus") return <ScreeningWorkspace />;
  if (kind === "udm") return <DataWorkspace />;
  if (kind === "kyc") return <KycWorkspace />;
  if (kind === "trade-surveillance") return <TradeWorkspace />;
  if (kind === "fraud") return <FraudWorkspace />;
  return <EvidenceGraph mode={kind} />;
}
