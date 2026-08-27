import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import styles from "./ProblemStack.module.css";

const items = [
  {
    title: "Detect the moment risk changes",
    desc: "Real-time signals surface the instant a relationship shifts.",
    img: "/assets/problem1.png",
  },
  {
    title: "Connect people, money and behavior",
    desc: "One graph links entities, accounts and transactions across domains.",
    img: "/assets/problem2.png",
  },
  {
    title: "Unify four risk domains",
    desc: "Fraud, AML, sanctions and trade surveillance in one platform.",
    img: "/assets/problem3.png",
  },
];

export default function ProblemStack() {
  return (
    <section className={styles.section}>
      <Container size="wide">
        <Reveal className={styles.head}>
          <span className={styles.kicker}>The problem ARGUS solves</span>
          <h2>Four risk domains. Too many disconnected tools.</h2>
          <p>Hover the stack to see how risk is detected, connected and unified.</p>
        </Reveal>
        <Reveal className={styles.stackWrap}>
          <div className={styles.stack}>
            {items.map((it, i) => (
              <div
                key={it.title}
                className={styles.card}
                style={{ zIndex: items.length - i, transform: `translateY(${i * 18}px) translateX(${i * 12}px)` }}
              >
                <div className={styles.image}>
                  <img src={it.img} alt={it.title} />
                  <div className={styles.overlay}>
                    <h3>{it.title}</h3>
                    <p>{it.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
