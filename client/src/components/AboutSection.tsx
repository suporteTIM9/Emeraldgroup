import { useState } from "react";
import ChairmanLetterModal from "./ChairmanLetterModal";

export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="container">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="section-label">01 — About Us</span>
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--eg-cyan)" }} />
        </div>

        <div className="max-w-3xl">
          <div>
            <h2
              className="text-4xl lg:text-5xl font-bold mb-8"
              style={{ fontFamily: "Quantico, sans-serif", fontWeight: 700, lineHeight: "1.2", color: "#1e1f1e" }}
            >
              Your Global Premium Business Partner
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 500, lineHeight: "1.5", color: "#1e1f1f" }}>
              Emerald Group is a global, diversified holding company that deploys its own balance sheet—alongside
              co-investors—to build, scale, and govern high-impact enterprises in high-growth and frontier markets.
              As a holding company, it is defined by its equity stakes across a diversified portfolio, including an
              advisory boutique, and invests both proprietary capital and committed co-investment capital.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 500, lineHeight: "1.5", color: "#1e1f1f" }}>
              The Group invests in and develops strategic business platforms across key sectors of the economy,
              with a portfolio spanning banking and financial services, construction and engineering, infrastructure,
              natural resources, technology, media, and real estate/urban development. These clusters function
              cohesively to mobilise capital, structure complex transactions, and deliver financial and operational
              solutions across African and Emerging markets, while accessing global capital pools.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 500, lineHeight: "1.5", color: "#1e1f1f" }}>
              Emerald Group's efforts are guided by a commitment to delivering meaningful value and impact in the
              markets where it operates—developing world-class enterprises, enhancing economic resilience, and
              creating positive, lasting impact for communities and stakeholders. This purpose-led, principal-led
              approach underpins long-term asset creation, job creation, and sustainable growth across its platforms.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="neon-btn"
            >
              Our Chairman &amp; CEO
            </button>
          </div>
        </div>
      </div>

      <ChairmanLetterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
