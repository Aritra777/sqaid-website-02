import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Eyebrow.module.css";

/** Eyebrow — the small uppercase accent label above section headings. */
export default function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn(styles.eyebrow, className)}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </span>
  );
}
