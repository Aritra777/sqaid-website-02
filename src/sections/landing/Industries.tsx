import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { INDUSTRIES } from "@/lib/nav-data";
import styles from "./Industries.module.css";

export default function Industries() {
  return (
    <section className={styles.section}>
      <Container size="wide">
        <Reveal className={styles.head}>
          <span className={styles.kicker}>Industries</span>
          <h2>Built for the teams that move money.</h2>
        </Reveal>
        <div className={styles.grid}>
          {INDUSTRIES.map(ind => (
            <Reveal key={ind.slug} className={styles.card}>
              <h3>{ind.label}</h3>
              <p>{ind.blurb}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
