import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { milestones } from "@/data/journey";

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

// Natural aspect ratio of /imagens/world-night-lights.jpg (2:1). The map box
// is locked to this ratio — rather than being cropped to fit an arbitrary
// container height — so the full image, and every marker on it, is always
// entirely visible. It reads as a smaller, static map rather than a
// full-bleed cinematic crop, but nothing is ever clipped for anyone.
function JourneyMap() {
  const [active, setActive] = useState<string | null>(null);

  const getMarkerStyle = (city: OfficeMarker) => ({
    left: `${city.x}%`,
    top: `${city.y}%`,
  });

  return (
    <div
      className="relative overflow-hidden select-none group/map w-full"
      style={{ aspectRatio: "2 / 1" }}
    >
      <style>{`
        @keyframes map-kenburns {
          0%   { transform: scale(1.02); }
          50%  { transform: scale(1.08); }
          100% { transform: scale(1.02); }
        }
        .map-bg { animation: map-kenburns 40s ease-in-out infinite; }
        .group\\/map:hover .map-bg { animation-play-state: paused; transform: scale(1.1) !important; transition: transform 0.6s ease; }
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
          background: #02d49e;
          animation: map-pulse-ring 2.4s ease-out infinite;
        }
      `}</style>
      <img
        src="/imagens/world-night-lights.jpg"
        alt="Emerald Group global office network"
        className="map-bg absolute inset-0 h-full w-full object-cover"
        style={{ transition: "transform 0.6s ease" }}
        loading="lazy"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.02) 35%, rgba(0,0,0,0.3) 100%)" }}
      />

      {officeMarkers.map((city, ci) => {
        const isActive = active === city.name;
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
                  color: isActive ? "#02d49e" : "#ffffff",
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
                background: isActive ? "#02d49e" : "rgba(2,212,158,0.65)",
              }}
            />
            {/* Dot — always exactly at the true geographic anchor */}
            <span
              className={isActive ? "block rounded-full transition-all" : "map-pulse block rounded-full transition-all"}
              style={{
                width: isActive ? "10px" : "6px",
                height: isActive ? "10px" : "6px",
                background: "#02d49e",
                // A solid white ring first, so the dot reads clearly even over the map's
                // brightest city-light clusters, then the usual soft teal glow on top.
                boxShadow: isActive
                  ? "0 0 0 1.5px white, 0 0 0 6px rgba(2,212,158,0.25)"
                  : "0 0 0 1.5px white, 0 0 0 2px rgba(2,212,158,0.18)",
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Journey" }]} />

      {/* ── Map (full-bleed, edge to edge — aspect-ratio locked so every marker stays fully visible) ── */}
      <section style={{ background: "var(--eg-dark)" }}>
        <JourneyMap />
      </section>

      {/* ── Full timeline (magazine-style, big year numerals) ── */}
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
          <div className="mx-auto max-w-4xl" ref={timelineRef}>
            <h2
              className="mb-16 text-3xl sm:text-4xl font-bold leading-tight text-center"
              style={{ fontFamily: "Playfair Display, serif", color: "var(--eg-dark)" }}
            >
              Every Chapter of Our Journey
            </h2>

            <div className="flex flex-col">
              {milestones.map((m, i) => {
                const isLast = i === milestones.length - 1;
                return (
                  <div
                    key={m.year}
                    className="timeline-item grid sm:grid-cols-[1fr_2.1fr] gap-2 sm:gap-10 py-10 sm:py-12"
                    style={{ borderTop: i === 0 ? "none" : "1px solid oklch(0.94 0.005 240)" }}
                  >
                    <div
                      className="leading-none select-none"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontWeight: 700,
                        fontSize: "clamp(3.2rem, 8vw, 5.5rem)",
                        color: "oklch(0.93 0.015 165)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {m.year}
                    </div>
                    <div className="sm:pt-2">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg sm:text-xl font-bold" style={{ color: "var(--eg-dark)" }}>
                          {m.title}
                        </h3>
                        {isLast && (
                          <span
                            className="shrink-0 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(2,212,158,0.12)", color: "var(--eg-cyan)" }}
                          >
                            What's Next
                          </span>
                        )}
                      </div>
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
