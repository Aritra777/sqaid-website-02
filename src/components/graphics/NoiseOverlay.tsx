import styles from "./NoiseOverlay.module.css";
import { cn } from "@/lib/cn";

/**
 * NoiseOverlay — a faint film-grain layer that adds tactile texture and hides
 * gradient banding. Pure inline SVG turbulence, no image request.
 */
export default function NoiseOverlay({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn(styles.noise, className)} />;
}
