import { useEffect, useRef } from "react";

const milestones = [
  {
    year: "1990s",
    title: "Foundation",
    desc: "Emerald Group is established with a vision to build a diversified business empire across Africa and beyond.",
  },
  {
    year: "2000s",
    title: "Financial Services Expansion",
    desc: "Entry into banking and financial services, establishing key partnerships and acquiring strategic stakes in leading African financial institutions.",
  },
  {
    year: "2008",
    title: "Media & Technology",
    desc: "Launch of media operations, bringing world-class business journalism to African audiences through strategic media partnerships.",
  },
  {
    year: "2012",
    title: "Infrastructure Push",
    desc: "Emerald Infrastructure is established to develop critical infrastructure assets across Sub-Saharan Africa.",
  },
  {
    year: "2015",
    title: "Natural Resources",
    desc: "Entry into the natural resources sector with Emerald Global Resources and Nino Oil, diversifying the group's energy portfolio.",
  },
  {
    year: "2018",
    title: "Urban Development",
    desc: "Launch of ONE Luanda and ONE Hotéis, redefining premium urban living and hospitality in Angola.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    desc: "Accelerated digital strategy across all clusters, including the launch of Banko and expansion of Emerald Telecom's digital services.",
  },
  {
    year: "Today",
    title: "Global Reach",
    desc: "Emerald Group operates across 5+ countries with 20+ portfolio companies, continuing to build purposeful global business platforms.",
  },
];

export default function JourneySection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Scroll-driven progress line ── */
  useEffect(() => {
    const update = () => {
      const tl   = timelineRef.current;
      const prog = progressRef.current;
      if (!tl || !prog) return;
      const rect = tl.getBoundingClientRect();
      const vh   = window.innerHeight;
      const pct  = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh * 0.2)));
      prog.style.height = `${pct * 100}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* ── Dots light up on scroll ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("dot-lit");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );
    dotRefs.current.forEach((d) => d && observer.observe(d));
    return () => observer.disconnect();
  }, []);

  /* ── Milestone blocks cascade in on scroll ── */
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current?.querySelectorAll(".milestone-block, .js-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey" className="py-24 lg:py-32 bg-white overflow-hidden">
      <style>{`
        /* Section header reveal */
        .js-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .js-reveal.in-view { opacity: 1; transform: translateY(0); }

        /* Milestone cascade — children start hidden */
        .milestone-block .r-badge,
        .milestone-block .r-title,
        .milestone-block .r-desc {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        /* When parent enters view, children cascade */
        .milestone-block.in-view .r-badge { opacity: 1; transform: translateY(0); transition-delay: 0s; }
        .milestone-block.in-view .r-title { opacity: 1; transform: translateY(0); transition-delay: 0.13s; }
        .milestone-block.in-view .r-desc  { opacity: 1; transform: translateY(0); transition-delay: 0.26s; }

        /* Dot states */
        .timeline-dot {
          transition: background 0.5s ease,
                      transform 0.5s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.5s ease;
        }
        .dot-lit {
          background: #02f9ba !important;
          transform: scale(1.5) !important;
          box-shadow: 0 0 0 5px rgba(2,249,186,0.18), 0 0 14px rgba(2,249,186,0.45) !important;
        }

        /* Today — pulsing rings */
        @keyframes live-ring {
          0%  { transform: scale(1); opacity: 0.75; }
          70% { transform: scale(3); opacity: 0; }
          100%{ transform: scale(1); opacity: 0; }
        }
        .live-dot {
          position: relative;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #02f9ba;
          flex-shrink: 0;
        }
        .live-dot::before, .live-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #02f9ba;
          animation: live-ring 1.8s ease-out infinite;
        }
        .live-dot::after { animation-delay: 0.65s; }
      `}</style>

      <div className="container" ref={sectionRef}>
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label">02 — Journey</span>
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--eg-cyan)" }} />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <h2
            className="js-reveal text-4xl lg:text-5xl font-bold leading-tight max-w-xl"
            style={{ color: "var(--eg-dark)" }}
          >
            Charting Emerald Group's Journey
          </h2>
          <p
            className="js-reveal text-sm text-gray-500 max-w-sm leading-relaxed"
            style={{ transitionDelay: "0.15s" }}
          >
            From our founding to today, our journey reflects a commitment to building enduring businesses
            that create value across generations.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>

          {/* Track (background line) */}
          <div
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "oklch(0.92 0.005 240)" }}
          />

          {/* Progress line — draws itself as you scroll */}
          <div
            className="absolute left-4 lg:left-1/2 top-0 w-px -translate-x-1/2 origin-top"
            ref={progressRef}
            style={{
              height: "0%",
              background: "linear-gradient(180deg, #02f9ba 0%, #02d49e 60%, oklch(0.75 0.12 80) 100%)",
              boxShadow: "0 0 8px rgba(2,249,186,0.5)",
              transition: "height 0.1s linear",
            }}
          />

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0;
              const isLast = i === milestones.length - 1;
              return (
                <div
                  key={i}
                  className={`milestone-block relative flex items-start gap-8 pb-12 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-12 lg:pl-0 ${isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>

                    {/* Year badge */}
                    <div className="r-badge">
                      {isLast ? (
                        <div
                          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
                          style={{
                            background: "rgba(2,249,186,0.12)",
                            border: "1.5px solid #02f9ba",
                            boxShadow: "0 0 12px rgba(2,249,186,0.3)",
                          }}
                        >
                          <span className="live-dot" />
                          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#02f9ba" }}>
                            Today
                          </span>
                          <span
                            className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full"
                            style={{ background: "#02f9ba", color: "#1e1f1f" }}
                          >
                            2026
                          </span>
                        </div>
                      ) : (
                        <div
                          className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-3"
                          style={{ background: "oklch(0.95 0.008 200)", color: "var(--eg-cyan)" }}
                        >
                          {m.year}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="r-title text-lg font-bold mb-2" style={{ color: "var(--eg-dark)" }}>
                      {m.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="r-desc text-sm text-gray-500 leading-relaxed"
                      style={{
                        maxWidth: "260px",
                        display: "block",
                        marginLeft: isEven ? "auto" : undefined,
                      }}
                    >
                      {m.desc}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 lg:left-1/2 top-1.5 -translate-x-1/2 z-10">
                    <div
                      ref={(el) => { dotRefs.current[i] = el; }}
                      className="timeline-dot w-4 h-4 rounded-full border-2 border-white"
                      style={{
                        background: "oklch(0.85 0.005 240)",
                        boxShadow: "none",
                        transform: "scale(1)",
                      }}
                    />
                  </div>

                  {/* Empty side on desktop */}
                  <div className="hidden lg:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
