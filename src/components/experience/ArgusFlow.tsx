import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CreditCard,
  Bitcoin,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  GitBranch,
  Bell,
  Check,
} from "lucide-react";
import ProductLogo from "@/components/ui/ProductLogo";
import s from "./ArgusFlow.module.css";

const chapters = [
  {
    title: "Decide in real time",
    text: "A card payment or crypto transfer enters ARGUS. The event is canonicalised, entity context is updated and the active rule strategy evaluates risk. Matching rules return a decision and create an alert for review.",
  },
  {
    title: "Build the shared memory",
    text: "Canonical events, entity updates and decision evidence flow into UDM. The enterprise warehouse preserves a common record that other teams can use beyond the original transaction.",
  },
  {
    title: "Connect financial compliance",
    text: "UDM supplies shared data to AML, trade surveillance and entity resolution within ARGUS—and provides customer context to SqAId KYC. Each workflow adds a different perspective to the same connected data.",
  },
];
export default function ArgusFlow() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [scenario, setScenario] = useState<"card" | "crypto">("card");
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing || reduced || !visible) return;
    const timer = window.setTimeout(() => {
      if (step < 2) setStep(step + 1);
      else setPlaying(false);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [step, playing, reduced, visible]);
  const running = playing && !reduced && visible;
  return (
    <section
      ref={root}
      className={`glass-diagram ${s.presentation}`}
      aria-label="How ARGUS works: animated architecture"
      data-running={running}
    >
      <header className={s.header}>
        <div className={s.identity}>
          <ProductLogo product="argus" size={44} decorative />
          <div>
            <small>ARGUS / FROM EVENT TO INTELLIGENCE</small>
            <h2>One event. A connected response.</h2>
          </div>
        </div>
        <div className={s.controls}>
          <button
            type="button"
            aria-label={running ? "Pause walkthrough" : "Play walkthrough"}
            disabled={!!reduced}
            onClick={() => {
              if (step === 2) setStep(0);
              setPlaying(!running);
            }}
          >
            {running ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            type="button"
            aria-label="Replay walkthrough"
            onClick={() => {
              setStep(0);
              setPlaying(true);
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </header>
      <div className={s.chapters} aria-label="Walkthrough layers">
        {chapters.map((chapter, i) => (
          <button
            type="button"
            key={chapter.title}
            aria-pressed={step === i}
            onClick={() => {
              setStep(i);
              setPlaying(false);
            }}
            className={i <= step ? s.reached : ""}
          >
            <span>0{i + 1}</span>
            {chapter.title}
            {i < step && <Check size={14} />}
          </button>
        ))}
      </div>
      <div className={s.caption} aria-live={running ? "off" : "polite"}>
        <span>0{step + 1} / 03</span>
        <p>{chapters[step].text}</p>
      </div>
      <div className={s.canvas}>
        <div className={s.layer}>
          <div className={s.layerLabel}>
            <span>01 / REAL-TIME DECISION</span>
            <small>Sub-second response target*</small>
          </div>
          <div className={s.pipeline}>
            <div className={s.node}>
              <small>EVENT STREAM</small>
              <div className={s.scenarios}>
                <button
                  aria-pressed={scenario === "card"}
                  onClick={() => setScenario("card")}
                >
                  <CreditCard size={15} />
                  Card
                </button>
                <button
                  aria-pressed={scenario === "crypto"}
                  onClick={() => setScenario("crypto")}
                >
                  <Bitcoin size={15} />
                  Crypto
                </button>
              </div>
              <strong>
                {scenario === "card" ? "Card transaction" : "Crypto transfer"}
              </strong>
              <p>
                {scenario === "card"
                  ? "Payment · device · merchant"
                  : "Wallet · network · transfer"}
              </p>
            </div>
            <div className={s.connector}>
              <i />
              <ArrowRight size={16} />
            </div>
            <div className={s.node}>
              <GitBranch size={21} />
              <strong>Canonicalise & enrich</strong>
              <p>
                Common event schema
                <br />
                Update entity context
              </p>
            </div>
            <div className={s.connector}>
              <i />
              <ArrowRight size={16} />
            </div>
            <div className={`${s.node} ${s.engine}`}>
              <ShieldCheck size={21} />
              <strong>Evaluate strategy</strong>
              <p>
                {scenario === "card"
                  ? "Velocity · device · behaviour"
                  : "Wallet activity · velocity · exposure"}
              </p>
              <span className={s.tag}>ACTIVE RULE VERSION</span>
            </div>
            <div className={s.connector}>
              <i />
              <ArrowRight size={16} />
            </div>
            <div className={s.node}>
              <Bell size={21} />
              <strong>Respond & alert</strong>
              <p>
                Return the decision
                <br />
                Matched rules → review queue
              </p>
            </div>
          </div>
          <div className={s.strategy}>
            <span>RULE STRATEGY LIFECYCLE</span>
            <div>
              {["Author", "Backtest", "Shadow", "Promote"].map((label, i) => (
                <span key={label}>
                  {i > 0 && <ArrowRight size={12} />}
                  <b>{label}</b>
                </span>
              ))}
            </div>
            <small>
              Test on history → observe without live impact → approve for active
              evaluation
            </small>
          </div>
        </div>
        <div
          className={`${s.reveal} ${step >= 1 ? s.shown : ""}`}
          aria-hidden={step < 1}
        >
          <div className={s.down}>
            <ArrowDown size={18} />
            <span>Canonical events · entity updates · decision evidence</span>
          </div>
          <div className={s.warehouse}>
            <ProductLogo product="udm" size={46} decorative />
            <div>
              <small>02 / SHARED DATA FOUNDATION</small>
              <strong>UDM enterprise warehouse</strong>
              <p>One canonical model. Persistent history. Connected context.</p>
            </div>
            <span className={s.tag}>POWERS ARGUS · ALSO STANDALONE</span>
          </div>
        </div>
        <div
          className={`${s.reveal} ${step >= 2 ? s.shown : ""}`}
          aria-hidden={step < 2}
        >
          <div className={s.down}>
            <ArrowDown size={18} />
            <span>Shared data feeds the next investigation</span>
          </div>
          <div className={s.consumers}>
            <div className={s.argusGroup}>
              <small>03 / WITHIN THE ARGUS PLATFORM</small>
              <div>
                {[
                  ["AML", "Patterns across transactions"],
                  ["Trade surveillance", "Orders, trades & market context"],
                  ["Entity resolution", "Connected identities & relationships"],
                ].map(([name, detail]) => (
                  <div className={s.consumer} key={name}>
                    <strong>{name}</strong>
                    <p>{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={s.kyc}>
              <ProductLogo product="kyc" size={30} decorative />
              <strong>SqAId KYC</strong>
              <p>Customer context for ongoing due diligence</p>
              <small>CONNECTED PRODUCT</small>
            </div>
          </div>
        </div>
      </div>
      <footer className={s.foot}>
        <span>
          ILLUSTRATIVE ARCHITECTURE ·{" "}
          {reduced
            ? "SELECT A LAYER TO EXPLORE"
            : "LAYERS BUILD AS THE STORY PLAYS"}
        </span>
        <p>
          *Sub-second is a response target, not a measured result in this
          animation. Actual latency and data flows depend on deployment, rules
          and configured integrations.
        </p>
      </footer>
    </section>
  );
}
