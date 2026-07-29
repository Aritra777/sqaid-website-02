import { Moon, Sun } from "lucide-react";
import type { ThemeMode } from "@/lib/use-theme";
import styles from "./ThemeToggle.module.css";

/** ThemeToggle — light/dark switch driven by the useTheme hook in Layout. */
export default function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: ThemeMode;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
