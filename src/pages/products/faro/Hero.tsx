/* ═══════════════════════════════════════════════════════════════════════
   FARO — Hero section.

   Left: accent eyebrow + MaskLines headline + sub + two magnetic CTAs.
   Right: ConvergenceCanvas — fraud-lane chips (left edge), AML-lane chips
   (right edge), curved SVG connectors flowing to a center verdict card.
   Stepped auto-play: fraud lane → AML lane → verdict converges, with SMIL
   dots traveling along connectors, hover metadata, corner labels, REPLAY/STEP
   controls + progress pips.
   Below the grid: full-width mono strip of heroStrip items (hairline top+bottom).

   All color from tokens; no hex, no shadows, no gradients.
   Motion degrades under prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, SkipForward, RotateCcw } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/motion/Magnetic";
import NoiseOverlay from "@/components/graphics/NoiseOverlay";
import { SITE } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { MonoLabel, MaskLines } from "./primitives";
import { fraudSignals, amlSignals, verdict, heroStrip, type Signal } from "./data";
import styles from "./Hero.module.css";

const MAXSTEP = 3;

/* The three Y-positions (in viewBox %) where connectors originate */
const LY = [20, 50, 80];

/* ─────────────────────────── Chip ──────────────────────────── */
function Chip({
  sig,
  side,
  active,
  onHover,
}: {
  sig: Signal;
  side: "L" | "R";
  active: boolean;
  onHover: (s: Signal | null) => void;
}) {
  return (
    <motion.div
      onMouseEnter={() => onHover(sig)}
      onMouseLeave={() => onHover(null)}
      initial={false}
      animate={{
        opacity: active ? 1 : 0.32,
        x: active ? 0 : side === "L" ? -8 : 8,
        borderColor: active
          ? "var(--accent-border)"
          : "rgba(var(--gfg) / 0.16)",
      }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={styles.chip}
      data-active={active ? "" : undefined}
    >
      <div className={styles.chipHead}>
        <span className={styles.chipDot} data-active={active ? "" : undefined} />
        <MonoLabel
          tone={active ? "accent" : "muted"}
          style={{ fontSize: 9 }}
        >
          {sig.k}
        </MonoLabel>
      </div>
      <div className={styles.chipVal}>{sig.v}</div>
    </motion.div>
  );
}

/* ─────────────────────── ConvergenceCanvas ──────────────────── */
function ConvergenceCanvas() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(reduced ? MAXSTEP : 0);
  const [playing, setPlaying] = useState(!reduced);
  const [hover, setHover] = useState<Signal | null>(null);

  useEffect(() => {
    if (reduced || !playing) return;
    if (step >= MAXSTEP) {
      setPlaying(false);
      return;
    }
    const delay = step === 0 ? 700 : 850;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step, playing, reduced]);

  const replay = useCallback(() => {
    setStep(0);
    setPlaying(true);
    setHover(null);
  }, []);

  const stepFwd = useCallback(() => {
    setPlaying(false);
    setStep((s) => Math.min(MAXSTEP, s + 1));
  }, []);

  const leftOn = step >= 1;
  const rightOn = step >= 2;
  const verdictOn = step >= 3;

  /* SVG paths in "0 0 100 100" viewBox units */
  const leftPath = (y: number) => `M 30 ${y} C 40 ${y}, 40 50, 43.5 50`;
  const rightPath = (y: number) => `M 70 ${y} C 60 ${y}, 60 50, 56.5 50`;

  return (
    <div className={styles.canvasWrap}>
      <div className={styles.stage}>
        {/* ── dot-grid backdrop ── */}
        <svg
          className={styles.dots}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="faro-hero-dots"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="0.6" cy="0.6" r="0.25" className={styles.dot} />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#faro-hero-dots)" />
        </svg>

        {/* ── connector SVG ── */}
        <svg
          className={styles.connectors}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* defs: named paths so animateMotion can reference them */}
          <defs>
            {LY.map((y, i) => (
              <path key={`ldef${i}`} id={`faro-fl-l${i}`} d={leftPath(y)} fill="none" />
            ))}
            {LY.map((y, i) => (
              <path key={`rdef${i}`} id={`faro-fl-r${i}`} d={rightPath(y)} fill="none" />
            ))}
          </defs>

          {/* left connector paths */}
          {LY.map((y, i) => (
            <g key={`lg${i}`}>
              <motion.path
                d={leftPath(y)}
                fill="none"
                className={leftOn ? styles.connectorActive : styles.connector}
                strokeWidth={0.5}
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{
                  pathLength: leftOn ? 1 : 0.001,
                  opacity: leftOn ? 0.8 : 0.4,
                }}
                transition={{ duration: reduced ? 0.1 : 0.7, ease: EASE_OUT }}
              />
              {/* SMIL traveling dot — never touches SVG geometry via Framer */}
              {leftOn && !reduced && (
                <circle r="0.9" className={styles.travelDot}>
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    begin={`${i * 0.25}s`}
                  >
                    <mpath href={`#faro-fl-l${i}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          ))}

          {/* right connector paths */}
          {LY.map((y, i) => (
            <g key={`rg${i}`}>
              <motion.path
                d={rightPath(y)}
                fill="none"
                className={rightOn ? styles.connectorActive : styles.connector}
                strokeWidth={0.5}
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{
                  pathLength: rightOn ? 1 : 0.001,
                  opacity: rightOn ? 0.8 : 0.4,
                }}
                transition={{ duration: reduced ? 0.1 : 0.7, ease: EASE_OUT }}
              />
              {rightOn && !reduced && (
                <circle r="0.9" className={styles.travelDot}>
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    begin={`${i * 0.25}s`}
                  >
                    <mpath href={`#faro-fl-r${i}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          ))}
        </svg>

        {/* ── fraud (left) chips ── */}
        <div className={styles.laneLeft}>
          {fraudSignals.map((s) => (
            <Chip key={s.k} sig={s} side="L" active={leftOn} onHover={setHover} />
          ))}
        </div>

        {/* ── AML (right) chips ── */}
        <div className={styles.laneRight}>
          {amlSignals.map((s) => (
            <Chip key={s.k} sig={s} side="R" active={rightOn} onHover={setHover} />
          ))}
        </div>

        {/* ── center verdict card ── */}
        <div className={styles.verdictWrap}>
          <motion.div
            className={styles.verdictCard}
            initial={false}
            animate={{
              opacity: verdictOn ? 1 : 0.25,
              scale: verdictOn ? 1 : 0.9,
              borderColor: verdictOn
                ? "var(--accent-border)"
                : "rgba(var(--gfg) / 0.16)",
            }}
            transition={{ duration: reduced ? 0.1 : 0.6, ease: EASE_OUT }}
            data-testid="hero-verdict-card"
          >
            {/* pulse ring — DOM span, not SVG geometry, so Framer is safe */}
            {verdictOn && !reduced && (
              <motion.span
                className={styles.verdictRing}
                animate={{ opacity: [0.5, 0], scale: [1, 1.12] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            <MonoLabel tone="accent" style={{ fontSize: 9 }}>
              VERDICT
            </MonoLabel>

            <div className={styles.verdictScore}>
              <span className={styles.verdictNum}>{verdict.score}</span>
              <span className={styles.verdictPill}>{verdict.action}</span>
            </div>

            <div className={styles.verdictReasons}>
              {verdict.reasons.map((r, i) => (
                <div key={i} className={styles.reason}>
                  <MonoLabel tone="accent" style={{ fontSize: 9, marginTop: 1 }}>
                    {i + 1}
                  </MonoLabel>
                  <span className={styles.reasonText}>{r}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── corner labels ── */}
        <span className={styles.cornerLeft}>FRAUD LANE</span>
        <span className={styles.cornerRight}>AML LANE</span>
        <span className={styles.cornerBottom}>
          {verdictOn ? "CONVERGED · HOLD" : "CONVERGING…"}
        </span>

        {/* ── hover metadata ── */}
        <AnimatePresence>
          {hover && (
            <motion.div
              key={hover.k}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.hoverCard}
            >
              <MonoLabel tone="accent" style={{ fontSize: 9 }}>
                {hover.k} · {hover.meta.rail}
              </MonoLabel>
              <div className={styles.hoverDetail}>{hover.meta.detail}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── controls ── */}
      <div className={styles.controls}>
        <button
          type="button"
          data-testid="hero-replay"
          onClick={replay}
          className={styles.ctrlBtn}
        >
          <RotateCcw size={11} /> REPLAY
        </button>
        <button
          type="button"
          data-testid="hero-step"
          onClick={stepFwd}
          className={styles.ctrlBtn}
        >
          <SkipForward size={11} /> STEP
        </button>
        <span className={styles.spacer} />
        <div className={styles.pips}>
          {Array.from({ length: MAXSTEP + 1 }).map((_, i) => (
            <span key={i} className={i <= step ? styles.pipOn : styles.pip} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Hero ──────────────────────────── */
export default function Hero() {
  const demoHref = `mailto:${SITE.email}?subject=FARO%20demo%20request`;

  return (
    <section className={styles.section} data-testid="hero-section">
      <NoiseOverlay />
      <Container size="wide">
        <div className={styles.grid}>
          {/* ── left: pitch ── */}
          <div className={styles.left}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={styles.eyebrow}
            >
              <span className={styles.eyebrowDot} />
              <MonoLabel tone="accent">FARO · REAL-TIME FRAUD + AML</MonoLabel>
            </motion.div>

            <h1 className={styles.h1}>
              <MaskLines
                delay={0.35}
                lines={[
                  "Catch the fraud.",
                  <><em>Stop the laundering.</em></>,
                  "In real time.",
                ]}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.8 }}
              className={styles.sub}
            >
              Two streams — fraud and AML — score every transaction across
              every rail and converge on one verdict, with the evidence attached.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className={styles.actions}
            >
              <Magnetic>
                <Button href={demoHref} size="lg">
                  REQUEST A DEMO
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button variant="outline" size="lg" className={styles.watchBtn}>
                  <Play size={12} /> SEE IT RUN
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* ── right: convergence canvas ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: EASE_OUT }}
            className={styles.right}
          >
            <ConvergenceCanvas />
          </motion.div>
        </div>
      </Container>

      {/* ── full-width mono strip ── */}
      <div className={styles.stripBand}>
        <Container size="wide" className={styles.stripGrid}>
          {heroStrip.map((s, i) => (
            <div
              key={s}
              className={styles.stripItem}
              data-first={i % 4 === 0 ? "" : undefined}
            >
              <span className={styles.stripDot} />
              <MonoLabel className={styles.stripLabel}>{s}</MonoLabel>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
