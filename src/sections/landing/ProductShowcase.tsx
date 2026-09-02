import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Network, Workflow } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import styles from "./ProductShowcase.module.css";

const products = [
  { name: "ARGUS", label: "Financial-crime intelligence", copy: "Real-time fraud, AML, entity resolution and trade surveillance in one AI-native network intelligence layer. 12-hop graph exploration, agentic investigation and live risk scoring.", image: "/assets/products/argus.png", to: "/products/argus", icon: Network, tone: "violet" },
  { name: "CAIS", label: "Universal case manager", copy: "Universal AI-native case management for fraud, AML and compliance. Intake to disposition with AI narratives, SAR drafting and regulator-ready audit.", image: "/assets/products/case-manager.png", to: "/products/cais", icon: Workflow, tone: "mint" },
  { name: "ABACUS", label: "Multi-gated screening", copy: "Multi-gated entity and real-time transaction screening. Governed rules + embeddings + graph context with policy gates and zero-miss watchlist screening.", to: "/products/abacus", icon: BarChart3, tone: "amber" },
] as const;

export default function ProductShowcase() {
  return (
    <section id="platform" className={styles.section}>
      <Container size="wide">
        <Reveal className={styles.heading}>
          <span>Three independent AI products</span>
          <h2>Choose the intelligence<br />your operation needs.</h2>
          <p>ARGUS, CAIS, and ABACUS each operate independently, with a focused purpose, architecture, and workflow.</p>
        </Reveal>
        <div className={styles.productList}>
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.name} delay={i * .05}>
                <article className={`${styles.product} ${styles[p.tone]} ${i % 2 ? styles.reverse : ""}`}>
                  <div className={styles.copy}>
                    <div className={styles.number}>0{i + 1}</div>
                    <div className={styles.productLabel}><Icon size={17} /> {p.label}</div>
                    <h3>{p.name}</h3>
                    <p>{p.copy}</p>
                    <Link to={p.to}>Explore {p.name.toLowerCase()} <ArrowRight size={16} /></Link>
                  </div>
                  <div className={styles.visual}>
                    {"image" in p ? <img src={p.image} alt={`${p.name} product interface`} loading="lazy" /> : <div className={styles.abacusViz}><i /><i /><i /><i /><span>Multi-gated<br />screening</span></div>}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
