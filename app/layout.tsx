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
  title: "Appibara | UI/UX-Focused Software & Design Studio",
  description: "Appibara is a design-centric software development studio specializing in Calm Technology, custom SaaS platform development, React Native mobile apps, and no-code tools.",
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
        style={{ backgroundColor: "#fafaf9" }}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
