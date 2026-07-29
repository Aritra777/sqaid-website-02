import { useParams } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getProduct } from "@/lib/nav-data";
import { useDocumentTitle } from "@/lib/use-document-title";
import { SITE } from "@/lib/site";
import NotFound from "./NotFound";

/**
 * ProductPage — data-driven template for /products/:slug. Wraps everything in
 * the product's accent theme. Placeholder body sections marked with TODO —
 * each product will get bespoke content (Argus graph explorer, Faro pipeline…).
 */
export default function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  useDocumentTitle(product?.name);

  if (!product) return <NotFound />;

  const live = product.status === "live";

  return (
    <div className={product.theme}>
      <PageHeader
        eyebrow={`Product · ${product.name}`}
        title={
          <>
            {product.name} — <em>{product.tagline}</em>
          </>
        }
        lede="Placeholder product overview. This template carries the product accent; drop bespoke sections below (feature grid, product screenshots, interactive demo, pricing/CTA)."
      >
        {live ? (
          <Button href={`mailto:${SITE.email}`} size="lg">
            Request a Demo →
          </Button>
        ) : (
          <Badge tone="soon">Coming soon</Badge>
        )}
      </PageHeader>

      <section className="section">
        <Container>
          {/* TODO: product feature grid / screenshots / interactive demo */}
          <p style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
            {/* placeholder */}
            [ {product.name} content sections — to be built ]
          </p>
        </Container>
      </section>
    </div>
  );
}
