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
}

export const articles: Article[] = [
  {
    slug: "banco-millennium-atlantico-2024",
    date: "March 2025",
    category: "Banking & Finance",
    tag: "Financial Services",
    title: "Banco Millennium Atlântico Reports Record Growth in 2024",
    excerpt:
      "Angola's leading commercial bank posts its strongest annual results, driven by digital transformation and expanded retail banking services.",
    image: "/IMGBLOG/Millennium-Angola.png",
    externalHref: "https://relatorioecontas.atlantico.ao/2024/en/start/#1",
    content: `Banco Millennium Atlântico (BMA) ended 2024 with a net profit of 16.8 billion Angolan kwanzas (17.6 million euros), representing an 85% increase on the previous year's results, according to the local newspaper Telegrama.

Despite the rise in profits, core revenues fell, according to the local newspaper.

The Angolan bank, 22.5% owned by BCP África SGPS, has been reported to be up for sale, a claim the bank led by Miguel Raposo Alves has denied.

Angolan newspapers have reported that there are parties interested in buying Millennium Atlântico and have mentioned negotiations with First Bank and interest from Access Bank Plc. The bank has denied that First Bank is in the running.`,
  },
  {
    slug: "forbes-africa-15-years",
    date: "February 2025",
    category: "Media",
    tag: "Media & Technology",
    title: "Forbes Africa Celebrates 15 Years of Business Journalism",
    externalHref: "#",
    excerpt:
      "Forbes Africa marks a milestone anniversary, reaffirming its commitment to showcasing Africa's most influential business leaders and entrepreneurs.",
    content: `Forbes Africa marks a milestone anniversary, reaffirming its commitment to showcasing Africa's most influential business leaders and entrepreneurs.

Over the past 15 years, Forbes Africa has grown to become the continent's premier business media platform, featuring the stories of entrepreneurs, investors, and innovators who are shaping Africa's economic future.

The anniversary edition features exclusive interviews with Africa's leading CEOs and a special retrospective on the continent's most transformative business moments of the past decade and a half.`,
  },
  {
    slug: "emerald-infrastructure-logistics-hub",
    date: "January 2025",
    category: "Infrastructure",
    tag: "Infrastructure",
    title: "Emerald Infrastructure Breaks Ground on New Logistics Hub",
    externalHref: "#",
    excerpt:
      "Emerald Infrastructure announces the commencement of construction on a major logistics and distribution hub, set to transform supply chain capabilities.",
    content: `Emerald Infrastructure announces the commencement of construction on a major logistics and distribution hub, set to transform supply chain capabilities across the region.

The new facility, strategically located to serve as a regional gateway, will feature state-of-the-art warehousing, cold chain capabilities, and multimodal transport connections. The hub is expected to create over 500 direct jobs upon completion.

The project represents a significant milestone in Emerald Group's infrastructure strategy, reinforcing its commitment to developing critical assets that underpin economic growth.`,
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
    category: "Natural Resources",
    tag: "Natural Resources",
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
  "Financial Services": "oklch(0.50 0.17 155)",
  "Media & Technology": "oklch(0.75 0.12 80)",
  "Infrastructure": "oklch(0.50 0.17 155)",
  "Urban Development": "oklch(0.75 0.12 80)",
  "Natural Resources": "oklch(0.50 0.17 155)",
  "Telecom & Technology": "oklch(0.75 0.12 80)",
};
