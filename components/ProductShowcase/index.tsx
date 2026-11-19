"use client";

import React, { useRef } from "react";
import { AudiowaveText } from "@/components/AudiowaveText";
import { ProductSlide } from "./ProductSlide";
import { ShowcaseProduct } from "./types";
import {
  Layers,
  Smartphone,
  Zap,
  Workflow,
  Cpu,
  BarChart3,
  Code2,
  Terminal,
  Radio,
  Clock,
  Bell,
  Sliders,
  Sparkles,
  Gauge,
  ChevronDown,
  GitBranch,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

export const PRODUCTS_DATA: ShowcaseProduct[] = [
  {
    id: "product-nativeflow",
    number: "01",
    category: "No-Code Mobile & Web Platform",
    title: "NativeFlow",
    tagline: "Build real applications without writing code.",
    description:
      "Design, preview, and deploy your mobile project — instantly, from your browser. All source code automatically syncs to your personal GitHub with zero vendor lock-in.",
    extendedDescription:
      "NativeFlow bridges the gap between visual design and production-grade mobile engineering. Build cross-platform apps visually in your browser with the Meta Yoga layout engine, preview live on your physical iPhone via NativeFlow: Client App, and publish directly to the App Store & Google Play — while your entire source code automatically syncs to your personal GitHub repository.",
    features: [
      {
        icon: GitBranch,
        title: "Own Your Code (GitHub Sync)",
        description: "All source code automatically syncs to your personal GitHub repository — no vendor lock-in.",
      },
      {
        icon: Smartphone,
        title: "Real-Time Device Preview",
        description: "Preview projects live on your phone as you build; scan a QR code with NativeFlow: Client App.",
      },
      {
        icon: Zap,
        title: "One-Click Store Publish",
        description: "Connect your developer accounts and deploy to the App Store and Google Play via automated CI/CD.",
      },
      {
        icon: Layers,
        title: "Visual Layout & Logic Engine",
        description: "Powered by Meta Yoga engine, visually assemble responsive interfaces compiled to clean native code.",
      },
    ],
    tags: ["No-Code", "Mobile App Builder", "GitHub Sync", "Own Your Code", "iOS & Android"],
    logoUrl: "/products/nativeflow_logo.png",
    screenshotUrl: "/products/nativeflow_preview.png",
    previewUrl: "https://nativeflow.app",
    websiteUrl: "https://nativeflow.app",
    appStoreUrl: "https://apps.apple.com/app/nativeflow-client/id6654910146",
    buttonText: "Try NativeFlow for Free",
  },
  {
    id: "product-kokono",
    number: "02",
    category: "Lightweight Push Gateway & Webhooks",
    title: "KokoNo",
    tagline: "Instant Push Notifications via Simple Webhooks.",
    description:
      "Send alerts, build notifications, and trigger system status logs directly to your mobile devices with a clean, lightspeed POST request. No heavy integrations, just simple hooks.",
    extendedDescription:
      "KokoNo is a lightweight notification gateway that delivers instant mobile alerts without heavy third-party SDKs, complex APNs certificates, or token exchanges. Trigger push alerts directly via standard HTTP POST webhooks, send command-line alerts with the official CLI, or protect sensitive server logs using zero-knowledge E2E encryption.",
    features: [
      {
        icon: Terminal,
        title: "Simple Webhook API",
        description: "No complex authentication frameworks or token exchanges. Trigger connections with a clean POST request.",
      },
      {
        icon: ShieldCheck,
        title: "E2E Zero-Knowledge Encryption",
        description: "Zero-knowledge security (ECIES: X25519 & AES-256-GCM). Payloads are decrypted strictly on-device.",
      },
      {
        icon: Radio,
        title: "Official CLI Tool (npx)",
        description: "Fire instantaneous alerts from terminal, bash scripts, or CI/CD pipelines via npx @cmd-bin/kokono.",
      },
      {
        icon: Bell,
        title: "Multi-Device & Public Channels",
        description: "Link multiple devices to a single webhook, or create public channels for team coordination.",
      },
    ],
    tags: ["Developer Tool", "Webhooks", "E2E Encryption", "CLI Tool", "iOS & Android"],
    logoUrl: "/kokono_logo_v2.png",
    screenshotUrl: "/products/kokono_preview.png",
    previewUrl: "https://kokono.me",
    websiteUrl: "https://kokono.me/",
    appStoreUrl: "https://apps.apple.com/app/kokono/id6765647478",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.appibara.kokono",
    buttonText: "Visit KokoNo",
  },
  {
    id: "product-learnsql",
    number: "03",
    category: "Interactive PostgreSQL & SaaS Analytics",
    title: "Learn SQL",
    tagline: "Master SQL for SaaS Analytics — zero setup, in your browser.",
    description:
      "Learn database queries practically without installing anything. Run embedded PostgreSQL directly in your browser using our built-in training database.",
    extendedDescription:
      "Learn SQL is a modern, distraction-free platform engineered to turn you into a data expert. Powered by PGlite (PostgreSQL compiled to WebAssembly), it runs a full, real PostgreSQL engine entirely client-side. Practice real-world SaaS metrics — analyzing customer cohorts, MRR movements, churn rates, and payments on a realistic mock schema through a structured 60-step curriculum.",
    features: [
      {
        icon: Cpu,
        title: "Zero Setup (Powered by PGlite)",
        description: "Real embedded PostgreSQL running in your browser via WebAssembly — no servers or installation.",
      },
      {
        icon: BarChart3,
        title: "Real-World SaaS Schema",
        description: "Query actual subscription tiers, MRR analytics, invoices, and customer cohorts for Acme Cloud Analytics.",
      },
      {
        icon: BookOpen,
        title: "60-Step Structured Curriculum",
        description: "Structured learning path from Beginner (filters, aggregates) to Advanced (Joins, Window Functions, CTEs).",
      },
      {
        icon: Code2,
        title: "In-Browser SQL Playground",
        description: "Real-time query execution, interactive schema explorer, instant feedback, and progress tracking.",
      },
    ],
    tags: ["PostgreSQL", "PGlite Wasm", "SaaS Analytics", "Window Functions", "Interactive Learning"],
    logoUrl: "/learn-sql-logo.png",
    screenshotUrl: "/products/learnsql_preview.png",
    previewUrl: "https://learnsql.dev",
    websiteUrl: "https://learnsql.dev",
    buttonText: "Start Coding for Free",
  },
  {
    id: "product-nema",
    number: "04",
    category: "GPU Graphics & Kinetic Shader Engine",
    title: "Nema",
    tagline: "High-performance 60 FPS GPU canvas playground built with Skia & WebAssembly.",
    description:
      "A real-time fluid kinetic shader engine built using Google Skia (CanvasKit) and WebAssembly, mapping GLSL shaders to reactive state with zero DOM layout tax.",
    extendedDescription:
      "Nema unleashes the raw graphics power of Google Skia (CanvasKit) compiled to WebAssembly for modern web applications. Connect reactive component state directly to GLSL fragment shaders and fluid physics simulations with sub-millisecond frame times, hardware-accelerated locked 60 FPS rendering, and absolutely zero DOM layout overhead.",
    features: [
      {
        icon: Gauge,
        title: "Locked 60 FPS GPU Acceleration",
        description: "Sub-millisecond GPU draw calls powered by Google Skia (CanvasKit) WebAssembly engine.",
      },
      {
        icon: Sliders,
        title: "Reactive State to GLSL Binding",
        description: "Real-time uniform syncing between UI state and GLSL fragment shaders with zero latency.",
      },
      {
        icon: Sparkles,
        title: "Fluid & Kinetic Simulations",
        description: "Real-time interactive fluid dynamics, generative particle fields, and responsive visual experiments.",
      },
      {
        icon: Cpu,
        title: "Zero DOM Layout Tax",
        description: "Direct GPU canvas rendering with zero browser CSS reflow or layout recalculation overhead.",
      },
    ],
    tags: ["CanvasKit (Skia)", "WebAssembly", "GLSL Shaders", "GPU Engine", "Creative Tech"],
    logoUrl: "/nema/logo.jpg",
    screenshotUrl: "/products/nema_preview.png",
    previewUrl: "https://appibara.com/nema",
    websiteUrl: "https://appibara.com/nema",
    buttonText: "Explore Nema Engine",
  },
];

export const ProductShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToProduct = (index: number) => {
    const product = PRODUCTS_DATA[index];
    if (!product) return;
    const element = document.getElementById(product.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center"
    >
      {/* Products Section Header / Welcome Screen */}
      <section
        id="our-products"
        className="w-full min-h-[calc(100vh-120px)] flex flex-col justify-center items-center text-center px-6 py-12 gap-6 max-w-[1100px] mx-auto scroll-mt-[105px]"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-xs font-mono font-bold text-[var(--accent-primary)] shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>APPIBARA ECOSYSTEM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-audiowide leading-tight max-w-[950px]">
          <AudiowaveText>Our Digital Products: SaaS, No-Code & Dev Tools</AudiowaveText>
        </h2>
        <p className="text-lg md:text-2xl font-nunito text-[var(--text-secondary)] max-w-[800px] leading-relaxed">
          Building the future with cutting-edge, zero-setup applications and developer platforms.
          Explore each product below in a full-screen showcase.
        </p>

        {/* Scroll invitation button */}
        <button
          onClick={() => scrollToProduct(0)}
          className="mt-4 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm font-semibold text-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/10 transition-all cursor-pointer group shadow-sm"
        >
          <span>Scroll to explore products</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </section>

      {/* Full-Screen Product Slides Stream */}
      <div className="w-full flex flex-col gap-12 lg:gap-16 pb-12">
        {PRODUCTS_DATA.map((product, index) => {
          const isLast = index === PRODUCTS_DATA.length - 1;
          const nextProduct = PRODUCTS_DATA[index + 1];

          return (
            <ProductSlide
              key={product.id}
              product={product}
              isLast={isLast}
              nextProductTitle={nextProduct?.title}
              onScrollToNext={() => scrollToProduct(index + 1)}
            />
          );
        })}
      </div>
    </div>
  );
};
