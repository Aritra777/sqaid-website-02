/**
 * verify:metrics — the guard that keeps unsubstantiated numbers off the site.
 *
 * Fails the build when:
 *   1. content references a metric id that does not exist, or
 *   2. a hard-coded stat literal reappears in a content file (bypassing
 *      lib/metrics.ts entirely), or
 *   3. a `customer` metric has a value but still no source, or a `spec` /
 *      `statute` metric is missing its owner / citation.
 *
 * Always reports which metrics are still awaiting real data, so the list of
 * what to ask customers and marketing for is one command away.
 *
 * Run: npm run verify:metrics   (also runs as part of npm run build)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SRC = join(ROOT, "src");

/* ── parse metrics.ts ──────────────────────────────────────────────────
   Line-based rather than one multiline regex: `value` can be a string
   literal ("<5"), null, or a computed expression (String(PRODUCTS.length))
   for derived metrics, and a regex covering all three is easy to get subtly
   wrong — a mismatch silently drops metrics and reports them as unknown. */
const metricsSrc = readFileSync(join(SRC, "lib", "metrics.ts"), "utf8");
const lines = metricsSrc.split("\n");

const entries = [];
let cur = null;

for (const line of lines) {
  const id = line.match(/^\s*id:\s*"([^"]+)"/);
  if (id) {
    if (cur) entries.push(cur);
    cur = { id: id[1], value: undefined, basis: null, hasSource: false, owner: false, citation: false };
    continue;
  }
  if (!cur) continue;

  const value = line.match(/^\s*value:\s*(.+?),\s*$/);
  if (value && cur.value === undefined) {
    cur.value = value[1].trim() === "null" ? null : value[1].trim();
  }
  const basis = line.match(/^\s*basis:\s*"(\w+)"/);
  if (basis) cur.basis = basis[1];
  if (/^\s*source:\s*"[^"]+"/.test(line)) cur.hasSource = true;
  if (/^\s*owner:\s*"[^"]+"/.test(line)) cur.owner = true;
  if (/^\s*citation:\s*"[^"]+"/.test(line)) cur.citation = true;
}
if (cur) entries.push(cur);

const parsed = entries.filter((e) => e.basis);

if (parsed.length === 0) {
  console.error("verify:metrics — could not parse any metrics from lib/metrics.ts");
  process.exit(1);
}

const ids = new Set(parsed.map((e) => e.id));
const errors = [];

/* ── scan content for unknown ids and hard-coded stats ── */
function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const contentFiles = walk(SRC).filter(
  (p) =>
    /-content\.ts$/.test(p) ||
    /pages[\\/].*\.tsx$/.test(p) ||
    /sections[\\/].*\.tsx$/.test(p)
);

/** stat-shaped literals that mean someone hard-coded a number again */
const HARDCODED = [
  /\bvalue:\s*"(\d+(?:[–-]\d+)?|<\d+|\d+%)"/g,
  /\b\d{2,3}%\s*(?:false positive|fewer|reduction|faster)/gi,
];

for (const file of contentFiles) {
  const text = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);

  for (const [, list] of text.matchAll(/metricIds:\s*\[([^\]]*)\]/g)) {
    for (const raw of list.split(",")) {
      const key = raw.trim().replace(/^["']|["']$/g, "");
      if (key && !ids.has(key)) {
        errors.push(`${rel}: references unknown metric id "${key}"`);
      }
    }
  }

  /* An explicitly-marked product mockup may carry fake numbers, provided the
     panel is visibly badged as sample data. The marker is deliberately
     verbose so it cannot be added casually to silence this check. */
  const isMockUi = text.includes("metrics-guard:mock-ui");

  for (const re of HARDCODED) {
    if (isMockUi) break;
    for (const m of text.matchAll(re)) {
      errors.push(
        `${rel}: hard-coded stat ${JSON.stringify(m[0])} — route it through lib/metrics.ts`
      );
    }
  }
}

/* ── internal consistency of metrics.ts ── */
for (const e of parsed) {
  if (e.basis === "customer" && e.value !== null && !e.hasSource) {
    errors.push(`lib/metrics.ts: "${e.id}" has a value but basis:"customer" with no source`);
  }
  if (e.basis === "spec" && !e.owner) {
    errors.push(`lib/metrics.ts: "${e.id}" is basis:"spec" but declares no owner`);
  }
  if (e.basis === "statute" && !e.citation) {
    errors.push(`lib/metrics.ts: "${e.id}" is basis:"statute" but declares no citation`);
  }
}

/* ── report ── */
const pending = parsed.filter(
  (e) => e.value === null || (e.basis === "customer" && !e.hasSource)
);

console.log(`verify:metrics — ${parsed.length - pending.length}/${parsed.length} metrics publishable`);

const byBasis = {};
for (const e of parsed) byBasis[e.basis] = (byBasis[e.basis] || 0) + 1;
console.log(
  "  " +
    Object.entries(byBasis)
      .map(([b, n]) => `${b}: ${n}`)
      .join("  ·  ")
);

if (pending.length) {
  console.log(`\n  awaiting real data (hidden from every page until supplied):`);
  for (const p of pending) console.log(`    · ${p.id.padEnd(24)} [${p.basis}]`);
  console.log(`\n  to publish one: set value + source in src/lib/metrics.ts`);
}

if (errors.length) {
  console.error(`\n  ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(`    x ${e}`);
  process.exit(1);
}

console.log("\n  no unsubstantiated numbers reachable from content. OK");
