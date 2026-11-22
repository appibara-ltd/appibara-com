import { readFile } from "node:fs/promises";
import path from "node:path";
import { POSTS, getPostBySlug, type BlogPost } from "./blog";

export const SITE_INFO = {
  name: "Appibara LTD",
  alternateName: "Appibara",
  url: "https://appibara.com",
  logo: "https://appibara.com/appibara_icon.png",
  tagline: "UI/UX-Focused Software & Design Studio",
  description:
    "Appibara is a design-centric software development studio specializing in Calm Technology, custom SaaS platform development, mobile apps, and no-code tools.",
  email: "contact@appibara.com",
  telephone: "+447719537367",
  responseWindow: "within 24 hours",
  address: {
    streetAddress: "Unit 501 Leroy House, 434-436 Essex Road",
    addressLocality: "London",
    postalCode: "N1 3FY",
    addressCountry: "GB",
  },
  sameAs: [
    "https://linkedin.com/company/appibara-ltd",
    "https://instagram.com/appibara_ltd",
    "https://appibara.medium.com",
    "https://substack.com/@appibara",
    "https://x.com/AppibaraLTD",
    "https://bsky.app/profile/appibara.com",
  ],
} as const;

export const ORGANIZATION_ID = `${SITE_INFO.url}/#organization`;
export const WEBSITE_ID = `${SITE_INFO.url}/#website`;

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: "eda",
    name: "Eda",
    role: "Co-Founder & CEO",
    bio: "Leads Appibara's product vision, UI/UX design direction, and client partnerships. Passionate about calm technology and human-centered interfaces that turn complex workflows into intuitive digital experiences.",
    image: "/eda.jpeg",
    linkedin: "https://www.linkedin.com/in/eda-hazal-tumer",
  },
  {
    id: "orkun",
    name: "Orkun",
    role: "Co-Founder & CTO",
    bio: "Architects Appibara's engineering foundation across scalable SaaS platforms, mobile apps, and developer tools. Focused on resilient cloud systems, crisp performance, and clean software craftsmanship.",
    image: "/orkun.jpeg",
    linkedin: "https://www.linkedin.com/in/tumerorkun",
  },
] as const;

export interface ServiceOffering {
  id: string;
  name: string;
  serviceType: string;
  description: string;
  features: readonly string[];
}

export const SERVICES_DATA: readonly ServiceOffering[] = [
  {
    id: "scalable-saas-product-engineering",
    name: "Scalable SaaS Product Engineering",
    serviceType: "Custom SaaS Platform Development",
    description:
      "Transform your business operations with our cutting-edge Software as a Service solutions. We specialize in creating scalable, cloud-based platforms that adapt to your growing needs.",
    features: [
      "Cloud-native architecture for maximum scalability",
      "Real-time data synchronization across devices",
      "Advanced security and compliance features",
      "Intuitive user interfaces and dashboards",
      "API-first design for seamless integrations",
    ],
  },
  {
    id: "native-and-cross-platform-mobile-applications",
    name: "Native & Cross-Platform Mobile Applications",
    serviceType: "Mobile Application Development",
    description:
      "Create engaging mobile experiences that connect with your audience. Our mobile applications combine beautiful design with powerful functionality for both iOS and Android platforms.",
    features: [
      "Native iOS and Android development",
      "Cross-platform solutions tailored to your architecture",
      "Offline functionality and data sync",
      "Push notifications and real-time updates",
      "App Store/Play Console optimizations and deployment",
    ],
  },
] as const;

export interface ProductEntry {
  id: string;
  number: string;
  name: string;
  category: string;
  applicationCategory: string;
  operatingSystem: string;
  tagline: string;
  description: string;
  features: readonly string[];
  url: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  logo: string;
  screenshot: string;
}

export const PRODUCTS_CATALOG: readonly ProductEntry[] = [
  {
    id: "nativeflow",
    number: "01",
    name: "NativeFlow",
    category: "No-Code Mobile & Web Platform",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web, iOS, Android",
    tagline: "Build real applications without writing code.",
    description:
      "Visual design, real-time testing, and production-ready code generation.",
    features: [
      "Own Your Code (GitHub Sync)",
      "Real-Time Device Preview",
      "One-Click Store Publish",
      "Visual Layout & Logic Engine",
    ],
    url: "https://nativeflow.app",
    appStoreUrl: "https://apps.apple.com/app/nativeflow-client/id6654910146",
    logo: `${SITE_INFO.url}/products/nativeflow_logo.png`,
    screenshot: `${SITE_INFO.url}/products/nativeflow_preview.png`,
  },
  {
    id: "kokono",
    number: "02",
    name: "KokoNo",
    category: "Lightweight Push Gateway & Webhooks",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "iOS, Android, CLI, Web",
    tagline: "Instant Push Notifications via Simple Webhooks.",
    description:
      "Developer-first notification hub for server alerts, CI/CD, and cron monitoring with end-to-end zero-knowledge encryption.",
    features: [
      "Simple Webhook API",
      "E2E Zero-Knowledge Encryption",
      "Official CLI Tool (npx)",
      "Multi-Device & Public Channels",
    ],
    url: "https://kokono.me/",
    appStoreUrl: "https://apps.apple.com/app/kokono/id6765647478",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.appibara.kokono",
    logo: `${SITE_INFO.url}/kokono_logo_v2.png`,
    screenshot: `${SITE_INFO.url}/products/kokono_preview.png`,
  },
  {
    id: "learn-sql",
    number: "03",
    name: "Learn SQL",
    category: "Interactive PostgreSQL & SaaS Analytics",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    tagline: "Master SQL for SaaS Analytics — zero setup, in your browser.",
    description:
      "Interactive browser-based PostgreSQL playground with a structured curriculum around real-world SaaS analytics.",
    features: [
      "Zero Setup (Powered by PGlite)",
      "Real-World SaaS Schema",
      "60-Step Structured Curriculum",
      "In-Browser SQL Playground",
    ],
    url: "https://learnsql.dev",
    logo: `${SITE_INFO.url}/learn-sql-logo.png`,
    screenshot: `${SITE_INFO.url}/products/learnsql_preview.png`,
  },
  {
    id: "nema",
    number: "04",
    name: "Nema",
    category: "GPU Graphics & Kinetic Shader Engine",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    tagline:
      "High-performance 60 FPS GPU canvas playground built with Skia & WebAssembly.",
    description:
      "High-performance 60 FPS GPU canvas playground built with Skia & WebAssembly.",
    features: [
      "Locked 60 FPS GPU Acceleration",
      "Reactive State to GLSL Binding",
      "Fluid & Kinetic Simulations",
      "Zero DOM Layout Tax",
    ],
    url: "https://nema.appibara.com",
    logo: `${SITE_INFO.url}/nema/logo.jpg`,
    screenshot: `${SITE_INFO.url}/products/nema_preview.png`,
  },
] as const;

export interface AdditionalResource {
  name: string;
  url: string;
  notes?: string;
}

export const ADDITIONAL_APPS: readonly AdditionalResource[] = [
  {
    name: "Case Closed",
    url: `${SITE_INFO.url}/case-closed`,
    notes: "Product page (Privacy Policy Markdown at /case-closed/privacy-policy.md)",
  },
  {
    name: "PrivaShot",
    url: `${SITE_INFO.url}/privashot`,
  },
] as const;

export function parsePostDateToIso(dateStr: string): string {
  const isoMatch = /^(\d{4}-\d{2}-\d{2})/.exec(dateStr.trim());
  if (isoMatch) {
    return isoMatch[1];
  }
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) {
    return dateStr;
  }
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getSortedPosts(): BlogPost[] {
  return [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function readBlogMarkdownRaw(slug: string): Promise<string | null> {
  const post = await getPostBySlug(slug);
  if (!post) {
    return null;
  }

  const filePath = path.join(
    process.cwd(),
    "markdown",
    "blog",
    `${post.slug}.md`,
  );

  try {
    const content = await readFile(filePath, "utf-8");
    return content.replace(/\r\n/g, "\n").trim();
  } catch {
    return null;
  }
}

export function formatBlogPostMarkdown(
  post: BlogPost,
  rawMarkdown: string,
): string {
  const isoDate = parsePostDateToIso(post.date);
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(post.title)}`,
    `url: ${JSON.stringify(`${SITE_INFO.url}/blog/${post.slug}`)}`,
    `markdownUrl: ${JSON.stringify(`${SITE_INFO.url}/blog/${post.slug}.md`)}`,
    `date: ${JSON.stringify(isoDate)}`,
    `category: ${JSON.stringify(post.categoryLabel)}`,
    `author: ${JSON.stringify(post.author)}`,
    `readTime: ${JSON.stringify(post.readTime)}`,
    `description: ${JSON.stringify(post.excerpt)}`,
    "---",
  ].join("\n");

  return `${frontmatter}\n\n${rawMarkdown.trim()}\n`;
}
