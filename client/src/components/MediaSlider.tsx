import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface SlideItem {
  type: "image" | "video";
  src: string;
  href: string;
  caption?: string;
}

const slides: SlideItem[] = [
  { type: "video", src: "/videos/banner_video.mp4",       href: "#about",                                caption: "Emerald Group" },
  { type: "image", src: "/imagens/banner_01.jpg",         href: "#clusters",                             caption: "Our Business Clusters" },
  { type: "image", src: "/IMGBLOG/Millennium-Angola.png", href: "/blog/banco-millennium-atlantico-2024", caption: "Banco Millennium Atlântico" },
  { type: "image", src: "/imagens/banner_02.jpg",         href: "#journey",                              caption: "Our Journey" },
  { type: "image", src: "/imagens/banner_03.jpg",         href: "#contact",                              caption: "Get in Touch" },
];

/* triple for seamless infinite loop in both directions */
const loopSlides = [...slides, ...slides, ...slides];

const css = `
  .ms-track::-webkit-scrollbar { display: none; }
  .ms-track { -ms-overflow-style: none; scrollbar-width: none; }

  .ms-slide {
    flex-shrink: 0;
    aspect-ratio: 1 / 1;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    position: relative;
    /* mobile: 1 visible + hint — (100% - 1 gap) / 1.3 */
    width: calc(78% - 6px);
    transition: opacity 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
  }
  @media (min-width: 480px) {
    /* large mobile: 2 visible — (100% - 1×12px) / 2 */
    .ms-slide { width: calc(50% - 6px); }
  }
  @media (min-width: 768px) {
    /* tablet: 3 visible — (100% - 2×12px) / 3 */
    .ms-slide { width: calc(33.333% - 8px); }
  }
  @media (min-width: 1024px) {
    /* desktop: 5 visible — (100% - 4×12px) / 5 */
    .ms-slide { width: calc(20% - 9.6px); }
  }

  .ms-track:has(.ms-slide:hover) .ms-slide:not(:hover) {
    opacity: 0.5;
    transform: scale(0.96);
  }
  .ms-slide:hover {
    opacity: 1 !important;
    transform: scale(1.04) !important;
    box-shadow: 0 14px 36px rgba(0,0,0,0.2);
    z-index: 2;
  }
  .ms-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.65) 100%);
    opacity: 0;
    transition: opacity 0.35s;
    pointer-events: none;
  }
  .ms-slide:hover .ms-overlay { opacity: 1; }
  .ms-caption {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 10px 12px;
    color: #fff;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.35s, transform 0.35s;
    z-index: 2;
    pointer-events: none;
  }
  .ms-slide:hover .ms-caption { opacity: 1; transform: translateY(0); }
`;

export default function MediaSlider() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const pausedRef   = useRef(false);
  const draggingRef = useRef(false);
  const rafRef      = useRef<number | null>(null);

  /* initialise scroll to the middle set so both directions loop */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    /* wait one frame for layout */
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / 3;
    });
  }, []);

  /* continuous RAF scroll */
  useEffect(() => {
    const tick = () => {
      const el = trackRef.current;
      if (el && !pausedRef.current && !draggingRef.current) {
        el.scrollLeft += 0.5;
        const third = el.scrollWidth / 3;
        /* jumped past second set → reset to start of second set */
        if (el.scrollLeft >= third * 2) el.scrollLeft -= third;
        /* went before second set → reset to end of second set */
        if (el.scrollLeft < third)      el.scrollLeft += third;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const scrollManual = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    const w     = slide ? slide.offsetWidth + 12 : 200;
    const third = el.scrollWidth / 3;
    let next = el.scrollLeft + (dir === "right" ? w : -w);
    if (next >= third * 2) next -= third;
    if (next < third)      next += third;
    el.scrollLeft = next;
  };

  const handleClick = (href: string) => {
    if (draggingRef.current) return;
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    const el      = e.currentTarget;
    const startX  = e.pageX;
    const startSL = el.scrollLeft;
    el.style.cursor = "grabbing";
    const third = el.scrollWidth / 3;

    const onMove = (ev: MouseEvent) => {
      let s = startSL - (ev.pageX - startX);
      if (s >= third * 2) s -= third;
      if (s < third)      s += third;
      el.scrollLeft = s;
    };
    const onUp = () => {
      draggingRef.current = false;
      el.style.cursor = "default";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
  };

  return (
    <section className="py-32 lg:py-44 bg-white">
      <style>{css}</style>

      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-4">
            <span className="section-label">05 — Media</span>
            <div className="h-px w-12" style={{ background: "var(--eg-cyan)" }} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollManual("left")}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#02d49e] hover:text-[#02d49e] transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollManual("right")}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#02d49e] hover:text-[#02d49e] transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Slider — constrained to container */}
        <div
          ref={trackRef}
          className="ms-track flex gap-3 overflow-x-hidden"
          style={{ paddingBottom: "10px", marginBottom: "-10px" }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          onMouseDown={onMouseDown}
        >
          {loopSlides.map((slide, i) => (
            <div
              key={i}
              data-slide
              className="ms-slide"
              onClick={() => handleClick(slide.href)}
            >
              {slide.type === "video" ? (
                <video
                  src={slide.src}
                  muted loop playsInline autoPlay
                  className="w-full h-full object-cover"
                  style={{ pointerEvents: "none" }}
                />
              ) : (
                <img
                  src={slide.src}
                  alt={slide.caption ?? ""}
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

              {slide.caption && (
                <span className="ms-caption">{slide.caption}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
