import Marquee from "@/components/motion/Marquee";
import { useDocumentTitle } from "@/lib/use-document-title";
import { cn } from "@/lib/cn";
import Hero from "./argus/Hero";
import AlertSarSplit from "./argus/AlertSarSplit";
import RulesDispatch from "./argus/RulesDispatch";
import FleetComposer from "./argus/FleetComposer";
import FundsTrace from "./argus/FundsTrace";
import SurfacesGallery from "./argus/SurfacesGallery";
import LineageStrip from "./argus/LineageStrip";
import Cta from "./argus/Cta";
import { MonoLabel } from "./argus/primitives";
import styles from "./ArgusPage.module.css";

const MARQUEE_PHRASES = [
  "INVESTIGATE — NOT JUST ALERT",
  "ALERT TO DISPOSITION",
  "SAR-READY IN ONE RUN",
  "COMPOSE YOUR OWN FLEET",
];

export default function ArgusPage() {
  useDocumentTitle("Argus · Agentic AML investigation");

  return (
    <div className={cn("theme-argus", styles.page)}>
      <Hero />
      <AlertSarSplit />
      <RulesDispatch />
      <FleetComposer />
      <FundsTrace />

      <div className={styles.marqueeStrip}>
        <Marquee duration={38}>
          {MARQUEE_PHRASES.map((phrase) => (
            <span key={phrase} className={styles.marqueeItem}>
              <MonoLabel className={styles.marqueePhrase}>{phrase}</MonoLabel>
              <span className={styles.marqueeSep} aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      <SurfacesGallery />
      <LineageStrip />
      <Cta />
    </div>
  );
}
