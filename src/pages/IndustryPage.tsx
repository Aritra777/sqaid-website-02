import { useParams } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getIndustry } from "@/lib/nav-data";
import { useDocumentTitle } from "@/lib/use-document-title";
import { SITE } from "@/lib/site";
import NotFound from "./NotFound";

/** IndustryPage — data-driven template for /industries/:slug. */
export default function IndustryPage() {
  const { slug = "" } = useParams();
  const industry = getIndustry(slug);
  useDocumentTitle(industry?.label);

  if (!industry) return <NotFound />;

  return (
    <>
      <PageHeader
        eyebrow="Industry"
        title={
          <>
            SqAId for <em>{industry.label}</em>
          </>
        }
        lede={industry.blurb}
      >
        <Button href={`mailto:${SITE.email}`} size="lg">
          Request a Demo →
        </Button>
      </PageHeader>

      <section className="section">
        <Container>
          {/* TODO: industry pains → mapped solutions → proof → CTA */}
          <p style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
            [ {industry.label} — industry detail sections to be built ]
          </p>
        </Container>
      </section>
    </>
  );
}
