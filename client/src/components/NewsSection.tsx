import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "wouter";
import { articles, tagColors } from "@/data/articles";

export default function NewsSection() {
  return (
    <section id="news" className="py-24 lg:py-32" style={{ background: "oklch(0.97 0.003 240)" }}>
      <div className="container">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label">04 — Newsroom</span>
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--eg-cyan)" }} />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <h2
            className="text-4xl lg:text-5xl leading-tight"
            style={{ color: "var(--eg-dark)", fontFamily: "Nunito Sans, sans-serif", fontWeight: 800 }}
          >
            Latest News &<br />Announcements
          </h2>
          {/* <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3 self-start lg:self-auto"
            style={{ color: "var(--eg-cyan)" }}
          >
            Visit the Newsroom
            <ArrowRight size={14} />
          </Link> */}
        </div>

        {/* Featured article */}
        <div
          className="rounded-sm overflow-hidden mb-6 group cursor-pointer"
          style={{ background: "var(--eg-dark)" }}
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded-sm"
                    style={{ background: "#02d49e", color: "#1e1f1f", animation: "featuredBlink 1.4s ease-in-out infinite" }}
                  >
                    Featured
                  </span>
                  <style>{`@keyframes featuredBlink { 0%,100%{opacity:1} 50%{opacity:0.25} }`}</style>
                  <span className="text-xs text-white/40 flex items-center gap-1">
                    <Calendar size={10} />
                    March 2025
                  </span>
                </div>
                <h3
                  className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight"
                                  >
                  Emerald Group Announces Strategic Expansion Across Sub-Saharan Africa
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Emerald Group unveils a comprehensive five-year strategic plan to deepen its presence
                  across Sub-Saharan Africa, with targeted investments in infrastructure, financial services,
                  and digital technology.
                </p>
              </div>
              <a
                href="https://www.caason.com.au/caason-group-x-emerald-global-resources/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold mt-8 transition-all hover:gap-3"
                style={{ color: "#02f9ba" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#02f9ba")}
              >
                Read more
                <ArrowRight size={14} />
              </a>
            </div>
            <div
              className="hidden lg:block min-h-64 relative"
              style={{ background: `linear-gradient(135deg, oklch(0.33 0.14 158) 0%, oklch(0.62 0.14 135) 100%)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20 p-8">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663184082639/28Rt9uMprGDPTN4Qw2hwyo/emerald-logo-dark_23cb6a99.png"
                  alt=""
                  className="w-full max-w-xs object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* News grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((item) => (
            <article
              key={item.slug}
              className="bg-white rounded-sm p-6 group cursor-pointer hover:shadow-md transition-all border border-gray-50 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm"
                  style={{
                    background: `${tagColors[item.tag]}15`,
                    color: tagColors[item.tag],
                  }}
                >
                  {item.tag}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={10} />
                  {item.date}
                </span>
              </div>
              <h3
                className="text-base font-bold text-gray-900 mb-3 leading-snug flex-1"
                              >
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{item.excerpt}</p>
              {item.externalHref && item.externalHref !== "#" && (
                <a
                  href={item.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2 mt-auto hover:text-white"
                  style={{ color: tagColors[item.tag] }}
                >
                  Read more
                  <ArrowRight size={12} />
                </a>
              )}
              {item.externalHref === "#" && (
                <span
                  className="flex items-center gap-1 text-xs font-semibold mt-auto transition-colors hover:text-white"
                  style={{ color: tagColors[item.tag] }}
                >
                  Read more
                  <ArrowRight size={12} />
                </span>
              )}
              {!item.externalHref && (
                <Link
                  href={`/blog/${item.slug}`}
                  className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2 mt-auto hover:text-white"
                  style={{ color: tagColors[item.tag] }}
                >
                  Read more
                  <ArrowRight size={12} />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
