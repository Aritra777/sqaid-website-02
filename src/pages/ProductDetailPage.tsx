import { Navigate, useParams } from "react-router-dom";
import type { CSSProperties } from "react";
import { ArrowRight, Bot, CheckCircle2, CircleDot, FileCheck2, Fingerprint, Network, ScanSearch, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { useDocumentTitle } from "@/lib/use-document-title";
import styles from "./ProductDetailPage.module.css";
import ProductUseCases from "@/components/product/ProductUseCases";

type Product = { name:string; eyebrow:string; headline:string; lede:string; image?:string; accent:string; capabilities:{title:string;body:string;icon:typeof Network}[]; steps:string[]; outcomes:string[] };

const products:Record<string,Product> = {
  argus:{name:"ARGUS",eyebrow:"AI-native financial crime intelligence",headline:"One intelligence layer for every financial-crime signal.",lede:"ARGUS detects, connects and investigates risk across real-time fraud, AML, entity resolution, and trade surveillance—without splitting the truth across four systems.",image:"/assets/products/argus.png",accent:"violet",capabilities:[
    {title:"Real-time fraud",body:"Score live events, detect behavioral shifts and stop suspicious activity while it is happening.",icon:CircleDot},
    {title:"AML intelligence",body:"Detect structuring, layering and laundering patterns, then build an evidence-backed investigation.",icon:ShieldCheck},
    {title:"Entity resolution",body:"Resolve people, accounts, devices and organizations into a governed identity graph.",icon:Network},
    {title:"Trade surveillance",body:"Supervise orders, executions and communications for manipulation, conduct and market-abuse risk.",icon:ScanSearch}],
    steps:["Ingest live events","Resolve entities","Detect risk","Launch AI investigation","Deliver evidence"],outcomes:["One graph across customers, accounts and trades","Explainable decisions with replayable evidence","AI agents configured by risk type","Human control at every governed decision"]},
  cais:{name:"CAIS",eyebrow:"Universal AI case manager",headline:"Every investigation. Every workflow. One case system.",lede:"CAIS is a universal, AI-native case manager for fraud, AML, screening, supervision and any regulated operational workflow. Configure the case—not the codebase.",image:"/assets/products/case-manager.png",accent:"mint",capabilities:[
    {title:"Universal case model",body:"Handle fraud, AML, sanctions, trade and operational cases in one configurable schema.",icon:Workflow},
    {title:"AI case copilot",body:"Summarize evidence, recommend next actions and draft narratives with complete citations.",icon:Bot},
    {title:"Governed workflows",body:"Configure queues, SLAs, approvals, four-eyes review and escalations without rebuilding the product.",icon:CheckCircle2},
    {title:"Audit-ready evidence",body:"Preserve every event, action, decision and attachment in an immutable case history.",icon:FileCheck2}],
    steps:["Receive signal","Create universal case","Enrich with AI","Route and review","Close with evidence"],outcomes:["One case manager across risk domains","Configurable forms, stages and permissions","AI-assisted—not black-box—decisions","Full lineage from intake to disposition"]},
  abacus:{name:"ABACUS",eyebrow:"AI-native multi-gated screening",headline:"Screen through multiple gates. Decide with one answer.",lede:"ABACUS combines entity screening and real-time transaction screening in a multi-gated decision pipeline. Embeddings are one gate—not the whole decision—so semantic similarity is governed by rules, context and evidence.",accent:"amber",capabilities:[
    {title:"Entity screening",body:"Resolve and screen customers, counterparties and beneficial owners against watchlists and internal risk.",icon:Fingerprint},
    {title:"Real-time transaction screening",body:"Evaluate payment context, parties and patterns before a transaction is released.",icon:CircleDot},
    {title:"Embedding gate",body:"Use semantic similarity to surface transliterations, aliases and contextual matches beyond exact text.",icon:Sparkles},
    {title:"Multi-gate decisioning",body:"Combine deterministic rules, embeddings, graph context and policy thresholds into one explainable verdict.",icon:ShieldCheck}],
    steps:["Normalize input","Exact and fuzzy gate","Embedding gate","Context and policy gate","Release, review or block"],outcomes:["Embeddings governed as one explicit gate","Low-latency screening for live transactions","Entity and transaction evidence in one verdict","Every gate visible, tunable and auditable"]}
};

function Flow({steps}:{steps:string[]}){return <div className={styles.flow}>{steps.map((step,i)=><div className={styles.flowStep} key={step}><span>{String(i+1).padStart(2,"0")}</span><strong>{step}</strong>{i<steps.length-1&&<i/>}</div>)}</div>}

export default function ProductDetailPage(){
  const {slug=""}=useParams(); const product=products[slug];
  useDocumentTitle(product?`${product.name} · SqAId`:"Product");
  if(!product) return <Navigate to="/" replace/>;
  return <main className={`${styles.page} ${styles[product.accent]} product-fullscreen`}>
    <section className={styles.hero}><Container size="wide"><Reveal className={styles.heroInner}>
      <div className={styles.eyebrow}><Sparkles size={14}/>{product.eyebrow}</div><h1>{product.headline}</h1><p>{product.lede}</p><div className={styles.actions}><Button to="/#contact" size="lg">Request a demo <ArrowRight size={16}/></Button><a href="#capabilities">Explore capabilities</a></div>
      <div className={styles.media}>{product.image?<img src={product.image} alt={`${product.name} product interface`}/>:<div className={styles.gates}>{["RULES","EMBEDDINGS","GRAPH","POLICY"].map((g,i)=><div key={g} style={{"--i":i} as CSSProperties}><span>{g}</span></div>)}<strong>DECISION</strong></div>}</div>
    </Reveal></Container></section>
    <section id="capabilities" className={styles.capSection}><Container size="wide"><div className={styles.sectionHead}><span>What {product.name} does</span><h2>Focused capabilities.<br/>One operational truth.</h2></div><div className={styles.capGrid}>{product.capabilities.map((c,i)=>{const Icon=c.icon;return <Reveal key={c.title} delay={i*.05} className={styles.cap}><Icon/><h3>{c.title}</h3><p>{c.body}</p></Reveal>})}</div></Container></section>
    <ProductUseCases product={slug as "cais"|"abacus"} />
    <section className={styles.workflow}><Container size="wide"><div className={styles.sectionHead}><span>How it works</span><h2>From signal to governed action.</h2></div><Flow steps={product.steps}/></Container></section>
    <section className={styles.outcomes}><Container size="wide"><div className={styles.outcomeGrid}><div><span>Built for production</span><h2>AI throughout.<br/>Control throughout.</h2></div><ul>{product.outcomes.map(o=><li key={o}><CheckCircle2 size={18}/>{o}</li>)}</ul></div></Container></section>
    <section className={styles.cta}><Container><h2>See {product.name} work on your data.</h2><p>A targeted walkthrough using the workflow and risk domains that matter to your team.</p><Button to="/#contact" size="lg">Request a demo <ArrowRight size={16}/></Button></Container></section>
  </main>
}
