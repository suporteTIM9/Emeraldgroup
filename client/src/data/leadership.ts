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
      { name: "N'Gunu Tiny", role: "Chairman of the Board of Directors", photo: "/leadership/ngunu-tiny.png" },
      { name: "Afzal Munshi", role: "Executive Board Member", photo: "/leadership/afzal-munshi.png" },
      { name: "Khalid Al Almiri", role: "Non-Executive Board Member" },
      { name: "Nathalie Poirier", role: "Non-Executive Board Member" },
      { name: "Virgílio Mendes", role: "Group Company Secretary", note: "*", photo: "/leadership/virgilio-mendes.png" },
    ],
    footnote: "*Appointed by the Board of Directors, not a Board Member.",
  },
  {
    heading: "Group Executive Board",
    members: [
      { name: "N'Gunu Tiny", role: "Chief Executive Officer", photo: "/leadership/ngunu-tiny.png" },
      { name: "Afzal Munshi", role: "President and Chief Operating Officer", photo: "/leadership/afzal-munshi.png" },
      { name: "Cristiana Nóbrega", role: "Chief Financial Officer", photo: "/leadership/cristiana-nobrega.png" },
      { name: "Raúl Bragança Neto", role: "Executive Board Member", spec: "Strategy & Investor Relations", photo: "/leadership/raul-braganca-neto.png" },
      { name: "Nicolas Khan-Roper", role: "Executive Board Member", spec: "Banking & M&A", photo: "/leadership/nicolas-khan-roper.png" },
      { name: "José Carlos Lourenço", role: "Executive Board Member", spec: "Media & Telecom", photo: "/leadership/jose-carlos-lourenco.png" },
      { name: "Américo Reis", role: "Executive Board Member", spec: "Property & Urban Development", photo: "/leadership/americo-reis.png" },
      { name: "Virgílio Mendes", role: "Executive Board Member", spec: "Legal & Advisory Business", photo: "/leadership/virgilio-mendes.png" },
    ],
  },
  {
    heading: "Senior Officers",
    members: [
      { name: "Eldine Zeferino", role: "Group Chief of Staff", photo: "/leadership/eldine-zeferino.png" },
      { name: "Joyce Nido", role: "Group Managing Director", spec: "UAE Office & Human Resources", photo: "/leadership/joyce-nido.png" },
      { name: "Sílvia Mendes", role: "Group Managing Director", spec: "Risk & Capital Markets", photo: "/leadership/silvia-mendes.png" },
      { name: "Temi Fernandes", role: "Group Managing Director", spec: "Investments", photo: "/leadership/temi-fernandes.png" },
      { name: "Delfina Franco", role: "Executive Director", spec: "The Office of The Chairman & CEO" },
      { name: "Ana Teixeira", role: "Managing Director", spec: "Africa Office Manager" },
      { name: "Rute Amorim", role: "Managing Director", spec: "Media9 Angola", photo: "/leadership/rute-amorim.png" },
    ],
  },
];
