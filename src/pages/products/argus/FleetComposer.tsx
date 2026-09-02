/* ═══════════════════════════════════════════════════════════════════════
   ARGUS · 02 — FleetComposer (interactive)
   Pick an alert type → preset squad; toggle agent chips in/out of the squad;
   a live roster panel assembles the crew. Ported faithfully from the reference
   build onto our tokens + CSS Modules. Accent = Argus green (var(--accent)).
   ═══════════════════════════════════════════════════════════════════════ */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";
import Reveal from "@/components/motion/Reveal";
import { MonoLabel, GhostNumeral } from "./primitives";
import { fleetAgents, alertTypes } from "./data";
import styles from "./FleetComposer.module.css";

export default function FleetComposer() {
  const [type, setType] = useState(alertTypes[0].id);
  const [squad, setSquad] = useState<string[]>(alertTypes[0].squad);
  const [hover, setHover] = useState<string | null>(null);

  const pickType = (t: (typeof alertTypes)[number]) => {
    setType(t.id);
    setSquad(t.squad);
  };
  const toggle = (id: string) => {
    setSquad((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const roster = fleetAgents.filter((a) => squad.includes(a.id));

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <GhostNumeral n="02" className={styles.numeral} />
          <MonoLabel tone="accent">CONFIGURABLE FLEET</MonoLabel>
          <Reveal>
            <h2 className={styles.title}>Every alert gets its own crew.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.lede}>
              Fraud, AML, entity and trade workloads each assemble the agents,
              models and tools their policy requires. The roster is configurable,
              and every contribution remains part of the case evidence.
            </p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {/* composer canvas */}
          <div className={styles.canvas}>
            <div className={styles.typeRow}>
              <MonoLabel className={styles.typeLabel}>ALERT TYPE</MonoLabel>
              {alertTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => pickType(t)}
                  className={cn(styles.typePill, type === t.id && styles.typePillOn)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <MonoLabel className={styles.tapLabel}>
              TAP TO COMPOSE — {squad.length} IN SQUAD
            </MonoLabel>
            <div className={styles.chips}>
              {fleetAgents.map((a) => {
                const inSquad = squad.includes(a.id);
                return (
                  <motion.button
                    key={a.id}
                    layout
                    onClick={() => toggle(a.id)}
                    onMouseEnter={() => setHover(a.id)}
                    onMouseLeave={() => setHover(null)}
                    transition={{ layout: { duration: 0.4, ease: EASE_OUT } }}
                    className={cn(styles.chip, inSquad && styles.chipOn)}
                  >
                    <div className={styles.chipTop}>
                      <span
                        className={cn(styles.check, inSquad && styles.checkOn)}
                      >
                        {inSquad && <Check size={10} strokeWidth={3} />}
                      </span>
                      <span className={styles.chipName}>{a.name}</span>
                    </div>
                    <AnimatePresence>
                      {hover === a.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className={styles.chipMeta}
                        >
                          <MonoLabel tone="accent" className={styles.chipTag}>
                            {a.tag}
                          </MonoLabel>
                          <span className={styles.chipRole}>{a.role}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
              <button className={styles.addBtn}>
                <Plus size={13} className={styles.addIcon} />
                <span className={styles.addLabel}>ADD AGENT</span>
              </button>
            </div>
          </div>

          {/* live roster */}
          <div className={styles.roster}>
            <div className={styles.rosterHead}>
              <MonoLabel tone="accent">ASSEMBLED CREW</MonoLabel>
              <MonoLabel className={styles.rosterCount}>
                {roster.length} AGENTS
              </MonoLabel>
            </div>
            <motion.div layout className={styles.rosterList}>
              <AnimatePresence mode="popLayout">
                {roster.map((a, i) => (
                  <motion.div
                    key={a.id}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className={styles.rosterItem}
                  >
                    <span className={styles.rosterNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.rosterBody}>
                      <div className={styles.rosterTop}>
                        <span className={styles.rosterName}>{a.name}</span>
                        <MonoLabel className={styles.rosterTag}>{a.tag}</MonoLabel>
                      </div>
                      <p className={styles.rosterRole}>{a.role}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            {squad.length < fleetAgents.length && (
              <div className={styles.more}>
                + {fleetAgents.length - squad.length} MORE AVAILABLE
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
