import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { articles, tagColors } from "@/data/articles";
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

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <NotFound />;

  const pageUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");
  const pageTitle = encodeURIComponent(article.title);

  const shareLinks = [
    {
      label: "Facebook",
      icon: IconFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      color: "#1877F2",
    },
    {
      label: "X",
      icon: IconX,
      href: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
      color: "#000000",
    },
    {
      label: "LinkedIn",
      icon: IconLinkedIn,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`,
      color: "#0A66C2",
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${pageTitle}%20${pageUrl}`,
      color: "#25D366",
    },
  ];

  const otherArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const tagColor = tagColors[article.tag] ?? "var(--eg-cyan)";
  const paragraphs = (article.content ?? article.excerpt).split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8f9fa" }}>
      <Navbar fixed={false} />

      <Breadcrumb items={[
        { label: "Newsroom", href: "/blog" },
        { label: article.title },
      ]} />

      <div className="container py-8 flex-1">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Article */}
          <article className="lg:col-span-2">
            {/* Category & date */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm"
                style={{ background: `${tagColor}18`, color: tagColor }}
              >
                {article.tag}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={10} />
                {article.date}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {article.title}
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
            {article.image && (
              <div className="w-full rounded-sm overflow-hidden mb-8" style={{ maxHeight: "420px" }}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full object-cover"
                  style={{ maxHeight: "420px" }}
                />
              </div>
            )}

            {/* Body text */}
            <div>
              {paragraphs.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-5" style={{ fontSize: "1rem" }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Social share — bottom */}
            <div className="flex items-center gap-2 mt-10 pt-8 border-t border-gray-100">
              <span className="text-xs text-gray-400 font-medium mr-1">Share this article:</span>
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
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors mt-8"
            >
              <ArrowLeft size={14} />
              Back to Newsroom
            </Link>
          </article>

          {/* Sidebar — other articles */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                Other Articles
              </h2>
              <div className="flex flex-col gap-4">
                {otherArticles.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`}>
                    <div className="bg-white rounded-sm border border-gray-100 p-4 hover:shadow-sm transition-all group cursor-pointer">
                      {a.image && (
                        <div className="w-full h-28 rounded-sm overflow-hidden mb-3">
                          <img
                            src={a.image}
                            alt={a.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: tagColors[a.tag] }}>
                        {a.tag}
                      </span>
                      <h3 className="text-sm font-bold text-gray-800 mt-1 leading-snug group-hover:text-[#02d49e] transition-colors">
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
