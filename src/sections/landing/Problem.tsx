import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import styles from "./Problem.module.css";

const points = [
  {
    title: "Noise, not signal",
    body: "Detection systems tuned to catch everything flood analysts with false positives. Teams raise thresholds until coverage is set by headcount, not risk.",
  },
  {
    title: "Manual assembly",
    body: "Investigations require pulling statements, walking graphs, drafting narratives. Hours of manual work for every alert.",
  },
  {
    title: "Fragmented tools",
    body: "Fraud, AML, sanctions and cases live in silos. Patterns that cross boundaries are missed.",
  },
];

export default function Problem() {
  return (
    <section className={styles.section}>
      <Container size="wide">
        <Reveal className={styles.head}>
          <span className={styles.kicker}>The problem</span>
          <h2>Compliance teams are measured on cases closed, and spend their day on noise.</h2>
        </Reveal>
        <div className={styles.grid}>
          {points.map(p => (
            <Reveal key={p.title} className={styles.card}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
