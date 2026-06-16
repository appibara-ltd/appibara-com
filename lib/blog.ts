export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "trends" | "vision" | "kitchen";
  categoryLabel: string;
  author: string;
  readTime: string;
  pinned?: boolean;
  imageUrl?: string;
}

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "trends", label: "Trends & Agenda" },
  { id: "vision", label: "Vision & Philosophy" },
  { id: "kitchen", label: "Kitchen (Know-How)" },
] as const;

export const POSTS: BlogPost[] = [
  {
    slug: "calm-tech-101",
    title: "Calm Tech 101: Why Tech Should Leave You Alone, Instead of Constantly Sending You Notifications",
    excerpt: "Technology Shouldn’t Steal Your Attention; It Should Provide You with Calm and Productivity. Learn about the eight core principles of Calm Technology.",
    date: "October 2, 2025",
    category: "vision",
    categoryLabel: "Vision & Philosophy",
    author: "Appibara Team",
    readTime: "4 min read",
    pinned: true,
    imageUrl: "/blog/calm-tech-101/cover.png",
  },
  {
    slug: "why-calm-tech-will-define-the-experience-of-the-future",
    title: "Why Calm Tech Will Define the Experience of the Future",
    excerpt: "The future of experience isn't shaped by blaring technologies, but by technologies that work silently with us. Explore the economy of serenity and emotional layers of design.",
    date: "October 9, 2025",
    category: "vision",
    categoryLabel: "Vision & Philosophy",
    author: "Appibara Team",
    readTime: "4 min read",
    imageUrl: "/blog/why-calm-tech-will-define-the-experience-of-the-future/cover.png",
  },
  {
    slug: "is-ux-still-human-centered",
    title: "Is UX Still Human-Centered?",
    excerpt: "Is the world of design serving people, or is it now focused on the goals of products? A look at the history and strategic evolution of user experience design.",
    date: "October 16, 2025",
    category: "vision",
    categoryLabel: "Vision & Philosophy",
    author: "Appibara Team",
    readTime: "3 min read",
    imageUrl: "/blog/is-ux-still-human-centered/cover.png",
  },
  {
    slug: "why-emotional-design-still-matters",
    title: "Why Emotional Design Still Matters?",
    excerpt: "In an era where AI can write, draw, and even ‘feel’, emotional design isn’t just an aesthetic choice; it’s how products stay human.",
    date: "October 23, 2025",
    category: "vision",
    categoryLabel: "Vision & Philosophy",
    author: "Appibara Team",
    readTime: "4 min read",
    imageUrl: "/blog/why-emotional-design-still-matters/cover.png",
  },
  {
    slug: "what-is-an-mvp",
    title: "What Is an MVP? How to Know If Your Product Is Truly Viable",
    excerpt: "When transforming an idea into a product, understanding whether it is truly ‘viable’ is actually the most critical test.",
    date: "October 30, 2025",
    category: "kitchen",
    categoryLabel: "Kitchen (Know-How)",
    author: "Appibara Team",
    readTime: "4 min read",
    imageUrl: "/blog/what-is-an-mvp/cover.png",
  },
  {
    slug: "stop-guessing-start-measuring",
    title: "Stop Guessing, Start Measuring",
    excerpt: "Connecting UX design decisions to business return on investment (ROI) is no longer a luxury; it is a vital strategy to build products that survive.",
    date: "November 6, 2025",
    category: "kitchen",
    categoryLabel: "Kitchen (Know-How)",
    author: "Appibara Team",
    readTime: "5 min read",
    imageUrl: "/blog/stop-guessing-start-measuring/cover.jpeg",
  },
];

export async function getPosts(): Promise<BlogPost[]> {
  return POSTS;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return POSTS.find((post) => post.slug === slug);
}
