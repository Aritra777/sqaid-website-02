import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { ShieldCheck, Network, Workflow } from "lucide-react";
import styles from "./AbacusDifferentiation.module.css";

const items = [
  {
    icon: ShieldCheck,
    title: "ABACUS — Screen",
    subtitle: "Multi-gated screening",
    description: "Real-time entity and transaction screening with four deterministic gates + AI adjudication for edge cases. Explainable decisions, multilingual watchlists, and zero missed hits.",
    accent: "var(--yellow)",
  },
  {
    icon: Network,
    title: "ARGUS — Investigate",
    subtitle: "Unified intelligence",
    description: "Graph-based fraud, AML and trade surveillance. Funds tracing, entity resolution and agent-generated evidence trails turn alerts into investigations.",
    accent: "var(--green)",
  },
  {
    icon: Workflow,
    title: "CAIS — Manage",
    subtitle: "Configurable casework",
    description: "AI-native case management with configurable schemas, workflows and audit lineage. Investigators control disposition; agents accelerate the work.",
    accent: "var(--violet)",
  },
];

export default function AbacusDifferentiation() {
  return (
    <section className={styles.section}>
      <Container size="wide">
        <Reveal className={styles.head}>
          <span>Where Abacus fits</span>
          <h2>Screen first. Investigate second. Manage always.</h2>
          <p>Abacus decides whether a name or payment is a genuine match. Argus investigates the relationships behind the decision. CAIS manages the outcome.</p>
        </Reveal>
        <div className={styles.grid}>
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.05} className={styles.card}>
                <div className={styles.iconWrap} style={{ borderColor: item.accent }}>
                  <Icon size={20} />
                </div>
                <h3>{item.title}</h3>
                <div className={styles.subtitle} style={{ color: item.accent }}>{item.subtitle}</div>
                <p>{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
