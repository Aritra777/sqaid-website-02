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
import ProductUseCases from "@/components/product/ProductUseCases";
import ProductCaseStudies from "@/components/product/ProductCaseStudies";
import styles from "./ArgusPage.module.css";


export default function ArgusPage() {
  useDocumentTitle("ARGUS · Unified financial-crime intelligence");

  return (
    <div className={cn("theme-argus", styles.page)}>
      <Hero />
      <AlertSarSplit />
      <RulesDispatch />
      <FleetComposer />
      <FundsTrace />
      <ProductUseCases product="argus" />
      <ProductCaseStudies product="argus" />

      <div className={styles.marqueeStrip}>
      </div>

      <SurfacesGallery />
      <LineageStrip />
      <Cta />
    </div>
  );
}
