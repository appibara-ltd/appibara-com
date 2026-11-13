import type { Metadata } from "next";
import { Nunito, Audiowide } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Appibara LTD",
  url: "https://appibara.com",
  logo: "https://appibara.com/appibara_icon.png",
  description:
    "Appibara is a design-centric software development studio specializing in Calm Technology, custom SaaS platform development, mobile apps, and no-code tools.",
  telephone: "+447719537367",
  email: "contact@appibara.com",
  address: {
    "@type": "PostalAddress",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${audiowide.variable} antialiased flex flex-col min-h-screen`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
