import { Link } from "react-router-dom";
import { CTA } from "@/components/experience/Shared";
import { useDocumentTitle } from "@/lib/use-document-title";
import s from "./Experience.module.css";
export default function LegacyCase() {
  useDocumentTitle(
    "CAIS · Case management",
    "Discuss case-management workflows and current availability with SqAId.",
  );
  return (
    <div className={`theme-case-manager ${s.page}`}>
      <section className={s.hero}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>CAIS / Case management</span>
          <h1 className={s.title}>
            Bring the review
            <br />
            into focus.
          </h1>
          <p className={s.lead}>
            Explore your needs for case intake, evidence review, assignment and
            disposition with the SqAId team. Contact us to discuss current
            case-management scope and availability.
          </p>
          <div className={s.actions}>
            <Link to="/products/brain" className={s.textLink}>
              Explore connected investigation with Brain →
            </Link>
          </div>
        </div>
      </section>
      <CTA name="CAIS" interest="CAIS" title="Discuss your case workflow." />
    </div>
  );
}
