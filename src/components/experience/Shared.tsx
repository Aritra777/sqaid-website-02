import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  Database,
  Fingerprint,
  Network,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";
import type { Product, Story } from "@/content/products";
import { products, productUrl } from "@/content/products";
import s from "@/pages/experience/Experience.module.css";
export const productIcons = {
  brain: BrainCircuit,
  argus: Network,
  abacus: ScanLine,
  kyc: Fingerprint,
  udm: Database,
};
export function Architecture() {
  return (
    <div className={s.architecture} aria-label="SqAId product architecture">
      <Link to="/products/brain" className={`theme-brain ${s.architectureTop}`}>
        <div>
          <strong>SqAId Brain</strong>
          <small>ASK · EXPLORE · INVESTIGATE</small>
        </div>
        <BrainCircuit size={30} />
      </Link>
      <div className={s.architectureMid}>
        <Link to="/products/argus" className="theme-argus">
          <strong>ARGUS</strong>
          <small>
            Fraud · AML · Trade
            <br />
            Entity resolution
          </small>
        </Link>
        <Link to="/products/abacus" className="theme-abacus">
          <strong>ABACUS</strong>
          <small>
            Sanctions &<br />
            payment screening
          </small>
        </Link>
        <Link to="/products/kyc" className="theme-kyc">
          <strong>KYC</strong>
          <small>
            Onboarding &<br />
            ongoing review
          </small>
        </Link>
      </div>
      <Link to="/products/udm" className={`theme-udm ${s.architectureBase}`}>
        <div>
          <strong>UDM</strong>
          <small>ENTERPRISE DATA FOUNDATION</small>
        </div>
        <Database size={28} />
      </Link>
      <p className={s.architectureLabel}>
        Product architecture · integration scope depends on configuration.
        <br />
        Brain can also connect directly to supported source systems.
      </p>
    </div>
  );
}
export function ProductCards({ items = products }: { items?: Product[] }) {
  return (
    <div className={s.productCards}>
      {items.map((p) => {
        const Icon =
          productIcons[p.theme as keyof typeof productIcons] || Network;
        return (
          <Link
            key={p.slug}
            to={productUrl(p.slug)}
            className={`theme-${p.theme} ${s.productCard}`}
          >
            <Icon />
            <h3>{p.name}</h3>
            <p>{p.lead}</p>
            <span>
              Explore {p.slug === "brain" ? "Brain" : p.name}
              <ArrowRight size={13} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
export function Stories({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState(0);
  const story = stories[active];
  return (
    <div className={s.storyLayout}>
      <div className={s.storyTabs} aria-label="Choose a use case">
        {stories.map((v, i) => (
          <button
            key={v.title}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            aria-controls="story-detail"
          >
            <small>{v.role}</small>
            <strong>{v.title}</strong>
          </button>
        ))}
      </div>
      <article className={s.story} id="story-detail" aria-live="polite">
        <div className={s.storyBadge}>
          <ShieldCheck size={13} />
          ILLUSTRATIVE USE CASE
        </div>
        <h3>{story.title}</h3>
        <p>{story.problem}</p>
        <ol>
          {story.steps.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ol>
        <div className={s.outcome}>
          <small>WHAT THIS MAKES POSSIBLE</small>
          <p>{story.outcome}</p>
        </div>
      </article>
    </div>
  );
}
export function CTA({
  name = "SqAId",
  title = "Bring your hardest question.",
  copy = "Let’s explore the data, workflows and evidence your team needs.",
  interest = "Platform",
}: {
  name?: string;
  title?: string;
  copy?: string;
  interest?: string;
}) {
  return (
    <section id="contact" className={s.cta}>
      <div className={s.wrap}>
        <span className={s.eyebrow}>{name}</span>
        <h2 className={s.heading}>{title}</h2>
        <p className={s.intro}>{copy}</p>
        <div className={s.actions}>
          <Button
            to={`/contact?product=${encodeURIComponent(interest)}`}
            size="lg"
          >
            Request a demo
            <ArrowRight size={16} />
          </Button>
          <a className={s.textLink} href="mailto:info@sqaid.ai">
            Talk to the team
          </a>
        </div>
      </div>
    </section>
  );
}
