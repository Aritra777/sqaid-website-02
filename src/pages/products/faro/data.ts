/* ═══════════════════════════════════════════════════════════════════════
   FARO — page content (static, no API). All values invented + scrubbed.

   Translated from the reference build's `faroMock.js`. All colors come from
   tokens (`var(--accent)` etc.) at render time — no hex literals here. Faro's
   accent is blue, set by the `.theme-faro` wrapper on the page root.
   ═══════════════════════════════════════════════════════════════════════ */

/* ─────────────── types ─────────────── */
export type Signal = {
  k: string;
  v: string;
  meta: { rail: string; detail: string };
};

/* ═══════════ Hero — converging signal streams ═══════════ */
export const fraudSignals: Signal[] = [
  { k: "VELOCITY", v: "22 TXN / 3M", meta: { rail: "CARD", detail: "Authorization burst, single device" } },
  { k: "DEVICE", v: "NEW FINGERPRINT", meta: { rail: "CARD", detail: "First seen 4m ago · emulator flag" } },
  { k: "MCC ANOMALY", v: "5411 → 7995", meta: { rail: "CARD", detail: "Grocery baseline → gambling" } },
];

export const amlSignals: Signal[] = [
  { k: "STRUCTURING", v: "9.1K–9.9K ×11", meta: { rail: "ACH", detail: "Sub-threshold placement banding" } },
  { k: "SANCTIONS PROX.", v: "0.86 FUZZY", meta: { rail: "WIRE", detail: "OFAC beneficiary proximity" } },
  { k: "LAYERING", v: "4 RAILS / 48H", meta: { rail: "CROSS", detail: "Rapid cross-rail repositioning" } },
];

export const verdict = {
  score: "0.98",
  action: "HOLD",
  reasons: [
    "Cross-rail layering — UPI → ACH → SWIFT → crypto",
    "Sub-threshold structuring, 11 placements / 48h",
    "Sanctions proximity 0.86 on beneficiary",
  ],
};

export const heroStrip = ["REAL-TIME", "EVERY TXN", "EVERY RAIL", "24 / 7"];

/* ═══════════ Convergence taxonomy (section 02) ═══════════ */
export const fraudTaxonomy = [
  "Velocity & burst",
  "Device & fingerprint",
  "MCC / merchant drift",
  "Geo impossible-travel",
];
export const amlTaxonomy = [
  "Structuring bands",
  "Sanctions proximity",
  "Layering across rails",
  "Shell / passthrough links",
];

/* ═══════════ Cross-rail structuring typology (EXAMPLE · SCRUBBED) ═══════════ */
export const rails = ["CARD", "UPI", "ACH / SEPA", "WIRES / SWIFT", "CRYPTO", "SANCTIONS"];

export type RailHop = {
  i: number;
  rail: number;
  x: number;
  label: string;
  amount: string;
  entity: string;
  why: string;
};
export const railHops: RailHop[] = [
  { i: 0, rail: 1, x: 16, label: "UPI CASH-IN", amount: "₹4.9L", entity: "WALLET ·77af", why: "Origin — rapid cash-in aggregated from 9 payers" },
  { i: 1, rail: 2, x: 40, label: "STRUCTURED ACH", amount: "$58,200", entity: "ACCT ·8842", why: "Eleven sub-threshold deposits, 9.1k–9.9k band" },
  { i: 2, rail: 3, x: 64, label: "SWIFT WIRE OUT", amount: "$57,400", entity: "QF-LLC", why: "Onward wire to an entity registered 3 weeks prior" },
  { i: 3, rail: 4, x: 86, label: "CRYPTO OFF-RAMP", amount: "1.02 BTC", entity: "VASP KraQ", why: "Converted and bridged — attribution begins to degrade" },
];

/* ═══════════ Traveling-txn pipeline (section 04) ═══════════ */
export type PipelineStage = { key: string; stat: string; sub: string };
export const pipeline: PipelineStage[] = [
  { key: "INGEST", stat: "<80MS", sub: "normalize once" },
  { key: "DETECT", stat: "12 SIGNALS", sub: "fraud + AML" },
  { key: "TRIAGE", stat: "CROSS-RAIL", sub: "pattern linked" },
  { key: "DECIDE", stat: "1 VERDICT", sub: "score · action" },
  { key: "REPORT", stat: "EVIDENCE ATTACHED", sub: "audit-ready" },
];
export const pipelineTxn = "TXN_8f2a";

/* ═══════════ AI copilot (section 06) ═══════════ */
export type CopilotReason = { rank: string; text: string; weight: number };
export const copilotReasons: CopilotReason[] = [
  { rank: "01", text: "Funds moved across four rails inside 48 hours — UPI cash-in, structured ACH, SWIFT wire, crypto off-ramp.", weight: 0.41 },
  { rank: "02", text: "Eleven deposits deliberately banded below the reporting threshold — textbook structuring.", weight: 0.33 },
  { rank: "03", text: "Beneficiary matches an OFAC-listed party at 0.86 fuzzy confidence.", weight: 0.24 },
];
export const copilotAction = "Hold the transaction and open a case. Attach the cross-rail trail; recommend SAR filing.";
export type EvidenceRow = { k: string; v: string; w: string };
export const copilotEvidence: EvidenceRow[] = [
  { k: "signal.velocity", v: "22txn/3m", w: "0.18" },
  { k: "signal.structuring", v: "11 hits", w: "0.33" },
  { k: "signal.sanctions", v: "0.86", w: "0.24" },
  { k: "signal.layering", v: "4 rails", w: "0.41" },
  { k: "corr_id", v: "c8f1-77ab-4e21", w: "—" },
  { k: "model", v: "faro-scoring-v7", w: "—" },
];

/* ═══════════ Verdict evidence checklist (section 07) ═══════════ */
export type ChecklistItem = { t: string; d: string };
export const verdictChecklist: ChecklistItem[] = [
  { t: "One number", d: "A single calibrated score, not a wall of amber flags." },
  { t: "Full replayable evidence", d: "Every signal, weight and correlation ID behind the call." },
  { t: "End-to-end audit lineage", d: "Source event to shipped decision, examiner-legible." },
  { t: "Deploy without disruption", d: "Sits alongside your stack — score in, verdict out." },
];

/* verdict mock signal weights (VerdictEvidence panel) */
export const verdictSignals: Array<[string, number]> = [
  ["CROSS-RAIL LAYERING", 0.41],
  ["STRUCTURING", 0.33],
  ["SANCTIONS PROX.", 0.24],
];

/* ═══════════ Lineage strip (section 08) ═══════════ */
export const lineage = [
  { tag: "SOURCE EVENT", val: "upi.in ·77af" },
  { tag: "RULE", val: "CROSS_RAIL_LAYERING" },
  { tag: "SIGNAL", val: "structuring · sanctions" },
  { tag: "DECISION", val: "HOLD · score 0.98" },
  { tag: "DOWNSTREAM", val: "case + SAR draft" },
];

/* ═══════════ Ambient decision tape (section 09) ═══════════ */
export type TapeRow = { id: string; rail: string; act: string; score: string };
export const decisionTape: TapeRow[] = [
  { id: "TXN_8f2a", rail: "CARD", act: "APPROVE", score: "0.12" },
  { id: "TXN_c40e", rail: "WIRE", act: "HOLD", score: "0.94" },
  { id: "TXN_11ab", rail: "UPI", act: "ESCALATE", score: "0.71" },
  { id: "TXN_9d02", rail: "ACH", act: "APPROVE", score: "0.08" },
  { id: "TXN_7f5c", rail: "CRYPTO", act: "HOLD", score: "0.88" },
  { id: "TXN_2e91", rail: "SEPA", act: "APPROVE", score: "0.19" },
  { id: "TXN_b3a7", rail: "WIRE", act: "ESCALATE", score: "0.63" },
  { id: "TXN_4c8d", rail: "CARD", act: "APPROVE", score: "0.05" },
];

/* editorial marquee band phrases */
export const marqueePhrases = [
  "REAL-TIME",
  "EVERY TXN",
  "EVERY RAIL",
  "ONE VERDICT",
  "FRAUD + AML",
  "EVIDENCE ATTACHED",
];
