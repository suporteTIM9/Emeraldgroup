export interface Milestone {
  year: string;
  title: string;
  bullets: string[];
}

// ── Single source of truth for the company timeline ──
// Used by both the homepage Journey section and the dedicated /journey page.
export const milestones: Milestone[] = [
  {
    year: "2008",
    title: "Foundation: A New Model for Emerging Markets",
    bullets: [
      "Emerald Group is founded in response to the global financial crisis and the recognition that traditional investment models were ill-suited for many emerging and frontier markets.",
      "Core thesis: success in these markets requires local expertise, strong partnerships, and bespoke, executable strategies.",
    ],
  },
  {
    year: "2009",
    title: "Building the Platform",
    bullets: [
      "First advisory and investment mandates structured in selected African markets.",
      "Early partnerships formed with local entrepreneurs, financial institutions, and sector operators in energy, financial services, and media.",
      "Emerald begins to act as a connector between African opportunities and global capital.",
    ],
  },
  {
    year: "2013",
    title: "Sector Diversification and Regional Expansion",
    bullets: [
      "Expansion into additional sectors: natural resources, property and urban development, and telecoms.",
      "Geographic footprint extended across multiple African regions, leveraging a growing network of local partners and decision-makers.",
      "Board composition strengthened with professionals from investment banking, law, and industry, representing four continents.",
    ],
  },
  {
    year: "2017",
    title: "Institutionalisation and Governance",
    bullets: [
      "Formalisation of governance frameworks, risk management processes, and compliance functions.",
      "Introduction of more structured investment vehicles and co-investment platforms with institutional and family office capital.",
      "Enhanced focus on ESG considerations, local content, and sustainable socioeconomic impact as integral to investment decisions.",
    ],
  },
  {
    year: "2020",
    title: "Resilience Through Global Shocks",
    bullets: [
      "Active portfolio management and strategic repositioning in response to global macro shocks, commodity volatility, and shifting capital flows.",
      "Continued deployment into resilient sectors such as essential financial services, digital infrastructure, and media.",
      "Deepening of relationships with local stakeholders, including governments, regulators, and community partners.",
    ],
  },
  {
    year: "2022",
    title: "Strategic Consolidation and New Growth Themes",
    bullets: [
      "Consolidation of core sectors: energy, financial services, media & telecoms, property & urban development, and natural resources.",
      "Launch or scaling of targeted initiatives around energy transition, critical minerals, and digital infrastructure in Africa.",
      "Strengthening of the management committee and senior corporate officers across risk, investments, compliance, legal, and sector heads.",
    ],
  },
  {
    year: "2026",
    title: "Next Chapter, the Future: Connect. Create. Grow.",
    bullets: [
      "Connect: Systematically integrate African economies with global financial centres by aligning capital, expertise, and distribution.",
      "Create: Unlock high-growth opportunities and build scalable new markets in energy, financial services, digital infrastructure, and resources.",
      "Grow: Drive sustainable economic expansion, deliver measurable returns, and uplift communities across the continent.",
    ],
  },
];

export interface Chapter {
  numeral: string;
  era: string;
  title: string;
  tagline: string;
  accent: string;
  years: string[];
}

// ── Chapters group the milestones above into a narrative arc, each with its
//    own accent colour, for the dedicated /journey page. ──
export const chapters: Chapter[] = [
  {
    numeral: "I",
    era: "2008 – 2009",
    title: "Foundation",
    tagline: "Laying the groundwork for a new investment model in frontier markets.",
    accent: "oklch(0.30 0.06 165)",
    years: ["2008", "2009"],
  },
  {
    numeral: "II",
    era: "2013 – 2017",
    title: "Diversification & Expansion",
    tagline: "Broadening our footprint and building institutional strength.",
    accent: "var(--eg-cyan)",
    years: ["2013", "2017"],
  },
  {
    numeral: "III",
    era: "2020 – 2022",
    title: "Resilience & Consolidation",
    tagline: "Navigating global shocks and sharpening strategic focus.",
    accent: "var(--eg-orange)",
    years: ["2020", "2022"],
  },
  {
    numeral: "IV",
    era: "2026",
    title: "The Next Chapter",
    tagline: "Connect. Create. Grow.",
    accent: "#02d49e",
    years: ["2026"],
  },
];
