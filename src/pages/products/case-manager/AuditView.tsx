/* ═══════════════════════════════════════════════════════════════════════
   CASE MANAGER — AuditView section.
   "ONE VIEW · FULL AUDIT" — lifecycle mock (left, parallax) + immutable
   audit-trail feed (right, progressive reveal with looping animation).

   Token rules: accent / text / line / surface vars only. No hex, no
   shadows, no gradients. Reduced-motion: parallax off, full list shown,
   no loop/pulse.
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import Reveal from "@/components/motion/Reveal";
import { MonoLabel, DotGrid, BrowserChrome } from "./primitives";
import { lifecycleModules, auditRows } from "./data";
import styles from "./AuditView.module.css";

/* ── LifecycleMock ───────────────────────────────────────────────────── */
function LifecycleMock() {
  return (
    <BrowserChrome
      label="sqaid / case · AML-7731"
      right={
        <MonoLabel tone="accent" className={styles.inReview}>
          IN REVIEW
        </MonoLabel>
      }
    >
      <div className={styles.mockBody}>
        <DotGrid gap={6} r={0.3} opacity={0.1} />
        <div className={styles.mockContent}>
          {/* case header */}
          <div className={styles.caseHeader}>
            <div>
              <span className={styles.caseTitle}>Case · AML-7731</span>
              <MonoLabel className={styles.caseSubtitle}>
                STRUCTURING · SUBJECT ·8842
              </MonoLabel>
            </div>
            <span className={styles.assignPill}>ASSIGN</span>
          </div>

          {/* module grid */}
          <div className={styles.moduleGrid}>
            {lifecycleModules.map((m, i) => (
              <div key={m} className={styles.moduleCard}>
                <div className={styles.moduleHeader}>
                  <span
                    className={styles.moduleDot}
                    style={
                      i < 3
                        ? { background: "var(--accent)" }
                        : { background: "rgb(var(--fg-rgb) / 0.4)" }
                    }
                  />
                  <MonoLabel className={styles.moduleLabel}>{m}</MonoLabel>
                </div>
                <div className={styles.skeletonBars}>
                  {[80, 60, 40].map((w, j) => (
                    <div
                      key={j}
                      className={styles.skeletonBar}
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

/* ── AuditFeed ───────────────────────────────────────────────────────── */
function AuditFeed() {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(reduced ? auditRows.length : 3);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(
      () => setCount((c) => (c >= auditRows.length ? 3 : c + 1)),
      2600,
    );
    return () => clearInterval(t);
  }, [reduced]);

  const rows = auditRows.slice(0, count);

  return (
    <div className={styles.feed}>
      {/* header */}
      <div className={styles.feedHeader}>
        <MonoLabel tone="accent">AUDIT TRAIL · IMMUTABLE</MonoLabel>
        <div className={styles.liveChip}>
          <motion.span
            className={styles.liveDot}
            animate={reduced ? {} : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <MonoLabel className={styles.liveLabel}>LIVE</MonoLabel>
        </div>
      </div>

      {/* rows */}
      <div className={styles.feedRows}>
        <AnimatePresence initial={false}>
          {rows.map((r, i) => (
            <motion.div
              key={`${r.action}-${i}`}
              className={styles.auditRow}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className={styles.auditTop}>
                <span className={styles.auditActor}>{r.actor}</span>
                <span className={styles.auditTime}>{`t+${i}s`}</span>
              </div>
              <div className={styles.auditAction}>{r.action}</div>
              <div className={styles.auditDiff}>{r.diff}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── AuditView ───────────────────────────────────────────────────────── */
export default function AuditView() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40]);

  return (
    <div ref={ref} className={styles.section}>
      <div className={styles.inner}>
        {/* heading block */}
        <div className={styles.heading}>
          <MonoLabel tone="accent">ONE VIEW · FULL AUDIT</MonoLabel>
          <Reveal>
            <h2 className={styles.h2}>
              Everything in one view. Everything on the record.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lead}>
              Trades, positions, prior alerts, notes, evidence and export live
              on a single case surface — and every touch writes an immutable
              diff a regulator can replay.
            </p>
          </Reveal>
        </div>

        {/* two-column layout */}
        <div className={styles.cols}>
          {/* LEFT — lifecycle mock with parallax */}
          <Reveal>
            <motion.div className={styles.parallaxWrap} style={{ y }}>
              <LifecycleMock />
            </motion.div>
          </Reveal>

          {/* RIGHT — audit feed */}
          <Reveal delay={0.1}>
            <AuditFeed />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
