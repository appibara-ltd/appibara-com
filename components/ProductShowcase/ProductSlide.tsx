"use client";

import React from "react";
import Image from "next/image";
import { AudiowaveText } from "@/components/AudiowaveText";
import { Pill } from "@/components/Pill";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Card } from "@/components/Card";
import { ProductPreviewMockup } from "./ProductPreviewMockup";
import { ShowcaseProduct } from "./types";
import { cn } from "@/lib/utils";
import { DuoIcon, DUO_ICONS } from "@/components/DuoIcon";

interface ProductSlideProps {
  product: ShowcaseProduct;
  totalCount?: number;
  isLast?: boolean;
  onScrollToNext?: () => void;
  nextProductTitle?: string;
  theme?: "light" | "dark";
}

const renderWithLinks = (text: string, linkUrl?: string) => {
  if (!linkUrl || !text.includes("NativeFlow: Client")) {
    return text;
  }
  const parts = text.split(/(NativeFlow:\s*Client(?:\s+App)?)/g);
  return parts.map((part, i) => {
    if (part.startsWith("NativeFlow:") || part.startsWith("NativeFlow :")) {
      return (
        <a
          key={i}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--brand-orange)] font-semibold underline decoration-[var(--brand-orange)]/40 hover:decoration-[var(--brand-orange)] hover:text-[var(--brand-orange-dark)] transition-colors inline-flex items-center gap-1"
        >
          <span>{part}</span>
          <DuoIcon icon={DUO_ICONS.arrowUpRightFromSquare} className="w-3 h-3 inline-block shrink-0" />
        </a>
      );
    }
    return part;
  });
};

export const ProductSlide: React.FC<ProductSlideProps> = ({
  product,
  totalCount = 5,
  isLast = false,
  onScrollToNext,
  nextProductTitle,
  theme: themeProp,
}) => {
  const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark">(
    product.uneedTheme || themeProp || "light"
  );

  React.useEffect(() => {
    if (product.uneedTheme) {
      setCurrentTheme(product.uneedTheme);
      return;
    }
    if (themeProp) {
      setCurrentTheme(themeProp);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        (!document.documentElement.classList.contains("light") && mediaQuery.matches);
      setCurrentTheme(isDark ? "dark" : "light");
    };

    updateTheme();
    mediaQuery.addEventListener("change", updateTheme);

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
      observer.disconnect();
    };
  }, [product.uneedTheme, themeProp]);

  const theme = product.uneedTheme || themeProp || currentTheme;
  return (
    <section
      id={product.id}
      data-product-slide
      className="w-full min-h-[calc(100vh-100px)] lg:min-h-[92vh] flex flex-col justify-center items-center py-10 md:py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24 snap-start"
    >
      <Card className="w-full max-w-[1340px] p-6 md:p-10 lg:p-12 transition-all duration-300 flex flex-col justify-between gap-8">
        {/* Main Content: Two Columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Product Info & Expanded Details (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Header Meta: Index number, Category pill */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-[var(--brand-orange)] bg-[var(--brand-orange)]/10 px-3 py-1 rounded-full border border-[var(--brand-orange)]/20">
                {product.number} / {String(totalCount).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)]">
                {product.category}
              </span>
              {product.isOpenSource && (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/25">
                  <DuoIcon icon={DUO_ICONS.code} className="w-3.5 h-3.5" />
                  <span>Open Source{product.license ? ` · ${product.license}` : ""}</span>
                </span>
              )}
            </div>

            {/* Title & Logo Row */}
            <div className="flex items-center gap-4">
              {product.logoUrl && (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[var(--bg-secondary)]/30 backdrop-blur-sm border border-[var(--border-light)] shadow-[inset_0_1px_0_0_var(--card-highlight)] p-2 flex items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src={product.logoUrl}
                    alt={`${product.title} logo`}
                    width={72}
                    height={72}
                    className={cn(
                      "w-full h-full",
                      product.logoUrl.endsWith(".jpg")
                        ? "object-cover rounded-full"
                        : "object-contain",
                    )}
                  />
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-audiowide leading-tight">
                  <AudiowaveText>{product.title}</AudiowaveText>
                </h3>
                <p className="text-base md:text-lg font-nunito font-semibold text-[var(--accent-primary)] mt-0.5">
                  {product.tagline}
                </p>
              </div>
            </div>

            {/* Extended Description */}
            <p className="font-nunito text-base md:text-[17px] text-[var(--text-secondary)] leading-relaxed">
              {renderWithLinks(
                product.extendedDescription,
                product.appStoreUrl,
              )}
            </p>

            {/* Expanded 4 Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[var(--bg-secondary)]/30 backdrop-blur-sm border border-[var(--border-light)] hover:border-[var(--brand-orange)]/30 shadow-[inset_0_1px_0_0_var(--card-highlight)] transition-all flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--brand-orange)] shrink-0">
                      <DuoIcon icon={feature.icon} className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm font-bold font-nunito text-[var(--text-primary)]">
                        {feature.title}
                      </span>
                      <span className="text-xs font-nunito text-[var(--text-secondary)] mt-0.5 leading-snug">
                        {renderWithLinks(
                          feature.description,
                          product.appStoreUrl,
                        )}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Tags / Pills */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {product.tags.map((tag, i) => (
                  <Pill key={i} className="text-xs">
                    {tag}
                  </Pill>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {product.websiteUrl && (
                <PrimaryButton
                  href={product.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<DuoIcon icon={DUO_ICONS.arrowUpRightFromSquare} className="w-4 h-4" />}
                >
                  {product.buttonText || `Launch ${product.title}`}
                </PrimaryButton>
              )}

              {product.githubUrl && (
                <SecondaryButton
                  href={product.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  }
                >
                  View on GitHub
                </SecondaryButton>
              )}

              {/* Uneed.best Badge for Learn SQL */}
              {product.id === "product-learnsql" && (
                <a
                  href="https://www.uneed.best/tool/learn-sql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 active:scale-95 inline-flex items-center shrink-0"
                >
                  <img
                    src={`https://www.uneed.best/badge/rating/learn-sql.svg?theme=${theme}`}
                    alt="Learn SQL rating on Uneed"
                    className="h-11 w-auto object-contain"
                  />
                </a>
              )}

              {/* Mobile Store Badges if available */}
              {product.appStoreUrl && (
                <a
                  href={product.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 active:scale-95 block h-10 w-auto"
                >
                  <Image
                    src="/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={130}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </a>
              )}

              {product.playStoreUrl && (
                <a
                  href={product.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 active:scale-95 block h-10 w-auto"
                >
                  <Image
                    src="/google-play-badge.svg"
                    alt="Get it on Google Play"
                    width={130}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Live Website / Screen Mockup (5 cols) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <ProductPreviewMockup product={product} />
          </div>
        </div>

        {/* Slide Bottom Navigation Hint */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px]">
              {product.isOpenSource
                ? `Open Source${product.license ? ` (${product.license})` : ""} · Production Live`
                : "Production Live"}
            </span>
          </div>

          {!isLast && onScrollToNext && (
            <button
              onClick={onScrollToNext}
              className="group flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--brand-orange)] font-medium transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-[var(--bg-secondary)]"
            >
              <span>Next: {nextProductTitle}</span>
              <DuoIcon icon={DUO_ICONS.chevronDown} className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          )}

          {isLast && (
            <div className="text-[11px] text-[var(--text-muted)] italic">
              Scroll down to get in touch with Appibara
            </div>
          )}
        </div>
      </Card>
    </section>
  );
};
