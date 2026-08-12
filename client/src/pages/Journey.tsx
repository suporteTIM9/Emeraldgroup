import { useEffect, useRef, useState } from "react";
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
  lift?: number; // extra px to push the label up, to de-clutter close pairs
}

const officeMarkers: OfficeMarker[] = [
  { name: "London",       x: 49.96, y: 21.4, lift: 34 },
  { name: "Lisbon",       x: 47.46, y: 28.5 },
  { name: "Dubai",        tag: "Headquarters", x: 65.35, y: 36.0, lift: 34 },
  { name: "Abu Dhabi",    x: 65.11, y: 41.5 },
  { name: "Shanghai",     x: 83.74, y: 32.7 },
  { name: "Luanda",       tag: "Core Operations", x: 53.68, y: 54.9 },
  { name: "São Paulo",    x: 37.05, y: 63.1 },
  { name: "Johannesburg", x: 57.79, y: 64.6 },
];

function JourneyMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="relative overflow-hidden rounded-lg select-none"
      style={{ aspectRatio: "1920 / 960" }}
    >
      <img
        src="/imagens/world-night-lights.jpg"
        alt="Emerald Group global office network"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.02) 35%, rgba(0,0,0,0.3) 100%)" }}
      />

      {officeMarkers.map((city) => {
        const isActive = active === city.name;
        return (
          <button
            key={city.name}
            type="button"
            onMouseEnter={() => setActive(city.name)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(isActive ? null : city.name)}
            className="absolute flex flex-col items-center"
            style={{ left: `${city.x}%`, top: `${city.y}%`, transform: `translate(-50%, calc(-100% - ${city.lift ?? 0}px))` }}
          >
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
            <span
              className="block transition-all"
              style={{ width: "1.5px", height: isActive ? "18px" : "12px", background: isActive ? "#02d49e" : "rgba(2,212,158,0.65)" }}
            />
            <span
              className="block rounded-full transition-all"
              style={{
                width: isActive ? "10px" : "6px",
                height: isActive ? "10px" : "6px",
                background: "#02d49e",
                boxShadow: isActive ? "0 0 0 6px rgba(2,212,158,0.25)" : "0 0 0 2px rgba(2,212,158,0.18)",
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

      {/* ── Map ── */}
      <section className="py-16 sm:py-20" style={{ background: "var(--eg-dark)" }}>
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <JourneyMap />
          </div>
        </div>
      </section>

      {/* ── Full timeline (premium vertical) ── */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <style>{`
          .timeline-item {
            opacity: 0;
            transform: translateY(28px);
            transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                        transform 0.8s cubic-bezier(0.16,1,0.3,1);
          }
          .timeline-item.in-view { opacity: 1; transform: translateY(0); }
          .timeline-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          }
          .timeline-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 16px 40px rgba(0,0,0,0.08);
            border-color: transparent !important;
          }
          @keyframes timeline-live-ring {
            0%  { transform: scale(1); opacity: 0.7; }
            70% { transform: scale(2.8); opacity: 0; }
            100%{ transform: scale(1); opacity: 0; }
          }
          .timeline-live-dot { position: relative; }
          .timeline-live-dot::before, .timeline-live-dot::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: #02d49e;
            animation: timeline-live-ring 2s ease-out infinite;
          }
          .timeline-live-dot::after { animation-delay: 0.7s; }
        `}</style>
        <div className="container">
          <div className="mx-auto max-w-3xl" ref={timelineRef}>
            <p className="mb-16 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.35)" }}>
              The Full Story
            </p>

            <div className="relative">
              {/* Track */}
              <div
                className="absolute top-2 bottom-2 w-px"
                style={{ left: "23px", background: "oklch(0.93 0.005 240)" }}
              />
              {/* Gradient accent line */}
              <div
                className="absolute top-2 bottom-2 w-px"
                style={{
                  left: "23px",
                  background: "linear-gradient(180deg, #02d49e 0%, var(--eg-cyan) 45%, var(--eg-orange) 100%)",
                  opacity: 0.6,
                }}
              />

              <div className="flex flex-col gap-12 sm:gap-14">
                {milestones.map((m, i) => {
                  const isLast = i === milestones.length - 1;
                  return (
                    <div key={m.year} className="timeline-item relative pl-16 sm:pl-20">
                      {/* Marker */}
                      <div className="absolute left-0 top-1 flex h-[47px] w-[47px] items-center justify-center">
                        {isLast ? (
                          <span className="timeline-live-dot flex h-3 w-3 rounded-full" style={{ background: "#02d49e" }} />
                        ) : (
                          <span
                            className="block h-3 w-3 rounded-full border-2"
                            style={{ background: "white", borderColor: "var(--eg-cyan)" }}
                          />
                        )}
                      </div>

                      {/* Card */}
                      <div
                        className="timeline-card rounded-lg p-6 sm:p-8"
                        style={{ background: "white", border: "1px solid oklch(0.93 0.005 240)", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="leading-none"
                            style={{ fontFamily: "Playfair Display, serif", fontSize: "2.25rem", fontWeight: 700, color: "var(--eg-cyan)" }}
                          >
                            {m.year}
                          </span>
                          {isLast && (
                            <span
                              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                              style={{ background: "rgba(2,212,158,0.12)", color: "var(--eg-cyan)" }}
                            >
                              What's Next
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ color: "var(--eg-dark)" }}>
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
