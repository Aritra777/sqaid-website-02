import { SOLUTIONS } from "@/lib/nav-data";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import styles from "./SolutionsRoller.module.css";

type RollItem = {
  label: string;
  domain: string;
  icon: string;
  color: string;
};

// flatten solutions and tag each with its domain + palette color
const ITEMS: RollItem[] = SOLUTIONS.flatMap((d) =>
  d.items.map((it) => ({
    label: it.label,
    domain: d.name,
    icon: it.icon,
    color: d.color,
  }))
);

// split into columns; each column loops independently
const COL_A = ITEMS.filter((_, i) => i % 2 === 0);
const COL_B = ITEMS.filter((_, i) => i % 2 === 1);

function Card({ item }: { item: RollItem }) {
  const Icon = getIcon(item.icon);
  return (
    <div className={styles.card}>
      <span className={styles.icon} style={{ color: item.color }}>
        <Icon size={18} strokeWidth={2} />
      </span>
      <span className={styles.cardBody}>
        <span className={styles.cardLabel}>{item.label}</span>
        <span className={styles.cardDomain}>{item.domain}</span>
      </span>
    </div>
  );
}

/**
 * SolutionsRoller — two columns of solution cards looping vertically forever
 * (one up, one down). Real capabilities as a living "wall". CSS-animated;
 * content is duplicated for a seamless loop and the animation stops under
 * prefers-reduced-motion. Masked top/bottom so cards fade at the edges.
 */
export default function SolutionsRoller() {
  return (
    <div className={styles.roller} aria-hidden="true">
      <div className={styles.col}>
        <div className={cn(styles.colInner, styles.up)}>
          {[...COL_A, ...COL_A].map((it, i) => (
            <Card key={`a-${i}`} item={it} />
          ))}
        </div>
      </div>
      <div className={cn(styles.col, styles.colOffset)}>
        <div className={cn(styles.colInner, styles.down)}>
          {[...COL_B, ...COL_B].map((it, i) => (
            <Card key={`b-${i}`} item={it} />
          ))}
        </div>
      </div>
    </div>
  );
}
