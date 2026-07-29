import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Marquee.module.css";

type MarqueeProps = {
  children: ReactNode;
  /** seconds for one full loop (higher = slower) */
  duration?: number;
  /** scroll direction */
  reverse?: boolean;
  className?: string;
};

/**
 * Marquee — seamless infinite horizontal scroll. Content is duplicated so the
 * loop has no visible seam. Pure CSS animation; pauses on hover and fully stops
 * under prefers-reduced-motion (handled in the stylesheet).
 */
export default function Marquee({
  children,
  duration = 28,
  reverse = false,
  className,
}: MarqueeProps) {
  return (
    <div className={cn(styles.marquee, className)} aria-hidden="true">
      <div
        className={cn(styles.track, reverse && styles.reverse)}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className={styles.group}>{children}</div>
        <div className={styles.group}>{children}</div>
      </div>
    </div>
  );
}
