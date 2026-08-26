import { useDocumentTitle } from "@/lib/use-document-title";
import { cn } from "@/lib/cn";
import { Band } from "./case-manager/primitives";
import Hero from "./case-manager/Hero";
import Schema from "./case-manager/Schema";
import DesignerDeepCut from "./case-manager/DesignerDeepCut";
import Workflow from "./case-manager/Workflow";
import RBAC from "./case-manager/RBAC";
import LegacyScenario from "./case-manager/LegacyScenario";
import AuditView from "./case-manager/AuditView";
import LineageStrip from "./case-manager/LineageStrip";
import Cta from "./case-manager/Cta";
import styles from "./CaseManagerPage.module.css";

export default function CaseManagerPage() {
  useDocumentTitle("Case Manager · Configurable compliance ops");

  return (
    <div className={cn("theme-case-manager", styles.page)}>
      {/* alternating dark / light bands — the whole rhythm flips with the theme */}
      <Band tone="dark"><Hero /></Band>
      <Band tone="light"><Schema /></Band>
      <Band tone="dark"><DesignerDeepCut /></Band>
      <Band tone="light"><Workflow /></Band>

      {/* solid-violet kinetic marquee divider (black on violet) */}
      <div className={styles.marqueeStrip}>
      </div>

      <Band tone="dark"><RBAC /></Band>
      <Band tone="light"><LegacyScenario /></Band>
      <Band tone="dark"><AuditView /></Band>
      <Band tone="light"><LineageStrip /></Band>
      <Cta />
    </div>
  );
}
