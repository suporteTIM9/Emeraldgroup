import { ArrowRight, Calendar, Quote } from "lucide-react";
import { Link } from "wouter";
import { chairmanTalks } from "@/data/chairmanTalks";

function TalkImage({ src, alt, compact = false }: { src?: string; alt: string; compact?: boolean }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: `radial-gradient(circle at 25% 15%, oklch(0.42 0.13 145) 0%, oklch(0.13 0.03 165) 75%)` }}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      )}
      {/* subtle dot texture so the placeholder state doesn't read as empty */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
      />
      {!compact && (
        <span
          className="absolute -bottom-6 -left-1 leading-none select-none pointer-events-none"
          style={{ fontFamily: "Playfair Display, serif", fontSize: "7rem", color: "rgba(255,255,255,0.08)" }}
        >
          &rdquo;
        </span>
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.35) 100%)" }}
      />
      <div className="absolute top-3 right-3 pointer-events-none">
        <Quote size={compact ? 14 : 18} style={{ color: "rgba(255,255,255,0.25)" }} />
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

        {/* Split layout: featured story pinned left, stacked talks scroll past on the right */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Featured talk — sticky */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <Link href={`/chairmans-talk/${featured.slug}`}>
              <div
                className="rounded-xl overflow-hidden group cursor-pointer border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{ background: "var(--eg-mid)", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="h-72 lg:h-96 relative">
                  <TalkImage src={featured.image} alt={featured.title} />
                  <span
                    className="absolute top-4 left-4 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.7)", backdropFilter: "blur(4px)" }}
                  >
                    Featured
                  </span>
                </div>
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
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
                    className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight line-clamp-3"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {featured.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed line-clamp-3 mb-8">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ background: "var(--eg-orange)", color: "#1e1f1f" }}
                      >
                        C
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-semibold text-white/80">The Chairman</div>
                        <div className="text-[11px] text-white/35">Emerald Group</div>
                      </div>
                    </div>
                    <span
                      className="flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                      style={{ color: "var(--eg-orange)" }}
                    >
                      Read more
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Stacked talks — flow normally so they scroll past the sticky feature */}
          {rest.length > 0 && (
            <div className="lg:col-span-5 flex flex-col gap-5">
              {rest.map((item) => (
                <Link key={item.slug} href={`/chairmans-talk/${item.slug}`}>
                  <article
                    className="rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 border flex hover:-translate-y-1 hover:shadow-xl"
                    style={{ background: "var(--eg-mid)", borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <div className="w-32 sm:w-40 shrink-0 relative">
                      <TalkImage src={item.image} alt={item.title} compact />
                    </div>
                    <div className="p-5 flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <span
                          className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full shrink-0"
                          style={{ background: "rgba(198,166,100,0.15)", color: "var(--eg-orange)" }}
                        >
                          {item.category}
                        </span>
                        <span className="text-xs text-white/35 flex items-center gap-1 shrink-0">
                          <Calendar size={10} />
                          {item.date}
                        </span>
                      </div>
                      <h3
                        className="text-sm font-bold text-white mb-2 leading-snug line-clamp-2"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/50 leading-relaxed line-clamp-2 mb-3 flex-1">{item.excerpt}</p>
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
      </div>
    </section>
  );
}
