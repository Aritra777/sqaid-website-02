import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import styles from "./Brand.module.css";

/**
 * Brand — the SqAId wordmark + glyph. Placeholder glyph is an inline SVG so we
 * can drop in a final logo vector later without touching layout.
 */
export default function Brand({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn(styles.brand, className)} aria-label="SqAId — home">
      <img src="/assets/sqaid-logo.svg" alt="SqAId" className={styles.logo} />
    </Link>
  );
}
