import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "wouter";
import { leadershipGroups } from "@/data/leadership";

function initialsOf(name: string) {
  const parts = name.replace("'", " ").split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Leadership() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Leadership Team" }]} />

      <main className="container py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <div className="pb-10 sm:pb-14">
            <div className="mb-20">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#02d49e] hover:text-white"
              >
                ← Back to homepage
              </Link>
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#02d49e]">
              Governance
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Leadership Team
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full" style={{ background: "#02d49e" }} />
            <p className="mt-6 max-w-2xl text-base leading-8" style={{ color: "var(--eg-dark)" }}>
              The people guiding Emerald Group's strategy, governance, and day-to-day operations
              across our business clusters.
            </p>
          </div>

          {/* Groups */}
          {leadershipGroups.map((group) => (
            <div key={group.heading} className="mb-16">
              <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--eg-dark)" }}>
                {group.heading}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.members.map((m, i) => (
                  <div
                    key={`${m.name}-${i}`}
                    className="rounded-sm border border-slate-100 bg-slate-50 p-5"
                  >
                    <div
                      className="mb-3 flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: "var(--eg-cyan)" }}
                    >
                      {initialsOf(m.name)}
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {m.name}
                      {m.note && <span style={{ color: "var(--eg-cyan)" }}>{m.note}</span>}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-600">{m.role}</div>
                    {m.spec && (
                      <div className="mt-0.5 text-xs italic text-slate-500">{m.spec}</div>
                    )}
                  </div>
                ))}
              </div>
              {group.footnote && (
                <p className="mt-6 text-xs italic text-slate-400">{group.footnote}</p>
              )}
            </div>
          ))}

          {/* Back link bottom */}
          <div className="mt-4 pt-8 pb-20 border-t border-slate-100">
            <Link
              href="/#about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#02d49e] hover:opacity-80 transition-opacity"
            >
              ← Back to About section
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
