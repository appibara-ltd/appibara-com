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
} from "lucide-react";

export const PRODUCTS_DATA: ShowcaseProduct[] = [
  {
    id: "product-nativeflow",
    number: "01",
    category: "No-Code Mobile & Web Platform",
    title: "NativeFlow",
    tagline: "Design in your browser. Deploy natively to the App Store & Google Play.",
    description:
      "A no-code app builder where you can design apps in your browser with drag-and-drop and publish directly to the App Store and Google Play — fast, simple, and code-free.",
    extendedDescription:
      "NativeFlow bridges the gap between design and native mobile engineering. Build production-grade cross-platform applications entirely in your browser with a responsive visual drag-and-drop canvas, real-time live device testing, and zero-configuration native store submission pipelines — with no native development boilerplate required.",
    features: [
      {
        icon: Layers,
        title: "Visual Drag-and-Drop Canvas",
        description: "Assemble pixel-perfect mobile layouts and rich reactive components effortlessly.",
      },
      {
        icon: Smartphone,
        title: "Real-Time Device Testing",
        description: "Test and interact with your app live in browser or stream straight to your physical device.",
      },
      {
        icon: Zap,
        title: "1-Click Store Deployment",
        description: "Automate build signing and release directly to Apple App Store and Google Play.",
      },
      {
        icon: Workflow,
        title: "REST API & Cloud State",
        description: "Seamlessly bind visual elements to custom external endpoints and backend logic.",
      },
    ],
    tags: ["No-Code", "Web App", "Mobile App Builder", "Zero-Code"],
    logoUrl: "/products/nativeflow_logo.png",
    screenshotUrl: "/products/nativeflow_preview.png",
    previewUrl: "https://nativeflow.app",
    websiteUrl: "https://nativeflow.app",
    buttonText: "Try NativeFlow Free",
  },
  {
    id: "product-learnsql",
    number: "02",
    category: "Interactive Learning & Data Analytics",
    title: "Learn SQL",
    tagline: "Master SQL for modern SaaS analytics with an in-browser sandbox database.",
    description:
      "Master SQL for SaaS Analytics with a professional, distraction-free platform entirely in your browser. Progress from basic SELECT queries to advanced window functions using a zero-setup, real-world mock database schema.",
    extendedDescription:
      "Engineered specifically for founders, product managers, and developers looking to master revenue analytics. Run queries against realistic SaaS multi-table databases (MRR, churn cohorts, retention, user funnels) with instant execution powered by DuckDB and SQLite WebAssembly directly in your browser — zero installs, zero cloud bills.",
    features: [
      {
        icon: Cpu,
        title: "In-Browser Wasm Sandbox",
        description: "Zero installation or credentials needed. Real database engine executes 100% client-side.",
      },
      {
        icon: BarChart3,
        title: "Real SaaS Analytics Focus",
        description: "Master MRR calculations, cohort retention grids, LTV models, and churn dynamics.",
      },
      {
        icon: Code2,
        title: "Advanced CTEs & Window Functions",
        description: "Hands-on exercises covering recursive CTEs, ranking, partitioning, and aggregation.",
      },
      {
        icon: Zap,
        title: "Instant Execution & Visual Grids",
        description: "Inspect sub-5ms query outputs, performance execution plans, and clear data tables.",
      },
    ],
    tags: ["SQL", "SaaS Analytics", "Data Mastery", "Interactive Academy"],
    logoUrl: "/learn-sql-logo.png",
    screenshotUrl: "/products/learnsql_preview.png",
    previewUrl: "https://learnsql.dev",
    websiteUrl: "https://learnsql.dev",
    buttonText: "Master SaaS SQL",
  },
  {
    id: "product-kokono",
    number: "03",
    category: "Developer Tool & System Alerts",
    title: "KokoNo",
    tagline: "Instant, zero-SDK push notifications and system alerts via simple webhooks.",
    description:
      "Instant push notifications via simple webhooks. Send alerts, build notifications, and trigger system status logs directly to your mobile devices with a clean, lightspeed POST request.",
    extendedDescription:
      "Eliminate heavy third-party notification SDKs, complex Apple APNs certificates, and FCM boilerplate. KokoNo gives developers and devops engineers a lightning-fast HTTP POST webhook endpoint to dispatch priority push notifications, CI/CD deploy logs, and financial transaction alerts to iOS and Android devices in milliseconds.",
    features: [
      {
        icon: Terminal,
        title: "Zero SDK Overhead",
        description: "Fire notifications with a single standard curl or fetch HTTP POST call from anywhere.",
      },
      {
        icon: Radio,
        title: "Multi-Device & Team Channels",
        description: "Broadcast alerts across topic channels, distributed team members, or dedicated devices.",
      },
      {
        icon: Clock,
        title: "Event Timelines & History",
        description: "Searchable log history to trace every incident, payload timestamp, and response code.",
      },
      {
        icon: Bell,
        title: "Rich Notification Payloads",
        description: "Support for alert priorities, deep-link actions, markdown summaries, and custom badges.",
      },
    ],
    tags: ["Developer Tool", "Webhooks", "Push Notifications", "iOS & Android", "DevOps"],
    logoUrl: "/kokono_logo_v2.png",
    screenshotUrl: "/products/kokono_preview.png",
    previewUrl: "https://kokono.me",
    websiteUrl: "https://kokono.me/",
    appStoreUrl: "https://apps.apple.com/tr/app/kokono/id6765647478?l",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.appibara.kokono&hl",
    buttonText: "Visit KokoNo",
  },
  {
    id: "product-nema",
    number: "04",
    category: "GPU Graphics & Creative Engine",
    title: "Nema",
    tagline: "High-performance 60 FPS GPU canvas playground powered by CanvasKit & WebAssembly.",
    description:
      "A high-performance 60 FPS GPU canvas playground in React. Powered by CanvasKit (Skia) and WebAssembly, Nema maps GLSL fragment shaders to React state with zero DOM layout tax and locked 60 FPS hardware acceleration.",
    extendedDescription:
      "Nema unleashes the raw graphics power of Google Skia (CanvasKit) compiled to WebAssembly inside modern React applications. Connect reactive component state directly to GLSL fragment shaders and fluid physics simulations with sub-millisecond frame times, hardware-accelerated rendering, and absolutely zero DOM layout overhead.",
    features: [
      {
        icon: Gauge,
        title: "Locked 60 FPS Hardware Acceleration",
        description: "Sub-millisecond GPU draw calls powered by Google Skia WebAssembly engine.",
      },
      {
        icon: Sliders,
        title: "React State to GLSL Uniforms",
        description: "Bi-directional reactive synchronization between UI controls and shader uniforms.",
      },
      {
        icon: Sparkles,
        title: "Fluid & Kinetic Simulations",
        description: "Real-time interactive fluid dynamics, generative particle fields, and sound reactivity.",
      },
      {
        icon: Cpu,
        title: "Zero DOM Layout Tax",
        description: "Bypass browser CSS layout calculations for maximum rendering throughput and battery life.",
      },
    ],
    tags: ["WebGPU", "GLSL Shaders", "WebAssembly", "Creative Tech"],
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
