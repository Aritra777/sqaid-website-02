import { ArrowRight, Bot, Network, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import styles from "./HomeIntelligence.module.css";

const moments=[
  {label:"Signals",title:"Detect the moment risk changes",image:"/assets/products/argus/signals.png",icon:Radio},
  {label:"Graph",title:"Connect the people, money and behavior",image:"/assets/products/argus/graph-explorer.png",icon:Network},
  {label:"Agents",title:"Launch specialist intelligence automatically",image:"/assets/products/argus/agents.png",icon:Bot},
];

export default function HomeIntelligence(){return <section className={styles.section}><Container size="wide"><div className={styles.intro}><Reveal><span>The problem ARGUS solves</span><h2>Four risk domains.<br/>Too many disconnected tools.</h2></Reveal><Reveal><p>Fraud teams monitor live payments. AML teams investigate laundering. Entity teams resolve identity. Trade teams supervise market conduct. Separate systems fragment the evidence, duplicate casework and hide the relationships that matter. ARGUS brings all four into one product.</p><Link to="/products/argus">See everything in ARGUS <ArrowRight size={16}/></Link></Reveal></div><div className={styles.moments}>{moments.map((m,i)=>{const Icon=m.icon;return <Reveal key={m.label} delay={i*.06} className={styles.moment}><div className={styles.media}><img src={m.image} alt={`${m.label} interface in ARGUS`} loading="lazy"/><div className={styles.sweep}/></div><div className={styles.caption}><span><Icon size={16}/>{m.label}</span><h3>{m.title}</h3></div></Reveal>})}</div></Container></section>}
