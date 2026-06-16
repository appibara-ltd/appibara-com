import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { MotionSection } from "@/components/MotionSection";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { getPostBySlug, POSTS } from "@/lib/blog";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { promises as fs } from "fs";
import path from "path";

async function getPostMarkdownContent(slug: string): Promise<string> {
  const filePath = path.join(process.cwd(), "markdown", "blog", `${slug}.md`);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    console.error(`Error reading markdown for slug ${slug}:`, error);
    return "# Post Not Found\nThe content for this blog post could not be loaded.";
  }
}

export async function generateStaticParams() {
  return POSTS.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const markdownContent = await getPostMarkdownContent(slug);

  return (
    <>
      <main className="flex flex-col items-center font-audiowide pt-[120px] pb-16 min-h-[calc(100vh-105px)] w-full">
        <Header />
        
        <MotionSection className="flex flex-col items-center w-full max-w-[900px] px-6 gap-6">
          {/* Back Button Link */}
          <div className="w-full flex justify-start mb-2">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm font-semibold font-nunito text-gray-500 hover:text-[var(--brand-orange)] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>
          </div>

          {/* Main Card with Post Detail */}
          <Card className="flex flex-col gap-6 w-full p-6 md:p-12 border border-gray-100/50">
            {/* Header info */}
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-6">
              <Pill>{post.categoryLabel}</Pill>
              
              <h1 className="text-3xl md:text-[40px] font-audiowide font-bold text-gray-900 leading-tight">
                {post.title}
              </h1>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs md:text-sm text-gray-500 font-nunito mt-2">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[var(--brand-orange)]" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[var(--brand-blue-light)]" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>

            {/* Markdown Body Content */}
            <div className="w-full">
              <MarkdownViewer content={markdownContent} />
            </div>
          </Card>
        </MotionSection>
      </main>
      <Footer />
    </>
  );
}
