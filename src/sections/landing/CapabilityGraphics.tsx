/**
 * Bespoke line-art SVGs, one per solution domain. Stroke uses `currentColor`
 * so each takes the active domain's accent; a faint outer ring keeps the set
 * cohesive. No gradients/shadows — pure geometry, per the design system.
 * Order matches SOLUTIONS: [Fraud, AML, Compliance, AI].
 */
import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 240 240",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/** Fraud Detection — a shield with a scanning reticle. */
function FraudGraphic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="120" cy="120" r="96" opacity="0.16" />
      <path d="M120 44 L182 68 V122 C182 164 154 192 120 206 C86 192 58 164 58 122 V68 Z" />
      <line x1="74" y1="120" x2="166" y2="120" opacity="0.5" />
      <circle cx="120" cy="120" r="22" />
      <line x1="120" y1="90" x2="120" y2="102" />
      <line x1="120" y1="138" x2="120" y2="150" />
      <line x1="90" y1="120" x2="102" y2="120" />
      <line x1="138" y1="120" x2="150" y2="120" />
      <circle cx="120" cy="120" r="4" fill="currentColor" stroke="none" />
      <circle cx="166" cy="120" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** AML & Financial Crime — a connected node network (graph traversal). */
function AmlGraphic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="120" cy="120" r="96" opacity="0.16" />
      <line x1="120" y1="120" x2="70" y2="66" />
      <line x1="120" y1="120" x2="182" y2="84" />
      <line x1="120" y1="120" x2="64" y2="168" />
      <line x1="120" y1="120" x2="178" y2="176" />
      <line x1="120" y1="120" x2="120" y2="52" />
      <line x1="70" y1="66" x2="120" y2="52" opacity="0.6" />
      <line x1="182" y1="84" x2="178" y2="176" opacity="0.6" />
      <circle cx="120" cy="120" r="12" fill="currentColor" stroke="none" />
      <circle cx="70" cy="66" r="8" />
      <circle cx="182" cy="84" r="8" />
      <circle cx="64" cy="168" r="8" />
      <circle cx="178" cy="176" r="8" />
      <circle cx="120" cy="52" r="8" />
      <circle cx="182" cy="84" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="64" cy="168" r="3.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Compliance Operations — a document with a check badge. */
function ComplianceGraphic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="120" cy="120" r="96" opacity="0.16" />
      <path d="M78 52 H150 L172 74 V188 H78 Z" />
      <path d="M150 52 V74 H172" />
      <line x1="94" y1="98" x2="156" y2="98" opacity="0.7" />
      <line x1="94" y1="118" x2="156" y2="118" opacity="0.7" />
      <line x1="94" y1="138" x2="128" y2="138" opacity="0.7" />
      <circle cx="150" cy="168" r="22" />
      <path d="M140 168 l7 7 l13 -15" />
    </svg>
  );
}

/** AI & Automation — a processor with radiating pins. */
function AiGraphic(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="120" cy="120" r="96" opacity="0.16" />
      <rect x="80" y="80" width="80" height="80" rx="14" />
      <rect x="106" y="106" width="28" height="28" rx="6" />
      <line x1="96" y1="80" x2="96" y2="64" />
      <line x1="120" y1="80" x2="120" y2="60" />
      <line x1="144" y1="80" x2="144" y2="64" />
      <line x1="96" y1="160" x2="96" y2="176" />
      <line x1="120" y1="160" x2="120" y2="180" />
      <line x1="144" y1="160" x2="144" y2="176" />
      <line x1="80" y1="96" x2="64" y2="96" />
      <line x1="80" y1="120" x2="60" y2="120" />
      <line x1="80" y1="144" x2="64" y2="144" />
      <line x1="160" y1="96" x2="176" y2="96" />
      <line x1="160" y1="120" x2="180" y2="120" />
      <line x1="160" y1="144" x2="176" y2="144" />
      <circle cx="120" cy="60" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="60" cy="120" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="180" cy="120" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="120" cy="180" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="120" cy="120" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const CAPABILITY_GRAPHICS = [
  FraudGraphic,
  AmlGraphic,
  ComplianceGraphic,
  AiGraphic,
];
