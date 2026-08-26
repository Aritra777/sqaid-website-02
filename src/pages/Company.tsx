import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { getIcon } from "@/lib/icons";
import { PRODUCTS } from "@/lib/nav-data";
import { useDocumentTitle } from "@/lib/use-document-title";
import { fadeUp, inViewOnce, staggerParent } from "@/lib/motion";
import { SITE, SOCIALS } from "@/lib/site";
import { cn } from "@/lib/cn";
import styles from "./Company.module.css";

/* ── what the company believes, and what that forces in the product ── */
const PRINCIPLES = [
  {
    title: "Evidence over inference",
    body: "Every conclusion the platform reaches links to the records that produced it. If a claim cannot be traced to evidence, it does not belong in a regulatory filing.",
    icon: "FileClock",
  },
  {
    title: "The analyst decides",
    body: "Agents investigate, assemble, and recommend. Disposition stays with a person, because accountability cannot be delegated to a model.",
    icon: "Users",
  },
  {
    title: "Configurable beats bespoke",
    body: "Compliance policy changes faster than release cycles. Teams change workflows, rules, and schemas themselves — no vendor ticket, no six-week wait.",
    icon: "SlidersHorizontal",
  },
  {
    title: "One graph, not four silos",
    body: "Fraud, AML, sanctions, and cases share a single entity graph. The patterns that matter are the ones that cross those boundaries.",
    icon: "Network",
  },
  {
    title: "Prove it on real traffic",
    body: "Every deployment starts in shadow mode against live data. You see the numbers on your own book before anything changes a customer outcome.",
    icon: "Eye",
  },
  {
    title: "Built to be examined",
    body: "Audit lineage, model governance, and tuning evidence are produced as a by-product of running — not assembled the week before an exam.",
    icon: "ShieldCheck",
  },
];

/* ── how a deployment actually runs ── */
const APPROACH = [
  {
    title: "Scope",
    body: "We agree the segment, the rails, and the success metric before any integration work starts.",
  },
  {
    title: "Shadow",
    body: "The platform runs against your live traffic with no customer impact, producing a directly comparable set of numbers.",
  },
  {
    title: "Compare",
    body: "Alert volume, false-positive rate, and investigation time are measured against your existing controls.",
  },
  {
    title: "Migrate",
    body: "You move workloads over on your own schedule, with the previous system still in place until you decide otherwise.",
  },
];

export default function Company() {
  useDocumentTitle("Company");

  return (
    <>
      <PageHeader
        eyebrow="Company"
        title={
          <>
            Built by compliance & AI <em>practitioners.</em>
          </>
        }
        lede={`${SITE.name} exists because the people who built it spent years working alert queues, defending tuning decisions to examiners, and watching good analysts spend their days on noise.`}
      >
        <Button href={`mailto:${SITE.email}`} size="lg">
          Talk to us →
        </Button>
      </PageHeader>

      {/* ── mission ── */}
      <section className={cn("section", styles.missionSection)}>
        <Container size="wide">
          <div className={styles.missionGrid}>
            <Reveal className={styles.missionCopy}>
              <span className={styles.kicker}>Why we exist</span>
              <h2 className={styles.missionTitle}>
                Compliance teams are measured on the cases they close, and spend their day
                on the ones that were never suspicious.
              </h2>
            </Reveal>
            <Reveal className={styles.missionBody}>
              <p>
                The economics of financial-crime compliance are broken in a specific way.
                Detection systems are tuned to catch everything, which means most of what
                they surface is noise. Investigating that noise is slow, manual work — and
                because it is slow, teams raise thresholds until the volume fits the
                headcount they have. Detection coverage ends up set by staffing rather
                than by risk.
              </p>
              <p>
                That trade-off only exists because investigation is manual. Remove the
                manual assembly — the statements, the counterparty checks, the graph
                walking, the narrative drafting — and the trade-off disappears. Every
                alert can get a full workup, and the analyst spends their judgement where
                judgement is actually required.
              </p>
              <p>
                That is the whole thesis behind {SITE.name}: not to replace the compliance
                analyst, but to give them back the part of the job that needs a person.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── principles ── */}
      <section className={cn("section", styles.principlesSection)}>
        <Container size="wide">
          <SectionHeading
            eyebrow="Principles"
            title={
              <>
                What we will not <em>compromise on.</em>
              </>
            }
            lede="These are product constraints, not marketing values — each one rules something out."
          />
          <motion.div
            className={styles.principles}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            {PRINCIPLES.map((p) => {
              const Icon = getIcon(p.icon);
              return (
                <motion.div key={p.title} className={styles.principle} variants={fadeUp}>
                  <span className={styles.principleIcon}>
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p className={styles.principleBody}>{p.body}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ── approach ── */}
      <section className="section">
        <Container size="wide">
          <SectionHeading
            eyebrow="How we deploy"
            title={
              <>
                Nobody signs before they see the <em>numbers.</em>
              </>
            }
            lede="Every engagement runs the same way, because replacing a control you cannot yet trust is not a reasonable thing to ask."
          />
          <motion.ol
            className={styles.approach}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            {APPROACH.map((a, i) => (
              <motion.li key={a.title} className={styles.step} variants={fadeUp}>
                <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.stepTitle}>{a.title}</h3>
                <p className={styles.stepBody}>{a.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </Container>
      </section>

      {/* ── the platform ── */}
      <section className={cn("section", styles.platformSection)}>
        <Container size="wide">
          <SectionHeading eyebrow="What we build" title={<>The platform</>} />
          <div className={styles.products}>
            {PRODUCTS.map((p) => {
              const PIcon = getIcon(p.icon);
              const live = p.status === "live";
              const inner = (
                <>
                  <span className={styles.prodIcon}>
                    <PIcon size={18} strokeWidth={2} />
                  </span>
                  <span className={styles.prodBody}>
                    <span className={styles.prodName}>{p.name}</span>
                    <span className={styles.prodTag}>{p.tagline}</span>
                  </span>
                  {live ? (
                    <ArrowRight size={16} className={styles.prodArrow} />
                  ) : (
                    <span className={styles.prodSoon}>Soon</span>
                  )}
                </>
              );
              return live ? (
                <Link key={p.slug} to={`/products/${p.slug}`} className={cn(styles.prod, p.theme)}>
                  {inner}
                </Link>
              ) : (
                <div key={p.slug} className={cn(styles.prod, p.theme)}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── contact ── */}
      <section className={styles.contactSection}>
        <Container size="wide">
          <Reveal className={styles.contact}>
            <div>
              <h2 className={styles.contactTitle}>
                Talk to someone who has worked the <em>queue.</em>
              </h2>
              <p className={styles.contactBody}>
                Demos are run by people who have done the job, not by a script. Bring your
                hardest typology.
              </p>
            </div>
            <div className={styles.contactLinks}>
              <a href={`mailto:${SITE.email}`} className={styles.contactLink}>
                <Mail size={17} strokeWidth={2} />
                {SITE.email}
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.contactLink}
              >
                <Linkedin size={17} strokeWidth={2} />
                LinkedIn
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
