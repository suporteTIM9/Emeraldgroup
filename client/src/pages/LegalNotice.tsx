import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "wouter";

interface Section {
  number: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    number: "1.",
    title: "Acceptance of Terms",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-900 sm:text-base">
        <p>
          By accessing or using the Emerald Group website, you agree to be bound by these Terms and Conditions and our{" "}
          <Link href="/privacy" className="text-[#02d49e] hover:underline font-medium">
            Privacy Policy
          </Link>. If you do not agree to these terms, please stop using the website immediately.
        </p>
      </div>
    ),
  },
  {
    number: "2.",
    title: "Company Information",
    content: (
      <>
        <p className="mt-3 text-sm leading-7 text-slate-900 sm:text-base">
          This website is operated by:
        </p>
        <div className="mt-3 space-y-1 text-sm leading-7 text-slate-900 sm:text-base">
          <p><strong>Emerald Group.</strong></p>
          <p>Registered Address: 707A, Al Fattan Currency Tower 2, Dubai International Financial Centre (DIFC), Dubai, UAE.</p>
          <p>Email:{" "}
            <a href="mailto:info@emeraldgroup-inc.com" className="text-[#02d49e] hover:underline">
              info@emeraldgroup-inc.com
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    number: "3.",
    title: "Use of Website",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-900 sm:text-base">
        <p>
          The content on this website is for general informational purposes only and is subject to change without notice. Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
        </p>
        <p>
          You must not attempt unauthorized access to our systems, introduce viruses or malicious code, or disrupt website operations.
        </p>
      </div>
    ),
  },
  {
    number: "4.",
    title: "Intellectual Property",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-900 sm:text-base">
        <p>
          All material on this website, including but not limited to text, graphics, logos, layout, and software, is owned by or licensed to Emerald Group. Unauthorised reproduction, distribution, or commercial use of any content is strictly prohibited.
        </p>
      </div>
    ),
  },
  {
    number: "5.",
    title: "Warranty Disclaimer",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-900 sm:text-base">
        <p>
          This website and its contents are provided "as is" without warranties of any kind, express or implied. Emerald Group makes no guarantees regarding accuracy, completeness, or performance. To the fullest extent permitted by law, Emerald Group shall not be liable for any direct, indirect, or consequential damages arising from your use of this website.
        </p>
      </div>
    ),
  },
  {
    number: "6.",
    title: "Third-Party Links",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-900 sm:text-base">
        <p>
          This website may contain links to third-party websites for your convenience. Emerald Group does not control, endorse, or accept responsibility for the content, privacy policies, or practices of external sites.
        </p>
      </div>
    ),
  },
  {
    number: "7.",
    title: "Data Protection",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-900 sm:text-base">
        <p>
          Personal data collected through this website is processed in accordance with DIFC Law No. 5 of 2020 (DP Law) and applicable regulations.
        </p>
        <p>
          For detailed information, please refer to our{" "}
          <Link href="/privacy" className="text-[#02d49e] hover:underline font-medium">
            Privacy Policy
          </Link>.
        </p>
      </div>
    ),
  },
  {
    number: "8.",
    title: "Cookies",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-900 sm:text-base">
        <p>
          This website uses cookies to enhance user experience and analyze website traffic.
        </p>
        <p>
          By using this site, you consent to the use of cookies in accordance with our <strong>Cookie Policy</strong>.
        </p>
      </div>
    ),
  },
  {
    number: "9.",
    title: "Governing Law and Jurisdiction",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-900 sm:text-base">
        <p>
          This Legal Notice shall be governed by and construed in accordance with the laws of the Dubai International Financial Centre (DIFC) and applicable federal laws of the United Arab Emirates.
        </p>
        <p>
          Any disputes arising out of or in connection with this website shall be subject to the exclusive jurisdiction of the DIFC Courts.
        </p>
      </div>
    ),
  },
  {
    number: "10.",
    title: "Changes to Terms",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-900 sm:text-base">
        <p>
          Emerald Group reserves the right to modify these Terms at any time. All updates take effect immediately upon being posted on this website without prior notice. Your continued use of the website after changes are posted constitutes acceptance of the updated Terms.
        </p>
      </div>
    ),
  },
  {
    number: "11.",
    title: "Contact",
    content: (
      <div className="mt-3 text-sm leading-7 text-slate-900 sm:text-base">
        <p>For any questions regarding this Legal Notice, please contact us at:</p>
        <p className="mt-2">
          <a
            href="mailto:info@emeraldgroup-inc.com"
            className="inline-flex items-center gap-2 text-[#02d49e] hover:underline font-medium"
          >
            ✉ info@emeraldgroup-inc.com
          </a>
        </p>
      </div>
    ),
  },
];

export default function LegalNotice() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Legal Notice" }]} />

      <main className="container py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="pb-8 sm:pb-10">
            <div className="mb-16">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#02d49e] hover:text-white"
              >
                ← Back to homepage
              </Link>
            </div>
            <h1
              className="mb-4 font-bold tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
            >
              Emerald Group
            </h1>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#02d49e]">
              Legal Notice
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-900 sm:text-base">
              This Legal Notice governs your use of the Emerald Group website and outlines the terms, rights, and responsibilities applicable to all visitors.
            </p>
          </div>

          <div className="space-y-2">
            {sections.map((section) => (
              <section
                key={section.number}
                className="border-b border-slate-100 py-6 last:border-0"
              >
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  <span className="mr-2 text-[#02d49e]">{section.number}</span>
                  {section.title}
                </h2>
                {section.content}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
