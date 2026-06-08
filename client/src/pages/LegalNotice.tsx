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
    title: "Company Information",
    content: (
      <>
        <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
          This website is operated by:
        </p>
        <div className="mt-3 space-y-1 text-sm leading-7 text-slate-700 sm:text-base">
          <p><strong>Emerald Group Inc.</strong></p>
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
    number: "2.",
    title: "Website Ownership",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
        <p>
          This website (<a href="https://emeraldgroup-inc.com/" target="_blank" rel="noopener noreferrer" className="text-[#02d49e] hover:underline">https://emeraldgroup-inc.com/</a>) and all its content, including but not limited to text, images, graphics, logos, icons, videos, and design elements, are the exclusive property of Emerald Group Inc., unless otherwise stated.
        </p>
        <p>
          Unauthorized use, reproduction, or distribution of any materials is strictly prohibited without prior written consent.
        </p>
      </div>
    ),
  },
  {
    number: "3.",
    title: "Intellectual Property Rights",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
        <p>
          All intellectual property rights related to this website are protected under applicable copyright, trademark, and intellectual property laws.
        </p>
        <p>
          Users may view and use content for personal and non-commercial purposes only. Any other use, including modification, reproduction, or commercial use, requires explicit authorization.
        </p>
      </div>
    ),
  },
  {
    number: "4.",
    title: "Limitation of Liability",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
        <p>
          The information provided on this website is for general informational purposes only.
        </p>
        <p>
          Emerald Group Inc. makes every effort to ensure accuracy and completeness but does not guarantee that all content is up to date, error-free, or complete.
        </p>
        <p>We shall not be held liable for:</p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
          <li>Any direct or indirect damages resulting from the use of this website</li>
          <li>Temporary unavailability or interruption of the website</li>
          <li>Errors, inaccuracies, or omissions in the content</li>
        </ul>
      </div>
    ),
  },
  {
    number: "5.",
    title: "External Links",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
        <p>
          This website may contain links to third-party websites for convenience and informational purposes.
        </p>
        <p>
          Emerald Group Inc. has no control over external websites and assumes no responsibility for their content, policies, or availability.
        </p>
      </div>
    ),
  },
  {
    number: "6.",
    title: "Data Protection",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
        <p>
          Any personal data collected through this website is processed in accordance with applicable data protection laws, including the General Data Protection Regulation (GDPR).
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
    number: "7.",
    title: "Cookies",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
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
    number: "8.",
    title: "Governing Law and Jurisdiction",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
        <p>
          This Legal Notice shall be governed by and interpreted in accordance with the laws of the UAE.
        </p>
        <p>
          Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the courts of Dubai.
        </p>
      </div>
    ),
  },
  {
    number: "9.",
    title: "Updates to This Legal Notice",
    content: (
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
        <p>
          Emerald Group Inc. reserves the right to modify or update this Legal Notice at any time without prior notice.
        </p>
        <p>
          Changes will be effective immediately upon publication on this page.
        </p>
      </div>
    ),
  },
  {
    number: "10.",
    title: "Contact",
    content: (
      <div className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
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
                className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#02d49e] hover:text-white"
              >
                ← Back to homepage
              </Link>
            </div>
            <h1
              className="mb-4 font-bold tracking-tight text-slate-900"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
            >
              Emerald Group Inc.
            </h1>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#02d49e]">
              Legal Notice
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
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
