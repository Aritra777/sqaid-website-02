/* ═══════════════════════════════════════════════════════════════════════
   FARO — VerdictEvidence
   Two-column section: framed verdict mock (left, parallax) + one-number
   checklist (right, Reveal-staggered).

   Token rules: accent / text / line / surface variables only. No hex, no
   shadows, no gradients. Reduced-motion: parallax off, rows shown.
   ═══════════════════════════════════════════════════════════════════════ */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import Reveal from "@/components/motion/Reveal";
import { MonoLabel, FrameChrome } from "./primitives";
import { verdictChecklist, verdictSignals } from "./data";
import styles from "./VerdictEvidence.module.css";

/* ── VerdictMock ─────────────────────────────────────────────────────── */
function VerdictMock() {
  return (
    <div className={styles.mock}>
      {/* header row */}
      <div className={styles.mockHeader}>
        <MonoLabel tone="muted" className={styles.mockCase}>CASE ·8842</MonoLabel>
        <span className={styles.holdPill}>HOLD</span>
      </div>

      {/* score */}
      <div className={styles.scoreRow}>
        <span className={styles.scoreNum}>0.98</span>
        <MonoLabel tone="muted" className={styles.scoreLabel}>RISK SCORE</MonoLabel>
      </div>

      {/* signal bars */}
      <div className={styles.bars}>
        {verdictSignals.map(([label, weight]) => (
          <div key={label} className={styles.barRow}>
            <div className={styles.barMeta}>
              <MonoLabel className={styles.barLabel}>{label}</MonoLabel>
              <MonoLabel tone="accent" className={styles.barWeight}>
                {weight}
              </MonoLabel>
            </div>
            <div className={styles.track}>
              <div
                className={styles.fill}
                style={{ width: `${weight * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className={styles.mockFooter}>
        <span className={styles.footerDot} aria-hidden="true" />
        <MonoLabel tone="muted" className={styles.footerText}>
          EVIDENCE ATTACHED · CORR c8f1-77ab
        </MonoLabel>
      </div>
    </div>
  );
}

/* ── VerdictEvidence ─────────────────────────────────────────────────── */
export default function VerdictEvidence() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [50, -50]);

  return (
    <section ref={ref} className={styles.section} data-testid="verdict-section">
      <div className={styles.inner}>
        {/* LEFT — framed mock panel with scroll parallax */}
        <motion.div style={{ y }} className={styles.panelWrap}>
          <figure className={styles.panel}>
            <FrameChrome path="faro / verdict" />
            <div className={styles.mockBody}>
              <VerdictMock />
            </div>
          </figure>
        </motion.div>

        {/* RIGHT — checklist copy */}
        <div className={styles.copy}>
          <MonoLabel tone="accent">ONE VERDICT</MonoLabel>

          <Reveal>
            <h2 className={styles.h2}>
              One number.<br />All the evidence.
            </h2>
          </Reveal>

          <div className={styles.list}>
            {verdictChecklist.map((item, i) => (
              <Reveal key={item.t} delay={i * 0.08}>
                <div className={styles.listRow}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                  <div className={styles.listText}>
                    <div className={styles.listTitle}>{item.t}</div>
                    <p className={styles.listDesc}>{item.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
