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
      { name: "N'Gunu Tiny", role: "Chairman of the Board of Directors", photo: "/leadership/ngunu-tiny.png", linkedin: "https://uk.linkedin.com/in/n-gunu-tiny" },
      { name: "Afzal Munshi", role: "Executive Board Member", photo: "/leadership/afzal-munshi.png", linkedin: "https://www.linkedin.com/in/afzal-munshi-05967017a" },
      { name: "Khalid Al Almiri", role: "Non-Executive Board Member" },
      { name: "Nathalie Poirier", role: "Non-Executive Board Member", linkedin: "https://www.linkedin.com/in/nathalie-poirier-ramakanth-43985546" },
      { name: "Virgílio Mendes", role: "Group Company Secretary", note: "*", photo: "/leadership/virgilio-mendes.png", linkedin: "https://www.linkedin.com/in/virgílio-mendes-38a66872" },
    ],
    footnote: "*Appointed by the Board of Directors, not a Board Member.",
  },
  {
    heading: "Group Executive Board",
    members: [
      { name: "N'Gunu Tiny", role: "Chief Executive Officer", photo: "/leadership/ngunu-tiny.png", linkedin: "https://uk.linkedin.com/in/n-gunu-tiny" },
      { name: "Afzal Munshi", role: "President and Chief Operating Officer", photo: "/leadership/afzal-munshi.png", linkedin: "https://www.linkedin.com/in/afzal-munshi-05967017a" },
      { name: "Cristiana Nóbrega", role: "Chief Financial Officer", photo: "/leadership/cristiana-nobrega.png", linkedin: "https://www.linkedin.com/in/cristiana-nóbrega-963b9519" },
      { name: "Raúl Bragança Neto", role: "Executive Board Member", spec: "Strategy & Investor Relations", photo: "/leadership/raul-braganca-neto.png", linkedin: "https://www.linkedin.com/in/raúl-bragança-neto-bb4b0838" },
      { name: "Nicolas Khan-Roper", role: "Executive Board Member", spec: "Banking & M&A", photo: "/leadership/nicolas-khan-roper.png", linkedin: "https://uk.linkedin.com/in/nicholaskhanroper" },
      { name: "José Carlos Lourenço", role: "Executive Board Member", spec: "Media & Telecom", photo: "/leadership/jose-carlos-lourenco.png", linkedin: "https://www.linkedin.com/in/josé-carlos-lourenço-598172b" },
      { name: "Américo Reis", role: "Executive Board Member", spec: "Property & Urban Development", photo: "/leadership/americo-reis.png", linkedin: "https://www.linkedin.com/in/américo-reis-494ab355" },
      { name: "Virgílio Mendes", role: "Executive Board Member", spec: "Legal & Advisory Business", photo: "/leadership/virgilio-mendes.png", linkedin: "https://www.linkedin.com/in/virgílio-mendes-38a66872" },
    ],
  },
  {
    heading: "Senior Officers",
    members: [
      { name: "Eldine Zeferino", role: "Group Chief of Staff", photo: "/leadership/eldine-zeferino.png", linkedin: "https://www.linkedin.com/in/eldine-zeferino-8941b1239" },
      { name: "Joyce Nido", role: "Group Managing Director", spec: "UAE Office & Human Resources", photo: "/leadership/joyce-nido.png", linkedin: "https://www.linkedin.com/in/joyce-ann-nido-55198a47" },
      { name: "Sílvia Mendes", role: "Group Managing Director", spec: "Risk & Capital Markets", photo: "/leadership/silvia-mendes.png", linkedin: "https://www.linkedin.com/in/silvia-vilarinho-morais-mendes-b304547a" },
      { name: "Temi Fernandes", role: "Group Managing Director", spec: "Investments", photo: "/leadership/temi-fernandes.png", linkedin: "https://www.linkedin.com/in/temi-tiny-rita-fernandes" },
      { name: "Delfina Franco", role: "Executive Director", spec: "The Office of The Chairman & CEO" },
      { name: "Ana Teixeira", role: "Managing Director", spec: "Africa Office Manager" },
      { name: "Rute Amorim", role: "Managing Director", spec: "Media9 Angola", photo: "/leadership/rute-amorim.png", linkedin: "https://www.linkedin.com/in/rute-amorim-50bb28a9" },
    ],
  },
];
