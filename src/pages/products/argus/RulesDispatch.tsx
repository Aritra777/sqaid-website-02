import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import NoiseOverlay from "@/components/graphics/NoiseOverlay";
import Reveal from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import { MonoLabel, GhostNumeral } from "./primitives";
import { dispatchChips } from "./data";
import styles from "./RulesDispatch.module.css";

const STEP_MS = 620;
const HOLD_MS = 900;

export default function RulesDispatch() {
  const reduced = usePrefersReducedMotion();
  // tick counts how many endpoints/chips are lit. Range 0..len (len = complete).
  const [tick, setTick] = useState(reduced ? dispatchChips.length : 0);
  // brief fade while we reset from complete → empty (smooths the reference pop).
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (reduced) {
      setTick(dispatchChips.length);
      return;
    }
    let stepTimer: ReturnType<typeof setTimeout>;
    let holdTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout>;

    const advance = (t: number) => {
      if (t < dispatchChips.length) {
        setTick(t);
        stepTimer = setTimeout(() => advance(t + 1), STEP_MS);
      } else {
        // fully lit — hold, then fade out and restart cleanly from 0.
        setTick(dispatchChips.length);
        holdTimer = setTimeout(() => {
          setResetting(true);
          fadeTimer = setTimeout(() => {
            setTick(0);
            setResetting(false);
            stepTimer = setTimeout(() => advance(1), STEP_MS);
          }, 260);
        }, HOLD_MS);
      }
    };

    advance(1);
    return () => {
      clearTimeout(stepTimer);
      clearTimeout(holdTimer);
      clearTimeout(fadeTimer);
    };
  }, [reduced]);

  return (
    <section className={styles.section}>
      <NoiseOverlay className={styles.noise} />
      <Container size="wide">
        <div className={styles.grid}>
          {/* ── Left: copy + stats ─────────────────────────────────── */}
          <div className={styles.copy}>
            <GhostNumeral n="01" className={styles.numeral} />
            <div className={styles.copyInner}>
              <MonoLabel tone="accent">DISPATCH</MonoLabel>
              <Reveal>
                <h2 className={styles.h2}>Rules dispatch the investigation.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className={styles.para}>
                  Fifty-plus detection rules evaluate every event in under five
                  milliseconds. A match doesn&rsquo;t just raise a flag — it
                  commissions a crew and hands them the case.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <div className={styles.statNumAccent}>&lt;5ms</div>
                    <MonoLabel className={styles.statLabel}>
                      EVAL LATENCY
                    </MonoLabel>
                  </div>
                  <div className={styles.statRule} />
                  <div className={styles.stat}>
                    <div className={styles.statNum}>50+</div>
                    <MonoLabel className={styles.statLabel}>
                      ACTIVE RULES
                    </MonoLabel>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── Right: dispatch viz panel ──────────────────────────── */}
          <Reveal delay={0.1}>
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <div className={styles.headLeft}>
                  <motion.span
                    className={styles.pulseDot}
                    animate={reduced ? {} : { opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  <MonoLabel>RULE · STRUCTURING_SUBTHRESHOLD</MonoLabel>
                </div>
                <MonoLabel tone="accent">MATCH &lt;5MS</MonoLabel>
              </div>

              <motion.div
                className={styles.vizWrap}
                animate={{ opacity: resetting ? 0.35 : 1 }}
                transition={{ duration: 0.26, ease: EASE_OUT }}
              >
                <svg
                  viewBox="0 0 300 120"
                  className={styles.svg}
                  aria-hidden="true"
                >
                  <circle cx="20" cy="60" r="6" className={styles.source} />
                  <circle cx="20" cy="60" r="6" className={styles.sourceRing}>
                    {!reduced && (
                      <animate
                        attributeName="r"
                        values="6;14"
                        dur="1.6s"
                        repeatCount="indefinite"
                      />
                    )}
                    {!reduced && (
                      <animate
                        attributeName="opacity"
                        values="0.7;0"
                        dur="1.6s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                  {dispatchChips.map((c, i) => {
                    const y = 12 + i * 24;
                    const active = tick > i;
                    return (
                      <g key={c}>
                        <motion.path
                          d={`M26 60 C 110 60, 140 ${y}, 220 ${y}`}
                          className={styles.path}
                          initial={false}
                          animate={{ opacity: active ? 0.7 : 0.12 }}
                          transition={{ duration: 0.4, ease: EASE_OUT }}
                        />
                        <circle
                          cx="220"
                          cy={y}
                          r="2.5"
                          className={active ? styles.endActive : styles.end}
                        />
                      </g>
                    );
                  })}
                </svg>

                <div className={styles.chips}>
                  {dispatchChips.map((c, i) => {
                    const active = tick > i;
                    return (
                      <span
                        key={c}
                        className={
                          active ? styles.chipActive : styles.chip
                        }
                      >
                        {c}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
