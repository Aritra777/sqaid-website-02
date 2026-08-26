import Container from "./Container";
import { publishedMetrics } from "@/lib/metrics";
import styles from "./StatBand.module.css";

/**
 * StatBand — renders only metrics that have an actual basis.
 *
 * Ids resolve through lib/metrics.ts; anything still awaiting real data
 * (basis "customer" with no source) is filtered out, so an unsubstantiated
 * number cannot reach the page. If nothing in the list is publishable the
 * band renders nothing at all rather than showing an empty shell.
 */
export default function StatBand({ ids }: { ids: string[] }) {
  const metrics = publishedMetrics(ids);
  if (metrics.length === 0) return null;

  return (
    <section className={styles.band}>
      <Container>
        <dl className={styles.grid} data-count={metrics.length}>
          {metrics.map((m) => (
            <div key={m.id} className={styles.stat}>
              <dt className={styles.value}>
                {m.value}
                {m.unit && <span className={styles.unit}>{m.unit}</span>}
              </dt>
              <dd className={styles.label}>{m.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
