import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import StatBand from "@/components/ui/StatBand";
import { getIcon } from "@/lib/icons";
import { getDomain, getProduct, SOLUTIONS } from "@/lib/nav-data";
import { getDomainContent, LEGACY_SOLUTION_MAP } from "@/lib/domains-content";
import { useDocumentTitle } from "@/lib/use-document-title";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import NotFound from "./NotFound";
import styles from "./SolutionDomainPage.module.css";

/**
 * SolutionDomainPage — /solutions/:slug for the four risk domains.
 *
 * Replaces 14 thin single-solution pages. Each former solution is now an
 * anchored section here with its own typologies and signals, so the page has
 * real depth instead of a repeated skeleton. Legacy slugs redirect to the
 * matching anchor (see the Navigate below), so old links keep working.
 */
export default function SolutionDomainPage() {
  const { slug = "" } = useParams();

  /* a legacy /solutions/<capability> URL → its domain page + anchor */
  const legacy = LEGACY_SOLUTION_MAP[slug];

  const domain = getDomain(slug);
  const content = getDomainContent(slug);
  useDocumentTitle(domain?.name);

  if (legacy) {
    return <Navigate to={`/solutions/${legacy.domain}#${legacy.anchor}`} replace />;
  }
  if (!domain || !content) return <NotFound />;

  const others = SOLUTIONS.filter((d) => d.slug !== slug);

  return (
    <div className={domain.theme}>
      {/* ── hero ── */}
      <header className={styles.hero}>
        <Container>
          <Reveal className={styles.heroInner}>
            <Eyebrow dot>Solutions</Eyebrow>
            <h1 className={styles.heroTitle}>{content.title}</h1>
            <p className={styles.heroLede}>{content.lede}</p>
            <div className={styles.heroActions}>
              <Button href={`mailto:${SITE.email}`} size="lg">
                Request a demo
              </Button>
              <Button href="#capabilities" variant="ghost" size="lg">
                What's included <ArrowRight size={15} strokeWidth={2.2} />
              </Button>
            </div>
          </Reveal>
        </Container>
      </header>

      <StatBand ids={content.metricIds} />

      {/* ── context ── */}
      <section className={cn(styles.section, styles.band)}>
        <Container>
          <Reveal className={styles.contextInner}>
            <h2 className={styles.contextTitle}>{content.context.heading}</h2>
            {content.context.body.map((p) => (
              <p key={p.slice(0, 40)} className={styles.contextBody}>
                {p}
              </p>
            ))}
          </Reveal>

          <div className={styles.pressures}>
            {content.context.pressures.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className={styles.pressure}>
                <h3 className={styles.pressureTitle}>{p.title}</h3>
                <p className={styles.pressureBody}>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── capabilities: one deep section per former solution page ── */}
      <section id="capabilities" className={styles.section}>
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="What's included"
            lede={`${content.capabilities.length} capabilities, delivered as one system rather than as separate tools.`}
          />
        </Container>

        <div className={styles.capList}>
          {content.capabilities.map((c, i) => {
            const Icon = getIcon(c.icon);
            return (
              <section key={c.slug} id={c.slug} className={styles.cap}>
                <Container>
                  <Reveal className={styles.capInner}>
                    <div className={styles.capHead}>
                      <span className={styles.capIcon}>
                        <Icon size={20} strokeWidth={1.9} />
                      </span>
                      <span className={styles.capIndex}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className={styles.capName}>{c.name}</h3>
                    <p className={styles.capSummary}>{c.summary}</p>

                    <div className={styles.capGrid}>
                      <div className={styles.capCol}>
                        <h4 className={styles.capLabel}>The problem</h4>
                        <p className={styles.capText}>{c.problem}</p>
                      </div>
                      <div className={styles.capCol}>
                        <h4 className={styles.capLabel}>Our approach</h4>
                        <p className={styles.capText}>{c.approach}</p>
                      </div>
                    </div>

                    <div className={styles.capGrid}>
                      <div className={styles.capCol}>
                        <h4 className={styles.capLabel}>What it detects</h4>
                        <ul className={styles.capItems}>
                          {c.detects.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.capCol}>
                        <h4 className={styles.capLabel}>Signals used</h4>
                        <ul className={styles.capItems}>
                          {c.signals.map((sg) => (
                            <li key={sg}>{sg}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                </Container>
              </section>
            );
          })}
        </div>
      </section>

      {/* ── pipeline ── */}
      <section className={cn(styles.section, styles.band)}>
        <Container>
          <SectionHeading eyebrow="How it works" title="End to end" />
          <ol className={styles.pipeline}>
            {content.pipeline.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className={styles.step}>
                <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── products + frameworks ── */}
      <section className={styles.section}>
        <Container>
          <div className={styles.deliverGrid}>
            <div>
              <SectionHeading eyebrow="Products" title="Delivered by" />
              <div className={styles.products}>
                {content.products.map((ps) => {
                  const p = getProduct(ps);
                  if (!p) return null;
                  const PIcon = getIcon(p.icon);
                  const live = p.status === "live";
                  const inner = (
                    <>
                      <span className={styles.prodIcon}>
                        <PIcon size={18} strokeWidth={1.9} />
                      </span>
                      <span className={styles.prodBody}>
                        <span className={styles.prodName}>{p.name}</span>
                        <span className={styles.prodTag}>{p.tagline}</span>
                      </span>
                      {live ? (
                        <ArrowRight size={16} className={styles.prodArrow} />
                      ) : (
                        <span className={styles.prodSoon}>Soon</span>
                      )}
                    </>
                  );
                  return live ? (
                    <Link
                      key={ps}
                      to={`/products/${ps}`}
                      className={cn(styles.prod, p.theme)}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div key={ps} className={cn(styles.prod, p.theme)}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Regulation" title="What it answers to" />
              <dl className={styles.frameworks}>
                {content.frameworks.map((f) => (
                  <div key={f.name} className={styles.framework}>
                    <dt className={styles.frameworkName}>{f.name}</dt>
                    <dd className={styles.frameworkDetail}>{f.detail}</dd>
                  </div>
                ))}
              </dl>
              <p className={styles.frameworkNote}>
                Frameworks referenced for context. Not a certification claim; applicable
                scope is confirmed per deployment.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── other domains ── */}
      <section className={cn(styles.section, styles.band)}>
        <Container>
          <SectionHeading eyebrow="Explore" title="Other domains" />
          <div className={styles.others}>
            {others.map((d) => (
              <Link key={d.slug} to={`/solutions/${d.slug}`} className={styles.other}>
                <span className={styles.otherName}>{d.name}</span>
                <span className={styles.otherCount}>
                  {d.items.length} capabilities
                </span>
                <ArrowRight size={16} className={styles.otherArrow} />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <Container>
          <Reveal className={styles.cta}>
            <h2 className={styles.ctaTitle}>See it on your own data.</h2>
            <p className={styles.ctaBody}>
              Every engagement starts in shadow mode against your live traffic. You see
              the numbers on your own book before anything changes a customer outcome.
            </p>
            <div className={styles.ctaActions}>
              <Button href={`mailto:${SITE.email}`} size="lg">
                Request a demo
              </Button>
              <Button to="/company" variant="ghost" size="lg">
                How we deploy <ArrowRight size={15} strokeWidth={2.2} />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
