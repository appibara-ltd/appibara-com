import type { Metadata } from "next";
import { Nunito, Audiowide } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});
const audiowide = Audiowide({
  variable: "--font-audiowide",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Appibara",
  description: "Appibara LTD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${audiowide.variable} antialiased flex flex-col h-screen`}
        style={{ backgroundColor: "#fafaf9" }}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
