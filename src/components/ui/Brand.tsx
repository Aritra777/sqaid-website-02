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
      <span className={styles.glyph} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <rect
            x="2.5"
            y="2.5"
            width="19"
            height="19"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="8.5" cy="8.5" r="1.8" fill="currentColor" />
          <circle cx="15.5" cy="15.5" r="1.8" fill="currentColor" />
          <path
            d="M8.5 8.5 L15.5 15.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      </span>
      <span className={styles.word}>
        Sq<span className={styles.ai}>AI</span>d
      </span>
    </Link>
  );
}
