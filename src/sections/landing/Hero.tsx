import { ArrowDown, ArrowRight, Play, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

const sparks = Array.from({ length: 28 }, (_, i) => ({ left: `${(i * 37) % 97}%`, top: `${8 + ((i * 53) % 78)}%`, animationDelay: `${(i % 9) * -0.7}s`, transform: `rotate(${(i * 29) % 180}deg)` }));

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.sparks} aria-hidden="true">{sparks.map((spark, i) => <i key={i} style={spark} />)}</div>
      <Container size="wide">
        <motion.div className={styles.inner} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7 }}>
          <h1 className={styles.title}>Fraud. AML. Entities. Trade.<br /><em>Everything in one.</em></h1>
          <p className={styles.lede}>ARGUS unifies fraud, AML, entity resolution and trade surveillance in one AI-native network intelligence platform. Real-time detection, graph-powered investigations and explainable case management — without stitching tools together.</p>
          <div className={styles.actions}>
            <Button to="/#contact" size="lg">Request a demo <ArrowRight size={16} /></Button>
            <Button to="/products/argus" variant="outline" size="lg">Explore Argus</Button>
          </div>
          <div className={styles.proof}><ShieldCheck size={15} /> Built for governed, explainable financial-crime decisions with full audit trails</div>
          <motion.div className={styles.stage} initial={{ opacity: 0, y: 36, rotateX: 4 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: .35, duration: 1 }}>
            <div className={styles.stageBar}><div className={styles.dots}><i /><i /><i /></div><span>ARGUS / NETWORK INTELLIGENCE</span><div className={styles.live}><i /> LIVE</div></div>
            <div className={styles.screen}>
              <img src="/assets/products/argus.png" alt="Argus network intelligence graph explorer" />
              <div className={styles.scan} />
              <div className={styles.agentCard}><span><Sparkles size={13} /> GRAPH AI</span><strong>Fraud ring detected</strong><p>11 linked entities · 5 hops · risk 98</p></div>
              <button className={styles.play} type="button" aria-label="Preview the Argus investigation flow"><Play size={17} fill="currentColor" /></button>
            </div>
          </motion.div>
          <a className={styles.scroll} href="#platform">Meet the platform <ArrowDown size={14} /></a>
        </motion.div>
      </Container>
    </header>
  );
}
