import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BellRing,
  FileSpreadsheet,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import Carousel from "@/components/ui/Carousel";
import { fadeUp, inViewOnce, staggerParent } from "@/lib/motion";
import { useDocumentTitle } from "@/lib/use-document-title";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import styles from "./AbacusPage.module.css";

/* ─────────────────────────────── content ─────────────────────────────── */

const CAPABILITIES = [
  {
    icon: LayoutDashboard,
    title: "Cross-product dashboards",
    body: "One pane over Faro, Argus, and Case Manager — every alert, case, and decision on the SqAId platform, in a single view.",
  },
  {
    icon: TrendingUp,
    title: "Trend & velocity analytics",
    body: "Trend, velocity, and benchmark analytics that surface how risk and throughput move over time — not just where they sit today.",
  },
  {
    icon: FileSpreadsheet,
    title: "Regulator-ready reporting",
    body: "Scheduled exports and audit-ready reports, generated automatically and formatted the way your examiners expect them.",
  },
  {
    icon: Activity,
    title: "Model & rule monitoring",
    body: "Watch model drift, rule hit-rates, and false-positive suppression across the platform — so performance never silently degrades.",
  },
];

/* metrics-guard:mock-ui — these are FAKE numbers rendered inside a product
   mockup, not claims about outcomes. The panel is visibly badged "Sample data"
   below so a visitor cannot mistake them for real figures. Do not copy any of
   these into marketing copy; real numbers belong in lib/metrics.ts. */
const MOCK_DASHBOARD_TILES = [
  { label: "Alerts triaged", value: "128k", note: "+18% MoM", spark: [8, 12, 10, 16, 14, 22, 26] },
  { label: "Cross-product coverage", value: "4/4", note: "all products", spark: [10, 10, 12, 12, 14, 14, 16] },
  { label: "False positives", value: "−61%", note: "suppressed", spark: [24, 20, 22, 16, 14, 10, 8] },
  { label: "SAR cycle time", value: "3.4d", note: "−1.2d QoQ", spark: [22, 20, 18, 17, 14, 13, 11] },
  { label: "Model drift", value: "Stable", note: "within band", spark: [14, 13, 15, 14, 15, 14, 14] },
  { label: "Reports scheduled", value: "42", note: "auto-filed", spark: [6, 10, 14, 18, 24, 30, 38] },
];

const META = [
  { label: "Status", value: "In active development" },
  { label: "Availability", value: "Public details soon" },
  { label: "Updates", value: `Email ${SITE.email} to be notified` },
];

/** Boards teams will assemble in Abacus — illustrative previews. */
const BOARDS = [
  { tag: "Fraud", name: "Fraud overview", body: "Approve/hold rates, loss avoided, and channel mix across every Faro decision.", spark: [10, 14, 12, 18, 16, 22, 26] },
  { tag: "AML", name: "AML risk board", body: "Alert volumes, SAR conversion, and typology breakdowns from Argus investigations.", spark: [8, 12, 16, 14, 20, 24, 28] },
  { tag: "Ops", name: "Case throughput", body: "Queue depth, cycle time, and SLA adherence across the Case Manager lifecycle.", spark: [26, 22, 20, 18, 15, 13, 11] },
  { tag: "Models", name: "Model performance", body: "Drift, precision/recall, and false-positive suppression per model and rule.", spark: [14, 15, 13, 16, 14, 15, 14] },
  { tag: "Reporting", name: "Regulatory pack", body: "Scheduled, audit-ready exports formatted the way your examiners expect.", spark: [6, 10, 15, 19, 24, 30, 36] },
  { tag: "Exec", name: "Executive summary", body: "One board that rolls the whole platform up for leadership and the board.", spark: [12, 16, 14, 20, 22, 26, 30] },
];


/* ───────────────────────────── sparkline ─────────────────────────────── */

function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = 100 / (points.length - 1);
  const d = points
    .map((p, i) => {
      const x = i * step;
      const y = 28 - ((p - min) / range) * 24 - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg className={styles.spark} viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/* ─────────────────────── hero right-half data viz ────────────────────── */

function DataViz() {
  return (
    <div className={styles.viz} aria-hidden="true">
      
        <svg className={styles.bars} viewBox="0 0 260 200">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const h = [70, 110, 90, 150, 120, 180, 140, 200][i];
            return (
              <rect
                key={i}
                x={8 + i * 32}
                y={200 - h}
                width="18"
                height={h}
                rx="3"
                opacity={0.35 + i * 0.08}
              />
            );
          })}
        </svg>
      
      
        <svg className={styles.line} viewBox="0 0 260 120">
          <path d="M4 96 L40 78 L76 86 L112 54 L148 62 L184 30 L220 40 L256 12" />
          {[
            [40, 78],
            [112, 54],
            [184, 30],
            [256, 12],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="4" />
          ))}
        </svg>
      
    </div>
  );
}

/* ─────────────────────────────────  page  ─────────────────────────────── */

export default function AbacusPage() {
  useDocumentTitle("Abacus · Cross-product analytics & reporting");

  return (
    <div className={cn("theme-abacus", styles.page)}>
      {/* ══ HERO · diagonal split ══ */}
      <section className={styles.hero}>
        {/* the light wedge — inverted half, clipped diagonally */}
        <div className={cn(styles.wedge, "invert")} aria-hidden="true" />

        <Container size="wide" className={styles.heroGrid}>
          <motion.div
            className={styles.heroCopy}
            variants={staggerParent}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp} className={styles.badgeRow}>
              <Badge tone="soon">Coming soon</Badge>
              <Eyebrow>Abacus · Analytics &amp; reporting</Eyebrow>
            </motion.div>
            <motion.h1 className={styles.h1} variants={fadeUp}>
              Cross-product analytics,
              <br />
              <em>taking shape.</em>
            </motion.h1>
            <motion.p className={styles.sub} variants={fadeUp}>
              Abacus is the analytics layer for the whole SqAId platform — one
              place to surface trends, benchmark performance, and build the
              compliance dashboards your regulators expect. We&apos;re finalising
              the details; here&apos;s where it&apos;s headed.
            </motion.p>
            <motion.div className={styles.actions} variants={fadeUp}>
              
                <Button
                  href={`mailto:${SITE.email}?subject=Abacus%20early%20access`}
                  size="lg"
                >
                  Notify me <BellRing size={17} />
                </Button>
              
              <Button href="#preview" variant="outline" size="lg">
                See the preview
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroViz}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <DataViz />
          </motion.div>
        </Container>
      </section>

      {/* ══ MARQUEE ══ */}
      <div className={styles.marqueeWrap}>
      </div>

      {/* ══ WHAT IT WILL DO ══ */}
      <section className="section">
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>What Abacus will do</Eyebrow>
            <h2 className={styles.h2}>
              The numbers behind <em>every product.</em>
            </h2>
            <p className={styles.lede}>
              Faro scores it, Argus investigates it, Case Manager resolves it —
              Abacus measures all of it, and turns the platform&apos;s activity
              into the reports and dashboards compliance leaders live in.
            </p>
          </div>

          <div className={styles.caps}>
            {CAPABILITIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.article
                  key={c.title}
                  className={styles.cap}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inViewOnce}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
                >
                  <span className={styles.capIcon}>
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className={styles.capTitle}>{c.title}</h3>
                  <p className={styles.capBody}>{c.body}</p>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ══ BOARDS · interactive carousel ══ */}
      <section className="section">
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>Boards you&apos;ll build</Eyebrow>
            <h2 className={styles.h2}>
              Assemble the view <em>your team runs on.</em>
            </h2>
            <p className={styles.lede}>
              Drag through a few of the boards Abacus will ship — each one drawn
              live from the platform. Figures are illustrative while it&apos;s in
              development.
            </p>
          </div>

          <Carousel className={styles.boards} label="Drag or use the arrows →">
            {BOARDS.map((b) => (
              <article key={b.name} className={styles.board}>
                <span className={styles.boardTag}>{b.tag}</span>
                <h3 className={styles.boardName}>{b.name}</h3>
                <p className={styles.boardBody}>{b.body}</p>
                <Sparkline points={b.spark} />
              </article>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* ══ PREVIEW · checkerboard of light/dark metric tiles ══ */}
      <section id="preview" className={cn("section", styles.previewSection)}>
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>Preview · illustrative</Eyebrow>
            <h2 className={styles.h2}>
              A glimpse of the <em>Abacus board.</em>
            </h2>
            <p className={styles.lede}>
              A sketch of the metrics Abacus will surface across the platform.
              Figures are illustrative while the product is in development.
            </p>
          </div>

          <p className={styles.sampleBadge}>
            <span aria-hidden="true">●</span> Sample data — illustrative mockup, not
            measured results
          </p>

          <div className={styles.checker}>
            {MOCK_DASHBOARD_TILES.map((m, i) => (
              <motion.div
                key={m.label}
                /* every other tile flips to the opposite mode → checkerboard */
                className={cn(styles.tile, i % 2 === 1 && "invert")}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={inViewOnce}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              >
                <span className={styles.tileLabel}>{m.label}</span>
                <span className={styles.tileValue}>{m.value}</span>
                <Sparkline points={m.spark} />
                <span className={styles.tileNote}>{m.note}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══ STATUS ══ */}
      <section className="section">
        <Container>
          <div className={styles.metaGrid}>
            {META.map((m) => (
              <div key={m.label} className={styles.metaCard}>
                <span className={styles.metaLabel}>{m.label}</span>
                <span className={styles.metaValue}>{m.value}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══ CTA ══ */}
      <section className="section">
        <Container>
          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7 }}
          >
            <svg className={styles.ctaGeo} viewBox="0 0 400 200" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <rect
                  key={i}
                  x={20 + i * 38}
                  y={200 - (30 + ((i * 37) % 150))}
                  width="16"
                  height={30 + ((i * 37) % 150)}
                  rx="3"
                />
              ))}
            </svg>
            <Eyebrow>Be first to know</Eyebrow>
            <h2 className={styles.ctaTitle}>
              Something new is taking shape.
              <br />
              <em>Get the early look.</em>
            </h2>
            <p className={styles.ctaLede}>
              Drop us a note and we&apos;ll reach out the moment Abacus is ready
              for a walkthrough.
            </p>
            <div className={styles.actions}>
              
                <Button
                  href={`mailto:${SITE.email}?subject=Abacus%20early%20access`}
                  size="lg"
                >
                  Notify me <ArrowRight size={18} />
                </Button>
              
              <Button to="/#products" variant="outline" size="lg">
                See the Platform
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
