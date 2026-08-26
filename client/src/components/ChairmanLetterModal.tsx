import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const paragraphs = [
  "The global economy is undergoing one of the most profound transformations in modern history. Technological innovation, shifting geopolitical dynamics, demographic change and the accelerating transition towards sustainable development are reshaping industries, markets and investment opportunities across every region of the world. In this environment, achieving meaningful results requires not only capital, but vision, agility and disciplined execution.",
  "At Emerald Group, we have always believed that enduring value is created through strong partnerships, responsible investment and an unwavering commitment to excellence. Navigating periods of profound change requires more than capital; it requires perspective, local knowledge, trusted relationships and the ability to act with discipline and conviction.",
  "Since our inception almost two decades ago, we have built our methodology around this philosophy: strategic insight, local expertise and international reach come together to unlock sustainable growth for our partners, stakeholders and the communities in which we operate.",
  "Africa is central to our vision—not because of opportunity alone, but because it is part of our ingrained DNA. Home to many of the world's fastest-growing economies, abundant natural resources and an increasingly dynamic entrepreneurial landscape, the continent represents one of the defining investment stories of the twenty-first century.",
  "Yet our commitment goes beyond capital deployment. We are building a platform that connects emerging markets with mature economies by attracting patient capital, enabling strategic partnerships and creating pathways for people and businesses to participate meaningfully in economic transformation. Our ambition is to build an organisation where businesses and individuals are empowered to become the authors of their own narratives—able to shape their futures, create value and contribute to the development of the markets and communities in which they operate.",
  "This is our competitive advantage and the lens through which we approach impact investing: channelling capital with the discipline of global markets and the patience required to drive lasting transformation. Our approach reflects Emerald Group's longstanding focus on partnerships, inclusivity and sustainable socioeconomic development in emerging markets.",
  "This platform is anchored by four strategic pillars: energy transition, digital transformation, social innovation and the blue economy. Each represents a frontier where capital, expertise and sustained engagement can generate outcomes that are both commercially sound and structurally transformative.",
  "Within this framework, Sovation—our social innovation business—embodies what we mean by creating markets with purpose. It focuses on building the institutions, businesses and ecosystems that enable inclusive growth to take root and endure. Through this work, we seek to create the conditions in which individuals, entrepreneurs and organisations can define their own direction, unlock opportunity and participate in building a more inclusive future.",
  "Across our businesses, we uphold the highest standards of governance, integrity and professionalism—the foundation from which we facilitate investments, develop transformative projects and create cross-border opportunities. At this level, disciplined risk management is not something we need to declare; it is an inherent consequence of how we operate. What matters more is the lasting value we deliver and the trust we build in every relationship.",
  "We recognise that one of the defining challenges of our time is navigating an increasingly fast-paced and interconnected world—from human relationships and geopolitics to the evolving ways in which we live, work and operate. That is why we do not measure our footprint by conventional metrics alone. We seek to be valued by the quality of the experience and the degree of satisfaction we create for our customers, partners and, most importantly, our people.",
  "As we look to the future, our ambition remains clear: to build a world-class investment organisation and enduring business platform recognised for integrity, innovation and lasting impact—an organisation that does more than invest in businesses, but support people and enterprises author their own narratives and shape the future they want to create with purpose.",
];

export default function ChairmanLetterModal({ isOpen, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const elements = scrollRef.current?.querySelectorAll(".cl-reveal");
      if (!elements) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("cl-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
      );
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 80);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Chairman's Letter"
    >
      <style>{`
        .cl-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cl-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .cl-modal-enter {
          animation: clModalIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes clModalIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cl-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
          color: #000000;
          border: 1px solid rgba(0,0,0,0.2);
          padding: 7px 16px;
          border-radius: 999px;
          background: #ffffff;
          cursor: pointer;
          white-space: nowrap;
          animation: clBtnBlink 1.4s ease-in-out infinite;
          transition: background 0.2s, border-color 0.2s;
        }
        .cl-back-btn:hover {
          background: #ffffff;
          border-color: rgba(0,0,0,0.4);
          animation: none;
        }
        @keyframes clBtnBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
      `}</style>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto cl-modal-enter"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
      >
        {/* Real Navbar in static mode, sticky inside scroll */}
        <div className="sticky top-0 z-10">
          <Navbar fixed={false} />
        </div>

        {/* Main content area */}
        <div style={{ background: "transparent", minHeight: "calc(100vh - 80px)" }}>
          {/* "Back to" top button */}
          <div className="container py-6">
            <button onClick={onClose} className="cl-back-btn">
              <ArrowLeft size={12} />
              Back to
            </button>
          </div>

          {/* Paper card */}
          <div className="container pb-12">
            <div
              className="cl-reveal mx-auto"
              style={{
                background: "#ffffff",
                width: "min(720px, 100%)",
                borderRadius: "4px",
                boxShadow: "0 8px 48px rgba(0,0,0,0.55)",
                padding: "clamp(28px, 6vw, 56px) clamp(24px, 5vw, 52px)",
              }}
            >
              {/* Title */}
              <h1
                style={{
                  fontFamily: "Quantico, sans-serif",
                  fontSize: "clamp(1.5rem, 4.5vw, 2.4rem)",
                  fontWeight: 700,
                  color: "#02d49e",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  lineHeight: 1.1,
                  marginBottom: "clamp(20px, 4vw, 36px)",
                }}
              >
                Chairman's Letter
              </h1>

              {/* Paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                {paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="cl-reveal"
                    style={{
                      fontFamily: "Quantico, sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(0.82rem, 1.8vw, 0.92rem)",
                      lineHeight: 1.8,
                      color: "#1a1a1a",
                      margin: 0,
                      textAlign: "justify",
                      transitionDelay: `${i * 0.06}s`,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Signature */}
              <div
                className="cl-reveal"
                style={{ marginTop: "clamp(28px, 5vw, 48px)" }}
              >
                {/* Divider */}
                <div style={{ height: "1px", background: "linear-gradient(90deg, #02f9ba 0%, rgba(2,249,186,0.1) 100%)", marginBottom: "clamp(20px, 4vw, 32px)" }} />

                <p style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "#6b7280", marginBottom: "clamp(14px, 3vw, 22px)", letterSpacing: "0.04em" }}>
                  Sincerely,
                </p>

                {/* Profile card */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {/* Photo */}
                    <div style={{
                      width: "clamp(64px, 10vw, 84px)",
                      height: "clamp(64px, 10vw, 84px)",
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "2.5px solid #02f9ba",
                      boxShadow: "0 0 0 4px rgba(2,249,186,0.12)",
                    }}>
                      <img
                        src="/about_members/tiny_400px.png"
                        alt="N'Gunu Tiny"
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Name + title */}
                    <div>
                      <p style={{ fontFamily: "Quantico, sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: "#1e1f1f", marginBottom: "2px", lineHeight: 1.2 }}>
                        N'Gunu Tiny
                      </p>
                      <p style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 400, fontSize: "clamp(0.75rem, 1.6vw, 0.82rem)", color: "#6b7280", lineHeight: 1.5, margin: 0 }}>
                        Chairman and CEO of the Emerald Group
                      </p>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/n-gunu-tiny/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="View on LinkedIn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "#1e1f1f",
                      color: "white",
                      flexShrink: 0,
                      transition: "background 0.2s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#02f9ba"; (e.currentTarget as HTMLAnchorElement).style.color = "#1e1f1f"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#1e1f1f"; (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* "Back to" bottom button */}
          <div className="cl-reveal flex justify-center pb-12">
            <button onClick={onClose} className="cl-back-btn">
              <ArrowLeft size={12} />
              Back to
            </button>
          </div>
        </div>

        {/* Real Footer */}
        <Footer />
      </div>
    </div>
  );
}
