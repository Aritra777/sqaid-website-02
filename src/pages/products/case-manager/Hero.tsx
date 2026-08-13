/* ═══════════════════════════════════════════════════════════════════════
   CASE MANAGER — Hero section.

   Left: accent eyebrow + MaskLines headline + sub + two CTAs.
   Right: live DesignerCanvas inside BrowserChrome — DotGrid backdrop,
   left PALETTE rail (hover glass card), right CASE-VIEW 2-col grid where
   heroDrops snap in one-by-one, dashed DROP HERE placeholder while
   composing, final verdict ticker. PlaybackControls below.
   Below the grid: full-width mono strip (hairline top+bottom).

   All color from tokens; no hex, no shadows, no gradients.
   Motion degrades under prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/motion/Magnetic";
import { SITE } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { MonoLabel, MaskLines, DotGrid, BrowserChrome, PlaybackControls } from "./primitives";
import {
  heroPalette,
  heroDrops,
  heroVerdict,
  heroStrip,
  type PaletteItem,
  type HeroDrop,
} from "./data";
import styles from "./Hero.module.css";

/* Total steps: one per drop card + one for the verdict */
const MAX = heroDrops.length + 1; // 3 drops + verdict = 4

/* ──────────────────────────── Skeleton ─────────────────────────── */
function Skeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className={styles.skeletonWrap}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={styles.skeletonBar}
          style={{ width: `${88 - i * 16}%` }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────────── DropCard ────────────────────────── */
function DropCard({
  drop,
  palette,
}: {
  drop: HeroDrop;
  palette: PaletteItem[];
}) {
  const item = palette.find((p) => p.id === drop.id);
  const spansTwo = drop.w === 2;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className={styles.dropCard}
      style={{ gridColumn: spansTwo ? "span 2" : "span 1" }}
    >
      <div className={styles.dropCardHead}>
        <span className={styles.dropCardTitle}>{item?.label}</span>
        <span className={styles.dropCardDot} />
      </div>
      <Skeleton rows={spansTwo ? 2 : 3} />
    </motion.div>
  );
}

/* ─────────────────────── DesignerCanvas ────────────────────────── */
function DesignerCanvas() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(reduced ? MAX : 0);
  const [playing, setPlaying] = useState(!reduced);
  const [hoverId, setHoverId] = useState<string | null>(null);

  useEffect(() => {
    if (reduced || !playing) return;
    if (step >= MAX) {
      setPlaying(false);
      return;
    }
    const delay = step === 0 ? 800 : 720;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step, playing, reduced]);

  const replay = useCallback(() => {
    setStep(0);
    setPlaying(true);
    setHoverId(null);
  }, []);

  const stepFwd = useCallback(() => {
    setPlaying(false);
    setStep((s) => Math.min(MAX, s + 1));
  }, []);

  const activeDrops = heroDrops.filter((_, i) => step >= i + 1);
  const verdictOn = step >= MAX;
  const hoverItem = hoverId ? heroPalette.find((p) => p.id === hoverId) : null;

  return (
    <div className={styles.canvasWrap}>
      <BrowserChrome
        label="sqaid / case-designer"
        right={
          <MonoLabel tone="accent" style={{ fontSize: 9 }}>
            {verdictOn ? "SAVED" : "COMPOSING"}
          </MonoLabel>
        }
      >
        {/* inner stage */}
        <div className={styles.stage}>
          <DotGrid gap={5} r={0.35} opacity={0.14} />

          <div className={styles.stageInner}>
            {/* ── PALETTE rail (left) ── */}
            <div className={styles.paletteRail}>
              <MonoLabel tone="muted" className={styles.railLabel}>PALETTE</MonoLabel>
              {heroPalette.map((p) => (
                <motion.button
                  key={p.id}
                  type="button"
                  onMouseEnter={() => setHoverId(p.id)}
                  onMouseLeave={() => setHoverId(null)}
                  whileHover={reduced ? {} : { x: 3 }}
                  className={styles.paletteBtn}
                >
                  <span className={styles.paletteDot} />
                  <span className={styles.paletteBtnLabel}>{p.label}</span>
                </motion.button>
              ))}
            </div>

            {/* ── CASE-VIEW canvas (right) ── */}
            <div className={styles.caseView}>
              <div className={styles.caseViewHeader}>
                <MonoLabel tone="muted">CASE VIEW · AML</MonoLabel>
                <MonoLabel tone="muted" style={{ opacity: 0.55 }}>
                  {activeDrops.length}/3
                </MonoLabel>
              </div>

              {/* 2-col card grid */}
              <div className={styles.cardGrid}>
                <AnimatePresence>
                  {activeDrops.map((d) => (
                    <DropCard key={d.id} drop={d} palette={heroPalette} />
                  ))}
                </AnimatePresence>

                {/* trailing DROP HERE placeholder */}
                {!verdictOn && (
                  <div
                    className={styles.dropPlaceholder}
                    style={{
                      gridColumn:
                        activeDrops.length % 2 === 0 ? "span 2" : "span 1",
                    }}
                  >
                    <Plus size={12} className={styles.dropPlaceholderIcon} />
                    <span className={styles.dropPlaceholderLabel}>DROP HERE</span>
                  </div>
                )}
              </div>

              {/* verdict ticker */}
              <AnimatePresence>
                {verdictOn && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.verdictTicker}
                  >
                    <span className={styles.verdictDot} />
                    <span className={styles.verdictText}>{heroVerdict}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* hover metadata glass card */}
          <AnimatePresence>
            {hoverItem && (
              <motion.div
                key={hoverItem.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.hoverCard}
              >
                <MonoLabel tone="accent" style={{ fontSize: 9 }}>
                  {hoverItem.id}
                </MonoLabel>
                <div className={styles.hoverCardTitle}>{hoverItem.label}</div>
                <div className={styles.hoverCardMeta}>{hoverItem.meta}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BrowserChrome>

      <PlaybackControls
        onReplay={replay}
        onStep={stepFwd}
        step={step}
        total={MAX + 1}
        playing={playing}
      />
    </div>
  );
}

/* ──────────────────────────── Hero ─────────────────────────────── */
export default function Hero() {
  const demoHref = `mailto:${SITE.email}?subject=Case%20Manager%20demo%20request`;

  return (
    <div className={styles.section} data-testid="hero-section">
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
              <MonoLabel tone="accent">
                CASE MANAGER · CONFIGURABLE COMPLIANCE OPS
              </MonoLabel>
            </motion.div>

            <h1 className={styles.h1}>
              <MaskLines
                delay={0.35}
                lines={[
                  "The case-management",
                  "platform that",
                  <><em>bends to your&nbsp;workflow</em>.</>,
                ]}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.8 }}
              className={styles.sub}
            >
              Legacy means editing XML and redeploying for every new alert
              type. SqAId means you configure it once — fields, view, workflow,
              permissions — and it&apos;s live in minutes.
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
                <Button variant="outline" size="lg" className={styles.tryBtn}>
                  <Play size={12} /> TRY IN THE PRODUCT
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* ── right: designer canvas ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: EASE_OUT }}
            className={styles.right}
          >
            <DesignerCanvas />
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
    </div>
  );
}
