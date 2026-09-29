import { useEffect } from "react";
import { Link } from "wouter";
import { Mail, Landmark, Megaphone, Handshake, Clock, MapPin, ShieldCheck, FileText, Download, Calendar, Shield } from "lucide-react";
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
    label: "Compliance & Reporting",
    email: "compliance@emeraldgroup-inc.com",
    desc: "Questions relating to regulatory compliance, governance, reporting obligations, and ethical concerns.",
  },
];

const reports = [
  {
    category: "Annual Reports",
    items: [
      { title: "Emerald Group Annual Report 2024", date: "March 2025", type: "PDF", size: "4.2 MB" },
      { title: "Emerald Group Annual Report 2023", date: "March 2024", type: "PDF", size: "3.8 MB" },
      { title: "Emerald Group Annual Report 2022", date: "March 2023", type: "PDF", size: "3.5 MB" },
    ],
  },
  {
    category: "Financial Statements",
    items: [
      { title: "Consolidated Financial Statements H2 2024", date: "January 2025", type: "PDF", size: "2.1 MB" },
      { title: "Consolidated Financial Statements H1 2024", date: "August 2024", type: "PDF", size: "1.9 MB" },
      { title: "Consolidated Financial Statements 2023", date: "February 2024", type: "PDF", size: "2.4 MB" },
    ],
  },
  {
    category: "Portfolio Updates",
    items: [
      { title: "Portfolio Performance Review Q4 2024", date: "February 2025", type: "PDF", size: "1.5 MB" },
      { title: "Portfolio Performance Review Q3 2024", date: "November 2024", type: "PDF", size: "1.4 MB" },
      { title: "Banco Millennium Atlântico – 2024 Results", date: "January 2025", type: "PDF", size: "0.9 MB" },
    ],
  },
  {
    category: "Investor Presentations",
    items: [
      { title: "Investor Day Presentation 2024", date: "October 2024", type: "PDF", size: "5.7 MB" },
      { title: "Strategy Briefing – Africa Growth Markets", date: "June 2024", type: "PDF", size: "3.2 MB" },
      { title: "ESG & Sustainability Report 2024", date: "April 2024", type: "PDF", size: "2.8 MB" },
    ],
  },
];

export default function Contact() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Contact" }]} />

      {/* ── Documents & Reports header ── */}
      <div
        className="py-16"
        style={{ background: `linear-gradient(135deg, oklch(0.10 0.02 165) 0%, oklch(0.20 0.10 155) 100%)` }}
      >
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: "var(--eg-cyan)" }}
            >
              <Shield size={16} color="white" />
            </div>
            <span className="section-label text-white/50">Private Area</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Reports &amp; Documents
          </h1>
          <p className="text-sm text-white/50 max-w-md leading-relaxed">
            Access Emerald Group's financial reports, investor presentations, and portfolio updates.
            All documents are confidential and for authorised recipients only.
          </p>
        </div>
      </div>

      {/* ── Reports grid ── */}
      <div className="container py-12" style={{ background: "oklch(0.97 0.003 240)" }}>
        <div className="grid lg:grid-cols-2 gap-8">
          {reports.map((section) => (
            <div key={section.category} className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100">
              <div
                className="px-6 py-4 border-b border-gray-50 flex items-center gap-3"
                style={{ background: "oklch(0.99 0.003 240)" }}
              >
                <FileText size={16} style={{ color: "var(--eg-cyan)" }} />
                <h2 className="text-sm font-semibold text-gray-800">{section.category}</h2>
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-sm font-medium"
                  style={{ background: "oklch(0.97 0.008 200)", color: "var(--eg-cyan)" }}
                >
                  {section.items.length} files
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {section.items.map((doc, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <div className="text-sm font-medium text-gray-800 truncate group-hover:text-(--eg-cyan) transition-colors">
                        {doc.title}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar size={10} />
                          {doc.date}
                        </span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{doc.type}</span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{doc.size}</span>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-sm transition-all opacity-0 group-hover:opacity-100"
                      style={{ background: "var(--eg-cyan)", color: "white" }}
                      onClick={() => alert("Download feature coming soon. Documents will be available in the live portal.")}
                    >
                      <Download size={12} />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          className="mt-8 p-5 rounded-sm border text-xs leading-relaxed"
          style={{ borderColor: "oklch(0.92 0.005 240)", background: "white", color: "var(--eg-dark)" }}
        >
          <strong>Confidentiality Notice:</strong> The documents available in this
          portal are strictly confidential and intended solely for authorised investors and stakeholders of
          Emerald Group. Unauthorised access, distribution, or reproduction of these materials is strictly
          prohibited. By accessing this portal, you confirm that you are an authorised recipient.
        </div>
      </div>

      {/* ── Investor Relations / Get in touch header ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, oklch(0.10 0.02 165) 0%, oklch(0.20 0.10 155) 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        />
        <div className="container relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "#02d49e" }}>
              Get in Touch
            </p>
            <h1
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Let's Connect. Create. Grow.
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full" style={{ background: "#02d49e" }} />
            <p className="mt-6 max-w-3xl text-sm sm:text-base leading-7 sm:leading-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              Whether you are an investor, a strategic partner, part of the press, or simply curious about
              what we do — our team is ready to listen. Reach a department directly below, or use the form
              further down the page.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span className="flex items-center gap-2"><Clock size={14} style={{ color: "#02d49e" }} /> We typically respond within 2 business days</span>
              <span className="flex items-center gap-2"><MapPin size={14} style={{ color: "#02d49e" }} /> 707A, Al Fattan Currency Tower 2, Dubai International Financial Centre (DIFC), Dubai, UAE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Department quick-contact cards ── */}
      <div className="container py-14 sm:py-16">
        <div>
          <p className="mb-8 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.35)" }}>
            Reach the Right Team
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {departments.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.label}
                  className="flex flex-col rounded-sm border p-5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: "oklch(0.92 0.005 240)", background: "oklch(0.99 0.002 240)" }}
                >
                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-sm transition-colors"
                    style={{ background: "rgba(2,212,158,0.1)" }}
                  >
                    <Icon size={16} style={{ color: "#02d49e" }} />
                  </div>
                  <div className="text-xs font-semibold" style={{ color: "var(--eg-dark)" }}>{d.label}</div>
                  <p className="mt-1.5 leading-relaxed" style={{ color: "var(--eg-dark)", fontSize: "11px" }}>{d.desc}</p>
                  <a
                    href={`mailto:${d.email}`}
                    className="mt-4 font-semibold whitespace-nowrap transition-colors hover:underline"
                    style={{ color: "#02d49e", fontSize: "10px" }}
                    title={d.email}
                  >
                    {d.email}
                  </a>
                </div>
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
