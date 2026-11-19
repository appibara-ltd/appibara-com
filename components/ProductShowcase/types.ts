import { LucideIcon } from "lucide-react";

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ShowcaseProduct {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  extendedDescription: string;
  features: ProductFeature[];
  tags: string[];
  logoUrl: string;
  screenshotUrl: string;
  previewUrl: string;
  websiteUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  buttonText?: string;
  accentColor?: string;
  uneedTheme?: "light" | "dark";
}
