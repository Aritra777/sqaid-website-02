import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import Brand from "@/components/ui/Brand";
import Button from "@/components/ui/Button";
import ThemeToggle from "./ThemeToggle";
import type { ThemeMode } from "@/lib/use-theme";
import { PRODUCTS } from "@/lib/nav-data";
import { getIcon } from "@/lib/icons";
import styles from "./Nav.module.css";

export default function Nav({ theme, onToggleTheme }: { theme: ThemeMode; onToggleTheme: () => void }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => { setProductsOpen(false); setCompanyOpen(false); setMobileOpen(false); }, [location.pathname, location.hash]);
  useEffect(() => {
    const close = (event: PointerEvent) => { if (root.current && !root.current.contains(event.target as Node)) setProductsOpen(false); };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, []);

  const closeAll = () => { setProductsOpen(false); setCompanyOpen(false); setMobileOpen(false); };

  return (
    <header ref={root} className={styles.nav}>
      <div className={styles.inner}>
        <Brand />
        <nav className={styles.links} aria-label="Primary">
          <button className={styles.trigger} onClick={() => setProductsOpen((v) => !v)} aria-expanded={productsOpen}>
            Products <ChevronDown size={14} className={productsOpen ? styles.chevronOpen : ""} />
          </button>
          <Link to="/#platform" onClick={closeAll}>Platform</Link>
          <button className={styles.trigger} onClick={() => setCompanyOpen((v) => !v)} aria-expanded={companyOpen}>
            Company <ChevronDown size={14} className={companyOpen ? styles.chevronOpen : ""} />
          </button>
        </nav>
        <div className={styles.actions}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Button to="/#contact" className={styles.cta}>Request a Demo</Button>
          <button className={styles.burger} aria-label="Toggle menu" onClick={() => setMobileOpen((v) => !v)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </div>

      {productsOpen && (
        <div className={styles.dropdown}>
          <div className={styles.productGrid}>
            {PRODUCTS.map((product) => {
              const Icon = getIcon(product.icon);
              return <Link key={product.slug} to={`/products/${product.slug}`} onClick={closeAll} className={styles.productLink}>
                <span><Icon size={18} /></span><div><strong>{product.name}</strong><small>{product.tagline}</small></div>
              </Link>;
            })}
          </div>
        </div>
      )}

      {companyOpen && (
        <div className={styles.dropdown}>
          <div className={styles.companyGrid}>
            <Link to="/company" onClick={closeAll} className={styles.companyLink}><strong>Company</strong><small>Our story, principles & team</small></Link>
            <Link to="/company/careers" onClick={closeAll} className={styles.companyLink}><strong>Careers</strong><small>Join the team</small></Link>
          </div>
        </div>
      )}

      {mobileOpen && <div className={styles.mobilePanel}>
        {PRODUCTS.map((p) => <Link key={p.slug} to={`/products/${p.slug}`} onClick={closeAll}>{p.name}</Link>)}
        <Link to="/company" onClick={closeAll}>Company</Link>
        <Link to="/company/careers" onClick={closeAll}>Careers</Link>
      </div>}
    </header>
  );
}
