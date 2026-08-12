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
      { label: "Energy & Resources", href: "#cluster-resources" },
      { label: "Telecom, Media & Technology", href: "#cluster-tmt" },
      { label: "Urban Development & Real Estate", href: "#cluster-urban" },
      { label: "Education & Leadership Dev.", href: "#cluster-education" },
    ],
  },
  {
    heading: "Portfolio, Emerald Clusters",
    links: [
      { label: "Banko Financial Group", href: "https://www.linkedin.com/company/banko-financial-group/" },
      { label: "IBG Africa", href: "https://www.linkedin.com/company/ibg-international-business-group/" },
      { label: "Emerald Global Resources", href: "https://www.egr-ltd.com/" },
      { label: "Forbes Africa", href: "https://www.forbesafrica.com/" },
      { label: "Forbes África Lusófona", href: "https://forbesafricalusofona.com/" },
      { label: "Forbes Portugal", href: "https://www.forbespt.com/" },
      { label: "Jornal Económico", href: "https://jornaleconomico.sapo.pt/" },
      { label: "Polígrafo África", href: "https://poligrafo.sapo.pt/" },
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

function IconSpotify() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.36.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38C8.64 5.94 15.6 6.24 19.681 8.64c.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.668-.072-4.948C23.73 2.7 21.311.273 16.949.073 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

const socialLinks = [
  { icon: IconLinkedIn, href: "https://www.linkedin.com/company/emerald-group-inc-com", label: "LinkedIn" },
  { icon: IconSpotify, href: "https://open.spotify.com/show/5zDFlxRnHW8hsvCkRMZnEz", label: "Spotify" },
  { icon: IconYouTube, href: "https://www.youtube.com/@TheChairmansTalk", label: "YouTube" },
  { icon: IconInstagram, href: "https://www.instagram.com/thechairmanstalk/", label: "Instagram" },
];

const tagline = "Building tomorrow's global business platforms with purpose, integrity, and a commitment to lasting impact.";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

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
            style={{ color: "#ffffff", fontFamily: "Nunito Sans, sans-serif", fontWeight: 300 }}
          >
            {tagline}
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
                style={{ color: "#ffffff", fontFamily: "Nunito Sans, sans-serif" }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => {
                  const cls = "text-sm transition-colors";
                  const sty = { color: "#ffffff", fontFamily: "Nunito Sans, sans-serif" };
                  const on  = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "var(--eg-cyan)");
                  const off = (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = "#ffffff");
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
            <p className="text-xs" style={{ color: "#ffffff", fontFamily: "Nunito Sans, sans-serif" }}>
              © {new Date().getFullYear()} Emerald Group. All rights reserved.
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
                  style={{ color: "#ffffff", fontFamily: "Nunito Sans, sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--eg-cyan)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}
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
