import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, Search, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { chairmanTalks } from "@/data/chairmanTalks";

function TalkImage({ src, alt }: { src?: string; alt: string }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, oklch(0.18 0.04 160) 0%, oklch(0.45 0.13 140) 100%)` }}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Quote size={22} style={{ color: "rgba(255,255,255,0.18)" }} />
      </div>
    </div>
  );
}

export default function ChairmansTalk() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? chairmanTalks.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8f9fa" }}>
      <Navbar fixed={false} />

      <Breadcrumb items={[{ label: "Chairman's Talk" }]} />

      {/* Page header */}
      <div style={{ background: "var(--eg-dark)" }} className="py-16 lg:py-20">
        <div className="container">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--eg-orange)" }}>
            05 — Chairman&apos;s Talk
          </span>
          <h1
            className="mt-3 text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Insights from the Chairman
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12 flex-1">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Talks grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-5">
              {chairmanTalks.map((talk) => (
                <Link key={talk.slug} href={`/chairmans-talk/${talk.slug}`}>
                  <article className="bg-white rounded-sm overflow-hidden group cursor-pointer hover:shadow-md transition-all border border-gray-100 h-full flex flex-col">
                    <div className="w-full h-40">
                      <TalkImage src={talk.image} alt={talk.title} />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm"
                          style={{ background: "rgba(198,166,100,0.15)", color: "var(--eg-orange-dark)" }}
                        >
                          {talk.category}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar size={10} />
                          {talk.date}
                        </span>
                      </div>
                      <h3
                        className="text-base font-bold text-gray-900 mb-2 leading-snug flex-1"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        {talk.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">{talk.excerpt}</p>
                      <span
                        className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2 mt-auto"
                        style={{ color: "var(--eg-orange-dark)" }}
                      >
                        Read more
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest">
                Search here
              </h2>

              <div className="relative mb-4">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search talks..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-sm outline-none focus:border-[#c6a664] transition-colors"
                />
              </div>

              {query.trim() && (
                <div>
                  {filtered.length > 0 ? (
                    <ul className="flex flex-col gap-1">
                      {filtered.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/chairmans-talk/${a.slug}`}
                            className="flex items-start gap-2 py-2.5 px-3 rounded-sm text-sm text-gray-700 hover:bg-gray-50 hover:text-[#8a7233] transition-colors group"
                          >
                            <ArrowRight size={12} className="mt-0.5 shrink-0 text-gray-300 group-hover:text-[#8a7233] transition-colors" />
                            <span className="leading-snug">{a.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-400 py-2">No talks found.</p>
                  )}
                </div>
              )}

              {!query.trim() && (
                <div>
                  <p className="text-xs text-gray-400 mb-3">All talks</p>
                  <ul className="flex flex-col gap-1">
                    {chairmanTalks.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/chairmans-talk/${a.slug}`}
                          className="flex items-start gap-2 py-2 px-3 rounded-sm text-xs text-gray-600 hover:bg-gray-50 hover:text-[#8a7233] transition-colors group"
                        >
                          <ArrowRight size={11} className="mt-0.5 shrink-0 text-gray-300 group-hover:text-[#8a7233] transition-colors" />
                          <span className="leading-snug">{a.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
