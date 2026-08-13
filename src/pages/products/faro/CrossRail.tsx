/* ═══════════════════════════════════════════════════════════════════════
   CROSS-RAIL TRACE — sticky scroll-driven cross-rail money trace.

   Tall section (~300vh; "auto" under reduced motion) with a sticky 100vh
   inner. scrollYProgress → hop 0..(railHops.length-1). A blue pathLength
   SVG trace draws across vertical rail columns; nodes light up one by one;
   right panel shows hop detail. When the last hop is reached a pattern
   envelope rectangle fades in. All color from tokens — no hex, no gradients.
   ═══════════════════════════════════════════════════════════════════════ */
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { rails, railHops } from "./data";
import { MonoLabel } from "./primitives";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import styles from "./CrossRail.module.css";

/* ── geometry (mirrors reference exactly) ── */
const colX = (r: number) => ((r + 0.5) / rails.length) * 100;

const NODES = railHops.map((h, i) => ({
  x: colX(h.rail),
  y: 14 + i * 23,
  h,
}));

let TRACE = `M ${NODES[0].x} 3 V ${NODES[0].y}`;
NODES.slice(1).forEach((n) => {
  TRACE += ` V ${n.y} H ${n.x}`;
});
TRACE += ` V ${NODES[NODES.length - 1].y + 9}`;

const MINX = Math.min(...NODES.map((n) => n.x));
const MAXX = Math.max(...NODES.map((n) => n.x));

/* ── component ── */
export default function CrossRail() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pathLen = useTransform(scrollYProgress, [0.06, 0.82], [0, 1]);
  const hopMV = useTransform(
    scrollYProgress,
    [0.1, 0.86],
    [0, railHops.length - 1]
  );
  const [hop, setHop] = useState(reduced ? railHops.length - 1 : 0);

  useMotionValueEvent(hopMV, "change", (v) => {
    if (!reduced)
      setHop(Math.min(railHops.length - 1, Math.max(0, Math.round(v))));
  });

  const done = hop >= railHops.length - 1;
  const ctx = railHops[hop] ?? railHops[0];

  return (
    <section
      ref={ref}
      className={styles.section}
      style={{ height: reduced ? "auto" : "300vh" }}
      data-testid="crossrail-section"
    >
      <div className={styles.sticky}>
        {/* ── header ── */}
        <div className={styles.header}>
          <div>
            <MonoLabel tone="accent">CROSS-RAIL TRACE · EXAMPLE TYPOLOGY</MonoLabel>
            <h2 className={styles.title}>
              A single rail would miss it.
            </h2>
            <p className={styles.subtitle}>
              Follow one flow as it hops rail to rail. No single system sees
              the whole path — Faro traces it top to bottom.
            </p>
          </div>
          <div className={styles.counter}>
            <div className={styles.counterNum}>
              {String(hop + 1).padStart(2, "0")}
              <span className={styles.counterTotal}> / {railHops.length}</span>
            </div>
            <MonoLabel className={styles.counterLabel}>HOPS TRACED</MonoLabel>
          </div>
        </div>

        {/* ── main grid ── */}
        <div className={styles.grid}>
          {/* ── trace viz ── */}
          <div className={styles.vizPanel}>
            {/* column headers */}
            {rails.map((r, i) => {
              const active = i === ctx.rail;
              return (
                <div
                  key={r}
                  className={styles.colHeader}
                  style={{ left: `${colX(i)}%` }}
                >
                  <MonoLabel
                    className={styles.colLabel}
                    style={{ color: active ? "var(--accent)" : "var(--text-3)" }}
                  >
                    {r}
                  </MonoLabel>
                </div>
              );
            })}

            {/* column guides + animated trace */}
            <svg
              className={styles.traceSvg}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* dashed guide lines */}
              {rails.map((_, i) => (
                <line
                  key={i}
                  x1={colX(i)}
                  y1={8}
                  x2={colX(i)}
                  y2={99}
                  className={styles.guide}
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="1 2"
                />
              ))}

              {/* blue trace path — drawn via pathLength */}
              <motion.path
                d={TRACE}
                fill="none"
                className={styles.tracePath}
                strokeWidth={1}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: reduced ? 1 : pathLen }}
              />
            </svg>

            {/* hop nodes */}
            {NODES.map((n, i) => {
              const on = reduced || i <= hop;
              const current = i === hop && !reduced;
              const h = n.h;
              return (
                <div
                  key={i}
                  className={styles.node}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  {/* label above */}
                  <motion.div
                    className={styles.nodeLabel}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0.25, y: on ? 0 : 4 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    <MonoLabel
                      className={styles.nodeLabelText}
                      style={{ color: on ? "var(--accent)" : "var(--text-3)" }}
                    >
                      {h.label}
                    </MonoLabel>
                  </motion.div>

                  {/* dot + pulse ring */}
                  <motion.div
                    className={styles.dotWrap}
                    initial={false}
                    animate={{ scale: on ? 1 : 0.55, opacity: on ? 1 : 0.3 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    <span
                      className={styles.dot}
                      style={{
                        background: on ? "var(--accent)" : "var(--line-strong)",
                      }}
                    />
                    {current && (
                      <motion.span
                        className={styles.pulse}
                        animate={{ scale: [1, 2.8], opacity: [0.6, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </motion.div>

                  {/* amount below */}
                  <motion.div
                    className={styles.nodeAmount}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0.15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span
                      className={styles.nodeAmountText}
                      style={{ color: on ? "var(--text)" : "var(--text-3)" }}
                    >
                      {h.amount}
                    </span>
                  </motion.div>
                </div>
              );
            })}

            {/* pattern envelope (shown when all hops done) */}
            <AnimatePresence>
              {done && (
                <motion.div
                  className={styles.envelope}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  style={{
                    left: `${MINX - 8}%`,
                    right: `${100 - (MAXX + 8)}%`,
                    top: "8%",
                    bottom: "5%",
                  }}
                >
                  <div className={styles.envelopePill}>
                    <span
                      className={styles.verdictPill}
                      data-testid="crossrail-verdict-pill"
                    >
                      LAYERING · CROSS-RAIL · HOLD
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* corner meta labels */}
            <span
              className={styles.cornerLeft}
              data-testid="crossrail-scrubbed"
            >
              EXAMPLE TYPOLOGY · SCRUBBED
            </span>
            <span className={styles.cornerRight}>
              {done ? "PATTERN CAUGHT" : "TRACING…"}
            </span>
          </div>

          {/* ── side panel ── */}
          <div className={styles.panel}>
            <MonoLabel className={styles.panelLabel}>CURRENT HOP</MonoLabel>

            <motion.div
              key={hop}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* rail pill + hop index */}
              <div className={styles.hopMeta}>
                <span className={styles.railPill}>{rails[ctx.rail]}</span>
                <MonoLabel className={styles.hopIndex}>
                  HOP {String(hop + 1).padStart(2, "0")}
                </MonoLabel>
              </div>

              {/* label */}
              <div className={styles.hopLabel}>{ctx.label}</div>

              {/* amount + entity */}
              <div className={styles.hopAmountRow}>
                <span className={styles.hopAmount}>{ctx.amount}</span>
                <MonoLabel className={styles.hopEntity}>{ctx.entity}</MonoLabel>
              </div>

              {/* why text */}
              <p className={styles.why}>
                <span className={styles.whyKey}>Why it linked — </span>
                {ctx.why}
              </p>
            </motion.div>

            {/* footer */}
            <div className={styles.panelFooter}>
              <p className={styles.footerText}>
                Card, wires, ACH/SEPA, UPI, crypto, sanctions — and whatever
                rail your stack runs on.
              </p>
              <div className={styles.footerRow}>
                <span className={styles.footerDot} />
                <MonoLabel className={styles.panelLabel}>
                  {reduced
                    ? "STATIC · FULL TRACE"
                    : "SCROLL TO TRACE THE MONEY"}
                </MonoLabel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
