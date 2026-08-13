/* ═══════════════════════════════════════════════════════════════════════
   CASE MANAGER — page content (static, no API). All values invented + scrubbed.

   Translated from the reference build's `caseManagerMock.js`. All colors come
   from tokens (`var(--accent)` etc.) at render time — no hex literals here.
   Case Manager's accent is violet, set by the `.theme-case-manager` wrapper.

   NOTE — accessGraph coordinates were re-laid-out (vs the reference) into a
   cleaner, padded tripartite grid (roles | policies | scopes) to remove the
   distorted edge-crossings; render its connectors as smooth horizontal curves.
   ═══════════════════════════════════════════════════════════════════════ */

/* ═══════════ Hero — designer canvas palette + scripted assembly ═══════════ */
export type PaletteItem = { id: string; label: string; meta: string };
export const heroPalette: PaletteItem[] = [
  { id: "trades", label: "Trades", meta: "table · bound case.trades[]" },
  { id: "positions", label: "Positions", meta: "table · bound case.positions[]" },
  { id: "prior", label: "Prior alerts", meta: "list · case.customer_id" },
  { id: "fa", label: "FA profile", meta: "card · case.actor" },
  { id: "notes", label: "Notes", meta: "thread · append-only" },
  { id: "evidence", label: "Evidence", meta: "attach · immutable" },
  { id: "audit", label: "Audit", meta: "feed · read-only" },
  { id: "export", label: "Export", meta: "action · SAR / PDF" },
];

/* three components snap into a 2x2 grid on load */
export type HeroDrop = { slot: number; id: string; w?: number };
export const heroDrops: HeroDrop[] = [
  { slot: 0, id: "fa", w: 2 },
  { slot: 1, id: "prior" },
  { slot: 2, id: "trades" },
];

export const heroVerdict = "SAVED · v3 · APPLIES TO ALL AML CASES";
export const heroStrip = ["ANY ALERT TYPE", "0 LINES OF CODE", "1 RBAC MODEL", "FULL AUDIT"];

/* ═══════════ Section 2 — configurable field model ═══════════ */
export type Field = { k: string; t: string };
export const sharedFields: Field[] = [
  { k: "case_id", t: "uuid" },
  { k: "actor", t: "ref:user" },
  { k: "state", t: "enum:lifecycle" },
];
export const alertTypeFields: Record<string, Field[]> = {
  aml: [
    { k: "structuring_window", t: "duration" },
    { k: "hit_score", t: "float" },
    { k: "counterparties", t: "int" },
  ],
  sanctions: [
    { k: "sanction_list", t: "enum:ofac|un|eu" },
    { k: "match_score", t: "float" },
    { k: "false_positive", t: "bool" },
  ],
  fraud: [
    { k: "device_id", t: "string" },
    { k: "velocity", t: "float" },
    { k: "chargeback_ref", t: "string" },
  ],
};
export const alertTypeTabs = [
  { id: "aml", label: "AML" },
  { id: "sanctions", label: "SANCTIONS" },
  { id: "fraud", label: "FRAUD" },
];
export const extensibleNote =
  "AML, fraud, sanctions, KYC, adverse media, trade surveillance — and any type you define this afternoon.";

/* ═══════════ Section 3 — Designer deep-cut running log ═══════════ */
export type DesignerStep = { id: string; label: string; bind: string; w: number };
export const designerSteps: DesignerStep[] = [
  { id: "prior", label: "Prior alerts", bind: "case.customer_id", w: 1 },
  { id: "trades", label: "Trades", bind: "case.trades[]", w: 2 },
  { id: "fa", label: "FA profile", bind: "case.actor", w: 1 },
  { id: "notes", label: "Notes", bind: "case.notes[]", w: 1 },
  { id: "evidence", label: "Evidence", bind: "case.evidence[]", w: 1 },
];
export const designerFinalVerdict = "SAVED · v4 · AML CASE VIEW";

/* ═══════════ Section 4 — Workflow builder ═══════════ */
export type WfNode = { id: string; label: string; x: number; y: number };
export type WfEdge = { s: string; t: string };
export const workflowBase: { nodes: WfNode[]; edges: WfEdge[] } = {
  nodes: [
    { id: "intake", label: "Intake", x: 8, y: 50 },
    { id: "assign", label: "Assign", x: 30, y: 50 },
    { id: "invest", label: "Investigate", x: 52, y: 50 },
    { id: "sar", label: "SAR", x: 74, y: 50 },
    { id: "close", label: "Close", x: 92, y: 50 },
  ],
  edges: [
    { s: "intake", t: "assign" },
    { s: "assign", t: "invest" },
    { s: "invest", t: "sar" },
    { s: "sar", t: "close" },
  ],
};
/* added on scripted playback: Investigate -> Escalate -> SAR */
export const workflowBranch: { node: WfNode; edges: WfEdge[] } = {
  node: { id: "escalate", label: "Escalate", x: 63, y: 20 },
  edges: [
    { s: "invest", t: "escalate" },
    { s: "escalate", t: "sar" },
  ],
};
export const workflowVerdict = "ENFORCED SERVER-SIDE · v7";

/* ═══════════ Section 5 — RBAC policy composer ═══════════ */
export const policyChips = {
  effect: [
    { id: "allow", label: "allow" },
    { id: "deny", label: "deny" },
  ],
  actions: [
    { id: "case:read", label: "case:read" },
    { id: "case:note", label: "case:note" },
    { id: "case:attach", label: "case:attach" },
    { id: "sar:draft", label: "sar:draft" },
  ],
  resource: [{ id: "alert-type/aml", label: "alert-type/aml" }],
  condition: [{ id: "state:in_review", label: "state:in_review" }],
};
export type Policy = {
  effect: string;
  actions: string[];
  resource: string;
  condition: boolean | string;
};
export const policyDefault: Policy = {
  effect: "allow",
  actions: ["case:read", "case:note"],
  resource: "alert-type/aml",
  condition: "state:in_review",
};

/* access graph — roles → policies → resource scopes.
   Re-laid-out into a padded tripartite grid (columns at x≈10 / 50 / 90; rows
   evenly spread y≈18..84) so connectors read as clean horizontal curves with
   minimal crossings — NOT the reference's crammed straight-line scatter. */
export type AccessNode = { id: string; label: string; x: number; y: number };
export const accessGraph: {
  roles: AccessNode[];
  policies: AccessNode[];
  scopes: AccessNode[];
  edges: WfEdge[];
} = {
  roles: [
    { id: "analyst", label: "Analyst", x: 10, y: 18 },
    { id: "investigator", label: "Investigator", x: 10, y: 40 },
    { id: "reviewer", label: "Reviewer", x: 10, y: 62 },
    { id: "admin", label: "Admin", x: 10, y: 84 },
  ],
  policies: [
    { id: "p_read", label: "read-only", x: 50, y: 22 },
    { id: "p_invest", label: "investigate", x: 50, y: 51 },
    { id: "p_review", label: "review+sar", x: 50, y: 80 },
  ],
  scopes: [
    { id: "s_aml", label: "alert-type/aml", x: 90, y: 37 },
    { id: "s_all", label: "alert-type/*", x: 90, y: 71 },
  ],
  edges: [
    { s: "analyst", t: "p_read" },
    { s: "investigator", t: "p_invest" },
    { s: "reviewer", t: "p_review" },
    { s: "admin", t: "p_review" },
    { s: "admin", t: "p_invest" },
    { s: "p_read", t: "s_aml" },
    { s: "p_invest", t: "s_aml" },
    { s: "p_review", t: "s_all" },
  ],
};
export const rbacNotes = [
  "AWS-IAM-inspired policy shape",
  "Union-cached on sign-in",
  "Conditional access on case state",
  "In-house build — no vendor lock",
];

/* ═══════════ Section 6 — Legacy vs SqAId scenario ═══════════ */
export const scenarioTask = "Add a new alert type: insider_dealing";
export type RailStep = { step: string; t: string };
export const legacyRail: RailStep[] = [
  { step: "edit .xml", t: "day 1" },
  { step: "open PR", t: "day 2" },
  { step: "review", t: "day 4" },
  { step: "merge", t: "day 6" },
  { step: "deploy", t: "day 9" },
  { step: "wait ~2 weeks", t: "day 14" },
];
export const sqaidRail: RailStep[] = [
  { step: "define fields", t: "0:00" },
  { step: "design view", t: "0:04" },
  { step: "wire workflow", t: "0:09" },
  { step: "set policy", t: "0:14" },
  { step: "save · LIVE", t: "0:20" },
];
export const scenarioVerdict = ["2 WEEKS", "20 MIN"];

export type ProcurementRow = { k: string; legacy: string; sqaid: string };
export const procurementRows: ProcurementRow[] = [
  { k: "Add an alert type", legacy: "XML + redeploy", sqaid: "Configure · live" },
  { k: "Customize the view", legacy: "Dev ticket", sqaid: "Drag in Designer" },
  { k: "Workflow changes", legacy: "Code + release", sqaid: "Edit workflow graph" },
  { k: "Permissions", legacy: "Hardcoded roles", sqaid: "Policy composer" },
  { k: "Vendor lock-in", legacy: "High", sqaid: "In-house · exportable" },
];

/* ═══════════ Section 7 — lifecycle view + audit feed ═══════════ */
export const lifecycleModules = [
  "Trades", "Positions", "Prior alerts", "FA details",
  "Notes", "Evidence", "Audit", "Export", "Assign",
];
export type AuditRow = { actor: string; action: string; diff: string };
export const auditRows: AuditRow[] = [
  { actor: "a.reyes", action: "case.opened", diff: "state: null → intake" },
  { actor: "system", action: "workflow.assigned", diff: "owner → j.okafor" },
  { actor: "j.okafor", action: "note.added", diff: "+1 note · 82 words" },
  { actor: "j.okafor", action: "evidence.attached", diff: "+2 files · immutable" },
  { actor: "m.chen", action: "state.changed", diff: "in_review → escalated" },
  { actor: "m.chen", action: "sar.drafted", diff: "+1 draft · v1" },
  { actor: "l.abara", action: "policy.checked", diff: "sar:draft · allow" },
  { actor: "system", action: "audit.sealed", diff: "hash → 0x7c…5ff" },
];

/* ═══════════ Section 8 — correlation lineage strip ═══════════ */
export const lineage = [
  { tag: "CONFIG CHANGE", val: "alert-type/insider_dealing" },
  { tag: "POLICY", val: "review+sar · allow" },
  { tag: "WORKFLOW", val: "intake → … → close · v7" },
  { tag: "CASE ACTION", val: "sar.drafted · m.chen" },
  { tag: "AUDIT RECORD", val: "sealed · 0x7c…5ff" },
];

/* editorial marquee band phrases */
export const marqueePhrases = [
  "DEFINE THE FIELDS",
  "DESIGN THE VIEW",
  "WIRE THE WORKFLOW",
  "SET THE POLICY",
  "AUDIT EVERYTHING",
];
