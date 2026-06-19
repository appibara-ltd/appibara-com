import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appibara Blog | Insights on Calm Tech, UI/UX, & SaaS Development",
  description: "Read thoughts and guides on Calm Technology, software engineering craftsmanship, B2B SaaS strategies, and mobile app design from the Appibara team.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
