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
     pathLength/opacity on <motion.path>. Static geometry via plain props.
   • Reduced motion: branch shown immediately, no timer.

   SVG approach:
   • A ResizeObserver measures the canvas div in real pixels → pixel viewBox
     that exactly matches the container, so preserveAspectRatio stays default
     (no "none" distortion). Arrowhead markers render true-size.
   • Node x/y% from data are mapped to pixel coords; main chain edges are
     purely horizontal (no skew possible). Branch edges are smooth cubic
     béziers. Endpoints are offset by CARD_W/2 so lines meet the card border.
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useState, useCallback, useRef } from "react";
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

/* Half-width of a node card in pixels — used to offset line endpoints so
   they meet the card border rather than disappearing under the card. */
const CARD_HALF_W = 52; /* ~half of min-width:96px + padding */
const CARD_HALF_H = 20; /* ~half of card height */

/* ── EdgeLayer ───────────────────────────────────────────────────────── */
interface EdgeLayerProps {
  nodes: WfNode[];
  edges: { s: string; t: string }[];
  branchEdgeKeys: Set<string>;
  reduced: boolean;
  w: number; /* canvas px width */
  h: number; /* canvas px height */
}

function EdgeLayer({ nodes, edges, branchEdgeKeys, reduced, w, h }: EdgeLayerProps) {
  if (w === 0 || h === 0) return null;

  /* Convert node % position to canvas pixels */
  const px = (n: WfNode) => ({ x: (n.x / 100) * w, y: (n.y / 100) * h });

  /* Unique marker IDs (one for main, one for branch) */
  const mainMarkerId = "wf-arrow-main";
  const branchMarkerId = "wf-arrow-branch";

  return (
    <svg
      className={styles.svg}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
    >
      <defs>
        {/* Main-chain arrowhead */}
        <marker
          id={mainMarkerId}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path
            d="M0,0 L0,6 L8,3 z"
            fill="none"
            stroke="rgb(var(--fg-rgb) / 0.4)"
            strokeWidth="1"
          />
        </marker>
        {/* Branch arrowhead (accent-colored) */}
        <marker
          id={branchMarkerId}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="var(--accent)" />
        </marker>
      </defs>

      {edges.map((e, i) => {
        const a = nodeById(nodes, e.s);
        const b = nodeById(nodes, e.t);
        if (!a || !b) return null;

        const edgeKey = `${e.s}-${e.t}`;
        const isBranch = branchEdgeKeys.has(edgeKey);
        const pa = px(a);
        const pb = px(b);

        let d: string;
        let x1: number, y1: number, x2: number, y2: number;

        if (pa.y === pb.y) {
          /* Horizontal main-chain edge — offset by card half-width */
          x1 = pa.x + CARD_HALF_W;
          y1 = pa.y;
          x2 = pb.x - CARD_HALF_W;
          y2 = pb.y;
          d = `M ${x1} ${y1} L ${x2} ${y2}`;
        } else {
          /* Branch edge — smooth cubic bézier.
             Escalate is above the main chain. The bézier control points
             pull horizontally so the curve is visually smooth. */
          const goingUp = pb.y < pa.y;
          if (goingUp) {
            /* invest → escalate: depart right from invest, arrive bottom of escalate */
            x1 = pa.x + CARD_HALF_W;
            y1 = pa.y;
            x2 = pb.x;
            y2 = pb.y + CARD_HALF_H;
          } else {
            /* escalate → sar: depart right from escalate, arrive top of sar */
            x1 = pa.x + CARD_HALF_W;
            y1 = pa.y;
            x2 = pb.x - CARD_HALF_W;
            y2 = pb.y;
          }
          /* Horizontal pull distance: half of horizontal span */
          const dx = Math.abs(x2 - x1) * 0.5;
          d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
        }

        return (
          <motion.path
            key={`${edgeKey}-${i}`}
            d={d}
            fill="none"
            stroke={isBranch ? "var(--accent)" : "rgb(var(--fg-rgb) / 0.35)"}
            strokeWidth={isBranch ? 1.5 : 1}
            vectorEffect="non-scaling-stroke"
            markerEnd={`url(#${isBranch ? branchMarkerId : mainMarkerId})`}
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
                    pathLength: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.15 },
                  }
            }
          />
        );
      })}
    </svg>
  );
}

/* ── main component ──────────────────────────────────────────────────── */
export default function Workflow() {
  const reduced = usePrefersReducedMotion();

  /* branch visibility + playback state */
  const [branch, setBranch] = useState(reduced ? true : false);
  const [playing, setPlaying] = useState(!reduced);

  /* canvas dimensions — measured via ResizeObserver so the SVG viewBox
     matches the real pixel size (no preserveAspectRatio="none" distortion) */
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  /* Set of branch edge keys for quick lookup */
  const branchEdgeKeys = new Set(
    workflowBranch.edges.map((e) => `${e.s}-${e.t}`)
  );

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
          <div className={styles.canvas} ref={canvasRef}>
            {/* dot grid */}
            <DotGrid gap={4} r={0.3} opacity={0.16} />

            {/* SVG edge layer — pixel viewBox, no preserveAspectRatio distortion */}
            <EdgeLayer
              nodes={nodes}
              edges={edges}
              branchEdgeKeys={branchEdgeKeys}
              reduced={reduced}
              w={dims.w}
              h={dims.h}
            />

            {/* node cards — OPAQUE backgrounds occlude edges cleanly */}
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
