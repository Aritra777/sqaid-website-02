/* ═══════════════════════════════════════════════════════════════════════
   ARGUS — page content + generated graph data.

   Translated from the reference build's `argusMock.js`. All colors come from
   tokens (`var(--accent)` etc.) at render time — no hex literals here.

   ⚠️ FUNDS-TRACE GRAPH: the reference used a RADIAL/SPIRAL layout
   (`angle = spread*300 + hop*17°`), which we rejected. A fully random scatter
   was also rejected (looked messy). `buildHopGraph()` below builds a clean,
   STRUCTURED left→right LAYERED DAG — each hop is a column, nodes spread across a
   vertical band that widens with the node count, so the trace fans out from the
   seed and converges toward the horizon. A small seeded (deterministic) jitter
   keeps it organic without breaking the structure or reshuffling between renders.
   ═══════════════════════════════════════════════════════════════════════ */

/* ───────────────────────── types ───────────────────────── */
export type HeroNode = {
  id: string;
  x: number;
  y: number;
  label: string;
  type: string;
  order: number;
  meta: { risk: string; detail: string };
};
export type HeroEdge = { s: string; t: string; p?: boolean };

export type HopNode = { id: string; hop: number; x: number; y: number };
export type HopEdge = { s: string; t: string; hop: number };

/* ═══════════ Hero interactive knowledge-graph (hand-authored small DAG) ═══════════
   Alert → accounts/entities → mule/hub/exchange → offshore/mixer → verdict.
   Stepped reveal (order 0..4). This is deliberately organic, not the spiral. */
export const heroGraph: { nodes: HeroNode[]; edges: HeroEdge[]; maxStep: number } = {
  nodes: [
    { id: "n0", x: 14, y: 50, label: "ALERT-4471", type: "ALERT", order: 0, meta: { risk: "TRIGGER", detail: "Structuring · 09:41:07Z" } },
    { id: "n1", x: 38, y: 26, label: "ACCT ·8842", type: "ACCOUNT", order: 1, meta: { risk: "MED", detail: "Personal · 14mo age" } },
    { id: "n2", x: 40, y: 74, label: "QF-LLC", type: "ENTITY", order: 1, meta: { risk: "MED", detail: "Shell · reg. 3wk ago" } },
    { id: "n3", x: 62, y: 16, label: "ACCT ·1190", type: "MULE", order: 2, meta: { risk: "HIGH", detail: "Passthrough · 22txn/48h" } },
    { id: "n4", x: 64, y: 50, label: "HUB ·7731", type: "HUB", order: 2, meta: { risk: "HIGH", detail: "Fan-in · 9 sources" } },
    { id: "n5", x: 60, y: 84, label: "EXCH KraQ", type: "EXCHANGE", order: 2, meta: { risk: "MED", detail: "VASP · KYC tier 1" } },
    { id: "n6", x: 86, y: 24, label: "OFFSHORE", type: "OFFSHORE", order: 3, meta: { risk: "HIGH", detail: "Non-coop juris." } },
    { id: "n7", x: 88, y: 60, label: "MIXER 0x9f", type: "MIXER", order: 3, meta: { risk: "CRIT", detail: "Tumbler · obfusc." } },
    { id: "n8", x: 106, y: 44, label: "VERDICT", type: "VERDICT", order: 4, meta: { risk: "92 / SAR", detail: "Recommend file" } },
  ],
  edges: [
    { s: "n0", t: "n1", p: true }, { s: "n0", t: "n2" },
    { s: "n1", t: "n3" }, { s: "n1", t: "n4", p: true }, { s: "n2", t: "n4" },
    { s: "n2", t: "n5" }, { s: "n4", t: "n6" }, { s: "n4", t: "n7", p: true },
    { s: "n5", t: "n7" }, { s: "n7", t: "n8", p: true }, { s: "n6", t: "n8" },
  ],
  maxStep: 4,
};

export const heroStats = ["50+ RULES", "<5MS EVAL", "UP TO 12-HOP TRACE", "CONFIGURABLE FLEET"];

/* ═══════════ Alert → SAR ═══════════ */
export const rawAlert = `{
  "alert_id": "ALERT-4471",
  "ts": "2026-06-11T09:41:07.221Z",
  "rule": "STRUCTURING_SUBTHRESHOLD",
  "score": 0.91,
  "corr_id": "c8f1-77ab-4e21-b0d9",
  "subject": { "acct": "****8842", "since": "2025-04-02" },
  "signals": [
    { "k": "cash_in", "n": 14, "sum": 138400, "window": "48h" },
    { "k": "sub_threshold", "hits": 11, "band": "9.1k-9.9k" },
    { "k": "counterparties", "new": 6, "shell_flag": true }
  ],
  "hops": 4, "linked_entities": 7
}`;

export const sarNarrative = {
  title: "SAR-ready narrative",
  meta: "NARRATOR · 387 WORDS · ≤400",
  body: `Between 09 and 11 June 2026, account ****8842 received fourteen cash deposits totalling $138,400, each deliberately banded below the $10,000 reporting threshold. The cadence — eleven sub-threshold placements inside 48 hours — is consistent with structuring intended to evade currency-transaction reporting.

Funds were promptly routed to QF-LLC, an entity registered three weeks prior with no discernible operating history, and onward through a fan-in hub (·7731) aggregating nine unrelated sources. Argus traced the flow across four hops into an offshore corridor and a mixing service, at which point attribution degrades.

The behavioral, network and temporal signals jointly satisfy the institution's suspicious-activity criteria. Argus recommends filing, with the full correlation trail and traversed graph attached for examiner review.`,
};

/* ═══════════ Fleet composer agents ═══════════ */
export type FleetAgent = { id: string; name: string; tag: string; role: string };
export const fleetAgents: FleetAgent[] = [
  { id: "investigator", name: "Investigator", tag: "ORCHESTRATOR", role: "Owns the case, sequences the crew, writes the theory." },
  { id: "fundstrace", name: "FundsTrace", tag: "NETWORK", role: "Walks the money graph hop by hop until attribution fails." },
  { id: "profileshift", name: "ProfileShift", tag: "BEHAVIORAL", role: "Flags deviations from a subject's established baseline." },
  { id: "darkweb", name: "DarkWebScanner", tag: "INTEL", role: "Correlates entities against leaked & illicit marketplaces." },
  { id: "networkring", name: "NetworkRing", tag: "GRAPH", role: "Detects mule rings and layered counterparty structures." },
  { id: "narrator", name: "Narrator", tag: "SYNTHESIS", role: "Compresses the case into a SAR-ready ≤400-word account." },
  { id: "sanctions", name: "SanctionsMatch", tag: "IDENTITY", role: "Fuzzy-matches parties against OFAC & global lists." },
  { id: "temporal", name: "TemporalBurst", tag: "TEMPORAL", role: "Surfaces velocity spikes and dormancy breaks." },
];

export const alertTypes = [
  { id: "struct", label: "STRUCTURING", squad: ["investigator", "fundstrace", "temporal", "narrator"] },
  { id: "fraud", label: "FRAUD RING", squad: ["investigator", "networkring", "profileshift", "darkweb", "narrator"] },
  { id: "identity", label: "IDENTITY", squad: ["investigator", "sanctions", "profileshift", "narrator"] },
];

/* ═══════════ Product surfaces ═══════════ */
export type Surface = { key: string; tag: string; title: string; copy: string };
export const surfaces: Surface[] = [
  { key: "ingestion", tag: "INGESTION", title: "Stream anything, normalize once", copy: "Wire, card, crypto and core-banking events land in one typed event bus." },
  { key: "signals", tag: "SIGNALS", title: "50+ rules, sub-5ms evaluation", copy: "Author, version and shadow-test detection logic without redeploys." },
  { key: "agents", tag: "AGENTS", title: "Compose the crew per alert type", copy: "Bind a squad of agents to each rule and watch them reason live." },
  { key: "flows", tag: "FLOWS", title: "Every decision, fully replayable", copy: "Step the investigation forward and back with full state at each node." },
  { key: "graph", tag: "GRAPH EXPLORER", title: "Trace funds up to twelve hops", copy: "Expand, prune and pin subgraphs with hop-decay legibility built in." },
  { key: "mcp", tag: "MCP", title: "Bring your own tools", copy: "Expose internal systems to the fleet through a governed MCP surface." },
];

/* ═══════════ Lineage strip ═══════════ */
export const lineage = [
  { tag: "SOURCE EVENT", val: "wire.in ·8842" },
  { tag: "RULE", val: "STRUCTURING_SUBTHRESHOLD" },
  { tag: "ALERT", val: "ALERT-4471" },
  { tag: "AGENT", val: "FundsTrace · Narrator" },
  { tag: "DECISION", val: "SAR · score 92" },
];

/* ═══════════ Dispatch chips (RulesDispatch mini-viz) ═══════════ */
export const dispatchChips = ["Investigator", "FundsTrace", "ProfileShift", "NetworkRing", "Narrator"];

/* ═══════════ FUNDS-TRACE — organic RANDOM hop graph (NOT a spiral) ═══════════ */

/** Deterministic PRNG (mulberry32) so the layout is stable across renders. */
function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function decay(hop: number): number {
  return Math.max(0.15, 1 - (hop / 12) * 0.85);
}

/**
 * Build a 13-level (hop 0..12) directed trace graph as a clean, STRUCTURED
 * left→right layered DAG — NOT a spiral and NOT a messy random scatter. Each hop
 * is a column (x set by hop depth); within a column the nodes are evenly
 * distributed across a vertical band whose width tracks the node count, so the
 * trace reads as a tidy lens that fans out from the seed and converges toward the
 * horizon. A small SEEDED (deterministic) jitter keeps it organic without
 * breaking the structure or reshuffling between renders.
 */
function buildHopGraph(): { nodes: HopNode[]; edges: HopEdge[] } {
  const rng = makeRng(0x5eed1234);
  const counts = [1, 2, 3, 4, 5, 5, 5, 4, 4, 3, 3, 2, 1]; // fan out → converge
  const maxC = Math.max(...counts);
  const PAD = 10;
  const SPAN = 100 - PAD * 2;
  const jitter = (amt: number) => (rng() - 0.5) * 2 * amt;

  const nodes: HopNode[] = [];
  const layers: HopNode[][] = [];

  counts.forEach((c, hop) => {
    const layer: HopNode[] = [];
    const colX = PAD + (hop / (counts.length - 1)) * SPAN;
    // vertical band widens with the node count (centered on the mid-line)
    const bandFrac = c === 1 ? 0 : Math.min(1, (c - 1) / (maxC - 1));
    const bandH = SPAN * (0.22 + 0.78 * bandFrac);
    const yTop = 50 - bandH / 2;
    for (let i = 0; i < c; i++) {
      const t = c === 1 ? 0.5 : i / (c - 1);
      const x = colX + jitter(3.2);
      const y = yTop + t * bandH + jitter(bandH / Math.max(c, 4) / 2.4);
      const node: HopNode = {
        id: `h${hop}-${i}`,
        hop,
        x: Math.max(PAD, Math.min(100 - PAD, x)),
        y: Math.max(PAD, Math.min(100 - PAD, y)),
      };
      nodes.push(node);
      layer.push(node);
    }
    layers.push(layer);
  });

  const edges: HopEdge[] = [];
  const dist2 = (a: HopNode, b: HopNode) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  for (let hop = 1; hop < layers.length; hop++) {
    const prev = layers[hop - 1];
    layers[hop].forEach((n) => {
      // primary link: nearest node in the previous column (keeps edges short/tidy)
      let best = prev[0];
      let bd = Infinity;
      prev.forEach((p) => {
        const d = dist2(p, n);
        if (d < bd) {
          bd = d;
          best = p;
        }
      });
      edges.push({ s: best.id, t: n.id, hop });
      // ~22% get a second nearest link for a light lattice (still structured)
      if (prev.length > 1 && rng() < 0.22) {
        let alt = prev[0];
        let ad = Infinity;
        prev.forEach((p) => {
          if (p.id === best.id) return;
          const d = dist2(p, n);
          if (d < ad) {
            ad = d;
            alt = p;
          }
        });
        if (alt.id !== best.id) edges.push({ s: alt.id, t: n.id, hop });
      }
    });
  }
  return { nodes, edges };
}

export const hopGraph = buildHopGraph();

export const hopContext = [
  { entity: "SUBJECT ACCT", risk: 91, reason: "Trigger — structuring pattern" },
  { entity: "SHELL LLC", risk: 84, reason: "Recipient · 3-week-old entity" },
  { entity: "PASSTHROUGH", risk: 78, reason: "22 transactions / 48h" },
  { entity: "FAN-IN HUB", risk: 82, reason: "Aggregates 9 sources" },
  { entity: "MULE RING", risk: 74, reason: "Layered counterparties" },
  { entity: "VASP", risk: 63, reason: "Exchange · KYC tier 1" },
  { entity: "BRIDGE", risk: 66, reason: "Cross-chain movement" },
  { entity: "OFFSHORE", risk: 71, reason: "Non-cooperative jurisdiction" },
  { entity: "NOMINEE", risk: 58, reason: "Beneficial owner obscured" },
  { entity: "MIXER", risk: 69, reason: "Tumbler · obfuscation" },
  { entity: "DUST TRAIL", risk: 41, reason: "Attribution degrading" },
  { entity: "COLD WALLET", risk: 33, reason: "Dormant endpoint" },
  { entity: "HORIZON", risk: 22, reason: "Trace confidence floor" },
];
