import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Badge.module.css";

type BadgeProps = {
  children: ReactNode;
  tone?: "accent" | "neutral" | "soon";
  className?: string;
};

/** Badge — small status pill (e.g. "Live", "Coming soon", category tags). */
export default function Badge({ children, tone = "accent", className }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[tone], className)}>{children}</span>
  );
}
