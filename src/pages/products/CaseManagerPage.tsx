import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  History,
  KeyRound,
  LayoutTemplate,
  PanelsTopLeft,
  SlidersHorizontal,
  Workflow,
  X,
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
import styles from "./CaseManagerPage.module.css";

/* ─────────────────────────────── content ─────────────────────────────── */

const HERO_STATS = [
  { value: "Any", label: "Alert type — extra fields, no XML" },
  { value: "0", label: "Lines of code to ship a new alert type" },
  { value: "1", label: "RBAC model — AWS IAM-inspired" },
  { value: "5", label: "Modules — alerts · workflows · cases · audit · RBAC" },
];

const FEATURES = [
  {
    icon: SlidersHorizontal,
    tag: "Configurable schema",
    title: "Alert types, defined once",
    body: "Mandatory fields are shared; extra fields per alert type carry their own metadata — type, required flag, label — stored apart from values, so adding a field never breaks historical alerts.",
  },
  {
    icon: LayoutTemplate,
    tag: "Designer canvas",
    title: "Visual page designer",
    body: "Compose the alert-summary page from a palette — trades, prior alerts, positions, FA profile, issue history. Saved per alert type. One-time setup, not a daily task.",
  },
  {
    icon: Workflow,
    tag: "Workflow",
    title: "React-Flow-style builder",
    body: "Drag steps and connectors to compose an alert's lifecycle — assignment → investigation → SAR → close. Each alert type follows its own workflow, enforced server-side.",
  },
  {
    icon: KeyRound,
    tag: "RBAC",
    title: "AWS IAM-inspired access",
    body: "Roles, policies, and resource scopes — composable across pages, actions, and services. Multi-role users get permissions union-cached on sign-in, so the UI never refetches on a click.",
  },
  {
    icon: PanelsTopLeft,
    tag: "Lifecycle",
    title: "Everything in one view",
    body: "Trades, positions, prior alerts, FA details, historical trades, issue details. Add notes, attach evidence, audit history, export, assign — without ever leaving the case.",
  },
  {
    icon: History,
    tag: "Auditable",
    title: "Full trail on every action",
    body: "Every status change, assignment, attachment, and note is recorded with actor, timestamp, and immutable diff — built for the next time a regulator asks who did what, when.",
  },
];

const DESIGNER_POINTS = [
  { b: "Component palette", t: "trades, positions, prior alerts, FA profile, issue history" },
  { b: "Per alert type", t: "different views for AML, fraud, sanctions, trade surveillance" },
  { b: "Bound to extra fields", t: "the designer reads the schema, so it only shows fields that exist" },
  { b: "Built in-house", t: "no Retool dependency, no vendor lock-in on the designer itself" },
];

const RBAC_POINTS = [
  { b: "Authorization wrapper", t: "nested checks for every page and action" },
  { b: "Role caching", t: "union of policies cached per user for fast retrieval" },
  { b: "Conditional authorization", t: "“allow this if <predicate>” — state-aware access" },
  { b: "In-house build", t: "we evaluated CERBOS but kept it internal to avoid lock-in" },
];

const WORKFLOW_NODES = ["Intake", "Assign", "Investigate", "SAR", "Close"];

const ALERT_TYPES = [
  { tag: "AML", name: "Transaction monitoring", body: "Structuring, layering, and cross-border alerts with their own fields, view, and workflow." },
  { tag: "Fraud", name: "Payment fraud", body: "Card, wire, and ACH fraud cases routed to the right queue with fraud-specific evidence." },
  { tag: "Sanctions", name: "Screening hits", body: "Watchlist matches with adjudication steps, four-eyes review, and audit lineage baked in." },
  { tag: "Surveillance", name: "Trade surveillance", body: "Market-abuse alerts with trades, positions, and FA context composed onto the case view." },
  { tag: "KYC", name: "Periodic review", body: "Refresh cycles with document capture, risk re-rating, and escalation to EDD when needed." },
  { tag: "Adverse media", name: "Negative news", body: "Media-hit triage with source links, relevance scoring, and disposition notes on record." },
];

const MARQUEE_TAGS = [
  "AML", "Fraud", "Sanctions", "Trade surveillance", "KYC", "SAR", "CTR",
  "RBAC", "Audit trail", "Workflows", "Designer", "No XML",
];

const COMPARISON = [
  {
    cap: "Adding a new alert type",
    legacy: "Edit XML files. Redeploy. Manage schema drift.",
    sqaid: "Define mandatory + extra fields in the UI. Live in minutes, no deploy.",
  },
  {
    cap: "Customizing the alert view",
    legacy: "Engineer ticket. Code change. Release cycle.",
    sqaid: "Drag components onto the designer canvas. Save per alert type.",
  },
  {
    cap: "Workflow changes",
    legacy: "Hard-coded steps buried in legacy code.",
    sqaid: "Visual designer. Versioned per alert type, enforced by the engine.",
  },
  {
    cap: "Permissions",
    legacy: "Coarse user roles. Conditional access is painful.",
    sqaid: "IAM-style policies per page / action / service. Conditional by design.",
  },
  {
    cap: "Vendor lock-in",
    legacy: "Closed XML config and a proprietary runtime.",
    sqaid: "In-house build. PostgreSQL + Spring Boot. Yours to own.",
  },
];

/* ───────────────────────── hero config canvas ────────────────────────── */

const CONFIG_CHIPS = [
  { label: "Alert type", meta: "schema", x: "6%", y: "12%", dur: 7 },
  { label: "Extra fields", meta: "metadata", x: "50%", y: "4%", dur: 9 },
  { label: "Designer", meta: "FA view", x: "3%", y: "58%", dur: 8 },
  { label: "Workflow", meta: "lifecycle", x: "54%", y: "50%", dur: 10 },
  { label: "RBAC", meta: "policies", x: "30%", y: "82%", dur: 8.5 },
];

function ConfigCanvas() {
  return (
    <div className={styles.canvas} aria-hidden="true">
      {/* connectors between the roughly-placed chips (viewBox = %) */}
      <svg className={styles.canvasLines} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M16 18 L60 12 M16 18 L14 64 M60 12 L64 56 M14 64 L40 86 M64 56 L40 86" />
      </svg>
      {CONFIG_CHIPS.map((c, i) => (
        <span
          key={c.label}
          className={styles.chip}
          style={{
            left: c.x,
            top: c.y,
            animationDuration: `${c.dur}s`,
            animationDelay: `${i * -1.3}s`,
          }}
        >
          <span className={styles.chipDot} />
          <span className={styles.chipLabel}>{c.label}</span>
          <span className={styles.chipMeta}>{c.meta}</span>
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────── workflow node graph ─────────────────────── */

function WorkflowGraph() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={styles.graph}>
      <svg className={styles.graphSvg} viewBox="0 0 560 120">
        <path
          id="cm-flow"
          className={styles.graphPath}
          d="M40 60 H520"
          fill="none"
        />
        {!reduced && (
          <circle className={styles.graphDot} r="5">
            <animateMotion dur="4s" repeatCount="indefinite">
              <mpath href="#cm-flow" />
            </animateMotion>
          </circle>
        )}
        {WORKFLOW_NODES.map((_, i) => {
          const x = 40 + (i * (480 / (WORKFLOW_NODES.length - 1)));
          return <circle key={i} className={styles.graphNode} cx={x} cy="60" r="9" />;
        })}
      </svg>
      <ol className={styles.graphLabels}>
        {WORKFLOW_NODES.map((n, i) => (
          <li key={n}>
            <span className={styles.graphNum}>{String(i + 1).padStart(2, "0")}</span>
            {n}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ─────────────────────────────────  page  ─────────────────────────────── */

export default function CaseManagerPage() {
  useDocumentTitle("Case Manager · Configurable case management");

  return (
    <div className={cn("theme-case-manager", styles.page)}>
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
              <Eyebrow>Case Manager · Configurable case management</Eyebrow>
            </motion.div>
            <motion.h1 className={styles.h1} variants={fadeUp}>
              The case-management platform
              <br />
              that <em>bends to your workflow.</em>
            </motion.h1>
            <motion.p className={styles.sub} variants={fadeUp}>
              Legacy tools force compliance teams to bend to the tool — new alert
              type? <b>edit XML and redeploy.</b> SqAId Case Manager flips it:
              every alert type, view, and workflow is configured once in the UI,
              then used forever by advisors and investigators.
            </motion.p>
            <motion.div className={styles.actions} variants={fadeUp}>
              <Magnetic>
                <Button
                  href={`mailto:${SITE.email}?subject=Case%20Manager%20demo`}
                  size="lg"
                >
                  Request a Demo <ArrowRight size={18} />
                </Button>
              </Magnetic>
              <Button href="#features" variant="outline" size="lg">
                See the features
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.heroViz}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <span className={styles.vizTag}>configuration canvas</span>
            <ConfigCanvas />
          </motion.div>
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

      {/* ══ MARQUEE ══ */}
      <div className={styles.marqueeWrap}>
        <Marquee duration={30}>
          {MARQUEE_TAGS.map((t) => (
            <span key={t} className={styles.marqueeItem}>
              {t}
              <span className={styles.marqueeDot} />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ══ ALERT TYPES · interactive carousel ══ */}
      <section className="section">
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>Ship any alert type</Eyebrow>
            <h2 className={styles.h2}>
              One platform. <em>Every case type.</em>
            </h2>
            <p className={styles.lede}>
              Each alert type carries its own fields, view, and workflow — all
              configured in the UI. Drag through a few of the types teams ship on
              day one.
            </p>
          </div>

          <Carousel className={styles.alerts} label="Drag or use the arrows →">
            {ALERT_TYPES.map((a) => (
              <article key={a.name} className={styles.alertCard}>
                <span className={styles.alertTag}>{a.tag}</span>
                <h3 className={styles.alertName}>{a.name}</h3>
                <p className={styles.alertBody}>{a.body}</p>
              </article>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* ══ FEATURES · inverted band ══ */}
      <section id="features" className={cn("section", styles.band, "invert")}>
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>What makes it different</Eyebrow>
            <h2 className={styles.h2}>
              Configuration is <em>not a developer ticket.</em>
            </h2>
            <p className={styles.lede}>
              Six surfaces, all configured in the UI. No XML, no redeploys, no
              engineering tickets for routine compliance changes.
            </p>
          </div>

          <div className={styles.bento}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.article
                  key={f.title}
                  className={styles.feat}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inViewOnce}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.07 }}
                >
                  <span className={styles.featIcon}>
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className={styles.featTag}>{f.tag}</span>
                  <h3 className={styles.featTitle}>{f.title}</h3>
                  <p className={styles.featBody}>{f.body}</p>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ══ DESIGNER · default band, screenshot + spec ══ */}
      <section className="section">
        <Container size="wide">
          <div className={styles.twoCol}>
            <motion.div
              className={styles.copyCol}
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>Page &amp; section designer</Eyebrow>
              </motion.div>
              <motion.h2 className={styles.h2} variants={fadeUp}>
                Build the FA view <em>without writing a line.</em>
              </motion.h2>
              <motion.p className={styles.lede} variants={fadeUp}>
                The Designer composes the alert-summary page per alert type.
                Trades, positions, prior alerts, FA profile, issue history — each
                a component you drag into place and bind to the alert&apos;s extra
                fields. Configured once; used every day.
              </motion.p>
              <motion.ul className={styles.checklist} variants={fadeUp}>
                {DESIGNER_POINTS.map((p) => (
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

            <Parallax speed={34} className={styles.mediaCol}>
              <figure className={styles.frame}>
                <span className={styles.frameChrome}>
                  <i /> <i /> <i />
                  <em>app.sqaid.ai / case-manager / designer</em>
                </span>
                <img
                  src="/assets/products/case-manager.png"
                  alt="Case Manager designer — alert analytics & case workspace"
                  loading="lazy"
                />
              </figure>
            </Parallax>
          </div>
        </Container>
      </section>

      {/* ══ WORKFLOW · inverted band, node graph ══ */}
      <section className={cn("section", styles.band, "invert")}>
        <Container size="wide">
          <div className={styles.twoCol}>
            <motion.div
              className={styles.graphCol}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7 }}
            >
              <WorkflowGraph />
            </motion.div>

            <motion.div
              className={styles.copyCol}
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>Workflow designer</Eyebrow>
              </motion.div>
              <motion.h2 className={styles.h2} variants={fadeUp}>
                Map the lifecycle.
                <br />
                <em>Enforce it automatically.</em>
              </motion.h2>
              <motion.p className={styles.lede} variants={fadeUp}>
                Build the workflow visually — sequential steps and conditional
                branches describing how an alert moves from detection to closure.
                Each workflow is bound to an alert type, and the backend enforces
                the steps, so an alert can only progress in the order you designed.
              </motion.p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ══ RBAC · default band, policy card ══ */}
      <section className="section">
        <Container size="wide">
          <div className={styles.twoCol}>
            <motion.div
              className={styles.copyCol}
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>Role-based access control</Eyebrow>
              </motion.div>
              <motion.h2 className={styles.h2} variants={fadeUp}>
                AWS IAM, <em>but for compliance teams.</em>
              </motion.h2>
              <motion.p className={styles.lede} variants={fadeUp}>
                We modeled access on AWS IAM — the most expressive role-and-policy
                system in wide use. Every page, action, and service endpoint can be
                wrapped in a policy check, including conditional access. Multi-role
                users get their policies unioned and cached on sign-in; revoking a
                role takes effect on the next request.
              </motion.p>
            </motion.div>

            <motion.div
              className={styles.policyCol}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewOnce}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.policyCard}>
                <span className={styles.policyLabel}>policy · investigator</span>
                <pre className={styles.policyCode}>
{`{
  "effect": "allow",
  "actions": ["case:read", "case:note",
              "case:attach", "sar:draft"],
  "resource": "alert-type/aml",
  "condition": {
    "state": "in_review"
  }
}`}
                </pre>
                <ul className={styles.policyList}>
                  {RBAC_POINTS.map((p) => (
                    <li key={p.b}>
                      <span className={styles.checkMark}>
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span>
                        <b>{p.b}</b> — {p.t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ══ COMPARISON · inverted band ══ */}
      <section className={cn("section", styles.band, "invert")}>
        <Container size="wide">
          <div className={styles.head}>
            <Eyebrow>Why teams switch</Eyebrow>
            <h2 className={styles.h2}>
              A modern alternative — <em>built for configurability.</em>
            </h2>
          </div>

          <motion.div
            className={styles.cmp}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewOnce}
            transition={{ duration: 0.7 }}
          >
            <div className={cn(styles.cmpRow, styles.cmpHead)}>
              <span>Capability</span>
              <span>Legacy case management</span>
              <span>SqAId Case Manager</span>
            </div>
            {COMPARISON.map((r) => (
              <div key={r.cap} className={styles.cmpRow}>
                <span className={styles.cmpCap}>{r.cap}</span>
                <span className={styles.cmpBad}>
                  <X size={15} strokeWidth={2.5} /> {r.legacy}
                </span>
                <span className={styles.cmpGood}>
                  <Check size={15} strokeWidth={2.5} /> {r.sqaid}
                </span>
              </div>
            ))}
          </motion.div>
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
              Stop redeploying for every alert type.
              <br />
              <em>Configure it instead.</em>
            </h2>
            <p className={styles.ctaLede}>
              We&apos;ll show you Case Manager on your alert types, your workflow,
              and your permission model — in twenty minutes.
            </p>
            <div className={styles.actions}>
              <Magnetic>
                <Button
                  href={`mailto:${SITE.email}?subject=Case%20Manager%20demo`}
                  size="lg"
                >
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
