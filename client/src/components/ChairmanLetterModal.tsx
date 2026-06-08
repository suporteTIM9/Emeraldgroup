import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const paragraphs = [
  "The 2008 financial crisis and most recent acute global economic and political events have reshaped the landscape of investing in international markets. The investment community has become increasingly hypersensitive to headline and perceived risk across asset classes and geographies, particularly in the context of an uncertain and rather grim outlook for global economic growth.",
  "Events driven market sentiment has also challenged the conventional investment paradigm and has forced investors to reengineer, reshuffle, consolidate or shed assets in an effort to be more risk averse. Today's emerging market investors and asset managers face a contoured investment landscape; one that favours strategic, focused and adaptive growth strategies, that optimize expenditure, maximize efficiency and embrace the long-term intrinsic growth prospects of communities, businesses, and countries.",
  "The most forward thinking investors and managers are teaming up with specialized advisors, establishing local partnerships, and creating bespoke, executable regional and sub-regional strategies that account for the full spectrum of variables – economic, political, and social alike. Success from now on will largely be driven by partnerships, expertise, and disciplined navigation. This strategy is delicately woven into the fabric of our company's history, and has been integral to our success since our inception.",
  "At Emerald Group, resolve amid turbulence, dexterity in the face of opportunity, and far-reaching market expertise is at the core of our business. Stability and consistency of services despite an evolving global economic landscape has cemented our firm as a partner of choice for emerging markets investment.",
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
      aria-label="Chairman Letter"
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
                Chairman Letter
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
                style={{ marginTop: "clamp(24px, 4vw, 40px)" }}
              >
                <p style={{ fontFamily: "Quantico, sans-serif", fontWeight: 400, fontSize: "clamp(0.82rem, 1.8vw, 0.92rem)", color: "#1a1a1a", marginBottom: "0.1rem", lineHeight: 1.8 }}>
                  Sincerely,
                </p>
                <p style={{ fontFamily: "Quantico, sans-serif", fontWeight: 700, fontSize: "clamp(0.82rem, 1.8vw, 0.92rem)", color: "#02d49e", marginBottom: "0.05rem", lineHeight: 1.8 }}>
                  N'Gunu Tiny
                </p>
                <p style={{ fontFamily: "Quantico, sans-serif", fontWeight: 400, fontSize: "clamp(0.82rem, 1.8vw, 0.92rem)", color: "#02d49e", lineHeight: 1.8 }}>
                  Chairman and CEO
                </p>
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
