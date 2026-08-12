import { useEffect, useRef } from "react";
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
          <div className="mx-auto max-w-6xl">
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
