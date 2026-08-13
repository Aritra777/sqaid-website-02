/* ═══════════════════════════════════════════════════════════════════════
   ARGUS — CTA. A solid-accent closing band (bg var(--accent), on-accent
   text). Decorative concentric circles + crosshair sit in the corner, drawn
   as hairline SVG strokes in var(--accent-contrast) at low opacity — no
   gradient, no glow. Two magnetic CTAs: a dark solid "REQUEST A DEMO" and an
   outlined "WATCH A RUN".
   ═══════════════════════════════════════════════════════════════════════ */
import Button from "@/components/ui/Button";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import { SITE } from "@/lib/site";
import { MonoLabel } from "./primitives";
import styles from "./Cta.module.css";

const RINGS = [60, 130, 200, 260];

export default function Cta() {
  return (
    <section className={styles.section}>
      {/* concentric decorative rings + crosshair */}
      <svg
        className={styles.rings}
        width="520"
        height="520"
        viewBox="0 0 520 520"
        aria-hidden="true"
      >
        {RINGS.map((r) => (
          <circle key={r} cx="260" cy="260" r={r} fill="none" stroke="currentColor" strokeWidth="1" />
        ))}
        <line x1="260" y1="0" x2="260" y2="520" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="260" x2="520" y2="260" stroke="currentColor" strokeWidth="1" />
      </svg>

      <Container size="wide" className={styles.inner}>
        <MonoLabel>BRING A REAL ALERT</MonoLabel>
        <Reveal>
          <h2 className={styles.title}>
            We&apos;ll show you the full investigation, alert to disposition, in 20 minutes.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className={styles.actions}>
            <Magnetic>
              <Button
                variant="primary"
                size="lg"
                className={styles.demoBtn}
                href={`mailto:${SITE.email}?subject=Argus%20demo`}
              >
                REQUEST A DEMO
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button
                variant="outline"
                size="lg"
                className={styles.watchBtn}
                href={`mailto:${SITE.email}?subject=Argus%20run`}
              >
                WATCH A RUN
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
