import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft, Camera, Film, MapPin, Play, X,
  Globe, Clock, ChevronLeft, ChevronRight, ChevronDown,
} from "lucide-react";
import { profile } from "@/content/text";
import { TRIPS, FILM, TOP_PHOTOS, type Photo, type Stop, type Trip, type GalleryPhoto } from "@/content/personal";

// ─── Section Heading ──────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle, color = "#c4708a" }: {
  title: string; subtitle?: string; color?: string;
}) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", damping: 24, stiffness: 180 }}
    >
      {subtitle && (
        <p className="text-xs font-mono uppercase tracking-[0.3em] mb-3" style={{ color: color + "99" }}>
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
        {title}
      </h2>
      <div className="mt-4 mx-auto w-12 h-0.5 rounded-full" style={{ backgroundColor: color }} />
    </motion.div>
  );
}

// ─── Plane SVG (same as main site) ───────────────────────────────────────────

function PlaneSVG({ color }: { color: string }) {
  return (
    <svg width="26" height="26" viewBox="-12 -12 24 24" fill="none">
      <ellipse cx="0" cy="0" rx="11" ry="3" fill={color} />
      <polygon points="11,0 7.5,-1.5 7.5,1.5" fill={color} opacity={0.6} />
      <polygon points="2,0 -2,-11 -7,0" fill={color} opacity={0.92} />
      <polygon points="2,0 -2,11 -7,0" fill={color} opacity={0.92} />
      <polygon points="-7,0 -11,-5.5 -9,-0.5" fill={color} opacity={0.75} />
      <polygon points="-7,0 -11,5.5 -9,0.5" fill={color} opacity={0.75} />
      <circle cx="-2" cy="-8" r="1.5" fill="white" opacity={0.55} />
      <circle cx="-2" cy="8" r="1.5" fill="white" opacity={0.55} />
    </svg>
  );
}

// ─── Card Deck Overlay — coverflow / fan spread ──────────────────────────────

const CARD_W = 270;
const CARD_H = 400; // portrait 2:3

function CardDeckOverlay({ stop, color, onClose }: {
  stop: Stop; color: string; onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const photos = stop.photos;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(idx - 1);
      if (e.key === "ArrowRight") go(idx + 1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [idx, onClose]);

  const go = (next: number) => {
    if (next < 0 || next >= photos.length) return;
    setIdx(next);
  };

  // x, scale, rotateY, opacity per position relative to center card
  const cardAnim = (pos: number) => {
    const abs = Math.abs(pos);
    const sign = pos < 0 ? -1 : 1;
    if (abs === 0) return { x: 0,           scale: 1,    rotateY: 0,          opacity: 1    };
    if (abs === 1) return { x: sign * 248,   scale: 0.8,  rotateY: sign * -22, opacity: 0.85 };
    if (abs === 2) return { x: sign * 414,   scale: 0.64, rotateY: sign * -38, opacity: 0.6  };
    return               { x: sign * 550,   scale: 0.5,  rotateY: sign * -50, opacity: 0    };
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* ── Header ── */}
      <div
        className="relative z-20 flex flex-col items-center mb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-1 -right-12 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
          style={{ color: "rgba(240,238,247,0.45)" }}
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{stop.flag}</span>
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color }}
          >
            {stop.city}
          </h3>
        </div>
        <p className="text-xs font-mono mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>
          {stop.country} · {stop.days}
        </p>
      </div>

      {/* ── Coverflow: [← arrow] [stage] [→ arrow] ── */}
      <div
        className="relative z-10 flex items-center gap-3 w-full max-w-[1100px] mx-auto px-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left arrow — outside all cards */}
        <motion.button
          disabled={idx === 0}
          className="flex-none w-12 h-12 rounded-full flex items-center justify-center border disabled:opacity-20"
          style={{
            backgroundColor: "rgba(19,17,29,0.58)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderColor: color + "38",
          }}
          whileHover={{ scale: 1.12, backgroundColor: "rgba(19,17,29,0.85)" }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); go(idx - 1); }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color }} />
        </motion.button>

        {/* Stage — cards centered within this flex-1 container */}
        <div
          className="flex-1 relative"
          style={{ height: CARD_H + 50, perspective: "1400px" }}
        >
          {photos.map((photo, i) => {
            const pos = i - idx;
            if (Math.abs(pos) > 2) return null;
            const anim = cardAnim(pos);

            return (
              <motion.div
                key={photo.id}
                className="absolute rounded-2xl overflow-hidden"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  left: "50%",
                  top: "50%",
                  marginLeft: -CARD_W / 2,
                  marginTop: -CARD_H / 2,
                  zIndex: 10 - Math.abs(pos) * 2,
                  cursor: pos !== 0 ? "pointer" : "default",
                  boxShadow:
                    pos === 0
                      ? `0 20px 60px rgba(0,0,0,0.7), 0 0 0 1.5px ${color}45`
                      : "0 8px 24px rgba(0,0,0,0.45)",
                }}
                animate={anim}
                transition={{ type: "spring", damping: 34, stiffness: 290 }}
                onClick={() => pos !== 0 && go(i)}
                whileHover={pos !== 0 ? { opacity: anim.opacity + 0.12 } : undefined}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  draggable={false}
                />

                {pos === 0 && (
                  <>
                    <div
                      className="absolute bottom-0 left-0 right-0 px-4 py-4"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(6,4,14,0.97) 0%, rgba(6,4,14,0.55) 55%, transparent 100%)",
                      }}
                    >
                      <h4
                        className="text-base font-bold text-white leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {photo.caption || stop.city}
                      </h4>
                      <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(255,255,255,0.42)" }}>
                        {stop.country}
                      </p>
                    </div>
                    <div
                      className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded-full backdrop-blur-sm"
                      style={{
                        backgroundColor: "rgba(6,4,14,0.72)",
                        color: color + "cc",
                        border: `1px solid ${color}28`,
                      }}
                    >
                      {idx + 1} / {photos.length}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right arrow — outside all cards */}
        <motion.button
          disabled={idx === photos.length - 1}
          className="flex-none w-12 h-12 rounded-full flex items-center justify-center border disabled:opacity-20"
          style={{
            backgroundColor: "rgba(19,17,29,0.58)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderColor: color + "38",
          }}
          whileHover={{ scale: 1.12, backgroundColor: "rgba(19,17,29,0.85)" }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); go(idx + 1); }}
        >
          <ChevronRight className="w-5 h-5" style={{ color }} />
        </motion.button>
      </div>

      {/* ── Dot indicators ── */}
      <div
        className="relative z-20 flex items-center justify-center gap-1.5 mt-5"
        onClick={(e) => e.stopPropagation()}
      >
        {photos.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => go(i)}
            className="h-1.5 rounded-full"
            animate={{
              width: i === idx ? 18 : 6,
              backgroundColor: i === idx ? color : color + "40",
            }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{ minWidth: 6 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Stop Label ───────────────────────────────────────────────────────────────

function StopLabel({ stop, color, side, index, onHoverStart, onHoverEnd, onActivate }: {
  stop: Stop; color: string; side: "left" | "right"; index: number;
  onHoverStart: () => void; onHoverEnd: () => void; onActivate: () => void;
}) {
  const isLeft = side === "left";
  return (
    <motion.button
      className={`group flex flex-col gap-2 ${isLeft ? "items-end text-right" : "items-start text-left"}`}
      initial={{ opacity: 0, x: isLeft ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", damping: 22, stiffness: 180, delay: index * 0.08 }}
      whileHover={{ x: isLeft ? -4 : 4 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onActivate}
    >
      <h4
        className="text-2xl md:text-3xl font-bold leading-tight text-foreground transition-colors duration-150"
        style={{ fontFamily: "'Playfair Display', serif" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = color; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#f0eef7"; }}
      >
        {stop.city}
      </h4>
      <p className="text-xs font-mono text-foreground/35">
        {stop.country} · {stop.days}
      </p>

      {/* Mini photo preview */}
      {stop.photos[0] && (
        <motion.div
          className="w-28 h-18 rounded-xl overflow-hidden border"
          style={{
            height: "72px",
            borderColor: color + "30",
            boxShadow: `0 4px 16px rgba(0,0,0,0.35)`,
          }}
          whileHover={{ scale: 1.05, borderColor: color + "80" }}
          transition={{ type: "spring", stiffness: 340, damping: 24 }}
        >
          <img
            src={stop.photos[0].url}
            alt={stop.city}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-200"
          />
        </motion.div>
      )}
    </motion.button>
  );
}

// ─── Trip Route — education-style center path ─────────────────────────────────

function TripRoute({ trip }: { trip: Trip }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const planeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activeStop, setActiveStop] = useState<Stop | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHover = (stop: Stop) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setActiveStop(stop), 700);
  };

  const cancelHover = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  return (
    <>
      <div ref={containerRef} className="relative">
        {/* Center dashed path — desktop */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, ${trip.color}55 0, ${trip.color}55 8px, transparent 8px, transparent 18px)`,
          }}
        />

        {/* Left-side path — mobile */}
        <div
          className="absolute left-[11px] top-0 bottom-0 w-px md:hidden pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, ${trip.color}50 0, ${trip.color}50 8px, transparent 8px, transparent 18px)`,
          }}
        />

        {/* Animated airplane — desktop */}
        <motion.div
          className="absolute hidden md:block pointer-events-none"
          style={{
            left: "50%",
            top: planeY,
            translateX: "-50%",
            translateY: "-50%",
            rotate: 90,
            filter: `drop-shadow(0 0 8px ${trip.color}90)`,
            zIndex: 5,
          }}
        >
          <PlaneSVG color={trip.color} />
        </motion.div>

        <div className="flex flex-col gap-10 md:gap-14">
          {trip.stops.map((stop, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div key={stop.city} className="relative">
                {/* ── Desktop layout — alternating left / right ── */}
                <div className="hidden md:flex items-center">
                  {/* Left side */}
                  <div className="flex-1 flex items-center justify-end">
                    {isLeft ? (
                      <>
                        <StopLabel stop={stop} color={trip.color} side="left" index={i} onHoverStart={() => startHover(stop)} onHoverEnd={cancelHover} onActivate={() => { cancelHover(); setActiveStop(stop); }} />
                        <div
                          className="w-10 shrink-0 h-px"
                          style={{ background: `linear-gradient(to right, ${trip.color}30, ${trip.color}00)` }}
                        />
                      </>
                    ) : (
                      <div className="flex-1" />
                    )}
                  </div>

                  {/* Center waypoint */}
                  <motion.div
                    className="shrink-0 flex flex-col items-center gap-1.5 z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ type: "spring", damping: 18, stiffness: 220, delay: i * 0.1 + 0.05 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-shadow"
                      style={{
                        backgroundColor: "#1a1728",
                        borderColor: trip.color,
                        boxShadow: `0 0 22px ${trip.color}35, inset 0 0 10px ${trip.color}07`,
                      }}
                    >
                      {stop.flag}
                    </div>
                  </motion.div>

                  {/* Right side */}
                  <div className="flex-1 flex items-center justify-start">
                    {!isLeft ? (
                      <>
                        <div
                          className="w-10 shrink-0 h-px"
                          style={{ background: `linear-gradient(to left, ${trip.color}30, ${trip.color}00)` }}
                        />
                        <StopLabel stop={stop} color={trip.color} side="right" index={i} onHoverStart={() => startHover(stop)} onHoverEnd={cancelHover} onActivate={() => { cancelHover(); setActiveStop(stop); }} />
                      </>
                    ) : (
                      <div className="flex-1" />
                    )}
                  </div>
                </div>

                {/* ── Mobile layout ── */}
                <div className="md:hidden flex items-center gap-4 pl-3">
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-base border-2 shrink-0 z-10"
                    style={{ backgroundColor: "#1a1728", borderColor: trip.color, boxShadow: `0 0 14px ${trip.color}40` }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", damping: 18, stiffness: 220, delay: i * 0.08 }}
                  >
                    {stop.flag}
                  </motion.div>
                  <StopLabel stop={stop} color={trip.color} side="right" index={i} onHoverStart={() => startHover(stop)} onHoverEnd={cancelHover} onActivate={() => { cancelHover(); setActiveStop(stop); }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeStop && (
          <CardDeckOverlay stop={activeStop} color={trip.color} onClose={() => setActiveStop(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Trip Card ─────────────────────────────────────────────────────────────────

function TripCard({ trip, index, isLast }: { trip: Trip; index: number; isLast?: boolean }) {
  return (
    <motion.div
      id={`trip-${trip.id}`}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", damping: 22, stiffness: 160, delay: index * 0.07 }}
      className={isLast ? "mb-0" : "mb-40"}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
        <div className="flex items-center gap-4 shrink-0">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border"
            style={{ backgroundColor: trip.color + "15", borderColor: trip.color + "38" }}
          >
            {trip.icon}
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: trip.color }}>
              Trip {trip.id} of {TRIPS.length}
            </p>
            <h3
              className="text-2xl md:text-3xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {trip.title}
            </h3>
            <p className="text-sm text-foreground/38 font-mono mt-1">{trip.dates}</p>
          </div>
        </div>
        <p className="md:ml-auto text-sm text-foreground/52 leading-relaxed md:max-w-sm">
          {trip.summary}
        </p>
      </div>

      {/* Route */}
      <div className="px-0 md:px-4 py-4">
        <TripRoute trip={trip} />
      </div>
    </motion.div>
  );
}

// ─── Photography Section ──────────────────────────────────────────────────────

// Grid placement for each of the 10 photos (3-column, 5-row asymmetric editorial layout)
const PHOTO_GRID: { col: string; row: string }[] = [
  { col: "1 / 3", row: "1 / 3" }, // 0 — large hero (2×2)
  { col: "3 / 4", row: "1 / 2" }, // 1 — small top-right
  { col: "3 / 4", row: "2 / 3" }, // 2 — small bottom-right
  { col: "1 / 2", row: "3 / 4" }, // 3
  { col: "2 / 3", row: "3 / 4" }, // 4
  { col: "3 / 4", row: "3 / 4" }, // 5
  { col: "1 / 2", row: "4 / 6" }, // 6 — tall portrait (1×2)
  { col: "2 / 4", row: "4 / 5" }, // 7 — wide (2×1)
  { col: "2 / 3", row: "5 / 6" }, // 8
  { col: "3 / 4", row: "5 / 6" }, // 9
];

function PhotoCard({ photo, index }: { photo: GalleryPhoto; index: number }) {
  const [hovered, setHovered] = useState(false);
  const placement = PHOTO_GRID[index];

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ gridColumn: placement.col, gridRow: placement.row }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <motion.img
        src={photo.url}
        alt={photo.caption}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        draggable={false}
      />

      {/* Subtle always-present bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 40%)" }}
      />

      {/* Photo number — always visible, dims on hover */}
      <motion.span
        className="absolute top-3 left-3 text-xs font-mono font-bold tabular-nums select-none"
        animate={{ opacity: hovered ? 0.2 : 0.45 }}
        transition={{ duration: 0.25 }}
        style={{ color: "rgba(255,255,255,0.9)", letterSpacing: "0.04em" }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Hover overlay with caption */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-4 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(13,11,22,0.88) 0%, rgba(13,11,22,0.2) 55%, transparent 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white text-sm font-semibold leading-snug mb-1.5">{photo.caption}</p>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 shrink-0" style={{ color: "#9b7fc4" }} />
          <span className="text-xs font-mono truncate" style={{ color: "#b89fd8" }}>{photo.location}</span>
          <span className="text-xs font-mono text-white/35 shrink-0">· {photo.year}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PhotographySection() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto" id="photography">
      <SectionHeading title="Photography" subtitle="Top 10 Shots" color="#9b7fc4" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "220px",
          gap: "10px",
        }}
      >
        {TOP_PHOTOS.map((photo, i) => (
          <PhotoCard key={photo.id} photo={photo} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Film Section ──────────────────────────────────────────────────────────────

function FilmSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto" id="films">
      <SectionHeading title="Travel Films" subtitle="Filmmaking" color="#7fc4c0" />

      <div className="grid md:grid-cols-2 gap-12 items-start mb-14">
        <motion.p
          className="text-foreground/52 leading-relaxed text-sm"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 24, stiffness: 180 }}
        >
          Every trip ends with a folder full of footage and a burning need to tell its story.
          Travel films aren&apos;t about showing a destination — they&apos;re about capturing a feeling.
          The golden hour that lasts exactly four minutes. The sound of a market at 7am.
          The faces of strangers who let you point a camera at them.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-2.5"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 24, stiffness: 180, delay: 0.1 }}
        >
          {["Sony a7IV", "DJI Mini 4 Pro", "Adobe Premiere Pro", "4K / LOG footage", "Color grading"].map((tool) => (
            <span
              key={tool}
              className="text-xs font-mono px-3 py-1.5 rounded-full border"
              style={{ backgroundColor: "#9b7fc415", color: "#9b7fc4", borderColor: "#9b7fc428" }}
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="group relative rounded-3xl overflow-hidden border cursor-pointer"
        style={{ backgroundColor: "#1a1728", borderColor: "#9b7fc428" }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", damping: 22, stiffness: 160 }}
        onClick={() => setVideoOpen(true)}
        whileHover={{ scale: 1.008 }}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={FILM.thumbnailUrl}
            alt={FILM.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(19,17,29,0.96) 0%, rgba(19,17,29,0.25) 55%, transparent 100%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center border-2 backdrop-blur-sm"
              style={{ backgroundColor: "#9b7fc420", borderColor: "#9b7fc460" }}
              whileHover={{ scale: 1.14 }}
              transition={{ type: "spring", stiffness: 360, damping: 18 }}
            >
              <Play className="w-8 h-8 ml-1" style={{ color: "#9b7fc4" }} fill="#9b7fc4" />
            </motion.div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <span
              className="text-xs font-mono px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5"
              style={{ backgroundColor: "rgba(19,17,29,0.78)", color: "#9b7fc4", border: "1px solid #9b7fc430" }}
            >
              <Clock className="w-3 h-3" />{FILM.duration}
            </span>
            <span
              className="text-xs font-mono px-3 py-1 rounded-full backdrop-blur-md"
              style={{ backgroundColor: "rgba(19,17,29,0.78)", color: "#9b7fc470", border: "1px solid #9b7fc418" }}
            >
              {FILM.year}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#9b7fc4" }}>
                {FILM.subtitle}
              </p>
              <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {FILM.title}
              </h3>
              <p className="text-xs font-mono text-foreground/32 flex items-center gap-1.5 mb-3">
                <MapPin className="w-3 h-3" />{FILM.location}
              </p>
              <p className="text-sm text-foreground/52 leading-relaxed max-w-lg">{FILM.description}</p>
            </div>
            <div
              className="shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 border"
              style={{ backgroundColor: "#9b7fc418", color: "#9b7fc4", borderColor: "#9b7fc430" }}
            >
              <Play className="w-4 h-4" fill="#9b7fc4" />Watch
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
          >
            <div className="absolute inset-0 bg-black/96 backdrop-blur-2xl" />
            <motion.div
              className="relative z-10 w-full max-w-4xl"
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center text-foreground/55 hover:text-foreground hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
                {FILM.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${FILM.youtubeId}?autoplay=1&rel=0`}
                    className="w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-4"
                    style={{ background: "radial-gradient(ellipse at center, #1e1b2e 0%, #13111d 100%)" }}
                  >
                    <Film className="w-16 h-16" style={{ color: "#9b7fc425" }} />
                    <p className="text-sm font-mono text-foreground/25 text-center px-8">
                      Add your YouTube ID to{" "}
                      <span style={{ color: "#9b7fc470" }}>FILM.youtubeId</span>
                      {" "}in PersonalPage.tsx
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────────

function PersonalNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between"
      style={{ background: "linear-gradient(to bottom, rgba(19,17,29,0.96), rgba(19,17,29,0))" }}
    >
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "#c4708a" }}>
          <ArrowLeft className="w-3.5 h-3.5 text-white" />
        </div>
        <span
          className="text-sm font-bold text-foreground/55 group-hover:text-foreground/90 transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {profile.name}
        </span>
      </Link>
      <div className="hidden md:flex items-center gap-5">
        {[
          { icon: Globe,  color: "#c4708a", label: "Travel",       href: "travel"       },
          { icon: Camera, color: "#9b7fc4", label: "Photography",  href: "photography"  },
          { icon: Film,   color: "#7fc4c0", label: "Filmmaking",   href: "films"        },
        ].map(({ icon: Icon, color, label, href }) => (
          <motion.button
            key={label}
            onClick={() => document.getElementById(href)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="flex items-center gap-1.5 group cursor-pointer bg-transparent border-none outline-none"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            <Icon className="w-3.5 h-3.5 transition-opacity group-hover:opacity-100" style={{ color }} />
            <span
              className="text-xs font-mono uppercase tracking-widest transition-opacity group-hover:opacity-100"
              style={{ color: color + "70" }}
            >
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(196,112,138,0.12) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(155,127,196,0.08) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(127,196,192,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 160, delay: 0.1 }}
      >
        <motion.p
          className="text-xs font-mono uppercase tracking-[0.42em] mb-6"
          style={{ color: "#c4708a" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Life outside the terminal
        </motion.p>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-foreground">Beyond</span>
          <br />
          <span style={{ color: "#c4708a" }}>Code</span>
        </h1>

        <motion.p
          className="text-base md:text-lg text-foreground/48 leading-relaxed max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          When I close the laptop, I open a lens. A software engineer by trade,
          a traveller, photographer, and filmmaker by soul.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {[
            { icon: "🌍", label: "Travel",       color: "#c4708a", href: "travel"       },
            { icon: "📷", label: "Photography",  color: "#9b7fc4", href: "photography"  },
            { icon: "🎬", label: "Filmmaking",   color: "#7fc4c0", href: "films"        },
          ].map(({ icon, label, color, href }) => (
            <motion.button
              key={label}
              onClick={() => document.getElementById(href)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono border cursor-pointer bg-transparent"
              style={{ backgroundColor: color + "10", color, borderColor: color + "32" }}
              whileHover={{ scale: 1.06, backgroundColor: color + "1e" }}
              whileTap={{ scale: 0.97 }}
            >
              {icon} {label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/25"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PersonalPage() {
  return (
    <div
      className="min-h-screen text-foreground"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "radial-gradient(ellipse 90% 60% at 50% -5%, #291830 0%, #13111d 55%)",
      }}
    >
      <PersonalNav />
      <HeroSection />

      <section className="py-20 px-6 max-w-5xl mx-auto" id="travel">
        <SectionHeading title="Travel Adventures" subtitle="Three Journeys" color="#c4708a" />

        {/* ── Trip quick-nav ── */}
        <div className="flex flex-wrap justify-center items-center mb-16">
          {TRIPS.flatMap((trip, i) => [
            i > 0 && (
              <span key={`sep-${i}`} className="select-none px-3 text-foreground/12 text-xl">·</span>
            ),
            <motion.button
              key={trip.id}
              onClick={() => document.getElementById(`trip-${trip.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="flex items-center gap-3 px-4 py-2 group bg-transparent border-none outline-none"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", damping: 22, stiffness: 200 }}
            >
              <span className="text-2xl transition-transform duration-300 group-hover:scale-110 inline-block">
                {trip.icon}
              </span>
              <div className="flex flex-col items-start">
                <span
                  className="text-sm font-semibold text-foreground/55 group-hover:text-foreground/90 transition-colors leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {trip.title}
                </span>
                <span
                  className="text-[10px] font-mono leading-tight opacity-55 group-hover:opacity-90 transition-opacity"
                  style={{ color: trip.color }}
                >
                  {trip.dates}
                </span>
              </div>
            </motion.button>,
          ]).filter(Boolean)}
        </div>

        {TRIPS.map((trip, i) => (
          <TripCard key={trip.id} trip={trip} index={i} isLast={i === TRIPS.length - 1} />
        ))}
      </section>

      <PhotographySection />

      <FilmSection />

      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(196,112,138,0.08)" }}>
        <p className="text-xs font-mono text-foreground/20">
          ✈️ {TRIPS.reduce((acc, t) => acc + t.stops.length, 0)} destinations · {TRIPS.length} adventures · countless memories
        </p>
      </footer>
    </div>
  );
}
