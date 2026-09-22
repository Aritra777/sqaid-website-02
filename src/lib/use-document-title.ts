import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "./site";
export function useDocumentTitle(title?: string | null, description?: string) {
  const { pathname } = useLocation();
  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${SITE.name}`
      : `${SITE.name} — ${SITE.tagline}`;
    const text = description || SITE.description;
    document.title = fullTitle;
    const meta = (name: string, content: string, property = false) => {
      const key = property ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(
        `meta[${key}="${name}"]`,
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(key, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    meta("description", text);
    meta("og:title", fullTitle, true);
    meta("og:description", text, true);
    meta("og:url", `${SITE.url}${pathname}`, true);
    meta("og:type", "website", true);
    meta("og:image", `${SITE.url}/social-preview.png`, true);
    meta("twitter:card", "summary_large_image");
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE.url}${pathname}`;
  }, [title, description, pathname]);
}
