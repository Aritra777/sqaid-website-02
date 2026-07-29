import { Link } from "react-router-dom";
import Brand from "@/components/ui/Brand";
import { PRODUCTS, SOLUTIONS, INDUSTRIES } from "@/lib/nav-data";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.css";

/** Footer — sitemap + brand. Content-driven from nav-data. */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <Brand />
          <p className={styles.tagline}>{SITE.tagline}</p>
          <a href={`mailto:${SITE.email}`} className={styles.email}>
            {SITE.email}
          </a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Products</h4>
          {PRODUCTS.map((p) => (
            <Link key={p.slug} to={`/products/${p.slug}`} className={styles.link}>
              {p.name}
            </Link>
          ))}
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Solutions</h4>
          {SOLUTIONS.flatMap((d) => d.items)
            .slice(0, 6)
            .map((s) => (
              <Link
                key={s.slug}
                to={`/solutions/${s.slug}`}
                className={styles.link}
              >
                {s.label}
              </Link>
            ))}
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Industries</h4>
          {INDUSTRIES.map((i) => (
            <Link
              key={i.slug}
              to={`/industries/${i.slug}`}
              className={styles.link}
            >
              {i.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </span>
        <span className={styles.mono}>{SITE.domain}</span>
      </div>
    </footer>
  );
}
