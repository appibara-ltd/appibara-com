import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/blog";
import {
  SITE_INFO,
  formatBlogPostMarkdown,
  readBlogMarkdownRaw,
} from "@/lib/site-data";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept",
      },
    });
  }

  const rawMarkdown = await readBlogMarkdownRaw(post.slug);
  if (rawMarkdown === null) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept",
      },
    });
  }

  const body = formatBlogPostMarkdown(post, rawMarkdown);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Vary: "Accept",
      Link: `<${SITE_INFO.url}/blog/${post.slug}>; rel="canonical"`,
      "X-Robots-Tag": "noindex",
    },
  });
}
