/* ═══════════════════════════════════════════════════════════════════════
   LegacyScenario — "LEGACY VS SQAID · THE SCENARIO"
   Section 03 of the Case Manager bespoke page.

   Ported from sqaid-website-reference/frontend/src/components/casemanager/
   LegacyScenario.jsx (Tailwind + hex) → CSS Modules + token system.

   The two rails are intentionally FIXED dark/light regardless of site theme:
   LEGACY = always dark  (#0a0b0d bg, white text)
   SQAID  = always light (#ffffff bg, black text)
   Each rail is a self-contained fixed-mode scope declared in the CSS module.
   ═══════════════════════════════════════════════════════════════════════ */

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { MonoLabel, GhostNumeral, PlaybackControls } from "./primitives";
import {
  scenarioTask,
  legacyRail,
  sqaidRail,
  scenarioVerdict,
  procurementRows,
} from "./data";
import type { RailStep } from "./data";
import styles from "./LegacyScenario.module.css";

/* ── Rail sub-component ─────────────────────────────────────────────────── */

interface RailProps {
  title: string;
  steps: RailStep[];
  tick: number;
  railClass: string; /* styles.railLegacy | styles.railSqaid */
  fast: boolean;
}

function Rail({ title, steps, tick, railClass, fast }: RailProps) {
  return (
    <div className={`${styles.rail} ${railClass}`}>
      {/* rail header */}
      <div className={styles.railHeader}>
        <span className={styles.railBadge}>{title}</span>
        <span className={styles.railSpeed}>{fast ? "SECONDS" : "~2 WEEKS"}</span>
      </div>

      {/* steps */}
      <div className={styles.railSteps}>
        {steps.map((s, i) => {
          const done = tick > i;
          return (
            <motion.div
              key={i}
              className={`${styles.step} ${done ? styles.stepDone : styles.stepPending}`}
              initial={false}
              animate={{ opacity: done ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            >
              {/* check circle */}
              <span
                className={`${styles.checkCircle} ${done ? styles.checkCircleDone : ""}`}
              >
                {done && <Check size={9} color="#fff" strokeWidth={3} />}
              </span>

              {/* step label */}
              <span className={styles.stepLabel}>{s.step}</span>

              {/* timestamp */}
              <span className={styles.stepTime}>{s.t}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ── LegacyScenario (default export) ───────────────────────────────────── */

export default function LegacyScenario() {
  const rm = usePrefersReducedMotion();

  /* tick state — fully ticked when reduced motion is on */
  const [legacyTick, setLegacyTick] = useState(rm ? legacyRail.length : 0);
  const [sqaidTick, setSqaidTick] = useState(rm ? sqaidRail.length : 0);
  const [playing, setPlaying] = useState(!rm);

  /* scripted timer: SqAId advances every tick, legacy every other tick */
  useEffect(() => {
    if (rm || !playing) return;
    if (legacyTick >= legacyRail.length && sqaidTick >= sqaidRail.length) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => {
      setSqaidTick((s) => Math.min(sqaidRail.length, s + 1));
      setLegacyTick((l) =>
        sqaidTick % 2 === 0 ? Math.min(legacyRail.length, l + 1) : l
      );
    }, 620);
    return () => clearTimeout(t);
  }, [legacyTick, sqaidTick, playing, rm]);

  const replay = useCallback(() => {
    setLegacyTick(0);
    setSqaidTick(0);
    setPlaying(true);
  }, []);

  const stepFwd = useCallback(() => {
    setPlaying(false);
    setSqaidTick((s) => Math.min(sqaidRail.length, s + 1));
    setLegacyTick((l) => Math.min(legacyRail.length, l + 1));
  }, []);

  const bothDone =
    legacyTick >= legacyRail.length && sqaidTick >= sqaidRail.length;

  return (
    <div className={styles.section}>
      {/* ── heading block ──────────────────────────────────────────── */}
      <div className={styles.headingBlock}>
        <GhostNumeral n="03" className={styles.ghost} />
        <MonoLabel tone="accent">LEGACY VS SQAID · THE SCENARIO</MonoLabel>
        <Reveal>
          <h2 className={styles.h2}>
            Same task. Two very different afternoons.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className={styles.taskPill}>
            <span className={styles.taskDot} />
            <span className={styles.taskText}>{scenarioTask}</span>
          </div>
        </Reveal>
      </div>

      {/* ── rails frame ────────────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <div className={styles.frame}>
          {/* two rails side by side */}
          <div className={styles.railGrid}>
            <Rail
              title="LEGACY"
              steps={legacyRail}
              tick={legacyTick}
              railClass={styles.railLegacy}
              fast={false}
            />
            <Rail
              title="SQAID"
              steps={sqaidRail}
              tick={sqaidTick}
              railClass={styles.railSqaid}
              fast
            />
          </div>

          {/* verdict strip */}
          <div className={styles.verdictStrip}>
            <div className={`${styles.verdictHalf} ${styles.verdictDark}`}>
              <span className={styles.verdictLabel}>TIME TO LIVE</span>
              <span className={styles.verdictValue}>{scenarioVerdict[0]}</span>
            </div>
            <div className={`${styles.verdictHalf} ${styles.verdictLight}`}>
              <span className={styles.verdictLabel}>TIME TO LIVE</span>
              <span className={`${styles.verdictValue} ${styles.verdictAccent}`}>
                {scenarioVerdict[1]}
              </span>
            </div>
          </div>
        </div>

        {/* playback controls */}
        <PlaybackControls
          onReplay={replay}
          onStep={stepFwd}
          step={bothDone ? 1 : 0}
          total={2}
          playing={playing}
        />
      </Reveal>

      {/* ── procurement table ──────────────────────────────────────── */}
      <Reveal delay={0.15}>
        <div className={styles.procurementWrap}>
          <MonoLabel className={styles.procurementEyebrow}>
            FOR PROCUREMENT · THE SHORT VERSION
          </MonoLabel>

          <div className={styles.table}>
            {/* header row */}
            <div className={`${styles.tableRow} ${styles.tableHead}`}>
              <div className={styles.cellTask}>TASK</div>
              <div className={`${styles.cellLegacy} ${styles.cellBorderL}`}>LEGACY</div>
              <div className={`${styles.cellSqaid} ${styles.cellBorderL} ${styles.cellAccent}`}>
                SQAID
              </div>
            </div>

            {/* data rows */}
            {procurementRows.map((r, i) => (
              <div
                key={i}
                className={`${styles.tableRow} ${styles.tableData} ${
                  i < procurementRows.length - 1 ? styles.rowBorder : ""
                }`}
              >
                <div className={`${styles.cellTask} ${styles.cellTaskData}`}>
                  {r.k}
                </div>
                <div className={`${styles.cellLegacy} ${styles.cellBorderL} ${styles.cellLegacyData}`}>
                  {r.legacy}
                </div>
                <div className={`${styles.cellSqaid} ${styles.cellBorderL} ${styles.cellAccent}`}>
                  {r.sqaid}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
