/* ═══════════════════════════════════════════════════════════════════════
   FARO — LineageStrip
   Horizontal chain of lineage steps: source-event → downstream. Each card
   fades/rises in-view staggered; accent connector lines scaleX 0→1.
   Mirrors argus/LineageStrip exactly, swapping data and copy.
   ═══════════════════════════════════════════════════════════════════════ */
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { EASE_OUT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { MonoLabel } from "./primitives";
import { lineage } from "./data";
import styles from "./LineageStrip.module.css";

export default function LineageStrip() {
  const rm = usePrefersReducedMotion();

  return (
    <section className={styles.section}>
      <Container size="wide">
        <div className={styles.head}>
          <MonoLabel tone="accent">LINEAGE · REGULATOR-LEGIBLE</MonoLabel>
          <Reveal>
            <h2 className={styles.title}>
              Every verdict, traceable to its source event.
            </h2>
          </Reveal>
        </div>

        <div className={styles.chain}>
          {lineage.map((step, i) => (
            <div key={step.tag} className={styles.node}>
              <motion.div
                className={styles.card}
                initial={rm ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.12 }}
              >
                <MonoLabel tone="accent" className={styles.tag}>
                  {step.tag}
                </MonoLabel>
                <span className={styles.val}>{step.val}</span>
              </motion.div>

              {i < lineage.length - 1 && (
                <div className={styles.connector} aria-hidden="true">
                  <motion.span
                    className={styles.line}
                    initial={{ scaleX: rm ? 1 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      ease: EASE_OUT,
                      delay: i * 0.12 + 0.3,
                    }}
                  />
                  <span className={styles.arrow}>▶</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
