import { useEffect, useState } from "react";
import { Link } from "wouter";

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
  {
    icon: IconLinkedIn,
    href: "https://www.linkedin.com/company/emerald-group-inc-com",
    label: "LinkedIn",
  },
];

const futuristicTagline =
  "Building tomorrow's global business platforms with purpose, integrity, and a commitment to lasting impact.";

export default function Footer() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      setTypedText(futuristicTagline.slice(0, index + 1));
      index += 1;

      if (index >= futuristicTagline.length) {
        window.clearInterval(interval);
      }
    }, 25);

    return () => window.clearInterval(interval);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: "smooth" });
        setTimeout(() => (el as HTMLElement).click(), 400);
      } else {
        window.location.href = "/" + href;
      }
    }
  };

  return (
    <footer style={{ background: "var(--eg-dark)" }}>
      {/* Top bar */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663184082639/28Rt9uMprGDPTN4Qw2hwyo/emerald-logo-dark_23cb6a99.png"
                alt="Emerald Group"
                className="w-auto object-contain"
                style={{ height: "clamp(48px, 6vw, 72px)", filter: "brightness(1.15) drop-shadow(0 0 12px rgba(2,212,158,0.25))" }}
              />
            </div>

            {/* Tagline */}
            <p
              className="text-sm max-w-sm leading-relaxed font-medium"
              style={{
                color: "rgba(255,255,255,0.4)",
                textShadow: "0 0 18px rgba(127, 170, 255, 0.35)",
              }}
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
              >
                |
              </span>
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-sm flex items-center justify-center transition-all hover:opacity-80"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    ...(label === "LinkedIn"
                      ? {
                          transition: "background 0.2s ease, transform 0.2s ease",
                        }
                      : {}),
                  }}
                  onMouseEnter={(event) => {
                    if (label === "LinkedIn") {
                      event.currentTarget.style.background = "#02d49e";
                    }
                  }}
                  onMouseLeave={(event) => {
                    if (label === "LinkedIn") {
                      event.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    }
                  }}
                >
                  <span style={{ color: "#ffffff", display: "flex", width: 14, height: 14 }}>
                    <Icon />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="container py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-5">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="text-sm text-white/50 hover:text-white/90 transition-colors text-left animated-link"
                      >
                        {link.label}
                      </button>
                    ) : link.href.startsWith("https") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/50 hover:text-white/90 transition-colors animated-link"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 hover:text-white/90 transition-colors animated-link"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-white">
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
                  className="text-xs text-white hover:text-[#02d49e] transition-colors"
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
