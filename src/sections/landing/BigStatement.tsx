import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Marquee from "@/components/motion/Marquee";
import { fadeUp, inViewOnce, staggerParent } from "@/lib/motion";
import styles from "./BigStatement.module.css";

const KEYWORDS = [
  "AML",
  "FRAUD",
  "SANCTIONS",
  "TRADE SURVEILLANCE",
  "KYC / KYB",
  "CASE MANAGEMENT",
  "SAR FILING",
];

/**
 * BigStatement — the oversized, bold typographic moment. A full-bleed marquee
 * of outlined keywords frames a huge headline. This is the site's "loud" beat.
 */
export default function BigStatement() {
  return (
    <section className={styles.section}>
      <Container size="wide">
        <motion.div
          className={styles.inner}
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          <motion.h2 className={styles.headline} variants={fadeUp}>
            Investigate what <em>matters.</em>
            <br />
            Automate the <em>rest.</em>
          </motion.h2>
          <motion.p className={styles.note} variants={fadeUp}>
            One AI-native platform across the entire financial-crime lifecycle —
            detection, investigation, and reporting — so your analysts spend their
            time on real risk, not queue triage.
          </motion.p>
        </motion.div>
      </Container>

      <Marquee className={styles.marquee} duration={34} reverse>
        {KEYWORDS.map((k) => (
          <span key={k} className={styles.marqueeItem}>
            {k}
            <span className={styles.sep}>✳</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
