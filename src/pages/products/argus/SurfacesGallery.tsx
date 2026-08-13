/* ═══════════════════════════════════════════════════════════════════════
   ARGUS — SurfacesGallery.

   The WHOLE band renders in the OPPOSITE mode (className="invert" on the section
   → light band in dark mode & vice-versa, swapping with the theme). Inside we use
   the normal tokens (var(--bg)/var(--text)/var(--line*)/var(--accent)).

   Alternating left/right rows (odd rows flip order): copy on one side, a framed
   real product SCREENSHOT on the other. Each panel drifts with a subtle scroll
   parallax. No hex — accent is var(--accent).
   ═══════════════════════════════════════════════════════════════════════ */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import Reveal from "@/components/motion/Reveal";
import { MonoLabel } from "./primitives";
import { surfaces, type Surface } from "./data";
import styles from "./SurfacesGallery.module.css";

/* real product screenshots (in public/assets/products/argus/) per surface key */
const SHOTS: Record<string, string> = {
  ingestion: "/assets/products/argus/ingestion.png",
  signals: "/assets/products/argus/signals.png",
  agents: "/assets/products/argus/agents.png",
  flows: "/assets/products/argus/flows.png",
  graph: "/assets/products/argus/graph-explorer.png",
  mcp: "/assets/products/argus/mcp.png",
};

function SurfaceRow({ s, i }: { s: Surface; i: number }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40]);
  const flip = i % 2 === 1;

  return (
    <div ref={ref} className={styles.row}>
      <Reveal className={cn(styles.copy, flip && styles.orderLast)}>
        <div className={styles.copyHead}>
          <MonoLabel tone="accent" className={styles.tag}>{s.tag}</MonoLabel>
          <MonoLabel className={styles.index}>0{i + 1}</MonoLabel>
        </div>
        <h3 className={styles.title}>{s.title}</h3>
        <p className={styles.copyText}>{s.copy}</p>
      </Reveal>

      <motion.div style={{ y }} className={cn(styles.panelWrap, flip && styles.orderFirst)}>
        <figure className={styles.panel}>
          <div className={styles.chrome}>
            <span className={styles.chromeDot} />
            <span className={styles.chromeDot} />
            <span className={styles.chromeDot} />
            <MonoLabel className={styles.chromePath}>argus / {s.key}</MonoLabel>
          </div>
          <img
            className={styles.shot}
            src={SHOTS[s.key]}
            alt={`${s.tag} — ${s.title}`}
            loading="lazy"
          />
        </figure>
      </motion.div>
    </div>
  );
}

export default function SurfacesGallery() {
  return (
    <section className={cn("invert", styles.section)}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <MonoLabel tone="accent">PRODUCT SURFACES</MonoLabel>
          <h2 className={styles.h2}>Six surfaces. One investigation.</h2>
        </div>
        <div className={styles.list}>
          {surfaces.map((s, i) => (
            <div key={s.key} className={styles.rowShell}>
              <SurfaceRow s={s} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
