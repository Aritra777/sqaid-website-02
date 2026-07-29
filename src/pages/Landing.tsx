import Hero from "@/sections/landing/Hero";
import BigStatement from "@/sections/landing/BigStatement";
import ProductShowcase from "@/sections/landing/ProductShowcase";
import Capabilities from "@/sections/landing/Capabilities";
import ContactCTA from "@/sections/landing/ContactCTA";
import { useDocumentTitle } from "@/lib/use-document-title";

/**
 * Landing — the home page. Composes landing sections top to bottom.
 * TODO placeholders to add: Process, Industries, SocialProof/Logos, About.
 */
export default function Landing() {
  useDocumentTitle(null); // brand default title

  return (
    <>
      <Hero />
      <BigStatement />
      <ProductShowcase />
      <Capabilities />
      {/* TODO: <Process /> <Industries /> <About /> */}
      <ContactCTA />
    </>
  );
}
