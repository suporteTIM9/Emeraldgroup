import { useEffect, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "wouter";
import { articles, tagColors, type Article } from "@/data/articles";

const NEWS_ROTATE_MS = 6000;

/** Groups consecutive-or-not articles sharing a slideGroup into one slot each. */
function groupArticles(items: Article[]): Article[][] {
  const groups: Article[][] = [];
  const indexBySlideGroup = new Map<string, number>();
  for (const item of items) {
    if (item.slideGroup) {
      const existing = indexBySlideGroup.get(item.slideGroup);
      if (existing !== undefined) {
        groups[existing].push(item);
        continue;
      }
      indexBySlideGroup.set(item.slideGroup, groups.length);
    }
    groups.push([item]);
  }
  return groups;
}

function NewsCard({ items, spanFull }: { items: Article[]; spanFull?: boolean }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), NEWS_ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const item = items[index];
  const color = tagColors[item.tag];

  return (
    <article
      className={`bg-white rounded-sm p-6 group cursor-pointer hover:shadow-md transition-all border border-gray-50 flex flex-col ${spanFull ? "sm:col-span-2" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm"
          style={{ background: `${color}15`, color }}
        >
          {item.tag}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Calendar size={10} />
          {item.date}
        </span>
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug flex-1">{item.title}</h3>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--eg-dark)" }}>{item.excerpt}</p>

      {item.externalHref && item.externalHref !== "#" && (
        <a
          href={item.externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2 mt-auto hover:text-white"
          style={{ color }}
        >
          {item.ctaLabel ?? "Read more"}
          <ArrowRight size={12} />
        </a>
      )}
      {item.externalHref === "#" && (
        <span
          className="flex items-center gap-1 text-xs font-semibold mt-auto transition-colors hover:text-white"
          style={{ color }}
        >
          {item.ctaLabel ?? "Read more"}
          <ArrowRight size={12} />
        </span>
      )}
      {!item.externalHref && (
        <Link
          href={`/blog/${item.slug}`}
          className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2 mt-auto hover:text-white"
          style={{ color }}
        >
          {item.ctaLabel ?? "Read more"}
          <ArrowRight size={12} />
        </Link>
      )}

      {items.length > 1 && (
        <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-50">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show story ${i + 1}`}
              onClick={(e) => { e.preventDefault(); setIndex(i); }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === index ? "18px" : "6px", background: i === index ? color : "oklch(0.9 0.005 240)" }}
            />
          ))}
        </div>
      )}
    </article>
  );
}

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

        {/* Featured article — full-bleed news cover */}
        <div
          className="relative overflow-hidden rounded-sm mb-6 min-h-[420px] lg:min-h-[480px] flex items-end"
        >
          <img
            src="/imagens/world-night-lights.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.15) 100%)" }}
          />
          {/* Vignette — softens the photo's hard edges so it dissolves into the card */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 140px 40px rgba(0,0,0,0.55)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(120% 100% at 15% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.75) 100%)" }}
          />
          <div className="relative p-10 lg:p-16 max-w-2xl lg:max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-2 text-sm font-extrabold tracking-[0.15em] uppercase px-4 py-2 rounded-full"
                style={{ background: "#02f9ba", color: "#0a1f1a", boxShadow: "0 0 24px rgba(2,249,186,0.55)" }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: "#0a1f1a", animation: "featuredBlink 1.4s ease-in-out infinite" }} />
                Featured
              </span>
              <style>{`@keyframes featuredBlink { 0%,100%{opacity:1} 50%{opacity:0.25} }`}</style>
              <span className="text-xs text-white/50 flex items-center gap-1">
                <Calendar size={10} />
                March 2026
              </span>
            </div>
            <h3
              className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight uppercase"
              style={{ fontFamily: "Quantico, sans-serif", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
            >
              Emerald Group has strategic presence and expansion across different regions.
            </h3>
            <div className="h-1 w-16 rounded-full mb-6" style={{ background: "var(--eg-orange)" }} />
            <p className="text-sm text-white/75 leading-relaxed max-w-2xl" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
              Emerald Group unveils a comprehensive five-year strategic plan to deepen its presence
              across Sub-Saharan Africa, with targeted investments in infrastructure, financial services,
              and digital technology.
            </p>
          </div>
        </div>

        {/* News grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(() => {
            const groups = groupArticles(articles);
            // If the last row would otherwise hold a single lonely card, let it span wider instead.
            const loneInLastRow = groups.length % 3 === 1;
            return groups.map((group, i) => (
              <NewsCard key={group[0].slug} items={group} spanFull={loneInLastRow && i === groups.length - 1} />
            ));
          })()}
        </div>
      </div>
    </section>
  );
}
