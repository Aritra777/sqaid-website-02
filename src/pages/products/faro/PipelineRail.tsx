/* ═══════════════════════════════════════════════════════════════════════
   FARO — PipelineRail section.

   An opposite-mode band (`.invert` on the section root) showing a
   transaction traveling Ingest → Detect → Triage → Decide → Report.
   A horizontal rail with a filled progress bar, a traveling dot (pipelineTxn
   pill + pulse ring), and five stage markers that light up as the dot passes.
   The dot loops in a requestAnimationFrame loop (~7s period). Under
   prefers-reduced-motion: no rAF loop; dot placed at REPORT, all stages lit.
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";
import { MonoLabel } from "./primitives";
import { pipeline, pipelineTxn } from "./data";
import styles from "./PipelineRail.module.css";

/* Stage fractions along the rail (0–1), matching five pipeline stages. */
const FRAC = [0.06, 0.29, 0.5, 0.71, 0.94];

export default function PipelineRail() {
  const reduced = usePrefersReducedMotion();

  /* Under reduced motion: start at REPORT (final fraction = 0.94). */
  const [pos, setPos] = useState(reduced ? 0.94 : 0);

  useEffect(() => {
    if (reduced) return;
    let raf: number;
    let start: number | null = null;

    const loop = (t: number) => {
      if (start == null) start = t;
      const p = ((t - start) / 7000) % 1;
      setPos(p);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section
      data-testid="pipeline-section"
      className={cn("invert", styles.section)}
    >
      <div className={styles.inner}>

        {/* ── Heading block ── */}
        <div className={styles.header}>
          <MonoLabel tone="accent">THE PIPELINE</MonoLabel>

          <Reveal>
            <h2 className={styles.h2}>
              Ingest → Detect → Triage → Decide → Report.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.lead}>
              Watch one transaction,{" "}
              <span className={styles.txnId}>{pipelineTxn}</span>, travel the
              pipeline — picking up a stat at every stage and leaving with a
              verdict.
            </p>
          </Reveal>
        </div>

        {/* ── Rail card ── */}
        <Reveal delay={0.15}>
          <div className={styles.card}>

            {/* Base rail track + progress fill + traveling dot */}
            <div className={styles.railWrap}>

              {/* Rail base */}
              <div className={styles.railBase} />

              {/* Progress fill */}
              <motion.div
                className={styles.railFill}
                style={{ width: `${pos * 100}%` }}
              />

              {/* Traveling transaction dot */}
              <div
                className={styles.dotWrap}
                style={{
                  left: `${pos * 100}%`,
                }}
              >
                {/* Txn ID pill above the dot */}
                <span className={styles.txnPill}>{pipelineTxn}</span>

                {/* Dot */}
                <span className={styles.dot} />

                {/* Pulse ring (hidden under reduced-motion via CSS) */}
                {!reduced && (
                  <motion.span
                    className={styles.pulse}
                    animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Stage markers */}
              {pipeline.map((st, i) => {
                const passed = pos >= FRAC[i] - 0.01;
                return (
                  <div
                    key={st.key}
                    className={styles.markerWrap}
                    style={{ left: `${FRAC[i] * 100}%` }}
                  >
                    {/* Stage name above */}
                    <div className={styles.markerLabel}>
                      <MonoLabel
                        tone={passed ? "accent" : "muted"}
                        className={styles.markerKey}
                      >
                        {st.key}
                      </MonoLabel>
                    </div>

                    {/* Marker dot */}
                    <span
                      className={styles.markerDot}
                      style={{
                        background: passed ? "var(--accent)" : "var(--line-strong)",
                      }}
                    />

                    {/* Stat + sub below */}
                    <motion.div
                      className={styles.markerStat}
                      initial={false}
                      animate={{
                        opacity: passed ? 1 : 0.2,
                        y: passed ? 0 : 4,
                      }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                    >
                      <div
                        className={styles.statValue}
                        style={{ color: passed ? "var(--text)" : "var(--text-3)" }}
                      >
                        {st.stat}
                      </div>
                      <div className={styles.statSub}>{st.sub}</div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Footer meta */}
            <div className={styles.cardFooter}>
              <span className={styles.footerDot} />
              <MonoLabel tone="muted" className={styles.footerLabel}>
                {reduced
                  ? "SHOWN AT REPORT · ALL STAGES POPULATED"
                  : "ONE TXN · LOOPING IN REAL-TIME"}
              </MonoLabel>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
