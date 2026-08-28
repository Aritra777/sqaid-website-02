import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowRight, BrainCircuit, Check, ChevronRight, CircleDot, Database, Fingerprint, Languages, Pause, Play, RotateCcw, Search, ShieldCheck, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import ProductUseCases from "@/components/product/ProductUseCases";
import ProductCaseStudies from "@/components/product/ProductCaseStudies";
import { useDocumentTitle } from "@/lib/use-document-title";
import styles from "./AbacusScreeningPage.module.css";

const gates=[
  {n:"01",name:"TOKEN",score:"0.62",copy:"Normalized token overlap and ordering",icon:Fingerprint},
  {n:"02",name:"FUZZY",score:"0.81",copy:"Spelling variation and edit distance",icon:Search},
  {n:"03",name:"INDEX",score:"0.88",copy:"High-speed watchlist candidate retrieval",icon:Database},
  {n:"04",name:"SEMANTIC",score:"0.94",copy:"Multilingual contextual similarity",icon:Sparkles},
] as const;
const names=["محمد العلي","Muhammad Al Ali","Мухаммад Аль-Али","穆罕默德·阿里"];

function GateEngine(){const [active,setActive]=useState(0);const [playing,setPlaying]=useState(true);useEffect(()=>{if(!playing)return;const id=setInterval(()=>setActive(v=>(v+1)%5),1800);return()=>clearInterval(id)},[playing]);return <div className={styles.engine}>
  <div className={styles.engineTop}><span><i/>SCREENING · LIVE</span><small>EVT-ABX-90817</small><button type="button" aria-label={playing?"Pause gate animation":"Play gate animation"} onClick={()=>setPlaying(v=>!v)}>{playing?<Pause size={12}/>:<Play size={12}/>}</button></div>
  <div className={styles.engineBody}><div className={styles.input}><small>INPUT ENTITY</small><strong>Mohamad Al-Aly</strong><span>AE · DOB 1982 · individual</span></div><div className={styles.rings}>{gates.map((g,i)=><button key={g.name} className={active===i?styles.ringActive:""} onClick={()=>{setActive(i);setPlaying(false)}} style={{"--ring":i} as CSSProperties}><span>{g.n}</span><strong>{g.name}</strong><small>{g.score}</small></button>)}<button className={`${styles.aiCore} ${active===4?styles.ringActive:""}`} onClick={()=>{setActive(4);setPlaying(false)}}><BrainCircuit/><span>05</span><strong>AI</strong></button></div><div className={styles.result}><small>{active<4?`GATE ${active+1} EVIDENCE`:"AI ADJUDICATION"}</small><strong>{active<4?gates[active].copy:"Potential alias · human review"}</strong><span><i style={{width:`${active<4?gates[active].score:"0.96"}`.replace("0.","") + "%"}}/></span><b>{active<4?gates[active].score:"0.96"}</b></div></div>
  <div className={styles.timeline}>{[...gates,{name:"AI"}].map((g,i)=><i key={g.name} className={i<=active?styles.on:""}/>)}</div>
  </div>}

export default function AbacusScreeningPage(){useDocumentTitle("ABACUS · AI-native multi-gated screening");return <main className={styles.page}>
  <section className={styles.hero}><Container size="wide" className={styles.heroGrid}><Reveal className={styles.heroCopy}><div className={styles.eyebrow}><Sparkles size={14}/>ABACUS · MULTI-GATED SCREENING</div><h1>Five gates.<br/><em>One explainable decision.</em></h1><p>Embed multilingual watchlists, screen entities and transactions in real time, and send only the genuine edge cases to AI adjudication.</p><div className={styles.actions}><Button to="/#contact" size="lg">Request a demo <ArrowRight size={16}/></Button><a href="#gates">Run the five gates <ChevronRight size={15}/></a></div></Reveal><Reveal className={styles.heroVisual}><GateEngine/></Reveal></Container></section>

  <section className={styles.language}><Container size="wide" className={styles.languageGrid}><Reveal><span className={styles.label}>Multilingual watchlist intelligence</span><h2>Every script becomes searchable intelligence.</h2><p>ABACUS preserves the original name, generates governed transliterations and embeds the multilingual identity into the watchlist index.</p><div className={styles.nameStack}>{names.map((n,i)=><div key={n}><Languages/><span>{n}</span><small>{i===0?"SOURCE":i===1?"TRANSLITERATION":"MULTILINGUAL ALIAS"}</small></div>)}</div></Reveal><Reveal className={styles.vectorField}><div className={styles.axis}/>{names.map((n,i)=><i key={n} style={{"--x":`${18+i*21}%`,"--y":`${24+(i%2)*38}%`} as CSSProperties}><span>{n}</span></i>)}<div className={styles.match}><Fingerprint/><strong>ONE ENTITY</strong><small>similarity 0.94</small></div></Reveal></Container></section>

  <section id="gates" className={styles.gatesSection}><Container size="wide"><div className={styles.sectionHead}><span>Gates 01—04</span><h2>Four independent methods.<br/>One candidate set.</h2><p>The gates run in parallel for speed. Every score remains visible and individually tunable.</p></div><div className={styles.gateGrid}>{gates.map((g,i)=>{const Icon=g.icon;return <Reveal key={g.name} delay={i*.05} className={styles.gateCard}><div><span>{g.n}</span><Icon/></div><h3>{g.name.toLowerCase()} matching</h3><p>{g.copy}. Each candidate carries its own evidence, threshold and model version.</p><div className={styles.meter}><i style={{width:g.score.replace("0.","")+"%"}}/><b>{g.score}</b></div></Reveal>})}</div></Container></section>

  <section className={styles.adjudication}><Container size="wide" className={styles.adjudicationGrid}><Reveal className={styles.adjCopy}><span className={styles.label}>Gate 05 · edge cases only</span><h2>AI adjudicates the evidence—not the policy.</h2><p>When the first four gates disagree or land near a threshold, ABACUS asks its AI adjudicator to weigh the evidence, explain uncertainty and recommend human review.</p><ul><li><Check/>Every supporting and conflicting attribute cited</li><li><Check/>Confidence and uncertainty shown separately</li><li><Check/>Human control preserved at policy boundaries</li></ul></Reveal><Reveal className={styles.adjPanel}><div className={styles.adjHead}><BrainCircuit/><span>AI ADJUDICATION</span><b>EDGE CASE</b></div><div className={styles.candidate}><small>CANDIDATE</small><strong>MUHAMMAD ALI ALI</strong><span>Watchlist · WL-994281</span></div><div className={styles.evidence}>{["Name semantics","DOB proximity","Nationality","Beneficial owner"].map((e,i)=><div key={e}><span>{e}</span><i><b style={{width:`${[94,72,88,41][i]}%`}}/></i><strong>{[94,72,88,41][i]}</strong></div>)}</div><div className={styles.recommend}><ShieldCheck/><div><small>RECOMMENDATION</small><strong>REVIEW · POSSIBLE ALIAS</strong></div><span>96%</span></div></Reveal></Container></section>

  <ProductUseCases product="abacus"/>
  <ProductCaseStudies product="abacus"/>

  <section className={styles.learning}><Container size="wide"><div className={styles.sectionHead}><span>Actionable learning</span><h2>What the investigator learns<br/>improves the next event.</h2><p>Feedback is versioned, reviewable and reversible—never a silent production change.</p></div><div className={styles.loop}>{[{icon:CircleDot,t:"Alert generated",s:"EVT-90817 · review"},{icon:BrainCircuit,t:"Investigator action",s:"False positive · alias context"},{icon:RotateCcw,t:"Learning versioned",s:"FV-204 · approved"},{icon:Check,t:"Next event improved",s:"New ranking applied"}].map((item,i)=>{const Icon=item.icon;return <div key={item.t}><span><Icon/></span><small>0{i+1}</small><strong>{item.t}</strong><p>{item.s}</p>{i<3&&<i/>}</div>})}</div></Container></section>

  <section className={styles.cta}><Container><span>ABACUS</span><h2>Test the names your current screening system misses.</h2><p>Bring your multilingual edge cases and watch every gate make its evidence visible.</p><Button to="/#contact" size="lg">Request a screening run <ArrowRight size={16}/></Button></Container></section>
  </main>}
