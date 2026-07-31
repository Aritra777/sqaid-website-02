import { motion } from "framer-motion";
import { fadeUp, inViewOnce } from "@/lib/motion";
import styles from "./UseCasesScroll.module.css";

interface UseCase {
  domain: string;
  scenario: string;
  detail: string;
}

const USE_CASES: UseCase[] = [
  {
    domain: "AML",
    scenario: "Structuring detection across accounts",
    detail:
      "A customer splits $98,000 across seven branches in three days. SqAId links the transactions by device fingerprint, geolocation, and shared beneficiary — surfacing a single consolidated alert instead of seven isolated ones.",
  },
  {
    domain: "Fraud",
    scenario: "Synthetic identity bust-out",
    detail:
      "A portfolio of accounts with strong early repayment history suddenly maxes out and goes silent. SqAId flags the correlated behaviour pattern weeks before charge-off, giving the fraud team time to freeze and investigate.",
  },
  {
    domain: "Sanctions",
    scenario: "Layered ownership screening",
    detail:
      "A counterparty appears clean at entity level, but a 34%-owned subsidiary is on the OFAC SDN list. SqAId traces beneficial ownership three layers deep in real time and blocks the wire before settlement.",
  },
  {
    domain: "Trade Surveillance",
    scenario: "Cross-market spoofing",
    detail:
      "A trader places large orders on Venue A to move prices, then cancels and executes on Venue B. Argus correlates order-book events across venues with sub-millisecond timestamps and generates a full audit trail automatically.",
  },
  {
    domain: "KYC / KYB",
    scenario: "High-risk business reclassification",
    detail:
      "A dormant SME account suddenly receives $2M in wire transfers. SqAId re-runs KYB screening against fresh registry data, detects a change-of-control event, and routes the case for enhanced due diligence.",
  },
  {
    domain: "Case Management",
    scenario: "SAR drafting under pressure",
    detail:
      "An analyst has 40 minutes to file a SAR for a complex layering scheme. Case Manager pre-populates the narrative from the investigation trail, highlights the five key facts regulators expect, and halves the drafting time.",
  },
  {
    domain: "Fraud",
    scenario: "Account takeover at login",
    detail:
      "A user authenticates from a new device in a different country seconds after a domestic login. SqAId's session-velocity model flags the impossible-travel pattern, triggers step-up authentication, and logs the challenge for audit.",
  },
  {
    domain: "AML",
    scenario: "Trade-based money laundering",
    detail:
      "Invoice values on import documentation are 40% below market price for the commodity. SqAId benchmarks the declared value against real-time commodity indices and raises a TBML alert linked to the counterparty's transaction history.",
  },
];

const CARDS = [...USE_CASES, ...USE_CASES];

export default function UseCasesScroll() {
  return (
    <section className={styles.section}>
      <div className="container container--wide">
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
        >
          <p className={styles.eyebrow}>Real-world scenarios</p>
          <h2 className={styles.heading}>
            The cases we're built to solve.
          </h2>
          <p className={styles.sub}>
            Every compliance team faces the same hard problems. Here's how SqAId
            handles them — end to end, in production.
          </p>
        </motion.div>
      </div>

      <div className={styles.track} aria-label="Use case examples">
        <div className={styles.inner}>
          {CARDS.map((u, i) => (
            <article key={i} className={styles.card}>
              <p className={styles.domain}>{u.domain}</p>
              <h3 className={styles.scenario}>{u.scenario}</h3>
              <p className={styles.detail}>{u.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
