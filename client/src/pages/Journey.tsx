import { useEffect } from "react";
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
        <div className="text-[10px] sm:text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Headquarters</div>
      </div>
    </div>
  );
}

export default function Journey() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Journey" }]} />

      {/* ── Map ── */}
      <section className="py-16 sm:py-20" style={{ background: "var(--eg-dark)" }}>
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <JourneyMap />
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
