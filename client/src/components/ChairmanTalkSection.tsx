import { ArrowRight, Calendar, Quote } from "lucide-react";
import { Link } from "wouter";
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
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Quote size={28} style={{ color: "rgba(255,255,255,0.18)" }} />
      </div>
    </div>
  );
}

export default function ChairmanTalkSection() {
  const [featured, ...rest] = chairmanTalks;
  if (!featured) return null;

  return (
    <section id="chairman-talk" className="py-24 lg:py-32" style={{ background: "var(--eg-dark)" }}>
      <div className="container">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label" style={{ color: "var(--eg-orange)" }}>05 — Chairman&apos;s Talk</span>
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--eg-orange)" }} />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <h2
            className="text-4xl lg:text-5xl leading-tight text-white"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
          >
            Insights from the<br />Chairman
          </h2>
          <Link
            href="/chairmans-talk"
            className="flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3 self-start lg:self-auto"
            style={{ color: "var(--eg-orange)" }}
          >
            View All Talks
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Featured talk */}
        <Link href={`/chairmans-talk/${featured.slug}`}>
          <div
            className="rounded-sm overflow-hidden mb-6 group cursor-pointer border"
            style={{ background: "var(--eg-mid)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="grid lg:grid-cols-2">
              <div className="hidden lg:block min-h-72 relative">
                <TalkImage src={featured.image} alt={featured.title} />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded-sm"
                      style={{ background: "var(--eg-orange)", color: "#1e1f1f" }}
                    >
                      {featured.category}
                    </span>
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      <Calendar size={10} />
                      {featured.date}
                    </span>
                  </div>
                  <h3
                    className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {featured.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{featured.excerpt}</p>
                </div>
                <span
                  className="flex items-center gap-2 text-sm font-semibold mt-8 transition-all group-hover:gap-3"
                  style={{ color: "var(--eg-orange)" }}
                >
                  Read more
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Talks grid */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((item) => (
              <Link key={item.slug} href={`/chairmans-talk/${item.slug}`}>
                <article
                  className="rounded-sm overflow-hidden group cursor-pointer transition-all border h-full flex flex-col"
                  style={{ background: "var(--eg-mid)", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="h-40 relative">
                    <TalkImage src={item.image} alt={item.title} />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm"
                        style={{ background: "rgba(198,166,100,0.15)", color: "var(--eg-orange)" }}
                      >
                        {item.category}
                      </span>
                      <span className="text-xs text-white/35 flex items-center gap-1">
                        <Calendar size={10} />
                        {item.date}
                      </span>
                    </div>
                    <h3
                      className="text-base font-bold text-white mb-3 leading-snug flex-1"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed mb-4">{item.excerpt}</p>
                    <span
                      className="flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2 mt-auto"
                      style={{ color: "var(--eg-orange)" }}
                    >
                      Read more
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
