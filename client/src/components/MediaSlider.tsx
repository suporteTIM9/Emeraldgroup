import { useRef } from "react";
import { Play } from "lucide-react";

interface SlideItem {
  type: "image" | "video";
  src: string;
  href: string;
  caption?: string;
}

interface EventHighlight {
  brand: string;
  title: string;
  desc: string;
}

// ── TODO: substituir title/desc por eventos reais (a marca já está definida) ──
const eventHighlights: EventHighlight[] = [
  { brand: "Jornal Económico & Forbes África Lusófona", title: "Doing Business Angola 2026", desc: "A edição de 2026 do Doing Business Angola dará continuidade à análise dos principais setores da economia angolana, com foco na identificação de oportunidades de investimento e no reforço do diálogo entre investidores internacionais e o mercado angolano." },
  { brand: "Forbes África Lusófona", title: "Event Title Here", desc: "Placeholder description — replace with real event details, date and location." },
  { brand: "Forbes Portugal", title: "Event Title Here", desc: "Placeholder description — replace with real event details, date and location." },
  { brand: "Jornal Económico", title: "Event Title Here", desc: "Placeholder description — replace with real event details, date and location." },
];

const slides: SlideItem[] = [
  { type: "video", src: "/videos/banner_video.mp4",       href: "#about",                                caption: "Emerald Group" },
  { type: "image", src: "/imagens/banner_01.jpg",         href: "#clusters",                             caption: "Our Business Clusters" },
  { type: "image", src: "/IMGBLOG/Millennium-Angola.png", href: "/blog/banco-millennium-atlantico-2024", caption: "Banco Millennium Atlântico" },
  { type: "image", src: "/imagens/banner_02.jpg",         href: "#journey",                              caption: "Our Journey" },
  { type: "image", src: "/imagens/banner_03.jpg",         href: "#contact",                              caption: "Get in Touch" },
];

/* 2 copies — animation translates -50% = exactly one set width */
const loopSlides = [...slides, ...slides];

const css = `
  @keyframes ms-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .ms-wrapper {
    overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
    mask-image:         linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
  }

  .ms-inner {
    display: flex;
    gap: 12px;
    width: max-content;
    animation: ms-scroll 28s linear infinite;
    will-change: transform;
  }

  /* pause on hover — native CSS, zero JS */
  .ms-wrapper:hover .ms-inner { animation-play-state: paused; }

  .ms-slide {
    flex-shrink: 0;
    aspect-ratio: 4 / 3;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    width: 220px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;
  }
  @media (min-width: 480px)  { .ms-slide { width: 240px; } }
  @media (min-width: 768px)  { .ms-slide { width: 260px; } }
  @media (min-width: 1024px) { .ms-slide { width: 280px; } }

  .ms-slide:hover {
    transform: scale(1.04);
    box-shadow: 0 14px 36px rgba(0,0,0,0.22);
    z-index: 2;
  }

  .ms-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.65) 100%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .ms-slide:hover .ms-overlay { opacity: 1; }

  .ms-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 10px 12px;
    color: #fff;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.04em;
    opacity: 0; transform: translateY(6px);
    transition: opacity 0.3s, transform 0.3s;
    z-index: 2; pointer-events: none;
    font-family: 'Nunito Sans', sans-serif;
  }
  .ms-slide:hover .ms-caption { opacity: 1; transform: translateY(0); }
`;

export default function MediaSlider() {
  const isDragging = useRef(false);
  const innerRef   = useRef<HTMLDivElement>(null);

  const handleClick = (href: string) => {
    if (isDragging.current) return;
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-white">
      <style>{css}</style>

      <div className="container mb-10">
        <div className="flex items-center gap-4">
          <span className="section-label">06 — Our Signature Events &amp; Partners</span>
          <div className="h-px w-12" style={{ background: "var(--eg-cyan)" }} />
        </div>
      </div>

      {/* Top half — highlight cards */}
      <div className="container mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <h2
            className="text-3xl lg:text-4xl font-bold leading-tight max-w-xl"
            style={{ color: "var(--eg-dark)" }}
          >
            High-Impact Gatherings Across Our Brands
          </h2>
          <p className="text-sm max-w-sm leading-relaxed" style={{ color: "var(--eg-dark)" }}>
            From investor summits to industry forums, our portfolio companies convene the leaders
            shaping their sectors.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {eventHighlights.map((event, i) => (
            <div
              key={i}
              className="p-5 rounded-sm border-l-[1.5px]"
              style={{ borderColor: "oklch(0.92 0.005 240)", borderLeftColor: "var(--eg-cyan)", background: "oklch(0.99 0.002 240)" }}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--eg-cyan)" }}>
                {event.brand}
              </div>
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--eg-dark)" }}>{event.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--eg-dark)" }}>{event.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom half — pictures from those events */}
      <div className="container mb-4">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.35)" }}>
          Moments From Our Events
        </p>
      </div>

      <div className="container">
      <div className="ms-wrapper">
        <div ref={innerRef} className="ms-inner">
          {loopSlides.map((slide, i) => (
            <div
              key={i}
              className="ms-slide"
              onClick={() => handleClick(slide.href)}
            >
              {slide.type === "video" ? (
                <video
                  src={slide.src}
                  muted loop playsInline autoPlay
                  preload="none"
                  className="w-full h-full object-cover"
                  style={{ pointerEvents: "none" }}
                />
              ) : (
                <img
                  src={slide.src}
                  alt={slide.caption ?? ""}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              )}

              {slide.type === "video" && (
                <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center">
                  <Play size={10} fill="white" color="white" />
                </div>
              )}
              <div className="ms-overlay" />
              {slide.caption && <span className="ms-caption">{slide.caption}</span>}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
