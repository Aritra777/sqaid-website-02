import { motion } from "framer-motion";
import {
  ArrowRight,
  FileCheck2,
  GitBranch,
  Network,
  Workflow as WorkflowIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Carousel from "@/components/ui/Carousel";
import Marquee from "@/components/motion/Marquee";
import Magnetic from "@/components/motion/Magnetic";
import Parallax from "@/components/motion/Parallax";
import { fadeUp, inViewOnce, staggerParent } from "@/lib/motion";
import { useDocumentTitle } from "@/lib/use-document-title";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import styles from "./ArgusPage.module.css";

/* ─────────────────────────────── content ─────────────────────────────── */

const HERO_STATS = [
  { value: "50+", label: "Production detection rules" },
  { value: "Custom", label: "Configurable agent fleet" },
  { value: "<5ms", label: "Rule evaluation per event" },
  { value: "12×", label: "Hop depth on funds traces" },
];

const CAPABILITIES = [
  {
    icon: Network,
    tag: "Knowledge graph",
    title: "Risk lives in relationships",
    body: "Every customer, account, device, IP, wallet, and beneficial owner linked in a live graph — risk propagates across edges with hop-decay. 2-hop sanctions exposure and 12-hop funds traces surface automatically.",
  },
  {
    icon: GitBranch,
    tag: "Rules engine",
    title: "Rules dispatch the investigation",
    body: "Each rule carries investigation instructions — which edges to walk, how far, how fast risk decays, and which agent playbooks to fire. Matches against SQL and graph in under 5ms.",
  },
  {
    icon: WorkflowIcon,
    tag: "Agent squad",
    title: "A configurable fleet on every alert",
    body: "When a rule fires, specialist agents are dispatched automatically — graph, behavioral, fraud, funds-tracing, identity, and synthesis. Add built-in agents, build custom ones, or tune the playbooks.",
  },
  {
    icon: FileCheck2,
    tag: "Compliance",
    title: "Regulator-ready by default",
    body: "SAR-ready narratives with no hedging, explainable risk decomposition, and full correlation-ID lineage from source event → rule → alert → agent → decision.",
  },
];

const AGENTS = [
  { type: "Routing", name: "Orchestrator", desc: "LLM-driven intent router. Classifies queries, resolves pronouns, and extracts entities before dispatching the pipeline." },
  { type: "Graph", name: "Investigator", desc: "Walks the graph up to 2 hops, mapping every high-risk neighbor with WHY (PEP, sanctioned, adverse media) and HOW." },
  { type: "Temporal", name: "ProfileShift", desc: "Traverses the SCD-2 snapshot chain over 90 days. Detects the exact moment a profile changed — PEP flip, sanctions match." },
  { type: "Threat intel", name: "DarkWebScanner", desc: "Runs fresh dark-web credential-breach checks on every customer under investigation. Active exposure vs stale records." },
  { type: "Behavioral", name: "CustomerProfiler", desc: "Cross-account structuring counts, layering depth, peer-deviation z-scores, ATO signal scores — computed fresh on demand." },
  { type: "Behavioral", name: "AccountProfiler", desc: "Per-account rolling stats: 30/90-day outbound volume, velocity spikes, new-counterparty churn, dormancy flags." },
  { type: "Fraud", name: "AccountTakeover", desc: "Device signals (rooted, jailbroken, emulator) plus login signals (VPN, TOR, failed bursts, SIM swaps), correlated with breach flags." },
  { type: "Payments", name: "PaymentFraud", desc: "Outbound velocity and scheme mix (SWIFT, ACH, SEPA, UPI, crypto). Flags cross-scheme structuring invisible to single-scheme rules." },
  { type: "Network", name: "NetworkRing", desc: "Shared-identifier ring detection across devices, IPs, addresses, wallets, and cards. Surfaces coordinated money-mule networks." },
  { type: "Follow the money", name: "FundsTrace", desc: "Recursive 12-hop walk through account → paid-to → routed-via chains. Surfaces every reachable sanctioned endpoint." },
  { type: "Identity", name: "Resolver", desc: "Entity resolution surfaces duplicate identities, synthetic-identity patterns, and name-masking with confidence scores." },
  { type: "Synthesis", name: "Narrator", desc: "Synthesizes all agent findings into a ≤400-word, no-hedging narrative with clickable entity links. SAR-ready output." },
];

const FEATURES = [
  { eyebrow: "Universal ingestion", title: "Every message. ISO and non-ISO.", img: "/assets/products/argus/ingestion.png", url: "argus / data-contracts", badge: "Live" },
  { eyebrow: "Configurable signals", title: "Signals fire the moment the graph changes.", img: "/assets/products/argus/signals.png", url: "argus / configuration / signals" },
  { eyebrow: "Agents wired to rules", title: "Specialist agents, each with its own playbook.", img: "/assets/products/argus/agents.png", url: "argus / detection / agents" },
  { eyebrow: "Detection flows", title: "Investigation flows, out of the box.", img: "/assets/products/argus/flows.png", url: "argus / detection / flow" },
  { eyebrow: "Graph explorer", title: "Every entity, every link. Instantly visible.", img: "/assets/products/argus/graph-explorer.png", url: "argus / graph-explorer", badge: "Live" },
  { eyebrow: "MCP server", title: "Talk to Argus from any LLM.", img: "/assets/products/argus/mcp.png", url: "argus / system / mcp" },
];

const AGENT_MARQUEE = AGENTS.map((a) => a.name);

/* ─────────────────────────────────  page  ─────────────────────────────── */

export default function ArgusPage() {
  useDocumentTitle("Argus · Agentic AML investigation");

  return (
    <div className={cn("theme-argus", styles.page)}>
      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <Container size="wide" className={styles.heroGrid}>
          <motion.div
            className={styles.heroCopy}
            variants={staggerParent}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow>Argus · Agentic AML investigation</Eyebrow>
            </motion.div>
            <motion.h1 className={styles.h1} variants={fadeUp}>
              The AML platform that <em>investigates</em> — not just alerts.
            </motion.h1>
            <motion.p className={styles.sub} variants={fadeUp}>
              Argus is an <b>agentic AML investigation platform</b>. A fully
              configurable fleet of specialist AI agents triages alerts, connects
              the dots across years of data, and hands your team a recommended
              disposition — with the full evidence trail attached.
            </motion.p>
            <motion.div className={styles.actions} variants={fadeUp}>
              <Magnetic>
                <Button href={`mailto:${SITE.email}?subject=Argus%20demo`} size="lg">
                  Request a Demo <ArrowRight size={18} />
                </Button>
              </Magnetic>
              <Button href="#crew" variant="outline" size="lg">
                Meet the crew
              </Button>
            </motion.div>
          </motion.div>

          <Parallax speed={40} className={styles.heroMedia}>
            <figure className={styles.frame}>
              <span className={styles.frameChrome}>
                <i /> <i /> <i />
                <em>app.sqaid.ai / argus / dashboard</em>
                <b>● Live</b>
              </span>
              <img
                src="/assets/products/argus/dashboard.png"
                alt="Argus real-time dashboard — open alerts, close time, true-positive rate and live activity"
                loading="eager"
              />
            </figure>
          </Parallax>
        </Container>

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
      </section>

      {/* ══ MARQUEE · agent fleet ══ */}
      <div className={styles.marqueeWrap}>
        <Marquee duration={34}>
          {AGENT_MARQUEE.map((n) => (
            <span key={n} className={styles.marqueeItem}>
              {n}
              <span className={styles.marqueeDot} />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ══ CAPABILITIES · parallax bento ══ */}
      <section id="capabilities" className="section">
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>What it does</Eyebrow>
            <h2 className={styles.h2}>
              From alert to disposition — <em>autonomously.</em>
            </h2>
            <p className={styles.lede}>
              Argus doesn&apos;t just flag risk. It runs the investigation end to
              end and brings you a decision with the receipts.
            </p>
          </div>

          <div className={styles.bento}>
            {CAPABILITIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <Parallax
                  key={c.title}
                  speed={i % 2 === 0 ? 24 : -18}
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

      {/* ══ THE CREW · interactive carousel (light invert band) ══ */}
      <section id="crew" className={cn("section", styles.crewBand, "invert")}>
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>The crew</Eyebrow>
            <h2 className={styles.h2}>
              Your agent fleet. <em>One investigation.</em>
            </h2>
            <p className={styles.lede}>
              Each agent owns a slice of the investigation and hands its work to
              the next. Ships with specialists out of the box — drag through the
              fleet, add your own, or tune any playbook without writing code.
            </p>
          </div>

          <Carousel className={styles.crewCarousel} label="Drag or use the arrows →">
            {AGENTS.map((a) => (
              <article key={a.name} className={styles.agent}>
                <span className={styles.agentType}>{a.type}</span>
                <h3 className={styles.agentName}>{a.name}</h3>
                <p className={styles.agentDesc}>{a.desc}</p>
                <span className={styles.agentGlyph} aria-hidden="true">
                  {a.name.slice(0, 2).toUpperCase()}
                </span>
              </article>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* ══ FEATURE GALLERY · screenshot carousel ══ */}
      <section className="section">
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>Inside Argus</Eyebrow>
            <h2 className={styles.h2}>
              Six surfaces, <em>one investigation platform.</em>
            </h2>
            <p className={styles.lede}>
              Ingestion, configurable signals, agents wired to rules, detection
              flows, the live graph explorer, and an MCP endpoint for any LLM.
            </p>
          </div>

          <Carousel className={styles.shotCarousel} label="Swipe through the product">
            {FEATURES.map((f) => (
              <figure key={f.eyebrow} className={styles.shotCard}>
                <span className={styles.frameChrome}>
                  <i /> <i /> <i />
                  <em>app.sqaid.ai / {f.url}</em>
                  {f.badge && <b>● {f.badge}</b>}
                </span>
                <img src={f.img} alt={f.title} loading="lazy" />
                <figcaption className={styles.shotCaption}>
                  <span className={styles.shotEyebrow}>{f.eyebrow}</span>
                  <span className={styles.shotTitle}>{f.title}</span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
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
            <Eyebrow>Get started</Eyebrow>
            <h2 className={styles.ctaTitle}>
              See Argus investigate <em>one of your cases.</em>
            </h2>
            <p className={styles.ctaLede}>
              Bring a real alert. We&apos;ll show you the full investigation —
              start to disposition — in twenty minutes.
            </p>
            <div className={styles.actions}>
              <Magnetic>
                <Button href={`mailto:${SITE.email}?subject=Argus%20demo`} size="lg">
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
