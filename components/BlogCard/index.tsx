import React from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { BlogPost } from "@/lib/blog";
import { Calendar, Clock, ArrowRight, Pin } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  isLatest?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, isLatest = false }) => {
  return (
    <Card className="flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 hover:border-[var(--brand-orange)]/40 hover:shadow-[inset_0_1px_0_0_var(--card-highlight-hover),0_16px_36px_-6px_var(--shadow-color)] w-full group">
      <div>
        {/* Image Preview */}
        {post.imageUrl && (
          <Link
            href={`/blog/${post.slug}`}
            className="block overflow-hidden rounded-xl mb-4 aspect-video relative"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>
        )}

        {/* Pill Category & Pinned / New Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Pill>{post.categoryLabel}</Pill>
          {post.pinned && (
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold bg-[var(--bg-tertiary)] text-[var(--accent-primary)] px-2.5 py-1 rounded-full font-nunito shadow-sm border border-[var(--border-subtle)]">
              <Pin className="w-3 h-3 rotate-[30deg] fill-[var(--accent-primary)] stroke-none" /> Pinned
            </span>
          )}
          {isLatest && (
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
          <h2 className="text-xl md:text-2xl font-audiowide font-bold mb-3 text-[var(--text-primary)] hover:text-[var(--brand-orange)] transition-colors leading-tight">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="font-nunito text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-6">
          {post.excerpt}
        </p>
      </div>

      {/* Meta Info */}
      <div className="border-t border-[var(--border-subtle)] pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-nunito">
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
  );
};
