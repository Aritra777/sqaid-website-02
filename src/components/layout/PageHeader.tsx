import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import GridBackdrop from "@/components/graphics/GridBackdrop";
import { staggerParent, fadeUp } from "@/lib/motion";
import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode; // e.g. CTA buttons
};

/**
 * PageHeader — shared hero band for inner pages (products, solutions,
 * industries). Inherits the accent from whatever .theme-* wraps the page.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <GridBackdrop />
      <Container>
        <motion.div
          className={styles.inner}
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          {eyebrow && (
            <motion.div variants={fadeUp}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.h1 className={styles.title} variants={fadeUp}>
            {title}
          </motion.h1>
          {lede && (
            <motion.p className={styles.lede} variants={fadeUp}>
              {lede}
            </motion.p>
          )}
          {children && (
            <motion.div className={styles.actions} variants={fadeUp}>
              {children}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </header>
  );
}
