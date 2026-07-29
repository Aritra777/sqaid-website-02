import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import GridBackdrop from "@/components/graphics/GridBackdrop";
import { SITE } from "@/lib/site";
import styles from "./ContactCTA.module.css";

/** ContactCTA — closing conversion band with the primary demo CTA. */
export default function ContactCTA() {
  return (
    <section id="contact" className="section">
      <Container size="wide">
        <Reveal className={styles.panel}>
          <GridBackdrop className={styles.grid} />
          <div className={styles.content}>
            <h2 className={styles.title}>
              See SqAId on <em>your</em> data.
            </h2>
            <p className={styles.sub}>
              A 30-minute walkthrough on a live investigation — from alert intake
              to a SAR-ready narrative. No slideware.
            </p>
            <div className={styles.actions}>
              <Button href={`mailto:${SITE.email}`} size="lg">
                Request a Demo →
              </Button>
              <Button href={`mailto:${SITE.email}`} variant="outline" size="lg">
                Talk to Sales
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
