import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, inViewOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** stagger delay in seconds */
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "article";
};

/**
 * Reveal — scroll-triggered fade-up entrance. The default wrapper for any
 * block that should animate in as it enters the viewport (fires once).
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
