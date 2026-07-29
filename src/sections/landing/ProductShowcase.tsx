import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import { getIcon } from "@/lib/icons";
import { PRODUCTS, getProduct } from "@/lib/nav-data";
import { PRODUCT_CONTENT } from "@/lib/products-content";
import { fadeUp, inViewOnce, staggerParent } from "@/lib/motion";
import { cn } from "@/lib/cn";
import styles from "./ProductShowcase.module.css";

/**
 * ProductShowcase — a big "Our Products" title stays pinned behind while each
 * product card scrolls up and STACKS on top (sticky, increasing z-index), so
 * cards overlay the title and follow each other with no blank gaps. Each card
 * is split: a solid accent half (per theme) with the name + geometry parallax,
 * and a Features half revealed with stagger.
 */
export default function ProductShowcase() {
  return (
    <section id="products" className={styles.showcase}>
      {/* pinned title behind the stack */}
      <div className={styles.intro}>
        <Container size="wide" className={styles.introInner}>
          <Eyebrow>SqAId Product Suite</Eyebrow>
          <h2 className={styles.bigTitle}>
            Our <em>Products.</em>
          </h2>
          <p className={styles.introLede}>
            Four specialized products, one platform. Keep scrolling.
          </p>
        </Container>
      </div>

      {PRODUCTS.map((p, i) => (
        <ProductCard key={p.slug} slug={p.slug} index={i} />
      ))}
    </section>
  );
}

function ProductCard({ slug, index }: { slug: string; index: number }) {
  const product = getProduct(slug)!;
  const content = PRODUCT_CONTENT[slug];
  const Icon = getIcon(product.icon);
  const live = product.status === "live";

  return (
    // sticky DIRECT child of the section → previous card stays pinned while the
    // next one scrolls up and overlays it (increasing z-index)
    <div
      className={cn(styles.card, product.theme)}
      style={{ zIndex: index + 1 }}
    >
      {/* ── LEFT · solid accent half ── */}
      <div className={styles.accent}>
        <svg className={styles.circles} viewBox="0 0 400 400" aria-hidden="true">
          {[70, 130, 190].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} />
          ))}
          <line x1="200" y1="0" x2="200" y2="400" />
          <line x1="0" y1="200" x2="400" y2="200" />
        </svg>

        <span className={styles.ghostNum} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>

        <motion.div
            className={styles.accentInner}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            <motion.div className={styles.badge} variants={fadeUp}>
              <Icon size={16} strokeWidth={2} />
              {content.category}
            </motion.div>
            <motion.h3 className={styles.name} variants={fadeUp}>
              {product.name}
            </motion.h3>
            <motion.p className={styles.tagline} variants={fadeUp}>
              {product.tagline}
            </motion.p>
            <motion.p className={styles.desc} variants={fadeUp}>
              {content.description}
            </motion.p>
            <motion.div variants={fadeUp}>
              {live ? (
                <Link to={`/products/${slug}`} className={styles.cta}>
                  Explore {product.name} →
                </Link>
              ) : (
                <Badge tone="soon">Coming soon</Badge>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT · features ── */}
        <div className={styles.features}>
          {content.image && (
            <div
              className={styles.featBg}
              style={{ backgroundImage: `url(${content.image})` }}
              aria-hidden="true"
            />
          )}
          <span className={styles.featLabel}>Key features</span>
          <motion.div
            className={styles.featGrid}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            {content.features.map((f, fi) => (
              <motion.div key={f} className={styles.feat} variants={fadeUp}>
                <span className={styles.featIcon}>
                  <Check size={15} strokeWidth={2.5} />
                </span>
                <span className={styles.featText}>{f}</span>
                <span className={styles.featNum}>
                  {String(fi + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
  );
}
