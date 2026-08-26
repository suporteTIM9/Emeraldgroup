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
  /** Articles sharing the same slideGroup render as one card that rotates between them. */
  slideGroup?: string;
}

export const articles: Article[] = [
  {
    slug: "banco-millennium-atlantico-2024",
    date: "May 2026",
    category: "Banking & Financial Services",
    tag: "Banking & Financial Services",
    title: "Banco Millennium Atlântico Increases Profit by 80.60% in Q1 2026",
    excerpt:
      "Figures extracted from Banco Millennium Atlântico's (BMA) balance sheet for the first 90 days of the current year indicate a robust performance in the ongoing financial year, reflecting an absolute increase in profit of AOA 2.29 billion (US$ 2.51 million).",
    image: "/IMGBLOG/Millennium-Angola.png",
    ctaLabel: "Explore Banco Millennium Atlântico",
    externalHref: "https://360angola.com/economy/banking/banco-millennium-atlantico-increases-profit-by-80-60-in-q1-2026/",
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
    slideGroup: "forbes-africa",
    excerpt:
      "As FORBES AFRICA prepares to celebrate its milestone 15th anniversary in October, the award-winning pan-African business magazine is launching The Dialogues series by FORBES AFRICA, a new live, in-person event platform designed to spark meaningful conversations around Africa's opportunities, ideas, innovations, and challenges.",
    content: `As FORBES AFRICA prepares to celebrate its milestone 15th anniversary in October, the award-winning pan-African business magazine is launching The Dialogues series by FORBES AFRICA, a new live, in-person event platform designed to spark meaningful conversations around Africa's opportunities, ideas, innovations, and challenges.`,
  },
  {
    slug: "emerald-group-acquires-40-stake-forbes-africa",
    date: "April 2024",
    category: "Telecom, Media & Technology",
    tag: "Telecom, Media & Technology",
    title: "Emerald Group acquires 40% stake in Forbes Africa",
    externalHref: "https://www.forbesafrica.com/press/2024/04/05/emerald-group-acquires-40-stake-in-forbes-africa2",
    ctaLabel: "Explore Emerald Group",
    slideGroup: "forbes-africa",
    excerpt:
      "Emerald Group expands African media footprint with strategic investment in Forbes Africa.",
    content: `Emerald Group expands African media footprint with strategic investment in Forbes Africa.`,
  },
  {
    slug: "hoti-hoteis-melia-luanda",
    date: "March 2024",
    category: "Urban Development & Real Estate",
    tag: "Urban Development & Real Estate",
    title: "Hoti Hotéis CEO announces opening of Meliá hotel in Luanda",
    externalHref: "https://forbesafricalusofona.com/ceo-da-hoti-hoteis-anuncia-abertura-de-hotel-melia-em-luanda/",
    ctaLabel: "Explore Hoti Hotéis",
    slideGroup: "urban-development",
    excerpt:
      "With contracts already signed, the five-star hotel, which will feature 250 rooms, will be built in the Waterfalls Complex, near the Fortaleza de São Miguel de Luanda.",
    content: `With contracts already signed, the five-star hotel, which will feature 250 rooms, will be built in the Waterfalls Complex, near the Fortaleza de São Miguel de Luanda.`,
  },
  {
    slug: "ngunu-tiny-hoti-melia-angola",
    date: "March 2024",
    category: "Urban Development & Real Estate",
    tag: "Urban Development & Real Estate",
    title: "N'Gunu Tiny partners with Hoti Group on Meliá Angola",
    externalHref: "https://www.jornaldenegocios.pt/empresas/detalhe/ngunu-tiny-e-parceiro-do-grupo-hoti-no-melia-angola",
    ctaLabel: "Explore Hoti at Meliá Angola",
    slideGroup: "urban-development",
    excerpt:
      "Portuguese group Hoti Hotéis will manage and hold a minority stake in Meliá Angola, which is set to open by 2028 at the latest. The majority shareholders are IBG Group and Emerald Group, owned by Angolan businessman N'Gunu Tiny.",
    content: `Portuguese group Hoti Hotéis will manage and hold a minority stake in Meliá Angola, which is set to open by 2028 at the latest. The majority shareholders are IBG Group and Emerald Group, owned by Angolan businessman N'Gunu Tiny.`,
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
    slug: "diaar-shaping-africa-property-landscape",
    date: "June 2026",
    category: "Urban Development & Real Estate",
    tag: "Urban Development & Real Estate",
    title: "Shaping Africa's Property Landscape",
    externalHref: "https://diaarproperties.com/",
    ctaLabel: "Explore Diaarproperties",
    excerpt:
      "Striving to transform Diaar Limited, an Emerald Group Company, into one of the Sub-Saharan Africa's leading property firms, offering competitive returns to investors and tangible benefits for cities and communities.",
    content: `Striving to transform Diaar Limited, an Emerald Group Company, into one of the Sub-Saharan Africa's leading property firms, offering competitive returns to investors and tangible benefits for cities and communities.`,
  },
  {
    slug: "emerald-global-resources-lvc-global-holdings",
    date: "February 2026",
    category: "Energy & Resources",
    tag: "Energy & Resources",
    title: "Emerald Resources and LVC Global Holdings Unite to Form Emerald Global Resources",
    excerpt:
      "Emerald Resources and LVC Global Holdings have come together to form Emerald Global Resources (EGR), launching a new Abu Dhabi–headquartered natural-resources platform designed to operate at scale across Africa and the wider Global South.",
    externalHref: "https://www.cnbcafrica.com/2026/emerald-resources-and-lvc-global-holdings-unite-to-form-emerald-global-resources",
    ctaLabel: "Explore cnbcafrica",
    slideGroup: "emerald-global-resources",
    content: `Emerald Resources and LVC Global Holdings have come together to form Emerald Global Resources (EGR), launching a new Abu Dhabi–headquartered natural-resources platform designed to operate at scale across Africa and the wider Global South.`,
  },
  {
    slug: "emerald-global-resources-lvc-global-holdings-forbes",
    date: "February 2026",
    category: "Energy & Resources",
    tag: "Energy & Resources",
    title: "Emerald Resources and LVC Global Holdings Unite to Form Emerald Global Resources",
    excerpt:
      "Emerald Resources and LVC Global Holdings have come together to form Emerald Global Resources (EGR), launching a new Abu Dhabi–headquartered natural-resources platform designed to operate at scale across Africa and the wider Global South.",
    externalHref: "https://www.forbesafrica.com/current-affairs/briefs/2026/02/02/emerald-resources-and-lvc-global-holdings-unite-to-form-emerald-global-resources",
    ctaLabel: "Explore LVC Global Holdings Unite",
    slideGroup: "emerald-global-resources",
    content: `Emerald Resources and LVC Global Holdings have come together to form Emerald Global Resources (EGR), launching a new Abu Dhabi–headquartered natural-resources platform designed to operate at scale across Africa and the wider Global South.`,
  },
  {
    slug: "nyu-executive-education",
    date: "April 2025",
    category: "Education & Leadership",
    tag: "Education & Leadership",
    title: "Executive Education",
    excerpt:
      "Join an exclusive cohort of executives at NYU in one of our week-long upcoming programs. Connect across industries through guided in-class collaboration, insightful discussions, and off-campus networking events.",
    externalHref: "https://www.sps.nyu.edu/connect/custom-educational-programs/lab-for-transformative-leadership/executive-education.html#Upcoming-Events-48812",
    ctaLabel: "Explore Education",
    content: `Join an exclusive cohort of executives at NYU in one of our week-long upcoming programs. Connect across industries through guided in-class collaboration, insightful discussions, and off-campus networking events.`,
  },
];

export const tagColors: Record<string, string> = {
  "Banking & Financial Services": "oklch(0.50 0.17 155)",
  "Telecom, Media & Technology": "oklch(0.50 0.17 155)",
  "Infrastructure": "oklch(0.50 0.17 155)",
  "Urban Development & Real Estate": "oklch(0.50 0.17 155)",
  "Energy & Resources": "oklch(0.50 0.17 155)",
  "Education & Leadership": "oklch(0.50 0.17 155)",
};
