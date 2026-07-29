import styles from "./GridBackdrop.module.css";
import { cn } from "@/lib/cn";

type GridBackdropProps = {
  className?: string;
  /** fade the grid toward the edges with a radial mask */
  fade?: boolean;
};

/**
 * GridBackdrop — a subtle accent-tinted technical grid. Pure CSS, cheap,
 * decorative. Drop into a positioned/relative section as the first child.
 */
export default function GridBackdrop({ className, fade = true }: GridBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(styles.grid, fade && styles.fade, className)}
    />
  );
}
