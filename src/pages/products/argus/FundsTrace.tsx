/* ═══════════════════════════════════════════════════════════════════════
   FUNDS TRACE — scroll-driven knowledge-graph reveal.

   Tall section (~340vh; "auto" under reduced motion) with a sticky 100vh
   inner. scrollYProgress → hop 0..12. The SVG graph reveals nodes/edges whose
   hop ≤ current hop; the current-hop node emits a pulse ring (SMIL, motion on).
   Node/edge color = var(--accent); node opacity = decay(hop). All color from
   tokens — no hex, no gradients (hop-decay legend = discrete stepped swatches).
   ═══════════════════════════════════════════════════════════════════════ */
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import NoiseOverlay from "@/components/graphics/NoiseOverlay";
import { MonoLabel } from "./primitives";
import { hopGraph, hopContext, decay, type HopNode } from "./data";
import styles from "./FundsTrace.module.css";

function nodeById(id: string): HopNode | undefined {
  return hopGraph.nodes.find((n) => n.id === id);
}

/* Discrete opacity steps for the hop-decay legend (was a banned gradient). */
const DECAY_SWATCHES = [1, 0.7, 0.5, 0.3, 0.15];

export default function FundsTrace() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const hopMV = useTransform(scrollYProgress, [0.05, 0.95], [0, 12]);
  const [hop, setHop] = useState(reduced ? 12 : 0);

  useMotionValueEvent(hopMV, "change", (v) => {
    if (!reduced) setHop(Math.min(12, Math.max(0, Math.round(v))));
  });

  const ctx = hopContext[hop] ?? hopContext[0];
  const traversed = hopGraph.nodes.filter((n) => n.hop <= hop).length;

  return (
    <section
      ref={ref}
      className={styles.section}
      style={{ height: reduced ? "auto" : "340vh" }}
    >
      <div className={styles.sticky}>
        <NoiseOverlay />

        <div className={styles.header}>
          <div>
            <MonoLabel tone="accent">KNOWLEDGE GRAPH · FUNDS TRACE</MonoLabel>
            <h2 className={styles.title}>Follow the money, hop by hop.</h2>
          </div>
          <div className={styles.counter}>
            <div className={styles.counterNum}>
              {String(hop).padStart(2, "0")}
              <span className={styles.counterTotal}> / 12</span>
            </div>
            <MonoLabel className={styles.counterLabel}>HOP DEPTH</MonoLabel>
          </div>
        </div>

        <div className={styles.grid}>
          {/* ── graph ── */}
          <div className={styles.graph}>
            <svg
              className={styles.svg}
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {hopGraph.edges.map((e, i) => {
                const a = nodeById(e.s);
                const b = nodeById(e.t);
                if (!a || !b) return null;
                const on = reduced || e.hop <= hop;
                return (
                  <line
                    key={i}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className={styles.edge}
                    strokeWidth={0.25}
                    style={{ opacity: on ? decay(e.hop) * 0.6 : 0 }}
                  />
                );
              })}
              {hopGraph.nodes.map((n) => {
                const on = reduced || n.hop <= hop;
                const isSeed = n.hop === 0;
                return (
                  <g
                    key={n.id}
                    className={styles.node}
                    style={{ opacity: on ? 1 : 0 }}
                  >
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={isSeed ? 2.2 : 1.3}
                      className={styles.dot}
                      style={{ opacity: decay(n.hop) }}
                    />
                    {n.hop === hop && !reduced && (
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={2.4}
                        fill="none"
                        className={styles.pulse}
                        strokeWidth={0.3}
                      >
                        <animate
                          attributeName="r"
                          values="2;5"
                          dur="1.4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.7;0"
                          dur="1.4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* hop-decay legend — discrete stepped swatches (no gradient) */}
            <div className={styles.legend}>
              <MonoLabel className={styles.legendLabel}>HOP DECAY</MonoLabel>
              <div className={styles.swatches}>
                {DECAY_SWATCHES.map((o, i) => (
                  <span key={i} className={styles.swatch} style={{ opacity: o }} />
                ))}
              </div>
              <MonoLabel className={styles.legendLabel}>1 → 12</MonoLabel>
            </div>

            <span className={styles.traversed}>{traversed} NODES TRAVERSED</span>
          </div>

          {/* ── side panel ── */}
          <div className={styles.panel}>
            <MonoLabel className={styles.panelLabel}>
              CURRENT HOP CONTEXT
            </MonoLabel>
            <motion.div
              key={hop}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className={styles.entity}>{ctx.entity}</div>
              <div className={styles.riskRow}>
                <div className={styles.riskTrack}>
                  <motion.div
                    className={styles.riskFill}
                    initial={false}
                    animate={{ width: `${ctx.risk}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className={styles.riskNum}>{ctx.risk}</span>
              </div>
              <MonoLabel className={styles.riskLabel}>RISK SCORE</MonoLabel>
              <p className={styles.reason}>
                <span className={styles.reasonKey}>Why traversed — </span>
                {ctx.reason}
              </p>
            </motion.div>
            <div className={styles.footer}>
              <span className={styles.footerDot} />
              <MonoLabel className={styles.panelLabel}>
                {reduced
                  ? "STATIC SNAPSHOT · FULL GRAPH"
                  : "SCROLL TO EXPAND THE TRACE"}
              </MonoLabel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
