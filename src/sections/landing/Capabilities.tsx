import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { getIcon } from "@/lib/icons";
import { SOLUTIONS } from "@/lib/nav-data";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { CAPABILITY_GRAPHICS } from "./CapabilityGraphics";
import { cn } from "@/lib/cn";
import styles from "./Capabilities.module.css";

const SHORT = ["Fraud", "AML", "Compliance", "AI"];
const N = SOLUTIONS.length;

/**
 * Capabilities — pinned "focus rail". A big heading pins behind; a panel
 * overlaps and stays pinned while scrolling advances the active domain. Left
 * content swaps; the right stage shows a bespoke line-art graphic per domain
 * that parallaxes. (Chosen "Option B".)
 */
export default function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });
  const artY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const domain = SOLUTIONS[active];
  const Graphic = CAPABILITY_GRAPHICS[active];

  return (
    <section id="capabilities" className={styles.wrap}>
      <div className={styles.intro}>
        <Container size="wide" className={styles.introInner}>
          <Eyebrow>Platform Capabilities</Eyebrow>
          <h2 className={styles.bigTitle}>
            Everything it <em>touches.</em>
          </h2>
          <p className={styles.introLede}>
            Four domains, one connected core. Keep scrolling.
          </p>
        </Container>
      </div>

      <div ref={ref} className={styles.track}>
        <div className={styles.sticky}>
          <Container size="wide" className={styles.inner}>
            {/* left: changing content */}
            <div className={styles.left}>
              <div className={styles.pips}>
                {SOLUTIONS.map((d, i) => (
                  <span
                    key={d.name}
                    className={cn(styles.pip, i === active && styles.pipOn)}
                    style={i === active ? { background: d.color } : undefined}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={domain.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className={styles.domainName} style={{ color: domain.color }}>
                    {domain.name}
                  </h3>
                  <ul className={styles.list}>
                    {domain.items.map((it) => {
                      const Icon = getIcon(it.icon);
                      return (
                        <li key={it.slug}>
                          <Link to={`/solutions/${it.slug}`} className={styles.item}>
                            <span
                              className={styles.itemIcon}
                              style={{ color: domain.color }}
                            >
                              <Icon size={17} strokeWidth={2} />
                            </span>
                            <span className={styles.itemBody}>
                              <span className={styles.itemLabel}>{it.label}</span>
                              <span className={styles.itemDesc}>
                                {it.description}
                              </span>
                            </span>
                            <ArrowUpRight size={16} className={styles.itemArrow} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* right: bespoke domain graphic (parallax) */}
            <div className={styles.stage}>
              <div className={styles.stageFrame} aria-hidden="true" />
              <motion.div
                className={styles.stageInner}
                style={reduced ? undefined : { y: artY }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    className={styles.art}
                    style={{ color: domain.color }}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Graphic className={styles.artSvg} />
                  </motion.span>
                </AnimatePresence>
                <span className={styles.caption}>
                  {String(active + 1).padStart(2, "0")}
                  <i> / {String(N).padStart(2, "0")}</i>
                  <b>{SHORT[active]}</b>
                </span>
              </motion.div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
