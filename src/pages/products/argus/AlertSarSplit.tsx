import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { MonoLabel } from "./primitives";
import { rawAlert, sarNarrative } from "./data";
import styles from "./AlertSarSplit.module.css";

/**
 * AlertSarSplit — full-bleed ALERT → SAR split.
 * Top half = current mode (raw alert JSON in a chrome panel).
 * Bottom half = inverse mode (`.invert`) with the synthesized SAR narrative.
 * A vertical accent "stitch" line spans both halves and grows on scroll.
 */
export default function AlertSarSplit() {
  const rm = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const stitch = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className={styles.section}>
      {/* stitch line */}
      <div className={styles.stitchTrack} aria-hidden="true">
        <motion.div
          className={styles.stitchLine}
          style={{ scaleY: rm ? 1 : stitch }}
        />
      </div>

      {/* TOP — raw alert (current mode) */}
      <div className={styles.half}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <MonoLabel tone="accent">01 · RAW ALERT</MonoLabel>
            <h2 className={styles.heading}>What the machine sees.</h2>
            <p className={styles.para}>
              Correlation IDs, timestamps, sub-threshold bands. Signal, but not a
              story — and nothing an examiner would accept on its own.
            </p>
          </div>
          <Reveal>
            <div className={styles.panel}>
              <div className={styles.chrome}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <MonoLabel style={{ opacity: 0.4, marginLeft: 8 }}>
                  ALERT-4471.json
                </MonoLabel>
              </div>
              <pre className={styles.code}>{rawAlert}</pre>
            </div>
          </Reveal>
        </div>
      </div>

      {/* BOTTOM — SAR narrative (opposite mode) */}
      <div className={`invert ${styles.half}`}>
        <div className={styles.inner}>
          <Reveal className={`${styles.copy} ${styles.copyBottom}`}>
            <MonoLabel tone="accent">02 · SYNTHESIZED</MonoLabel>
            <h2 className={styles.heading}>What the Narrator writes.</h2>
            <p className={styles.para}>
              The same alert, reasoned across four hops and compressed into a
              filing-ready account a regulator can read top to bottom.
            </p>
          </Reveal>
          <Reveal className={styles.articleWrap}>
            <article className={styles.article}>
              <div className={styles.articleHead}>
                <span className={styles.articleTitle}>{sarNarrative.title}</span>
                <MonoLabel style={{ opacity: 0.45 }}>{sarNarrative.meta}</MonoLabel>
              </div>
              <div className={styles.articleBody}>{sarNarrative.body}</div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
