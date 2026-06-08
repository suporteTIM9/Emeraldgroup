import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown, Lock, Landmark, HardHat, Layers, Gem, Radio, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

type NavChild = { label: string; href: string; icon: LucideIcon };
type NavItem  = { label: string; href: string; children?: NavChild[] };
type NavbarProps = { fixed?: boolean };

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  {
    label: "Our Business",
    href: "#clusters",
    children: [
      { label: "Banking & Financial Services",   href: "#cluster-banking",      icon: Landmark  },
      { label: "Construction & Engineering",      href: "#cluster-construction", icon: HardHat   },
      { label: "Infrastructure",                  href: "#cluster-infrastructure",icon: Layers    },
      { label: "Natural Resources",               href: "#cluster-resources",    icon: Gem       },
      { label: "Telecom, Media & Technology",     href: "#cluster-tmt",          icon: Radio     },
      { label: "Urban Development & Real Estate", href: "#cluster-urban",        icon: Building2 },
    ],
  },
  { label: "Journey",  href: "#journey" },
  { label: "News",     href: "#news"    },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar({ fixed = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isStatic = !fixed;

  useEffect(() => {
    if (!fixed) return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fixed]);

  useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: "smooth" });
        /* activate cluster tab if this is a cluster anchor */
        setTimeout(() => (el as HTMLElement).click(), 400);
      } else {
        window.location.href = "/" + href;
      }
    }
  };

  const logoSrc = isStatic
    ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663184082639/28Rt9uMprGDPTN4Qw2hwyo/emerald-logo-transparent_aa2bef6f.png"
    : scrolled
      ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663184082639/28Rt9uMprGDPTN4Qw2hwyo/emerald-logo-transparent_aa2bef6f.png"
      : "https://d2xsxph8kpxj0f.cloudfront.net/310519663184082639/28Rt9uMprGDPTN4Qw2hwyo/emerald-logo-dark_23cb6a99.png";

  const navClass = isStatic
    ? "text-gray-700 hover:text-(--eg-cyan)"
    : scrolled
      ? "text-gray-700 hover:text-(--eg-cyan)"
      : "text-white/90 hover:text-white";

  return (
    <header
      className={`z-50 transition-all duration-300 nav-blur ${
        isStatic
          ? "relative bg-white/95 shadow-sm border-b border-gray-100"
          : `fixed top-0 left-0 right-0 ${
              scrolled
                ? "bg-white/95 shadow-sm border-b border-gray-100"
                : "bg-transparent"
            }`
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src={logoSrc}
              alt="Emerald Group"
              className="h-8 lg:h-10 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                >
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-sm ${navClass}`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div
                      className="absolute top-full left-1/2 z-50 shadow-2xl"
                      style={{
                        transform: "translateX(-50%)",
                        width: "min(500px, 90vw)",
                        background: "rgb(10, 10, 10)",
                        borderTop: "2px solid rgb(2, 249, 186)",
                        marginTop: "22px",
                      }}
                    >
                      {/* Header row */}
                      <div
                        className="flex items-center justify-between px-5 py-3"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#02f9ba" }}>
                          Our Business
                        </span>
                        <button
                          onClick={() => handleNavClick("#clusters")}
                          className="text-xs font-medium transition-colors hover:text-white"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          View All →
                        </button>
                      </div>

                      {/* 2-column sector grid */}
                      <div className="grid grid-cols-2 py-2">
                        {item.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <button
                              key={child.label}
                              onClick={() => handleNavClick(child.href)}
                              className="flex items-center gap-3 px-5 py-3 text-left transition-colors"
                              style={{ color: "rgba(255,255,255,0.65)" }}
                              onMouseEnter={e => {
                                e.currentTarget.style.color = "#02f9ba";
                                e.currentTarget.style.background = "rgba(2,249,186,0.05)";
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                                e.currentTarget.style.background = "transparent";
                              }}
                            >
                              <Icon size={15} style={{ flexShrink: 0, opacity: 0.7 }} />
                              <span className="text-sm font-medium leading-snug">{child.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-sm ${navClass}`}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          {/* Right side: Private Area CTA
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                href="/reports"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-sm transition-all hover:opacity-90"
                style={{ background: "var(--eg-cyan)" }}
              >
                <Lock size={14} />
                Reports Portal
              </Link>
            ) : (
              <a
                href={getLoginUrl()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border transition-all rounded-sm"
                style={{
                  borderColor: scrolled ? "var(--eg-cyan)" : "rgba(255,255,255,0.6)",
                  color: scrolled ? "var(--eg-cyan)" : "white",
                }}
              >
                <Lock size={14} />
                Investor Logins
              </a>
            )}
          </div>
          */}

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded-sm ${isStatic ? "text-gray-700" : scrolled ? "text-gray-700" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t shadow-lg" style={{ background: "rgb(10,10,10)", borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    item.children
                      ? setOpenDropdown(openDropdown === item.label ? null : item.label)
                      : handleNavClick(item.href)
                  }
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-sm transition-colors"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                      style={{ color: "#02f9ba" }}
                    />
                  )}
                </button>
                {item.children && openDropdown === item.label && (
                  <div
                    className="mx-3 mb-2 grid grid-cols-2 gap-0"
                    style={{ borderTop: "1px solid rgba(2,249,186,0.25)" }}
                  >
                    {item.children.map((child) => {
                      const Icon = child.icon;
                      return (
                        <button
                          key={child.label}
                          onClick={() => handleNavClick(child.href)}
                          className="flex items-center gap-2 px-3 py-3 text-sm text-left transition-colors"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#02f9ba"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                        >
                          <Icon size={13} style={{ flexShrink: 0, opacity: 0.7 }} />
                          <span className="leading-snug">{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {/* CTA commentada porque não será utilizada no mobile */}
              {false && (
                <>
                  {isAuthenticated ? (
                    <Link
                      href="/reports"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-white rounded-sm"
                      style={{ background: "var(--eg-cyan)" }}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Lock size={14} />
                      Reports Portal
                    </Link>
                  ) : (
                    <a
                      href={getLoginUrl()}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-white rounded-sm"
                      style={{ background: "var(--eg-cyan)" }}
                    >
                      <Lock size={14} />
                      Investor Loginn
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
