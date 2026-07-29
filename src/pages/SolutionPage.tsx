import { useParams } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getSolution } from "@/lib/nav-data";
import { useDocumentTitle } from "@/lib/use-document-title";
import { SITE } from "@/lib/site";
import NotFound from "./NotFound";

/**
 * SolutionPage — data-driven template for /solutions/:slug. Covers all 14
 * solutions from one template. TODO: per-solution deep-dive content.
 */
export default function SolutionPage() {
  const { slug = "" } = useParams();
  const solution = getSolution(slug);
  useDocumentTitle(solution?.label);

  if (!solution) return <NotFound />;

  return (
    <>
      <PageHeader
        eyebrow="Solution"
        title={solution.label}
        lede={solution.description}
      >
        <Button href={`mailto:${SITE.email}`} size="lg">
          Request a Demo →
        </Button>
      </PageHeader>

      <section className="section">
        <Container>
          {/* TODO: problem → approach → outcomes → related products */}
          <p style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
            [ {solution.label} — solution detail sections to be built ]
          </p>
        </Container>
      </section>
    </>
  );
}
