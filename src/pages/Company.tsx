import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import { useDocumentTitle } from "@/lib/use-document-title";

/** Company — placeholder about page. TODO: mission, team, careers, contact. */
export default function Company() {
  useDocumentTitle("Company");
  return (
    <>
      <PageHeader
        eyebrow="Company"
        title={
          <>
            Built by compliance & AI <em>practitioners.</em>
          </>
        }
        lede="Placeholder company page. TODO: mission, story, team, careers, and contact."
      />
      <section className="section">
        <Container>
          <p style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
            [ Company content to be built ]
          </p>
        </Container>
      </section>
    </>
  );
}
