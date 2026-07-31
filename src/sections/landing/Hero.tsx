import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import GridBackdrop from "@/components/graphics/GridBackdrop";
import IsometricCubes from "@/components/graphics/IsometricCubes";
import { staggerParent, fadeUp } from "@/lib/motion";
import styles from "./Hero.module.css";

type Stat = { value: string; unit?: string; label: string };

const STATS: Stat[] = [
  { value: "40–60", unit: "%", label: "Faster investigations" },
  { value: "95", unit: "%", label: "False positives suppressed" },
  { value: "<5", unit: "ms", label: "Per-event evaluation" },
  { value: "4", label: "Unified surveillance workflows" },
];

/**
 * Hero — two-column: messaging on the left, an infinite vertical wall of
 * real solution cards on the right. Static grid backdrop only (no animated
 * graph). Stats pinned to a full-width baseline.
 */
export default function Hero() {
  return (
    <section className={styles.hero}>
      <GridBackdrop className={styles.grid} />

      <div className={`container container--wide ${styles.top}`}>
        <motion.div
          className={styles.left}
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>AI-Native Risk &amp; Compliance Intelligence</Eyebrow>
          </motion.div>

          <motion.h1 className={styles.title} variants={fadeUp}>
            Turn alert overload into
            <br />
            <em>decisions you can defend.</em>
          </motion.h1>

          <motion.p className={styles.sub} variants={fadeUp}>
            SqAId unifies <b>AML, fraud, sanctions, and trade surveillance</b>{" "}
            into one AI-native platform — so compliance teams investigate the
            cases that matter, not the noise.
          </motion.p>

          <motion.div className={styles.actions} variants={fadeUp}>
            <Button to="/#contact" size="lg">
              Request a Demo →
            </Button>
            <Button to="/products/argus" variant="outline" size="lg">
              See the Platform
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <IsometricCubes />
        </motion.div>
      </div>

      <div className={`container container--wide ${styles.statsWrap}`}>
        <ul className={styles.stats}>
          {STATS.map((s) => (
            <li key={s.label} className={styles.stat}>
              <div className={styles.statVal}>
                {s.value}
                {s.unit && <span>{s.unit}</span>}
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
