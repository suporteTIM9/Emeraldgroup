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
              Creating Global Business Platforms with Purpose
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 500, lineHeight: "1.5", color: "#1e1f1f" }}>
              Emerald Group is a diversified holding company that invests in and develops strategic business
              platforms across key sectors of the economy. Our portfolio spans banking and financial services,
              construction, infrastructure, natural resources, technology, media, and real estate.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ fontFamily: "Nunito Sans, sans-serif", fontWeight: 500, lineHeight: "1.5", color: "#1e1f1f" }}>
              Our efforts are guided by a commitment to delivering meaningful value and impact across the
              markets in which we operate — developing world-class enterprises, enhancing economic resilience,
              and creating positive, lasting impact for communities and stakeholders alike.
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
