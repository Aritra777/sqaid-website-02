import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "./Carousel.module.css";

type CarouselProps = {
  children: ReactNode[];
  /** heading shown top-left of the control bar */
  label?: ReactNode;
  className?: string;
};

/**
 * Carousel — horizontal, drag-to-scroll track with snap + prev/next controls.
 * Draggable via pointer (Framer), scrollable via trackpad/wheel, and keyboard
 * accessible through the arrow buttons. Slide sizing is controlled by the CSS
 * `--slide-w` custom property so callers can theme width per usage.
 */
export default function Carousel({ children, label, className }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-slide]");
    const step = first ? first.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  return (
    <div className={cn(styles.carousel, className)}>
      <div className={styles.bar}>
        {label && <div className={styles.label}>{label}</div>}
        <div className={styles.controls}>
          <button
            className={styles.arrow}
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            aria-label="Previous"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className={styles.arrow}
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            aria-label="Next"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <motion.div ref={trackRef} className={styles.track}>
        {children.map((child, i) => (
          <div className={styles.slide} data-slide key={i}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
