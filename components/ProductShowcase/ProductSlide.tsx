"use client";

import React from "react";
import Image from "next/image";
import { AudiowaveText } from "@/components/AudiowaveText";
import { Pill } from "@/components/Pill";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Card } from "@/components/Card";
import { ProductPreviewMockup } from "./ProductPreviewMockup";
import { ShowcaseProduct } from "./types";
import { cn } from "@/lib/utils";
import { ExternalLink, ChevronDown } from "lucide-react";

interface ProductSlideProps {
  product: ShowcaseProduct;
  isLast?: boolean;
  onScrollToNext?: () => void;
  nextProductTitle?: string;
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
          <ExternalLink className="w-3 h-3 inline-block shrink-0" />
        </a>
      );
    }
    return part;
  });
};

export const ProductSlide: React.FC<ProductSlideProps> = ({
  product,
  isLast = false,
  onScrollToNext,
  nextProductTitle,
}) => {
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
              <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-3 py-1 rounded-full border border-[var(--accent-primary)]/20">
                {product.number} / 04
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)]">
                {product.category}
              </span>
            </div>

            {/* Title & Logo Row */}
            <div className="flex items-center gap-4">
              {product.logoUrl && (
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-2.5 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                  <Image
                    src={product.logoUrl}
                    alt={`${product.title} logo`}
                    width={56}
                    height={56}
                    className={cn(
                      "w-full h-full",
                      product.logoUrl.endsWith(".jpg")
                        ? "object-cover rounded-full"
                        : "object-contain"
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
              {renderWithLinks(product.extendedDescription, product.appStoreUrl)}
            </p>

            {/* Expanded 4 Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {product.features.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[var(--bg-secondary)]/60 border border-[var(--border-subtle)] hover:border-[var(--brand-orange)]/30 transition-colors flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--brand-orange)] shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm font-bold font-nunito text-[var(--text-primary)]">
                        {feature.title}
                      </span>
                      <span className="text-xs font-nunito text-[var(--text-secondary)] mt-0.5 leading-snug">
                        {renderWithLinks(feature.description, product.appStoreUrl)}
                      </span>
                    </div>
                  </div>
                );
              })}
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
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  {product.buttonText || `Launch ${product.title}`}
                </PrimaryButton>
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
                    src="https://www.uneed.best/EMBED1.png"
                    alt="Featured on Uneed"
                    className="h-13 w-auto object-contain"
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
            <span className="font-mono text-[11px]">Production Live</span>
          </div>

          {!isLast && onScrollToNext && (
            <button
              onClick={onScrollToNext}
              className="group flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--brand-orange)] font-medium transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-[var(--bg-secondary)]"
            >
              <span>Next: {nextProductTitle}</span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
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
