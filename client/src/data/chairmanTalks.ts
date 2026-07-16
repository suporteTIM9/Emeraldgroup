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

// PLACEHOLDER DATA — replace title, date, excerpt, content and image with the
// real Chairman's Talk material. Drop images into client/public/ChairmanTalk/
// and reference them below as "/ChairmanTalk/your-file.jpg".
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
    slug: "placeholder-talk-two",
    date: "Month Year",
    category: "Keynote",
    title: "[Placeholder] Replace with the talk's real title",
    excerpt:
      "[Placeholder] Short one- or two-sentence summary of this talk goes here — replace with the real description.",
    image: "/ChairmanTalk/placeholder-2.jpg",
    content: `[Placeholder] Full text of the talk goes here.

Replace this paragraph — and add as many more as needed — with the actual content, split into paragraphs.`,
  },
  {
    slug: "placeholder-talk-three",
    date: "Month Year",
    category: "Op-Ed",
    title: "[Placeholder] Replace with the talk's real title",
    excerpt:
      "[Placeholder] Short one- or two-sentence summary of this talk goes here — replace with the real description.",
    image: "/ChairmanTalk/placeholder-3.jpg",
    content: `[Placeholder] Full text of the talk goes here.

Replace this paragraph — and add as many more as needed — with the actual content, split into paragraphs.`,
  },
  {
    slug: "placeholder-talk-four",
    date: "Month Year",
    category: "Feature",
    title: "[Placeholder] Replace with the talk's real title",
    excerpt:
      "[Placeholder] Short one- or two-sentence summary of this talk goes here — replace with the real description.",
    image: "/ChairmanTalk/placeholder-4.jpg",
    content: `[Placeholder] Full text of the talk goes here.

Replace this paragraph — and add as many more as needed — with the actual content, split into paragraphs.`,
  },
];
