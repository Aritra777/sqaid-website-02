import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to top on route change (but not on in-page hash navigation).
 * Sits inside the Router.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let cancelled = false;
      const scrollToTarget = () => {
        if (cancelled) return;
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      // Hash targets on lazy routes mount after the URL has already changed.
      // Retry across the first few render frames so cross-page CTAs reliably land.
      const frame = requestAnimationFrame(scrollToTarget);
      const timers = [100, 300, 700].map((delay) => window.setTimeout(scrollToTarget, delay));
      return () => {
        cancelled = true;
        cancelAnimationFrame(frame);
        timers.forEach(window.clearTimeout);
      };
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
