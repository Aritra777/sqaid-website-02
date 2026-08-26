import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { CUSTOMERS, ANALYST_RECOGNITION } from "@/lib/trust";
import styles from "./TrustSection.module.css";

/**
 * TrustSection — customer logos and third-party recognition.
 *
 * Renders nothing while lib/trust.ts is empty, so the site never shows an
 * empty shell or invented social proof. Populate CUSTOMERS or
 * ANALYST_RECOGNITION and the relevant half appears.
 */
export default function TrustSection() {
  const hasLogos = CUSTOMERS.length > 0;
  const hasAnalysts = ANALYST_RECOGNITION.length > 0;
  if (!hasLogos && !hasAnalysts) return null;

  return (
    <section className={styles.section}>
      <Container>
        {hasLogos && (
          <>
            <p className={styles.kicker}>Trusted by compliance teams at</p>
            <ul className={styles.logos}>
              {CUSTOMERS.map((c) => (
                <li key={c.name}>
                  <img src={c.logo} alt={c.name} className={styles.logo} loading="lazy" />
                </li>
              ))}
            </ul>
          </>
        )}

        {hasAnalysts && (
          <div className={styles.analysts}>
            <SectionHeading eyebrow="Recognition" title="Independently assessed" />
            <ul className={styles.analystList}>
              {ANALYST_RECOGNITION.map((a) => (
                <li key={a.program + a.year} className={styles.analyst}>
                  <span className={styles.program}>{a.program}</span>
                  <span className={styles.placement}>{a.placement}</span>
                  <span className={styles.year}>{a.year}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
