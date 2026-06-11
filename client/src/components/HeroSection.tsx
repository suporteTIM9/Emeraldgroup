import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

type BackgroundSlide =
  | { type: "video"; src: string; poster?: string; duration: number }
  | { type: "images"; images: { src: string; alt: string }[]; duration: number };

const slides: BackgroundSlide[] = [
  {
    type: "video",
    src: "/videos/banner_video.mp4",
    poster: "/imagens/banner_01.jpg",
    duration: 12000,
  },
  {
    type: "images",
    images: [
      { src: "/imagens/banner_01.jpg", alt: "Emerald Group infrastructure" },
      { src: "/imagens/banner_02.jpg", alt: "Emerald Group business portfolio" },
      { src: "/imagens/banner_03.jpg", alt: "Emerald Group global reach" },
    ],
    duration: 14000,
  },
];

const heroContent = [
  {
    label: "01 — Our Purpose",
    heading: "Creating Markets With Purpose",
    sub: "Emerald Group invests in and develops diversified business platforms across Africa and beyond, creating long-term value through purposeful growth.",
    cta1: "Who We Are",     cta1Href: "#about",
    cta2: "Explore Our Business", cta2Href: "#clusters",
  },
  {
    label: "02 — Our Reach",
    heading: "Seven Sectors. One Vision. Endless Potential.",
    sub: "From banking to natural resources, from infrastructure to media — our portfolio spans the industries that shape economies and transform lives.",
    cta1: "Explore Our Business", cta1Href: "#clusters",
    cta2: "Who We Are",           cta2Href: "#about",
  },
];

const latestItems = [
  "Emerald Group expands infrastructure portfolio in Sub-Saharan Africa",
  "Forbes Africa celebrates 15 years of business journalism",
  "Banco Millennium Atlântico reports record growth in 2024",
];

// ── Animated Split Text ───────────────────────────────────────────────────────

function SplitText({ text, animate }: { text: string; animate: boolean }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, [text]);

  const on = animate && ready;
  const words = text.split(" ");

  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.26em" }}>
          <span style={{
            display: "inline-block",
            transform: on ? "translateY(0) skewY(0deg)" : "translateY(110%) skewY(3deg)",
            opacity: on ? 1 : 0,
            transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.09}s, opacity 0.6s ease ${0.05 + i * 0.09}s`,
          }}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

// ── Border Button ─────────────────────────────────────────────────────────────

function BorderButton({ onClick, children, primary }: { onClick: () => void; children: ReactNode; primary?: boolean }) {
  const [hovered, setHovered] = useState(false);

  const seg = (horiz: boolean, eO: string, xO: string, d: number, extra: CSSProperties): CSSProperties => ({
    position: "absolute",
    background: "rgba(255,255,255,0.88)",
    transform: hovered ? (horiz ? "scaleX(1)" : "scaleY(1)") : horiz ? "scaleX(0)" : "scaleY(0)",
    transformOrigin: hovered ? eO : xO,
    transition: hovered ? `transform 0.22s ease ${d}s` : "transform 0.16s ease 0s",
    ...extra,
  });

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-6 py-3 text-sm font-semibold overflow-hidden"
      style={{ background: primary ? "var(--eg-cyan)" : "transparent", color: "white", border: primary ? "none" : "1px solid rgba(255,255,255,0.3)", borderRadius: "50px" }}
    >
      <span style={seg(true,  "left",   "right",  0,    { top: 0, left: 0, right: 0,  height: "1.5px" })} />
      <span style={seg(false, "top",    "bottom", 0.08, { top: 0, right: 0, bottom: 0, width: "1.5px" })} />
      <span style={seg(true,  "right",  "left",   0.16, { bottom: 0, left: 0, right: 0, height: "1.5px" })} />
      <span style={seg(false, "bottom", "top",    0.24, { top: 0, left: 0, bottom: 0, width: "1.5px" })} />
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  );
}

// ── Three-Panel Slice Section ────────────────────────────────────────────────
// 3 panels side-by-side. Entry: slices fly IN (left panel first, L→R stagger).
// Exit: slices fly OUT (right panel first, R→L stagger).
// Double-rAF entry ensures the browser paints the off-screen reset before the
// entry transition starts — same reliable pattern used in SplitText.

function ThreePanelSliceSection({
  images,
  animate,
}: {
  images: { src: string; alt: string }[];
  animate: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const hasPlayed = useRef(false);

  const SLICES        = 12;
  const SLICE_ANIM_MS = 900;   // each slice travel duration
  const SLICE_STAGGER = 55;    // delay between consecutive slices
  const PANEL_STAGGER = 130;   // extra delay per panel (left → right on entry)

  useEffect(() => {
    let raf1: number, raf2: number;

    if (animate) {
      hasPlayed.current = true;
      // 1. Snap slices off-screen instantly (no transition)
      setExiting(false);
      setVisible(false);
      // 2. Two rAFs: first lets React commit the off-screen state to the DOM,
      //    second triggers the entry transition once the browser has painted it.
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
    } else if (hasPlayed.current) {
      // Exit: animate slices away (right panel first)
      setExiting(true);
      setVisible(false);
    }
    // First mount with animate=false: stay off-screen silently

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [animate]);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex" }}>
      {images.map((image, panelIdx) => (
        <div
          key={panelIdx}
          style={{ flex: 1, position: "relative", overflow: "hidden" }}
        >
          {Array.from({ length: SLICES }).map((_, i) => {
            const dir = i % 2 === 0 ? -1 : 1; // alternating: up / down

            // Entry: left panel first, slices left → right
            const entryDelay = panelIdx * PANEL_STAGGER + i * SLICE_STAGGER;
            // Exit: right panel first, slices right → left
            const exitDelay = (images.length - 1 - panelIdx) * PANEL_STAGGER
                            + (SLICES - 1 - i) * SLICE_STAGGER;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  height: "100%",
                  left: `${(i / SLICES) * 100}%`,
                  width: `${100 / SLICES}%`,
                  overflow: "hidden",
                  transform: visible ? "translateY(0)" : `translateY(${dir * 105}%)`,
                  transition: !visible && !exiting
                    ? "none"
                    : visible
                      ? `transform ${SLICE_ANIM_MS}ms cubic-bezier(0.16,1,0.3,1) ${entryDelay}ms`
                      : `transform ${SLICE_ANIM_MS}ms cubic-bezier(0.76,0,0.24,1) ${exitDelay}ms`,
                }}
              >
                {/* Full-panel-width bg shifted so each slice shows the right crop */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    height: "100%",
                    left: `-${i * 100}%`,
                    width: `${SLICES * 100}%`,
                    backgroundImage: `url(${image.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            );
          })}

          {/* Thin divider between panels */}
          {panelIdx < images.length - 1 && (
            <div
              style={{
                position: "absolute",
                top: 0, right: 0,
                width: "1px", height: "100%",
                background: "rgba(255,255,255,0.18)",
                zIndex: 2,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── CountUp ───────────────────────────────────────────────────────────────────
// Animates a number from 0 to its target value when it enters the viewport.
// Handles optional suffix (e.g. "20+" → num=20, suffix="+").
// Persists the completed state so the count does not reset after reload.

function CountUp({ value, color }: { value: string; color: string }) {
  const num = parseInt(value, 10);
  const suffix = value.replace(/\d/g, "");
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCount(0);
    setStarted(false);
    setCompleted(false);
  }, [value]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || completed) return;

    const DURATION = 2400;
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setCount(Math.round(eased * num));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      setCount(num);
      setCompleted(true);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, completed, num]);

  return (
    <div
      ref={containerRef}
      className="text-3xl font-bold mb-1"
      style={{ fontFamily: "Playfair Display, serif", color }}
    >
      {count}{suffix}
    </div>
  );
}

// ── HeroSection ───────────────────────────────────────────────────────────────

export default function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const [tickerIndex,    setTickerIndex]    = useState(0);
  const [currentSlide,   setCurrentSlide]   = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const videoRef     = useRef<HTMLVideoElement | null>(null);
  const transitioning = useRef(false);

  // Advance to the next slide.
  // The slide switch is always immediate so the incoming slide (video) is
  // already fading in while the outgoing slices are still flying out —
  // this ensures no grey/blank background is ever exposed.
  const startTransition = () => {
    if (transitioning.current) return;
    transitioning.current = true;
    if (videoRef.current) videoRef.current.pause();

    const leavingImages = slides[currentSlide].type === "images";
    setContentVisible(false);                          // triggers slice exit
    setCurrentSlide((prev) => (prev + 1) % slides.length); // swap immediately

    // images→video: wait for slices to fully exit (~1800 ms) before revealing text
    // video→images: slices begin entering ~400 ms after video starts fading
    const revealDelay = leavingImages ? 1900 : 400;

    window.setTimeout(() => {
      setContentVisible(true);
      transitioning.current = false;
    }, revealDelay);
  };

  // Reveal content on first mount
  useEffect(() => {
    const t = window.setTimeout(() => setContentVisible(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  // Ticker
  useEffect(() => {
    const t = window.setInterval(() => setTickerIndex((p) => (p + 1) % latestItems.length), 4500);
    return () => window.clearInterval(t);
  }, []);

  // Auto-advance timer
  useEffect(() => {
    const active = slides[currentSlide];
    let timer: number | undefined;

    if (active.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => null);
      timer = window.setTimeout(startTransition, active.duration);
    }

    if (active.type === "images") {
      timer = window.setTimeout(startTransition, active.duration);
    }

    return () => { if (timer) window.clearTimeout(timer); };
  }, [currentSlide]);

  const content = heroContent[currentSlide];

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-black" id="hero">

      {/* ── Slide backgrounds ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* Layer 1 — video: always the base, fades with currentSlide */}
        {slides.map((slide, index) =>
          slide.type === "video" ? (
            <video
              key={index}
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={slide.src}
              poster={slide.poster}
              muted
              autoPlay
              playsInline
              loop={false}
              onEnded={startTransition}
              style={{
                opacity: currentSlide === index ? 1 : 0,
                transition: "opacity 1.2s ease",
              }}
            />
          ) : null
        )}

        {/* Layer 2 — image panels: slice animation handles entry/exit, no opacity */}
        {slides.map((slide, index) =>
          slide.type === "images" ? (
            <div key={index} className="absolute inset-0">
              <ThreePanelSliceSection
                images={slide.images}
                animate={contentVisible && index === currentSlide}
              />
            </div>
          ) : null
        )}

        {/* Single dark overlay for text readability — always present */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ── Geometric accent overlays ── */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: "linear-gradient(135deg, transparent 40%, oklch(0.50 0.17 155) 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-1/3 opacity-5"
          style={{ background: "linear-gradient(0deg, oklch(0.62 0.14 135) 0%, transparent 100%)" }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Ticker ── */}
      <div className="absolute top-20 left-0 right-0 z-10 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="container">
          <div className="flex items-center gap-6 py-3 overflow-hidden">
            <span className="section-label shrink-0 px-2 py-0.5 rounded-sm font-bold" style={{ background: "#02f9ba", color: "#1e1f1f" }}>Latest</span>
            <div className="relative flex-1 min-h-5 overflow-hidden">
              {latestItems.map((item, i) => (
                <span
                  key={i}
                  className={`absolute inset-0 text-base text-white whitespace-nowrap transition-opacity duration-700 ${i === tickerIndex ? "opacity-100" : "opacity-0"}`}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2">
              {latestItems.map((_, i) => (
                <span key={i} className={`h-1.5 w-1.5 rounded-full transition-colors ${i === tickerIndex ? "bg-white" : "bg-white/30"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 container pb-20 pt-40">
        <div className="max-w-3xl">
          <p
            className="section-label mb-6"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
              color: "white",
            }}
          >
            {content.label}
          </p>

          <h1
            className="font-bold text-white leading-tight mb-8"
            style={{ fontSize: "6rem" }}
          >
            <SplitText key={content.heading} text={content.heading} animate={contentVisible} />
          </h1>

          <p className="text-lg text-white/70 max-w-xl leading-relaxed mb-10" style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 300, lineHeight: "1.5", color: "#02d49e" }}>
            <SplitText key={content.sub} text={content.sub} animate={contentVisible} />
          </p>

          <div
            className="flex flex-wrap items-center gap-4"
            style={{ opacity: contentVisible ? 1 : 0, transition: "opacity 0.5s ease 0.85s" }}
          >
            <BorderButton onClick={() => handleScroll(content.cta1Href)} primary>
              {content.cta1} <ArrowRight size={16} />
            </BorderButton>
            <BorderButton onClick={() => handleScroll(content.cta2Href)}>
              {content.cta2}
            </BorderButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-16" style={{ background: "linear-gradient(180deg, transparent, white)" }} />
          <span className="text-white text-xs tracking-widest" style={{ writingMode: "vertical-rl" }}>SCROLL</span>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)" }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "7",   label: "Business Clusters" },
              { value: "20+", label: "Portfolio Companies" },
              { value: "5+",  label: "Countries"},
              { value: "30+", label: "Years of Excellence" },
            ].map((stat, i) => (
              <div key={i} className="px-6 py-5">
                <CountUp value={stat.value} color="#02f9ba" />
                <div className="text-xs text-white tracking-wide" style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 300, lineHeight: "1.5" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
