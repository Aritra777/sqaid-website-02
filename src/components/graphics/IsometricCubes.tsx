import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import styles from "./IsometricCubes.module.css";

// Raw RGB values — CSS vars aren't accessible in canvas context
const PALETTE = {
  white:  [216, 218, 244] as const,
  blue:   [ 47, 107, 255] as const,
  violet: [124,  92, 255] as const,
} satisfies Record<string, readonly [number, number, number]>;

type Color = keyof typeof PALETTE;

interface Cube {
  gx: number; gy: number;
  w: number;  d: number;
  hPx: number;
  color: Color;
  opacity: number;
  phase: number;
  speed: number;
  amp: number;
}

// +gx → screen lower-right | +gy → screen lower-left | up → screen up
const TX = 30;
const TY = 15;

function proj(gx: number, gy: number) {
  return { x: (gx - gy) * TX, y: (gx + gy) * TY };
}

function rgba(c: Color, a: number) {
  const [r, g, b] = PALETTE[c];
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

function drawCube(
  ctx: CanvasRenderingContext2D,
  ox: number, oy: number,
  cube: Cube,
  floatY: number,
) {
  const { gx, gy, w, d, hPx, color, opacity } = cube;

  const sc = (x: number, y: number) => {
    const p = proj(x, y);
    return { x: ox + p.x, y: oy + p.y + floatY };
  };

  const tl = sc(gx,     gy);
  const tr = sc(gx + w, gy);
  const br = sc(gx + w, gy + d);
  const bl = sc(gx,     gy + d);

  const lift = (p: { x: number; y: number }) => ({ x: p.x, y: p.y - hPx });
  const Ttl = lift(tl), Ttr = lift(tr), Tbr = lift(br), Tbl = lift(bl);

  // Right face (y=gy, goes screen-right) — darkest
  ctx.beginPath();
  ctx.moveTo(Ttl.x, Ttl.y); ctx.lineTo(Ttr.x, Ttr.y);
  ctx.lineTo( tr.x,  tr.y); ctx.lineTo( tl.x,  tl.y);
  ctx.closePath();
  ctx.fillStyle = rgba(color, opacity * 0.48);
  ctx.fill();

  // Left face (x=gx, goes screen-left) — medium
  ctx.beginPath();
  ctx.moveTo(Ttl.x, Ttl.y); ctx.lineTo(Tbl.x, Tbl.y);
  ctx.lineTo( bl.x,  bl.y); ctx.lineTo( tl.x,  tl.y);
  ctx.closePath();
  ctx.fillStyle = rgba(color, opacity * 0.66);
  ctx.fill();

  // Top face — brightest
  ctx.beginPath();
  ctx.moveTo(Ttl.x, Ttl.y); ctx.lineTo(Ttr.x, Ttr.y);
  ctx.lineTo(Tbr.x, Tbr.y); ctx.lineTo(Tbl.x, Tbl.y);
  ctx.closePath();
  ctx.fillStyle = rgba(color, opacity * 0.88);
  ctx.fill();
}

type CubeDef = [number, number, number, number, number, Color];

// [gx, gy, w, d, hPx, color] — sorted back-to-front at build time
const DEFS: CubeDef[] = [
  // Central towers
  [ 0.0,  0.0, 1.5, 1.5, 215, "white"],
  [ 1.8, -0.3, 1.2, 1.2, 185, "white"],
  [ 2.8,  1.0, 1.0, 1.0, 195, "white"],
  [-0.3,  1.8, 1.2, 1.2, 150, "violet"],
  [ 1.0,  2.8, 1.0, 1.0, 115, "white"],
  [-1.2,  0.0, 1.0, 1.0, 140, "violet"],
  [ 0.0, -1.5, 1.0, 1.0, 128, "violet"],
  [ 3.5, -0.5, 0.9, 0.9, 105, "white"],
  // Medium
  [-1.8,  1.5, 0.9, 0.9,  88, "white"],
  [ 1.5, -1.8, 0.9, 0.9,  72, "blue"],
  [ 2.5, -2.0, 0.8, 0.8,  62, "blue"],
  [-2.0, -1.0, 0.8, 0.8,  78, "violet"],
  [ 0.5,  3.5, 0.8, 0.8,  68, "violet"],
  [-2.5,  0.5, 0.8, 0.8,  52, "violet"],
  [ 3.5,  2.0, 0.7, 0.7,  82, "white"],
  // Small
  [-3.0, -0.5, 0.7, 0.7,  48, "blue"],
  [-3.5,  1.0, 0.6, 0.6,  36, "blue"],
  [ 0.5, -3.0, 0.7, 0.7,  40, "blue"],
  [-1.5, -2.5, 0.6, 0.6,  32, "white"],
  [ 4.0,  0.0, 0.6, 0.6,  46, "blue"],
  [-1.0,  3.5, 0.6, 0.6,  34, "violet"],
  [ 2.0, -3.5, 0.6, 0.6,  36, "blue"],
  [-3.5,  2.5, 0.5, 0.5,  26, "blue"],
  [ 1.0, -4.0, 0.5, 0.5,  24, "white"],
  [ 3.0,  3.5, 0.5, 0.5,  30, "violet"],
  [-2.0,  3.0, 0.5, 0.5,  20, "white"],
  [ 4.5, -2.0, 0.5, 0.5,  19, "blue"],
  [-4.0,  1.0, 0.5, 0.5,  17, "violet"],
  [ 2.5,  4.5, 0.5, 0.5,  21, "white"],
  [-2.5, -3.0, 0.4, 0.4,  16, "blue"],
  [ 0.0,  5.0, 0.5, 0.5,  14, "white"],
  [ 5.0,  0.5, 0.5, 0.5,  17, "blue"],
  [-4.5,  3.0, 0.4, 0.4,  12, "blue"],
  [ 4.0,  3.5, 0.4, 0.4,  14, "violet"],
  [-3.0,  4.0, 0.4, 0.4,  10, "white"],
  [ 3.0, -4.5, 0.4, 0.4,  12, "blue"],
  // Flat card tiles (accent)
  [-4.5, -1.5, 0.50, 0.65,  7, "violet"],
  [-3.5, -3.5, 0.40, 0.55,  8, "violet"],
  [ 4.5, -3.0, 0.45, 0.60,  7, "violet"],
  [-1.5, -5.0, 0.40, 0.50,  6, "violet"],
  [ 4.0,  3.0, 0.50, 0.60,  8, "violet"],
  [-4.5,  3.5, 0.40, 0.55,  6, "violet"],
  [ 2.0,  5.5, 0.45, 0.55,  7, "violet"],
  [ 6.0, -0.5, 0.40, 0.50,  6, "violet"],
  [-5.5,  1.5, 0.50, 0.55,  7, "blue"],
  [ 3.0, -5.0, 0.40, 0.50,  6, "blue"],
  [ 5.0,  4.0, 0.45, 0.60,  7, "violet"],
  [-2.5,  5.5, 0.40, 0.55,  6, "violet"],
  [ 5.5,  2.5, 0.45, 0.55,  7, "blue"],
  [-5.0, -2.0, 0.40, 0.50,  6, "blue"],
  [ 1.0,  6.5, 0.50, 0.60,  8, "violet"],
  [-1.0, -6.0, 0.40, 0.50,  6, "blue"],
];

// Deterministic LCG for consistent random properties
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function buildCubes(): Cube[] {
  const rng = makeRng(1337);
  return DEFS
    .map(([gx, gy, w, d, hPx, color]): Cube => ({
      gx, gy, w, d, hPx, color,
      opacity: 0.76 + rng() * 0.21,
      phase:   rng() * Math.PI * 2,
      speed:   0.35 + rng() * 0.55,
      amp:     6    + rng() * 10,
    }))
    // Painter's sort: draw far (low gx+gy) first
    .sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy));
}

const CUBES = buildCubes();

export default function IsometricCubes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let startMs: number | null = null;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas!.clientWidth;
      const H = canvas!.clientHeight;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      ctx!.resetTransform();
      ctx!.scale(dpr, dpr);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function render(ts: number) {
      if (!startMs) startMs = ts;
      const t = (ts - startMs) / 1000;

      const W = canvas!.clientWidth;
      const H = canvas!.clientHeight;

      ctx!.clearRect(0, 0, W, H);

      // Origin: horizontally centred, vertically shifted down ~52%
      const ox = W * 0.5 + 25;
      const oy = H * 0.53;

      for (const cube of CUBES) {
        const floatY = reduced ? 0 : cube.amp * Math.sin(t * cube.speed + cube.phase);
        drawCube(ctx!, ox, oy, cube, floatY);
      }

      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
