import { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig, motion, useScroll } from "framer-motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ApplicationPage from "./pages/ApplicationPage";
import WhoWeAre from "./pages/WhoWeAre";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";

/** Scrolls to top on navigation, or to a section when a link passes `state.scrollTo`. */
function ScrollManager() {
  const { key, pathname, search, state } = useLocation();
  useEffect(() => {
    const target = (state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      const t = window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [key, pathname, search]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand" />;
}

export default function App() {
  return (
    <HashRouter>
      <MotionConfig reducedMotion="user">
        <div className="font-sans antialiased">
          <ProgressBar />
          <ScrollManager />
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/application/:slug" element={<ApplicationPage />} />
              <Route path="/who-we-are" element={<WhoWeAre />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/contact" element={<Contact />} />
              {/* Legacy deckriterv.com paths -> new pages (keeps old links & bookmarks working) */}
              <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
              <Route path="/warranty" element={<Navigate to="/faqs" replace state={{ scrollTo: "warranty" }} />} />
              <Route path="/interiors" element={<Navigate to="/application/interiors" replace />} />
              <Route path="/sport-utility" element={<Navigate to="/application/sport-utility" replace />} />
              <Route path="/ramp-deck" element={<Navigate to="/application/ramp-deck" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </HashRouter>
  );
}
