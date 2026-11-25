import { NextResponse } from "next/server";
import {
  ADDITIONAL_APPS,
  PRODUCTS_CATALOG,
  SERVICES_DATA,
  SITE_INFO,
  TEAM_MEMBERS,
  getSortedPosts,
  parsePostDateToIso,
  readBlogMarkdownRaw,
} from "@/lib/site-data";

export const dynamic = "force-static";

export async function GET() {
  const posts = getSortedPosts();
  const postBodies = await Promise.all(
    posts.map((post) => readBlogMarkdownRaw(post.slug)),
  );

  const sections: string[] = [
    `# ${SITE_INFO.name} — Complete Knowledge Base`,
    "",
    `> ${SITE_INFO.description}`,
    "",
    "## Studio Overview",
    "",
    `- **Company:** ${SITE_INFO.name}`,
    `- **Tagline:** ${SITE_INFO.tagline}`,
    `- **Website:** ${SITE_INFO.url}`,
    `- **Summary Map:** ${SITE_INFO.url}/llms.txt`,
    `- **Contact Email:** ${SITE_INFO.email} (response ${SITE_INFO.responseWindow})`,
    `- **Telephone:** ${SITE_INFO.telephone}`,
    `- **Address:** ${SITE_INFO.address.streetAddress}, ${SITE_INFO.address.addressLocality}, ${SITE_INFO.address.postalCode}, ${SITE_INFO.address.addressCountry}`,
    `- **Social Profiles:** ${SITE_INFO.sameAs.join(", ")}`,
    "",
    "## Leadership",
    "",
    ...TEAM_MEMBERS.flatMap((member) => [
      `### ${member.name} — ${member.role}`,
      "",
      member.bio,
      "",
      `- **LinkedIn:** ${member.linkedin}`,
      "",
    ]),
    "---",
    "",
    "## Services",
    "",
    ...SERVICES_DATA.flatMap((service) => [
      `### ${service.name}`,
      "",
      `- **Service Type:** ${service.serviceType}`,
      "",
      service.description,
      "",
      "Key features:",
      ...service.features.map((feature) => `- ${feature}`),
      "",
    ]),
    "---",
    "",
    "## Products",
    "",
    ...PRODUCTS_CATALOG.flatMap((product) => {
      const lines = [
        `### ${product.number}. ${product.name}`,
        "",
        `- **Category:** ${product.category}`,
        `- **Tagline:** ${product.tagline}`,
        `- **Website:** ${product.url}`,
      ];
      if (product.appStoreUrl) {
        lines.push(`- **App Store:** ${product.appStoreUrl}`);
      }
      if (product.playStoreUrl) {
        lines.push(`- **Google Play:** ${product.playStoreUrl}`);
      }
      if (product.githubUrl) {
        lines.push(`- **GitHub:** ${product.githubUrl}`);
      }
      if (product.isOpenSource) {
        lines.push(
          `- **License:** ${product.license ? `Open Source (${product.license})` : "Open Source"}`,
        );
      }
      if (product.description !== product.tagline) {
        lines.push("", product.description);
      }
      lines.push(
        "",
        "Key features:",
        ...product.features.map((feature) => `- ${feature}`),
        "",
      );
      return lines;
    }),
    "## Additional Products & Apps",
    "",
    ...ADDITIONAL_APPS.map((item) =>
      item.notes
        ? `- [${item.name}](${item.url}): ${item.notes}`
        : `- [${item.name}](${item.url})`,
    ),
    "",
    "---",
    "",
    `## Complete Blog Archive (${posts.length} Articles)`,
    "",
  ];

  posts.forEach((post, index) => {
    const rawBody = postBodies[index];
    const isoDate = parsePostDateToIso(post.date);

    sections.push(
      `### ${post.title}`,
      "",
      `- **HTML URL:** ${SITE_INFO.url}/blog/${post.slug}`,
      `- **Markdown URL:** ${SITE_INFO.url}/blog/${post.slug}.md`,
      `- **Date:** ${isoDate}`,
      `- **Category:** ${post.categoryLabel}`,
      `- **Author:** ${post.author}`,
      `- **Read Time:** ${post.readTime}`,
      `- **Summary:** ${post.excerpt}`,
      "",
      rawBody ?? post.excerpt,
      "",
      "---",
      "",
    );
  });

  return new NextResponse(sections.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Vary: "Accept",
    },
  });
}
