import CapabilitiesOverlap from "@/sections/capabilities-variants/CapabilitiesOverlap";
import CapabilitiesFocus from "@/sections/capabilities-variants/CapabilitiesFocus";
import Container from "@/components/ui/Container";
import { useDocumentTitle } from "@/lib/use-document-title";

/**
 * Preview-only page comparing Capabilities section options. Not linked in nav.
 * Visit /preview/capabilities to compare, then we wire the chosen one into the
 * landing page.
 */
function VariantLabel({ tag, name, note }: { tag: string; name: string; note: string }) {
  return (
    <Container size="wide">
      <div
        style={{
          margin: "var(--space-10) 0 var(--space-6)",
          paddingTop: "var(--space-8)",
          borderTop: "1px solid var(--line-2)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-xs)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {tag}
        </span>
        <h2 style={{ fontSize: "var(--fs-h3)", marginTop: "var(--space-2)" }}>{name}</h2>
        <p style={{ color: "var(--text-2)", marginTop: "var(--space-2)" }}>{note}</p>
      </div>
    </Container>
  );
}

export default function CapabilitiesPreview() {
  useDocumentTitle("Capabilities — Options");
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <VariantLabel
        tag="Option A"
        name="Overlap bento + parallax columns"
        note="Big pinned heading; the tile panel scrolls up and overlays it; three columns drift at different parallax speeds. Scannable, matches the page's overlap language."
      />
      <CapabilitiesOverlap />

      <VariantLabel
        tag="Option B"
        name="Pinned focus rail + parallax numeral"
        note="Big pinned heading; a panel pins and stays put while scrolling advances the active domain. Left content swaps; a huge domain numeral parallaxes on the right. Editorial and cinematic."
      />
      <CapabilitiesFocus />

      <div style={{ height: "40vh" }} />
    </div>
  );
}
