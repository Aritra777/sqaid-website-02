import Marquee from "@/components/motion/Marquee";
import { useDocumentTitle } from "@/lib/use-document-title";
import { cn } from "@/lib/cn";
import Hero from "./faro/Hero";
import ConvergenceDeepCut from "./faro/ConvergenceDeepCut";
import CrossRail from "./faro/CrossRail";
import PipelineRail from "./faro/PipelineRail";
import Copilot from "./faro/Copilot";
import VerdictEvidence from "./faro/VerdictEvidence";
import LineageStrip from "./faro/LineageStrip";
import DecisionTapeCTA from "./faro/DecisionTapeCTA";
import { MonoLabel } from "./faro/primitives";
import { marqueePhrases } from "./faro/data";
import styles from "./FaroPage.module.css";

export default function FaroPage() {
  useDocumentTitle("Faro · Real-time fraud + AML");

  return (
    <div className={cn("theme-faro", styles.page)}>
      <Hero />
      <ConvergenceDeepCut />
      <CrossRail />
      <PipelineRail />

      <div className={styles.marqueeStrip}>
        <Marquee duration={38}>
          {marqueePhrases.map((phrase) => (
            <span key={phrase} className={styles.marqueeItem}>
              <MonoLabel className={styles.marqueePhrase}>{phrase}</MonoLabel>
              <span className={styles.marqueeSep} aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      <Copilot />
      <VerdictEvidence />
      <LineageStrip />
      <DecisionTapeCTA />
    </div>
  );
}
