import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
const Home = lazy(() => import("@/pages/experience/Home"));
const Product = lazy(() => import("@/pages/experience/Product"));
const Platform = lazy(() => import("@/pages/experience/Platform"));
const Solutions = lazy(() => import("@/pages/experience/Solutions"));
const Company = lazy(() => import("@/pages/experience/Company"));
const Careers = lazy(() => import("@/pages/experience/Careers"));
const Contact = lazy(() => import("@/pages/experience/Contact"));
const LegacyCase = lazy(() => import("@/pages/experience/LegacyCase"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const legacySolutions: Record<string, string> = {
  "fraud-detection": "/products/argus/fraud",
  "transaction-monitoring": "/products/argus/fraud",
  "ato-detection": "/products/argus/fraud",
  "new-account-fraud": "/solutions/customer-lifecycle",
  "payment-fraud": "/products/argus/fraud",
  "aml-financial-crime": "/solutions/financial-crime",
  "aml-transaction-monitoring": "/products/argus/aml",
  "sanctions-screening": "/products/abacus",
  "customer-risk-rating": "/products/kyc",
  "financial-crime-investigation": "/solutions/financial-crime",
  "compliance-operations": "/solutions/financial-crime",
  "case-management": "/products/cais",
  "sar-filing": "/products/cais",
  "regulatory-reporting": "/contact?product=Reporting",
  "ai-automation": "/products/brain",
  "agentic-investigation": "/products/brain",
  "ai-narrative": "/products/brain",
  "mcp-server": "/products/brain",
};
function SolutionRoute() {
  const { slug } = useParams();
  return slug && legacySolutions[slug] ? (
    <Navigate to={legacySolutions[slug]} replace />
  ) : (
    <Solutions />
  );
}
function IndustryRoute() {
  const { slug } = useParams();
  const target =
    slug === "fintech"
      ? "/solutions/customer-lifecycle"
      : slug === "banks" || slug === "sponsor-banks"
        ? "/solutions/financial-crime"
        : "/solutions";
  return <Navigate to={target} replace />;
}
export default function App() {
  return (
    <Suspense
      fallback={
        <div
          role="status"
          style={{
            minHeight: "70vh",
            display: "grid",
            placeItems: "center",
            fontSize: 13,
            color: "var(--text-3)",
          }}
        >
          Loading SqAId…
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route
            path="/products/faro"
            element={<Navigate to="/products/argus/fraud" replace />}
          />
          <Route
            path="/products/case-manager"
            element={<Navigate to="/products/cais" replace />}
          />
          <Route path="/products/cais" element={<LegacyCase />} />
          <Route path="/products/:slug" element={<Product />} />
          <Route path="/products/argus/:workload" element={<Product />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<SolutionRoute />} />
          <Route path="/industries/:slug" element={<IndustryRoute />} />
          <Route path="/company" element={<Company />} />
          <Route path="/company/careers" element={<Careers />} />
          <Route path="/company/careers/:id" element={<Careers />} />
          <Route path="/company/careers/apply/:id" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
