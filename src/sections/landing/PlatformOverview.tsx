import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { getIcon } from "@/lib/icons";
import { PRODUCTS } from "@/lib/nav-data";
import styles from "./PlatformOverview.module.css";

export default function PlatformOverview() {
  return (
    <section className={styles.section}>
      <Container size="wide">
        <Reveal className={styles.head}>
          <span className={styles.kicker}>Platform</span>
          <h2>One graph. Three products. No silos.</h2>
          <p>Fraud, AML, sanctions and cases share a single entity graph. Each product does one job well, and they work together.</p>
        </Reveal>
        <div className={styles.grid}>
          {PRODUCTS.map(p => {
            const Icon = getIcon(p.icon);
            return (
              <Reveal key={p.slug} className={styles.card} delay={0.05}>
                <div className={styles.iconWrap}>
                  <Icon size={20} />
                </div>
                <h3>{p.name}</h3>
                <p>{p.tagline}</p>
                <span className={styles.status}>{p.status === "live" ? "Available today" : "Soon"}</span>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
