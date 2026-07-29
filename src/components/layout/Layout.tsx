import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { useTheme } from "@/lib/use-theme";

/**
 * Layout — the app shell: fixed Nav + routed <Outlet> + Footer. Owns the
 * site-wide theme (mode) state and passes it to the Nav toggle.
 */
export default function Layout() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
