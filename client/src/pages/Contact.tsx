import { useEffect } from "react";
import { Link } from "wouter";
import { Mail, Landmark, Megaphone, Handshake, Clock, MapPin, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ContactSection from "@/components/ContactSection";

const departments = [
  {
    icon: Handshake,
    label: "General Enquiries",
    email: "info@emeraldgroup-inc.com",
    desc: "Not sure where to start? Send us a message and we'll route it to the right team.",
  },
  {
    icon: Landmark,
    label: "Investor Relations",
    email: "investors@emeraldgroup-inc.com",
    desc: "Institutional investors, family offices and co-investment enquiries.",
  },
  {
    icon: Megaphone,
    label: "Media & Press",
    email: "press@emeraldgroup-inc.com",
    desc: "Press enquiries, interview requests and media kits.",
  },
  {
    icon: Mail,
    label: "Business Partnerships",
    email: "partnerships@emeraldgroup-inc.com",
    desc: "Strategic partnerships, joint ventures and portfolio collaboration.",
  },
  {
    icon: ShieldCheck,
    label: "Compliance",
    email: "compliance@emeraldgroup-inc.com",
    desc: "Regulatory, compliance and governance-related enquiries.",
  },
];

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Contact" }]} />

      {/* ── Hero header ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, oklch(0.10 0.02 165) 0%, oklch(0.20 0.10 155) 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        />
        <div className="container relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "#02d49e" }}>
              Get in Touch
            </p>
            <h1
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Let's Build Something Together
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full" style={{ background: "#02d49e" }} />
            <p className="mt-6 max-w-xl text-sm sm:text-base leading-7 sm:leading-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              Whether you're an investor, a strategic partner, part of the press, or simply curious about
              what we do — our team is ready to listen. Reach a department directly below, or use the form
              further down the page.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span className="flex items-center gap-2"><Clock size={14} style={{ color: "#02d49e" }} /> We typically respond within 2 business days</span>
              <span className="flex items-center gap-2"><MapPin size={14} style={{ color: "#02d49e" }} /> Dubai, UAE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Department quick-contact cards ── */}
      <div className="container py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-8 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.35)" }}>
            Reach the Right Team
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {departments.map((d) => {
              const Icon = d.icon;
              return (
                <a
                  key={d.label}
                  href={`mailto:${d.email}`}
                  className="group flex flex-col rounded-sm border p-5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: "oklch(0.92 0.005 240)", background: "oklch(0.99 0.002 240)" }}
                >
                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-sm transition-colors"
                    style={{ background: "rgba(2,212,158,0.1)" }}
                  >
                    <Icon size={16} style={{ color: "#02d49e" }} />
                  </div>
                  <div className="text-sm font-semibold" style={{ color: "var(--eg-dark)" }}>{d.label}</div>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--eg-dark)" }}>{d.desc}</p>
                  <div
                    className="mt-4 font-semibold whitespace-nowrap overflow-hidden text-ellipsis transition-colors"
                    style={{ color: "#02d49e", fontSize: "10px" }}
                    title={d.email}
                  >
                    {d.email}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Reused homepage contact form ── */}
      <ContactSection showHeader={false} />

      {/* Back link */}
      <div className="container">
        <div className="mx-auto max-w-4xl pb-16 pt-2 border-t border-slate-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 pt-8 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#02d49e" }}
          >
            ← Back to homepage
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
