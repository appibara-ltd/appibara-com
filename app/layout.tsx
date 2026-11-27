import type { Metadata } from "next";
import { Nunito, Audiowide } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ORGANIZATION_ID, SITE_INFO, TEAM_MEMBERS, WEBSITE_ID } from "@/lib/site-data";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  preload: true
});
const audiowide = Audiowide({
  variable: "--font-audiowide",
  weight: "400",
  subsets: ["latin"],
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL("https://appibara.com"),
  title: "Appibara LTD | UI/UX-Focused Software & Design Studio",
  description: "Appibara is a design-centric software development studio specializing in Calm Technology, custom SaaS platform development, mobile apps, and no-code tools.",
  alternates: {
    canonical: "./",
  },
};

const structuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_INFO.name,
      alternateName: SITE_INFO.alternateName,
      url: SITE_INFO.url,
      logo: {
        "@type": "ImageObject",
        url: SITE_INFO.logo,
      },
      description: SITE_INFO.description,
      telephone: SITE_INFO.telephone,
      email: SITE_INFO.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_INFO.address.streetAddress,
        addressLocality: SITE_INFO.address.addressLocality,
        postalCode: SITE_INFO.address.postalCode,
        addressCountry: SITE_INFO.address.addressCountry,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE_INFO.email,
        telephone: SITE_INFO.telephone,
        availableLanguage: ["English"],
      },
      sameAs: [...SITE_INFO.sameAs],
      founder: TEAM_MEMBERS.map((member) => ({
        "@id": `${SITE_INFO.url}/#person-${member.id}`,
      })),
    },
    ...TEAM_MEMBERS.map((member) => ({
      "@type": "Person",
      "@id": `${SITE_INFO.url}/#person-${member.id}`,
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      image: `${SITE_INFO.url}${member.image}`,
      sameAs: [member.linkedin],
      worksFor: {
        "@id": ORGANIZATION_ID,
      },
    })),
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_INFO.name,
      url: SITE_INFO.url,
      description: SITE_INFO.description,
      inLanguage: "en",
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('appibara-theme');var r=document.documentElement;if(t==='dark'){r.classList.add('dark');r.classList.remove('light');}else if(t==='light'){r.classList.add('light');r.classList.remove('dark');}}catch(e){}})();",
          }}
        />
        <link
          rel="describedby"
          type="text/markdown"
          href="/llms.txt"
          title="AI-readable studio overview and site map"
        />
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms-full.txt"
          title="Complete AI-readable Markdown knowledge base"
        />
      </head>
      <body
        className={`${nunito.variable} ${audiowide.variable} antialiased flex flex-col min-h-screen`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGraph).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
