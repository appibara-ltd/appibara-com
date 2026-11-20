import { NextResponse } from "next/server";
import {
  ADDITIONAL_APPS,
  PRODUCTS_CATALOG,
  SERVICES_DATA,
  SITE_INFO,
  TEAM_MEMBERS,
  getSortedPosts,
  parsePostDateToIso,
} from "@/lib/site-data";

export function GET() {
  const posts = getSortedPosts();

  const lines: string[] = [
    `# ${SITE_INFO.name}`,
    "",
    `> ${SITE_INFO.description}`,
    "",
    `${SITE_INFO.name} is a ${SITE_INFO.tagline} based in ${SITE_INFO.address.addressLocality}, ${SITE_INFO.address.addressCountry}. We build calm, user-centric SaaS products, mobile applications, and developer tools.`,
    "",
    "## Studio & Contact",
    "",
    `- [Website](${SITE_INFO.url}): Official studio website and product showcase`,
    `- [Complete Knowledge Base (llms-full.txt)](${SITE_INFO.url}/llms-full.txt): Single-file Markdown dump containing all studio details, products, services, and full blog articles`,
    `- [Blog Index (Markdown)](${SITE_INFO.url}/blog.md): Machine-readable index of all published essays and engineering guides`,
    `- [XML Sitemap](${SITE_INFO.url}/sitemap.xml): Complete URL index for Appibara`,
    `- Email: ${SITE_INFO.email} (typical response ${SITE_INFO.responseWindow})`,
    `- Location: ${SITE_INFO.address.streetAddress}, ${SITE_INFO.address.addressLocality}, ${SITE_INFO.address.postalCode}, ${SITE_INFO.address.addressCountry}`,
    "",
    "## Leadership",
    "",
    ...TEAM_MEMBERS.map(
      (member) =>
        `- **${member.name}** (${member.role}): ${member.bio} ([LinkedIn](${member.linkedin}))`,
    ),
    "",
    "## Services",
    "",
    ...SERVICES_DATA.map(
      (service) =>
        `- **${service.name}** (${service.serviceType}): ${service.description} Key capabilities: ${service.features.join("; ")}.`,
    ),
    "",
    "## Products",
    "",
    ...PRODUCTS_CATALOG.map((product) => {
      const storeLinks = [
        product.appStoreUrl ? `[App Store](${product.appStoreUrl})` : null,
        product.playStoreUrl ? `[Google Play](${product.playStoreUrl})` : null,
      ]
        .filter(Boolean)
        .join(", ");
      const summary =
        product.tagline === product.description
          ? product.tagline
          : `${product.tagline} ${product.description}`;
      const suffix = storeLinks ? ` (${storeLinks})` : "";
      return `- [${product.name}](${product.url}): ${product.category} — ${summary}${suffix}`;
    }),
    "",
    "## Additional Products & Apps",
    "",
    ...ADDITIONAL_APPS.map((item) =>
      item.notes
        ? `- [${item.name}](${item.url}): ${item.notes}`
        : `- [${item.name}](${item.url})`,
    ),
    "",
    `## Blog Articles (${posts.length} Posts in Markdown)`,
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${SITE_INFO.url}/blog/${post.slug}.md): ${post.excerpt} (${post.categoryLabel}, ${parsePostDateToIso(post.date)})`,
    ),
    "",
    "## Optional",
    "",
    `- [Privacy Policy](${SITE_INFO.url}/privacy-policy): Studio privacy policy`,
    `- [Terms and Conditions](${SITE_INFO.url}/terms-and-conditions): Studio terms of service`,
    `- [Cookie Policy](${SITE_INFO.url}/cookie-policy): Cookie usage disclosure`,
    `- [Case Closed Privacy Policy (Markdown)](${SITE_INFO.url}/case-closed/privacy-policy.md): Privacy policy for Case Closed`,
    `- [KokoNo Privacy Policy](${SITE_INFO.url}/projects/kokono/privacy-policy): Privacy policy for KokoNo`,
    `- [KokoNo Terms and Conditions](${SITE_INFO.url}/projects/kokono/terms-conditions): Terms for KokoNo`,
    `- [SelfyMon Privacy Policy](${SITE_INFO.url}/projects/selfymon/privacy-policy): Privacy policy for SelfyMon`,
    `- [SelfyMon Terms and Conditions](${SITE_INFO.url}/projects/selfymon/terms-and-conditions): Terms for SelfyMon`,
    "",
  ];

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Vary: "Accept",
    },
  });
}
