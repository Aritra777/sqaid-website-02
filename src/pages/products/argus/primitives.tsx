/* ═══════════════════════════════════════════════════════════════════════
   ARGUS — shared bespoke primitives for the product page sections.

   These mirror the reference build's small helpers (MonoLabel / GhostNumeral /
   MaskLines / frame chrome) but are re-expressed on our token system: color
   comes from `var(--accent)` / `var(--text*)` / `var(--line*)`, never hex.
   No shadows, no gradients — see .claude/design.md.
   ═══════════════════════════════════════════════════════════════════════ */
import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import styles from "./primitives.module.css";

/* ── MonoLabel ── small uppercase JetBrains-Mono label (eyebrows, tags, meta).
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
export function GhostNumeral({
  n,
  className,
}: {
  n: string;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={cn(styles.ghost, className)}>
      {n}
    </span>
  );
}

/* ── MaskLines ── line-by-line masked headline reveal (each line rises from an
   overflow-hidden mask). Pass display lines as nodes; an accent word is just
   <em> inside a line. Degrades to a plain fade under reduced motion. */
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

/* ── FrameChrome ── the browser-chrome bar (three dots + mono path + optional
   live badge) used atop screenshot/mock panels. */
export function FrameChrome({
  path,
  badge,
}: {
  path: string;
  badge?: string;
}) {
  return (
    <span className={styles.chrome}>
      <i />
      <i />
      <i />
      <em>{path}</em>
      {badge && <b>● {badge}</b>}
    </span>
  );
}
