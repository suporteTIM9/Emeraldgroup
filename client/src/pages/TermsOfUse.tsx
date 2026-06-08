import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "wouter";

const sections = [
  {
    title: "Acceptance of Terms",
    text:
      "Welcome to the Emerald Group website. Please read these Terms and Conditions carefully before using our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following Terms, which together with our privacy policy govern the Emerald Group’s relationship with you in relation to this website.",
  },
  {
    title: "Use of the Website",
    text:
      "The content of the pages of this website is for your general information and use only. It is subject to change without notice. Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.",
  },
  {
    title: "Warranty Disclaimer",
    text:
      "Neither the Emerald Group nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
  },
  {
    title: "Changes",
    text:
      "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material and consequential to privacy, we will try to provide at least 30 days’ notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
  },
  {
    title: "Intellectual Property",
    text:
      "This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited.",
  },
  {
    title: "Links to Other Websites",
    text:
      "From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).",
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
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
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
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
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
