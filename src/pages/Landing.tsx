import Hero from "@/sections/landing/Hero";
import TrustSection from "@/sections/landing/TrustSection";
import HowWeDeploy from "@/sections/landing/HowWeDeploy";
import Industries from "@/sections/landing/Industries";
import ProductShowcase from "@/sections/landing/ProductShowcase";
import HomeIntelligence from "@/sections/landing/HomeIntelligence";
import ContactCTA from "@/sections/landing/ContactCTA";
import { useDocumentTitle } from "@/lib/use-document-title";

/**
 * Landing — hero → trust → platform → solutions → how we deploy → contact.
 *
 * Section order follows the reference vendors (trust signal immediately after
 * the hero). TrustSection self-hides until lib/trust.ts is populated.
 */
export default function Landing() {
  useDocumentTitle(null);

  return (
    <>
      <Hero />
      <TrustSection />
      <Industries />
      <HomeIntelligence />
      <ProductShowcase />
      <HowWeDeploy />
      <ContactCTA />
    </>
  );
}
