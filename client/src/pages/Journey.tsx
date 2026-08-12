import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { milestones } from "@/data/journey";

// ── Abstract connection map — Headquarters (Dubai) ↔ Core Operations (Angola) ──
// Deliberately illustrative, not a to-scale geographic projection.
function JourneyMap() {
  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{ background: "oklch(0.08 0.02 165)", aspectRatio: "16 / 8" }}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path
          d="M 180 260 Q 400 70 610 128"
          fill="none"
          stroke="rgba(2,212,158,0.4)"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />
        <circle cx="180" cy="260" r="5" fill="#02d49e" />
        <circle cx="180" cy="260" r="5" fill="#02d49e" opacity="0.5">
          <animate attributeName="r" values="5;20;5" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="610" cy="128" r="5" fill="#02d49e" />
        <circle cx="610" cy="128" r="5" fill="#02d49e" opacity="0.5">
          <animate attributeName="r" values="5;20;5" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="absolute" style={{ left: "20%", top: "62%" }}>
        <div className="text-xs sm:text-sm font-bold text-white">Luanda, Angola</div>
        <div className="text-[10px] sm:text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Core Operations</div>
      </div>
      <div className="absolute text-right" style={{ left: "62%", top: "24%" }}>
        <div className="text-xs sm:text-sm font-bold text-white">Dubai, UAE</div>
        <div className="text-[10px] sm:text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Headquarters (DIFC)</div>
      </div>
    </div>
  );
}

export default function Journey() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [active, setActive] = useState(0);
  const current = milestones[active];

  return (
    <div className="min-h-screen bg-white">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Journey" }]} />

      {/* ── Interactive map + year selector ── */}
      <section className="py-16 sm:py-20" style={{ background: "var(--eg-dark)" }}>
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <JourneyMap />
            <p className="mt-4 text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Headquartered in Dubai's DIFC, with core operations in Angola — part of a growing footprint
              across 5+ markets in Africa and Europe.
            </p>

            {/* Year selector */}
            <div className="relative mt-14 mb-10">
              <div
                className="absolute left-0 right-0 top-3.5 h-px"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />
              <div className="relative flex justify-between overflow-x-auto no-scrollbar gap-2">
                {milestones.map((m, i) => (
                  <button
                    key={m.year}
                    onClick={() => setActive(i)}
                    className="flex flex-col items-center gap-3 shrink-0 px-1 group"
                  >
                    <span
                      className="block w-3 h-3 rounded-full border-2 transition-all"
                      style={{
                        background: i === active ? "#02d49e" : "var(--eg-dark)",
                        borderColor: i === active ? "#02d49e" : "rgba(255,255,255,0.3)",
                        boxShadow: i === active ? "0 0 0 4px rgba(2,212,158,0.2)" : "none",
                      }}
                    />
                    <span
                      className="text-xs sm:text-sm font-bold transition-colors"
                      style={{ color: i === active ? "#ffffff" : "rgba(255,255,255,0.4)" }}
                    >
                      {m.year}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content panel */}
            <div
              className="rounded-sm p-6 sm:p-8"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4"
                style={{ background: "rgba(2,212,158,0.15)", color: "#02d49e" }}
              >
                {current.year}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
                {current.title}
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                {current.bullets.map((b, bi) => (
                  <p key={bi}>{b}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full timeline (scannable list, all years) ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="mb-10 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.35)" }}>
              The Full Story
            </p>
            <div className="flex flex-col">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="grid grid-cols-[auto_1fr] gap-6 py-6"
                  style={{ borderBottom: i === milestones.length - 1 ? "none" : "1px solid oklch(0.94 0.005 240)" }}
                >
                  <div
                    className="text-sm font-bold pt-0.5"
                    style={{ color: "var(--eg-cyan)", fontFamily: "Playfair Display, serif", minWidth: "3.5rem" }}
                  >
                    {m.year}
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-2" style={{ color: "var(--eg-dark)" }}>{m.title}</h3>
                    <div className="flex flex-col gap-2 text-sm leading-relaxed" style={{ color: "var(--eg-dark)" }}>
                      {m.bullets.map((b, bi) => (
                        <p key={bi}>{b}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
