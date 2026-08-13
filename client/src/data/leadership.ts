export interface LeadershipMember {
  name: string;
  role: string;
  spec?: string;
  note?: string;
  /** Path under /public, e.g. "/leadership/ngunu-tiny.jpg". Omit to show initials. */
  photo?: string;
  /** Full LinkedIn profile URL. Omit to hide the icon. */
  linkedin?: string;
}

export interface LeadershipGroup {
  heading: string;
  members: LeadershipMember[];
  footnote?: string;
}

export const leadershipGroups: LeadershipGroup[] = [
  {
    heading: "Board of Directors",
    members: [
      { name: "N'Gunu Tiny", role: "Chairman of the Board of Directors" },
      { name: "Afzal Munshi", role: "Executive Board Member" },
      { name: "Khalid Al Almiri", role: "Non-Executive Board Member" },
      { name: "Nathalie Poirier", role: "Non-Executive Board Member" },
      { name: "Virgílio Mendes", role: "Group Company Secretary", note: "*" },
    ],
    footnote: "*Appointed by the Board of Directors, not a Board Member.",
  },
  {
    heading: "Group Executive Board",
    members: [
      { name: "N'Gunu Tiny", role: "Chief Executive Officer" },
      { name: "Afzal Munshi", role: "President and Chief Operating Officer" },
      { name: "Cristiana Nóbrega", role: "Chief Financial Officer" },
      { name: "Raúl Bragança Neto", role: "Executive Board Member", spec: "Strategy & Investor Relations" },
      { name: "Nicolas Khan-Roper", role: "Executive Board Member", spec: "Banking & M&A" },
      { name: "José Carlos Lourenço", role: "Executive Board Member", spec: "Media & Telecom" },
      { name: "Américo Reis", role: "Executive Board Member", spec: "Property & Urban Development" },
      { name: "Virgílio Mendes", role: "Executive Board Member", spec: "Legal & Advisory Business" },
    ],
  },
  {
    heading: "Senior Officers",
    members: [
      { name: "Eldine Zeferino", role: "Group Chief of Staff" },
      { name: "Joyce Nido", role: "Group Managing Director", spec: "UAE Office & Human Resources" },
      { name: "Sílvia Mendes", role: "Group Managing Director", spec: "Risk & Capital Markets" },
      { name: "Temi Fernandes", role: "Group Managing Director", spec: "Investments" },
      { name: "Delfina Franco", role: "Executive Director", spec: "The Office of The Chairman & CEO" },
      { name: "Ana Teixeira", role: "Managing Director", spec: "Africa Office Manager" },
      { name: "Rute Amorim", role: "Managing Director", spec: "Media9 Angola" },
    ],
  },
];
