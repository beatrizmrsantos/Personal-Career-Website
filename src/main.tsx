
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
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
    // Skip when returning from a post to the listing — BlogPage restores its own position
    if (pathname === "/blog" && from.startsWith("/blog/")) return;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/me" element={<PersonalPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
    </Routes>
  </BrowserRouter>
);
