import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import GridBackdrop from "@/components/graphics/GridBackdrop";
import { useDocumentTitle } from "@/lib/use-document-title";
import styles from "./NotFound.module.css";

/** NotFound — 404 fallback. */
export default function NotFound() {
  useDocumentTitle("Not Found");
  return (
    <section className={styles.wrap}>
      <GridBackdrop />
      <Container className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>This page took a different path.</h1>
        <p className={styles.sub}>
          The page you're looking for doesn't exist or has moved.
        </p>
        <Button to="/">Back to home →</Button>
      </Container>
    </section>
  );
}
