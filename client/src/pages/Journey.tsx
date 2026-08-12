import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { chapters, milestones } from "@/data/journey";

export default function Journey() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Journey" }]} />

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, oklch(0.10 0.02 165) 0%, oklch(0.20 0.10 155) 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        />
        <div className="container relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "#02d49e" }}>
              Our Journey
            </p>
            <h1
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              From a Bold Idea to a Global Platform
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full" style={{ background: "#02d49e" }} />
            <p className="mt-6 max-w-xl text-sm sm:text-base leading-7 sm:leading-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              Since 2008, Emerald Group has grown from a single advisory mandate into a diversified
              platform spanning seven business clusters across Africa and beyond. This is the story of
              how we got here — and where we're going next.
            </p>
          </div>

          {/* Chapter quick-nav */}
          <div className="mx-auto max-w-3xl mt-10 flex flex-wrap gap-3">
            {chapters.map((c) => (
              <a
                key={c.numeral}
                href={`#chapter-${c.numeral}`}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors hover:border-white/40"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)" }}
              >
                <span style={{ color: c.accent }}>{c.numeral}</span> {c.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chapters ── */}
      {chapters.map((chapter, ci) => {
        const chapterMilestones = milestones.filter((m) => chapter.years.includes(m.year));
        return (
          <section
            key={chapter.numeral}
            id={`chapter-${chapter.numeral}`}
            className="py-16 sm:py-20"
            style={{ background: ci % 2 === 0 ? "#ffffff" : `color-mix(in srgb, ${chapter.accent} 4%, white)` }}
          >
            <div className="container">
              <div className="mx-auto max-w-5xl">
                <div className="flex items-start gap-5 mb-10">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm text-xl font-bold"
                    style={{ background: chapter.accent, color: "#ffffff", fontFamily: "Playfair Display, serif" }}
                  >
                    {chapter.numeral}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: chapter.accent }}>
                      {chapter.era}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--eg-dark)" }}>
                      {chapter.title}
                    </h2>
                    <p className="mt-1 text-sm sm:text-base" style={{ color: "var(--eg-dark)" }}>
                      {chapter.tagline}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:pl-[76px]">
                  {chapterMilestones.map((m) => (
                    <div
                      key={m.year}
                      className="rounded-sm border-l-[3px] p-6"
                      style={{ borderColor: chapter.accent, background: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                    >
                      <div
                        className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-3"
                        style={{ background: `color-mix(in srgb, ${chapter.accent} 12%, white)`, color: chapter.accent }}
                      >
                        {m.year}
                      </div>
                      <h3 className="text-base font-bold mb-3" style={{ color: "var(--eg-dark)" }}>
                        {m.title}
                      </h3>
                      <div className="flex flex-col gap-2.5 text-sm leading-relaxed" style={{ color: "var(--eg-dark)" }}>
                        {m.bullets.map((b, bi) => (
                          <p key={bi}>{b}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

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
