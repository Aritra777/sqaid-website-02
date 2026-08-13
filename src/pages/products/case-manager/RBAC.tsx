/* ═══════════════════════════════════════════════════════════════════════
   CASE MANAGER · RBAC — "Set permissions like policy, not like plumbing."

   Two sub-sections:
   1. COMPOSER — BrowserChrome with chip groups + live policy JSON that
      rebuilds as chips are toggled. Scripted sequence auto-plays on mount.
   2. ACCESS GRAPH — tripartite role→policy→scope graph with a clean
      horizontal cubic-bézier edge layout, auto-cycling selected role every
      ~2.2 s and highlighting the transitive reachable set. Column guide lines
      + headers make the tripartite structure legible.

   Rendered inside <Band tone="dark"> by the page wrapper; do NOT add a Band
   here. Root is a plain padded <div className={styles.section}>.

   Token rules: CSS variables only — no hex literals. No shadows/glows/gradients.
   Motion degrades under usePrefersReducedMotion (no auto-cycle, no pulse ring).
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import {
  policyChips,
  policyDefault,
  accessGraph,
  rbacNotes,
  type Policy,
} from "./data";
import {
  MonoLabel,
  BrowserChrome,
  PlaybackControls,
  DotGrid,
} from "./primitives";
import styles from "./RBAC.module.css";

/* ═══════════════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════════════ */

function policyJSON(p: Policy): string {
  return `{
  "effect": "${p.effect}",
  "actions": [
${p.actions.map((a) => `    "${a}"`).join(",\n")}
  ],
  "resource": "${p.resource}",
  "condition": ${p.condition ? `{ "state": "in_review" }` : "null"}
}`;
}

/** Scripted sequence of toggles replayed on mount / replay */
const SCRIPT = [
  { g: "actions", id: "case:attach" },
  { g: "actions", id: "sar:draft" },
  { g: "condition" },
] as const;

/** A policy-toggle event: g identifies the group, id the specific item (omitted for condition) */
type PolicyEvent = { g: string; id?: string };

/** Compute transitive reachable node IDs from a start ID over the edge list */
function reachFrom(startId: string, edges: { s: string; t: string }[]): Set<string> {
  const reach = new Set([startId]);
  let grew = true;
  while (grew) {
    grew = false;
    edges.forEach((e) => {
      if (reach.has(e.s) && !reach.has(e.t)) {
        reach.add(e.t);
        grew = true;
      }
    });
  }
  return reach;
}

/* ═══════════════════════════════════════════════════════════════════════
   Composer
   ═══════════════════════════════════════════════════════════════════════ */

function Composer() {
  const rm = usePrefersReducedMotion();

  /* Reduced motion: start fully composed (all scripted steps applied) */
  const [policy, setPolicy] = useState<Policy>(
    rm
      ? {
          ...policyDefault,
          actions: [...policyDefault.actions, "case:attach", "sar:draft"],
          condition: false,
        }
      : { ...policyDefault }
  );
  const [stepIdx, setStepIdx] = useState(rm ? SCRIPT.length : 0);
  const [playing, setPlaying] = useState(!rm);

  const applyEvent = useCallback((ev: PolicyEvent) => {
    setPolicy((p) => {
      if (ev.g === "condition") return { ...p, condition: !p.condition };
      if (!ev.id) return p;
      if (ev.g === "effect") return { ...p, effect: ev.id };
      if (ev.g === "resource") return { ...p, resource: ev.id };
      /* actions toggle */
      const has = p.actions.includes(ev.id);
      return {
        ...p,
        actions: has ? p.actions.filter((a) => a !== ev.id) : [...p.actions, ev.id],
      };
    });
  }, []);

  /* Auto-play timer */
  useEffect(() => {
    if (rm || !playing) return;
    if (stepIdx >= SCRIPT.length) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => {
      applyEvent(SCRIPT[stepIdx]);
      setStepIdx((i) => i + 1);
    }, 950);
    return () => clearTimeout(id);
  }, [stepIdx, playing, rm, applyEvent]);

  const replay = useCallback(() => {
    setPolicy({ ...policyDefault });
    setStepIdx(0);
    setPlaying(true);
  }, []);

  const stepFwd = useCallback(() => {
    setPlaying(false);
    if (stepIdx < SCRIPT.length) {
      applyEvent(SCRIPT[stepIdx]);
      setStepIdx((i) => i + 1);
    }
  }, [stepIdx, applyEvent]);

  /* Is a chip active for the current policy? */
  const isActive = (g: string, id?: string): boolean => {
    if (g === "condition") return Boolean(policy.condition);
    if (g === "effect") return policy.effect === id;
    if (g === "resource") return policy.resource === id;
    return policy.actions.includes(id!);
  };

  /* Manual toggle from clicking a chip */
  const toggle = (ev: PolicyEvent) => {
    setPlaying(false);
    applyEvent(ev);
  };

  const json = policyJSON(policy);

  return (
    <div>
      <BrowserChrome
        label="sqaid / policy-composer"
        right={
          <MonoLabel tone="accent" style={{ fontSize: 9 }}>
            IAM · v2
          </MonoLabel>
        }
      >
        <div className={styles.composerGrid}>
          {/* ── Left: chip groups ── */}
          <div className={styles.chipPanel}>
            {/* EFFECT */}
            <div className={styles.chipGroup}>
              <MonoLabel tone="muted" className={styles.groupLabel}>
                EFFECT
              </MonoLabel>
              <div className={styles.chipRow}>
                {policyChips.effect.map((c) => {
                  const active = isActive("effect", c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      data-testid={`policy-effect-${c.id}`}
                      onClick={() => toggle({ g: "effect", id: c.id })}
                      className={styles.chip}
                      data-active={active ? "true" : undefined}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTIONS */}
            <div className={styles.chipGroup}>
              <MonoLabel tone="muted" className={styles.groupLabel}>
                ACTIONS
              </MonoLabel>
              <div className={styles.chipRow}>
                {policyChips.actions.map((c) => {
                  const active = isActive("actions", c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      data-testid={`policy-actions-${c.id}`}
                      onClick={() => toggle({ g: "actions", id: c.id })}
                      className={styles.chip}
                      data-active={active ? "true" : undefined}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RESOURCE */}
            <div className={styles.chipGroup}>
              <MonoLabel tone="muted" className={styles.groupLabel}>
                RESOURCE
              </MonoLabel>
              <div className={styles.chipRow}>
                {policyChips.resource.map((c) => {
                  const active = isActive("resource", c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      data-testid={`policy-resource-${c.id}`}
                      onClick={() => toggle({ g: "resource", id: c.id })}
                      className={styles.chip}
                      data-active={active ? "true" : undefined}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CONDITION */}
            <div className={styles.chipGroup}>
              <MonoLabel tone="muted" className={styles.groupLabel}>
                CONDITION
              </MonoLabel>
              <div className={styles.chipRow}>
                {policyChips.condition.map((c) => {
                  const active = isActive("condition");
                  return (
                    <button
                      key={c.id}
                      type="button"
                      data-testid={`policy-condition-${c.id}`}
                      onClick={() => toggle({ g: "condition" })}
                      className={styles.chip}
                      data-active={active ? "true" : undefined}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: live policy JSON ── */}
          <div className={styles.jsonPane}>
            <MonoLabel tone="muted">POLICY · LIVE</MonoLabel>
            <pre className={styles.pre}>
              <AnimatePresence mode="wait">
                <motion.code
                  key={json}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.4 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className={styles.code}
                >
                  {json}
                </motion.code>
              </AnimatePresence>
            </pre>
          </div>
        </div>
      </BrowserChrome>

      <PlaybackControls
        onReplay={replay}
        onStep={stepFwd}
        step={stepIdx}
        total={SCRIPT.length + 1}
        playing={playing}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   AccessGraph
   ═══════════════════════════════════════════════════════════════════════ */

function AccessGraph() {
  const rm = usePrefersReducedMotion();
  const roles = accessGraph.roles;
  const [selIdx, setSelIdx] = useState(0);

  /* Auto-cycle selected role every 2.2 s (skip in reduced-motion mode) */
  useEffect(() => {
    if (rm) return;
    const t = setInterval(() => setSelIdx((s) => (s + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, [rm, roles.length]);

  const selRole = roles[selIdx];
  const reach = reachFrom(selRole.id, accessGraph.edges);

  /* All nodes for rendering */
  const all = [...accessGraph.roles, ...accessGraph.policies, ...accessGraph.scopes];

  /* k ≈ one-third of horizontal gap between columns (x≈10→50→90, gap=40) */
  const K = 13;

  return (
    <div className={styles.graphFrame}>
      {/* ── Chrome header ── */}
      <div className={styles.graphHeader}>
        <MonoLabel tone="muted">
          ACCESS GRAPH · ROLES → POLICIES → SCOPES
        </MonoLabel>
        <MonoLabel tone="accent">{selRole.label.toUpperCase()}</MonoLabel>
      </div>

      {/* ── Canvas ── */}
      <div className={styles.graphCanvas}>
        <DotGrid gap={4} r={0.3} opacity={0.14} />

        {/* ── Column guide lines ── */}
        <svg
          className={styles.guideSvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Three faint vertical column guides */}
          {[10, 50, 90].map((x) => (
            <line
              key={x}
              x1={x}
              y1={8}
              x2={x}
              y2={96}
              stroke="rgb(var(--fg-rgb) / 0.08)"
              strokeWidth={0.5}
              vectorEffect="non-scaling-stroke"
              strokeDasharray="2 3"
            />
          ))}

          {/* Smooth horizontal bézier edges */}
          {accessGraph.edges.map((e, i) => {
            const a = all.find((n) => n.id === e.s)!;
            const b = all.find((n) => n.id === e.t)!;
            const hot = reach.has(e.s) && reach.has(e.t);
            /* Cubic bézier: control points pulled horizontally */
            const d = `M ${a.x} ${a.y} C ${a.x + K} ${a.y}, ${b.x - K} ${b.y}, ${b.x} ${b.y}`;
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={hot ? "var(--accent)" : "rgb(var(--fg-rgb) / 0.22)"}
                strokeWidth={hot ? 1.2 : 0.7}
                vectorEffect="non-scaling-stroke"
                style={{ transition: "stroke 0.5s, stroke-width 0.5s" }}
              />
            );
          })}
        </svg>

        {/* ── Column header labels (absolute, above nodes) ── */}
        {(["ROLES", "POLICIES", "SCOPES"] as const).map((label, i) => (
          <span
            key={label}
            className={styles.colHeader}
            style={{ left: `${[10, 50, 90][i]}%` }}
          >
            {label}
          </span>
        ))}

        {/* ── Nodes ── */}
        {all.map((n) => {
          const hot = reach.has(n.id);
          const isRole = accessGraph.roles.some((r) => r.id === n.id);
          const isSel = n.id === selRole.id;
          return (
            <div
              key={n.id}
              className={styles.nodeWrap}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <button
                type="button"
                onClick={() => {
                  if (isRole) setSelIdx(roles.findIndex((r) => r.id === n.id));
                }}
                className={styles.nodePill}
                data-hot={hot ? "true" : undefined}
                data-sel={isSel ? "true" : undefined}
                data-role={isRole ? "true" : undefined}
              >
                {n.label}
              </button>

              {/* Pulse ring — DOM span, not SVG geometry */}
              {isSel && !rm && (
                <motion.span
                  className={styles.pulseRing}
                  animate={{ scale: [1, 1.65], opacity: [0.55, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   RBAC — default export
   ═══════════════════════════════════════════════════════════════════════ */

export default function RBAC() {
  return (
    <div className={styles.section}>
      {/* ── Heading block ── */}
      <div className={styles.headBlock}>
        <MonoLabel tone="accent">RBAC · POLICY COMPOSER</MonoLabel>
        <Reveal>
          <h2 className={styles.h2}>
            Set permissions like policy,
            <br />
            not like plumbing.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.lead}>
            An AWS-IAM-inspired model, built in-house. Compose allow/deny
            policies over actions, resources and case-state conditions —
            unioned and cached on sign-in.
          </p>
        </Reveal>
      </div>

      {/* ── Composer ── */}
      <Reveal>
        <Composer />
      </Reveal>

      {/* ── Access graph + notes ── */}
      <div className={styles.graphRow}>
        <Reveal delay={0.05}>
          <AccessGraph />
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.notesPanel}>
            {rbacNotes.map((note, i) => (
              <div key={i} className={styles.noteItem}>
                <span className={styles.noteDot} aria-hidden="true" />
                <span className={styles.noteText}>{note}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
