import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Database,
  GitBranch,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import Workspace, { Panel } from "./Workspace";
import { workloads } from "@/content/products";
import s from "@/pages/experience/Experience.module.css";
import w from "./DeepDive.module.css";
const bindings = [
  {
    name: "Source",
    icon: Database,
    title: "Start with the evidence.",
    copy: "Discover a source asset and inspect its schema and available records. Define what the tool is allowed to read.",
    meta: "Customer & transaction sources",
  },
  {
    name: "Tool",
    icon: GitBranch,
    title: "Make access explicit.",
    copy: "Bind a read-only tool to the discovered asset, with a row budget and source references. The workspace has defined access rather than an unrestricted database connection.",
    meta: "Configured retrieval tool",
  },
  {
    name: "Agent",
    icon: Bot,
    title: "Give the specialist a role.",
    copy: "Configure the agent’s prompt, model and allowed tools. Its work is tied to the evidence it can retrieve.",
    meta: "Configured analysis agent",
  },
  {
    name: "Workspace",
    icon: Layers3,
    title: "Publish the experience.",
    copy: "A workspace release pins the configuration and mapped product versions. Saved activity and source results let you inspect the run.",
    meta: "Published workspace release",
  },
];
export function Studio() {
  const [active, setActive] = useState(0);
  const v = bindings[active];
  return (
    <section className={`${s.section} ${s.band}`}>
      <div className={`${s.wrap} ${s.split}`}>
        <div>
          <span className={s.eyebrow}>Inside Brain Studio</span>
          <h2 className={s.heading}>
            The intelligence
            <br />
            is configurable.
          </h2>
          <p className={s.intro}>
            Connect data to tools, tools to specialists, and specialists to a
            workspace. Make the source access and workflow visible before a
            question is asked.
          </p>
          <p className={s.intro}>
            Choose a layer to explore how the pieces fit together.
          </p>
        </div>
        <Panel title="BRAIN / WORKSPACE STUDIO">
          <div className={w.studio}>
            <div className={w.bindings}>
              {bindings.map((b, i) => {
                const Icon = b.icon;
                return (
                  <button
                    key={b.name}
                    className={active === i ? w.active : ""}
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                  >
                    <Icon size={23} />
                    <span>{b.name}</span>
                  </button>
                );
              })}
            </div>
            <div className={w.detail} aria-live="polite">
              <small>{v.meta}</small>
              <h3>{v.title}</h3>
              <p>{v.copy}</p>
            </div>
            <div className={w.release}>
              <ShieldCheck size={14} />
              <span>Source → tool → agent → workspace</span>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
export function WorkloadExplorer() {
  const [active, setActive] = useState(0);
  const p = workloads[active];
  return (
    <section className={`${s.section} ${s.band}`}>
      <div className={s.wrap}>
        <span className={s.eyebrow}>Explore the ARGUS workloads</span>
        <h2 className={s.heading}>
          Different signals.
          <br />
          Different ways to investigate.
        </h2>
        <div className={w.tabs} aria-label="Choose an ARGUS workload">
          {workloads.map((v, i) => (
            <button
              key={v.slug}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              {v.name.replace("ARGUS ", "")}
            </button>
          ))}
        </div>
        <div className={s.split}>
          <div className={w.workloadCopy}>
            <span className={s.eyebrow}>{p.category}</span>
            <h3>{p.question}</h3>
            <p className={s.intro}>{p.answer}</p>
            <Link className={s.textLink} to={`/products/argus/${p.slug}`}>
              Explore {p.name}
              <ArrowRight size={14} />
            </Link>
          </div>
          <Workspace key={p.slug} kind={p.slug} />
        </div>
      </div>
    </section>
  );
}
const provenance = [
  {
    label: "Watchlist source",
    title: "Keep the original record.",
    body: "Versioned source ingestion retains the original watchlist material and its integrity hash.",
    reference: "SOURCE VERSION",
  },
  {
    label: "Candidate retrieval",
    title: "Find first. Evaluate next.",
    body: "Complementary routes retrieve the union of candidate entities. Retrieval is separate from evidence scoring.",
    reference: "CANDIDATE SET",
  },
  {
    label: "Hit review",
    title: "Inspect supporting and conflicting evidence.",
    body: "A candidate becomes a review question. The analyst can examine its identity attributes and source context.",
    reference: "REVIEW RECORD",
  },
  {
    label: "Recorded history",
    title: "Return to the evidence later.",
    body: "The screening record and hit lifecycle preserve the context needed to examine a review after the event.",
    reference: "AUDIT TRAIL",
  },
];
export function ScreeningTrail() {
  const [active, setActive] = useState(0);
  const v = provenance[active];
  return (
    <section className={`${s.section} ${s.band}`}>
      <div className={s.wrap}>
        <span className={s.eyebrow}>The story behind a screening hit</span>
        <h2 className={s.heading}>A result should have a history.</h2>
        <p className={s.intro}>
          Inspect the path from watchlist source to recorded review. Select a
          stage to follow the evidence.
        </p>
        <div className={w.provenance}>
          {provenance.map((v, i) => (
            <button
              key={v.label}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <small>{String(i + 1).padStart(2, "0")}</small>
              <strong>{v.label}</strong>
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
        <div className={w.trailDetail} aria-live="polite">
          <small>{v.reference}</small>
          <h3>{v.title}</h3>
          <p>{v.body}</p>
        </div>
      </div>
    </section>
  );
}
