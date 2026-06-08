import { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "wouter";

const sections = [
  {
    title: "Personal data protection",
    text:
      "The Emerald Group values your security and privacy and essentially follow the Data Protection Law, DIFC Law No. 5 of 2020 (the “DP Law”) and its Amendments. As such, it is the policy of the Emerald Group to respect the privacy of our website users. It is important to note that the Emerald Group does not collect information about you when you browse our website.",
  },
  {
    title: "Collecting and Using Your Personal Data",
    text:
      "If you contact us though our website contact page, the Emerald Group will keep all electronic record of such correspondence, including personal information shared by you at that time. The personal information you give us may include your name, address, e-mail address and phone number, as you choose to provide thereafter referred to as “Personal Data”. Further on, we will only collect and process additional Personal Data when they are shared by you directly to us, for business or employment reasons. In this respect, we will be corresponding with you directly by email, telephone or any other digital or electronic form. You will be responsible for the accuracy of the information you provide. The Emerald Group will modify or update your Personal Data in its databases upon your request. We will erase or archive from active use your Personal Data upon request, unless we are required to retain it in accordance with the applicable laws or to perform agreed services.",
  },
  {
    title: "How do we use your information?",
    text:
      "The Personal Data which you provide to us or we collect from you will be used to perform KYC and Due Diligence in case of any business synergy, to improve our website and services, and to protect our legal rights and interests.",
  },
  {
    title: "Who do we share your information with?",
    text:
      "We will take all steps reasonably necessary to ensure that your Personal Data is processed fairly and lawfully, in accordance with the applicable laws. By sharing your Personal Data with the Emerald Group, you agree to such storing or processing in order for the Emerald Group to perform its business. The Emerald Group does not engage in automated processing. Your personal data could only be shared with affiliates, which include our parent company and any other subsidiaries, joint venture partners or other companies that we control or that are under common control with us; and third parties, if we are required to do so by law or if we believe that sharing is necessary to protect our legal rights or interests.",
  },
  {
    title: "Retention of Your Personal Data",
    text:
      "Emerald Group will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy and to the extent necessary to comply with our legal obligations, such as to resolve disputes, and enforce our legal agreements and policies.",
  },
  {
    title: "How do we protect your information?",
    text:
      "The Emerald Group makes every effort to ensure that your Personal Data is secure on its system. The Emerald Group has staff dedicated to maintaining its data protection and security policies, periodically reviewing them and making sure that the Emerald Group employees are aware of its data protection and security practices. The Emerald Group uses industry-standard security measures and has established policies and procedures for securely managing information and protecting Personal Data against unauthorized access. We continually assess our data privacy, information management and security practices. Emerald will only share your information with third parties who have agreed to protect your information in accordance with this privacy policy. The security of your Personal Data is important to us, but remember that no method of transmission over the internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.",
  },
  {
    title: "Your rights",
    text:
      "You have the following rights with respect to your personal information: the right to access your personal information, the right to correct your personal information if it is inaccurate or incomplete, the right to request that we delete your personal information, the right to object to the processing of your personal information, and the right to withdraw your consent to the processing of your personal information. If you want to exercise your rights or have question about this policy, please contact the Emerald Group’s Compliance Department by email at compliance@emeraldgroup-inc.com or by letter at 707A Al Fattan Currency House, Tower 2, DIFC, Dubai, UAE.",
  },
  {
    title: "Changes to this Policy",
    text:
      "We may change this Policy from time to time and without notice. The latest version will always be posted on our website.",
  },
];

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar fixed={false} />
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />

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
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#02d49e]">
              Personal data protection
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              This Privacy Policy explains how Emerald Group handles personal information and your rights regarding your data.
            </p>
          </div>

          <div className="space-y-5">
            {sections.map((section) => (
              <section key={section.title} className="bg-white px-0 py-4 sm:px-1">
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
