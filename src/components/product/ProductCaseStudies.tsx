import { useState } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { CASE_STUDIES } from "@/lib/trust";
import { ChevronRight, ChevronDown } from "lucide-react";
import styles from "./ProductCaseStudies.module.css";

type ProductKey = "argus" | "cais" | "abacus";

const productNames: Record<ProductKey, string> = {
  argus: "ARGUS",
  cais: "CAIS",
  abacus: "ABACUS",
};

export default function ProductCaseStudies({ product }: { product: ProductKey }) {
  const studies = CASE_STUDIES.filter((s) => s.product === product);
  const [open, setOpen] = useState<number | null>(null);

  if (studies.length === 0) return null;

  return (
    <section className={styles.section}>
      <Container size="wide">
        <div className={styles.head}>
          <span>Case studies</span>
          <h2>{productNames[product]} in practice</h2>
          <p>Anonymised deployments with measurable outcomes. Metrics are sourced from real runs.</p>
        </div>

        <div className={styles.grid}>
          {studies.map((study, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={study.customer + i} delay={i * 0.05} className={styles.card}>
                <div className={styles.meta}>
                  <span className={styles.segment}>{study.segment}</span>
                  <span className={styles.customer}>{study.customer}</span>
                </div>
                <h3>{study.challenge}</h3>
                <p className={styles.outcome}>{study.outcome}</p>
                {study.metric && (
                  <div className={styles.metric}>
                    <strong>{study.metric}</strong>
                    <small>Source: {study.source}</small>
                  </div>
                )}
                <button
                  className={styles.link}
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? "Hide summary" : "Read summary"}
                  {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                {isOpen && (
                  <div className={styles.details}>
                    <p><strong>Challenge:</strong> {study.challenge}</p>
                    <p><strong>Outcome:</strong> {study.outcome}</p>
                    {study.metric && <p><strong>Measured:</strong> {study.metric} — {study.source}</p>}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
