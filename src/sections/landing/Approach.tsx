import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";
import styles from "./Approach.module.css";

/**
 * Approach — proof by process rather than by unverified statistic.
 *
 * The reference vendors put customer metrics here. Until real, sourced
 * figures exist (see lib/metrics.ts and lib/trust.ts), this section makes the
 * one claim that is verifiably true: nothing is asked for on trust, because
 * every deployment is measured against the incumbent on live traffic first.
 */
const STEPS = [
  {
    title: "Scope",
    body: "We agree the segment, the rails and the success metric before any integration work begins.",
  },
  {
    title: "Shadow",
    body: "The platform runs against your live traffic with no customer impact, producing a directly comparable set of numbers.",
  },
  {
    title: "Compare",
    body: "Alert volume, false-positive rate and investigation time are measured against your existing controls, on your own book.",
  },
  {
    title: "Migrate",
    body: "You move workloads across on your schedule, with the incumbent still in place until you decide otherwise.",
  },
];

export default function Approach() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="How we deploy"
          title="Nobody signs before they see the numbers"
          lede="Replacing a control you cannot yet trust is not a reasonable thing to ask, so every engagement is measured against your incumbent before anything moves."
        />
        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05} className={styles.step}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <div className={styles.actions}>
          <Button href={`mailto:${SITE.email}`} size="lg">
            Start a shadow run
          </Button>
          <Button to="/company" variant="ghost" size="lg">
            How we work <ArrowRight size={15} strokeWidth={2.2} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
