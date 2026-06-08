import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { articles, tagColors } from "@/data/articles";

export default function BlogPage() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? articles.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8f9fa" }}>
      <Navbar fixed={false} />

      <Breadcrumb items={[{ label: "Newsroom" }]} />

      {/* Page header */}
      <div style={{ background: "var(--eg-dark)" }} className="py-16 lg:py-20">
        <div className="container">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--eg-cyan)" }}>
            04 — Newsroom
          </span>
          <h1
            className="mt-3 text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 800 }}
          >
            Latest News &<br />Announcements
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12 flex-1">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Articles grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-5">
              {articles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <article className="bg-white rounded-sm p-6 group cursor-pointer hover:shadow-md transition-all border border-gray-100 h-full flex flex-col">
                    {article.image && (
                      <div className="w-full h-40 rounded-sm overflow-hidden mb-4">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm"
                        style={{
                          background: `${tagColors[article.tag]}18`,
                          color: tagColors[article.tag],
                        }}
                      >
                        {article.tag}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={10} />
                        {article.date}
                      </span>
                    </div>
                    <h3
                      className="text-base font-bold text-gray-900 mb-2 leading-snug flex-1"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{article.excerpt}</p>
                    <span
                      className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2 mt-auto"
                      style={{ color: tagColors[article.tag] }}
                    >
                      Read more
                      <ArrowRight size={12} />
                    </span>
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

              {/* Search input */}
              <div className="relative mb-4">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-sm outline-none focus:border-[#02d49e] transition-colors"
                />
              </div>

              {/* Results */}
              {query.trim() && (
                <div>
                  {filtered.length > 0 ? (
                    <ul className="flex flex-col gap-1">
                      {filtered.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/blog/${a.slug}`}
                            className="flex items-start gap-2 py-2.5 px-3 rounded-sm text-sm text-gray-700 hover:bg-gray-50 hover:text-[#02d49e] transition-colors group"
                          >
                            <ArrowRight size={12} className="mt-0.5 shrink-0 text-gray-300 group-hover:text-[#02d49e] transition-colors" />
                            <span className="leading-snug">{a.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-400 py-2">No articles found.</p>
                  )}
                </div>
              )}

              {/* All titles list when no search */}
              {!query.trim() && (
                <div>
                  <p className="text-xs text-gray-400 mb-3">All articles</p>
                  <ul className="flex flex-col gap-1">
                    {articles.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/blog/${a.slug}`}
                          className="flex items-start gap-2 py-2 px-3 rounded-sm text-xs text-gray-600 hover:bg-gray-50 hover:text-[#02d49e] transition-colors group"
                        >
                          <ArrowRight size={11} className="mt-0.5 shrink-0 text-gray-300 group-hover:text-[#02d49e] transition-colors" />
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
