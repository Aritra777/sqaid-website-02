import { useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useDocumentTitle } from "@/lib/use-document-title";
import s from "./Experience.module.css";
export default function Careers() {
  const { id } = useParams();
  useDocumentTitle(
    "Careers · Work with SqAId",
    "Explore opportunities to work on enterprise data and connected risk intelligence.",
  );
  return (
    <div className={`theme-brain ${s.page}`}>
      <section className={s.hero}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Careers</span>
          <h1 className={s.title}>
            Work on questions
            <br />
            that matter.
          </h1>
          <p className={s.lead}>
            Interested in enterprise data, financial-crime workflows or agentic
            intelligence? Tell us about the work you want to do.
          </p>
          {id && (
            <p className={s.notice}>
              This previously listed role has not been confirmed as a current
              opening. Contact the team for current availability.
            </p>
          )}
          <div className={s.actions}>
            <Button
              href={`mailto:info@sqaid.ai?subject=${encodeURIComponent(id ? `Career inquiry — ${id}` : "Careers at SqAId")}`}
              size="lg"
            >
              Email the team
              <ArrowUpRight size={15} />
            </Button>
          </div>
          <p className={s.intro}>
            Send your introduction and résumé through your email app. This
            website does not collect or store job applications.
          </p>
        </div>
      </section>
    </div>
  );
}
