/* ═══════════════════════════════════════════════════════════════════════
   CASE MANAGER · WORKFLOW — "Wire the workflow. Enforced by the backend."
   Section 02: lifecycle builder — scripted playback of a branch insertion.

   Token rules (from .claude/design.md):
   • No hex colors — CSS variables only.
   • VIOLET → var(--accent); accent-soft → var(--accent-soft);
     accent-border → var(--accent-border); accent-contrast → var(--accent-contrast).
   • rgb(var(--fg-rgb)/α) with SPACE-separated channels (inherited from Band).
   • No shadows. No gradients. No noise (omitted per spec).
   • Framer Motion: never animate SVG geometry attrs (r, cx, cy) — only
     pathLength/opacity on <motion.line>. Static <circle> dots are fine.
   • Reduced motion: branch shown immediately, no timer.
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import {
  workflowBase,
  workflowBranch,
  workflowVerdict,
  type WfNode,
} from "./data";
import {
  MonoLabel,
  GhostNumeral,
  DotGrid,
  PlaybackControls,
} from "./primitives";
import styles from "./Workflow.module.css";

/* ── helpers ─────────────────────────────────────────────────────────── */
function nodeById(nodes: WfNode[], id: string): WfNode | undefined {
  return nodes.find((n) => n.id === id);
}

/* ── main component ──────────────────────────────────────────────────── */
export default function Workflow() {
  const reduced = usePrefersReducedMotion();

  /* branch visibility + playback state */
  const [branch, setBranch] = useState(reduced ? true : false);
  const [playing, setPlaying] = useState(!reduced);

  /* auto-advance after 1 400 ms if playing (and not reduced-motion) */
  useEffect(() => {
    if (reduced || !playing) return;
    const t = setTimeout(() => {
      setBranch(true);
      setPlaying(false);
    }, 1400);
    return () => clearTimeout(t);
  }, [playing, reduced]);

  const replay = useCallback(() => {
    setBranch(false);
    setPlaying(true);
  }, []);

  const stepFwd = useCallback(() => {
    setPlaying(false);
    setBranch((b) => !b);
  }, []);

  /* build active node + edge lists */
  const nodes = branch
    ? [...workflowBase.nodes, workflowBranch.node]
    : workflowBase.nodes;
  const edges = branch
    ? [...workflowBase.edges, ...workflowBranch.edges]
    : workflowBase.edges;

  return (
    <div className={styles.section}>
      {/* ── copy block ────────────────────────────────────────────── */}
      <div className={styles.heading}>
        <GhostNumeral n="02" className={styles.ghost} />

        <MonoLabel tone="accent">WORKFLOW · LIFECYCLE BUILDER</MonoLabel>

        <Reveal>
          <h2 className={styles.h2}>
            Wire the workflow.
            <br />
            Enforced by the backend, not the UI.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={styles.lead}>
            Bind a lifecycle per alert type. Add a branch, re-route a
            state — the graph is the source of truth and the server refuses
            any transition it doesn&rsquo;t allow.
          </p>
        </Reveal>
      </div>

      {/* ── framed panel ──────────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <div className={styles.frame}>
          {/* bar */}
          <div className={styles.bar}>
            <MonoLabel className={styles.barLabel}>
              WORKFLOW · alert-type/aml
            </MonoLabel>

            <AnimatePresence>
              {branch && (
                <motion.span
                  className={styles.verdictPill}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  {workflowVerdict}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* canvas */}
          <div className={styles.canvas}>
            {/* dot grid */}
            <DotGrid gap={4} r={0.3} opacity={0.16} />

            {/* SVG edge layer */}
            <svg
              className={styles.svg}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {edges.map((e, i) => {
                const a = nodeById(nodes, e.s);
                const b = nodeById(nodes, e.t);
                if (!a || !b) return null;
                const isBranchEdge =
                  branch &&
                  workflowBranch.edges.some(
                    (be) => be.s === e.s && be.t === e.t
                  );

                return (
                  <g key={`${e.s}-${e.t}-${i}`}>
                    {/* edge line: only pathLength/opacity animated — safe */}
                    <motion.line
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={
                        isBranchEdge
                          ? "var(--accent)"
                          : "rgb(var(--fg-rgb) / 0.35)"
                      }
                      strokeWidth={1}
                      vectorEffect="non-scaling-stroke"
                      initial={
                        reduced
                          ? { pathLength: 1, opacity: 1 }
                          : { pathLength: 0, opacity: 0 }
                      }
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : {
                              pathLength: {
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                              },
                              opacity: { duration: 0.15 },
                            }
                      }
                    />
                    {/* terminal dot — static circle, not Framer-animated geometry */}
                    <circle
                      cx={b.x}
                      cy={b.y}
                      r={0.9}
                      fill={
                        isBranchEdge
                          ? "var(--accent)"
                          : "rgb(var(--fg-rgb) / 0.5)"
                      }
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                );
              })}
            </svg>

            {/* node cards */}
            {nodes.map((n) => {
              const isBranchNode = n.id === "escalate";
              return (
                <motion.div
                  key={n.id}
                  data-testid={`wf-node-${n.id}`}
                  className={styles.nodeCard}
                  data-branch={isBranchNode ? "true" : undefined}
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                  }}
                  initial={
                    isBranchNode && !reduced
                      ? { opacity: 0, scale: 0.7 }
                      : false
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                  }
                >
                  <MonoLabel className={styles.nodeTag}>NODE</MonoLabel>
                  <span className={styles.nodeName}>{n.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* playback controls */}
        <PlaybackControls
          onReplay={replay}
          onStep={stepFwd}
          step={branch ? 1 : 0}
          total={2}
          playing={playing}
        />
      </Reveal>
    </div>
  );
}
