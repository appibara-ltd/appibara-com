import { NextResponse } from "next/server";
import {
  SITE_INFO,
  getSortedPosts,
  parsePostDateToIso,
} from "@/lib/site-data";

export function GET() {
  const posts = getSortedPosts();

  const lines: string[] = [
    "# Appibara Blog — Markdown Index",
    "",
    "> Insights on Calm Technology, UI/UX craftsmanship, SaaS architecture, and mobile app engineering from the Appibara team.",
    "",
    `- Canonical HTML URL: ${SITE_INFO.url}/blog`,
    `- Studio Knowledge Map: ${SITE_INFO.url}/llms.txt`,
    `- Full Knowledge Base: ${SITE_INFO.url}/llms-full.txt`,
    `- Total Articles: ${posts.length}`,
    "",
    "## Articles",
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${SITE_INFO.url}/blog/${post.slug}.md) ([HTML](${SITE_INFO.url}/blog/${post.slug})): ${post.excerpt} — *${post.categoryLabel}*, ${parsePostDateToIso(post.date)}, ${post.readTime}`,
    ),
    "",
  ];

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Vary: "Accept",
      Link: `<${SITE_INFO.url}/blog>; rel="canonical"`,
      "X-Robots-Tag": "noindex",
    },
  });
}
