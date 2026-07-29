import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * SmoothScroll — wraps the app in a Lenis-driven smooth-scroll context.
 * This is the backbone that makes parallax / scroll-linked animation feel
 * premium. Automatically disabled when the user prefers reduced motion.
 *
 * Framer Motion's `useScroll` reads native scroll position, which Lenis keeps
 * in sync, so the two compose without extra wiring.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
