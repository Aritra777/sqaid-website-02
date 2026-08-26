import { Link } from "react-router-dom";
import Brand from "@/components/ui/Brand";
import { PRODUCTS } from "@/lib/nav-data";
import { SITE, SOCIALS } from "@/lib/site";
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
          <h4 className={styles.colTitle}>Company</h4>
          <Link to="/company" className={styles.link}>
            About
          </Link>
          <a href={`mailto:${SITE.email}`} className={styles.link}>
            Contact
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.link}
          >
            LinkedIn
          </a>
          <a
            href={SOCIALS.x}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.link}
          >
            X
          </a>
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
