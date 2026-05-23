import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { mesh } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";
import { motion, AnimatePresence } from "motion/react";
import {
  X, MapPin, ChevronDown, Github, Linkedin, Mail,
  Award, Briefcase, GraduationCap, Heart, CalendarDays,
  Globe, Code2, ExternalLink, Send,
  Server, Layers, Cloud, Database, ShieldCheck, Settings2,
} from "lucide-react";
import { TYPE_COLORS, TYPE_LABELS, careerPoints, skills, flightSegments, projects } from "@/content/career";
import type { PointType, CareerPoint, Project } from "@/content/career";
import { profile, hero as heroText, navLinks, sections, about, contact as contactText, footer } from "@/content/text";

// ─── Icon Maps ────────────────────────────────────────────────────────────────

const TYPE_ICONS = {
  job: Briefcase,
  education: GraduationCap,
  cert: Award,
  event: CalendarDays,
  volunteer: Heart,
} as const;

const CONTACT_ICON_MAP = { Mail, Github, Linkedin } as const;

// ─── Globe Marker ─────────────────────────────────────────────────────────────

type GlobeMarker =
  | { kind: "single"; point: CareerPoint }
  | { kind: "group"; city: string; lat: number; lng: number; points: CareerPoint[] };

function mLat(m: GlobeMarker) { return m.kind === "single" ? m.point.lat : m.lat; }
function mLng(m: GlobeMarker) { return m.kind === "single" ? m.point.lng : m.lng; }
function mColor(m: GlobeMarker) { return m.kind === "single" ? TYPE_COLORS[m.point.type] : "#8888a0"; }
function mId(m: GlobeMarker): string { return m.kind === "single" ? String(m.point.id) : m.city; }

const globeMarkers: GlobeMarker[] = (() => {
  const map = new Map<string, CareerPoint[]>();
  careerPoints.forEach((p) => {
    const list = map.get(p.city) ?? [];
    list.push(p);
    map.set(p.city, list);
  });
  const result: GlobeMarker[] = [];
  map.forEach((pts, city) => {
    if (pts.length === 1) {
      result.push({ kind: "single", point: pts[0] });
    } else {
      result.push({ kind: "group", city, lat: pts[0].lat, lng: pts[0].lng, points: pts });
    }
  });
  return result;
})();

// ─── Globe Utils ──────────────────────────────────────────────────────────────

const GLOBE_RADIUS = 2;

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

// ─── Globe 3D ─────────────────────────────────────────────────────────────────

function Globe3D({ markers, onMarkerClick, onMarkerHover, isPaused = false }: {
  markers: GlobeMarker[];
  onMarkerClick: (m: GlobeMarker) => void;
  onMarkerHover: (m: GlobeMarker | null) => void;
  isPaused?: boolean;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef(onMarkerClick);
  const hoverRef = useRef(onMarkerHover);
  const isPausedRef = useRef(isPaused);
  useEffect(() => { clickRef.current = onMarkerClick; }, [onMarkerClick]);
  useEffect(() => { hoverRef.current = onMarkerHover; }, [onMarkerHover]);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // ── Main sphere ──
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64),
      new THREE.MeshPhongMaterial({ color: 0x0f0d1a, emissive: 0x060410, specular: 0x4a3d5c, shininess: 12 }),
    ));

    // ── Subtle lat/lng grid ──
    const gridMat = new THREE.LineBasicMaterial({ color: 0x2e2846, transparent: true, opacity: 0.3 });
    const gridVerts: THREE.Vector3[] = [];
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lng = 0; lng < 360; lng += 4) {
        gridVerts.push(latLngToVector3(lat, lng, GLOBE_RADIUS + 0.005), latLngToVector3(lat, lng + 4, GLOBE_RADIUS + 0.005));
      }
    }
    for (let lng = 0; lng < 360; lng += 20) {
      for (let lat = -88; lat < 88; lat += 4) {
        gridVerts.push(latLngToVector3(lat, lng, GLOBE_RADIUS + 0.005), latLngToVector3(lat + 4, lng, GLOBE_RADIUS + 0.005));
      }
    }
    globeGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(gridVerts), gridMat));

    // ── World land outlines (continent & country borders) ──
    {
      const topo = worldAtlas as unknown as Topology<{ land: GeometryCollection; countries: GeometryCollection }>;

      const landMesh = mesh(topo, topo.objects.land);
      const landPts: THREE.Vector3[] = [];
      landMesh.coordinates.forEach((line) => {
        for (let i = 0; i < line.length - 1; i++) {
          const [lng0, lat0] = line[i] as [number, number];
          const [lng1, lat1] = line[i + 1] as [number, number];
          landPts.push(latLngToVector3(lat0, lng0, GLOBE_RADIUS + 0.018));
          landPts.push(latLngToVector3(lat1, lng1, GLOBE_RADIUS + 0.018));
        }
      });
      if (landPts.length > 0) {
        globeGroup.add(new THREE.LineSegments(
          new THREE.BufferGeometry().setFromPoints(landPts),
          new THREE.LineBasicMaterial({ color: 0x8b7bb8, transparent: true, opacity: 0.55 }),
        ));
      }

      const countriesMesh = mesh(topo, topo.objects.countries, (a, b) => a !== b);
      const borderPts: THREE.Vector3[] = [];
      countriesMesh.coordinates.forEach((line) => {
        for (let i = 0; i < line.length - 1; i++) {
          const [lng0, lat0] = line[i] as [number, number];
          const [lng1, lat1] = line[i + 1] as [number, number];
          borderPts.push(latLngToVector3(lat0, lng0, GLOBE_RADIUS + 0.016));
          borderPts.push(latLngToVector3(lat1, lng1, GLOBE_RADIUS + 0.016));
        }
      });
      if (borderPts.length > 0) {
        globeGroup.add(new THREE.LineSegments(
          new THREE.BufferGeometry().setFromPoints(borderPts),
          new THREE.LineBasicMaterial({ color: 0x5c4f82, transparent: true, opacity: 0.28 }),
        ));
      }
    }

    // ── Atmosphere glow ──
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.1, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xc4708a, transparent: true, opacity: 0.06, side: THREE.BackSide }),
    ));

    // ── Inner atmosphere ring (limb glow) ──
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.03, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x9b7fc4, transparent: true, opacity: 0.04, side: THREE.BackSide }),
    ));

    // ── Stars ──
    const starVerts: number[] = [];
    for (let i = 0; i < 2200; i++) {
      const r = 35 + Math.random() * 70;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starVerts.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute("position", new THREE.Float32BufferAttribute(starVerts, 3));
    scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.55 })));

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0x4a3d5c, 0.6));
    const dirLight = new THREE.DirectionalLight(0xe8e0ff, 1.0);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    const roseLight = new THREE.PointLight(0xc4708a, 0.5, 18);
    roseLight.position.set(-4, 2, 2);
    scene.add(roseLight);
    const lavLight = new THREE.PointLight(0x9b7fc4, 0.2, 14);
    lavLight.position.set(3, -3, -3);
    scene.add(lavLight);

    // ── Career markers ──
    type MarkerEntry = { hitMesh: THREE.Mesh; dotMesh: THREE.Mesh; ringMesh: THREE.Mesh; glowMesh: THREE.Mesh; marker: GlobeMarker };
    const markerMeshes: MarkerEntry[] = [];

    markers.forEach((m) => {
      const pos = latLngToVector3(mLat(m), mLng(m), GLOBE_RADIUS + 0.06);
      const col = new THREE.Color(mColor(m));
      const normal = pos.clone().normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      const isGroup = m.kind === "group";

      const hitMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
      );
      hitMesh.position.copy(pos);
      globeGroup.add(hitMesh);

      const dotMesh = new THREE.Mesh(
        new THREE.SphereGeometry(isGroup ? 0.06 : 0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: col }),
      );
      dotMesh.position.copy(pos);
      globeGroup.add(dotMesh);

      const ringMesh = new THREE.Mesh(
        new THREE.RingGeometry(isGroup ? 0.09 : 0.07, isGroup ? 0.13 : 0.1, 20),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55, side: THREE.DoubleSide }),
      );
      ringMesh.position.copy(pos);
      ringMesh.quaternion.copy(q);
      globeGroup.add(ringMesh);

      const glowMesh = new THREE.Mesh(
        new THREE.RingGeometry(isGroup ? 0.14 : 0.11, isGroup ? 0.18 : 0.14, 20),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.18, side: THREE.DoubleSide }),
      );
      glowMesh.position.copy(pos);
      glowMesh.quaternion.copy(q);
      globeGroup.add(glowMesh);

      markerMeshes.push({ hitMesh, dotMesh, ringMesh, glowMesh, marker: m });
    });

    // ── Mouse & touch interaction ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };
    let dragDist = 0;
    let autoRotate = true;
    let hoveredId: string | null = null;
    let autoRotateTimer: ReturnType<typeof setTimeout>;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true; prevPos = { x: e.clientX, y: e.clientY }; dragDist = 0;
      autoRotate = false; clearTimeout(autoRotateTimer);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevPos.x, dy = e.clientY - prevPos.y;
        dragDist += Math.abs(dx) + Math.abs(dy);
        globeGroup.rotation.y += dx * 0.005;
        globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroup.rotation.x + dy * 0.005));
        prevPos = { x: e.clientX, y: e.clientY };
      }
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(markerMeshes.map((e) => e.hitMesh));
      if (hits.length > 0) {
        const found = markerMeshes.find((e) => e.hitMesh === hits[0].object);
        if (found && hoveredId !== mId(found.marker)) {
          hoveredId = mId(found.marker);
          hoverRef.current(found.marker);
          autoRotate = false;
          clearTimeout(autoRotateTimer);
        }
        mount.style.cursor = "pointer";
      } else {
        if (hoveredId !== null) {
          hoveredId = null;
          hoverRef.current(null);
          autoRotateTimer = setTimeout(() => { autoRotate = true; }, 800);
        }
        mount.style.cursor = isDragging ? "grabbing" : "grab";
      }
    };
    const onMouseUp = (e: MouseEvent) => {
      if (dragDist < 5) {
        const rect = mount.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(markerMeshes.map((e) => e.hitMesh));
        if (hits.length > 0) { const f = markerMeshes.find((e) => e.hitMesh === hits[0].object); if (f) clickRef.current(f.marker); }
      }
      isDragging = false;
      autoRotateTimer = setTimeout(() => { autoRotate = true; }, 3000);
    };
    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    let touchPrev = { x: 0, y: 0 }, touchDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY }; touchDist = 0; autoRotate = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchPrev.x, dy = e.touches[0].clientY - touchPrev.y;
      touchDist += Math.abs(dx) + Math.abs(dy);
      globeGroup.rotation.y += dx * 0.005;
      globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroup.rotation.x + dy * 0.005));
      touchPrev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchDist < 8) {
        const t = e.changedTouches[0], rect = mount.getBoundingClientRect();
        mouse.x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((t.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(markerMeshes.map((e) => e.hitMesh));
        if (hits.length > 0) { const f = markerMeshes.find((e) => e.hitMesh === hits[0].object); if (f) clickRef.current(f.marker); }
      }
      autoRotateTimer = setTimeout(() => { autoRotate = true; }, 3000);
    };
    mount.addEventListener("touchstart", onTouchStart, { passive: false });
    mount.addEventListener("touchmove", onTouchMove, { passive: false });
    mount.addEventListener("touchend", onTouchEnd);

    // ── Animation loop ──
    let time = 0, animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.016;
      if (autoRotate && !isDragging && !isPausedRef.current) globeGroup.rotation.y += 0.0018;

      markerMeshes.forEach(({ ringMesh, glowMesh, dotMesh, marker }, i) => {
        const isHov = hoveredId === mId(marker);
        const col = mColor(marker);
        const pulse = Math.sin(time * 1.8 + i * 1.4);
        const rMat = ringMesh.material as THREE.MeshBasicMaterial;
        rMat.opacity = isHov ? 0.9 : 0.3 + 0.28 * pulse;
        ringMesh.scale.setScalar(isHov ? 1.5 : 1 + 0.15 * pulse);
        const gMat = glowMesh.material as THREE.MeshBasicMaterial;
        gMat.opacity = isHov ? 0.35 : 0.08 + 0.12 * Math.max(0, pulse);
        glowMesh.scale.setScalar(isHov ? 1.8 : 1 + 0.2 * Math.max(0, pulse));
        const dMat = dotMesh.material as THREE.MeshBasicMaterial;
        dMat.color.set(isHov ? new THREE.Color(col).multiplyScalar(1.6) : new THREE.Color(col));
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId); clearTimeout(autoRotateTimer);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      mount.removeEventListener("touchstart", onTouchStart);
      mount.removeEventListener("touchmove", onTouchMove);
      mount.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [markers]);

  return <div ref={mountRef} className="w-full h-full" />;
}

// ─── Point Modal ──────────────────────────────────────────────────────────────

function PointModal({ point, onClose }: { point: CareerPoint; onClose: () => void }) {
  const TypeIcon = TYPE_ICONS[point.type];
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <motion.div
        className="relative w-full max-w-md z-10"
        initial={{ scale: 0.85, y: 28 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 28 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "linear-gradient(145deg, #1e1b2e 0%, #16131e 100%)" }}>
          <div className="h-1.5" style={{ backgroundColor: TYPE_COLORS[point.type] }} />
          <div className="p-6 pb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: TYPE_COLORS[point.type] + "20", border: `1px solid ${TYPE_COLORS[point.type]}40` }}>
                {point.icon}
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest" style={{ color: TYPE_COLORS[point.type] }}>{TYPE_LABELS[point.type]}</div>
                <div className="text-xs text-foreground/50 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{point.city}</div>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground/80 hover:bg-white/5 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mx-6 border-t border-dashed" style={{ borderColor: TYPE_COLORS[point.type] + "25" }} />
          <div className="p-6 pt-4">
            <div className="flex items-center gap-2 mb-1">
              <TypeIcon className="w-4 h-4" style={{ color: TYPE_COLORS[point.type] }} />
              <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{point.title}</h2>
            </div>
            <p className="text-sm font-semibold mb-4 ml-6" style={{ color: TYPE_COLORS[point.type] }}>{point.company}</p>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-4 h-4 text-foreground/40" />
              <span className="text-sm font-mono text-foreground/50">{point.period}</span>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">{point.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {point.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-mono"
                  style={{ backgroundColor: TYPE_COLORS[point.type] + "18", color: TYPE_COLORS[point.type], border: `1px solid ${TYPE_COLORS[point.type]}30` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="px-6 pb-5">
            <div className="flex items-center gap-2 text-xs text-foreground/22 font-mono">
              <Globe className="w-3 h-3" />
              {Math.abs(point.lat).toFixed(4)}° {point.lat > 0 ? "N" : "S"} · {Math.abs(point.lng).toFixed(4)}° {point.lng > 0 ? "E" : "W"}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── City Group Modal ─────────────────────────────────────────────────────────

function CityGroupModal({ city, points, onClose }: { city: string; points: CareerPoint[]; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <motion.div
        className="relative w-full max-w-lg z-10 flex flex-col"
        style={{ maxHeight: "85vh" }}
        initial={{ scale: 0.85, y: 28 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 28 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ background: "linear-gradient(145deg, #1e1b2e 0%, #16131e 100%)" }}>
          <div className="p-5 flex items-center justify-between shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#8888a018", border: "1px solid #8888a030" }}>
                <MapPin className="w-5 h-5" style={{ color: "#8888a0" }} />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-foreground/35">{points.length} events</p>
                <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{city}</h2>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground/80 hover:bg-white/5 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto p-4 space-y-3">
            {points.map((point) => {
              const color = TYPE_COLORS[point.type];
              const TypeIcon = TYPE_ICONS[point.type];
              return (
                <div key={point.id} className="rounded-xl overflow-hidden border" style={{ borderColor: color + "30", backgroundColor: "#13111d" }}>
                  <div className="h-0.5" style={{ backgroundColor: color }} />
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: color + "18" }}>
                        {point.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <TypeIcon className="w-3 h-3" style={{ color }} />
                            <span className="text-xs font-mono uppercase tracking-widest" style={{ color }}>{TYPE_LABELS[point.type]}</span>
                          </div>
                          <span className="text-xs font-mono text-foreground/30">{point.period}</span>
                        </div>
                        <h3 className="text-sm font-bold text-foreground mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{point.title}</h3>
                        <p className="text-xs font-semibold mb-2" style={{ color }}>{point.company}</p>
                        <p className="text-xs text-foreground/55 leading-relaxed mb-2">{point.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {point.tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: color + "15", color, border: `1px solid ${color}25` }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Flight Path Divider ──────────────────────────────────────────────────────

function FlightPath({ segment }: { segment: typeof flightSegments[0] }) {
  const pathId = `fp-${segment.label.toLowerCase().replace(/\s+/g, "-")}`;
  const endY = 110;
  const arcY = segment.curve;
  const d = `M 0,${endY} C 400,${arcY} 1200,${arcY} 1600,${endY}`;
  // Slower animation: base 12 s, scales slightly with arc height variation
  const dur = `${12 + Math.abs(segment.curve - 20) * 0.3}s`;
  // Approximate peak y of the symmetric cubic bezier at t=0.5:
  // y(0.5) = 0.25 * endY + 0.75 * arcY
  const arcPeakY = Math.round(0.25 * endY + 0.75 * arcY);
  // All text sits a fixed 20 px above the arc peak — consistent across all paths
  const labelY  = Math.max(arcPeakY - 20, 8);
  const detailY = Math.max(arcPeakY - 5,  20);
  const lineTopY = Math.max(labelY - 8,   4);

  return (
    <div className="w-full overflow-hidden mt-10" style={{ lineHeight: 0 }}>
      <svg
        className="w-full"
        viewBox={`0 0 1600 120`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
        style={{ height: "clamp(70px, 10vw, 130px)" }}
      >
        <path id={pathId} d={d} />

        <path
          d={d}
          stroke="rgba(196,112,138,0.25)"
          strokeWidth="1.8"
          strokeDasharray="14 9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        <circle cx="0" cy={endY} r="6" fill="#c4708a" opacity="0.7" />
        <line x1="0" y1={endY - 6} x2="0" y2={lineTopY} stroke="#c4708a" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
        <text x="18" y={labelY} fontSize="14" fill="rgba(196,112,138,0.8)" fontFamily="'JetBrains Mono',monospace" fontWeight="700">
          {segment.from}
        </text>
        <text x="18" y={detailY} fontSize="10" fill="rgba(240,238,247,0.3)" fontFamily="'JetBrains Mono',monospace">
          {segment.fromCity}
        </text>

        <circle cx="1600" cy={endY} r="6" fill="#c4708a" opacity="0.7" />
        <line x1="1600" y1={endY - 6} x2="1600" y2={lineTopY} stroke="#c4708a" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
        <text x="1582" y={labelY} fontSize="14" fill="rgba(196,112,138,0.8)" fontFamily="'JetBrains Mono',monospace" fontWeight="700" textAnchor="end">
          {segment.to}
        </text>
        <text x="1582" y={detailY} fontSize="10" fill="rgba(240,238,247,0.3)" fontFamily="'JetBrains Mono',monospace" textAnchor="end">
          {segment.toCity}
        </text>

        <text x="800" y={labelY} textAnchor="middle" fontSize="11" fill="rgba(196,112,138,0.5)" fontFamily="'JetBrains Mono',monospace" letterSpacing="4">
          {segment.label.toUpperCase()}
        </text>
        <text x="800" y={detailY} textAnchor="middle" fontSize="9" fill="rgba(240,238,247,0.2)" fontFamily="'JetBrains Mono',monospace">
          {segment.flightNum} · {segment.distance} · {segment.duration}
        </text>

        <g>
          <g>
            <ellipse cx="0" cy="0" rx="11" ry="3" fill="#c4708a" />
            <polygon points="11,0 7.5,-1.5 7.5,1.5" fill="#e0a8bc" />
            <polygon points="2,0 -2,-11 -7,0" fill="#c4708a" opacity="0.92" />
            <polygon points="2,0 -2,11 -7,0" fill="#c4708a" opacity="0.92" />
            <polygon points="-7,0 -11,-5.5 -9,-0.5" fill="#b86488" opacity="0.82" />
            <polygon points="-7,0 -11,5.5 -9,0.5" fill="#b86488" opacity="0.82" />
            <circle cx="-2" cy="-8" r="1.5" fill="#f0c8d8" opacity="0.55" />
            <circle cx="-2" cy="8" r="1.5" fill="#f0c8d8" opacity="0.55" />
          </g>
          <animateMotion dur={dur} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </g>
      </svg>
    </div>
  );
}

// ─── Section Heading ───────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div className="text-center mb-12"
      initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", damping: 24, stiffness: 180 }}>
      {subtitle && <p className="text-xs font-mono uppercase tracking-[0.3em] text-foreground/35 mb-3">{subtitle}</p>}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
      <div className="mt-4 mx-auto w-12 h-0.5 rounded-full" style={{ backgroundColor: "#c4708a" }} />
    </motion.div>
  );
}

// ─── Experience Section ────────────────────────────────────────────────────────

function ExperienceSection({ jobs }: { jobs: CareerPoint[] }) {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto" id="experience">
      <SectionHeading title={sections.experience.title} subtitle={sections.experience.subtitle} />
      <div className="space-y-5">
        {jobs.map((job, i) => (
          <motion.div key={job.id}
            initial={{ opacity: 0, x: -40, y: 10 }} whileInView={{ opacity: 1, x: 0, y: 0 }} whileHover={{ y: -5 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", damping: 22, stiffness: 180, delay: i * 0.12 }}
            className="rounded-2xl overflow-hidden shadow-xl border" style={{ backgroundColor: "#1e1b2e", borderColor: TYPE_COLORS[job.type] + "20" }}>
            <div className="flex">
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest" style={{ color: TYPE_COLORS[job.type] }}>{job.company}</span>
                    <h3 className="text-lg font-bold text-foreground mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{job.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-foreground/35 shrink-0 ml-4 mt-1 bg-white/5 px-2 py-0.5 rounded">{job.period}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-foreground/40 mb-3 font-mono">
                  <MapPin className="w-3 h-3" />{job.city}
                </div>
                <p className="text-sm text-foreground/65 leading-relaxed mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 rounded font-mono" style={{ backgroundColor: TYPE_COLORS[job.type] + "15", color: TYPE_COLORS[job.type] }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="w-16 md:w-20 shrink-0 flex flex-col items-center justify-center border-l-2 border-dashed gap-3 py-4 px-2"
                style={{ borderColor: TYPE_COLORS[job.type] + "35", backgroundColor: TYPE_COLORS[job.type] + "07" }}>
                <span className="text-2xl">{job.icon}</span>
                <span className="text-xs font-mono text-foreground/25 leading-tight"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.12em" }}>
                  {job.city.split(",")[0].toUpperCase()}
                </span>
              </div>
            </div>
            <div className="h-0.5" style={{ background: `linear-gradient(to right, ${TYPE_COLORS[job.type]}, transparent)` }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Education Section ─────────────────────────────────────────────────────────

function EducationSection({ items }: { items: CareerPoint[] }) {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto" id="education">
      <SectionHeading title={sections.education.title} subtitle={sections.education.subtitle} />
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <motion.div key={item.id}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6, scale: 1.01 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", damping: 22, stiffness: 180, delay: i * 0.12 }}
            className="rounded-2xl p-6 border relative overflow-hidden" style={{ backgroundColor: "#1e1b2e", borderColor: TYPE_COLORS[item.type] + "25" }}>
            <div className="absolute top-0 right-0 w-28 h-28 rounded-bl-full opacity-5" style={{ backgroundColor: TYPE_COLORS[item.type] }} />
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
            <p className="text-sm font-semibold mb-2" style={{ color: TYPE_COLORS[item.type] }}>{item.company}</p>
            <p className="text-xs font-mono text-foreground/35 mb-3 flex items-center gap-1.5"><MapPin className="w-3 h-3" />{item.city} · {item.period}</p>
            <p className="text-sm text-foreground/65 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Certifications Section ────────────────────────────────────────────────────

function CertificationsSection({ items, onSelect }: { items: CareerPoint[]; onSelect: (p: CareerPoint) => void }) {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto" id="certifications">
      <SectionHeading title={sections.certifications.title} subtitle={sections.certifications.subtitle} />
      <div className="flex flex-wrap justify-center gap-10">
        {items.map((item, i) => (
          <motion.div key={item.id}
            onClick={() => onSelect(item)}
            initial={{ opacity: 0, scale: 0.6, rotate: -12, y: 20 }} whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            whileHover={{ scale: 1.09, rotate: 4, y: -6 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", damping: 20, stiffness: 200, delay: i * 0.14 }}
            className="w-44 h-44 rounded-full flex flex-col items-center justify-center p-5 border-2 border-dashed text-center cursor-pointer"
            style={{ borderColor: TYPE_COLORS[item.type] + "70", backgroundColor: TYPE_COLORS[item.type] + "0b" }}>
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-xs font-bold text-foreground/85 leading-tight mb-1">{item.title}</div>
            <div className="text-xs font-mono mt-0.5" style={{ color: TYPE_COLORS[item.type] }}>{item.company}</div>
            <div className="text-xs font-mono text-foreground/30 mt-0.5">{item.period}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Events Section ────────────────────────────────────────────────────────────

function EventsSection({ items }: { items: CareerPoint[] }) {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto" id="events">
      <SectionHeading title={sections.events.title} subtitle={sections.events.subtitle} />
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((item, i) => (
          <motion.div key={item.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -36 : 36, y: 12 }} whileInView={{ opacity: 1, x: 0, y: 0 }} whileHover={{ y: -6 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", damping: 22, stiffness: 180, delay: i * 0.1 }}
            className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "#1e1b2e", borderColor: TYPE_COLORS[item.type] + "20" }}>
            <div className="h-0.5" style={{ background: `linear-gradient(to right, ${TYPE_COLORS[item.type]}, ${TYPE_COLORS[item.type]}35)` }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-mono px-2 py-1 rounded-full" style={{ backgroundColor: TYPE_COLORS[item.type] + "18", color: TYPE_COLORS[item.type] }}>{item.period}</span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
              <p className="text-xs text-foreground/38 mb-3 flex items-center gap-1.5 font-mono"><MapPin className="w-3 h-3" />{item.city} · {item.company}</p>
              <p className="text-sm text-foreground/65 leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Volunteering Section ──────────────────────────────────────────────────────

function VolunteeringSection({ items }: { items: CareerPoint[] }) {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto" id="volunteering">
      <SectionHeading title={sections.volunteering.title} subtitle={sections.volunteering.subtitle} />
      <div className="grid md:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <motion.div key={item.id}
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -5, scale: 1.02 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", damping: 22, stiffness: 200, delay: i * 0.1 }}
            className="rounded-2xl p-5 border relative" style={{ backgroundColor: "#1e1b2e", borderColor: TYPE_COLORS[item.type] + "25" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4" style={{ backgroundColor: TYPE_COLORS[item.type] + "18" }}>{item.icon}</div>
            <h3 className="text-sm font-bold text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
            <p className="text-xs font-semibold mb-2" style={{ color: TYPE_COLORS[item.type] }}>{item.company}</p>
            <p className="text-xs text-foreground/35 font-mono mb-3">{item.city} · {item.period}</p>
            <p className="text-xs text-foreground/60 leading-relaxed">{item.description}</p>
            <div className="absolute top-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: TYPE_COLORS[item.type] + "40" }}>
              <Heart className="w-3 h-3" style={{ color: TYPE_COLORS[item.type] }} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectsSection({ items }: { items: Project[] }) {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto" id="projects">
      <SectionHeading title={sections.projects.title} subtitle={sections.projects.subtitle} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((project, i) => (
          <motion.div key={project.id}
            initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6, scale: 1.02 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", damping: 22, stiffness: 180, delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden border flex flex-col"
            style={{ backgroundColor: "#1e1b2e", borderColor: "rgba(196,112,138,0.18)" }}>
            <div className="h-0.5" style={{ background: "linear-gradient(to right, #c4708a, #9b7fc4)" }} />
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: "#c4708a18" }}>
                  {project.icon}
                </div>
                <span className="text-xs font-mono text-foreground/35 bg-white/5 px-2 py-0.5 rounded">{project.period}</span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ backgroundColor: "#c4708a15", color: "#c4708a", border: "1px solid #c4708a25" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {(project.github || project.live) && (
              <div className="px-5 pb-4 flex gap-4 border-t" style={{ borderColor: "rgba(196,112,138,0.1)" }}>
                <div className="flex gap-4 pt-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-foreground/40 hover:text-foreground/75 transition-colors">
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-foreground/40 hover:text-foreground/75 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Skills Section ────────────────────────────────────────────────────────────

const SKILL_META: Record<string, {
  color: string; label: string; flavor: string; symbol: string;
  Icon: React.ComponentType<{ className?: string }>;
}> = {
  "Languages":             { color: "#c4708a", label: "Languages",    flavor: "THE TONGUES I SPEAK WITH MACHINES",  symbol: "</>", Icon: Code2        },
  "Backend Engineering":   { color: "#9b7fc4", label: "Backend",      flavor: "THE ENGINES UNDER THE HOOD",          symbol: "{}",  Icon: Server       },
  "Frontend & Mobile":     { color: "#7fc4c0", label: "Frontend",     flavor: "WHAT USERS SEE AND TOUCH",            symbol: "[]",  Icon: Layers       },
  "Cloud & DevOps":        { color: "#c4a87f", label: "Cloud & Infra",flavor: "INFRASTRUCTURE AND PIPELINES",        symbol: "∞",   Icon: Cloud        },
  "Databases":             { color: "#7fc488", label: "Databases",    flavor: "WHERE DATA LIVES AND BREATHES",       symbol: "DB",  Icon: Database     },
  "Quality & Testing":     { color: "#c4b07f", label: "Quality",      flavor: "SHIPPING WITH CONFIDENCE",            symbol: "✓",   Icon: ShieldCheck  },
  "Engineering Practices": { color: "#8888a0", label: "Practices",    flavor: "THE WAY I BUILD",                     symbol: "⚙",   Icon: Settings2    },
};

function SkillsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const group = skills[activeIdx];
  const meta = SKILL_META[group.group] ?? Object.values(SKILL_META)[0];

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto" id="skills">
      <SectionHeading title={sections.skills.title} subtitle={sections.skills.subtitle} />

      {/* Tab bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {skills.map((g, i) => {
          const m = SKILL_META[g.group] ?? Object.values(SKILL_META)[0];
          const isActive = i === activeIdx;
          const TabIcon = m.Icon;
          return (
            <button key={g.group} onClick={() => setActiveIdx(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all"
              style={{
                backgroundColor: isActive ? m.color + "18" : "transparent",
                border: `1px solid ${isActive ? m.color + "70" : "rgba(255,255,255,0.07)"}`,
                color: isActive ? m.color : "rgba(240,238,247,0.35)",
              }}>
              <TabIcon className="w-3.5 h-3.5" />
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <AnimatePresence mode="wait">
        <motion.div key={activeIdx}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          className="relative rounded-2xl p-8 border overflow-hidden"
          style={{ backgroundColor: "#1e1b2e", borderColor: meta.color + "25", minHeight: "160px" }}>

          {/* Decorative background symbol */}
          <span className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black leading-none"
            style={{ fontSize: "clamp(80px,12vw,140px)", color: meta.color, opacity: 0.06, fontFamily: "monospace" }}>
            {meta.symbol}
          </span>

          <p className="text-xs font-mono uppercase tracking-[0.25em] mb-6" style={{ color: meta.color + "60" }}>
            {meta.flavor}
          </p>

          <div className="flex flex-wrap gap-2.5">
            {group.items.map((skill, i) => (
              <motion.span key={skill}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.045, type: "spring", damping: 20, stiffness: 300 }}
                className="px-4 py-2 rounded-full text-sm font-mono font-medium"
                style={{ backgroundColor: meta.color + "18", color: meta.color, border: `1px solid ${meta.color}35` }}>
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto" id="about">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -44 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", damping: 24, stiffness: 160 }}>
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#c4708a" }}>{about.label}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {about.headingLines[0]}<br />{about.headingLines[1]}
          </h2>
          {about.paragraphs.map((p, i) => (
            <p key={i} className={`text-foreground/60 leading-relaxed text-sm${i < about.paragraphs.length - 1 ? " mb-4" : ""}`}>{p}</p>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="grid grid-cols-2 gap-4">
          {about.stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, scale: 0.78, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} whileHover={{ y: -5, scale: 1.05 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", damping: 20, stiffness: 220, delay: 0.1 + i * 0.1 }}
              className="rounded-2xl p-5 text-center border" style={{ backgroundColor: "#1e1b2e", borderColor: "rgba(196,112,138,0.15)" }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#c4708a" }}>{s.value}</div>
              <div className="text-xs font-mono text-foreground/40">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────────

function ContactSection() {
  const [sent, setSent] = useState(false);
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto" id="contact">
      <SectionHeading title={sections.contact.title} subtitle={sections.contact.subtitle} />
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", damping: 24, stiffness: 180 }}>
          <p className="text-foreground/55 text-sm leading-relaxed mb-8">{contactText.intro}</p>
          <div className="space-y-4">
            {contactText.links.map(({ icon, label, href }) => {
              const Icon = CONTACT_ICON_MAP[icon as keyof typeof CONTACT_ICON_MAP];
              return (
                <a key={label} href={href} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all"
                    style={{ backgroundColor: "#c4708a18", borderColor: "#c4708a30" }}>
                    <Icon className="w-4 h-4" style={{ color: "#c4708a" }} />
                  </div>
                  <span className="text-sm text-foreground/55 group-hover:text-foreground/85 transition-colors font-mono">{label}</span>
                  <ExternalLink className="w-3 h-3 text-foreground/18 group-hover:text-foreground/45 transition-colors" />
                </a>
              );
            })}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ type: "spring", damping: 24, stiffness: 180, delay: 0.1 }}>
          {sent ? (
            <div className="rounded-2xl p-8 text-center border" style={{ backgroundColor: "#1e1b2e", borderColor: "#c4708a30" }}>
              <div className="text-4xl mb-3">✉️</div>
              <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{contactText.success.heading}</h3>
              <p className="text-sm text-foreground/50">{contactText.success.body}</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
              {contactText.form.fields.map(({ name, placeholder, type }) => (
                <input key={name} type={type} name={name} placeholder={placeholder} required
                  className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder-foreground/25 border outline-none focus:border-primary/60 transition-colors"
                  style={{ backgroundColor: "#1e1b2e", borderColor: "rgba(196,112,138,0.2)", fontFamily: "'DM Sans', sans-serif" }} />
              ))}
              <textarea name="message" rows={4} placeholder={contactText.form.messagePlaceholder} required
                className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder-foreground/25 border outline-none focus:border-primary/60 transition-colors resize-none"
                style={{ backgroundColor: "#1e1b2e", borderColor: "rgba(196,112,138,0.2)", fontFamily: "'DM Sans', sans-serif" }} />
              <button type="submit"
                className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{ backgroundColor: "#c4708a", color: "#13111d", fontFamily: "'DM Sans', sans-serif" }}>
                <Send className="w-4 h-4" /> {contactText.form.submit}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Navigation ────────────────────────────────────────────────────────────────

function Nav({ onNav }: { onNav: (id: string) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between"
      style={{ background: "linear-gradient(to bottom, rgba(19,17,29,0.95), rgba(19,17,29,0))" }}>
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "#c4708a" }}>
          <Globe className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{profile.name}</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((id) => (
          <button key={id} onClick={() => onNav(id)}
            className="text-xs font-mono uppercase tracking-widest text-foreground/45 hover:text-foreground/85 transition-colors capitalize">
            {id}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [selected, setSelected] = useState<GlobeMarker | null>(null);
  const [hovered, setHovered] = useState<GlobeMarker | null>(null);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const jobs = careerPoints.filter((p) => p.type === "job");
  const education = careerPoints.filter((p) => p.type === "education");
  const certs = careerPoints.filter((p) => p.type === "cert");
  const events = careerPoints.filter((p) => p.type === "event");
  const volunteers = careerPoints.filter((p) => p.type === "volunteer");

  return (
    <div className="min-h-screen text-foreground" style={{ fontFamily: "'DM Sans', sans-serif", background: "radial-gradient(ellipse 90% 60% at 50% -5%, #291830 0%, #13111d 55%)" }}>
      <Nav onNav={scrollTo} />

      {/* ── Hero Globe ── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(196,112,138,0.08) 0%, transparent 65%)" }} />
        </div>

        {/* Desktop text — left side */}
        <motion.div className="absolute top-1/2 left-8 lg:left-16 -translate-y-1/2 z-10 hidden lg:block max-w-xs"
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <p className="text-xs font-mono uppercase tracking-[0.3em] mb-3" style={{ color: "#c4708a" }}>{profile.role}</p>
          <h1 className="text-5xl xl:text-6xl font-black leading-none text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Hi, I&apos;m
          </h1>
          <h1 className="text-5xl xl:text-6xl font-black leading-none mb-5" style={{ fontFamily: "'Playfair Display', serif", color: "#c4708a" }}>
            {profile.name}
          </h1>
          <p className="text-sm text-foreground/45 leading-relaxed">
            {heroText.taglineLines[0]}<br />{heroText.taglineLines[1]}
          </p>
          <motion.button onClick={() => scrollTo("about")}
            className="mt-6 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all"
            style={{ borderColor: "#c4708a50", color: "#c4708a", backgroundColor: "#c4708a12" }}
            whileHover={{ backgroundColor: "#c4708a28", scale: 1.03 }}>
            {heroText.cta}
          </motion.button>
        </motion.div>

        {/* Mobile header */}
        <motion.div className="lg:hidden text-center px-6 pt-20 pb-4 z-10"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-3xl font-black text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Hi, I&apos;m <span style={{ color: "#c4708a" }}>{profile.name}</span>
          </h1>
          <p className="text-sm text-foreground/45 mt-1">{heroText.mobileSubtitle}</p>
        </motion.div>

        {/* Globe canvas */}
        <div className="w-full max-w-2xl lg:max-w-3xl aspect-square max-h-[78vh]">
          <Globe3D markers={globeMarkers} onMarkerClick={setSelected} onMarkerHover={setHovered} isPaused={selected !== null} />
        </div>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div key={mId(hovered)}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full text-xs font-mono z-20 pointer-events-none whitespace-nowrap flex items-center gap-2 border"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}
              style={{ backgroundColor: "#1e1b2eee", borderColor: mColor(hovered) + "45", backdropFilter: "blur(8px)" }}>
              <MapPin className="w-3 h-3" style={{ color: mColor(hovered) }} />
              <span className="text-foreground/65">{hovered.kind === "single" ? hovered.point.city : hovered.city}</span>
              <span className="text-foreground/25">—</span>
              <span style={{ color: mColor(hovered) }}>{hovered.kind === "single" ? hovered.point.title : `${hovered.points.length} events`}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div className="absolute bottom-6 right-6 z-10 hidden md:flex flex-col gap-1.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          {(Object.keys(TYPE_LABELS) as PointType[]).map((type) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[type] }} />
              <span className="text-xs font-mono text-foreground/30">{TYPE_LABELS[type]}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.button onClick={() => scrollTo("about")}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/28 hover:text-foreground/55 transition-colors"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <span className="text-xs font-mono uppercase tracking-widest">{heroText.scroll}</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </section>

      {/* ── Content ── */}
      <AboutSection />
      <FlightPath segment={flightSegments[0]} />
      <ExperienceSection jobs={jobs} />
      <FlightPath segment={flightSegments[1]} />
      <EducationSection items={education} />
      <FlightPath segment={flightSegments[2]} />
      <CertificationsSection items={certs} onSelect={(p) => setSelected({ kind: "single", point: p })} />
      <FlightPath segment={flightSegments[3]} />
      <EventsSection items={events} />
      <FlightPath segment={flightSegments[4]} />
      <VolunteeringSection items={volunteers} />
      <FlightPath segment={flightSegments[5]} />
      <ProjectsSection items={projects} />
      <FlightPath segment={flightSegments[6]} />
      <SkillsSection />
      <FlightPath segment={flightSegments[7]} />
      <ContactSection />

      <footer className="py-10 text-center border-t" style={{ borderColor: "rgba(196,112,138,0.08)" }}>
        <p className="text-xs font-mono text-foreground/22">{footer.text}</p>
      </footer>

      <AnimatePresence>
        {selected && selected.kind === "single" && (
          <PointModal point={selected.point} onClose={() => setSelected(null)} />
        )}
        {selected && selected.kind === "group" && (
          <CityGroupModal city={selected.city} points={selected.points} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
