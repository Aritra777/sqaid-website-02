import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Brand from "@/components/ui/Brand";
import Button from "@/components/ui/Button";
import ThemeToggle from "./ThemeToggle";
import type { ThemeMode } from "@/lib/use-theme";
import { cn } from "@/lib/cn";
import styles from "./Nav.module.css";

type NavProps = {
  theme: ThemeMode;
  onToggleTheme: () => void;
};

/**
 * Nav — sticky top navigation. Placeholder mega-menus for Solutions / Products
 * / Industries are wired as simple links for now (TODO: dropdown panels).
 */
const LINKS = [
  { label: "Products", to: "/products/faro" },
  { label: "Solutions", to: "/solutions/transaction-monitoring" },
  { label: "Industries", to: "/industries/fintech" },
  { label: "Company", to: "/company" },
];

export default function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(styles.nav, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        <Brand />

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(styles.link, isActive && styles.active)
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Button to="/#contact" className={styles.cta}>
            Request a Demo
          </Button>
          <button
            className={styles.burger}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobilePanel}>
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Button to="/#contact" className={styles.mobileCta}>
            Request a Demo
          </Button>
        </div>
      )}
    </header>
  );
}
