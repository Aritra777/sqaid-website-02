import { useState } from "react";
import { Activity, Bot, CheckCircle2, Fingerprint, GitBranch, Network, ScanSearch, ShieldCheck, Workflow } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import styles from "./ProductUseCases.module.css";

type ProductKey="argus"|"cais"|"abacus";
const cases={
  argus:[
    {icon:Activity,kicker:"Real-time fraud",title:"Stop a connected fraud ring while money is moving",copy:"ARGUS combines transaction velocity, device shifts and counterparty behavior, then expands the entity graph before the next payment clears.",flow:["LIVE EVENT","SIGNALS","GRAPH","ACTION"]},
    {icon:ShieldCheck,kicker:"AML",title:"Turn a structuring alert into a SAR-ready investigation",copy:"Specialist agents trace funds, test the customer profile and assemble a cited narrative with every hop preserved for review.",flow:["ALERT","FUNDS TRACE","AGENTS","EVIDENCE"]},
    {icon:Network,kicker:"Entity resolution",title:"Discover the person behind fragmented identities",copy:"Resolve accounts, devices, addresses, businesses and counterparties into one governed entity with confidence at every link.",flow:["RECORDS","EMBEDDINGS","IDENTITY","NETWORK"]},
    {icon:ScanSearch,kicker:"Trade surveillance",title:"Supervise orders, executions and communications together",copy:"Detect manipulation and conduct risk by connecting market behavior to trader, account and communication context.",flow:["ORDER","PATTERN","CONTEXT","REVIEW"]},
  ],
  cais:[
    {icon:Workflow,kicker:"Universal investigations",title:"Run fraud and AML cases on one configurable lifecycle",copy:"CAIS adapts the schema, stages, evidence and decisions to the investigation instead of forcing every team into one rigid template.",flow:["INTAKE","ENRICH","REVIEW","CLOSE"]},
    {icon:Bot,kicker:"AI casework",title:"Give investigators a copilot that can cite its work",copy:"Summaries, next-best actions and narratives are grounded in the case record with human approval preserved at decision points.",flow:["CASE","COPILOT","HUMAN","DECISION"]},
    {icon:CheckCircle2,kicker:"Governed operations",title:"Coordinate queues, SLAs and four-eyes review",copy:"Route work by risk, jurisdiction and expertise while retaining an immutable record of every action and approval.",flow:["ROUTE","SLA","APPROVE","AUDIT"]},
  ],
  abacus:[
    {icon:Fingerprint,kicker:"Cross-script identity",title:"Find a sanctioned person hidden behind transliteration",copy:"Arabic, Cyrillic, Chinese and Latin aliases resolve into one candidate identity before policy decides the disposition.",flow:["NAME","4 GATES","IDENTITY","REVIEW"],outcome:"Mohamad Al-Aly → محمد العلي",result:"Cross-script candidate surfaced with every matching signal preserved."},
    {icon:Activity,kicker:"Payment screening",title:"Screen every party before releasing the payment",copy:"ABACUS evaluates originator, beneficiary, banks and free-text payment context in real time—then explains why it released or held the event.",flow:["PAYMENT","PARTIES","POLICY","HOLD"],outcome:"SWIFT payment · 4 parties",result:"Ambiguous beneficiary held; unaffected payments continue without analyst delay."},
    {icon:GitBranch,kicker:"False-positive reduction",title:"Separate a similar name from the same identity",copy:"Deterministic and semantic gates can disagree. AI adjudication exposes the conflict instead of collapsing it into an opaque match score.",flow:["ALIAS","CONFLICT","AI REVIEW","DECIDE"],outcome:"Jon Smyth ≠ John Smith",result:"Weak name similarity cleared using date-of-birth and ownership context."},
  ]
} as const;

function MiniFlow({items}:{items:readonly string[]}){return <div className={styles.flow}>{items.map((item,i)=><div key={item}><i className={styles.node}/><span>{item}</span>{i<items.length-1&&<b/>}</div>)}</div>}

export default function ProductUseCases({product}:{product:ProductKey}){
  const [active,setActive]=useState(0);const items=cases[product];
  const title=product==="argus"?"Intelligence that meets the real investigation.":product==="cais"?"A case system for work that never fits one template.":"Screening designed for the ambiguity sanctions teams actually face.";
  return <section className={`${styles.section} ${styles[product]} product-use-cases`}><Container size="wide"><div className={styles.head}><span>Use cases</span><h2>{title}</h2><p>{product==="abacus"?"Select a scenario to see how evidence becomes an operational screening decision.":"Concrete operational journeys—not generic AI claims."}</p></div><div className={styles.grid}>{items.map((item,i)=>{const Icon=item.icon;return <Reveal key={item.title} delay={i*.05} className={`${styles.card} ${product==="abacus"&&active===i?styles.activeCard:""}`}><button type="button" className={styles.cardButton} onClick={()=>setActive(i)} aria-pressed={product==="abacus"?active===i:undefined}><div className={styles.cardTop}><span><Icon size={19}/></span><small>{item.kicker}</small></div><h3>{item.title}</h3><p>{item.copy}</p><MiniFlow items={item.flow}/>{product==="abacus"&&<em>{active===i?"SCENARIO ACTIVE":"EXPLORE SCENARIO"}</em>}</button></Reveal>})}</div>{product==="abacus"&&"outcome" in items[active]&&<div className={styles.scenarioResult} key={active}><span>SIMULATED SCREENING OUTCOME</span><strong>{items[active].outcome}</strong><p>{items[active].result}</p><b><ShieldCheck/> Explainable evidence · governed policy · human control</b></div>}</Container></section>
}
