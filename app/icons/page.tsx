import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { ORGANIZATION_ID, SITE_INFO, WEBSITE_ID } from "@/lib/site-data";
import type { IconManifest } from "@/lib/icons";
import { IconsExplorer } from "./IconsExplorer";

export const metadata: Metadata = {
  title: "Appibara Icons | Dual-Tone SVG Icon Library",
  description:
    "A calm-tech collection of dual-tone SVG vector icons across Duo and S Duo styles in Solid, Regular, Light, and Thin weights, ready for web and mobile interfaces.",
  alternates: {
    canonical: "/icons",
  },
};

const FALLBACK_MANIFEST: IconManifest = {
  size: 640,
  generatedAt: "",
  families: {
    duo: { label: "Duo", count: 0 },
    sduo: { label: "S Duo", count: 0 },
  },
};

async function readManifest(): Promise<IconManifest> {
  const manifestPath = path.join(
    process.cwd(),
    "public",
    "icons-data",
    "manifest.json",
  );
  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    return JSON.parse(raw) as IconManifest;
  } catch {
    return FALLBACK_MANIFEST;
  }
}

export default async function IconsPage() {
  const manifest = await readManifest();
  const totalIcons =
    (manifest.families.duo?.count ?? 0) + (manifest.families.sduo?.count ?? 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_INFO.url}/icons#page`,
    name: "Appibara Icons",
    url: `${SITE_INFO.url}/icons`,
    description:
      "Dual-tone SVG icon library across Duo and S Duo styles in Solid, Regular, Light, and Thin weights.",
    inLanguage: "en",
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    ...(totalIcons > 0 ? { numberOfItems: totalIcons } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="flex flex-col items-center font-audiowide pt-[120px] pb-16 min-h-[calc(100vh-105px)] w-full">
        <Header />
        <IconsExplorer initialManifest={manifest} />
      </main>
      <Footer />
    </>
  );
}
