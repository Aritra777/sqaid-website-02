import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Brand from "@/components/ui/Brand";
import Button from "@/components/ui/Button";
import ThemeToggle from "./ThemeToggle";
import type { ThemeMode } from "@/lib/use-theme";
import { products } from "@/content/products";
import { productIcons } from "@/components/experience/Shared";
import styles from "./Nav.module.css";
export default function Nav({
  theme,
  onToggleTheme,
}: {
  theme: ThemeMode;
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const burger = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    setMobile(false);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const pointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpen(false);
        setMobile(false);
      }
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (open) trigger.current?.focus();
        if (mobile) burger.current?.focus();
        setOpen(false);
        setMobile(false);
      }
    };
    window.addEventListener("pointerdown", pointer);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("pointerdown", pointer);
      window.removeEventListener("keydown", key);
    };
  }, [open, mobile]);
  return (
    <header
      ref={root}
      className={styles.nav}
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
          setMobile(false);
        }
      }}
    >
      <div className={styles.inner}>
        <Brand />
        <nav className={styles.links} aria-label="Primary">
          <Link to="/platform">ARGUS platform</Link>
          <button
            ref={trigger}
            className={styles.trigger}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="product-menu"
          >
            Products
            <ChevronDown size={13} className={open ? styles.chevronOpen : ""} />
          </button>
          <Link to="/solutions">Use cases</Link>
          <Link to="/company">Company</Link>
          <Link to="/company/careers">Careers</Link>
        </nav>
        <div className={styles.actions}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Button to="/contact" className={styles.cta}>
            Request a demo
            <ArrowUpRight size={13} />
          </Button>
          <button
            ref={burger}
            className={styles.burger}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div id="product-menu" className={styles.dropdown}>
          <div className={styles.menuIntro}>
            <small>THE CONNECTED SUITE</small>
            <strong>
              Financial compliance.
              <br />
              One mission.
            </strong>
            <Link to="/platform">
              Explore the architecture
              <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className={styles.productGrid}>
            {[products[1], products[0], ...products.slice(2)].map((p) => {
              const Icon = productIcons[p.theme as keyof typeof productIcons];
              return (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className={`theme-${p.theme} ${styles.productLink}`}
                >
                  <span>
                    <Icon size={19} />
                  </span>
                  <div>
                    <strong>{p.name}</strong>
                    <small>{p.category}</small>
                  </div>
                  <ArrowUpRight size={13} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
      {mobile && (
        <nav
          id="mobile-menu"
          className={styles.mobilePanel}
          aria-label="Mobile navigation"
        >
          <Link to="/platform">ARGUS platform</Link>
          {[products[1], products[0], ...products.slice(2)].map((p) => (
            <Link key={p.slug} to={`/products/${p.slug}`}>
              {p.name}
            </Link>
          ))}
          <Link to="/solutions">Use cases & stories</Link>
          <Link to="/company">Company</Link>
          <Link to="/company/careers">Careers</Link>
          <Link to="/contact">Request a demo</Link>
        </nav>
      )}
    </header>
  );
}
