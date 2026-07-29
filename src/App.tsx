import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";

/* ── Lazy routes (code-split per page) ─────────────────────────────── */
const Landing = lazy(() => import("@/pages/Landing"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const SolutionPage = lazy(() => import("@/pages/SolutionPage"));
const IndustryPage = lazy(() => import("@/pages/IndustryPage"));
const Company = lazy(() => import("@/pages/Company"));
const CapabilitiesPreview = lazy(() => import("@/pages/CapabilitiesPreview"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        color: "var(--text-3)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />

          {/* Dynamic, data-driven templates. Products can graduate to
              bespoke pages later without route changes. */}
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/solutions/:slug" element={<SolutionPage />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />
          <Route path="/company" element={<Company />} />
          <Route path="/preview/capabilities" element={<CapabilitiesPreview />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
