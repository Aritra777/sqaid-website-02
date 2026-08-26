import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { getIcon } from "@/lib/icons";
import { SOLUTIONS } from "@/lib/nav-data";
import { cn } from "@/lib/cn";
import styles from "./DomainGrid.module.css";

/**
 * DomainGrid — the four risk domains, each linking to its own deep page.
 * Replaces the old 400vh scroll-driven "focus rail": same information,
 * one screen, no scroll-jacking, keyboard-reachable by default.
 */
export default function DomainGrid() {
  return (
    <section id="solutions" className={cn(styles.section, "band")}>
      <Container>
        <SectionHeading
          eyebrow="Solutions"
          title="Everything it touches"
          lede="Four risk domains on one connected core, so the patterns that cross between them stay visible."
        />

        <div className={styles.grid}>
          {SOLUTIONS.map((d, i) => (
            <Reveal
              key={d.slug}
              delay={i * 0.05}
              className={cn(styles.cardWrap, d.theme)}
            >
              <Link to={`/solutions/${d.slug}`} className={styles.card}>
                <h3 className={styles.name}>{d.name}</h3>
                <ul className={styles.items}>
                  {d.items.map((it) => {
                    const Icon = getIcon(it.icon);
                    return (
                      <li key={it.slug} className={styles.item}>
                        <Icon size={15} strokeWidth={1.9} className={styles.itemIcon} />
                        {it.label}
                      </li>
                    );
                  })}
                </ul>
                <span className={styles.cta}>
                  Explore {d.short} <ArrowRight size={15} strokeWidth={2.2} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
