import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Linkedin } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { leadershipGroups, type LeadershipMember } from "@/data/leadership";

function initialsOf(name: string) {
  const parts = name.replace("'", " ").split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function PersonNode({
  member,
  size = "md",
  accent = "var(--eg-cyan)",
}: {
  member: LeadershipMember;
  size?: "lg" | "md" | "sm";
  accent?: string;
}) {
  const [open, setOpen] = useState(false);
  const dims = size === "lg" ? "h-16 w-16 text-lg" : size === "md" ? "h-12 w-12 text-sm" : "h-10 w-10 text-xs";
  const nameSize = size === "lg" ? "text-base" : "text-sm";
  const badgeDims = size === "lg" ? "h-8 w-8" : size === "md" ? "h-7 w-7" : "h-6 w-6";
  const badgeIcon = size === "lg" ? 16 : size === "md" ? 14 : 13;

  return (
    <button
      type="button"
      onClick={() => member.spec && setOpen((o) => !o)}
      className="leader-node group relative z-0 flex w-36 sm:w-40 flex-col items-center text-center hover:z-20"
    >
      <div className="relative transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-125">
        <div
          className={`leader-avatar flex ${dims} items-center justify-center overflow-hidden rounded-full font-bold text-white transition-shadow duration-300`}
          style={{
            background: accent,
            ["--accent" as string]: accent,
            boxShadow: open ? `0 0 0 5px color-mix(in srgb, ${accent} 25%, transparent)` : undefined,
          }}
        >
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            initialsOf(member.name)
          )}
        </div>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${member.name} on LinkedIn`}
            className={`absolute -right-2 -bottom-2 z-10 flex ${badgeDims} items-center justify-center rounded-full border-[3px] border-white text-white shadow-md transition-transform hover:scale-125`}
            style={{ background: "#0A66C2" }}
          >
            <Linkedin size={badgeIcon} fill="white" />
          </a>
        )}
      </div>
      <div
        className={`mt-2.5 font-semibold transition-all duration-300 group-hover:scale-110 ${nameSize}`}
        style={{ color: "var(--eg-dark)" }}
      >
        {member.name}
        {member.note && <span style={{ color: accent }}>{member.note}</span>}
      </div>
      <div className="mt-0.5 text-xs text-slate-500 leading-snug transition-colors duration-300 group-hover:text-[var(--hover-accent)]" style={{ ["--hover-accent" as string]: accent }}>
        {member.role}
      </div>
      {member.spec && (
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: open ? "40px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div
            className="mt-1.5 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold italic"
            style={{ background: `color-mix(in srgb, ${accent} 12%, white)`, color: accent }}
          >
            {member.spec}
          </div>
        </div>
      )}
      {member.spec && !open && (
        <div className="mt-1 text-[10px] font-medium tracking-wide" style={{ color: accent, opacity: 0.7 }}>
          tap for detail
        </div>
      )}
    </button>
  );
}

function Connector({ accent }: { accent: string }) {
  return (
    <div className="relative flex justify-center">
      <div className="h-8 w-px" style={{ background: accent, opacity: 0.4 }} />
    </div>
  );
}

function TierBranch({
  label,
  members,
  accent,
  size,
}: {
  label: string;
  members: LeadershipMember[];
  accent: string;
  size: "md" | "sm";
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="leader-tier">
      <Connector accent={accent} />
      <div
        className="pt-8"
        style={{ borderTop: `2px solid color-mix(in srgb, ${accent} 45%, transparent)` }}
      >
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mx-auto mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
          style={{ color: accent }}
        >
          {label}
          <span className="text-slate-400 font-normal normal-case tracking-normal">({members.length})</span>
          <ChevronDown
            size={14}
            className="transition-transform duration-300"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
        <div
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{ maxHeight: expanded ? "1200px" : "0px", opacity: expanded ? 1 : 0 }}
        >
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 pb-2">
            {members.map((m, i) => (
              <PersonNode key={`${m.name}-${i}`} member={m} size={size} accent={accent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Leadership() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const chartRef = useRef<HTMLDivElement>(null);

  /* Scroll-reveal cascade for the chairman node and each tier */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    chartRef.current?.querySelectorAll(".leader-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const boardGroup = leadershipGroups.find((g) => g.heading === "Board of Directors")!;
  const execGroup = leadershipGroups.find((g) => g.heading === "Group Executive Board")!;
  const officersGroup = leadershipGroups.find((g) => g.heading === "Senior Officers")!;

  const chairman = execGroup.members.find((m) => m.name === "N'Gunu Tiny")!;
  const boardRest = boardGroup.members.filter((m) => m.name !== "N'Gunu Tiny");
  const execRest = execGroup.members.filter((m) => m.name !== "N'Gunu Tiny");

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .leader-avatar:hover {
          box-shadow: 0 10px 24px color-mix(in srgb, var(--accent) 45%, transparent) !important;
        }
        .leader-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .leader-reveal.in-view { opacity: 1; transform: translateY(0); }
      `}</style>
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Leadership Team" }]} />

      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, oklch(0.10 0.02 165) 0%, oklch(0.20 0.10 155) 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        />
        <div className="container relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--eg-orange)" }}>
              Governance
            </p>
            <h1
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Leadership Team
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full" style={{ background: "var(--eg-orange)" }} />
            <p className="mt-6 max-w-xl text-sm sm:text-base leading-7 sm:leading-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              The people guiding Emerald Group's strategy, governance, and day-to-day operations —
              tap any name for their focus area, or a tier heading to collapse it.
            </p>
          </div>
        </div>
      </div>

      {/* Org chart */}
      <div className="container py-16 sm:py-20">
        <div className="mx-auto max-w-5xl" ref={chartRef}>

          {/* Root — Chairman & CEO */}
          <div className="leader-reveal flex justify-center">
            <PersonNode
              member={{ name: chairman.name, role: "Chairman & Chief Executive Officer", photo: chairman.photo, linkedin: chairman.linkedin }}
              size="lg"
              accent="var(--eg-orange)"
            />
          </div>

          {/* Board branch */}
          <div className="leader-reveal">
            <TierBranch label="Board of Directors" members={boardRest} accent="var(--eg-cyan)" size="md" />
          </div>

          {/* Executive branch */}
          <div className="leader-reveal">
            <TierBranch label="Group Executive Board" members={execRest} accent="var(--eg-cyan)" size="md" />
          </div>

          {/* Senior Officers branch */}
          <div className="leader-reveal">
            <TierBranch label="Senior Officers" members={officersGroup.members} accent="oklch(0.55 0.14 75)" size="sm" />
          </div>

          {boardGroup.footnote && (
            <p className="mt-14 text-center text-xs italic text-slate-400">{boardGroup.footnote}</p>
          )}

          <div className="mt-16 text-center">
            <Link
              href="/#about"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ color: "var(--eg-cyan)" }}
            >
              ← Back to About section
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
