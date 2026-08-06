import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";

/* ── Lazy routes (code-split per page) ─────────────────────────────── */
const Landing = lazy(() => import("@/pages/Landing"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const FaroPage = lazy(() => import("@/pages/products/FaroPage"));
const ArgusPage = lazy(() => import("@/pages/products/ArgusPage"));
const CaseManagerPage = lazy(() => import("@/pages/products/CaseManagerPage"));
const AbacusPage = lazy(() => import("@/pages/products/AbacusPage"));
const SolutionPage = lazy(() => import("@/pages/SolutionPage"));
const IndustryPage = lazy(() => import("@/pages/IndustryPage"));
const Company = lazy(() => import("@/pages/Company"));
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

          {/* Bespoke product pages — each has its own signature layout.
              Matched before the dynamic template below. Argus (and any
              future product) falls through to the data-driven template. */}
          <Route path="/products/faro" element={<FaroPage />} />
          <Route path="/products/argus" element={<ArgusPage />} />
          <Route path="/products/case-manager" element={<CaseManagerPage />} />
          <Route path="/products/abacus" element={<AbacusPage />} />

          {/* Dynamic, data-driven template (Argus + fallback). */}
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/solutions/:slug" element={<SolutionPage />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />
          <Route path="/company" element={<Company />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
