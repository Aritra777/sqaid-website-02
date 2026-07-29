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
import { SHORT } from "./shared";
import { cn } from "@/lib/cn";
import styles from "./CapabilitiesFocus.module.css";

const N = SOLUTIONS.length;

/**
 * Option B — pinned "focus rail". Big heading pinned behind; a panel overlaps
 * it and stays pinned while scrolling advances the active domain. The left
 * content swaps; the right stage shows a huge domain numeral that parallaxes.
 */
export default function CapabilitiesFocus() {
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
  const numY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const domain = SOLUTIONS[active];

  return (
    <section className={styles.wrap}>
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

            {/* right: huge parallax numeral stage */}
            <div className={styles.stage}>
              <div className={styles.stageFrame} aria-hidden="true" />
              <motion.div
                className={styles.stageInner}
                style={reduced ? undefined : { y: numY }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    className={styles.stageNum}
                    style={{ color: domain.color }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.4 }}
                  >
                    {String(active + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className={styles.stageTotal}>
                  / {String(N).padStart(2, "0")}
                </span>
                <span className={styles.stageDomain}>{SHORT[domain.name]}</span>
              </motion.div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
