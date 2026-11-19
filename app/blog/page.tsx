"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { MotionSection } from "@/components/MotionSection";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { BlogCard } from "@/components/BlogCard";
import { AudiowaveText } from "@/components/AudiowaveText";
import { POSTS, CATEGORIES, BlogPost } from "@/lib/blog";
import { Calendar, Clock, ArrowRight, Pin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const latestPostSlug = POSTS.reduce((latest, current) => {
    return new Date(current.date).getTime() > new Date(latest.date).getTime()
      ? current
      : latest;
  }, POSTS[0])?.slug;

  const filteredPosts = (selectedCategory === "all"
    ? POSTS
    : POSTS.filter((post) => post.category === selectedCategory)
  ).sort((a, b) => {
    // 1. Pinned posts always come first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    // 2. Otherwise, sort by date in reverse chronological order (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <>
      <main className="flex flex-col items-center font-audiowide pt-[120px] pb-16 min-h-[calc(100vh-105px)] w-full">
        <Header />

        <MotionSection className="flex flex-col items-center w-full max-w-[1200px] px-6 gap-8">
          {/* Hero Header */}
          <div className="text-center flex flex-col items-center gap-4">
            <h1 className="text-[42px] md:text-[64px] leading-tight">
              <AudiowaveText>Blog</AudiowaveText>
            </h1>
            <p className="text-[18px] md:text-[20px] text-[var(--text-secondary)] max-w-[700px] font-nunito leading-relaxed">
              Reflections on design, engineering deep-dives, and calm solutions for complex digital experiences.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pb-2 w-full border-b border-[var(--border-subtle)]">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-full font-nunito font-semibold text-sm transition-all duration-300 cursor-pointer shadow-sm",
                    isActive
                      ? "bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-blue)] text-white scale-105"
                      : "bg-[var(--surface-off-white)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:scale-102 border border-[var(--border-subtle)]"
                  )}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Blog Cards Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8">
              {filteredPosts.map((post, index) => (
                <MotionSection
                  key={post.slug}
                  delay={(index % 3) * 0.05}
                  className="h-full flex"
                >
                  <BlogCard
                    post={post}
                    isLatest={post.slug === latestPostSlug}
                  />
                </MotionSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 font-nunito text-[var(--text-muted)]">
              No posts found in this category. Check back soon!
            </div>
          )}
        </MotionSection>
      </main>
      <Footer />
    </>
  );
}
