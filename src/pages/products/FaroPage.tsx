import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Antenna,
  ArrowRight,
  Bitcoin,
  Check,
  CreditCard,
  FileText,
  Gavel,
  Landmark,
  ListFilter,
  Radio,
  ScanLine,
  ScanSearch,
  Scale,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Waypoints,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Carousel from "@/components/ui/Carousel";
import Marquee from "@/components/motion/Marquee";
import Magnetic from "@/components/motion/Magnetic";
import Parallax from "@/components/motion/Parallax";
import { fadeUp, inViewOnce, staggerParent } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useDocumentTitle } from "@/lib/use-document-title";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import styles from "./FaroPage.module.css";

/* ─────────────────────────────── content ─────────────────────────────── */

const HERO_STATS = [
  { value: "Real-time", label: "Decisioning on every transaction" },
  { value: "1", label: "Platform — fraud & AML in one flow" },
  { value: "All", label: "Channels: cards · wires · ACH · SEPA · crypto" },
  { value: "24/7", label: "Continuous monitoring & coverage" },
];

const CAPABILITIES = [
  {
    icon: ShieldCheck,
    tag: "Detection",
    title: "Real-time fraud scoring",
    body: "Score every transaction the moment it happens — across cards, wires, ACH, SEPA, UPI, and crypto — and act before money moves.",
  },
  {
    icon: Waypoints,
    tag: "AML",
    title: "Anti-money-laundering, same flow",
    body: "Structuring, layering, rapid-fire transfers, sanctions exposure — all evaluated in the same pipeline that catches fraud, so nothing falls through the gaps.",
  },
  {
    icon: Sparkles,
    tag: "AI assist",
    title: "AI copilot for analysts",
    body: "Surface the why behind each alert, draft the investigation narrative, and recommend the next action — so reviews take minutes, not hours.",
  },
  {
    icon: Scale,
    tag: "Outcomes",
    title: "One decision, every time",
    body: "Many signals come in; a single consolidated verdict goes back to your downstream systems — with full evidence and a clear audit trail.",
  },
];

const STAGES = [
  { icon: Antenna, label: "01", title: "Ingest", body: "Connect transaction streams, customer records, and watchlists. New sources land in hours." },
  { icon: ScanSearch, label: "02", title: "Detect", body: "Rules, ML models, and graph intelligence score each event for fraud and AML risk together." },
  { icon: ListFilter, label: "03", title: "Triage", body: "Alerts are deduplicated, ranked, and grouped into cases — analysts work signal, not noise." },
  { icon: Gavel, label: "04", title: "Decide", body: "Signals converge into a single explainable verdict — approve, hold, escalate — in real time." },
  { icon: FileText, label: "05", title: "Report", body: "Dashboards, compliance reports, and full audit lineage for every decision, ready on demand." },
];

const VERDICT_POINTS = [
  { b: "One number", t: "every transaction gets a single, explainable risk score" },
  { b: "Full evidence", t: "every contributing signal is captured and replayable" },
  { b: "Audit lineage", t: "from raw event to final decision, end to end" },
  { b: "Built for change", t: "new detection logic deploys without disrupting the rest" },
];

const CHANNELS = [
  { icon: CreditCard, name: "Card payments", body: "Authorization-time scoring on debit and credit rails, before the transaction settles." },
  { icon: Landmark, name: "Wires & RTGS", body: "High-value wire and SWIFT flows screened for structuring and sanctions exposure in-flight." },
  { icon: Radio, name: "ACH & SEPA", body: "Batch and instant credit transfers monitored for mule activity and velocity anomalies." },
  { icon: Smartphone, name: "UPI & instant", body: "Sub-second decisioning for real-time rails where money moves the moment it's approved." },
  { icon: Bitcoin, name: "Crypto & wallets", body: "On-chain and off-ramp activity tied back to the customer graph for end-to-end tracing." },
  { icon: ScanLine, name: "Sanctions screening", body: "Every counterparty screened against global watchlists with zero-miss fuzzy matching." },
];

const MARQUEE_TAGS = [
  "Cards", "Wires", "ACH", "SEPA", "UPI", "Crypto", "SWIFT", "RTP",
  "Sanctions", "Structuring", "Layering", "Device risk",
];

/* ───────────────────────── hero right-half visual ─────────────────────── */

function HeroViz() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={styles.viz} aria-hidden="true">
      {/* dot-grid backdrop (no radar) */}
      <div className={styles.vizGrid} />

      {/* screenshot panel */}
      <Parallax speed={reduced ? 0 : 22} className={styles.vizShotWrap}>
        <figure className={styles.shotChip}>
          <span className={styles.shotChrome}>
            <i /> <i /> <i />
            <em>app.sqaid.ai / faro</em>
          </span>
          <img src="/assets/products/faro.png" alt="" loading="lazy" />
        </figure>
      </Parallax>

      {/* floating verdict card */}
      <Parallax speed={reduced ? 0 : -30} className={styles.vizCardWrap}>
        <div className={styles.verdictCard}>
          <div className={styles.vcTop}>
            <span className={styles.vcLabel}>Live risk score</span>
            <span className={styles.vcPill}>● HOLD</span>
          </div>
          <div className={styles.vcScore}>
            0.98<span>/1.00</span>
          </div>
          <ul className={styles.vcSignals}>
            {[
              ["Velocity", 0.92],
              ["Sanctions proximity", 0.74],
              ["Device anomaly", 0.61],
            ].map(([name, v]) => (
              <li key={name as string}>
                <span className={styles.vcSigName}>{name}</span>
                <span className={styles.vcBar}>
                  <span style={{ width: `${(v as number) * 100}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Parallax>
    </div>
  );
}

/* ───────────────────────────── pipeline rail ─────────────────────────── */

function PipelineRail() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={styles.rail}>
      <div className={styles.railTrack} aria-hidden="true">
        <motion.span
          className={styles.railFill}
          style={reduced ? { width: "100%" } : { width: fill }}
        />
      </div>
      <ol className={styles.stages}>
        {STAGES.map((s) => {
          const Icon = s.icon;
          return (
            <motion.li
              key={s.label}
              className={styles.stage}
              variants={fadeUp}
            >
              <span className={styles.stagePip} aria-hidden="true" />
              <span className={styles.stageNum}>{s.label}</span>
              <span className={styles.stageIcon}>
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className={styles.stageTitle}>{s.title}</h3>
              <p className={styles.stageBody}>{s.body}</p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

/* ─────────────────────────────────  page  ─────────────────────────────── */

export default function FaroPage() {
  useDocumentTitle("Faro · Real-time fraud & AML platform");

  return (
    <div className={cn("theme-faro", styles.page)}>
      {/* ══ HERO · vertical split-screen ══ */}
      <section className={styles.hero}>
        <div className={styles.split}>
          {/* LEFT — messaging (default surface) */}
          <div className={styles.left}>
            <motion.div
              className={styles.leftInner}
              variants={staggerParent}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>Faro · Real-time fraud &amp; AML</Eyebrow>
              </motion.div>
              <motion.h1 className={styles.h1} variants={fadeUp}>
                Catch the fraud.
                <br />
                <em>Stop the laundering.</em>
                <br />
                In real time.
              </motion.h1>
              <motion.p className={styles.sub} variants={fadeUp}>
                Faro brings <b>fraud detection and anti-money-laundering into a
                single real-time platform</b> — so every transaction is scored,
                every alert is investigated, and every decision ships back to
                your systems with full evidence and lineage.
              </motion.p>
              <motion.div className={styles.actions} variants={fadeUp}>
                <Magnetic>
                  <Button href={`mailto:${SITE.email}?subject=Faro%20demo`} size="lg">
                    Request a Demo <ArrowRight size={18} />
                  </Button>
                </Magnetic>
                <Button href="#capabilities" variant="outline" size="lg">
                  What it does
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — inverted (light) showcase half */}
          <div className={cn(styles.right, "invert")}>
            <span className={styles.rightTag}>signal → verdict</span>
            <HeroViz />
          </div>
        </div>
      </section>

      {/* stats baseline (full width) */}
      <div className={styles.statsBand}>
        <Container size="wide">
          <motion.ul
            className={styles.stats}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            {HERO_STATS.map((s) => (
              <motion.li key={s.label} className={styles.stat} variants={fadeUp}>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </div>

      {/* ══ MARQUEE · coverage keywords ══ */}
      <div className={styles.marqueeWrap}>
        <Marquee duration={32}>
          {MARQUEE_TAGS.map((t) => (
            <span key={t} className={styles.marqueeItem}>
              {t}
              <span className={styles.marqueeDot} />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ══ CAPABILITIES · bento with parallax columns ══ */}
      <section id="capabilities" className="section">
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>What Faro does</Eyebrow>
            <h2 className={styles.h2}>
              Fraud and AML, <em>finally in the same flow.</em>
            </h2>
            <p className={styles.lede}>
              Most institutions run fraud and AML on two stacks, two teams,
              looking at the same customer. Faro brings them together — so the
              signals compound instead of conflict.
            </p>
          </div>

          <div className={styles.bento}>
            {CAPABILITIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <Parallax
                  key={c.title}
                  speed={i % 2 === 0 ? 26 : -18}
                  className={styles.bentoCol}
                >
                  <motion.article
                    className={styles.cap}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inViewOnce}
                    transition={{ duration: 0.7, delay: (i % 2) * 0.08 }}
                  >
                    <span className={styles.capIcon}>
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span className={styles.capTag}>{c.tag}</span>
                    <h3 className={styles.capTitle}>{c.title}</h3>
                    <p className={styles.capBody}>{c.body}</p>
                  </motion.article>
                </Parallax>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ══ CHANNELS · interactive carousel ══ */}
      <section className="section">
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>Every rail, one score</Eyebrow>
            <h2 className={styles.h2}>
              Wherever money moves, <em>Faro is there.</em>
            </h2>
            <p className={styles.lede}>
              One scoring engine across every channel — so cross-rail structuring
              that hides between systems has nowhere left to hide.
            </p>
          </div>

          <Carousel className={styles.channels} label="Drag or use the arrows →">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              return (
                <article key={c.name} className={styles.channel}>
                  <span className={styles.channelIcon}>
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className={styles.channelName}>{c.name}</h3>
                  <p className={styles.channelBody}>{c.body}</p>
                </article>
              );
            })}
          </Carousel>
        </Container>
      </section>

      {/* ══ HOW IT WORKS · light inverted band, pipeline rail ══ */}
      <section className={cn("section", styles.pipe, "invert")}>
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>How it works</Eyebrow>
            <h2 className={styles.h2}>
              Five stages. <em>One platform.</em>
            </h2>
            <p className={styles.lede}>
              From the moment a transaction lands to the moment a verdict reaches
              your downstream systems — one platform, one decision, one audit
              trail.
            </p>
          </div>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={inViewOnce}
          >
            <PipelineRail />
          </motion.div>
        </Container>
      </section>

      {/* ══ ONE VERDICT · screenshot + checklist ══ */}
      <section className="section">
        <Container size="wide">
          <div className={styles.verdict}>
            <Parallax speed={30} className={styles.verdictMedia}>
              <figure className={styles.frame}>
                <span className={styles.frameChrome}>
                  <i /> <i /> <i />
                  <em>app.sqaid.ai / faro / verdict</em>
                  <b>● Live</b>
                </span>
                <img
                  src="/assets/products/faro.png"
                  alt="Faro verdict view — consolidated risk decision with evidence"
                  loading="lazy"
                />
              </figure>
            </Parallax>

            <motion.div
              className={styles.verdictCopy}
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>One decision, full evidence</Eyebrow>
              </motion.div>
              <motion.h2 className={styles.h2} variants={fadeUp}>
                Many signals. <em>One verdict.</em>
              </motion.h2>
              <motion.p className={styles.lede} variants={fadeUp}>
                Rules, ML models, graph analysis, and the AI copilot each read a
                transaction from a different angle. Faro consolidates their views
                into a single verdict — and ships it downstream with the full
                evidence package attached.
              </motion.p>
              <motion.ul className={styles.checklist} variants={fadeUp}>
                {VERDICT_POINTS.map((p) => (
                  <li key={p.b}>
                    <span className={styles.checkMark}>
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>
                      <b>{p.b}</b> — {p.t}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
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
            <svg className={styles.ctaGeo} viewBox="0 0 400 400" aria-hidden="true">
              {[70, 130, 190].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} />
              ))}
            </svg>
            <Eyebrow>Get started</Eyebrow>
            <h2 className={styles.ctaTitle}>
              Bring fraud and AML together.
              <br />
              <em>See it on your data.</em>
            </h2>
            <p className={styles.ctaLede}>
              Twenty minutes — we&apos;ll walk you through Faro on a transaction
              profile that looks like yours.
            </p>
            <div className={styles.actions}>
              <Magnetic>
                <Button href={`mailto:${SITE.email}?subject=Faro%20demo`} size="lg">
                  Request a Demo <ArrowRight size={18} />
                </Button>
              </Magnetic>
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
