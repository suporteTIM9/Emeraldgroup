import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ChairmanLetterModal from "./ChairmanLetterModal";

const stats = [
  { value: "20+", label: "Portfolio Companies", desc: "Across six strategic sectors" },
  { value: "5+", label: "Countries", desc: "Active presence across Africa and Europe" },
  { value: "30+", label: "Years", desc: "Of business excellence and growth" },
  { value: "6", label: "Clusters", desc: "Diversified business verticals" },
];

export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="container">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">01 — About Us</span>
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--eg-cyan)" }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text content */}
          <div>
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight mb-8"
              style={{ color: "var(--eg-dark)" }}
            >
              Creating Global Business Platforms with Purpose
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              Emerald Group is a diversified holding company that invests in and develops strategic business
              platforms across key sectors of the economy. Our portfolio spans banking and financial services,
              construction, infrastructure, natural resources, technology, media, and real estate.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mb-10">
              Our efforts are guided by a commitment to delivering meaningful value and impact across the
              markets in which we operate — developing world-class enterprises, enhancing economic resilience,
              and creating positive, lasting impact for communities and stakeholders alike.
            </p>

            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div
                className="p-5 rounded-sm border-l-[1.5px] bg-white/90 shadow-[0_0_0_1px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(15,23,42,0.08),0_12px_30px_rgba(15,23,42,0.08)]"
                style={{ borderColor: "color-mix(in srgb, var(--eg-cyan) 55%, rgba(255,255,255,0.85))" }}
              >
                <h4 className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--eg-cyan)" }}>
                  Our Mission
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To build enduring business platforms that generate sustainable value and drive economic
                  transformation across Africa and global markets.
                </p>
              </div>
              <div
                className="p-5 rounded-sm border-l-[1.5px] bg-white/90 shadow-[0_0_0_1px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(15,23,42,0.08),0_12px_30px_rgba(15,23,42,0.08)]"
                style={{ borderColor: "color-mix(in srgb, var(--eg-orange) 55%, rgba(255,255,255,0.85))" }}
              >
                <h4 className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--eg-orange)" }}>
                  Our Vision
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To be the premier diversified investment group in Africa, recognised for excellence,
                  integrity, and purposeful impact.
                </p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
              style={{ color: "var(--eg-cyan)" }}
            >
              Read More
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right: Stats grid */}
          <div>
            <div className="grid grid-cols-2 gap-px bg-gray-100 rounded-sm overflow-hidden">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-8 group hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="text-4xl lg:text-5xl font-bold mb-2 transition-colors"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      color: i % 2 === 0 ? "oklch(0.50 0.17 155)" : "oklch(0.75 0.12 80)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-800 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-400">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* Visual accent block */}
            <div
              className="mt-6 p-6 rounded-sm text-white"
              style={{
                background: `linear-gradient(135deg, oklch(0.10 0.02 165) 0%, oklch(0.33 0.14 158) 100%)`,
              }}
            >
              <p className="text-xs tracking-widest uppercase opacity-80 mb-3 text-white">
                Headquarters
              </p>
              <p className="text-sm font-medium leading-relaxed opacity-90">
                Emerald Group operates from its principal offices with a presence across multiple African
                markets and international financial centres.
              </p>
              <a
                href="https://emeraldgroup-inc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-[0.98] active:bg-white/15"
              >
                <span>Emeraldgroup-inc</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 text-white/60 transition-all duration-200 group-hover:text-white group-hover:-rotate-90"
                >
                  <path d="M12 5v14" />
                  <path d="m6 11 6-6 6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ChairmanLetterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
