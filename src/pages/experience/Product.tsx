import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight, FileCheck2, GitBranch } from "lucide-react";
import { allProducts, findProduct, workloads } from "@/content/products";
import {
  Architecture,
  CTA,
  ProductCards,
  Stories,
} from "@/components/experience/Shared";
import Workspace from "@/components/experience/Workspace";
import {
  Studio,
  WorkloadExplorer,
  ScreeningTrail,
} from "@/components/experience/DeepDive";
import Button from "@/components/ui/Button";
import ProductLogo, { type ProductIdentity } from "@/components/ui/ProductLogo";
import Reveal from "@/components/motion/Reveal";
import { useDocumentTitle } from "@/lib/use-document-title";
import NotFound from "@/pages/NotFound";
import s from "./Experience.module.css";
export default function ProductPage() {
  const { slug, workload } = useParams();
  const p = findProduct(workload || slug || "");
  useDocumentTitle(p ? `${p.name} · ${p.category}` : "Product", p?.lead);
  if (!p) return <NotFound />;
  return (
    <div className={`theme-${p.theme} ${s.page}`} key={p.slug}>
      <section className={s.hero}>
        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div>
            {workload && (
              <Link to="/products/argus" className={s.breadcrumb}>
                ARGUS
                <ChevronRight size={11} />
                {p.name}
              </Link>
            )}
            <div className={s.productIdentity}>
              <ProductLogo product={p.theme as ProductIdentity} size={66} />
              <div>
                <strong>{p.name}</strong>
                <span>{p.category}</span>
              </div>
            </div>
            <h1 className={s.title}>{p.headline}</h1>
            <p className={s.lead}>{p.lead}</p>
            <div className={s.actions}>
              <Button
                to={`/contact?product=${encodeURIComponent(p.name)}`}
                size="lg"
              >
                Request a demo
                <ArrowRight size={15} />
              </Button>
              <a href="#use-cases" className={s.textLink}>
                Explore the use cases
                <ChevronRight size={14} />
              </a>
            </div>
            <div className={s.meta}>
              <span>
                <FileCheck2 size={12} />
                Evidence in context
              </span>
              <span>
                <GitBranch size={12} />
                Connected by design
              </span>
            </div>
          </div>
          <div>
            <Workspace kind={p.slug} />
          </div>
        </div>
      </section>
      <div className={s.subnav}>
        <div className={s.wrap}>
          <strong>{p.name}</strong>
          <nav aria-label={`${p.name} page sections`}>
            <a href="#overview">The problem</a>
            <a href="#capabilities">How it works</a>
            <a href="#use-cases">Use cases & stories</a>
            <a href="#difference">Why it’s different</a>
          </nav>
        </div>
      </div>
      <section id="overview" className={s.section}>
        <div className={`${s.wrap} ${s.split}`}>
          <Reveal>
            <span className={s.eyebrow}>The problem worth solving</span>
            <h2 className={s.heading}>{p.question}</h2>
          </Reveal>
          <Reveal className={s.statement}>
            <p>{p.answer}</p>
            <small>{p.name.toUpperCase()} / THE CONNECTED APPROACH</small>
          </Reveal>
        </div>
      </section>
      <section id="capabilities" className={`${s.section} ${s.band}`}>
        <div className={s.wrap}>
          <Reveal>
            <span className={s.eyebrow}>How it works</span>
            <h2 className={s.heading}>
              {p.slug === "brain"
                ? "From a source to\na question worth asking."
                : p.slug === "udm"
                  ? "Make the path\nfrom data to context visible."
                  : p.slug === "abacus"
                    ? "Find the candidate.\nExamine the evidence."
                    : "The workflow behind\nthe decision."}
            </h2>
          </Reveal>
          <div className={s.features}>
            {p.features.map((f, i) => (
              <Reveal className={s.feature} key={f.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </Reveal>
            ))}
          </div>
          {p.slug === "argus" && (
            <div className={s.showcase}>
              <ProductCards items={workloads} />
            </div>
          )}
        </div>
      </section>
      {p.slug === "argus" && (
        <section className={s.section}>
          <div className={`${s.wrap} ${s.split}`}>
            <div>
              <span className={s.eyebrow}>The shared foundation</span>
              <h2 className={s.heading}>
                Different workloads.
                <br />
                Connected context.
              </h2>
              <p className={s.intro}>
                UDM is an enterprise warehouse product in its own right. Within
                ARGUS, it gives fraud, AML, trade surveillance and entity
                intelligence a common data foundation. Brain brings the
                connected view above them.
              </p>
              <Link className={s.textLink} to="/products/udm">
                Meet UDM
                <ArrowRight size={15} />
              </Link>
            </div>
            <Architecture />
          </div>
        </section>
      )}
      {p.slug === "brain" && <Studio />}
      {p.slug === "argus" && <WorkloadExplorer />}
      {p.slug === "abacus" && <ScreeningTrail />}
      <section id="use-cases" className={s.section}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Use cases & stories</span>
          <h2 className={s.heading}>Start with a real question.</h2>
          <p className={s.intro}>
            Explore the problem, the workflow and the difference it makes. These
            are illustrative scenarios, not customer outcome claims.
          </p>
          <Stories key={p.slug} stories={p.stories} />
        </div>
      </section>
      <section id="difference" className={`${s.section} ${s.band}`}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>What makes this next generation</span>
          <h2 className={s.heading}>
            A different way
            <br />
            to get to understanding.
          </h2>
          <p className={s.intro}>
            The difference is in how the work gets done: connected context,
            inspectable evidence and explicit controls.
          </p>
          <div className={s.shift}>
            <div className={s.shiftHead}>
              <span>The familiar friction</span>
              <span />
              <span>The {p.name} approach</span>
            </div>
            {p.shift.map(([before, after]) => (
              <div className={s.shiftRow} key={before}>
                <span>{before}</span>
                <ArrowRight size={22} />
                <strong>{after}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={s.section}>
        <div className={s.wrap}>
          <span className={s.eyebrow}>Part of the connected picture</span>
          <h2 className={s.heading}>Go beyond this workflow.</h2>
          <ProductCards
            items={p.related
              .map((v) => allProducts.find((x) => x.slug === v)!)
              .filter(Boolean)}
          />
          <div className={s.faq}>
            <details>
              <summary>
                How does this fit into our existing environment?
              </summary>
              <p>
                Start with your source systems, required workflows and
                deployment constraints. The demo can distinguish available
                capabilities, configured integrations and any work needed for
                your environment.
              </p>
            </details>
            {p.slug === "kyc" && (
              <details>
                <summary>
                  Are external identity providers already connected?
                </summary>
                <p>
                  Identity and registry integrations depend on provider
                  configuration and commercial access. The current project does
                  not establish live external identity verification. We will
                  review the required providers and verification scope with your
                  team.
                </p>
              </details>
            )}
            {p.slug === "abacus" && (
              <details>
                <summary>Does an AI model decide the screening result?</summary>
                <p>
                  The current ABACUS screening path uses candidate retrieval and
                  calibrated evidence scoring. It does not use an LLM
                  adjudicator. Brain provides the separate conversational
                  investigation experience. Detection performance must be
                  evaluated on your representative data.
                </p>
              </details>
            )}
            {p.slug === "udm" && (
              <details>
                <summary>Is UDM tied to a single database engine?</summary>
                <p>
                  The canonical model has an engine-pluggable design. Physical
                  deployment support and validation vary by engine; we will
                  review your target environment rather than assume every
                  deployment has the same certification.
                </p>
              </details>
            )}
          </div>
        </div>
      </section>
      <CTA name={p.name} title={p.cta} interest={p.name} />
    </div>
  );
}
