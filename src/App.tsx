import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";

/* ── Lazy routes (code-split per page) ─────────────────────────────── */
const Landing = lazy(() => import("@/pages/Landing"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const ArgusPage = lazy(() => import("@/pages/products/ArgusPage"));
const AbacusScreeningPage = lazy(() => import("@/pages/products/AbacusScreeningPage"));
const Company = lazy(() => import("@/pages/Company"));
const Careers = lazy(() => import("@/pages/careers/CareersList"));
const JobDetail = lazy(() => import("@/pages/careers/JobDetail"));
const Application = lazy(() => import("@/pages/careers/Application"));
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

          <Route path="/products/argus" element={<ArgusPage />} />
          <Route path="/products/abacus" element={<AbacusScreeningPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/products/faro" element={<Navigate to="/products/argus" replace />} />
          <Route path="/products/case-manager" element={<Navigate to="/products/cais" replace />} />
          <Route path="/solutions/*" element={<Navigate to="/products/argus" replace />} />
          <Route path="/industries/*" element={<Navigate to="/" replace />} />
          <Route path="/company" element={<Company />} />
          <Route path="/company/careers" element={<Careers />} />
          <Route path="/company/careers/:id" element={<JobDetail />} />
          <Route path="/company/careers/apply/:id" element={<Application />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
