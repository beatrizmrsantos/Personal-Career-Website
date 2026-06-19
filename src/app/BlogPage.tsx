import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import {
  POSTS, CATEGORY_COLORS, CATEGORY_LABELS,
  type BlogPost, type Category,
} from "@/content/blog";
import { profile } from "@/content/text";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

const ALL_CATEGORIES = ["all", "tech", "travel", "photography", "life", "work", "events"] as const;
type Filter = typeof ALL_CATEGORIES[number];

// ─── Featured hero post ───────────────────────────────────────────────────────

function FeaturedPost({ post }: { post: BlogPost }) {
  const color = CATEGORY_COLORS[post.category];
  return (
    <Link to={`/blog/${post.slug}`} className="block mb-16 group">
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        style={{ height: "460px" }}
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Cover image */}
        <motion.img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Gradient overlay — heavy on left, fades out to right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(13,11,22,0.97) 0%, rgba(13,11,22,0.88) 38%, rgba(13,11,22,0.25) 68%, transparent 100%)",
          }}
        />

        {/* Text panel — left side */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-xl">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded"
              style={{ backgroundColor: color + "25", color }}
            >
              {CATEGORY_LABELS[post.category]}
            </span>
            <span className="text-[11px] font-mono text-white/30 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {post.readTime} read
            </span>
            <span className="text-[11px] font-mono text-white/30 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> {formatDate(post.date)}
            </span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-black leading-[1.1] mb-4 text-white/95 group-hover:text-white transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {post.title}
          </h2>

          {post.subtitle && (
            <p className="text-sm text-white/40 mb-4 italic">{post.subtitle}</p>
          )}

          <p className="text-sm text-white/50 leading-relaxed mb-7 line-clamp-2">
            {post.excerpt}
          </p>

          <span
            className="inline-flex items-center gap-2 text-sm font-semibold transition-gap"
            style={{ color }}
          >
            Read Article
            <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        {/* Featured badge */}
        <div
          className="absolute top-6 right-6 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
        >
          Featured
        </div>
      </motion.div>
    </Link>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const color = CATEGORY_COLORS[post.category];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link to={`/blog/${post.slug}`} className="group block">
        {/* Cover image */}
        <div
          className="overflow-hidden rounded-xl mb-4"
          style={{ aspectRatio: "16 / 10" }}
        >
          <motion.img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 mb-2.5">
          <span
            className="text-[11px] font-mono uppercase tracking-wider font-semibold"
            style={{ color }}
          >
            {CATEGORY_LABELS[post.category]}
          </span>
          <span className="text-white/15 text-xs select-none">·</span>
          <span className="text-[11px] font-mono text-white/35">{formatDate(post.date)}</span>
          <span className="text-white/15 text-xs select-none">·</span>
          <span className="text-[11px] font-mono text-white/35">{post.readTime}</span>
        </div>

        {/* Title */}
        <h3
          className="text-[1.1rem] font-bold leading-snug text-white/80 group-hover:text-white transition-colors mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-white/40 leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        {/* Read more */}
        <span
          className="text-xs font-mono font-semibold flex items-center gap-1.5"
          style={{ color }}
        >
          Read More
          <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Filter>("all");

  // Save scroll position when leaving; restore it when returning from a post
  useEffect(() => {
    const saved = sessionStorage.getItem("blog-scroll");
    sessionStorage.removeItem("blog-scroll");
    if (saved) {
      const y = parseInt(saved, 10);
      // setTimeout 0 runs after React has painted the DOM, avoiding rAF race conditions
      const tid = setTimeout(() => window.scrollTo({ top: y, behavior: "instant" }), 0);
      return () => clearTimeout(tid);
    }
    return () => {
      sessionStorage.setItem("blog-scroll", String(Math.round(window.scrollY)));
    };
  }, []);

  const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const featuredPost = sorted.find((p) => p.featured);
  const gridPosts =
    activeCategory === "all"
      ? sorted.filter((p) => !p.featured)
      : sorted.filter((p) => p.category === activeCategory);

  const countFor = (cat: Filter) =>
    cat === "all" ? POSTS.length : POSTS.filter((p) => p.category === cat).length;

  return (
    <div
      className="min-h-screen text-foreground"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "radial-gradient(ellipse 90% 60% at 50% -5%, #291830 0%, #13111d 55%)",
      }}
    >
      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 px-8 py-5 flex items-center justify-between"
        style={{ background: "linear-gradient(to bottom, rgba(19,17,29,0.96), rgba(19,17,29,0))" }}
      >
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#c4708a" }}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-white" />
          </div>
          <span
            className="text-sm font-bold text-white/50 group-hover:text-white/85 transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {profile.name}
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c4708a" }} />
          <span
            className="text-sm font-bold text-white/75"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Blog
          </span>
        </div>

        <div />
      </nav>

      {/* ── Page header ── */}
      <section className="pt-36 pb-14 px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="text-xs font-mono uppercase tracking-[0.4em] mb-4"
            style={{ color: "#c4708a" }}
          >
            Writing & Thoughts
          </p>
          <h1
            className="text-5xl md:text-6xl font-black leading-none mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Blog
          </h1>
          <p className="text-white/38 text-sm max-w-md leading-relaxed">
            Notes on software engineering, travel, photography, and the intersections between them.
          </p>
        </motion.div>
      </section>

      <div className="px-8 max-w-6xl mx-auto">
        {/* ── Featured post (only when 'all' filter) ── */}
        {activeCategory === "all" && featuredPost && (
          <FeaturedPost post={featuredPost} />
        )}

        {/* ── Category filter ── */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {ALL_CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const color =
              cat === "all" ? "#c4708a" : CATEGORY_COLORS[cat as Category];
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all"
                style={
                  isActive
                    ? { backgroundColor: color, color: "white" }
                    : {
                        backgroundColor: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.4)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
                }
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat === "all"
                  ? `All · ${countFor("all")}`
                  : `${CATEGORY_LABELS[cat as Category]} · ${countFor(cat)}`}
              </motion.button>
            );
          })}
        </div>

        {/* ── Section label ── */}
        <div className="mb-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/25 mb-1.5">
            Browse and read
          </p>
          <h2
            className="text-2xl font-bold text-white/85"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {activeCategory === "all"
              ? "Latest Stories"
              : CATEGORY_LABELS[activeCategory as Category]}
          </h2>
        </div>

        {/* ── Post grid ── */}
        {gridPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-10 mb-24">
            {gridPosts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-white/25 font-mono text-sm mb-24">
            No posts in this category yet.
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer
        className="py-10 text-center border-t"
        style={{ borderColor: "rgba(196,112,138,0.08)" }}
      >
        <p className="text-xs font-mono text-white/18">
          {POSTS.length} stories · thoughts on code, travel & life
        </p>
      </footer>
    </div>
  );
}
