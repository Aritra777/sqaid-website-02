import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import StatBand from "@/components/ui/StatBand";
import { getIcon } from "@/lib/icons";
import { getIndustry, getDomain, getProduct, INDUSTRIES } from "@/lib/nav-data";
import { getIndustryContent } from "@/lib/industries-content";
import { useDocumentTitle } from "@/lib/use-document-title";
import { fadeUp, inViewOnce, staggerParent } from "@/lib/motion";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import NotFound from "./NotFound";
import styles from "./IndustryPage.module.css";

/**
 * IndustryPage — data-driven deep dive for /industries/:slug, rendered from
 * lib/industries-content.ts. Sections: stat band → operating context +
 * challenges → mapped solutions → outcomes → products → regulators → CTA.
 */
export default function IndustryPage() {
  const { slug = "" } = useParams();
  const industry = getIndustry(slug);
  const content = getIndustryContent(slug);
  useDocumentTitle(industry?.label);

  if (!industry || !content) return <NotFound />;

  const others = INDUSTRIES.filter((i) => i.slug !== slug);

  return (
    <div className={content.theme}>
      <PageHeader
        eyebrow="Industry"
        title={
          <>
            SqAId for <em>{industry.label}</em>
          </>
        }
        lede={content.summary}
      >
        <Button href={`mailto:${SITE.email}`} size="lg">
          Request a Demo →
        </Button>
      </PageHeader>

      <StatBand ids={content.metricIds} />

      {/* ── context + challenges ── */}
      <section className="section">
        <Container size="wide">
          <div className={styles.contextGrid}>
            <Reveal className={styles.contextCopy}>
              <span className={styles.kicker}>The operating reality</span>
              <h2 className={styles.contextTitle}>{content.context.title}</h2>
              <p className={styles.contextBody}>{content.context.body}</p>
            </Reveal>

            <motion.div
              className={styles.challenges}
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
            >
              {content.challenges.map((c) => {
                const Icon = getIcon(c.icon);
                return (
                  <motion.div key={c.title} className={styles.challenge} variants={fadeUp}>
                    <span className={styles.challengeIcon}>
                      <Icon size={17} strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className={styles.challengeTitle}>{c.title}</h3>
                      <p className={styles.challengeBody}>{c.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── mapped solutions ── */}
      <section className={cn("section", styles.mapSection)}>
        <Container size="wide">
          <SectionHeading
            eyebrow="Where to start"
            title={
              <>
                The solutions that matter <em>here.</em>
              </>
            }
            lede={`Ordered by what typically moves the needle first for ${industry.label.toLowerCase()}.`}
          />
          <motion.div
            className={styles.solutions}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            {content.solutions.map((ds, i) => {
              const d = getDomain(ds);
              if (!d) return null;
              return (
                <motion.div key={ds} variants={fadeUp}>
                  <Link to={`/solutions/${ds}`} className={styles.sol}>
                    <span className={styles.solNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.solBody}>
                      <span className={styles.solLabel}>{d.name}</span>
                      <span className={styles.solDesc}>
                        {d.items.length} capabilities
                      </span>
                    </span>
                    <ArrowRight size={15} className={styles.solArrow} />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ── outcomes ── */}
      <section className="section">
        <Container size="wide">
          <SectionHeading
            eyebrow="Outcomes"
            title={
              <>
                What changes once it is <em>live.</em>
              </>
            }
          />
          <motion.div
            className={styles.outcomes}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            {content.outcomes.map((o, i) => (
              <motion.div key={o.title} className={styles.outcome} variants={fadeUp}>
                <span className={styles.outcomeNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.outcomeTitle}>{o.title}</h3>
                <p className={styles.outcomeBody}>{o.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── products + regulators ── */}
      <section className={cn("section", styles.deliverSection)}>
        <Container size="wide">
          <div className={styles.deliverGrid}>
            <Reveal>
              <span className={styles.kicker}>Products in play</span>
              <div className={styles.products}>
                {content.products.map((ps) => {
                  const p = getProduct(ps);
                  if (!p) return null;
                  const PIcon = getIcon(p.icon);
                  const live = p.status === "live";
                  const inner = (
                    <>
                      <span className={styles.prodIcon}>
                        <PIcon size={18} strokeWidth={2} />
                      </span>
                      <span className={styles.prodBody}>
                        <span className={styles.prodName}>{p.name}</span>
                        <span className={styles.prodTag}>{p.tagline}</span>
                      </span>
                      {live && <ArrowRight size={16} className={styles.prodArrow} />}
                    </>
                  );
                  return live ? (
                    <Link key={ps} to={`/products/${ps}`} className={cn(styles.prod, p.theme)}>
                      {inner}
                    </Link>
                  ) : (
                    <div key={ps} className={cn(styles.prod, p.theme)}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal>
              <span className={styles.kicker}>Who you answer to</span>
              <ul className={styles.regulators}>
                {content.regulators.map((r) => (
                  <li key={r} className={styles.regulator}>
                    <Check size={14} strokeWidth={2.5} />
                    {r}
                  </li>
                ))}
              </ul>
              <p className={styles.regulatorNote}>
                Referenced regimes, not a certification claim. Applicable scope is
                confirmed per deployment.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── other industries ── */}
      <section className={cn("section", styles.otherSection)}>
        <Container size="wide">
          <SectionHeading eyebrow="Also serving" title={<>Other segments</>} />
          <div className={styles.others}>
            {others.map((o) => (
              <Link key={o.slug} to={`/industries/${o.slug}`} className={styles.other}>
                <span className={styles.otherLabel}>{o.label}</span>
                <span className={styles.otherBlurb}>{o.blurb}</span>
                <ArrowRight size={15} className={styles.otherArrow} />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <Container size="wide">
          <Reveal className={styles.cta}>
            <h2 className={styles.ctaTitle}>
              Built for <em>{industry.label.toLowerCase()}</em>, proven on your data.
            </h2>
            <p className={styles.ctaBody}>
              We run a scoped pilot against your own traffic — you see the numbers before
              anything is signed.
            </p>
            <div className={styles.ctaActions}>
              <Button href={`mailto:${SITE.email}`} size="lg">
                Request a Demo →
              </Button>
              <Button href={`mailto:${SITE.email}`} variant="ghost" size="lg">
                Talk to an engineer
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
