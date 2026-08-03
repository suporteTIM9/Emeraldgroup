import { FileText, Download, Calendar, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

const reports = [
  {
    category: "Annual Reports",
    items: [
      { title: "Emerald Group Annual Report 2024", date: "March 2025", type: "PDF", size: "4.2 MB" },
      { title: "Emerald Group Annual Report 2023", date: "March 2024", type: "PDF", size: "3.8 MB" },
      { title: "Emerald Group Annual Report 2022", date: "March 2023", type: "PDF", size: "3.5 MB" },
    ],
  },
  {
    category: "Financial Statements",
    items: [
      { title: "Consolidated Financial Statements H2 2024", date: "January 2025", type: "PDF", size: "2.1 MB" },
      { title: "Consolidated Financial Statements H1 2024", date: "August 2024", type: "PDF", size: "1.9 MB" },
      { title: "Consolidated Financial Statements 2023", date: "February 2024", type: "PDF", size: "2.4 MB" },
    ],
  },
  {
    category: "Portfolio Updates",
    items: [
      { title: "Portfolio Performance Review Q4 2024", date: "February 2025", type: "PDF", size: "1.5 MB" },
      { title: "Portfolio Performance Review Q3 2024", date: "November 2024", type: "PDF", size: "1.4 MB" },
      { title: "Banco Millennium Atlântico – 2024 Results", date: "January 2025", type: "PDF", size: "0.9 MB" },
    ],
  },
  {
    category: "Investor Presentations",
    items: [
      { title: "Investor Day Presentation 2024", date: "October 2024", type: "PDF", size: "5.7 MB" },
      { title: "Strategy Briefing – Africa Growth Markets", date: "June 2024", type: "PDF", size: "3.2 MB" },
      { title: "ESG & Sustainability Report 2024", date: "April 2024", type: "PDF", size: "2.8 MB" },
    ],
  },
];

function ReportsContent() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.97 0.003 240)" }}>
      <Navbar />
      <div className="pt-24">
        <Breadcrumb items={[{ label: "Reports Portal" }]} />
      </div>
      <div className="pb-20">
        {/* Header */}
        <div
          className="py-16"
          style={{
            background: `linear-gradient(135deg, oklch(0.10 0.02 165) 0%, oklch(0.20 0.10 155) 100%)`,
          }}
        >
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center"
                style={{ background: "var(--eg-cyan)" }}
              >
                <Shield size={16} color="white" />
              </div>
              <span className="section-label text-white/50">Private Area</span>
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Reports & Documents
            </h1>
            <p className="text-sm text-white/50 max-w-md leading-relaxed">
              Access Emerald Group's financial reports, investor presentations, and portfolio updates.
              All documents are confidential and for authorised recipients only.
            </p>
          </div>
        </div>

        {/* Reports grid */}
        <div className="container py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {reports.map((section) => (
              <div key={section.category} className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100">
                <div
                  className="px-6 py-4 border-b border-gray-50 flex items-center gap-3"
                  style={{ background: "oklch(0.99 0.003 240)" }}
                >
                  <FileText size={16} style={{ color: "var(--eg-cyan)" }} />
                  <h2 className="text-sm font-semibold text-gray-800">{section.category}</h2>
                  <span
                    className="ml-auto text-xs px-2 py-0.5 rounded-sm font-medium"
                    style={{ background: "oklch(0.97 0.008 200)", color: "var(--eg-cyan)" }}
                  >
                    {section.items.length} files
                  </span>
                </div>
                <div className="divide-y divide-gray-50">
                  {section.items.map((doc, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0 mr-4">
                        <div className="text-sm font-medium text-gray-800 truncate group-hover:text-(--eg-cyan) transition-colors">
                          {doc.title}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar size={10} />
                            {doc.date}
                          </span>
                          <span className="text-xs text-gray-300">·</span>
                          <span className="text-xs text-gray-400">{doc.type}</span>
                          <span className="text-xs text-gray-300">·</span>
                          <span className="text-xs text-gray-400">{doc.size}</span>
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-sm transition-all opacity-0 group-hover:opacity-100"
                        style={{ background: "var(--eg-cyan)", color: "white" }}
                        onClick={() => alert("Download feature coming soon. Documents will be available in the live portal.")}
                      >
                        <Download size={12} />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div
            className="mt-8 p-5 rounded-sm border text-xs text-gray-500 leading-relaxed"
            style={{ borderColor: "oklch(0.92 0.005 240)", background: "white" }}
          >
            <strong className="text-gray-700">Confidentiality Notice:</strong> The documents available in this
            portal are strictly confidential and intended solely for authorised investors and stakeholders of
            Emerald Group. Unauthorised access, distribution, or reproduction of these materials is strictly
            prohibited. By accessing this portal, you confirm that you are an authorised recipient.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function Reports() {
  return <ReportsContent />;
}
