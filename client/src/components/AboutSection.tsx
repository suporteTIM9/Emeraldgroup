import { useState, useEffect, useRef } from "react";
import ChairmanLetterModal from "./ChairmanLetterModal";

function CountUp({ value, color }: { value: string; color: string }) {
  const num = parseInt(value, 10);
  const suffix = value.replace(/\d/g, "");
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || completed) return;
    const DURATION = 2000;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setCount(Math.round(eased * num));
      if (t < 1) { raf = requestAnimationFrame(tick); return; }
      setCount(num);
      setCompleted(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, completed, num]);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-bold mb-2 transition-colors" style={{ fontFamily: "Playfair Display, serif", color }}>
      {count}{suffix}
    </div>
  );
}

const stats = [
  { value: "20+", label: "Portfolio Companies", desc: "Across six strategic sectors" },
  { value: "5+", label: "Countries", desc: "Active presence across Africa and Europe" },
  { value: "30+", label: "Years", desc: "Of business excellence and growth" },
  { value: "7", label: "Clusters", desc: "Diversified business verticals" },
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
              className="text-4xl lg:text-5xl font-bold mb-8"
              style={{ fontFamily: "Quantico, sans-serif", fontWeight: 700, lineHeight: "1.2", color: "#1e1f1e" }}
            >
              Creating Global Business Platforms with Purpose
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 500, lineHeight: "1.5", color: "#1e1f1f" }}>
              Emerald Group is a diversified holding company that invests in and develops strategic business
              platforms across key sectors of the economy. Our portfolio spans banking and financial services,
              construction, infrastructure, natural resources, technology, media, and real estate.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 500, lineHeight: "1.5", color: "#1e1f1f" }}>
              Our efforts are guided by a commitment to delivering meaningful value and impact across the
              markets in which we operate — developing world-class enterprises, enhancing economic resilience,
              and creating positive, lasting impact for communities and stakeholders alike.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="neon-btn"
            >
              Chairman &amp; CEO
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
                  <CountUp
                    value={stat.value}
                    color={i % 2 === 0 ? "oklch(0.50 0.17 155)" : "oklch(0.75 0.12 80)"}
                  />
                  <div className="text-sm font-semibold text-gray-800 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-400">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ChairmanLetterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
