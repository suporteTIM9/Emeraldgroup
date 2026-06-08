import { useState } from "react";
import { Building2, HardHat, Zap, Leaf, Radio, Landmark } from "lucide-react";

const clusters = [
  {
    id: "banking",
    number: "01",
    icon: Building2,
    title: "Banking & Financial Services",
    anchorId: "cluster-banking",
    tagline: "Mobilising capital. Enabling growth.",
    description:
      "Emerald Group's Banking & Financial Services cluster anchors the Group's ability to mobilise capital, structure complex transactions, and deliver financial solutions across the African continent and Portuguese-speaking markets. Through a diversified portfolio spanning commercial banking, digital finance, and strategic advisory, this cluster bridges institutional capital with the real economy — financing infrastructure, trade, and enterprise at scale.",
    companies: [
      {
        name: "54 Corp",
        desc: "A pan-African investment holding and advisory platform that structures and deploys capital across high-growth sectors. Named for Africa's 54 nations, 54 Corp embodies the Group's conviction in the continent's economic potential.",
      },
      {
        name: "Banco Millennium Atlântico",
        desc: "One of Angola's leading commercial banks, providing corporate banking, trade finance, and retail services to individuals and institutions. A cornerstone of Angola's financial infrastructure and a key enabler of the Group's regional strategy.",
        href: "https://www.atlantico.ao/en/retail/for-you/",
      },
      {
        name: "Banko",
        desc: "A digital banking and fintech platform designed to extend financial access to underserved populations and SMEs. Banko leverages mobile-first technology to deliver payments, savings, and credit solutions at scale.",
      },
      {
        name: "Emerald Advisors",
        desc: "The Group's strategic financial advisory arm, providing M&A, capital markets, and transaction advisory services to corporates, governments, and institutional investors across Africa and Europe.",
      },
    ],
    color: "oklch(0.42 0.16 155)",
    bgColor: "oklch(0.97 0.04 155)",
  },
  {
    id: "construction",
    number: "02",
    icon: HardHat,
    title: "Construction & Engineering",
    anchorId: "cluster-construction",
    tagline: "Building the foundations of tomorrow.",
    description:
      "The Construction & Engineering cluster delivers the physical infrastructure that underpins economic development across Sub-Saharan Africa. From large-scale civil works and residential developments to agro-industrial facilities and specialist engineering, this cluster translates Emerald Group's investment thesis into tangible assets — creating jobs, building capacity, and transforming landscapes.",
    companies: [
      {
        name: "IBG Africa",
        desc: "A major construction and civil engineering company executing large-scale projects across Angola and the wider region, including roads, housing, public buildings, and industrial facilities. IBG Africa is a primary engine of the Group's physical development mandate.",
      },
      {
        name: "Grow Africa",
        desc: "Focused on agro-industrial infrastructure, Grow Africa develops and builds facilities that support agricultural value chains — from processing plants to storage and logistics — contributing to food security and rural economic development.",
      },
      {
        name: "Tecton",
        desc: "A specialist engineering and technical services firm delivering precision solutions in structural, mechanical, and systems engineering. Tecton supports both Group projects and third-party clients requiring high-complexity technical execution.",
      },
    ],
    color: "oklch(0.52 0.14 55)",
    bgColor: "oklch(0.97 0.04 55)",
  },
  {
    id: "infrastructure",
    number: "03",
    icon: Zap,
    title: "Infrastructure",
    anchorId: "cluster-infrastructure",
    tagline: "Connecting communities. Powering economies.",
    description:
      "Infrastructure is the backbone of sustainable economic growth. Emerald Group's Infrastructure cluster develops, owns, and operates critical assets — from energy and utilities to logistics and transport networks — that enable commerce, improve quality of life, and attract further investment. This cluster takes a long-term, asset-backed approach to infrastructure development, prioritising projects with strong social and economic multipliers.",
    companies: [
      {
        name: "Emerald Infrastructure",
        desc: "The Group's dedicated infrastructure development and asset management vehicle. Emerald Infrastructure identifies, structures, and manages long-life infrastructure projects across energy, water, logistics, and transport — partnering with governments, development finance institutions, and private co-investors to deliver assets of national significance.",
      },
    ],
    color: "oklch(0.42 0.16 155)",
    bgColor: "oklch(0.97 0.04 155)",
  },
  {
    id: "resources",
    number: "04",
    icon: Leaf,
    title: "Natural Resources",
    anchorId: "cluster-resources",
    tagline: "Responsible stewardship of Africa's endowments.",
    description:
      "Africa holds a disproportionate share of the world's natural wealth. Emerald Group's Natural Resources cluster engages with this endowment responsibly — developing commodity and energy assets with a commitment to environmental stewardship, local value creation, and long-term sustainability. The cluster operates across the resource value chain, from exploration and extraction to trading and downstream processing.",
    companies: [
      {
        name: "Emerald Global Resources",
        desc: "A diversified natural resources and commodities platform with interests spanning minerals, metals, and agricultural commodities. Emerald Global Resources operates across the value chain, from sourcing and trading to processing and export, with a focus on African-origin commodities and global market access.",
      },
      {
        name: "Nino Oil",
        desc: "An oil exploration and production company focused on upstream hydrocarbon assets in Sub-Saharan Africa. Nino Oil combines technical expertise with local knowledge to develop energy resources that support regional energy security and generate long-term economic value.",
      },
    ],
    color: "oklch(0.52 0.14 55)",
    bgColor: "oklch(0.97 0.04 55)",
  },
  {
    id: "tmt",
    number: "05",
    icon: Radio,
    title: "Telecom, Media & Technology",
    anchorId: "cluster-tmt",
    tagline: "Informing, connecting, and inspiring Africa.",
    description:
      "The Telecom, Media & Technology cluster positions Emerald Group at the intersection of connectivity and content — two of the most powerful forces shaping Africa's future. Through telecommunications infrastructure and a portfolio of respected media brands, this cluster builds the information architecture of the continent, giving voice to African business, culture, and ambition while enabling the digital economy to flourish.",
    companies: [
      {
        name: "Emerald Telecom",
        desc: "A telecommunications infrastructure and services company delivering connectivity solutions across underserved markets. Emerald Telecom builds and operates the networks that enable digital inclusion, mobile commerce, and enterprise communications.",
      },
      {
        name: "Forbes Africa",
        desc: "The pan-African edition of the world's most recognised business media brand. Forbes Africa covers the continent's most influential entrepreneurs, investors, and innovators, inspiring the next generation of African business leaders.",
      },
      {
        name: "Forbes África Lusófona",
        desc: "The Portuguese-language African edition of Forbes, serving the business communities of Angola, Mozambique, Cape Verde, and other Lusophone markets with authoritative business journalism and thought leadership.",
      },
      {
        name: "Forbes Portugal",
        desc: "The leading Portuguese edition of Forbes, covering the country's most dynamic companies, entrepreneurs, and economic trends. A bridge between Portugal's business community and the broader Lusophone world.",
      },
      {
        name: "Jornal Económico",
        desc: "Portugal's premier economic and financial newspaper, providing in-depth analysis of macroeconomic trends, capital markets, and corporate strategy. A trusted reference for business decision-makers in Portugal and the Portuguese-speaking world.",
      },
    ],
    color: "oklch(0.42 0.16 155)",
    bgColor: "oklch(0.97 0.04 155)",
  },
  {
    id: "urban",
    number: "06",
    icon: Landmark,
    title: "Urban Development & Real Estate",
    anchorId: "cluster-urban",
    tagline: "Reimagining the African city.",
    description:
      "Africa's urban population is set to double by 2050. Emerald Group's Urban Development & Real Estate cluster is at the forefront of this transformation — developing mixed-use destinations, premium residential communities, and world-class hospitality assets that redefine what is possible in African cities. This cluster creates places where people live, work, and thrive, anchoring Emerald Group's long-term commitment to urban Africa.",
    companies: [
      {
        name: "Diaar",
        desc: "A real estate development and asset management company with a portfolio of residential, commercial, and mixed-use properties. Diaar brings international standards of design and construction to African markets, creating lasting value for residents, tenants, and investors.",
      },
      {
        name: "ONE Luanda",
        desc: "Luanda's most ambitious mixed-use urban development, combining premium residences, Grade-A office space, retail, and leisure in a single integrated destination. ONE Luanda sets a new benchmark for urban living in Angola's capital.",
      },
      {
        name: "ONE Hotéis",
        desc: "A luxury hospitality brand managing a portfolio of premium hotels and serviced residences across Africa. ONE Hotéis delivers exceptional guest experiences that reflect the richness of African culture while meeting the expectations of international travellers and business visitors.",
      },
    ],
    color: "oklch(0.52 0.14 55)",
    bgColor: "oklch(0.97 0.04 55)",
  },
];

export default function ClustersSection() {
  const [activeCluster, setActiveCluster] = useState(0);

  return (
    <section id="clusters" className="py-24 lg:py-32" style={{ background: "oklch(0.97 0.003 240)" }}>
      <style>{`
        .cluster-tab:not(.cluster-tab-active):hover {
          background: rgba(2, 249, 186, 0.06) !important;
          border-left-color: #02f9ba !important;
        }
        .cluster-tab:not(.cluster-tab-active):hover .cluster-tab-number {
          color: #02f9ba !important;
        }
        .cluster-tab:not(.cluster-tab-active):hover .cluster-tab-title {
          color: #02f9ba !important;
        }
        .cluster-tab:not(.cluster-tab-active):hover .cluster-tab-icon {
          background: rgba(2, 249, 186, 0.15) !important;
        }
      `}</style>
      <div className="container">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label">03 — Our Business Clusters</span>
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--eg-green)" }} />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight max-w-xl"
            style={{ color: "var(--eg-dark)", fontFamily: "Playfair Display, serif" }}
          >
            Six Clusters.<br />One Vision.
          </h2>
          <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
            Emerald Group organises its investments and operations into six distinct business clusters — each
            strategically positioned to capture long-term value and contribute to Africa's economic transformation.
          </p>
        </div>

        {/* Cluster tabs + detail */}
        <div className="grid lg:grid-cols-5 gap-0 rounded-sm overflow-hidden shadow-sm border border-gray-100">
          {/* Left: cluster list */}
          <div className="lg:col-span-2 bg-white border-r border-gray-100">
            {clusters.map((cluster, i) => {
              const Icon = cluster.icon;
              const isActive = activeCluster === i;
              return (
                <button
                  key={cluster.id}
                  id={cluster.anchorId}
                  onClick={() => setActiveCluster(i)}
                  className={`cluster-tab w-full text-left flex items-start gap-4 p-5 border-b border-gray-50 transition-all group ${isActive ? "cluster-tab-active" : ""}`}
                  style={{
                    background: isActive ? cluster.bgColor : "white",
                    borderLeft: isActive ? `3px solid ${cluster.color}` : "3px solid transparent",
                  }}
                >
                  <div
                    className="cluster-tab-icon w-9 h-9 rounded-sm flex items-center justify-center shrink-0 mt-0.5 transition-colors"
                    style={{
                      background: isActive ? cluster.color : "oklch(0.95 0.005 240)",
                    }}
                  >
                    <Icon size={16} color={isActive ? "white" : "oklch(0.52 0.02 240)"} />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="cluster-tab-number text-xs font-semibold tracking-widest uppercase mb-1 transition-colors"
                      style={{ color: isActive ? cluster.color : "oklch(0.65 0.02 240)" }}
                    >
                      {cluster.number}
                    </div>
                    <div
                      className="cluster-tab-title text-sm font-semibold leading-snug transition-colors"
                      style={{ color: isActive ? "var(--eg-dark)" : "oklch(0.40 0.02 240)" }}
                    >
                      {cluster.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 italic">{cluster.tagline}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: cluster detail */}
          <div className="lg:col-span-3 bg-white p-8 lg:p-10">
            {(() => {
              const c = clusters[activeCluster];
              const Icon = c.icon;
              return (
                <div key={c.id} className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center"
                      style={{ background: c.color }}
                    >
                      <Icon size={18} color="white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.color }}>
                        Cluster {c.number}
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: "var(--eg-dark)" }}>
                        {c.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs font-semibold tracking-wider uppercase italic mb-4" style={{ color: c.color }}>
                    {c.tagline}
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed mb-8">{c.description}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
                      Portfolio Companies — {c.companies.length} {c.companies.length === 1 ? "entity" : "entities"}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {c.companies.map((company, j) => (
                        <div
                          key={j}
                          className="p-4 rounded-sm border transition-all hover:shadow-sm group"
                          style={{
                            borderColor: "oklch(0.92 0.005 240)",
                            background: "oklch(0.99 0.002 240)",
                            borderLeft: `2px solid ${c.color}`,
                          }}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div
                              className="text-sm font-semibold"
                              style={{ color: "var(--eg-dark)" }}
                            >
                              {company.name}
                            </div>
                            {(company as any).href && (
                              <a
                                href={(company as any).href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
                                style={{ color: c.color }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Visit
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                              </a>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed">{company.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explore this cluster — removed */}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
