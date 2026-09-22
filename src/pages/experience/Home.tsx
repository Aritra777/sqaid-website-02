import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Database,
  FileCheck2,
  Network,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import {
  Architecture,
  CTA,
  ProductCards,
  Stories,
} from "@/components/experience/Shared";
import {
  BrainWorkspace,
  EvidenceGraph,
} from "@/components/experience/Workspace";
import { products } from "@/content/products";
import { useDocumentTitle } from "@/lib/use-document-title";
import s from "./Experience.module.css";
export default function Home() {
  useDocumentTitle(
    null,
    "Connect enterprise data, screening, customer lifecycle and financial-crime monitoring. Ask better questions with SqAId Brain.",
  );
  return (
    <div className={`theme-brain ${s.page}`}>
      <section className={s.hero}>
        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div>
            <span className={s.eyebrow}>Connected risk intelligence</span>
            <h1 className={s.title}>
              Your data.
              <br />
              Your risk.
              <br />
              One connected view.
            </h1>
            <p className={s.lead}>
              Bring enterprise data, customer context and financial-crime
              intelligence together. See the connections. Ask the next question.
              Follow the evidence.
            </p>
            <div className={s.actions}>
              <Button to="/platform" size="lg">
                Explore the platform
                <ArrowRight size={16} />
              </Button>
              <Link to="/contact" className={s.textLink}>
                Request a demo
                <ChevronRight size={14} />
              </Link>
            </div>
            <div className={s.meta}>
              <span>
                <Database size={12} />
                Shared data foundation
              </span>
              <span>
                <Network size={12} />
                Connected intelligence
              </span>
            </div>
          </div>
          <div>
            <EvidenceGraph />
          </div>
        </div>
      </section>
      <div className={s.wrap}>
        <div className={s.ribbon}>
          {[
            "ENTERPRISE DATA",
            "CUSTOMER CONTEXT",
            "RISK & SURVEILLANCE",
            "AGENTIC INTELLIGENCE",
          ].map((v) => (
            <span key={v}>
              <i />
              {v}
            </span>
          ))}
        </div>
      </div>
      <section className={s.section}>
        <div className={s.wrap}>
          <Reveal>
            <span className={s.eyebrow}>
              The signal is only part of the story
            </span>
            <h2 className={s.heading}>
              The payment. The person.
              <br />
              The pattern between them.
            </h2>
            <p className={s.intro}>
              An alert tells you something happened. Understanding it means
              connecting the customer, the activity and the evidence behind
              both.
            </p>
          </Reveal>
          <div className={s.features}>
            {[
              {
                title: "Data without shared meaning.",
                body: "Different systems describe the same customer in different ways. Start with canonical entities and clear source mappings.",
              },
              {
                title: "Signals without enough context.",
                body: "A screening candidate, a fraud event and an AML pattern need different workflows, but often share the same underlying relationships.",
              },
              {
                title: "Questions that cross systems.",
                body: "Give teams a connected workspace to explore the evidence, ask follow-up questions and make informed decisions.",
              },
            ].map((v, i) => (
              <Reveal className={s.feature} key={v.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section id="platform" className={`${s.section} ${s.band}`}>
        <div className={`${s.wrap} ${s.split}`}>
          <div>
            <span className={s.eyebrow}>Built to connect</span>
            <h2 className={s.heading}>
              One foundation.
              <br />
              Specialist products.
              <br />
              Shared intelligence.
            </h2>
            <p className={s.intro}>
              UDM gives enterprise data a common structure. ARGUS, ABACUS and
              KYC bring domain-specific workflows. Brain sits across the suite
              to connect questions with evidence.
            </p>
            <div className={s.actions}>
              <Link to="/platform" className={s.textLink}>
                Understand the architecture
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <Architecture />
        </div>
      </section>
      <section className={s.section}>
        <div className={`${s.wrap} ${s.split}`}>
          <div>
            <span className={s.eyebrow}>Meet SqAId Brain</span>
            <h2 className={s.heading}>
              A better question.
              <br />A deeper view.
            </h2>
            <p className={s.intro}>
              Move beyond a dashboard’s predefined answers. Connect sources,
              configure specialist agents and explore findings through a
              conversation that keeps the evidence close.
            </p>
            <p className={s.intro}>
              Select a question in this illustration, then open a source. That
              is the experience we are building around: understanding you can
              inspect.
            </p>
            <div className={s.actions}>
              <Button to="/products/brain">
                Explore Brain
                <ArrowRight size={15} />
              </Button>
            </div>
          </div>
          <BrainWorkspace />
        </div>
      </section>
      <section id="products" className={`${s.section} ${s.band}`}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>The product suite</span>
          <h2 className={s.heading}>
            Purpose-built for the work.
            <br />
            Designed for the whole picture.
          </h2>
          <ProductCards />
        </div>
      </section>
      <section id="stories" className={s.section}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Problems worth solving</span>
          <h2 className={s.heading}>The story behind the signal.</h2>
          <p className={s.intro}>
            Follow a practical question through the evidence and workflow.
            Explore illustrative stories from investigation, onboarding and
            enterprise data.
          </p>
          <Stories
            stories={[
              products[0].stories[0],
              products[3].stories[0],
              products[4].stories[0],
            ]}
          />
        </div>
      </section>
      <section className={`${s.section} ${s.band}`}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>From onboarding to understanding</span>
          <h2 className={s.heading}>Keep the context moving.</h2>
          <p className={s.intro}>
            A connected product architecture supports the customer lifecycle. We
            work with your team to establish the integration and deployment
            scope.
          </p>
          <div className={s.journey}>
            {[
              {
                name: "Know",
                body: "Capture the customer, documents and ownership context.",
                slug: "kyc",
              },
              {
                name: "Screen",
                body: "Compare possible watchlist matches and inspect evidence.",
                slug: "abacus",
              },
              {
                name: "Connect",
                body: "Organize enterprise data through canonical definitions.",
                slug: "udm",
              },
              {
                name: "Monitor",
                body: "Examine events, behavior and market activity.",
                slug: "argus",
              },
              {
                name: "Understand",
                body: "Ask across sources and explore the connections.",
                slug: "brain",
              },
            ].map((v, i) => (
              <Link
                className={`theme-${v.slug}`}
                to={`/products/${v.slug}`}
                key={v.name}
              >
                <small>{String(i + 1).padStart(2, "0")}</small>
                <h3>{v.name}</h3>
                <p>{v.body}</p>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={s.section}>
        <div className={`${s.wrap} ${s.split}`}>
          <div>
            <span className={s.eyebrow}>Next generation, by design</span>
            <h2 className={s.heading}>
              More intelligence.
              <br />
              More to inspect.
            </h2>
            <p className={s.intro}>
              Modern risk technology should help you understand how a finding
              came together. Our approach puts source context, configurable
              workflows and review controls inside the experience.
            </p>
            <Link to="/solutions" className={s.textLink}>
              Find your use case
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className={s.statement}>
            <FileCheck2 size={30} />
            <p>
              Sources you can open.
              <br />
              Relationships you can examine.
              <br />
              Decisions people can own.
            </p>
            <small>THE SQAID APPROACH</small>
          </div>
        </div>
      </section>
      <CTA />
    </div>
  );
}
