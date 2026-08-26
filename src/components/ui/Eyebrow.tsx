import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Eyebrow.module.css";

/**
 * Eyebrow — the small uppercase label above a section heading.
 *
 * The label text sits in the neutral ramp; the product mark appears only as
 * the optional dot, which is non-text and so only needs 3:1. Accent-coloured
 * small text does not meet AA on either canvas.
 */
export default function Eyebrow({
  children,
  className,
  dot = false,
}: {
  children: ReactNode;
  className?: string;
  /** show the product-mark dot before the label */
  dot?: boolean;
}) {
  return (
    <span className={cn(styles.eyebrow, className)}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
