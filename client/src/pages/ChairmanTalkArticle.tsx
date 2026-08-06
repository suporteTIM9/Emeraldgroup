import { Link, useParams } from "wouter";
import { ArrowLeft, BookOpen, Calendar, MessageCircle, Quote, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { chairmanTalks } from "@/data/chairmanTalks";
import NotFound from "./NotFound";

function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function IconLinkedIn({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconX({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Turns a YouTube video, short (youtu.be) or channel URL into an embeddable
// player src. Channel links embed the channel's uploads playlist, since a
// channel has no single video ID (uploads playlist ID = "UC" -> "UU").
function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("youtube.com") && !u.hostname.includes("youtu.be")) return null;

    const startSeconds = (u.searchParams.get("t") ?? u.searchParams.get("start"))?.replace("s", "");
    const startParam = startSeconds && /^\d+$/.test(startSeconds) ? `?start=${startSeconds}` : "";

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}${startParam}` : null;
    }

    const videoId = u.searchParams.get("v");
    if (videoId) return `https://www.youtube.com/embed/${videoId}${startParam}`;

    const channelId = u.pathname.match(/^\/channel\/(UC[\w-]+)/)?.[1];
    if (channelId) return `https://www.youtube.com/embed/videoseries?list=UU${channelId.slice(2)}`;

    return null;
  } catch {
    return null;
  }
}

export default function ChairmanTalkArticle() {
  const { slug } = useParams<{ slug: string }>();
  const talk = chairmanTalks.find((a) => a.slug === slug);

  if (!talk) return <NotFound />;

  const pageUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");
  const pageTitle = encodeURIComponent(talk.title);

  const shareLinks = [
    { label: "Facebook", icon: IconFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, color: "#1877F2" },
    { label: "X", icon: IconX, href: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`, color: "#000000" },
    { label: "LinkedIn", icon: IconLinkedIn, href: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`, color: "#0A66C2" },
    { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/?text=${pageTitle}%20${pageUrl}`, color: "#25D366" },
  ];

  const otherTalks = chairmanTalks.filter((a) => a.slug !== slug).slice(0, 3);
  const accent = "var(--eg-orange-dark)";
  const paragraphs = (talk.content ?? talk.excerpt).split("\n\n").filter(Boolean);
  const videoEmbedUrl = talk.videoHref ? getYouTubeEmbedUrl(talk.videoHref) : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8f9fa" }}>
      <Navbar fixed={false} />

      <Breadcrumb items={[
        { label: "Chairman's Talk", href: "/chairmans-talk" },
        { label: talk.title },
      ]} />

      <div className="container py-8 flex-1">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Article */}
          <article className="lg:col-span-2">
            {/* Category & date */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm"
                style={{ background: "rgba(198,166,100,0.15)", color: accent }}
              >
                {talk.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={10} />
                {talk.date}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {talk.title}
            </h1>

            {/* Social share — top */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs text-gray-400 font-medium mr-1">Share:</span>
              {shareLinks.map(({ label, icon: Icon, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${label}`}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: color, color: "#fff" }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            {/* Banner image */}
            <div
              className="w-full rounded-sm overflow-hidden mb-8 relative"
              style={{ maxHeight: "420px", height: "320px", background: `linear-gradient(135deg, oklch(0.18 0.04 160) 0%, oklch(0.45 0.13 140) 100%)` }}
            >
              {talk.image && (
                <img
                  src={talk.image}
                  alt={talk.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Quote size={40} style={{ color: "rgba(255,255,255,0.18)" }} />
              </div>
            </div>

            {/* Body text */}
            <div>
              {paragraphs.map((para, i) => (
                <p key={i} className="leading-relaxed mb-5" style={{ fontSize: "1rem", color: "var(--eg-dark)" }}>
                  {para}
                </p>
              ))}
            </div>

            {talk.externalHref && (
              <a
                href={talk.externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded-full px-5 py-2.5 transition-all hover:opacity-90 w-fit"
                style={{ background: accent }}
              >
                <BookOpen size={14} />
                Full edition – click here.
              </a>
            )}

            {videoEmbedUrl && (
              <div className="mt-6 w-full max-w-sm">
                <div className="w-full rounded-sm overflow-hidden relative shadow-sm" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={videoEmbedUrl}
                    title={talk.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <a
                  href={talk.videoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors mt-2"
                >
                  <Video size={12} />
                  Open channel on YouTube
                </a>
              </div>
            )}

            {/* Social share — bottom */}
            <div className="flex items-center gap-2 mt-10 pt-8 border-t border-gray-100">
              <span className="text-xs text-gray-400 font-medium mr-1">Share this talk:</span>
              {shareLinks.map(({ label, icon: Icon, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${label}`}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: color, color: "#fff" }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            <Link
              href="/chairmans-talk"
              className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors mt-8"
            >
              <ArrowLeft size={14} />
              Back to Chairman&apos;s Talk
            </Link>
          </article>

          {/* Sidebar — other talks */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                Other Talks
              </h2>
              <div className="flex flex-col gap-4">
                {otherTalks.map((a) => (
                  <Link key={a.slug} href={`/chairmans-talk/${a.slug}`}>
                    <div className="bg-white rounded-sm border border-gray-100 p-4 hover:shadow-sm transition-all group cursor-pointer">
                      <div
                        className="w-full h-28 rounded-sm overflow-hidden mb-3 relative"
                        style={{ background: `linear-gradient(135deg, oklch(0.18 0.04 160) 0%, oklch(0.45 0.13 140) 100%)` }}
                      >
                        {a.image && (
                          <img
                            src={a.image}
                            alt={a.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                          />
                        )}
                      </div>
                      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>
                        {a.category}
                      </span>
                      <h3 className="text-sm font-bold text-gray-800 mt-1 leading-snug group-hover:text-[#8a7233] transition-colors" style={{ fontFamily: "Playfair Display, serif" }}>
                        {a.title}
                      </h3>
                      <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Calendar size={9} />
                        {a.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
