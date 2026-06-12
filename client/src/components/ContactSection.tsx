import { useState } from "react";
import { Send, MapPin, Mail, Globe, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const ENQUIRY_TYPES = [
  "Investor Relations",
  "Business Partnerships",
  "Media & Press",
  "General Enquiries",
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setSubmitError(null);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    },
    onError: (err) => {
      setSubmitError(err.message || "Failed to send message. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    submitMutation.mutate(form);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white overflow-hidden">
      <style>{`
        .contact-input {
          width: 100%;
          padding: 10px 0;
          font-size: 0.875rem;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid #d1d5db;
          outline: none;
          color: #1e1f1f;
          transition: border-color 0.25s ease;
          font-family: 'Nunito Sans', sans-serif;
        }
        .contact-input::placeholder { color: #9ca3af; }
        .contact-input:focus { border-bottom-color: #02f9ba; }
        textarea.contact-input { resize: none; }

        /* Send button */
        .send-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.72rem 2rem;
          background: #1e1f1f;
          color: white;
          border: 2.5px solid #02f9ba;
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          cursor: pointer;
          border-radius: 10px;
          box-shadow: 0 0 12px rgba(2,249,186,0.25);
          transition: color 0.3s ease, box-shadow 0.3s ease;
        }
        .send-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #02f9ba;
          border-radius: 10px;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .send-btn:hover::before { transform: translateX(0); }
        .send-btn:hover { color: #1e1f1f; box-shadow: 0 0 20px rgba(2,249,186,0.45); }
        .send-btn .btn-content {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 0.6rem;
        }
        .send-btn .btn-icon { transition: transform 0.3s ease; }
        .send-btn:hover .btn-icon { transform: translateX(4px); }

        /* Chips */
        .enquiry-chip-light {
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: 'Nunito Sans', sans-serif;
          letter-spacing: 0.04em;
          cursor: pointer;
          border: 1.5px solid #d1d5db;
          background: transparent;
          color: #6b7280;
          transition: all 0.2s ease;
        }
        .enquiry-chip-light:hover { border-color: #02d49e; color: #02d49e; }
        .enquiry-chip-light.selected { background: #02f9ba; border-color: #02f9ba; color: #1e1f1f; }
      `}</style>

      <div className="container">

        {/* ── Section header (padrão comum a todas as secções) ── */}
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label">05 — Get in Touch</span>
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--eg-cyan)" }} />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: "var(--eg-dark)" }}
          >
            Let's Build Something<br />Together
          </h2>
          <p
            className="text-sm max-w-sm leading-relaxed"
            style={{ color: "#6b7280", fontFamily: "Nunito Sans, sans-serif", fontWeight: 300 }}
          >
            Whether you're an investor, partner, or stakeholder — we welcome the opportunity
            to connect and explore how we can create value together.
          </p>
        </div>

        {/* ── Two-panel card ── */}
        <div className="grid lg:grid-cols-5 rounded-2xl overflow-hidden shadow-lg">

          {/* LEFT — dark info panel */}
          <div
            className="lg:col-span-2 flex flex-col justify-between p-8 lg:p-12"
            style={{ background: "#1e1f1f" }}
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(2,249,186,0.1)" }}>
                  <MapPin size={15} color="#02f9ba" />
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Headquarters</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Nunito Sans, sans-serif" }}>Emerald Group International</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(2,249,186,0.1)" }}>
                  <Mail size={15} color="#02f9ba" />
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Email</div>
                  <a
                    href="mailto:info@emeraldgroup-inc.com"
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Nunito Sans, sans-serif", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#02f9ba")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  >
                    info@emeraldgroup-inc.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(2,249,186,0.1)" }}>
                  <Globe size={15} color="#02f9ba" />
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Website</div>
                  <a
                    href="https://emeraldgroup-inc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Nunito Sans, sans-serif", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#02f9ba")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  >
                    emeraldgroup-inc.com
                  </a>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Nunito Sans, sans-serif" }}>
                Operating across 5+ countries with 20+ portfolio companies.
              </p>
            </div>
          </div>

          {/* RIGHT — form */}
          <div
            className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center"
            style={{ background: "oklch(0.975 0.003 240)" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-64 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: "#02f9ba" }}>
                  <Send size={22} color="#1e1f1f" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1e1f1f" }}>Message Sent</h3>
                <p className="text-sm text-gray-500" style={{ fontFamily: "Nunito Sans, sans-serif" }}>
                  Thank you for reaching out. Our team will respond to your enquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="contact-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="contact-input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Interest chips */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">
                    I'm interested in
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ENQUIRY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`enquiry-chip-light${form.subject === type ? " selected" : ""}`}
                        onClick={() => setForm({ ...form, subject: form.subject === type ? "" : type })}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="contact-input"
                    placeholder="Please describe your enquiry..."
                  />
                </div>

                {/* Error message */}
                {submitError && (
                  <p className="text-sm" style={{ color: "#ef4444", fontFamily: "Nunito Sans, sans-serif" }}>
                    {submitError}
                  </p>
                )}

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    className="send-btn"
                    disabled={submitMutation.isPending}
                    style={{ opacity: submitMutation.isPending ? 0.7 : 1 }}
                  >
                    <span className="btn-content">
                      {submitMutation.isPending ? (
                        <>
                          Sending…
                          <Loader2 size={14} className="btn-icon" style={{ animation: "spin 1s linear infinite" }} />
                        </>
                      ) : (
                        <>
                          Send Enquiry
                          <Send size={14} className="btn-icon" />
                        </>
                      )}
                    </span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
