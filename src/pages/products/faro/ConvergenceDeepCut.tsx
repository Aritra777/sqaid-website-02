/* ═══════════════════════════════════════════════════════════════════════
   FARO · CONVERGENCE DEEP-CUT — "One pipeline, two lenses."
   Two-column: left editorial (GhostNumeral + copy) / right diagram card
   (taxonomy columns + animated converge SVG paths + verdict card).

   Translated from the Tailwind reference build — token translation applied,
   no hex, no shadows, no gradients. Motion degrades under reduced-motion.
   ═══════════════════════════════════════════════════════════════════════ */
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import { MonoLabel, GhostNumeral } from "./primitives";
import { fraudTaxonomy, amlTaxonomy } from "./data";
import styles from "./ConvergenceDeepCut.module.css";

/* ── Taxonomy column (FRAUD SIGNALS / AML SIGNALS) ─────────────────── */
function TaxonomyColumn({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div className={styles.column}>
      <MonoLabel tone={accent ? "accent" : "muted"}>{title}</MonoLabel>
      <ul className={styles.items}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            <span
              className={styles.dot}
              data-accent={accent ? "true" : undefined}
            />
            <span className={styles.itemText}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main section ───────────────────────────────────────────────────── */
export default function ConvergenceDeepCut() {
  const reduced = usePrefersReducedMotion();

  /* Converge path animation: pathLength 0→1 in-view; reduced-motion shows
     final state (pathLength 1, no transition). */
  const pathInitial = reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 1 };
  const pathAnimate = { pathLength: 1, opacity: 1 };
  const pathTransition = {
    pathLength: { duration: 0.9, ease: EASE_OUT },
    opacity: { duration: 0 },
  };

  return (
    <section className={styles.section} data-testid="convergence-section">
      <div className={styles.inner}>
        {/* ── Left: editorial copy ──────────────────────────────────── */}
        <div className={styles.copy}>
          <GhostNumeral n="01" className={styles.numeral} />
          <div className={styles.copyInner}>
            <MonoLabel tone="accent">THE MODEL</MonoLabel>
            <Reveal>
              <h2 className={styles.h2}>
                One pipeline,
                <br />
                two lenses.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={styles.para}>
                Fraud and AML aren&rsquo;t separate products bolted together.
                Faro reads both taxonomies of signal off the same transaction
                and feeds one scoring function &mdash; so a card-fraud burst
                and a structuring pattern land in the same verdict, not two
                disconnected queues.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Right: diagram card ───────────────────────────────────── */}
        <Reveal delay={0.15}>
          <div className={styles.card}>
            {/* Taxonomy columns */}
            <div className={styles.columns}>
              <TaxonomyColumn
                title="FRAUD SIGNALS"
                items={fraudTaxonomy}
                accent
              />
              <TaxonomyColumn
                title="AML SIGNALS"
                items={amlTaxonomy}
                accent
              />
            </div>

            {/* Converge arrows */}
            <div className={styles.arrowsWrap} aria-hidden="true">
              <svg
                className={styles.arrowsSvg}
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
              >
                {/* Left arc — from quarter-left down to center */}
                <motion.path
                  d="M 25 0 C 25 20, 50 20, 50 38"
                  className={styles.convergePath}
                  fill="none"
                  strokeWidth="0.6"
                  vectorEffect="non-scaling-stroke"
                  initial={pathInitial}
                  whileInView={pathAnimate}
                  viewport={{ once: true }}
                  transition={reduced ? { duration: 0 } : pathTransition}
                />
                {/* Right arc — from quarter-right down to center */}
                <motion.path
                  d="M 75 0 C 75 20, 50 20, 50 38"
                  className={styles.convergePath}
                  fill="none"
                  strokeWidth="0.6"
                  vectorEffect="non-scaling-stroke"
                  initial={pathInitial}
                  whileInView={pathAnimate}
                  viewport={{ once: true }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { ...pathTransition, pathLength: { duration: 0.9, ease: EASE_OUT, delay: 0.15 } }
                  }
                />
              </svg>
            </div>

            {/* Verdict card */}
            <div className={styles.verdict}>
              <MonoLabel tone="accent">ONE SCORING FUNCTION</MonoLabel>
              <div className={styles.score}>0.98 · HOLD</div>
              <MonoLabel tone="muted" className={styles.verdictSub}>
                ONE VERDICT · EVIDENCE ATTACHED
              </MonoLabel>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
