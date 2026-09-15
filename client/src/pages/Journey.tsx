import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { milestones, chapters } from "@/data/journey";

// Which narrative chapter each milestone year belongs to — powers the small
// tag pill shown above every timeline entry.
const chapterTitleByYear = new Map(chapters.flatMap((c) => c.years.map((y) => [y, c.title])));

// Splits a "Label: rest of the sentence" bullet into its parts — used to turn
// the final milestone's three bullets into the Connect / Create / Grow columns.
function splitBullet(bullet: string): { label: string; text: string } {
  const idx = bullet.indexOf(":");
  if (idx === -1) return { label: "", text: bullet };
  return { label: bullet.slice(0, idx).trim(), text: bullet.slice(idx + 1).trim() };
}

// ── Global office network — positions are approximate lat/long converted to
//    percentage coordinates on an equirectangular world map (2:1 aspect). ──
interface OfficeMarker {
  name: string;
  tag?: string;
  x: number;
  y: number;
  lift?: number; // extra px to push the label away from the dot, to de-clutter close pairs
  labelPos?: "top" | "bottom" | "left" | "right"; // which side of the dot the label sits on (default: top)
}

const officeMarkers: OfficeMarker[] = [
  { name: "London",       x: 49.96, y: 21.4, labelPos: "right" },
  { name: "Lisbon",       x: 47.46, y: 28.5 },
  { name: "Dubai",        tag: "Headquarters", x: 65.35, y: 36.0, lift: 30 },
  { name: "Abu Dhabi",    x: 65.11, y: 36.4 },
  { name: "Shanghai",     x: 83.74, y: 32.7 },
  { name: "Luanda",       tag: "Core Operations", x: 53.68, y: 54.9 },
  { name: "São Paulo",    x: 37.05, y: 63.1 },
  { name: "Johannesburg", x: 57.79, y: 64.6, labelPos: "bottom" },
  { name: "Maputo",       x: 59.05, y: 64.43, labelPos: "right" },
];

// Headquarters / core-operations / regular-office each get their own accent so
// the map's visual hierarchy matches its legend at a glance.
type MarkerKind = "hq" | "ops" | "office";
function markerKind(city: OfficeMarker): MarkerKind {
  if (city.tag === "Headquarters") return "hq";
  if (city.tag === "Core Operations") return "ops";
  return "office";
}
const markerColor: Record<MarkerKind, string> = {
  hq: "#02d49e",
  ops: "#d7c46a",
  office: "#8fa79c",
};

// The map box is locked to a FIXED aspect ratio — this crops off a constant
// slice of empty Arctic/Antarctic space (no markers ever live there) so the
// map reads as shorter/less dominant, edge to edge. Critically, because the
// ratio is fixed (not a max-height clamp tied to viewport width), the visible
// vertical band is the same *proportion* at every screen width — unlike a
// height clamp, which shrinks that band on wide screens. Every marker's y is
// comfortably inside [21%, 65%], well within the [15%, 74%] band below.
const MAP_ASPECT = 2.6; // width / height of the visible map box
const MAP_OBJECT_POS_Y = 35; // vertical anchor of the visible band, 0-100
const MAP_VISIBLE_FRAC = 2 / MAP_ASPECT; // fraction of the full globe height kept visible
const MAP_TOP_CROP = (1 - MAP_VISIBLE_FRAC) * (MAP_OBJECT_POS_Y / 100); // fraction cropped off the top

// Converts a marker's raw geographic y (0-100) into its position within the
// cropped, visible band — shared by the HTML label/dot overlay and the SVG
// arcs beneath it, so both systems always agree on where a city sits.
function markerY(city: OfficeMarker) {
  return ((city.y / 100 - MAP_TOP_CROP) / MAP_VISIBLE_FRAC) * 100;
}

// A gentle upward-bulging quadratic curve between two points on the 0-100
// percentage grid — longer hops arc higher, echoing how flight paths bow
// on a flat projection.
function arcPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2 - Math.abs(from.x - to.x) * 0.16 - 6;
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

function JourneyMap() {
  const [active, setActive] = useState<string | null>(null);

  const getMarkerStyle = (city: OfficeMarker) => ({
    left: `${city.x}%`,
    top: `${markerY(city)}%`,
  });

  const hq = officeMarkers.find((c) => c.tag === "Headquarters")!;
  const hqPoint = { x: hq.x, y: markerY(hq) };

  return (
    <div
      className="relative overflow-hidden select-none group/map w-full"
      style={{ aspectRatio: `${MAP_ASPECT} / 1`, minHeight: "260px", background: "radial-gradient(120% 140% at 15% 0%, #0f1e17 0%, #070a09 55%, #050605 100%)" }}
    >
      <style>{`
        @keyframes map-pulse-ring {
          0%   { transform: scale(1); opacity: 0.55; }
          70%  { transform: scale(3.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .map-pulse { position: relative; }
        .map-pulse::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: currentColor;
          animation: map-pulse-ring 2.4s ease-out infinite;
        }
      `}</style>

      {/* Schematic backdrop — faint graticule + connection arcs radiating from HQ */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <g stroke="#16241d" strokeWidth="0.15" opacity="0.7">
          <line x1="0" y1="22" x2="100" y2="22" />
          <line x1="0" y1="48" x2="100" y2="48" />
          <line x1="0" y1="74" x2="100" y2="74" />
          <line x1="20" y1="0" x2="20" y2="100" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="80" y1="0" x2="80" y2="100" />
        </g>
        <g fill="none" stroke="#1f6b4c" strokeWidth="0.18" opacity="0.55">
          {officeMarkers
            .filter((c) => c.name !== hq.name)
            .map((city) => (
              <path key={city.name} d={arcPath(hqPoint, { x: city.x, y: markerY(city) })} />
            ))}
        </g>
      </svg>

      {officeMarkers.map((city, ci) => {
        const isActive = active === city.name;
        const kind = markerKind(city);
        const color = markerColor[kind];
        const gap = 10 + (city.lift ?? 0);
        const pos = city.labelPos ?? "top";
        const isVertical = pos === "top" || pos === "bottom";

        // Label container: offset away from the dot on the chosen side, cross-axis centred.
        const labelStyle: CSSProperties = isVertical
          ? { left: "50%", transform: "translateX(-50%)", [pos === "top" ? "bottom" : "top"]: `calc(50% + ${gap}px)` }
          : { top: "50%", transform: "translateY(-50%)", [pos === "left" ? "right" : "left"]: `calc(50% + ${gap}px)` };
        const labelClass = isVertical
          ? "absolute flex flex-col items-center"
          : `absolute flex flex-col ${pos === "left" ? "items-end" : "items-start"}`;

        // Connecting line: vertical for top/bottom, horizontal for left/right.
        const lineStyle: CSSProperties = isVertical
          ? { left: "50%", [pos === "top" ? "bottom" : "top"]: "50%", width: "1.5px", height: `${gap}px`, transform: "translateX(-50%)" }
          : { top: "50%", [pos === "left" ? "right" : "left"]: "50%", height: "1.5px", width: `${gap}px`, transform: "translateY(-50%)" };

        return (
          <button
            key={city.name}
            type="button"
            onMouseEnter={() => setActive(city.name)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(isActive ? null : city.name)}
            className="absolute z-10 transition-opacity duration-300"
            style={{ ...getMarkerStyle(city), transform: "translate(-50%, -50%)" }}
          >
            {/* Label + connecting line — anchored to the dot, on whichever side labelPos picks */}
            <div className={labelClass} style={labelStyle}>
              <span
                className="whitespace-nowrap font-bold transition-colors"
                style={{
                  fontSize: "clamp(8px, 1.3vw, 14px)",
                  color: isActive ? color : "#ffffff",
                  textShadow: "0 1px 5px rgba(0,0,0,0.85)",
                }}
              >
                {city.name}
              </span>
              {city.tag && (
                <span
                  className="whitespace-nowrap"
                  style={{ fontSize: "clamp(6.5px, 0.9vw, 10px)", color: "rgba(255,255,255,0.75)", textShadow: "0 1px 5px rgba(0,0,0,0.85)" }}
                >
                  {city.tag}
                </span>
              )}
            </div>
            <span
              className="absolute block transition-all"
              style={{
                ...lineStyle,
                background: isActive ? color : `color-mix(in srgb, ${color} 65%, transparent)`,
              }}
            />
            {/* Dot — always exactly at the true geographic anchor */}
            <span
              className={kind === "office" ? "block rounded-full transition-all" : "map-pulse block rounded-full transition-all"}
              style={{
                width: isActive ? "10px" : "6px",
                height: isActive ? "10px" : "6px",
                background: color,
                color,
                // A solid white ring first, so the dot reads clearly even over the map's
                // brightest city-light clusters, then the usual soft accent glow on top.
                boxShadow: isActive
                  ? `0 0 0 1.5px white, 0 0 0 6px color-mix(in srgb, ${color} 25%, transparent)`
                  : `0 0 0 1.5px white, 0 0 0 2px color-mix(in srgb, ${color} 18%, transparent)`,
                animationDelay: `${ci * 0.3}s`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function Journey() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const timelineRef = useRef<HTMLDivElement>(null);
  const spineBoxRef = useRef<HTMLDivElement>(null);
  const spineFillRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-reveal cascade for timeline items ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    timelineRef.current?.querySelectorAll(".timeline-item").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Spine progress line — fills in as the timeline scrolls through view ── */
  useEffect(() => {
    function onScroll() {
      const box = spineBoxRef.current;
      const fill = spineFillRef.current;
      if (!box || !fill) return;
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const scrolled = Math.min(Math.max(vh * 0.5 - rect.top, 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      fill.style.height = `${pct}%`;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Journey" }]} />

      {/* ── Map (full-bleed, edge to edge — aspect-ratio locked so every marker stays fully visible) ── */}
      <section style={{ background: "var(--eg-dark)" }}>
        <div className="container flex flex-wrap items-start justify-between gap-x-10 gap-y-4 pt-8 pb-4 sm:pt-10">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "#02d49e" }}>
            Where We Operate
          </p>
          <div className="flex gap-8 sm:gap-10">
            {[
              { n: milestones[0]?.year ?? "2008", l: "Founded" },
              { n: String(officeMarkers.length), l: "Cities" },
              { n: "6", l: "Core Sectors" },
            ].map((s) => (
              <div key={s.l} className="text-right">
                <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "22px", color: "white" }}>{s.n}</div>
                <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <JourneyMap />

        <div className="container flex flex-wrap items-center gap-x-6 gap-y-2 py-5 sm:py-6 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: markerColor.hq }} />Headquarters</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: markerColor.ops }} />Core Operations</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: markerColor.office }} />Office</span>
        </div>
      </section>

      {/* ── Full timeline (editorial spine, big ghost year numerals) ── */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <style>{`
          .timeline-item {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                        transform 0.8s cubic-bezier(0.16,1,0.3,1);
          }
          .timeline-item.in-view { opacity: 1; transform: translateY(0); }
        `}</style>
        <div className="container">
          <div className="mx-auto max-w-3xl" ref={timelineRef}>
            <h2
              className="mb-5 text-3xl sm:text-4xl font-bold leading-tight text-center"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--eg-dark)" }}
            >
              Every Chapter of Our Journey
            </h2>
            <p className="mx-auto mb-16 max-w-xl text-center text-sm sm:text-base leading-relaxed" style={{ color: "var(--eg-dark)", opacity: 0.7 }}>
              Eighteen years ago, Emerald Group was built on a simple conviction: emerging markets need
              investors who show up locally, not just capital that arrives remotely. Here's how that
              conviction became a group operating across three continents.
            </p>

            <div className="relative [--spine-left:16px] [--spine-gutter:52px] sm:[--spine-left:30px] sm:[--spine-gutter:88px]" ref={spineBoxRef}>
              {/* Spine track + scroll-linked fill */}
              <div className="absolute top-1 bottom-1 w-0.5" style={{ left: "var(--spine-left)", background: "oklch(0.92 0.005 240)" }} />
              <div ref={spineFillRef} className="absolute top-1 w-0.5" style={{ left: "var(--spine-left)", background: "var(--eg-cyan)", height: "0%" }} />

              <div className="flex flex-col">
                {milestones.map((m, i) => {
                  const isLast = i === milestones.length - 1;
                  const tag = isLast ? "What's Next" : (chapterTitleByYear.get(m.year) ?? "");

                  if (isLast) {
                    const cols = m.bullets.map(splitBullet);
                    return (
                      <div key={m.year} className="timeline-item relative" style={{ paddingLeft: "var(--spine-gutter)" }}>
                        <span
                          className="absolute rounded-full"
                          style={{ left: "calc(var(--spine-left) - 6px)", top: "30px", width: 13, height: 13, background: "var(--eg-cyan)" }}
                        />
                        <div
                          className="leading-none select-none"
                          style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 3.4rem)", color: "oklch(0.32 0.03 165)", letterSpacing: "-0.02em" }}
                        >
                          {m.year}
                        </div>
                        <div className="rounded-2xl mt-4 p-7 sm:p-9" style={{ background: "var(--eg-dark)" }}>
                          <span
                            className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4"
                            style={{ background: "rgba(2,212,158,0.15)", color: "#02f9ba" }}
                          >
                            {tag}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
                            {m.title.split(": ").pop()}
                          </h3>
                          <p className="text-sm leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.65)" }}>
                            The next chapter builds on eighteen years of local expertise — systematically
                            linking Africa's economies to global capital, and compounding it into durable growth.
                          </p>
                          <div className="grid sm:grid-cols-3 gap-6">
                            {cols.map((c) => (
                              <div key={c.label} className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                                <h4 className="text-base font-semibold mb-1.5" style={{ fontFamily: "Playfair Display, serif", color: "#02f9ba" }}>
                                  {c.label}
                                </h4>
                                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{c.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={m.year} className="timeline-item relative pb-14 sm:pb-16" style={{ paddingLeft: "var(--spine-gutter)" }}>
                      <span
                        className="absolute rounded-full"
                        style={{ left: "calc(var(--spine-left) - 6px)", top: "30px", width: 13, height: 13, background: "white", border: "2px solid var(--eg-cyan)" }}
                      />
                      <div
                        className="leading-none select-none"
                        style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 3.4rem)", color: "oklch(0.93 0.015 165)", letterSpacing: "-0.02em" }}
                      >
                        {m.year}
                      </div>
                      <div className="mt-3">
                        {tag && (
                          <span
                            className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                            style={{ background: "rgba(2,212,158,0.12)", color: "var(--eg-cyan)" }}
                          >
                            {tag}
                          </span>
                        )}
                        <h3 className="text-lg sm:text-xl font-bold mb-3" style={{ color: "var(--eg-dark)" }}>
                          {m.title}
                        </h3>
                        <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "var(--eg-dark)" }}>
                          {m.bullets.map((b, bi) => (
                            <p key={bi}>{b}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 sm:py-28" style={{ background: "var(--eg-dark)" }}>
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "#02d49e" }}>
              What's Next
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Be Part of the Next Chapter
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              We're just getting started. Whether you're an investor, a partner, or simply curious about
              where we're headed, we'd love to hear from you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-sm transition-all hover:opacity-90"
                style={{ background: "#02d49e" }}
              >
                Get in Touch
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-sm border transition-colors hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "white" }}
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
