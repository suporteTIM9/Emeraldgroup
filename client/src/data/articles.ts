export interface Article {
  slug: string;
  date: string;
  category: string;
  tag: string;
  title: string;
  excerpt: string;
  image?: string;
  content?: string;
  externalHref?: string;
  /** Custom text for the card's CTA link. Defaults to "Read more". */
  ctaLabel?: string;
}

export const articles: Article[] = [
  {
    slug: "banco-millennium-atlantico-2024",
    date: "May 2026",
    category: "Banking & FS",
    tag: "Banking & FS",
    title: "Banco Millennium Atlântico Increases Profit by 80.60% in Q1 2026",
    excerpt:
      "Figures extracted from Banco Millennium Atlântico's (BMA) balance sheet for the first 90 days of the current year indicate a robust performance in the ongoing financial year, reflecting an absolute increase in profit of AOA 2.29 billion (US$ 2.51 million).",
    image: "/IMGBLOG/Millennium-Angola.png",
    ctaLabel: "Explore Banco Millennium Atlântico",
    externalHref: "https://relatorioecontas.atlantico.ao/2024/en/start/#1",
    content: `Figures extracted from Banco Millennium Atlântico's (BMA) balance sheet for the first 90 days of the current year indicate a robust performance in the ongoing financial year, reflecting an absolute increase in profit of AOA 2.29 billion (US$ 2.51 million).`,
  },
  {
    slug: "forbes-africa-durban-dialogues",
    date: "August 2026",
    category: "Telecom, Media & Technology",
    tag: "Telecom, Media & Technology",
    title: "FORBES AFRICA Launches ‘The Durban Dialogues’ Ahead Of 15th Anniversary",
    externalHref: "https://www.forbesafrica.com/press/2026/08/06/forbes-africa-launches-the-durban-dialogues-ahead-of-15th-anniversary",
    ctaLabel: "Explore FORBES AFRICA",
    excerpt:
      "As FORBES AFRICA prepares to celebrate its milestone 15th anniversary in October, the award-winning pan-African business magazine is launching The Dialogues series by FORBES AFRICA, a new live, in-person event platform designed to spark meaningful conversations around Africa's opportunities, ideas, innovations, and challenges.",
    content: `As FORBES AFRICA prepares to celebrate its milestone 15th anniversary in October, the award-winning pan-African business magazine is launching The Dialogues series by FORBES AFRICA, a new live, in-person event platform designed to spark meaningful conversations around Africa's opportunities, ideas, innovations, and challenges.`,
  },
  {
    slug: "ibg-grown-filda-2026",
    date: "July 2026",
    category: "Infrastructure",
    tag: "Infrastructure",
    title: "IBG & Grown at FILDA",
    externalHref: "https://www.linkedin.com/posts/ibg-na-filda-2026-ugcPost-7491470417300340736-08uX/",
    ctaLabel: "Explore IBG",
    excerpt:
      "Between meetings, exchanges and new opportunities, these were days of closeness and strengthened relationships, in a market where we continue to build with a vision for the future.",
    content: `Between meetings, exchanges and new opportunities, these were days of closeness and strengthened relationships, in a market where we continue to build with a vision for the future.`,
  },
  {
    slug: "one-luanda-phase-ii",
    date: "December 2024",
    category: "Urban Development",
    tag: "Urban Development",
    title: "ONE Luanda Phase II Launches to Strong Demand",
    externalHref: "#",
    excerpt:
      "The second phase of the landmark ONE Luanda development is officially launched, responding to exceptional demand for premium urban living in Angola.",
    content: `The second phase of the landmark ONE Luanda development is officially launched, responding to exceptional demand for premium urban living in Angola.

Phase II introduces an additional 240 premium residential units across two new towers, along with expanded retail and leisure amenities. The launch saw overwhelming interest from both local and international buyers.

ONE Luanda continues to redefine urban living standards in Luanda, setting new benchmarks for architecture, sustainability, and community living in Sub-Saharan Africa.`,
  },
  {
    slug: "nino-oil-exploration-licence",
    date: "November 2024",
    category: "Energy & Resources",
    tag: "Energy & Resources",
    title: "Nino Oil Secures New Exploration Licence",
    excerpt:
      "Nino Oil announces the award of a significant new exploration licence, expanding Emerald Group's footprint in the natural resources sector.",
    externalHref: "https://ninogas.com/",
    content: `Nino Oil announces the award of a significant new exploration licence, expanding Emerald Group's footprint in the natural resources sector.

The newly awarded licence covers a prospective acreage with strong geological indicators, building on Nino Oil's track record of responsible resource development in Sub-Saharan Africa.

The company remains committed to maximising local content, environmental stewardship, and sustainable value creation as it progresses its exploration programme.`,
  },
  {
    slug: "banko-digital-banking-three-markets",
    date: "October 2024",
    category: "Technology",
    tag: "Telecom & Technology",
    title: "Banko Launches Digital Banking Platform Across Three Markets",
    excerpt:
      "Emerald Group's digital banking arm, Banko, expands its innovative platform to three new markets, accelerating financial inclusion across the region.",
    externalHref: "https://www.retailbankerinternational.com/news/barko-plans-launch-digital-bank-south-africa/",
    content: `Emerald Group's digital banking arm, Banko, expands its innovative platform to three new markets, accelerating financial inclusion across the region.

The expansion brings Banko's mobile-first banking services to hundreds of thousands of previously underserved customers, offering payments, savings, and credit solutions through a seamless digital experience.

The launch marks a significant step in Emerald Group's digital transformation strategy, demonstrating the Group's commitment to leveraging technology as a driver of inclusive economic growth.`,
  },
];

export const tagColors: Record<string, string> = {
  "Banking & FS": "oklch(0.50 0.17 155)",
  "Telecom, Media & Technology": "oklch(0.75 0.12 80)",
  "Infrastructure": "oklch(0.50 0.17 155)",
  "Urban Development": "oklch(0.75 0.12 80)",
  "Energy & Resources": "oklch(0.50 0.17 155)",
  "Telecom & Technology": "oklch(0.75 0.12 80)",
};
