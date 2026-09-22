import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import ProductLogo, { type ProductIdentity } from "@/components/ui/ProductLogo";
import type { Product, Story } from "@/content/products";
import { products, productUrl } from "@/content/products";
import s from "@/pages/experience/Experience.module.css";
export function Architecture() {
  return (
    <div
      className={`glass-diagram ${s.architecture}`}
      aria-label="ARGUS unified financial crime platform powered by UDM"
    >
      <Link to="/products/brain" className={`theme-brain ${s.architectureTop}`}>
        <div>
          <strong>SqAId Brain</strong>
          <small>MULTI-AGENT INTELLIGENCE ACROSS THE SUITE</small>
        </div>
        <ProductLogo product="brain" size={48} decorative />
      </Link>
      <div className={`theme-argus ${s.argusPlatform}`}>
        <Link to="/products/argus" className={s.argusPlatformTitle}>
          <div>
            <small>ONE UNIFIED FINANCIAL CRIME PLATFORM</small>
            <strong>ARGUS</strong>
          </div>
          <ProductLogo product="argus" size={60} decorative />
        </Link>
        <div className={s.argusModules}>
          <Link to="/products/argus/aml">
            AML<small>Transaction monitoring</small>
          </Link>
          <Link to="/products/argus/fraud">
            Fraud<small>Event & rule evaluation</small>
          </Link>
          <Link to="/products/argus/trade-surveillance">
            Trade surveillance<small>Market conduct</small>
          </Link>
          <Link to="/products/argus/entity-resolution">
            Entity resolution<small>Identity & relationships</small>
          </Link>
        </div>
        <Link to="/products/udm" className={`theme-udm ${s.architectureBase}`}>
          <div>
            <small>POWERED BY THE ENTERPRISE WAREHOUSE</small>
            <strong>UDM</strong>
            <small>SHARED DATA FOR EVERY ARGUS CAPABILITY</small>
          </div>
          <ProductLogo product="udm" size={48} decorative />
        </Link>
      </div>
      <div className={s.complianceProducts}>
        <Link to="/products/abacus" className="theme-abacus">
          <ProductLogo product="abacus" size={36} decorative />
          <strong>ABACUS</strong>
          <small>Sanctions & payment screening</small>
        </Link>
        <Link to="/products/kyc" className="theme-kyc">
          <ProductLogo product="kyc" size={36} decorative />
          <strong>SqAId KYC</strong>
          <small>Onboarding & ongoing due diligence</small>
        </Link>
      </div>
      <p className={s.architectureLabel}>
        UDM is also a standalone enterprise warehouse product.
        <br />
        Integration scope is configured for your institution.
      </p>
    </div>
  );
}
export function ProductCards({
  items = [products[1], products[0], ...products.slice(2)],
}: {
  items?: Product[];
}) {
  return (
    <div className={s.productCards}>
      {items.map((p) => {
        return (
          <Link
            key={p.slug}
            to={productUrl(p.slug)}
            className={`theme-${p.theme} ${s.productCard}`}
          >
            <ProductLogo
              product={p.theme as ProductIdentity}
              size={56}
              decorative
              className={s.cardLogo}
            />
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
  title = "Take on financial crime with SqAId.",
  copy = "Explore a unified approach to AML, fraud, trade surveillance and entity resolution—powered by your enterprise data.",
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
