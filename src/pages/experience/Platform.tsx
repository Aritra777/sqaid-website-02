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
    "ARGUS · Unified financial crime platform",
    "ARGUS is one unified platform for AML, fraud, trade surveillance and entity resolution, powered by the UDM enterprise warehouse. Built by SqAId for financial compliance.",
  );
  return (
    <div className={`theme-argus ${s.page}`}>
      <section className={s.hero}>
        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div>
            <span className={s.eyebrow}>
              ARGUS / Unified financial crime platform
            </span>
            <h1 className={s.title}>
              AML. Fraud. Trade.
              <br />
              Entity resolution.
              <br />
              One platform.
            </h1>
            <p className={s.lead}>
              ARGUS brings financial crime detection, surveillance and connected
              identities into a single platform, powered by UDM—the enterprise
              warehouse. SqAId helps financial institutions build a unified
              approach to financial compliance and the global fight against
              financial crime.
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
          <span className={s.eyebrow}>One ARGUS. Powered by UDM.</span>
          <h2 className={s.heading}>
            Unified at the platform. Connected through the warehouse.
          </h2>
          <div className={s.features}>
            {[
              {
                title: "UDM powers ARGUS",
                body: "UDM is the enterprise warehouse powering ARGUS. It supplies the shared model for parties, accounts, transactions and market activity, and is also available as a standalone data product.",
              },
              {
                title: "One platform, four capabilities",
                body: "AML, fraud, trade surveillance and entity resolution are capabilities within ARGUS. Teams can investigate different types of financial crime using shared data and connected identity context.",
              },
              {
                title: "Brain spans the compliance suite",
                body: "Brain brings multi-agent investigation and analytics above ARGUS, ABACUS, KYC and UDM. ABACUS supports sanctions screening; KYC supports onboarding and ongoing due diligence.",
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
              One ARGUS platform. A shared UDM warehouse. A unified view across
              AML, fraud, trade surveillance and entity resolution.
            </p>
            <small>FINANCIAL COMPLIANCE / ONE CONNECTED PLATFORM</small>
          </div>
        </div>
      </section>
      <section className={`${s.section} ${s.band}`}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Choose your starting point</span>
          <h2 className={s.heading}>
            Financial compliance, from onboarding to investigation.
          </h2>
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
      <CTA title="Unify your financial crime operations." />
    </div>
  );
}
