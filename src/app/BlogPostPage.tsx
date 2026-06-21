import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Clock, Calendar, Tag, X } from "lucide-react";
import {
  POSTS, CATEGORY_COLORS, CATEGORY_LABELS,
  type ContentBlock, type GalleryItem,
} from "@/content/blog";
import { profile } from "@/content/text";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Replace c_fill crop with c_limit so the full original aspect ratio is shown
function toOriginalUrl(url: string) {
  return url.replace(/w_\d+,h_\d+,c_fill/, "w_1920,h_1920,c_limit");
}

// ─── Editorial photo grid (3 or 5 photos, asymmetric layout) ─────────────────

function GalleryBlock({ photos }: { photos: GalleryItem[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const n = photos.length;

  // 3-photo: 3 equal columns, single row
  // 4-photo: 3 verticals on top row + 1 horizontal full-width below
  // 5-photo: [0] large left spans 2 rows · [1][2] top right · [3][4] bottom right
  const positions3 = [
    { gridColumn: "1", gridRow: "1" },
    { gridColumn: "2", gridRow: "1" },
    { gridColumn: "3", gridRow: "1" },
  ];
  const positions4 = [
    { gridColumn: "1", gridRow: "1" },
    { gridColumn: "2", gridRow: "1" },
    { gridColumn: "3", gridRow: "1" },
    { gridColumn: "4", gridRow: "1" },
  ];
  const positions5 = [
    { gridColumn: "1", gridRow: "1 / 3" },
    { gridColumn: "2", gridRow: "1" },
    { gridColumn: "3", gridRow: "1" },
    { gridColumn: "2", gridRow: "2" },
    { gridColumn: "3", gridRow: "2" },
  ];
  const positions = n === 3 ? positions3 : n === 4 ? positions4 : positions5;
  const gridCols = n === 4 ? "1fr 1fr 1fr 1fr" : "1fr 1fr 1fr";
  const gridRows = n === 3 ? "320px" : n === 4 ? "280px" : "200px 200px";

  function PhotoItem({ photo, i, height, width }: { photo: GalleryItem; i: number; height?: string; width?: string }) {
    return (
      <motion.div
        key={i}
        style={{ overflow: "hidden", cursor: "zoom-in", height, width, borderRadius: "10px" }}
        onClick={() => setLightbox(i)}
        className="relative group"
      >
        <motion.img
          src={photo.url}
          alt={photo.caption}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
        {photo.caption && (
          <div
            className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(to top, rgba(13,11,22,0.82) 0%, transparent 55%)" }}
          >
            <p className="px-3 pb-2.5 text-[10px] font-mono text-white/70 leading-tight">
              {photo.caption}
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <>
      <figure className="my-10">
        {/* 1 photo — centred */}
        {n === 1 && (
          <div className="flex justify-center">
            <div style={{ width: "65%", height: "340px" }}>
              <PhotoItem photo={photos[0]} i={0} height="340px" width="100%" />
            </div>
          </div>
        )}

        {/* 2 photos — side by side, centred */}
        {n === 2 && (
          <div className="flex justify-center gap-[5px]">
            {photos.map((photo, i) => (
              <div key={i} style={{ width: "48%", height: "320px" }}>
                <PhotoItem photo={photo} i={i} height="320px" width="100%" />
              </div>
            ))}
          </div>
        )}

        {/* 3, 4, 5 photos — grid */}
        {n >= 3 && (
          <div
            className="-mx-6 md:-mx-16"
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              gridTemplateRows: gridRows,
              gap: "5px",
            }}
          >
            {photos.slice(0, 5).map((photo, i) => (
              <motion.div
                key={i}
                style={{ ...positions[i], overflow: "hidden", cursor: "zoom-in" }}
                onClick={() => setLightbox(i)}
                className="relative group"
              >
                <motion.img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
                {photo.caption && (
                  <div
                    className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(13,11,22,0.82) 0%, transparent 55%)" }}
                  >
                    <p className="px-3 pb-2.5 text-[10px] font-mono text-white/70 leading-tight">
                      {photo.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </figure>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(13,11,22,0.94)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              key={lightbox}
              src={toOriginalUrl(photos[lightbox].url)}
              alt={photos[lightbox].caption}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            />
            {photos[lightbox].caption && (
              <p className="absolute bottom-6 left-0 right-0 text-center text-xs font-mono text-white/40">
                {photos[lightbox].caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Table of contents ────────────────────────────────────────────────────────

function TableOfContents({ body, color }: { body: ContentBlock[]; color: string }) {
  const headings = body.filter((b) => b.type === "h2" && b.text);
  if (headings.length < 2) return null;

  return (
    <nav
      className="mb-10 p-5 rounded-xl"
      style={{ backgroundColor: "rgba(255,255,255,0.03)", borderLeft: `2px solid ${color}40` }}
    >
      <p
        className="text-[10px] font-mono uppercase tracking-[0.3em] mb-4"
        style={{ color }}
      >
        In this article
      </p>
      <ol className="space-y-2.5">
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={`#${slugify(h.text ?? "")}`}
              className="flex items-start gap-3 text-sm text-white/40 hover:text-white/80 transition-colors"
            >
              <span className="text-[11px] font-mono mt-[3px] shrink-0" style={{ color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug">{h.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Content block renderer ───────────────────────────────────────────────────

function Block({ block, accentColor }: { block: ContentBlock; accentColor: string }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-white/60 leading-[1.88] mb-6 text-[0.975rem]">{block.text}</p>
      );
    case "h2":
      return (
        <h2
          id={slugify(block.text ?? "")}
          className="text-2xl font-bold mt-12 mb-4 text-white/90"
          style={{ fontFamily: "'Playfair Display', serif", scrollMarginTop: "96px" }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          className="text-lg font-semibold mt-8 mb-3 text-white/80"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote
          className="my-10 pl-6 border-l-2"
          style={{ borderColor: accentColor }}
        >
          <p
            className="text-xl italic leading-relaxed text-white/65"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {block.text}
          </p>
        </blockquote>
      );
    case "img":
      return (
        <figure className="my-10">
          <img
            src={block.url}
            alt={block.caption}
            className="w-full rounded-xl object-cover"
            style={{ maxHeight: "480px" }}
          />
          {block.caption && (
            <figcaption className="text-center text-xs font-mono text-white/30 mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "ul":
      return (
        <ul className="mb-6 space-y-2.5 pl-1">
          {block.items?.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-white/60 text-[0.975rem]">
              <span
                className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: accentColor }}
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "gallery":
      return block.photos?.length ? <GalleryBlock photos={block.photos} /> : null;
    default:
      return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#13111d", fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="text-center">
          <p className="text-white/35 mb-5 font-mono text-sm">Post not found.</p>
          <Link
            to="/blog"
            className="text-sm font-mono flex items-center gap-2"
            style={{ color: "#c4708a" }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const color = CATEGORY_COLORS[post.category];

  return (
    <div
      className="min-h-screen text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#13111d" }}
    >
      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 px-8 py-5 flex items-center justify-between"
        style={{ background: "linear-gradient(to bottom, rgba(19,17,29,0.97), rgba(19,17,29,0))" }}
      >
        <Link
          to="/blog"
          className="flex items-center gap-2 group text-white/40 hover:text-white/75 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-mono">Blog</span>
        </Link>
        <Link
          to="/"
          className="text-sm font-bold text-white/40 hover:text-white/75 transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {profile.name}
        </Link>
      </nav>

      {/* ── Hero image ── */}
      <div className="relative h-[52vh] min-h-[360px] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(19,17,29,1) 0%, rgba(19,17,29,0.5) 45%, rgba(19,17,29,0.15) 100%)",
          }}
        />
      </div>

      {/* ── Article ── */}
      <article className="max-w-2xl mx-auto px-6 -mt-20 relative z-10 pb-28">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded"
              style={{ backgroundColor: color + "22", color }}
            >
              {CATEGORY_LABELS[post.category]}
            </span>
            <span className="text-[11px] font-mono text-white/30 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> {formatDate(post.date)}
            </span>
            <span className="text-[11px] font-mono text-white/30 flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {post.readTime} read
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-black leading-[1.1] mb-4 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-base text-white/40 mb-8 leading-relaxed italic">
              {post.subtitle}
            </p>
          )}

          {/* Divider */}
          <div className="w-12 h-[2px] mb-10 rounded-full" style={{ backgroundColor: color }} />
        </motion.header>

        {/* Table of contents */}
        <TableOfContents body={post.body} color={color} />

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {post.body.map((block, i) => (
            <Block key={i} block={block} accentColor={color} />
          ))}
        </motion.div>

        {/* Tags */}
        <div
          className="flex flex-wrap gap-2 mt-14 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <Tag className="w-3.5 h-3.5 text-white/20 mt-0.5" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 rounded"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm font-mono transition-colors hover:opacity-80"
            style={{ color }}
          >
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>
        </div>
      </article>
    </div>
  );
}
