
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";
import App from "./app/App.tsx";
import PersonalPage from "./app/PersonalPage.tsx";
import BlogPage from "./app/BlogPage.tsx";
import BlogPostPage from "./app/BlogPostPage.tsx";
import "./styles/index.css";

// Prevent the browser from overriding scroll position on pushState navigations
window.history.scrollRestoration = "manual";

function ScrollToTop() {
  const { pathname } = useLocation();
  const prev = useRef("");
  useEffect(() => {
    const from = prev.current;
    prev.current = pathname;
    if (pathname === "/blog") {
      if (from.startsWith("/blog/")) return; // returning from post — let BlogPage restore
      sessionStorage.removeItem("blog-scroll"); // navigating fresh — always start at top
    }
    if (pathname === "/" && from.startsWith("/blog/")) return;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#c4708a", boxShadow: "0 4px 20px rgba(196,112,138,0.35)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <BackToTopButton />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/me" element={<PersonalPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
    </Routes>
  </BrowserRouter>
);
