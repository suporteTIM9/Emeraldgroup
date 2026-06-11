import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown, Landmark, HardHat, Layers, Gem, Radio, Building2, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

type NavChild = { label: string; href: string; icon: LucideIcon; desc: string };
type NavItem  = { label: string; href: string; children?: NavChild[] };
type NavbarProps = { fixed?: boolean };

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  {
    label: "Our Business",
    href: "#clusters",
    children: [
      { label: "Banking & Financial Services",   href: "#cluster-banking",        icon: Landmark,  desc: "Financial solutions driving economic growth across Africa." },
      { label: "Construction & Engineering",      href: "#cluster-construction",   icon: HardHat,   desc: "Building world-class infrastructure for tomorrow." },
      { label: "Infrastructure",                  href: "#cluster-infrastructure", icon: Layers,    desc: "Developing essential networks that connect economies." },
      { label: "Natural Resources",               href: "#cluster-resources",      icon: Gem,       desc: "Sustainable extraction and value creation from Africa's wealth." },
      { label: "Telecom, Media & Technology",     href: "#cluster-tmt",            icon: Radio,     desc: "Connecting people and businesses through innovation." },
      { label: "Urban Development & Real Estate", href: "#cluster-urban",          icon: Building2, desc: "Shaping cities and communities for sustainable living." },
    ],
  },
  { label: "Journey", href: "#journey" },
  { label: "News",    href: "#news"    },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ fixed = true }: NavbarProps) {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredChild, setHoveredChild] = useState<string | null>(null);
  useAuth();
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
        setHoveredChild(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setHoveredChild(null);
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

  const logoSrc = isStatic
    ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663184082639/28Rt9uMprGDPTN4Qw2hwyo/emerald-logo-transparent_aa2bef6f.png"
    : scrolled
      ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663184082639/28Rt9uMprGDPTN4Qw2hwyo/emerald-logo-transparent_aa2bef6f.png"
      : "https://d2xsxph8kpxj0f.cloudfront.net/310519663184082639/28Rt9uMprGDPTN4Qw2hwyo/emerald-logo-dark_23cb6a99.png";

  const navStyle = { fontFamily: "Nunito Sans, sans-serif", fontWeight: 700, lineHeight: "1.4" };
  const textColor = scrolled || isStatic ? "#1E1F1F" : "white";

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
              className="h-10 lg:h-14 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => {
                      setOpenDropdown(openDropdown === item.label ? null : item.label);
                      setHoveredChild(null);
                    }}
                    className="flex items-center gap-1 px-3 py-2 text-lg transition-colors rounded-sm"
                    style={{ ...navStyle, color: textColor }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#02d49e")}
                    onMouseLeave={e => (e.currentTarget.style.color = textColor)}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Mega Menu */}
                  {openDropdown === item.label && (
                    <div
                      className="fixed left-0 right-0 z-50 shadow-2xl"
                      style={{
                        top: "80px",
                        background: "rgba(255, 255, 255, 0.97)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        borderTop: "2px solid #02f9ba",
                      }}
                    >
                      <div className="container py-8">
                        <div className="flex gap-10">

                          {/* Left: sector grid */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                              <span
                                className="text-xs font-semibold tracking-widest uppercase"
                                style={{ color: "#02f9ba", fontFamily: "Nunito Sans, sans-serif" }}
                              >
                                Our Business Clusters
                              </span>
                              <button
                                onClick={() => handleNavClick("#clusters")}
                                className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-[#02d49e]"
                                style={{ color: "rgba(0,0,0,0.35)" }}
                              >
                                View All <ArrowRight size={12} />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-1">
                              {item.children.map((child) => {
                                const Icon = child.icon;
                                const isActive = hoveredChild === child.label;
                                return (
                                  <button
                                    key={child.label}
                                    onClick={() => handleNavClick(child.href)}
                                    onMouseEnter={() => setHoveredChild(child.label)}
                                    onMouseLeave={() => setHoveredChild(null)}
                                    className="flex items-start gap-4 px-4 py-4 text-left rounded-lg transition-all duration-200"
                                    style={{
                                      background: isActive ? "#02f9ba" : "transparent",
                                      borderLeft: `2px solid ${isActive ? "#02f9ba" : "transparent"}`,
                                    }}
                                  >
                                    <div
                                      className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200"
                                      style={{ background: isActive ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.05)" }}
                                    >
                                      <Icon size={16} style={{ color: isActive ? "#000" : "rgba(0,0,0,0.35)" }} />
                                    </div>
                                    <div>
                                      <div
                                        className="text-sm font-semibold mb-0.5 transition-colors duration-200"
                                        style={{ color: isActive ? "#000" : "#1e1f1f", fontFamily: "Nunito Sans, sans-serif" }}
                                      >
                                        {child.label}
                                      </div>
                                      <div className="text-xs leading-relaxed" style={{ color: isActive ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)" }}>
                                        {child.desc}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Right: preview panel — só aparece ao fazer hover */}
                          {hoveredChild && (() => {
                            const active = item.children!.find(c => c.label === hoveredChild);
                            if (!active) return null;
                            const Icon = active.icon;
                            return (
                              <div
                                className="w-72 flex-shrink-0 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300"
                                style={{ background: "rgba(2,212,158,0.08)", border: "1.5px solid rgba(2,212,158,0.25)" }}
                              >
                                <div>
                                  <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                                    style={{ background: "rgba(2,249,186,0.15)" }}
                                  >
                                    <Icon size={28} color="#02f9ba" />
                                  </div>
                                  <h3
                                    className="font-bold text-lg mb-3 leading-snug"
                                    style={{ fontFamily: "Quantico, sans-serif", color: "#1e1f1f" }}
                                  >
                                    {active.label}
                                  </h3>
                                  <p
                                    className="text-sm leading-relaxed mb-6"
                                    style={{ color: "rgba(0,0,0,0.5)", fontFamily: "Nunito Sans, sans-serif", fontWeight: 300 }}
                                  >
                                    {active.desc}
                                  </p>
                                  <button
                                    onClick={() => handleNavClick(active.href)}
                                    className="flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                                    style={{ color: "#02f9ba", fontFamily: "Nunito Sans, sans-serif" }}
                                  >
                                    Explore Cluster <ArrowRight size={14} />
                                  </button>
                                </div>
                              </div>
                            );
                          })()}

                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="px-3 py-2 text-lg transition-colors rounded-sm"
                  style={{ ...navStyle, color: textColor }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#02d49e")}
                  onMouseLeave={e => (e.currentTarget.style.color = textColor)}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

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
          </div>
        </div>
      )}
    </header>
  );
}
