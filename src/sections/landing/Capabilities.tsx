import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getIcon } from "@/lib/icons";
import { SOLUTIONS, ALL_SOLUTIONS, type SolutionDomain } from "@/lib/nav-data";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";
import styles from "./Capabilities.module.css";

const [FRAUD, AML, COMPLIANCE, AI] = SOLUTIONS;

/**
 * Capabilities — an asymmetric bento of capability tiles. Columns drift at
 * slightly different speeds on scroll (subtle parallax) for depth without
 * gimmick. Geometry (dot grid, corner arcs) + glass surfaces; no gradients.
 */
export default function Capabilities() {
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
  // per-column parallax offsets (different magnitudes → drift)
  const y1 = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const y2 = useTransform(scrollYProgress, [0, 1], [96, -96]);
  const y3 = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const par = wide && !reduced;

  return (
    <section id="capabilities" className="section" ref={ref}>
      <Container size="wide">
        <SectionHeading
          eyebrow="Platform Capabilities"
          title={
            <>
              Everything financial crime <em>touches.</em>
            </>
          }
          lede="Fraud, AML, compliance operations, and AI — one connected platform, one shared graph, one audit trail."
        />

        <div className={styles.bento}>
          <Column y={par ? y1 : undefined}>
            <LeadTile />
            <DomainTile domain={AI} />
          </Column>

          <Column y={par ? y2 : undefined}>
            <DomainTile domain={FRAUD} />
            <DomainTile domain={COMPLIANCE} />
          </Column>

          <Column y={par ? y3 : undefined}>
            <DomainTile domain={AML} />
            <UnifiedTile />
          </Column>
        </div>
      </Container>
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

function LeadTile() {
  return (
    <div className={cn(styles.tile, styles.lead)}>
      <svg className={styles.leadArcs} viewBox="0 0 200 200" aria-hidden="true">
        {[40, 80, 120, 160].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} />
        ))}
      </svg>
      <span className={styles.leadEyebrow}>The platform</span>
      <h3 className={styles.leadTitle}>
        One platform. Every financial-crime workflow.
      </h3>
      <div className={styles.leadStat}>
        <span className={styles.bigNum}>{ALL_SOLUTIONS.length}</span>
        <span className={styles.bigNumLabel}>
          capabilities across four domains — unified on a single data layer,
          graph, and audit trail.
        </span>
      </div>
      <Button to="/solutions/transaction-monitoring" variant="outline">
        Explore capabilities →
      </Button>
    </div>
  );
}

function UnifiedTile() {
  return (
    <div className={cn(styles.tile, styles.unified)}>
      <div className={styles.dotGrid} aria-hidden="true" />
      <h4 className={styles.unifiedTitle}>Unified by design</h4>
      <p className={styles.unifiedText}>
        Every product writes to the same graph and the same case record — so an
        alert, its investigation, and its filing share one lineage.
      </p>
    </div>
  );
}
