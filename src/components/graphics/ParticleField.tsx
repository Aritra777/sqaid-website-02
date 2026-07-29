import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import styles from "./ParticleField.module.css";
import { cn } from "@/lib/cn";

type ParticleFieldProps = {
  className?: string;
  /** node count scales with area; this is the density divisor (higher = fewer) */
  density?: number;
  /** max distance to draw a connecting edge, in px */
  linkDistance?: number;
};

type Node = { x: number; y: number; vx: number; vy: number };

/**
 * ParticleField — a lightweight animated "knowledge graph": drifting nodes
 * with edges drawn between near neighbours. Canvas 2D (no WebGL), retina-aware,
 * pauses when off-screen, and renders a single static frame under reduced
 * motion. Reads the current --accent so it recolors per product theme.
 */
export default function ParticleField({
  className,
  density = 14000,
  linkDistance = 130,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Non-null aliases so nested closures keep the narrowed types.
    const cv: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = context;
    const parent = cv.parentElement!;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;

    // read accent from CSS so the field matches the active product theme
    const accent = getComputedStyle(cv)
      .getPropertyValue("--accent")
      .trim() || "#5b8cff";

    function seed() {
      const count = Math.max(24, Math.floor((width * height) / density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cv.width = width * dpr;
      cv.height = height * dpr;
      cv.style.width = `${width}px`;
      cv.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.5;
            ctx.strokeStyle = accent;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = accent;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function loop() {
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduced) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });

    resize();
    io.observe(cv);
    ro.observe(parent);

    if (reduced) {
      draw(); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [density, linkDistance, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(styles.canvas, className)}
    />
  );
}
