import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowRight, BadgeCheck, BellRing, BrainCircuit, Check, ChevronRight, Database, Fingerprint, Gauge, GitBranch, Languages, MessageSquareText, Pause, Play, Search, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
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
const screeningScenarios=[
  {input:"Mohamad Al-Aly",meta:"AE · DOB 1982 · individual",candidate:"محمد العلي · WL-994281",scores:["0.62","0.81","0.88","0.94"],outcome:"POSSIBLE ALIAS · REVIEW",confidence:"0.96"},
  {input:"M. Alali Trading",meta:"GB · company · payment party",candidate:"Al Ali General Trading · WL-771024",scores:["0.48","0.76","0.91","0.87"],outcome:"OWNERSHIP CONTEXT · REVIEW",confidence:"0.89"},
  {input:"Jon Smyth",meta:"US · DOB 1991 · individual",candidate:"John Smith · WL-118803",scores:["0.42","0.69","0.35","0.58"],outcome:"LOW RISK · RELEASE",confidence:"0.93"},
] as const;
const learningSteps=[
  {icon:BellRing,eyebrow:"SCREENING EVENT",title:"Alert generated",summary:"A multilingual alias crosses the review threshold.",event:"ABX-SCR-90817",detail:"Mohamad Al-Aly matched a sanctioned identity across Arabic and Latin scripts.",evidence:"Semantic 0.94 · Index 0.88",status:"Sent to investigator"},
  {icon:UserCheck,eyebrow:"HUMAN CONTEXT",title:"Investigator decision",summary:"The investigator captures why the match is not the same person.",event:"DEC-90817",detail:"False positive: shared surname, but date of birth and beneficial owner conflict.",evidence:"Reason code · supporting note",status:"Decision recorded"},
  {icon:GitBranch,eyebrow:"GOVERNED UPDATE",title:"Learning versioned",summary:"ABACUS proposes a traceable ranking adjustment.",event:"FV-204",detail:"Candidate rank weight reduced by 8% for this evidence pattern after approval.",evidence:"Reviewer · timestamp · rollback",status:"Version approved"},
  {icon:Gauge,eyebrow:"NEXT SCREENING",title:"Next event improved",summary:"The same weak pattern is ranked earlier and explained better.",event:"ABX-SCR-91342",detail:"The prior decision informs ranking while every policy threshold remains unchanged.",evidence:"FV-204 attached · full lineage",status:"Applied with evidence"},
] as const;

function GateEngine(){const [active,setActive]=useState(0);const [playing,setPlaying]=useState(true);const [scenario,setScenario]=useState(0);const sample=screeningScenarios[scenario];useEffect(()=>{if(!playing)return;const id=setInterval(()=>setActive(v=>(v+1)%5),1650);return()=>clearInterval(id)},[playing]);const run=(i:number)=>{setScenario(i);setActive(0);setPlaying(true)};return <div className={styles.engine}>
  <div className={styles.engineTop}><span><i/>SANCTIONS SCREENING · LIVE</span><small>EVT-ABX-90817</small><button type="button" aria-label={playing?"Pause gate animation":"Play gate animation"} onClick={()=>setPlaying(v=>!v)}>{playing?<Pause size={12}/>:<Play size={12}/>}</button></div>
  <div className={styles.scenarioPicker}><span>TRY A SCREENING</span>{screeningScenarios.map((s,i)=><button type="button" key={s.input} className={scenario===i?styles.scenarioActive:""} onClick={()=>run(i)}>{s.input}</button>)}</div>
  <div className={styles.engineBody}><div className={styles.input}><small>PARTY TO SCREEN</small><strong>{sample.input}</strong><span>{sample.meta}</span></div><div className={styles.gateDock}><small>CLICK TO INSPECT</small><div>{gates.map((g,i)=><button type="button" aria-label={`Show ${g.name} evidence`} className={active===i?styles.dockActive:""} onClick={()=>{setActive(i);setPlaying(false)}} key={g.name}>{g.n}<span>{g.name}</span></button>)}<button type="button" aria-label="Show AI adjudication" className={active===4?styles.dockActive:""} onClick={()=>{setActive(4);setPlaying(false)}}>05<span>AI</span></button></div></div><div className={styles.rings}>{gates.map((g,i)=><button aria-label={`${g.name.toLowerCase()} screening ring`} key={g.name} className={`${active===i?styles.ringActive:""} ${i<active||active===4?styles.ringPassed:""}`} onClick={()=>{setActive(i);setPlaying(false)}} style={{"--ring":i} as CSSProperties}><span>{g.n}</span><strong>{g.name}</strong><small>{sample.scores[i]}</small></button>)}<button aria-label="AI adjudication core" className={`${styles.aiCore} ${active===4?styles.ringActive:""}`} onClick={()=>{setActive(4);setPlaying(false)}}><BrainCircuit/><span>05</span><strong>AI</strong></button><i className={styles.scanBeam}/></div><div className={styles.candidateHit}><small>WATCHLIST CANDIDATE</small><strong>{sample.candidate}</strong><span>{active<4?`${gates[active].name} evidence received`:sample.outcome}</span></div><div className={styles.result}><small>{active<4?`GATE ${active+1} · ${gates[active].name}`:"GATE 5 · AI ADJUDICATION"}</small><strong>{active<4?gates[active].copy:sample.outcome}</strong><p>{active<4?`Independent score ${sample.scores[active]} · click another gate to inspect`:"All supporting and conflicting attributes weighed together"}</p><span><i style={{width:`${active<4?sample.scores[active]:sample.confidence}`.replace("0.","") + "%"}}/></span><b>{active<4?sample.scores[active]:sample.confidence}</b></div></div>
  <div className={styles.timeline}>{[...gates,{name:"AI"}].map((g,i)=><i key={g.name} className={i<=active?styles.on:""}/>)}</div>
  </div>}

function AiDecisionSimulator(){const prompts=["Why was this escalated?","What evidence conflicts?","What should the analyst verify?"];const answers=[
  "The semantic gate found a strong cross-script alias (0.94), while token matching was weaker (0.62). The disagreement and nearby date of birth require human review.",
  "Name semantics, nationality and candidate retrieval support the match. The date of birth and beneficial-owner relationship weaken it. ABACUS keeps both sides visible.",
  "Confirm the original-script identity, verify the date-of-birth source and inspect whether the payment beneficiary is controlled by WL-994281.",
];const [prompt,setPrompt]=useState(0);return <div className={styles.aiSimulator}>
  <div className={styles.aiSimTop}><div><BrainCircuit/><span>ABACUS AI · EXPLAIN DECISION</span></div><b>SIMULATION</b></div>
  <div className={styles.promptRail}>{prompts.map((p,i)=><button type="button" className={prompt===i?styles.promptActive:""} onClick={()=>setPrompt(i)} key={p}><MessageSquareText/>{p}</button>)}</div>
  <div className={styles.aiResponse}><div className={styles.aiAvatar}><Sparkles/></div><div><small>GROUNDED RESPONSE · EVT-ABX-90817</small><p>{answers[prompt]}</p><span><ShieldCheck/> Based on gate evidence and policy version SC-41. No autonomous disposition.</span></div></div>
  <div className={styles.aiEvidenceStrip}>{gates.map((g,i)=><button type="button" key={g.name} onClick={()=>setPrompt(i===3?0:1)}><span>{g.name}</span><strong>{screeningScenarios[0].scores[i]}</strong><i style={{width:screeningScenarios[0].scores[i].replace("0.","")+"%"}}/></button>)}</div>
  </div>}

function LearningLoop(){const [active,setActive]=useState(0);const step=learningSteps[active];return <div className={styles.learningExperience}>
  <div className={styles.loop} role="tablist" aria-label="ABACUS governed learning cycle">{learningSteps.map((item,i)=>{const Icon=item.icon;return <button type="button" role="tab" aria-selected={active===i} aria-controls="learning-detail" id={`learning-step-${i}`} className={active===i?styles.loopActive:""} key={item.title} onClick={()=>setActive(i)}>
    <span className={styles.loopIcon}><Icon/></span><small>0{i+1} · {item.eyebrow}</small><strong>{item.title}</strong><p>{item.summary}</p><em>Explore stage <ChevronRight/></em>{i<3&&<i className={styles.connector}/>}<b className={styles.stepProgress}/>
  </button>})}</div>
  <div className={styles.learningDetail} id="learning-detail" role="tabpanel" aria-labelledby={`learning-step-${active}`}>
    <div className={styles.detailIdentity}><span>ACTIVE STAGE · 0{active+1}</span><strong>{step.event}</strong><p>{step.detail}</p></div>
    <div><span>VISIBLE EVIDENCE</span><strong>{step.evidence}</strong><p>Open the event to inspect every score, decision and model version.</p></div>
    <div className={styles.detailStatus}><BadgeCheck/><span>CURRENT STATE</span><strong>{step.status}</strong></div>
  </div>
  <p className={styles.guardrail}><ShieldCheck/> Human feedback changes evidence ranking—not policy. Every update is approved, versioned and reversible.</p>
  </div>}

export default function AbacusScreeningPage(){useDocumentTitle("ABACUS · AI-native multi-gated screening");return <main className={styles.page}>
  <section className={styles.hero}><Container size="wide" className={styles.heroGrid}><Reveal className={styles.heroCopy}><div className={styles.eyebrow}><Sparkles size={14}/>ABACUS · MULTI-GATED SCREENING</div><h1>Five gates.<br/><em>One explainable decision.</em></h1><p>Embed multilingual watchlists, screen entities and transactions in real time, and send only the genuine edge cases to AI adjudication.</p><div className={styles.actions}><Button to="/#contact" size="lg">Request a demo <ArrowRight size={16}/></Button><a href="#gates">Run the five gates <ChevronRight size={15}/></a></div></Reveal><Reveal className={styles.heroVisual}><GateEngine/></Reveal></Container></section>

  <section className={styles.language}><Container size="wide" className={styles.languageGrid}><Reveal><span className={styles.label}>Multilingual watchlist intelligence</span><h2>Every script becomes searchable intelligence.</h2><p>ABACUS preserves the original name, generates governed transliterations and embeds the multilingual identity into the watchlist index.</p><div className={styles.nameStack}>{names.map((n,i)=><div key={n}><Languages/><span>{n}</span><small>{i===0?"SOURCE":i===1?"TRANSLITERATION":"MULTILINGUAL ALIAS"}</small></div>)}</div></Reveal><Reveal className={styles.vectorField}><div className={styles.axis}/>{names.map((n,i)=><i key={n} style={{"--x":`${18+i*21}%`,"--y":`${24+(i%2)*38}%`} as CSSProperties}><span>{n}</span></i>)}<div className={styles.match}><Fingerprint/><strong>ONE ENTITY</strong><small>similarity 0.94</small></div></Reveal></Container></section>

  <section id="gates" className={styles.gatesSection}><Container size="wide"><div className={styles.sectionHead}><span>Gates 01—04</span><h2>Four independent methods.<br/>One candidate set.</h2><p>The gates run in parallel for speed. Every score remains visible and individually tunable.</p></div><div className={styles.gateGrid}>{gates.map((g,i)=>{const Icon=g.icon;return <Reveal key={g.name} delay={i*.05} className={styles.gateCard}><div><span>{g.n}</span><Icon/></div><h3>{g.name.toLowerCase()} matching</h3><p>{g.copy}. Each candidate carries its own evidence, threshold and model version.</p><div className={styles.meter}><i style={{width:g.score.replace("0.","")+"%"}}/><b>{g.score}</b></div></Reveal>})}</div></Container></section>

  <section className={styles.adjudication}><Container size="wide"><div className={styles.adjudicationGrid}><Reveal className={styles.adjCopy}><span className={styles.label}>Gate 05 · edge cases only</span><h2>AI explains the ambiguity—not just another score.</h2><p>Most candidates are resolved by the first four gates. When their evidence conflicts, ABACUS assembles the case, separates supporting from conflicting attributes and recommends the next review action.</p><ul><li><Check/>Every supporting and conflicting attribute cited</li><li><Check/>Confidence and uncertainty shown separately</li><li><Check/>Human control preserved at policy boundaries</li></ul></Reveal><Reveal className={styles.adjPanel}><div className={styles.adjHead}><BrainCircuit/><span>AI ADJUDICATION</span><b>EDGE CASE</b></div><div className={styles.candidate}><small>CANDIDATE</small><strong>MUHAMMAD ALI ALI</strong><span>Watchlist · WL-994281</span></div><div className={styles.evidence}>{["Name semantics","DOB proximity","Nationality","Beneficial owner"].map((e,i)=><div key={e}><span>{e}</span><i><b style={{width:`${[94,72,88,41][i]}%`}}/></i><strong>{[94,72,88,41][i]}</strong></div>)}</div><div className={styles.recommend}><ShieldCheck/><div><small>RECOMMENDATION</small><strong>REVIEW · POSSIBLE ALIAS</strong></div><span>96%</span></div></Reveal></div><Reveal><AiDecisionSimulator/></Reveal></Container></section>

  <ProductUseCases product="abacus"/>
  <ProductCaseStudies product="abacus"/>

  <section className={styles.learning}><Container size="wide"><div className={styles.sectionHead}><span>Actionable learning</span><h2>Every reviewed alert makes<br/>the next decision sharper.</h2><p>Click through a real learning cycle. ABACUS converts investigator context into governed, explainable improvements—without silently changing production policy.</p></div><LearningLoop/></Container></section>

  <section className={styles.cta}><Container><span>ABACUS</span><h2>Test the names your current screening system misses.</h2><p>Bring your multilingual edge cases and watch every gate make its evidence visible.</p><Button to="/#contact" size="lg">Request a screening run <ArrowRight size={16}/></Button></Container></section>
  </main>}
