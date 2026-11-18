"use client";

import React, { useEffect, useState } from "react";

interface NavSection {
  id: string;
  number: string;
  label: string;
  isProduct?: boolean;
}

const SECTIONS: NavSection[] = [
  { id: "home", number: "01", label: "Home" },
  { id: "who-we-are", number: "02", label: "Who We Are" },
  { id: "our-services", number: "03", label: "Our Services" },
  { id: "our-products", number: "04", label: "Our Products" },
  { id: "product-nativeflow", number: "05", label: "NativeFlow", isProduct: true },
  { id: "product-learnsql", number: "06", label: "Learn SQL", isProduct: true },
  { id: "product-kokono", number: "07", label: "KokoNo", isProduct: true },
  { id: "product-nema", number: "08", label: "Nema", isProduct: true },
  { id: "contact", number: "09", label: "Contact" },
];

export const PageNavigation: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      // 1. If at the very top of the page, highlight Home
      if (window.scrollY < 200) {
        setActiveId("home");
        return;
      }

      // 2. If at the very bottom of the page, highlight Contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveId("contact");
        return;
      }

      // 3. Find the section closest to the vertical center of the viewport
      const viewportCenter = window.innerHeight * 0.45;
      let currentActive = SECTIONS[0].id;
      let minDistance = Infinity;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Distance from the section's top/center to viewport center
          const sectionCenter = rect.top + rect.height * 0.5;
          const distance = Math.abs(sectionCenter - viewportCenter);

          // If the section is covering the viewport center
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            currentActive = section.id;
            break;
          }

          if (distance < minDistance) {
            minDistance = distance;
            currentActive = section.id;
          }
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Page navigation"
      className="hidden min-[1660px]:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-1.5 p-2.5 rounded-2xl bg-[var(--surface-off-white)]/85 backdrop-blur-md border border-[var(--border-subtle)] shadow-xl transition-all"
    >
      {SECTIONS.map((section, idx) => {
        const isActive = activeId === section.id;
        const isPrevSectionNonProduct = idx > 0 && !SECTIONS[idx - 1].isProduct && section.isProduct;
        const isNextSectionNonProduct = idx > 0 && SECTIONS[idx - 1].isProduct && !section.isProduct;

        return (
          <React.Fragment key={section.id}>
            {/* Subtle divider before products and after products */}
            {(isPrevSectionNonProduct || isNextSectionNonProduct) && (
              <div className="w-full h-px bg-[var(--border-subtle)] my-1" />
            )}

            <button
              onClick={() => scrollTo(section.id)}
              aria-label={`Jump to ${section.label} section`}
              className="group relative flex items-center justify-end cursor-pointer p-1.5 transition-all outline-none"
            >
              {/* Tooltip Label (Opens to the left on hover or active) */}
              <span
                className={`absolute right-7 px-2.5 py-1 rounded-md text-xs font-audiowide whitespace-nowrap shadow-sm pointer-events-none transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--brand-orange)] text-white font-bold opacity-100 translate-x-0"
                    : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75 mr-1.5">{section.number}</span>
                {section.label}
              </span>

              {/* Navigation Dot */}
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3 h-3 bg-[var(--brand-orange)] scale-125 ring-4 ring-[var(--brand-orange)]/20 shadow-sm"
                    : section.isProduct
                    ? "w-2.5 h-2.5 bg-[var(--brand-orange)]/40 hover:bg-[var(--brand-orange)]/80"
                    : "w-2.5 h-2.5 bg-[var(--border-primary)]/40 hover:bg-[var(--border-primary)]"
                }`}
              />
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
