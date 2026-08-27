import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";

interface SlideItem {
  type: "image" | "video";
  src: string;
  href?: string;
  caption?: string;
}

interface EventHighlight {
  brand: string;
  title: string;
  desc: string;
  href?: string;
}

const eventHighlights: EventHighlight[] = [
  { brand: "Jornal Económico & Forbes África Lusófona", title: "Doing Business Angola", desc: "The event will continue to bring together participants from different geographies and investment profiles, establishing itself as a leading platform for knowledge sharing, partnership building and the generation of new business opportunities.", href: "https://doingbusinessangola.com/" },
  { brand: "Forbes África Lusófona", title: "Forbes Social Responsibility Awards", desc: "The goal of the Forbes Social Responsibility Awards Angola is to contribute to the maintenance of peace, the development of the economy, and the building of a prosperous future.", href: "https://forbesprs.com/evento/premios-forbes-responsabilidade-social-2026" },
  { brand: "Forbes África Lusófona", title: "Forbes África Lusófona Annual Summit", desc: "The event aims to foster the exchange of ideas and the creation of concrete solutions for the challenges facing the global and regional economy. More than a space for debate, it will be a platform for strategic action, where bridges are built, networks strengthened, and paths drawn towards a more inclusive, resilient and prosperous future.", href: "https://forbesafricalusofona.com/annual-summit-2026-regressa-a-luanda-a-15-de-outubro/" },
  { brand: "Jornal Económico", title: "Banking Forum", desc: "The event stands out as one of the leading stages for reflection and decision-making on the future of banking amid rapid technological, regulatory and geopolitical transformation.", href: "https://jornaleconomico.sapo.pt/forum-banca-2026/" },
  { brand: "Forbes Africa", title: "Forbes Africa Day", desc: "Forbes Africa Day is a day hosted by Forbes Lusophone Africa, in collaboration between Forbes Africa and Forbes Afrique, in partnership with Forbes United States, to create a unique and powerful business experience.", href: "https://www.forbesafrica.com/" },
];

const slides: SlideItem[] = [
  { type: "image", src: "/imagens/evento_01_Doing_Business_Angola_2026.jpeg" },
  { type: "image", src: "/imagens/evento_02_Doing_Business_Angola_2026.jpeg" },
  { type: "image", src: "/imagens/evento_03.jpeg" },
  { type: "image", src: "/imagens/evento_04_The_Chairmans_Talk.jpeg" },
  { type: "image", src: "/imagens/evento_05_Forbes_Women_Summit.jpeg" },
  { type: "image", src: "/imagens/evento_06_Forum_Banca_2026_Ngunu_Tiny.png" },
  { type: "image", src: "/imagens/evento_07_Ngunu_Tiny_PRS_2026.jpeg" },
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
    animation: ms-scroll 55s linear infinite;
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

  /* ── Event cards carousel ── */
  .eh-track {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    padding-bottom: 4px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .eh-track::-webkit-scrollbar { display: none; }

  .eh-card {
    flex: 0 0 auto;
    scroll-snap-align: start;
    width: calc(100% - 40px);
  }
  @media (min-width: 640px)  { .eh-card { width: calc(50% - 10px); } }
  @media (min-width: 1024px) { .eh-card { width: calc(33.333% - 14px); } }
  @media (min-width: 1400px) { .eh-card { width: calc(25% - 15px); } }

  .eh-arrow {
    width: 40px; height: 40px;
    border-radius: 999px;
    display: flex; align-items: center; justify-content: center;
    background: #fff;
    border: 1px solid oklch(0.92 0.005 240);
    box-shadow: 0 4px 14px rgba(0,0,0,0.08);
    color: var(--eg-dark);
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    cursor: pointer;
  }
  .eh-arrow:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.14); }
  .eh-arrow:disabled { opacity: 0.35; cursor: default; transform: none; box-shadow: none; }
`;

export default function MediaSlider() {
  const isDragging = useRef(false);
  const innerRef   = useRef<HTMLDivElement>(null);
  const eventsTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxSrc(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxSrc]);

  const updateEventsArrows = () => {
    const el = eventsTrackRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 24);
  };

  useEffect(() => {
    updateEventsArrows();
    const el = eventsTrackRef.current;
    if (!el) return;
    const onResize = () => updateEventsArrows();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollEvents = (dir: 1 | -1) => {
    const el = eventsTrackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".eh-card");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const handleClick = (slide: SlideItem) => {
    if (isDragging.current) return;
    if (slide.href) {
      if (slide.href.startsWith("#")) {
        const el = document.querySelector(slide.href);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
      } else {
        window.location.href = slide.href;
      }
    } else if (slide.type === "image") {
      setLightboxSrc(slide.src);
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
          <div className="flex items-end justify-between gap-6 lg:justify-end lg:gap-8 w-full lg:w-auto">
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: "var(--eg-dark)" }}>
              From investor summits to industry forums, our portfolio companies convene the leaders
              shaping their sectors.
            </p>
            <div className="flex gap-2 shrink-0">
              <button type="button" className="eh-arrow" aria-label="Previous event" disabled={!canScrollPrev} onClick={() => scrollEvents(-1)}>
                <ChevronLeft size={18} />
              </button>
              <button type="button" className="eh-arrow" aria-label="Next event" disabled={!canScrollNext} onClick={() => scrollEvents(1)}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="eh-track" ref={eventsTrackRef} onScroll={updateEventsArrows}>
          {eventHighlights.map((event, i) => (
            <div
              key={i}
              className="eh-card group flex flex-col rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)]"
              style={{ background: "oklch(0.99 0.002 240)" }}
            >
              {/* Dark header strip — brand */}
              <div
                className="px-5 py-3"
                style={{ background: `linear-gradient(120deg, #14251f 0%, #0d3b30 60%, #02866a 100%)` }}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#02f9ba" }}>
                  {event.brand}
                </div>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h3
                  className="text-base font-bold mb-2 leading-snug"
                  style={{ color: "var(--eg-dark)", fontFamily: "Playfair Display, serif" }}
                >
                  {event.title}
                </h3>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--eg-dark)" }}>{event.desc}</p>
                {event.href && (
                  <a
                    href={event.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-1.5 self-start rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-all group-hover:gap-2.5"
                    style={{ background: "var(--eg-cyan)" }}
                  >
                    Explore Event
                    <ArrowRight size={12} />
                  </a>
                )}
              </div>
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
              onClick={() => handleClick(slide)}
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

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightboxSrc(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxSrc(null)}
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.4)" }}
          >
            ✕
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="max-h-[88vh] max-w-[92vw] rounded-sm object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
