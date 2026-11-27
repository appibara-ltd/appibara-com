import React from "react";
import Image from "next/image";
import { DuoIcon, DUO_ICONS } from "@/components/DuoIcon";
import { ShowcaseProduct } from "./types";

interface ProductPreviewMockupProps {
  product: ShowcaseProduct;
}

export const ProductPreviewMockup: React.FC<ProductPreviewMockupProps> = ({
  product,
}) => {
  return (
    <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30 shadow-2xl transition-all duration-300 hover:border-[var(--brand-orange)]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
      {/* Browser Window Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-tertiary)]/70 backdrop-blur-md border-b border-[var(--border-subtle)]">
        {/* macOS Window Controls */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
        </div>

        {/* Real URL Address Bar */}
        <div className="flex items-center gap-2 bg-[var(--bg-primary)] px-4 py-1.5 rounded-full border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] max-w-[360px] w-full mx-2 shadow-inner">
          <DuoIcon icon={DUO_ICONS.lock} className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span className="truncate flex-1 select-none font-medium text-[var(--text-primary)]">
            {product.previewUrl}
          </span>
          <DuoIcon icon={DUO_ICONS.arrowRotateRight} className="w-3 h-3 text-[var(--text-muted)] hover:rotate-180 transition-transform cursor-pointer shrink-0" />
        </div>

        {/* Live Link Button */}
        <div className="flex items-center gap-2">
          {product.websiteUrl && (
            <a
              href={product.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${product.title} live website`}
              className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--brand-orange)] font-sans font-medium transition-colors px-2 py-1 rounded-md hover:bg-[var(--bg-primary)]"
            >
              <DuoIcon icon={DUO_ICONS.globe} className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live</span>
              <DuoIcon icon={DUO_ICONS.arrowUpRightFromSquare} className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Screen Body: Real Screenshot Display */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/10.5] bg-[var(--bg-primary)] overflow-hidden">
        {product.screenshotUrl && (
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={product.screenshotUrl}
              alt={`${product.title} live website screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              priority={product.number === "01"}
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Subtle glass hover overlay banner */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-white text-xs">
          <span className="font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Production Website
          </span>
          {product.websiteUrl && (
            <a
              href={product.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1.5"
            >
              <span>Visit Site</span>
              <DuoIcon icon={DUO_ICONS.arrowUpRightFromSquare} className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
