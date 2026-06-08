import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "wouter";

export default function MissionVision() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Our Mission & Vision" }]} />

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
              Our Mission &amp; Vision
            </h1>
            <div
              className="mt-4 h-1 w-16 rounded-full"
              style={{ background: "#02d49e" }}
            />
          </div>

          {/* Mission */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-white text-sm font-bold"
                style={{ background: "var(--eg-dark)" }}
              >
                M
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Mission</h2>
            </div>
            <div className="pl-14 space-y-4 text-base leading-8 text-slate-700">
              <p>
                To invest, manage and grow its holdings with the intent to facilitate economic growth
                and development in frontier and emerging markets.
              </p>
              <p>
                To build long term, mutually beneficial relationships with clients and partners.
              </p>
              <p>
                To uphold the highest quality standards with respect to environmental preservation
                and sustainable socioeconomic development.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 border-t border-slate-100" />

          {/* Vision */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-white text-sm font-bold"
                style={{ background: "#02d49e" }}
              >
                V
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Vision</h2>
            </div>
            <div className="pl-14 space-y-4 text-base leading-8 text-slate-700">
              <p>
                To become the strategic partner of choice to the global investment community.
              </p>
              <p>
                In addition, the Emerald Group intends to be the leading investment group in the
                natural resources, financial and services sectors within emerging market countries.
              </p>
            </div>
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
