import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Eyebrow from "./Eyebrow";
import Reveal from "@/components/motion/Reveal";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * SectionHeading — standard eyebrow + title + lede block used to open sections.
 * Animates in on scroll via Reveal.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn(styles.head, styles[align], className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={styles.title}>{title}</h2>
      {lede && <p className={styles.lede}>{lede}</p>}
    </Reveal>
  );
}
