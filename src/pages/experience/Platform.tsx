import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Architecture,
  CTA,
  ProductCards,
} from "@/components/experience/Shared";
import Button from "@/components/ui/Button";
import { useDocumentTitle } from "@/lib/use-document-title";
import s from "./Experience.module.css";
export default function Platform() {
  useDocumentTitle(
    "Platform · Connected by design",
    "Explore how Brain, ARGUS, ABACUS, KYC and UDM fit together across enterprise data and risk workflows.",
  );
  return (
    <div className={`theme-brain ${s.page}`}>
      <section className={s.hero}>
        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div>
            <span className={s.eyebrow}>The SqAId platform</span>
            <h1 className={s.title}>
              Built for the work.
              <br />
              Connected for
              <br />
              the insight.
            </h1>
            <p className={s.lead}>
              An enterprise data foundation. Specialist risk products. An
              intelligence experience that spans the picture.
            </p>
            <div className={s.actions}>
              <Button to="/contact">
                Explore your architecture
                <ArrowRight size={15} />
              </Button>
            </div>
          </div>
          <Architecture />
        </div>
      </section>
      <section className={`${s.section} ${s.band}`}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Clear roles. Shared context.</span>
          <h2 className={s.heading}>Each layer does its part.</h2>
          <div className={s.features}>
            {[
              {
                title: "The foundation",
                body: "UDM organizes enterprise data through a canonical model, source contracts and reconciliation. It is a standalone product and the foundation in the ARGUS proposition.",
              },
              {
                title: "The domain workflows",
                body: "ARGUS brings fraud, AML, trade surveillance and entity context together. ABACUS handles screening. KYC manages customer lifecycle workflows.",
              },
              {
                title: "The intelligence experience",
                body: "Brain connects source discovery, configured agents and evidence exploration. It can connect to supported sources directly as well as to UDM.",
              },
            ].map((v, i) => (
              <article className={s.feature} key={v.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={s.section}>
        <div className={`${s.wrap} ${s.split}`}>
          <div>
            <span className={s.eyebrow}>A worked example</span>
            <h2 className={s.heading}>The customer is the thread.</h2>
            <p className={s.intro}>
              KYC captures a business and its declared owners. Screening
              surfaces a possible match. Enterprise transaction data adds
              activity context. ARGUS identifies an event or pattern for review.
              A configured Brain workspace helps explore the available evidence.
            </p>
            <p className={s.intro}>
              This is the connected architecture. Actual source coverage and
              handoffs depend on the integrations configured for your
              environment.
            </p>
            <Link to="/solutions/customer-lifecycle" className={s.textLink}>
              Follow the customer story
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className={s.statement}>
            <p>
              One product can solve a focused problem. Connecting the products
              creates room for a broader question.
            </p>
            <small>START WITH THE WORKFLOW YOU NEED</small>
          </div>
        </div>
      </section>
      <section className={`${s.section} ${s.band}`}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Choose your starting point</span>
          <h2 className={s.heading}>A suite with distinct strengths.</h2>
          <ProductCards />
        </div>
      </section>
      <section className={s.section}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Adoption, with context</span>
          <h2 className={s.heading}>Start with your environment.</h2>
          <div className={s.features}>
            {[
              {
                title: "Map the use case.",
                body: "Identify the workflow, required sources, users and decisions the product needs to support.",
              },
              {
                title: "Establish the scope.",
                body: "Review connectors, data contracts, deployment constraints and capability readiness.",
              },
              {
                title: "Evaluate the evidence.",
                body: "Use representative scenarios to examine coverage, operational behavior and review workflows.",
              },
            ].map((v, i) => (
              <article className={s.feature} key={v.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA title="Start with the question you need to answer." />
    </div>
  );
}
