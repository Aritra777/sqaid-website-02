/* ═══════════════════════════════════════════════════════════════════════
   CASE MANAGER — shared bespoke primitives for the product page sections.

   Re-expressed on our token system (color from accent / text / line variables,
   never hex). The signature device is the alternating Band (tone dark|light):
   a "light"-tone band renders in the OPPOSITE mode via the global `.invert`
   utility, and the whole rhythm flips when the site theme flips.

   Bands also expose neutral channels `--fg-rgb` / `--bg-rgb` (SPACE-separated,
   so `rgb(var(--fg-rgb) / α)` is valid CSS — comma-separated silently falls
   back to black) that track the band's effective mode; child sections use them
   for arbitrary-alpha hairlines/dot-grids. No shadows, no gradients.
   ═══════════════════════════════════════════════════════════════════════ */
import { useId } from "react";
import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { RotateCcw, SkipForward, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import styles from "./primitives.module.css";

/* ── Band ── alternating tone section. tone="dark" matches the page mode;
   tone="light" flips to the opposite mode (via global `.invert`). */
export function Band({
  tone = "dark",
  className,
  children,
  id,
}: {
  tone?: "dark" | "light";
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(styles.band, tone === "light" && "invert", className)}
    >
      {children}
    </section>
  );
}

/* ── MonoLabel ── small uppercase JetBrains-Mono label.
   tone: "accent" → var(--accent); "muted" → --text-3; default → inherit. */
export function MonoLabel({
  children,
  className,
  tone = "default",
  style,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent" | "muted";
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        styles.mono,
        tone === "accent" && styles.monoAccent,
        tone === "muted" && styles.monoMuted,
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}

/* ── GhostNumeral ── oversized outlined section numeral (decorative). */
export function GhostNumeral({ n, className }: { n: string; className?: string }) {
  return (
    <span aria-hidden="true" className={cn(styles.ghost, className)}>
      {n}
    </span>
  );
}

/* ── MaskLines ── line-by-line masked headline reveal. Accent word = <em>. */
export function MaskLines({
  lines,
  className,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <span className={cn(styles.maskWrap, className)}>
      {lines.map((line, i) => (
        <span key={i} className={styles.maskLine}>
          <motion.span
            className={styles.maskInner}
            initial={reduced ? { opacity: 0 } : { y: "110%" }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            transition={{
              duration: reduced ? 0.2 : 1,
              ease: EASE_OUT,
              delay: reduced ? 0 : delay + i * 0.09,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Crosshair ── tiny centered plus mark. */
export function Crosshair({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={{ opacity: 0.5 }}>
      <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* ── DotGrid ── dense dot-grid backdrop (a Case Manager signature). Uses the
   band's `--fg-rgb` channel so it tracks the effective mode. */
export function DotGrid({
  gap = 6,
  r = 0.4,
  opacity = 0.12,
  className,
}: {
  gap?: number;
  r?: number;
  opacity?: number;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const pid = `dg-${uid}`;
  return (
    <svg className={cn(styles.dotGrid, className)} aria-hidden="true">
      <defs>
        <pattern id={pid} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={r + 0.6} cy={r + 0.6} r={r} fill={`rgb(var(--fg-rgb) / ${opacity})`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

/* ── BrowserChrome ── framed panel with a chrome bar (3 dots + label + right
   slot) atop children. */
export function BrowserChrome({
  label,
  right,
  children,
  className,
}: {
  label: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(styles.chromeFrame, className)}>
      <div className={styles.chromeBar}>
        <span className={styles.chromeDot} />
        <span className={styles.chromeDot} />
        <span className={styles.chromeDot} />
        <MonoLabel className={styles.chromeLabel}>{label}</MonoLabel>
        <div className={styles.spacer} />
        {right}
      </div>
      {children}
    </div>
  );
}

/* ── PlaybackControls ── shared scripted-playback controls (replay / step /
   reset) + progress pips. */
export function PlaybackControls({
  onReplay,
  onStep,
  onReset,
  step = 0,
  total = 1,
  playing = false,
}: {
  onReplay: () => void;
  onStep: () => void;
  onReset?: () => void;
  step?: number;
  total?: number;
  playing?: boolean;
}) {
  return (
    <div className={styles.pbRow}>
      <button type="button" onClick={onReplay} className={styles.pbBtn}>
        {playing ? <Play size={11} /> : <RotateCcw size={11} />} REPLAY
      </button>
      <button type="button" onClick={onStep} className={styles.pbBtn}>
        <SkipForward size={11} /> STEP
      </button>
      {onReset && (
        <button type="button" onClick={onReset} className={styles.pbBtn}>
          ⇤ RESET
        </button>
      )}
      <div className={styles.spacer} />
      <div className={styles.pips}>
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={i <= step ? styles.pipOn : styles.pip} />
        ))}
      </div>
    </div>
  );
}
