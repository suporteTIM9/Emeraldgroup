export interface ChairmanTalk {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image?: string;
  content?: string;
  externalHref?: string;
}

// PLACEHOLDER DATA — replace title, date, excerpt, content and image with the
// real Chairman's Talk material. Drop images into client/public/ChairmanTalk/
// and reference them below as "/ChairmanTalk/your-file.jpg".
export const chairmanTalks: ChairmanTalk[] = [
  {
    slug: "placeholder-talk-one",
    date: "Month Year",
    category: "Interview",
    title: "[Placeholder] Replace with the talk's real title",
    excerpt:
      "[Placeholder] Short one- or two-sentence summary of this talk goes here — replace with the real description.",
    image: "/ChairmanTalk/placeholder-1.jpg",
    content: `[Placeholder] Full text of the talk goes here.

Replace this paragraph — and add as many more as needed — with the actual content, split into paragraphs.`,
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
];
