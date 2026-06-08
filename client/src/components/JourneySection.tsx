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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("js-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = sectionRef.current?.querySelectorAll(".js-reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey" className="py-24 lg:py-32 bg-white overflow-hidden">
      <style>{`
        .js-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .js-visible {
          opacity: 1;
          transform: translateY(0);
        }
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
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, var(--eg-cyan), var(--eg-orange), var(--eg-cyan))", opacity: 0.3 }}
          />

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0;
              const isLast = i === milestones.length - 1;
              return (
                <div
                  key={i}
                  className={`js-reveal relative flex items-start gap-8 pb-10 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  style={{ transitionDelay: "0s" }}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-12 lg:pl-0 ${isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <div
                      className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-3"
                      style={{
                        background: isLast ? "var(--eg-cyan)" : "oklch(0.95 0.008 200)",
                        color: isLast ? "white" : "var(--eg-cyan)",
                      }}
                    >
                      {m.year}
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "var(--eg-dark)" }}>
                      {m.title}
                    </h3>
                    <p
                      className="text-sm text-gray-500 leading-relaxed"
                      style={{ maxWidth: "260px", display: "block", marginLeft: isEven ? "auto" : undefined }}
                    >
                      {m.desc}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 lg:left-1/2 top-1 -translate-x-1/2 flex items-center justify-center">
                    <div
                      className="w-3 h-3 rounded-full border-2 border-white"
                      style={{ background: i % 3 === 0 ? "var(--eg-cyan)" : i % 3 === 1 ? "var(--eg-orange)" : "var(--eg-gray, oklch(0.52 0.02 240))" }}
                    />
                  </div>

                  {/* Empty side for desktop alternating layout */}
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
