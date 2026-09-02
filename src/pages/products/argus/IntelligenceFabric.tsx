import { useState } from "react";
import { Activity, ArrowRight, Bot, BrainCircuit, CheckCircle2, Database, Network, ScanSearch } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { MonoLabel } from "./primitives";
import styles from "./IntelligenceFabric.module.css";

const workloads=[
  {id:"fraud",icon:Activity,label:"REAL-TIME FRAUD",headline:"Stop risk while the event is still moving.",copy:"Streaming events are normalized into the UDM, evaluated against live behavioral and network signals, then enriched by ML and AI before the right agents investigate.",source:"CARD · WIRE · LOGIN",engine:"REAL-TIME DETECTION",signal:"VELOCITY + GRAPH",outcome:"BLOCK · REVIEW",mode:"STREAMING"},
  {id:"aml",icon:Database,label:"BATCH AML",headline:"Find long-horizon behavior hidden across the UDM.",copy:"ClickHouse evaluates complete AML histories and long-window patterns across the governed UDM. ML, AI and specialist agents turn those detections into connected, reviewable investigations.",source:"UDM · FULL HISTORY",engine:"CLICKHOUSE BATCH",signal:"AML PATTERN + ML",outcome:"CASE · NARRATIVE",mode:"BATCH"},
  {id:"entity",icon:Network,label:"ENTITY RESOLUTION",headline:"Resolve the real entity behind fragmented records.",copy:"The graph identity layer connects customers, accounts, devices, businesses and counterparties with confidence and lineage. Agents reason over the resolved network—not isolated rows.",source:"PARTY · ACCOUNT · DEVICE",engine:"GRAPH RESOLUTION",signal:"IDENTITY + NETWORK",outcome:"RESOLVED ENTITY",mode:"GRAPH"},
  {id:"trade",icon:ScanSearch,label:"TRADE SURVEILLANCE",headline:"Supervise patterns across orders, executions and behavior.",copy:"ClickHouse runs batch surveillance across normalized order and execution history. ML and AI surface anomalous patterns while agents assemble the market, trader and entity context for supervision.",source:"ORDER · EXECUTION · UDM",engine:"CLICKHOUSE BATCH",signal:"PATTERN + ML + AI",outcome:"SUPERVISOR CASE",mode:"BATCH"},
] as const;

export default function IntelligenceFabric(){const [active,setActive]=useState(0);const item=workloads[active];return <section id="argus-fabric" className={styles.section}><Container size="wide"><Reveal className={styles.head}><MonoLabel tone="accent">ONE INTELLIGENCE FABRIC</MonoLabel><h2>Real-time detection. Batch intelligence.<br/>One resolved view of risk.</h2><p>ARGUS unifies governed data, detection, graph intelligence, ML, AI and agents. Select a workload to follow how raw activity becomes an explainable action.</p></Reveal><div className={styles.workloadTabs} role="tablist" aria-label="ARGUS workloads">{workloads.map((w,i)=>{const Icon=w.icon;return <button type="button" role="tab" aria-selected={i===active} className={i===active?styles.activeTab:""} onClick={()=>setActive(i)} key={w.id}><Icon/><span>{w.label}</span><small>{w.mode}</small></button>})}</div><div className={styles.fabric}>
  <div className={styles.story}><span>ACTIVE WORKLOAD · 0{active+1}</span><h3>{item.headline}</h3><p>{item.copy}</p><div className={styles.assurance}><CheckCircle2/><span>One evidence chain</span><CheckCircle2/><span>Human-governed action</span></div></div>
  <div className={styles.pipeline} key={item.id}>
    <div className={styles.flowLine}/>
    <div className={styles.stage}><i><Database/></i><small>01 · GOVERNED INPUT</small><strong>{item.source}</strong><span>Canonical UDM contracts</span></div>
    <ArrowRight className={styles.arrow}/>
    <div className={styles.stage}><i><Activity/></i><small>02 · COMPUTE</small><strong>{item.engine}</strong><span>Policy-owned execution</span></div>
    <ArrowRight className={styles.arrow}/>
    <div className={styles.stageEmphasis}><i><BrainCircuit/></i><small>03 · INTELLIGENCE</small><strong>{item.signal}</strong><span>ML + AI evidence</span></div>
    <ArrowRight className={styles.arrow}/>
    <div className={styles.stage}><i><Bot/></i><small>04 · AGENT ACTION</small><strong>{item.outcome}</strong><span>Traceable decision</span></div>
  </div>
  <div className={styles.liveStrip}><span><i/> EVENT / BATCH COMPLETE</span><b>{item.label}</b><em>UDM → {item.engine} → INTELLIGENCE → AGENTS</em></div>
  </div></Container></section>}
