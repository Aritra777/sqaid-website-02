import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import styles from "./HowWeDeploy.module.css";

const steps = [
  { num: "01", title: "Scope", body: "Agree segment, rails and success metric before integration." },
  { num: "02", title: "Shadow", body: "Run against live traffic with zero customer impact." },
  { num: "03", title: "Compare", body: "Measure alert volume, false positives and investigation time." },
  { num: "04", title: "Migrate", body: "Move workloads on your schedule, old system stays until you’re ready." },
];

export default function HowWeDeploy() {
  return (
    <section className={styles.section}>
      <Container size="wide">
        <Reveal className={styles.head}>
          <span className={styles.kicker}>How we deploy</span>
          <h2>Nobody signs before they see the numbers.</h2>
        </Reveal>
        <div className={styles.grid}>
          {steps.map(s => (
            <Reveal key={s.num} className={styles.card}>
              <span className={styles.num}>{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
