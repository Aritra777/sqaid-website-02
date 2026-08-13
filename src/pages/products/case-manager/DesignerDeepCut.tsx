/* ═══════════════════════════════════════════════════════════════════════
   CASE MANAGER · DESIGNER DEEP-CUT — "the case-view builder"

   Two-column layout inside a Band tone="dark" wrapper (handled by the page):
     LEFT  — BrowserChrome with DotGrid backdrop, palette rail, 2-col card
             canvas that snaps components in one-by-one on a scripted timer,
             a dashed DROP HERE placeholder, and a final verdict ticker;
             PlaybackControls (replay / step / reset) below.
     RIGHT — AUDIT LOG panel that appends a mono line per placed step, ending
             with "✓ SAVED · IMMUTABLE DIFF SEALED".

   The animation loops subtly: pauses ~2.6 s on complete, then restarts.
   Under prefers-reduced-motion: all steps placed, no timer, no loop.

   Token translation (Tailwind reference → our system):
     VIOLET               → var(--accent)
     violet faint fill    → var(--accent-softer)   (≈5–6%)
     violet border        → var(--accent-border)
     white-on-violet      → var(--accent-contrast)
     rgb(fg-rgb / 0.02)   → var(--surface)
     rgb(fg-rgb / 0.12)   → var(--line)
     rgb(fg-rgb / 0.14)   → var(--line-2)
     rgb(fg-rgb / 0.16)   → kept as space-sep channel (skeleton bars)
     rgb(fg-rgb / 0.20)   → var(--line-strong)  (dashed placeholder)
     var(--fg)            → var(--text)
     JetBrains Mono       → var(--font-mono)
     .hair                → border var(--line)
     .noise               → omitted
     .font-display        → var(--font-display)
     .font-body           → var(--font-sans)
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";
import { designerSteps, designerFinalVerdict } from "./data";
import { MonoLabel, DotGrid, BrowserChrome, PlaybackControls } from "./primitives";
import styles from "./DesignerDeepCut.module.css";

const MAX = designerSteps.length;

/* ── Skeleton rows inside each placed card ──────────────────────────── */
function Skeleton({ rows = 2 }: { rows?: number }) {
  return (
    <div className={styles.skeleton}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={styles.skeletonBar}
          style={{ width: `${86 - i * 18}%` }}
        />
      ))}
    </div>
  );
}

/* ── Main section (default export) ──────────────────────────────────── */
export default function DesignerDeepCut() {
  const rm = usePrefersReducedMotion();

  /* Under reduced-motion: start at MAX (all placed), no looping. */
  const [step, setStep] = useState(rm ? MAX : 0);
  const [playing, setPlaying] = useState(!rm);

  /* Scripted timer — place one card every ~820 ms, subtle loop on complete. */
  useEffect(() => {
    if (rm || !playing) return;
    if (step >= MAX) {
      /* Pause on complete, then restart */
      const t = setTimeout(() => setStep(0), 2600);
      return () => clearTimeout(t);
    }
    /* First step gets a short 700 ms delay, subsequent steps 820 ms. */
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 700 : 820);
    return () => clearTimeout(t);
  }, [step, playing, rm]);

  const replay = useCallback(() => {
    setStep(0);
    setPlaying(true);
  }, []);

  const stepFwd = useCallback(() => {
    setPlaying(false);
    setStep((s) => Math.min(MAX, s + 1));
  }, []);

  const reset = useCallback(() => {
    setPlaying(false);
    setStep(0);
  }, []);

  const placed = designerSteps.slice(0, step);
  const done = step >= MAX;

  /* Whether the DROP HERE placeholder spans 2 cols or 1 */
  const dropSpan = placed.length % 2 === 0 ? 2 : 1;

  return (
    <div className={styles.section}>
      {/* ── Heading block ─────────────────────────────────────────── */}
      <div className={styles.heading}>
        <MonoLabel tone="accent">DESIGNER · THE CASE-VIEW BUILDER</MonoLabel>
        <Reveal>
          <h2 className={styles.h2}>
            Compose the case view. No code, no&nbsp;redeploy.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.lead}>
            Drag components onto the canvas, bind them to the case model, save.
            Every action is written to the audit log — the same log an examiner
            will read back later.
          </p>
        </Reveal>
      </div>

      {/* ── Two-column grid ───────────────────────────────────────── */}
      <div className={styles.grid}>

        {/* ── LEFT · big canvas ─────────────────────────────────── */}
        <Reveal>
          <BrowserChrome
            label="sqaid / case-designer · aml"
            right={
              <span className={styles.badgeText}>
                {done ? "SAVED · v4" : `COMPOSING ${step}/${MAX}`}
              </span>
            }
          >
            <div className={styles.canvasShell}>
              <DotGrid gap={5} r={0.35} opacity={0.13} />

              <div className={styles.canvasInner}>
                {/* Palette rail */}
                <div className={styles.paletteRail}>
                  <MonoLabel className={styles.paletteLegend}>PALETTE</MonoLabel>
                  {designerSteps.map((s, i) => (
                    <div
                      key={s.id}
                      className={styles.paletteItem}
                      style={{ opacity: i < step ? 0.35 : 1 }}
                    >
                      <span className={styles.paletteDot} />
                      <span className={styles.paletteLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Canvas area */}
                <div className={styles.cardArea}>
                  <div className={styles.cardGrid}>
                    <AnimatePresence>
                      {placed.map((s) => (
                        <motion.div
                          key={s.id}
                          layout
                          className={styles.placedCard}
                          data-span={s.w === 2 ? "2" : "1"}
                          initial={{ opacity: 0, y: 16, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.5, ease: EASE_OUT }}
                        >
                          <div className={styles.cardHeader}>
                            <span className={styles.cardTitle}>{s.label}</span>
                            <span className={styles.cardBind}>{s.bind}</span>
                          </div>
                          <Skeleton rows={s.w === 2 ? 2 : 3} />
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Dashed DROP HERE placeholder */}
                    {!done && (
                      <div
                        className={styles.dropHere}
                        data-span={String(dropSpan)}
                      >
                        <span className={styles.dropLabel}>DROP HERE</span>
                      </div>
                    )}
                  </div>

                  {/* Final verdict ticker */}
                  <AnimatePresence>
                    {done && (
                      <motion.div
                        className={styles.verdict}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                      >
                        <span className={styles.verdictDot} />
                        <span className={styles.verdictText}>
                          {designerFinalVerdict}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </BrowserChrome>

          <PlaybackControls
            onReplay={replay}
            onStep={stepFwd}
            onReset={reset}
            step={step}
            total={MAX + 1}
            playing={playing}
          />
        </Reveal>

        {/* ── RIGHT · audit log ─────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className={styles.logPanel}>
            {/* Log header */}
            <div className={styles.logHeader}>
              <MonoLabel tone="accent">AUDIT LOG · LIVE</MonoLabel>
              <MonoLabel tone="muted">{placed.length} EVENTS</MonoLabel>
            </div>

            {/* Log entries */}
            <div className={styles.logBody}>
              <AnimatePresence>
                {placed.map((s) => (
                  <motion.div
                    key={s.id}
                    className={styles.logEntry}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  >
                    <span className={styles.logAction}>+ COMPONENT</span>
                    <span className={styles.logName}>
                      {" · "}
                      {s.label.toUpperCase().replace(/ /g, "_")}
                    </span>
                    <br />
                    <span className={styles.logBound}>
                      &nbsp;&nbsp;&nbsp;BOUND TO {s.bind}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {done && (
                <motion.div
                  className={styles.logSaved}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  ✓ SAVED · IMMUTABLE DIFF SEALED
                </motion.div>
              )}
            </div>

            <MonoLabel tone="muted" className={styles.logFooter}>
              EVERY ACTION IS AUDITED
            </MonoLabel>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
