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
      <Breadcrumb items={[{ label: "Who We Are" }]} />

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
              Who We Are
            </h1>
            <div
              className="mt-4 h-1 w-16 rounded-full"
              style={{ background: "#02d49e" }}
            />
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <p className="text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">
              Emerald Group is a diversified holding company that invests in and develops strategic business
              platforms across key sectors of the economy. Our portfolio spans banking and financial services,
              construction, infrastructure, natural resources, technology, media, and real estate.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {[
                { label: "Portfolio Companies", value: "20+", desc: "Across six strategic sectors" },
                { label: "Countries", value: "5+", desc: "Active presence across Africa and Europe" },
                { label: "Years", value: "30+", desc: "Of business excellence and growth" },
                { label: "Business Clusters", value: "6", desc: "Diversified business verticals" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-sm border border-slate-100 bg-slate-50 p-6"
                >
                  <div
                    className="text-4xl font-bold"
                    style={{ fontFamily: "Playfair Display, serif", color: "#02d49e" }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-800">{stat.label}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{stat.desc}</div>
                </div>
              ))}
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
