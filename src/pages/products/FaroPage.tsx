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
      </div>

      <Copilot />
      <VerdictEvidence />
      <LineageStrip />
      <DecisionTapeCTA />
    </div>
  );
}
