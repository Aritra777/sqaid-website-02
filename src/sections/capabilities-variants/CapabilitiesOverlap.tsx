import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { getIcon } from "@/lib/icons";
import { type SolutionDomain } from "@/lib/nav-data";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { FRAUD, AML, COMPLIANCE, AI } from "./shared";
import { cn } from "@/lib/cn";
import styles from "./CapabilitiesOverlap.module.css";

/**
 * Option A — big pinned heading behind, a panel of domain tiles scrolls up and
 * OVERLAYS it (page's overlap language), and the three tile columns drift at
 * different parallax speeds. Bento content, but framed to match the site.
 */
export default function CapabilitiesOverlap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [130, -130]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const par = wide && !reduced;

  return (
    <section className={styles.wrap}>
      <div className={styles.intro}>
        <Container size="wide" className={styles.introInner}>
          <Eyebrow>Platform Capabilities</Eyebrow>
          <h2 className={styles.bigTitle}>
            Everything it <em>touches.</em>
          </h2>
          <p className={styles.introLede}>
            One connected platform across fraud, AML, compliance, and AI.
          </p>
        </Container>
      </div>

      <div className={styles.panel} ref={ref}>
        <Container size="wide">
          <div className={styles.bento}>
            <Column y={par ? y1 : undefined}>
              <DomainTile domain={FRAUD} />
              <DomainTile domain={AI} />
            </Column>
            <Column y={par ? y2 : undefined}>
              <DomainTile domain={AML} />
            </Column>
            <Column y={par ? y3 : undefined}>
              <DomainTile domain={COMPLIANCE} />
              <UnifiedTile />
            </Column>
          </div>
        </Container>
      </div>
    </section>
  );
}

function Column({
  y,
  children,
}: {
  y?: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div className={styles.col} style={y ? { y } : undefined}>
      {children}
    </motion.div>
  );
}

function DomainTile({ domain }: { domain: SolutionDomain }) {
  return (
    <div className={styles.tile}>
      <div className={styles.tileHead}>
        <span className={styles.dot} style={{ background: domain.color }} />
        <span className={styles.tileName}>{domain.name}</span>
        <span className={styles.count}>
          {String(domain.items.length).padStart(2, "0")}
        </span>
      </div>
      <ul className={styles.items}>
        {domain.items.map((it) => {
          const Icon = getIcon(it.icon);
          return (
            <li key={it.slug}>
              <Link to={`/solutions/${it.slug}`} className={styles.item}>
                <span className={styles.itemIcon} style={{ color: domain.color }}>
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span className={styles.itemLabel}>{it.label}</span>
                <ArrowUpRight size={15} className={styles.itemArrow} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function UnifiedTile() {
  return (
    <div className={cn(styles.tile, styles.unified)}>
      <div className={styles.dotGrid} aria-hidden="true" />
      <h4 className={styles.unifiedTitle}>Unified by design</h4>
      <p className={styles.unifiedText}>
        Every product writes to the same graph and case record — one lineage
        from alert to filing.
      </p>
    </div>
  );
}
