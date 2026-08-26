/* ═══════════════════════════════════════════════════════════════════════
   ARGUS — Hero.

   Left: accent-dot eyebrow + masked H1 + sub + two magnetic CTAs.
   Right: HeroGraph — an interactive SVG knowledge graph on a dot-grid backdrop
   that AUTO-PLAYS a stepped reveal (order 0..maxStep) then can be replayed or
   stepped, with hover metadata cards + a TRACING/RESOLVED corner label and
   progress pips. Below: a 4-up stats strip (hairline top/bottom).

   All color from tokens (var(--accent) / var(--text*) / var(--line*)); no hex,
   no shadows, no gradients. Motion degrades under prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, SkipForward, RotateCcw } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";
import { MonoLabel, MaskLines } from "./primitives";
import { heroGraph, heroStats, type HeroNode } from "./data";
import styles from "./Hero.module.css";

function nodeById(id: string): HeroNode | undefined {
  return heroGraph.nodes.find((n) => n.id === id);
}

function HeroGraph() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(reduced ? heroGraph.maxStep : 0);
  const [playing, setPlaying] = useState(!reduced);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    if (reduced || !playing) return;
    if (step >= heroGraph.maxStep) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 900 : 780);
    return () => clearTimeout(t);
  }, [step, playing, reduced]);

  const replay = useCallback(() => {
    setStep(0);
    setPlaying(true);
    setHover(null);
  }, []);
  const stepFwd = useCallback(() => {
    setPlaying(false);
    setStep((s) => Math.min(heroGraph.maxStep, s + 1));
  }, []);

  const hoverNode = hover ? nodeById(hover) : null;

  return (
    <div className={styles.graphWrap}>
      <div className={styles.stage}>
        {/* dot-grid backdrop */}
        <svg
          className={styles.dots}
          viewBox="0 0 120 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="argus-hero-dots"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.4" className={styles.dot} />
            </pattern>
          </defs>
          <rect width="120" height="100" fill="url(#argus-hero-dots)" />
        </svg>

        {/* graph */}
        <svg
          className={styles.svg}
          viewBox="0 0 120 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {heroGraph.edges.map((e, i) => {
            const a = nodeById(e.s);
            const b = nodeById(e.t);
            if (!a || !b) return null;
            const on = a.order <= step && b.order <= step;
            return (
              <motion.line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={e.p ? styles.edgePrimary : styles.edge}
                strokeWidth={e.p ? 0.5 : 0.35}
                initial={false}
                animate={{ opacity: on ? (e.p ? 0.9 : 0.34) : 0 }}
                transition={{ duration: reduced ? 0.1 : 0.6, ease: EASE_OUT }}
              />
            );
          })}
          {heroGraph.nodes.map((n) => {
            const on = n.order <= step;
            const isAlert = n.type === "ALERT";
            const isVerdict = n.type === "VERDICT";
            const primary =
              isAlert || isVerdict || n.id === "n4" || n.id === "n7";
            return (
              <motion.g
                key={n.id}
                initial={false}
                animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }}
                transition={{ duration: reduced ? 0.1 : 0.5, ease: EASE_OUT }}
                style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: "pointer" }}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
              >
                {isAlert && on && !reduced && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={3}
                    fill="none"
                    className={styles.pulse}
                    strokeWidth={0.4}
                  >
                    <animate
                      attributeName="r"
                      values="3;8"
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0"
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {isVerdict && on && (
                  <rect
                    x={n.x - 9}
                    y={n.y - 3.6}
                    width={18}
                    height={7.2}
                    rx={1.2}
                    className={styles.verdictChip}
                  />
                )}
                {!isVerdict && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={hover === n.id ? 3.1 : 2.4}
                    className={
                      isAlert
                        ? styles.nodeAlert
                        : primary
                          ? styles.nodePrimary
                          : styles.node
                    }
                    strokeWidth={0.5}
                  />
                )}
                <text
                  x={n.x}
                  y={isVerdict ? n.y + 0.9 : n.y - 4}
                  textAnchor="middle"
                  fontSize={isVerdict ? 2.5 : 2.7}
                  letterSpacing={isVerdict ? "0.02" : "0.05"}
                  className={isVerdict ? styles.verdictText : styles.nodeText}
                >
                  {isVerdict ? "SAR · 92" : n.label}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* hover metadata card */}
        <AnimatePresence>
          {hoverNode && (
            <motion.div
              key={hoverNode.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.card}
              style={{
                left: `min(${(hoverNode.x / 120) * 100}%, calc(100% - 160px))`,
                top: `calc(${(hoverNode.y / 100) * 100}% + 14px)`,
              }}
            >
              <MonoLabel tone="accent">{hoverNode.type}</MonoLabel>
              <div className={styles.cardTitle}>{hoverNode.label}</div>
              <div className={styles.cardRisk}>RISK {hoverNode.meta.risk}</div>
              <div className={styles.cardDetail}>{hoverNode.meta.detail}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* corner labels */}
        <span className={styles.cornerLeft}>GRAPH · LIVE</span>
        <span className={styles.cornerRight}>
          {step >= heroGraph.maxStep ? "RESOLVED" : `TRACING · HOP ${step}`}
        </span>
      </div>

      {/* controls */}
      <div className={styles.controls}>
        <button type="button" onClick={replay} className={styles.ctrlBtn}>
          <RotateCcw size={11} /> REPLAY
        </button>
        <button type="button" onClick={stepFwd} className={styles.ctrlBtn}>
          <SkipForward size={11} /> STEP
        </button>
        <span className={styles.spacer} />
        <div className={styles.pips}>
          {Array.from({ length: heroGraph.maxStep + 1 }).map((_, i) => (
            <span
              key={i}
              className={i <= step ? styles.pipOn : styles.pip}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const demoHref = `mailto:${SITE.email}?subject=Argus%20demo`;
  return (
    <section className={styles.section}>
      <Container size="wide">
        <div className={styles.grid}>
          {/* left */}
          <div className={styles.left}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={styles.eyebrow}
            >
              <span className={styles.eyebrowDot} />
              <MonoLabel tone="accent">ARGUS · FINANCIAL-CRIME INTELLIGENCE</MonoLabel>
            </motion.div>

            <h1 className={styles.h1}>
              <MaskLines
                delay={0.35}
                lines={[
                  "One product for",
                  <><em>fraud, AML, entities</em></>,
                  "and trade surveillance.",
                ]}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className={styles.sub}
            >
              ARGUS unifies real-time fraud detection, AML intelligence, entity
              resolution and trade supervision in one AI-native product—with
              robust, scalable investigation case management built in.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className={styles.actions}
            >
              
                <Button href={demoHref} size="lg">
                  REQUEST A DEMO
                </Button>
              
              
                <Button variant="outline" size="lg" className={styles.watchBtn}>
                  <Play size={12} /> WATCH A RUN
                </Button>
              
            </motion.div>
          </div>

          {/* right graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: EASE_OUT }}
            className={styles.right}
          >
            <HeroGraph />
          </motion.div>
        </div>
      </Container>

      {/* stats strip */}
      <div className={styles.statsBand}>
        <Container size="wide" className={styles.statsGrid}>
          {heroStats.map((s, i) => (
            <div
              key={i}
              className={styles.stat}
              data-first={i % 4 === 0 ? "" : undefined}
            >
              <span className={styles.statDot} />
              <MonoLabel className={styles.statLabel}>{s}</MonoLabel>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
