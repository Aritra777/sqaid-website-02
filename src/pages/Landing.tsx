import Hero from "@/sections/landing/Hero";
import BigStatement from "@/sections/landing/BigStatement";
import ProductShowcase from "@/sections/landing/ProductShowcase";
import Capabilities from "@/sections/landing/Capabilities";
import UseCasesScroll from "@/sections/landing/UseCasesScroll";
import ContactCTA from "@/sections/landing/ContactCTA";
import { useDocumentTitle } from "@/lib/use-document-title";

export default function Landing() {
  useDocumentTitle(null);

  return (
    <>
      <Hero />
      <BigStatement />
      <ProductShowcase />
      <Capabilities />
      <UseCasesScroll />
      <ContactCTA />
    </>
  );
}
