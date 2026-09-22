import { Link } from "react-router-dom";
import Brand from "@/components/ui/Brand";
import { products } from "@/content/products";
import { solutions } from "@/content/solutions";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container container--wide ${styles.grid}`}>
        <div className={styles.brandCol}>
          <Brand />
          <p className={styles.tagline}>
            Your data. Your risk.
            <br />
            One connected view.
          </p>
          <a href={`mailto:${SITE.email}`} className={styles.email}>
            {SITE.email}
          </a>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Products</h4>
          {products.map((p) => (
            <Link
              key={p.slug}
              to={`/products/${p.slug}`}
              className={styles.link}
            >
              {p.name}
            </Link>
          ))}
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Explore</h4>
          <Link to="/platform" className={styles.link}>
            Platform architecture
          </Link>
          {solutions.map((v) => (
            <Link
              key={v.slug}
              to={`/solutions/${v.slug}`}
              className={styles.link}
            >
              {v.name}
            </Link>
          ))}
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <Link to="/company" className={styles.link}>
            About SqAId
          </Link>
          <Link to="/company/careers" className={styles.link}>
            Careers
          </Link>
          <Link to="/contact" className={styles.link}>
            Contact
          </Link>
          <Link to="/contact?product=Privacy%20inquiry" className={styles.link}>
            Privacy inquiries
          </Link>
        </div>
      </div>
      <div className={`container container--wide ${styles.bottom}`}>
        <span>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </span>
        <span className={styles.mono}>CONNECTED DATA & RISK INTELLIGENCE</span>
      </div>
    </footer>
  );
}
