import { useState } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="container">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label">05 — Get in Touch</span>
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--eg-cyan)" }} />
        </div>
        <div className="mb-16">
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ color: "var(--eg-dark)" }}
          >
            Contact Emerald Group
          </h2>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed">
            Whether you are an investor, partner, or stakeholder, we welcome the opportunity to connect
            and explore how we can create value together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: contact info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Enquiry Types</h3>
              <div className="flex flex-col gap-2">
                {["Investor Relations", "Business Partnerships", "Media & Press", "General Enquiries"].map(
                  (type, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-sm border border-gray-100 text-sm text-gray-600"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: i % 2 === 0 ? "var(--eg-cyan)" : "var(--eg-orange)" }}
                      />
                      {type}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.97 0.008 200)" }}
                >
                  <MapPin size={14} style={{ color: "var(--eg-cyan)" }} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Headquarters</div>
                  <div className="text-sm text-gray-600">Emerald Group International</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.97 0.008 200)" }}
                >
                  <Mail size={14} style={{ color: "var(--eg-cyan)" }} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Email</div>
                  <a href="mailto:info@emeraldgroup-inc.com" className="text-sm text-gray-600 hover:text-[#02d49e] transition-colors">info@emeraldgroup-inc.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.97 0.008 200)" }}
                >
                  <Phone size={14} style={{ color: "var(--eg-cyan)" }} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Website</div>
                  <a href="https://emeraldgroup-inc.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-[#02d49e] transition-colors">emeraldgroup-inc.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center h-full min-h-64 rounded-sm p-10 text-center"
                style={{ background: "oklch(0.97 0.008 200)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "var(--eg-cyan)" }}
                >
                  <Send size={20} color="white" />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--eg-dark)" }}>
                  Message Sent
                </h3>
                <p className="text-sm text-gray-500">
                  Thank you for reaching out. Our team will respond to your enquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-(--eg-cyan) transition-colors bg-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-(--eg-cyan) transition-colors bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-(--eg-cyan) transition-colors bg-white text-gray-600"
                  >
                    <option value="">Select enquiry type</option>
                    <option>Investor Relations</option>
                    <option>Business Partnerships</option>
                    <option>Media & Press</option>
                    <option>General Enquiries</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-(--eg-cyan) transition-colors bg-white resize-none"
                    placeholder="Please describe your enquiry..."
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white rounded-sm transition-all hover:opacity-90"
                    style={{ background: "var(--eg-cyan)" }}
                  >
                    Send Enquiry
                    <Send size={14} />
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
