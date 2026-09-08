import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "wouter";

export default function AboutUs() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "About Us" }]} />

      <main className="container py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-4xl">

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
              About Us
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Your Global Premium Business Partner
            </h1>
            <div
              className="mt-4 h-1 w-16 rounded-full"
              style={{ background: "#02d49e" }}
            />
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <p className="text-base leading-8 sm:text-lg sm:leading-9" style={{ color: "var(--eg-dark)" }}>
              Emerald Group is a diversified holding company that connects African markets with global capital,
              creates scalable business platforms across strategic sectors, and drives sustainable economic
              growth. Our portfolio spans banking and financial services, construction, infrastructure, energy
              and natural resources, technology, media, and real estate.
            </p>

            <h2 className="mt-14 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              The Emerald Group | Organization and Structure
            </h2>

            <h3 className="mt-10 text-lg font-semibold text-slate-900 sm:text-xl">
              Shareholders
            </h3>
            <p className="text-base leading-8 sm:text-lg sm:leading-9" style={{ color: "var(--eg-dark)" }}>
              The General Meeting of Shareholders constitutes the supreme corporate body of The Emerald Group.
              All shareholders with registered voting rights are entitled to attend, participate in, and vote
              at General Meetings in accordance with the Company's constitutional documents and applicable law.
            </p>

            <h3 className="mt-10 text-lg font-semibold text-slate-900 sm:text-xl">
              Board of Directors
            </h3>
            <p className="text-base leading-8 sm:text-lg sm:leading-9" style={{ color: "var(--eg-dark)" }}>
              The Board of Directors (BoD) is responsible for determining the Group's strategy and for the
              overall direction, supervision, and control of The Emerald Group and its management. The Board
              delegates the day-to-day management of the business to the Group Executive Board, while
              retaining ultimate accountability for governance and performance.
            </p>

            <h3 className="mt-10 text-lg font-semibold text-slate-900 sm:text-xl">
              Governance Structure
            </h3>
            <p className="text-base leading-8 sm:text-lg sm:leading-9" style={{ color: "var(--eg-dark)" }}>
              The Board is supported by specialized committees, including the Governance Structure
              Committee (GSC) and Risk Management and Control Committee (RMC) — all committees will be
              reporting directly to the Board of Directors.
            </p>

            <h3 className="mt-10 text-lg font-semibold text-slate-900 sm:text-xl">
              Group Executive Board
            </h3>
            <p className="text-base leading-8 sm:text-lg sm:leading-9" style={{ color: "var(--eg-dark)" }}>
              The Group Executive Board (GEB, or simply EB) holds executive management responsibility for
              steering the Group and its business activities. It implements the strategies, policies, and
              risk frameworks approved by the Board of Directors and ensures effective operational execution
              across the Group.
            </p>

            <h3 className="mt-10 text-lg font-semibold text-slate-900 sm:text-xl">
              Senior Officers and Directors
            </h3>
            <p className="text-base leading-8 sm:text-lg sm:leading-9" style={{ color: "var(--eg-dark)" }}>
              At the Emerald Group, the career path beyond analyst goes from analyst, to associate director,
              director, executive director, managing director, group managing director and group executive
              board member.
            </p>
          </div>

          {/* Back link bottom */}
          <div className="mt-14 pt-8 pb-20 border-t border-slate-100">
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
