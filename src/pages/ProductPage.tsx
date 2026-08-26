import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { getIcon } from "@/lib/icons";
import { getProduct, PRODUCTS } from "@/lib/nav-data";
import { PRODUCT_CONTENT } from "@/lib/products-content";
import { DOMAIN_LIST } from "@/lib/domains-content";
import { useDocumentTitle } from "@/lib/use-document-title";
import { fadeUp, inViewOnce, staggerParent } from "@/lib/motion";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import NotFound from "./NotFound";
import styles from "./ProductPage.module.css";

/**
 * ProductPage — data-driven fallback template for /products/:slug.
 *
 * The four shipping products each have a bespoke page routed ahead of this in
 * App.tsx, so this renders only for a product that has been added to
 * nav-data.ts but does not yet have its own layout. It builds a complete page
 * from PRODUCT_CONTENT plus every solution that lists this product as a
 * deliverer — so a new product is presentable the moment it is added.
 */
export default function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const content = PRODUCT_CONTENT[slug];
  useDocumentTitle(product?.name);

  if (!product || !content) return <NotFound />;

  const live = product.status === "live";

  /* domains this product delivers, derived from the domain content map */
  const delivered = DOMAIN_LIST.filter((d) => d.products.includes(slug));
  const siblings = PRODUCTS.filter((p) => p.slug !== slug);

  return (
    <div className={product.theme}>
      <PageHeader
        eyebrow={`Product · ${content.category}`}
        title={
          <>
            {product.name} — <em>{product.tagline}</em>
          </>
        }
        lede={content.description}
      >
        {live ? (
          <Button href={`mailto:${SITE.email}`} size="lg">
            Request a Demo →
          </Button>
        ) : (
          <Badge tone="soon">Coming soon</Badge>
        )}
      </PageHeader>

      {/* ── capabilities ── */}
      <section className="section">
        <Container size="wide">
          <SectionHeading
            eyebrow="Capabilities"
            title={
              <>
                What {product.name} <em>does.</em>
              </>
            }
          />
          <motion.div
            className={styles.features}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            {content.features.map((f, i) => (
              <motion.div key={f} className={styles.feature} variants={fadeUp}>
                <span className={styles.featureIcon}>
                  <Check size={15} strokeWidth={2.5} />
                </span>
                <p className={styles.featureText}>{f}</p>
                <span className={styles.featureNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── solutions delivered ── */}
      {delivered.length > 0 && (
        <section className={cn("section", styles.solSection)}>
          <Container size="wide">
            <SectionHeading
              eyebrow="Solutions"
              title={
                <>
                  Where {product.name} <em>is used.</em>
                </>
              }
            />
            <div className={styles.solutions}>
              {delivered.map((d) => (
                <Link key={d.slug} to={`/solutions/${d.slug}`} className={styles.sol}>
                  <span className={styles.solBody}>
                    <span className={styles.solLabel}>{d.title}</span>
                    <span className={styles.solDesc}>{d.lede}</span>
                  </span>
                  <ArrowRight size={15} className={styles.solArrow} />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── rest of the suite ── */}
      <section className={cn("section", styles.suiteSection)}>
        <Container size="wide">
          <SectionHeading eyebrow="The suite" title={<>Works with</>} />
          <div className={styles.suite}>
            {siblings.map((p) => {
              const PIcon = getIcon(p.icon);
              const pLive = p.status === "live";
              const inner = (
                <>
                  <span className={styles.prodIcon}>
                    <PIcon size={18} strokeWidth={2} />
                  </span>
                  <span className={styles.prodBody}>
                    <span className={styles.prodName}>{p.name}</span>
                    <span className={styles.prodTag}>{p.tagline}</span>
                  </span>
                  {pLive ? (
                    <ArrowRight size={16} className={styles.prodArrow} />
                  ) : (
                    <span className={styles.prodSoon}>Soon</span>
                  )}
                </>
              );
              return pLive ? (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className={cn(styles.prod, p.theme)}
                >
                  {inner}
                </Link>
              ) : (
                <div key={p.slug} className={cn(styles.prod, p.theme)}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <Container size="wide">
          <Reveal className={styles.cta}>
            <h2 className={styles.ctaTitle}>
              See {product.name} on <em>your</em> data.
            </h2>
            <p className={styles.ctaBody}>
              We run a scoped pilot against your own traffic — you see the numbers before
              anything is signed.
            </p>
            <div className={styles.ctaActions}>
              <Button href={`mailto:${SITE.email}`} size="lg">
                Request a Demo →
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
