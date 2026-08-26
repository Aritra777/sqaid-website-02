import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "sqaid-theme";

function getInitial(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored === "dark" || stored === "light") return stored;
  // default to LIGHT; honor an explicit OS dark preference if the user
  // has not chosen for themselves.
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Site-wide light/dark mode (AXIS 1). Persists to localStorage and reflects
 * onto <html data-theme>. Accents are handled separately via .theme-* classes.
 */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return { theme, setTheme, toggle };
}
