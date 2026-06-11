/* ─────────────────────────────────────────────────────────────
   LogoMarquee — two infinite ticker rows (partners + clients)
   To use real logos: replace the `name` strings with <img> tags
   and set logo.src.
   ───────────────────────────────────────────────────────────── */

interface LogoItem {
  name: string;
  src?: string; /* optional real logo image */
}

const partners: LogoItem[] = [
  { name: "Banco Millennium Atlântico",       src: "/Logos_Partners/Banco_Millennium_Atlântico.png" },
  { name: "Diaar Imobiliária",                src: "/Logos_Partners/diaar-imobiliaria.png" },
  { name: "IBG International Business Group", src: "/Logos_Partners/ibg-international-business-group.png" },
  { name: "SONAIR",                           src: "/Logos_Partners/SONAIR.png" },
];

const clients: LogoItem[] = [
  { name: "KPMG",      src: "/Logos_Clients/KPMG.png" },
  { name: "Mstelecom", src: "/Logos_Clients/Mstelecom.jpg" },
  { name: "Paratus",   src: "/Logos_Clients/Paratus.png" },
  { name: "TAAG",      src: "/Logos_Clients/TAAG.png" },
  { name: "TV Cabo",   src: "/Logos_Clients/tvcabo.png" },
];

/* duplicate for seamless loop */
const partnerLoop = [...partners, ...partners];
const clientLoop  = [...clients,  ...clients];

function LogoCard({ item }: { item: LogoItem }) {
  return (
    <div className="lm-card">
      {item.src ? (
        <img src={item.src} alt={item.name} loading="lazy" decoding="async" className="lm-img" draggable={false} />
      ) : (
        <span className="lm-name">{item.name}</span>
      )}
    </div>
  );
}

function Ticker({ items, direction }: { items: LogoItem[]; direction: "left" | "right" }) {
  return (
    <div className="lm-ticker-wrap">
      <div className={`lm-ticker lm-ticker--${direction}`}>
        {items.map((item, i) => (
          <LogoCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

const css = `
  /* ── Ticker wrapper ── */
  .lm-ticker-wrap {
    overflow: hidden;
    width: 100%;
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
    mask-image:         linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
  }
  .lm-ticker {
    display: flex;
    gap: 10px;
    width: max-content;
    will-change: transform;
  }
  @media (min-width: 640px) {
    .lm-ticker { gap: 14px; }
  }
  @media (min-width: 1024px) {
    .lm-ticker { gap: 16px; }
  }

  .lm-ticker--left  { animation: lm-scroll-left  24s linear infinite; }
  .lm-ticker--right { animation: lm-scroll-right 24s linear infinite; }

  @media (min-width: 640px) {
    .lm-ticker--left  { animation-duration: 28s; }
    .lm-ticker--right { animation-duration: 28s; }
  }

  .lm-ticker-wrap:hover .lm-ticker { animation-play-state: paused; }

  @keyframes lm-scroll-left {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes lm-scroll-right {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }

  /* ── Logo card ── */
  .lm-card {
    flex-shrink: 0;
    height: 100px;
    min-width: 180px;
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 8px;
    background: #fff;
    opacity: 1;
    filter: grayscale(0);
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: default;
  }
  @media (min-width: 640px) {
    .lm-card { height: 120px; min-width: 210px; padding: 20px 40px; }
  }
  @media (min-width: 1024px) {
    .lm-card { height: 140px; min-width: 240px; padding: 24px 48px; }
  }
  .lm-ticker-wrap:hover .lm-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }

  /* ── Logo text & image ── */
  .lm-name {
    font-size: 1rem;
    font-weight: 700;
    color: #1f2937;
    white-space: nowrap;
    letter-spacing: 0.02em;
  }
  @media (min-width: 1024px) { .lm-name { font-size: 1.05rem; } }

  .lm-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* ── Row labels ── */
  .lm-row-label {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.35);
    margin-bottom: 10px;
  }
  @media (min-width: 640px) { .lm-row-label { margin-bottom: 14px; } }
`;

export default function LogoMarquee() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "oklch(0.97 0.003 240)", contentVisibility: "auto", containIntrinsicSize: "0 400px" }}>
      <style>{css}</style>

      <div className="container">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="section-label">06 — Partners &amp; Clients</span>
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--eg-cyan)" }} />
        </div>

        {/* Partners — scroll LEFT */}
        <div className="mb-6 sm:mb-10">
          <p className="lm-row-label">Partners</p>
          <Ticker items={partnerLoop} direction="left" />
        </div>

        {/* Clients — scroll RIGHT */}
        <div>
          <p className="lm-row-label">Clients</p>
          <Ticker items={clientLoop} direction="right" />
        </div>
      </div>
    </section>
  );
}
