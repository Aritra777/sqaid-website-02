import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Travel distance in px across the element's scroll pass. Positive moves the
   * layer up (foreground feel); negative moves it down (background feel).
   */
  speed?: number;
};

/**
 * Parallax — translates its children on the Y axis as the element scrolls
 * through the viewport. Reads scroll via Framer's useScroll, which stays in
 * sync with Lenis. No-ops under prefers-reduced-motion.
 */
export default function Parallax({
  children,
  className,
  speed = 60,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
