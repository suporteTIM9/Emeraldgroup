import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "wouter";

const sections = [
  {
    title: "Acceptance of Terms",
    text:
      "By accessing or using the Emerald Group website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please stop using the website immediately.",
  },
  {
    title: "Use of Website",
    text:
      "The content on this website is for general informational purposes only and is subject to change without notice. Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements. You must not attempt unauthorized access to our systems, introduce viruses or malicious code, or disrupt website operations.",
  },
  {
    title: "Warranty Disclaimer",
    text:
      "This website and its contents are provided \"as is\" without warranties of any kind, express or implied. Emerald Group makes no guarantees regarding accuracy, completeness, or performance. To the fullest extent permitted by law, Emerald Group shall not be liable for any direct, indirect, or consequential damages arising from your use of this website.",
  },
  {
    title: "Changes to Terms",
    text:
      "Emerald Group reserves the right to modify these Terms at any time. All updates take effect immediately upon being posted on this website without prior notice. Your continued use of the website after changes are posted constitutes acceptance of the updated Terms.",
  },
  {
    title: "Intellectual Property",
    text:
      "All material on this website, including but not limited to text, graphics, logos, layout, and software, is owned by or licensed to Emerald Group. Unauthorised reproduction, distribution, or commercial use of any content is strictly prohibited.",
  },
  {
    title: "Third-Party Links",
    text:
      "This website may contain links to third-party websites for your convenience. Emerald Group does not control, endorse, or accept responsibility for the content, privacy policies, or practices of external sites.",
  },
  {
    title: "Governing Laws",
    text:
      "Your use of this website and any dispute arising out of such use of the website is subject to the laws of the UAE.",
  },
];

export default function TermsOfUse() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Terms of Use" }]} />

      <main className="container py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="pb-8 sm:pb-10">
            <div className="mb-4">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#02d49e] hover:text-white"
              >
                ← Back to homepage
              </Link>
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#02d49e]">
              Terms and conditions
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Terms of Use
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 sm:text-base" style={{ color: "var(--eg-dark)" }}>
              These Terms govern your use of the Emerald Group website. Please review them carefully.
            </p>
          </div>

          <div className="space-y-5">
            {sections.map((section) => (
              <section
                key={section.title}
                className="bg-white px-0 py-4 sm:px-1"
              >
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 sm:text-base" style={{ color: "var(--eg-dark)" }}>
                  {section.text}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
