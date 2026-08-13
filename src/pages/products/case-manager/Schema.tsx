/* ═══════════════════════════════════════════════════════════════════════
   CASE MANAGER · SCHEMA — "Every alert type has its own shape."
   Two-column: left editorial (GhostNumeral + copy) / right BrowserChrome
   (split: field shelf left | live JSON schema right) with scripted binding
   animation and PlaybackControls.

   Ported from the Tailwind reference (sqaid-website-reference · Schema.jsx).
   Token translation: VIOLET→var(--accent); rgb(var(--fg-rgb)/α)→tokens;
   inline hex fills→var(--accent-softer)/var(--line)*; var(--fg)→var(--text);
   'JetBrains Mono'→var(--font-mono); .noise→omitted; .font-display→
   var(--font-display). No shadows, no gradients, no hex literals in styles.

   This section lives inside a <Band tone="light"> — it inherits .invert tokens
   (--fg-rgb, --accent, --bg, --text etc.). Do NOT add Band or set bg here.
   ═══════════════════════════════════════════════════════════════════════ */
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";
import {
  sharedFields,
  alertTypeFields,
  alertTypeTabs,
  extensibleNote,
} from "./data";
import {
  MonoLabel,
  GhostNumeral,
  BrowserChrome,
  PlaybackControls,
} from "./primitives";
import styles from "./Schema.module.css";

/* ── JSON schema builder ─────────────────────────────────────────────── */
function jsonSchema(type: string, placedFields: { k: string; t: string }[]) {
  const all = [...sharedFields, ...placedFields];
  const body = all
    .map((f, i) => `    "${f.k}": "${f.t}"${i < all.length - 1 ? "," : ""}`)
    .join("\n");
  return `{\n  "alert_type": "${type}",\n  "fields": {\n${body}\n  }\n}`;
}

/* ── Main section ────────────────────────────────────────────────────── */
export default function Schema() {
  const reduced = usePrefersReducedMotion();

  const [type, setType] = useState("aml");
  const fields = alertTypeFields[type];

  /* reduced-motion: start fully bound (all fields placed, no timers) */
  const [placed, setPlaced] = useState(reduced ? fields.length : 0);
  const [playing, setPlaying] = useState(!reduced);

  /* scripted binding timer — one field every 900 ms */
  useEffect(() => {
    if (reduced || !playing) return;
    if (placed >= fields.length) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setPlaced((p) => p + 1), 900);
    return () => clearTimeout(id);
  }, [placed, playing, fields.length, reduced]);

  /* switch alert type — reset playback */
  const pick = useCallback(
    (id: string) => {
      setType(id);
      setPlaced(reduced ? alertTypeFields[id].length : 0);
      setPlaying(!reduced);
    },
    [reduced]
  );

  const replay = useCallback(() => {
    setPlaced(0);
    setPlaying(true);
  }, []);

  const stepFwd = useCallback(() => {
    setPlaying(false);
    setPlaced((p) => Math.min(fields.length, p + 1));
  }, [fields.length]);

  const placedFields = fields.slice(0, placed);
  const schema = jsonSchema(type, placedFields);

  const badgeLabel = placed >= fields.length ? "SCHEMA UPDATED" : "BINDING";

  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        {/* ── Left: editorial copy ─────────────────────────────────── */}
        <div className={styles.copy}>
          <GhostNumeral n="01" className={styles.numeral} />
          <div className={styles.copyInner}>
            <MonoLabel tone="accent">SCHEMA · CONFIGURABLE FIELD MODEL</MonoLabel>
            <Reveal>
              <h2 className={styles.h2}>
                Every alert type
                <br />
                has its own shape.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={styles.para}>
                A small set of mandatory fields is shared by every case.
                Everything else is defined per alert type &mdash; no migrations,
                no redeploys. Add a field this afternoon and it&rsquo;s in the
                schema.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className={styles.note}>{extensibleNote}</p>
            </Reveal>
          </div>
        </div>

        {/* ── Right: BrowserChrome field shelf + live JSON ─────────── */}
        <Reveal delay={0.1}>
          <BrowserChrome
            label="sqaid / field-shelf"
            right={
              <MonoLabel tone="accent" className={styles.badge}>
                {badgeLabel}
              </MonoLabel>
            }
          >
            <div className={styles.panels}>
              {/* ── Left panel: field shelf ──────────────────────── */}
              <div className={styles.shelf}>
                {/* SHARED chips */}
                <MonoLabel tone="muted">SHARED · ALL CASES</MonoLabel>
                <div className={styles.chipRow}>
                  {sharedFields.map((f) => (
                    <span key={f.k} className={styles.chipShared}>
                      {f.k}
                    </span>
                  ))}
                </div>

                {/* Alert type tabs */}
                <div className={styles.tabRow}>
                  <MonoLabel tone="muted" className={styles.tabLabel}>
                    ALERT TYPE
                  </MonoLabel>
                  {alertTypeTabs.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      data-testid={`schema-type-${t.id}`}
                      onClick={() => pick(t.id)}
                      className={styles.tab}
                      data-active={type === t.id ? "true" : undefined}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* EXTRA FIELDS chips — dim + shrink as they get bound */}
                <MonoLabel tone="muted">EXTRA FIELDS · SHELF</MonoLabel>
                <div className={styles.extraRow}>
                  {fields.map((f, i) => {
                    const gone = i < placed;
                    return (
                      <motion.span
                        key={`${type}-${f.k}`}
                        layout
                        animate={{
                          opacity: gone ? 0.25 : 1,
                          scale: gone ? 0.94 : 1,
                        }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                        className={styles.chipExtra}
                        data-gone={gone ? "true" : undefined}
                      >
                        {f.k}
                      </motion.span>
                    );
                  })}
                </div>

                {/* BIN footer */}
                <div className={styles.bin}>
                  <MonoLabel tone="muted" className={styles.binLabel}>
                    BIN · {type.toUpperCase()}
                  </MonoLabel>
                  <MonoLabel tone="accent">
                    {placed} FIELD{placed === 1 ? "" : "S"} BOUND
                  </MonoLabel>
                </div>
              </div>

              {/* ── Right panel: live JSON schema ────────────────── */}
              <div className={styles.livePane}>
                <MonoLabel tone="muted">SCHEMA · LIVE</MonoLabel>
                <pre className={styles.pre}>
                  <AnimatePresence mode="wait">
                    <motion.code
                      key={schema}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.4 }}
                      transition={{ duration: 0.25 }}
                    >
                      {schema}
                    </motion.code>
                  </AnimatePresence>
                </pre>
              </div>
            </div>
          </BrowserChrome>

          {/* Playback controls */}
          <PlaybackControls
            onReplay={replay}
            onStep={stepFwd}
            step={placed}
            total={fields.length + 1}
            playing={playing}
          />
        </Reveal>
      </div>
    </div>
  );
}
