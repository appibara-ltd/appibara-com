"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { MotionSection } from "@/components/MotionSection";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { AudiowaveText } from "@/components/AudiowaveText";
import { POSTS, CATEGORIES, BlogPost } from "@/lib/blog";
import { Calendar, Clock, ArrowRight, Pin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const isRecentPost = (dateStr: string) => {
    try {
      const postDate = new Date(dateStr);
      const today = new Date();
      const diffTime = today.getTime() - postDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 30; // Within the last 30 days
    } catch {
      return false;
    }
  };

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
            <p className="text-[18px] md:text-[20px] text-gray-600 max-w-[700px] font-nunito leading-relaxed">
              Reflections on design, engineering deep-dives, and calm solutions for complex digital experiences.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pb-2 w-full border-b border-gray-100">
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
                      : "bg-[var(--surface-off-white)] text-gray-700 hover:bg-gray-100 hover:scale-102 border border-gray-100"
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
                  delay={index * 0.1}
                  className="h-full flex"
                >
                  <Card className="flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 border border-gray-100/50 hover:shadow-lg w-full group">
                    <div>
                      {/* Image Preview */}
                      {post.imageUrl && (
                        <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-xl mb-4 aspect-video relative">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </Link>
                      )}

                      {/* Pill Category & Pinned Badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Pill>{post.categoryLabel}</Pill>
                        {post.pinned && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold bg-[#fff0e0] text-[#e17100] px-2.5 py-1 rounded-full font-nunito shadow-sm border border-[#fff0e0]">
                            <Pin className="w-3 h-3 rotate-[30deg] fill-[#e17100] stroke-none" /> Pinned
                          </span>
                        )}
                        {isRecentPost(post.date) && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white px-2.5 py-1 rounded-full font-nunito shadow-sm border border-red-400/20">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            New
                          </span>
                        )}
                      </div>

                      {/* Post Title */}
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl md:text-2xl font-audiowide font-bold mb-3 text-gray-900 hover:text-[var(--brand-orange)] transition-colors leading-tight">
                          {post.title}
                        </h2>
                      </Link>

                      {/* Excerpt */}
                      <p className="font-nunito text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 font-nunito">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[var(--brand-orange)]" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[var(--brand-blue-light)]" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold font-nunito text-[var(--brand-orange)] hover:text-[var(--brand-orange-dark)] hover:translate-x-1 transition-all w-fit mt-1"
                      >
                        Read Post <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </Card>
                </MotionSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 font-nunito text-gray-500">
              No posts found in this category. Check back soon!
            </div>
          )}
        </MotionSection>
      </main>
      <Footer />
    </>
  );
}
