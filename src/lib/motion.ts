/**
 * Shared Framer Motion presets — keep animation language consistent across
 * the site. Import variants/transitions instead of re-declaring per component.
 *
 * Signature easing mirrors --ease-out in tokens.css: cubic-bezier(.22,1,.36,1)
 */
import type { Transition, Variants } from "framer-motion";

type Bezier = [number, number, number, number];

export const EASE_OUT: Bezier = [0.22, 1, 0.36, 1];
export const EASE_SPRING: Bezier = [0.34, 1.56, 0.64, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.8,
};

/** Fade + rise — the default entrance for content blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Parent that staggers its children (pair with fadeUp on the children). */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Viewport config so reveals fire slightly before fully in view, once. */
export const inViewOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
