/* ═══════════════════════════════════════════════════════════════════════
   FARO — DecisionTapeCTA.
   (1) Ambient live decision tape: looping scrolling rows of transaction
       decisions. HOLD/ESCALATE rows are accent-highlighted; APPROVE rows
       are muted.
   (2) Solid-accent CTA band: concentric-rings SVG + headline + two CTAs.
   Translated from the Tailwind reference — token system, CSS Modules, no
   hex / no shadows / no gradients.
   ═══════════════════════════════════════════════════════════════════════ */
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { SITE } from "@/lib/site";
import { decisionTape, type TapeRow } from "./data";
import { MonoLabel } from "./primitives";
import styles from "./DecisionTapeCTA.module.css";

/* Rings radii for the decorative corner graphic on the CTA band */
const RINGS = [70, 150, 230, 300];

/* ── TapeRowItem ── one transaction row in the scrolling tape ──────────── */
function TapeRowItem({ r }: { r: TapeRow }) {
  const hot = r.act === "HOLD" || r.act === "ESCALATE";
  return (
    <div className={styles.row}>
      <span className={styles.cellId}>{r.id}</span>
      <span className={styles.cellMuted}>{r.rail}</span>
      <span className={hot ? styles.cellHot : styles.cellMuted}>{r.act}</span>
      <span className={`${hot ? styles.cellHot : styles.cellMuted} ${styles.cellRight}`}>
        {r.score}
      </span>
    </div>
  );
}

/* ── DecisionTapeCTA ── default export ────────────────────────────────── */
export default function DecisionTapeCTA() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      {/* ── (1) Ambient decision tape ────────────────────────────────── */}
      <section
        data-testid="tape-section"
        className={styles.tapeSection}
      >
        <Container size="wide">
          {/* eyebrow */}
          <div className={styles.eyebrowRow}>
            <span className={styles.dot} aria-hidden="true" />
            <MonoLabel tone="accent">LIVE DECISION TAPE</MonoLabel>
            <MonoLabel tone="muted">&nbsp;· EVERY TXN, EVERY RAIL</MonoLabel>
          </div>

          {/* framed panel */}
          <div className={styles.panel}>
            {/* sticky header row */}
            <div className={styles.headerRow}>
              {(["TXN", "RAIL", "DECISION", "SCORE"] as const).map((h, i) => (
                <MonoLabel
                  key={h}
                  className={i === 3 ? styles.headerCellRight : undefined}
                  style={{ opacity: 0.4, fontSize: 9 }}
                >
                  {h}
                </MonoLabel>
              ))}
            </div>

            {/* scrolling track — doubled list for seamless loop */}
            <div
              className={reduced ? styles.trackStatic : styles.track}
              aria-label="Live transaction decision feed"
            >
              {/* render twice for seamless CSS-loop */}
              {[0, 1].map((k) => (
                <div key={k} aria-hidden={k === 1 ? true : undefined}>
                  {decisionTape.map((r, i) => (
                    <TapeRowItem key={`${k}-${i}`} r={r} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── (2) Solid-accent CTA band ────────────────────────────────── */}
      <section
        data-testid="cta-section"
        className={styles.ctaSection}
      >
        {/* decorative concentric rings + crosshair, top-right corner */}
        <svg
          className={styles.rings}
          width="560"
          height="560"
          viewBox="0 0 560 560"
          aria-hidden="true"
        >
          {RINGS.map((r) => (
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

        <Container size="wide" className={styles.ctaInner}>
          <MonoLabel>BRING A TRANSACTION PROFILE</MonoLabel>

          <Reveal>
            <h2 className={styles.ctaTitle}>
              See it on your data.{" "}
              <span className={styles.ctaTitleBreak}>
                20 minutes on a transaction profile like yours.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className={styles.actions}>
              
                <Button
                  variant="primary"
                  size="lg"
                  className={styles.demoBtn}
                  href={`mailto:${SITE.email}?subject=Faro%20demo`}
                >
                  REQUEST A DEMO
                </Button>
              
              
                <Button
                  variant="outline"
                  size="lg"
                  className={styles.runBtn}
                  href={`mailto:${SITE.email}?subject=Faro%20run`}
                >
                  SEE IT RUN
                </Button>
              
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
