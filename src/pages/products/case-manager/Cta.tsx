/* ═══════════════════════════════════════════════════════════════════════
   CASE MANAGER — Cta. Solid-violet closing band (bg var(--accent)).
   Typography and decoration are intentionally BLACK-on-violet — the
   inverse of a normal accent band — matching the reference design.
   Two decorative concentric-ring SVGs: top-right (large, 4 rings +
   crosshair) and bottom-left (smaller, 3 rings). Hairline strokes use a
   LOCAL space-separated channel `--on: 10 11 13` so `rgb(var(--on)/α)`
   is valid CSS (comma-separated channels → invisible).
   ═══════════════════════════════════════════════════════════════════════ */
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import { SITE } from "@/lib/site";
import { MonoLabel } from "./primitives";
import styles from "./Cta.module.css";

const RINGS_LG = [70, 150, 230, 300];
const RINGS_SM = [50, 110, 170];

export default function Cta() {
  return (
    <section className={styles.section} data-testid="case-manager-cta">
      {/* decorative rings + crosshair — top-right corner */}
      <svg
        className={styles.ringsTopRight}
        width="560"
        height="560"
        viewBox="0 0 560 560"
        aria-hidden="true"
      >
        {RINGS_LG.map((r) => (
          <circle
            key={r}
            cx="280"
            cy="280"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
        <line x1="280" y1="0" x2="280" y2="560" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="280" x2="560" y2="280" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* decorative rings — bottom-left corner */}
      <svg
        className={styles.ringsBottomLeft}
        width="360"
        height="360"
        viewBox="0 0 360 360"
        aria-hidden="true"
      >
        {RINGS_SM.map((r) => (
          <circle
            key={r}
            cx="180"
            cy="180"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>

      <Container size="wide" className={styles.inner}>
        <MonoLabel>CONFIGURE, DON&apos;T REDEPLOY</MonoLabel>

        <Reveal>
          <h2 className={styles.title}>
            Stop redeploying for every alert type. Configure it instead.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className={styles.lead}>
            Twenty minutes on your alert types, your workflow and your permission
            model — live, audited, and yours to reconfigure whenever the rules change.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className={styles.actions}>
            
              <Button
                variant="primary"
                size="lg"
                className={styles.demoBtn}
                href={`mailto:${SITE.email}?subject=Case%20Manager%20demo`}
              >
                REQUEST A DEMO
              </Button>
            
            
              <Button
                variant="outline"
                size="lg"
                className={styles.tryBtn}
                href={`mailto:${SITE.email}?subject=Case%20Manager%20trial`}
              >
                TRY IN THE PRODUCT
              </Button>
            
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
