import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to top on route change (but not on in-page hash navigation).
 * Sits inside the Router.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // let anchor links scroll to their target
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
