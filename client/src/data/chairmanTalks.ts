export interface ChairmanTalk {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image?: string;
  content?: string;
  externalHref?: string;
  videoHref?: string;
}

// Add new talks here as they're published — the first entry is the featured
// story, the rest stack in the "Other Talks" column/sidebar.
export const chairmanTalks: ChairmanTalk[] = [
  {
    slug: "global-south-new-forum-for-debate",
    date: "29 May 2026",
    category: "Press",
    title: "“Chairman’s Talk”: The Global South gains a new forum for debate",
    excerpt:
      "The platform, created by the founder and CEO of the Emerald Group, N’Gunu Tiny, presents itself as a premier forum for discussing concrete strategies in the fields of energy, finance and impact investment in emerging markets.",
    image: "/IMGBLOG/Emerald-Group_Graca-Machel-e-NGunu-Tiny_.png",
    content: `The aim of the “Chairman’s Talk” – a concept devised by N’Gunu Tiny, founder of the Emerald Group – is to deepen the debate on leadership within the context of the transformation of the Global South, taking the form of conversations with prominent figures from the political and business worlds.`,
    externalHref: "https://jornaleconomico.sapo.pt/noticias/chairmans-talk-sul-global-ganha-novo-espaco-de-debate/",
    videoHref: "https://www.youtube.com/channel/UCrnBL8q0JEbaoLKezzFn-mA",
  },
  {
    slug: "durao-barroso-new-global-balance-africa",
    date: "27 May 2026",
    category: "Press",
    title: "Durão Barroso calls for a “new global balance” and sees Africa as the future centre of global dynamism",
    excerpt:
      "Speaking in Luanda, the former President of the European Commission and former Portuguese Prime Minister stated that rebalancing international relations will be crucial to ensuring global stability and greater recognition of Africa’s role in the new geopolitical landscape.",
    image: "/IMGBLOG/the-chairmans-talk.jpeg",
    content: `Africa is of strategic importance for the future

When discussing the role of the African continent, Durão Barroso highlighted the region’s population growth and strategic potential, noting that Africa will play an increasingly significant role in international economic and political relations.`,
    externalHref: "https://forbesafricalusofona.com/durao-barroso-defende-novo-equilibrio-global-e-ve-africa-como-futuro-centro-de-dinamismo-mundial/",
    videoHref: "https://www.youtube.com/watch?v=h0amXOA7WgY&t=2754s",
  },
];
