import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Brand from "@/components/ui/Brand";
import Button from "@/components/ui/Button";
import ThemeToggle from "./ThemeToggle";
import type { ThemeMode } from "@/lib/use-theme";
import { cn } from "@/lib/cn";
import { getIcon } from "@/lib/icons";
import { PRODUCTS, SOLUTIONS, INDUSTRIES } from "@/lib/nav-data";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import styles from "./Nav.module.css";

type NavProps = {
  theme: ThemeMode;
  onToggleTheme: () => void;
};

type MenuKey = "products" | "solutions" | "industries";

/** Top-level items. Items with a `menu` open a solid dropdown panel on hover /
 *  focus; `Company` is a plain link. */
const ITEMS: Array<{ label: string; to: string; menu?: MenuKey }> = [
  { label: "Products", to: "/products/faro", menu: "products" },
  { label: "Solutions", to: "/solutions/transaction-monitoring", menu: "solutions" },
  { label: "Industries", to: "/industries/fintech", menu: "industries" },
  { label: "Company", to: "/company" },
];

/* ── dropdown panels ─────────────────────────────────────────────────── */

function ProductsMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className={cn(styles.panel, styles.panelProducts)}>
      <div className={styles.productGrid}>
        {PRODUCTS.map((p) => {
          const Icon = getIcon(p.icon);
          const inner = (
            <>
              <span className={styles.productIcon}>
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <span className={styles.itemBody}>
                <span className={styles.itemTitle}>
                  {p.name}
                  {p.status === "soon" && <span className={styles.badge}>Soon</span>}
                </span>
                <span className={styles.itemDesc}>{p.tagline}</span>
              </span>
            </>
          );
          return p.disabled ? (
            <div key={p.slug} className={cn(styles.menuItem, styles.menuItemDisabled)}>
              {inner}
            </div>
          ) : (
            <Link
              key={p.slug}
              to={`/products/${p.slug}`}
              className={styles.menuItem}
              onClick={onNavigate}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SolutionsMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className={cn(styles.panel, styles.panelSolutions)}>
      <div className={styles.solutionsGrid}>
        {SOLUTIONS.map((domain) => (
          <div key={domain.name} className={styles.solutionCol}>
            <span className={styles.colHead}>
              <span className={styles.colDot} style={{ background: domain.color }} />
              {domain.name}
            </span>
            <ul className={styles.colList}>
              {domain.items.map((it) => {
                const Icon = getIcon(it.icon);
                return (
                  <li key={it.slug}>
                    <Link
                      to={`/solutions/${it.slug}`}
                      className={styles.menuItem}
                      onClick={onNavigate}
                    >
                      <span className={styles.itemIcon}>
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      <span className={styles.itemBody}>
                        <span className={styles.itemTitle}>{it.label}</span>
                        <span className={styles.itemDesc}>{it.description}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function IndustriesMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className={cn(styles.panel, styles.panelIndustries)}>
      <div className={styles.industryList}>
        {INDUSTRIES.map((it) => (
          <Link
            key={it.slug}
            to={`/industries/${it.slug}`}
            className={styles.menuItem}
            onClick={onNavigate}
          >
            <span className={styles.itemBody}>
              <span className={styles.itemTitle}>{it.label}</span>
              <span className={styles.itemDesc}>{it.blurb}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const reduced = usePrefersReducedMotion();
  const closeTimer = useRef<number | null>(null);
  const reopenBlockUntil = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close any open menu whenever the route changes (covers trigger clicks,
  // dropdown-item clicks, same-route clicks, and browser back/forward)
  useEffect(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    reopenBlockUntil.current = performance.now() + 400;
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // small close delay so moving between trigger and panel doesn't flicker
  const open = (key: MenuKey) => {
    // ignore hover-opens fired right after a programmatic close (e.g. the
    // synthetic mouseenter that re-fires on the trigger after a nav click) —
    // without this the panel reopens itself instead of staying closed
    if (performance.now() < reopenBlockUntil.current) return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };
  const closeNow = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    reopenBlockUntil.current = performance.now() + 400;
    setOpenMenu(null);
  };

  return (
    <header
      className={cn(styles.nav, (scrolled || openMenu) && styles.scrolled)}
      onMouseLeave={scheduleClose}
    >
      <div className={styles.inner}>
        <Brand />

        <nav className={styles.links} aria-label="Primary" onKeyDown={(e) => e.key === "Escape" && closeNow()}>
          {ITEMS.map((l) =>
            l.menu ? (
              <div
                key={l.label}
                className={styles.navItem}
                onMouseEnter={() => open(l.menu!)}
                onFocus={() => open(l.menu!)}
              >
                <NavLink
                  to={l.to}
                  onClick={closeNow}
                  className={({ isActive }) =>
                    cn(styles.link, styles.trigger, (isActive || openMenu === l.menu) && styles.active)
                  }
                  aria-expanded={openMenu === l.menu}
                  aria-haspopup="true"
                >
                  {l.label}
                  <ChevronDown
                    size={14}
                    className={cn(styles.chevron, openMenu === l.menu && styles.chevronOpen)}
                  />
                </NavLink>
              </div>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => cn(styles.link, isActive && styles.active)}
                onMouseEnter={scheduleClose}
              >
                {l.label}
              </NavLink>
            )
          )}
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

      {/* desktop dropdown row */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            className={styles.dropdownRow}
            onMouseEnter={() => open(openMenu)}
            onMouseLeave={scheduleClose}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0.15 : 0.2, ease: EASE_OUT }}
          >
            <div className={styles.dropdownInner}>
              {openMenu === "products" && <ProductsMenu onNavigate={closeNow} />}
              {openMenu === "solutions" && <SolutionsMenu onNavigate={closeNow} />}
              {openMenu === "industries" && <IndustriesMenu onNavigate={closeNow} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile panel */}
      {mobileOpen && (
        <div className={styles.mobilePanel}>
          {ITEMS.map((l) => (
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
