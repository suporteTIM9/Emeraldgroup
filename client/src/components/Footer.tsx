import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowUp } from "lucide-react";

const footerLinks = [
  {
    heading: "About",
    links: [
      { label: "Who We Are", href: "/about-us" },
      { label: "Our Mission & Vision", href: "/mission-vision" },
      { label: "Leadership", href: "https://web.cvent.com/event/139e43a2-4b7f-4194-92e2-f6898ce0ad99/summary" },
      { label: "Awards & Recognition", href: "#" },
    ],
  },
  {
    heading: "Our Business",
    links: [
      { label: "Banking & Financial Services", href: "#cluster-banking" },
      { label: "Construction & Engineering", href: "#cluster-construction" },
      { label: "Infrastructure", href: "#cluster-infrastructure" },
      { label: "Natural Resources", href: "#cluster-resources" },
      { label: "Telecom, Media & Technology", href: "#cluster-tmt" },
      { label: "Urban Development & Real Estate", href: "#cluster-urban" },
      { label: "Education & Leadership Dev.", href: "#cluster-education" },
    ],
  },
  {
    heading: "Portfolio",
    links: [
      { label: "54 Corp", href: "https://media54.africa/" },
      { label: "Banco Millennium Atlântico", href: "https://www.atlantico.ao/en/retail/for-you/" },
      { label: "Forbes Africa", href: "https://www.forbesafrica.com/" },
      { label: "Emerald Infrastructure", href: "https://emeraldgroup-inc.com/" },
      { label: "ONE Luanda", href: "https://oneluanda.com/" },
      { label: "Nino Oil", href: "https://ninogas.com/" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Newsroom", href: "#news" },
      { label: "Investor Relations", href: "#contact" },
      { label: "Reports Portal", href: "/reports" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
];

function IconLinkedIn() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialLinks = [
  { icon: IconLinkedIn, href: "https://www.linkedin.com/company/emerald-group-inc-com", label: "LinkedIn" },
];

const tagline = "Building tomorrow's global business platforms with purpose, integrity, and a commitment to lasting impact.";

export default function Footer() {
  const [typedText, setTypedText] = useState("");
  const [showTop, setShowTop]     = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      setTypedText(tagline.slice(0, index + 1));
      index += 1;
      if (index >= tagline.length) window.clearInterval(interval);
    }, 25);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: "smooth" });
      } else {
        window.location.href = "/" + href;
      }
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ background: "var(--eg-dark)", borderTop: "3px solid #02f9ba" }}>
      <style>{`
        @keyframes btt-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(2,249,186,0.45); }
          50%       { box-shadow: 0 0 0 9px rgba(2,249,186,0); }
        }
        .btt-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 999;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #1e1f1f;
          border: 2px solid #02f9ba;
          color: #02f9ba;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: btt-pulse 2.4s ease-in-out infinite;
          transition: background 0.25s ease, color 0.25s ease,
                      transform 0.3s ease, opacity 0.3s ease;
        }
        .btt-btn:hover {
          background: #02f9ba;
          color: #1e1f1f;
          transform: translateY(-5px) !important;
          animation: none;
          box-shadow: 0 8px 24px rgba(2,249,186,0.4);
        }
        .btt-btn.btt-hidden { opacity: 0; pointer-events: none; transform: translateY(14px); }
        .btt-btn.btt-visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
        @media (max-width: 640px) {
          .btt-btn { bottom: 1.25rem; right: 1.25rem; width: 40px; height: 40px; }
        }
      `}</style>

      {/* Floating back-to-top button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`btt-btn ${showTop ? "btt-visible" : "btt-hidden"}`}
      >
        <ArrowUp size={18} />
      </button>

      {/* Top bar — logo + social */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="container py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663184082639/28Rt9uMprGDPTN4Qw2hwyo/emerald-logo-dark_23cb6a99.png"
              alt="Emerald Group"
              className="w-auto object-contain"
              style={{ height: "clamp(40px, 5vw, 60px)", filter: "brightness(1.15) drop-shadow(0 0 12px rgba(2,212,158,0.25))" }}
            />
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-sm flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.08)", transition: "background 0.2s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#02d49e")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  <span style={{ color: "#ffffff", display: "flex" }}>
                    <Icon />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tagline strip */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="container py-8">
          <p
            className="text-sm max-w-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Nunito Sans, sans-serif", fontWeight: 300 }}
          >
            <span>{typedText}</span>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: "0.5rem",
                marginLeft: "0.2rem",
                color: "rgba(255,255,255,0.4)",
                animation: "footer-caret 0.9s steps(1) infinite",
              }}
            >|</span>
          </p>
        </div>
      </div>

      {/* Links grid */}
      <div className="container py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-xs font-bold tracking-widest uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Nunito Sans, sans-serif" }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => {
                  const cls = "text-sm transition-colors";
                  const sty = { color: "rgba(255,255,255,0.45)", fontFamily: "Nunito Sans, sans-serif" };
                  const on  = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "#02d49e");
                  const off = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)");
                  return (
                    <li key={link.label}>
                      {link.href.startsWith("#") ? (
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className={cls}
                          style={{ ...sty, background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
                          onMouseEnter={on} onMouseLeave={off}
                        >{link.label}</button>
                      ) : link.href.startsWith("https") ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer"
                          className={cls} style={sty} onMouseEnter={on} onMouseLeave={off}
                        >{link.label}</a>
                      ) : (
                        <Link href={link.href} className={cls} style={sty} onMouseEnter={on} onMouseLeave={off}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="container py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Nunito Sans, sans-serif" }}>
              © {new Date().getFullYear()} Emerald Group International. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { label: "Legal Notice", href: "/legal" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Nunito Sans, sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#02d49e")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
