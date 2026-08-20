import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: string };
type NavbarProps = { fixed?: boolean };

const navItems: NavItem[] = [
  { label: "About", href: "/about-us" },
  { label: "Leadership Team", href: "/leadership" },
  { label: "Journey", href: "/journey" },
  { label: "News",    href: "#news"    },
  { label: "Chairman's Talk", href: "/chairmans-talk" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ fixed = true }: NavbarProps) {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isStatic = !fixed;
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!fixed) return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fixed]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: "smooth" });
        setTimeout(() => (el as HTMLElement).click(), 400);
      } else {
        window.location.href = "/" + href;
      }
    } else {
      setLocation(href);
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
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
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
            ))}
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
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
