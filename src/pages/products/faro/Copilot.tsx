/* ═══════════════════════════════════════════════════════════════════════
   FARO — Copilot section (section 06)

   Two-column layout split by a center stitch (scaleY 0→1 in-view):
   LEFT  = ANALYST VIEW  — ranked reasons + weight bars + action card.
   RIGHT = RAW EVIDENCE  — framed verdict.evidence.json chrome + K/V/W table.

   Token rules: CSS variables only — no hex. No shadows/gradients.
   Reduced motion: stitch visible at full scale, bars at full width, rows visible.
   ═══════════════════════════════════════════════════════════════════════ */
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT, inViewOnce } from "@/lib/motion";
import { MonoLabel } from "./primitives";
import { copilotReasons, copilotAction, copilotEvidence } from "./data";
import styles from "./Copilot.module.css";

export default function Copilot() {
  const rm = usePrefersReducedMotion();

  return (
    <section className={styles.section} data-testid="copilot-section">
      <div className={styles.container}>
        {/* ── Heading block ── */}
        <div className={styles.headBlock}>
          <MonoLabel tone="accent">AI COPILOT</MonoLabel>
          <Reveal>
            <h2 className={styles.heading}>&ldquo;Why did we hold this?&rdquo;</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lead}>
              Every verdict comes with two faces of the same truth — a plain-language
              rationale for the analyst, and the raw signals, weights and IDs beneath it.
            </p>
          </Reveal>
        </div>

        {/* ── Two-column body ── */}
        <div className={styles.columns}>
          {/* Center stitch */}
          <div className={styles.stitchTrack} aria-hidden="true">
            <motion.div
              className={styles.stitchLine}
              initial={{ scaleY: rm ? 1 : 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={inViewOnce}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            />
          </div>

          {/* ── LEFT — Analyst view ── */}
          <div className={styles.left}>
            <MonoLabel tone="muted">ANALYST VIEW</MonoLabel>

            <div className={styles.reasonsList}>
              {copilotReasons.map((r, i) => (
                <Reveal key={r.rank} delay={i * 0.08}>
                  <div className={styles.reasonRow}>
                    <span className={styles.rankNum}>{r.rank}</span>
                    <div className={styles.reasonBody}>
                      <p className={styles.reasonText}>{r.text}</p>
                      <div className={styles.weightRow}>
                        <div className={styles.barTrack}>
                          <motion.div
                            className={styles.barFill}
                            initial={{ width: rm ? `${r.weight * 100}%` : "0%" }}
                            whileInView={{ width: `${r.weight * 100}%` }}
                            viewport={inViewOnce}
                            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
                          />
                        </div>
                        <MonoLabel tone="accent" style={{ fontSize: "9px" }}>
                          W {r.weight.toFixed(2)}
                        </MonoLabel>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Recommended next action card */}
            <Reveal delay={0.2}>
              <div className={styles.actionCard}>
                <MonoLabel tone="accent">RECOMMENDED NEXT ACTION</MonoLabel>
                <p className={styles.actionText}>{copilotAction}</p>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT — Raw evidence ── */}
          <div className={styles.right}>
            <MonoLabel tone="muted">RAW EVIDENCE</MonoLabel>

            <Reveal delay={0.1}>
              <div className={styles.evidencePanel}>
                {/* Chrome bar */}
                <div className={styles.chrome}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <MonoLabel style={{ opacity: 0.4, marginLeft: "0.5rem", fontSize: "9px" }}>
                    verdict.evidence.json
                  </MonoLabel>
                </div>

                {/* Table */}
                <div className={styles.tableWrap}>
                  {/* Header row */}
                  <div className={styles.tableHeader}>
                    <MonoLabel style={{ opacity: 0.4, fontSize: "9px" }}>KEY</MonoLabel>
                    <MonoLabel style={{ opacity: 0.4, fontSize: "9px" }}>VALUE</MonoLabel>
                    <MonoLabel style={{ opacity: 0.4, fontSize: "9px" }}>W</MonoLabel>
                  </div>

                  {/* Data rows */}
                  {copilotEvidence.map((e, i) => (
                    <motion.div
                      key={e.k}
                      className={styles.tableRow}
                      data-last={i === copilotEvidence.length - 1 ? "true" : undefined}
                      initial={rm ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={inViewOnce}
                      transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.05 }}
                    >
                      <span className={styles.cellKey}>{e.k}</span>
                      <span className={styles.cellVal}>{e.v}</span>
                      <span
                        className={styles.cellW}
                        data-dim={e.w === "—" ? "true" : undefined}
                      >
                        {e.w}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
