import { useEffect } from "react";
import { SITE } from "./site";

/**
 * Sets document.title as `Page — SqAId`. Pass the bare page name; pass
 * `null`/undefined on the landing page to use the brand default.
 */
export function useDocumentTitle(title?: string | null) {
  useEffect(() => {
    document.title = title
      ? `${title} — ${SITE.name}`
      : `${SITE.name} — ${SITE.tagline}`;
    return () => {
      document.title = `${SITE.name} — ${SITE.tagline}`;
    };
  }, [title]);
}
