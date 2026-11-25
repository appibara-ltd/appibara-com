import Image from "next/image";
import { AudiowaveText } from "@/components/AudiowaveText";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { MotionSection } from "@/components/MotionSection";
import { Card } from "@/components/Card";
import { IconCard } from "@/components/IconCard";
import { Footer } from "@/components/Footer";
import { ChevronRight, Smartphone, Lightbulb, Award, Handshake, Server, CircleCheck, Mail, Send, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { ProductShowcase } from "@/components/ProductShowcase";
import { PageNavigation } from "@/components/PageNavigation";
import { BlogCard } from "@/components/BlogCard";
import { AmbientGlowCanvas } from "@/components/AmbientGlowCanvas";
import { POSTS } from "@/lib/blog";
import {
  ORGANIZATION_ID,
  PRODUCTS_CATALOG,
  SERVICES_DATA,
  SITE_INFO,
  TEAM_MEMBERS,
  WEBSITE_ID,
} from "@/lib/site-data";

export default function Home() {
  const latestPostSlug = POSTS.reduce((latest, current) => {
    return new Date(current.date).getTime() > new Date(latest.date).getTime()
      ? current
      : latest;
  }, POSTS[0])?.slug;

  const latestPosts = [...POSTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...SERVICES_DATA.map((service) => ({
        "@type": "Service",
        "@id": `${SITE_INFO.url}/#${service.id}`,
        name: service.name,
        serviceType: service.serviceType,
        description: service.description,
        provider: {
          "@id": ORGANIZATION_ID,
        },
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
      })),
      ...PRODUCTS_CATALOG.map((product) => {
        const sameAsLinks = [
          product.appStoreUrl,
          product.playStoreUrl,
          product.githubUrl,
        ].filter((link): link is string => Boolean(link));

        return {
          "@type": product.isOpenSource
            ? ["SoftwareApplication", "SoftwareSourceCode"]
            : "SoftwareApplication",
          "@id": `${SITE_INFO.url}/#product-${product.id}`,
          name: product.name,
          description: `${product.tagline} ${product.description}`,
          applicationCategory: product.applicationCategory,
          operatingSystem: product.operatingSystem,
          url: product.url,
          image: product.screenshot,
          screenshot: product.screenshot,
          featureList: [...product.features],
          author: {
            "@id": ORGANIZATION_ID,
          },
          publisher: {
            "@id": ORGANIZATION_ID,
          },
          ...(product.githubUrl ? { codeRepository: product.githubUrl } : {}),
          ...(product.isOpenSource ? { isAccessibleForFree: true } : {}),
          ...(product.license === "MIT"
            ? { license: "https://opensource.org/licenses/MIT" }
            : {}),
          ...(sameAsLinks.length > 0 ? { sameAs: sameAsLinks } : {}),
        };
      }),
    ],
  };

  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c"),
      }}
    />
    <PageNavigation />
    <main className="flex flex-col row-start-2 items-center font-audiowide flex-auto justify-center">
      <Header />
      <MotionSection id="home" className="relative isolate overflow-hidden flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35 w-full">
        {/* Calm Tech Ambient Light Glows - 32-Bit Floating Point GPU Shader Canvas (Zero Banding in Chrome & Safari) */}
        <AmbientGlowCanvas />

        <div className="relative z-10 flex flex-col items-center justify-center gap-[2rem]">
          <h1 className="text-[42px] md:text-[72px] flex flex-col justify-center items-center text-center">
            <AudiowaveText className="leading-none">Calm Tech for </AudiowaveText>
            <AudiowaveText className="leading-none">Complex Needs</AudiowaveText>
          </h1>
          <p className="text-[20px] leading-none m-0 p-0 text-center font-nunito">Welcome to Appibara, where innovative solutions meet simplicity and clarity.</p>
          <div className="flex flex-col min-[426px]:flex-row gap-4 items-center justify-center">
            <PrimaryButton href="/#who-we-are" icon={<ChevronRight className="w-4 h-4" />}>
              Learn More
            </PrimaryButton>
            <SecondaryButton href="/#our-products">
              Explore Products
            </SecondaryButton>
          </div>
        </div>
      </MotionSection>

      <MotionSection id="who-we-are" delay={0.2} className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35">
        <Card className="flex flex-col gap-[32px] text-center max-w-[1000px] items-center">

          <h2 className="text-[32px] md:text-[48px] leading-tight font-audiowide">
            <AudiowaveText>About Appibara: UI/UX & Software Studio</AudiowaveText>
          </h2>
          <p className="text-[20px] font-nunito text-[var(--text-secondary)]">
            At Appibara, our focused team combines expertise in design and development to create seamless and intuitive digital experiences.
          </p>
          <p className="text-[18px] font-nunito italic text-[var(--accent-primary)]">
            Passionate developers, designers, and innovators
          </p>
          <div className="flex gap-[2rem] flex-col md:flex-row w-full">
            <div className="flex items-center gap-[1rem] flex-col w-full">
              <IconCard icon={Lightbulb} />
              <AudiowaveText useGradient={false}>Innovation</AudiowaveText>
              <p className="font-nunito text-[var(--text-secondary)]">Pushing boundaries with cutting-edge technology</p>
            </div>
            <div className="flex items-center gap-[1rem] flex-col w-full">
              <IconCard icon={Award} />
              <AudiowaveText useGradient={false}>Quality</AudiowaveText>
              <p className="font-nunito text-[var(--text-secondary)]">Delivering excellence in every project</p>
            </div>
            <div className="flex items-center gap-[1rem] flex-col w-full">
              <IconCard icon={Handshake} />
              <AudiowaveText useGradient={false}>Partnership</AudiowaveText>
              <p className="font-nunito text-[var(--text-secondary)]">Your success is our mission</p>
            </div>
          </div>

          <div className="border-t border-[var(--border-light)] w-full pt-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl p-6 bg-[var(--bg-primary)]/50 border border-[var(--border-light)] hover:border-[var(--brand-orange)]/40 transition-all duration-300 flex flex-col gap-4 text-left"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="p-[2px] rounded-2xl shrink-0 bg-gradient-to-br from-[var(--brand-yellow)]/45 to-[var(--brand-blue-light)]/45">
                        <div className="relative w-24 h-24 rounded-[14px] overflow-hidden bg-[var(--bg-secondary)]">
                          <Image
                            src={member.image}
                            alt={`${member.name} — ${member.role}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 min-w-0">
                        <h3 className="text-[22px] leading-tight font-audiowide">
                          <AudiowaveText useGradient={false}>{member.name}</AudiowaveText>
                        </h3>
                        <span className="text-sm font-nunito font-semibold text-[var(--accent-primary)]">
                          {member.role}
                        </span>
                      </div>
                    </div>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="shrink-0 p-2.5 rounded-xl border border-[var(--border-light)] bg-[var(--surface-off-white)]/80 text-[var(--text-secondary)] hover:text-[#0a66c2] hover:border-[#0a66c2]/40 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-[15px] leading-relaxed font-nunito text-[var(--text-secondary)]">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </MotionSection>

      <MotionSection id="our-services" delay={0.3} className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35">
        <Card className="flex flex-col gap-[32px] text-center max-w-[1000px] w-full items-center">
          <h2 className="text-[32px] md:text-[48px] leading-tight font-audiowide">
            <AudiowaveText>Custom SaaS & Mobile Application Development Services</AudiowaveText>
          </h2>
          <p className="text-[20px] font-nunito text-[var(--text-secondary)]">
            Comprehensive software solutions for B2B, SaaS, and mobile challenges
          </p>
          <div className="flex flex-col md:flex-row w-full gap-[2rem] md:gap-0">
            <div className="flex flex-col gap-[1rem] w-full md:w-[50%]">
              <div className="flex items-center gap-[1rem]">
                <IconCard icon={Server} />
                <h3 className="text-[24px] font-audiowide text-left">
                  <AudiowaveText useGradient={false}>Scalable SaaS Product Engineering</AudiowaveText>
                </h3>
              </div>
              <div>
                <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Transform your business operations with our cutting-edge Software as a Service solutions. We specialize in creating scalable, cloud-based platforms that adapt to your growing needs.</p>
              </div>
            </div>
            <div className="text-left pt-[1rem] md:pt-0 w-full md:w-[50%] md:pl-8">
              <AudiowaveText useGradient={false} className="text-[20px] text-left">Key Features</AudiowaveText>
              <div className="flex flex-col">
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Cloud-native architecture for maximum scalability</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Real-time data synchronization across devices</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem]  self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Advanced security and compliance features</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Intuitive user interfaces and dashboards</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">API-first design for seamless integrations</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-[2rem] md:gap-0">
            <div className="flex flex-col gap-[1rem] w-full md:w-[50%]">
              <div className="flex items-center gap-[1rem]">
                <IconCard icon={Smartphone} />
                <h3 className="text-[24px] font-audiowide text-left">
                  <AudiowaveText useGradient={false}>Native & Cross-Platform Mobile Applications</AudiowaveText>
                </h3>
              </div>
              <div>
                <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Create engaging mobile experiences that connect with your audience. Our mobile applications combine beautiful design with powerful functionality for both iOS and Android platforms.</p>
              </div>
            </div>
            <div className="text-left pt-[1rem] md:pt-0 w-full md:w-[50%] md:pl-8">
              <AudiowaveText useGradient={false} className="text-[20px] text-left">Key Features</AudiowaveText>
              <div className="flex flex-col">
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Native iOS and Android development</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Cross-platform solutions tailored to your architecture</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Offline functionality and data sync</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Push notifications and real-time updates</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">App Store/Play Console optimizations and deployment</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </MotionSection>

      <ProductShowcase />

      <MotionSection id="blog" delay={0.4} className="flex flex-col justify-center gap-[2.5rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35 w-full max-w-[1200px]">
        <div className="text-center flex flex-col items-center gap-4 max-w-[800px]">
          <h2 className="text-[32px] md:text-[48px] leading-tight font-audiowide">
            <AudiowaveText>Latest from our Blog</AudiowaveText>
          </h2>
          <p className="text-[18px] md:text-[20px] font-nunito text-[var(--text-secondary)]">
            Reflections on design, engineering deep-dives, and calm solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {latestPosts.map((post, index) => (
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

        <div className="flex justify-center mt-2">
          <PrimaryButton href="/blog" icon={<ArrowRight className="w-4 h-4" />} noWrap={false}>
            View All Articles
          </PrimaryButton>
        </div>
      </MotionSection>

      <MotionSection id="contact" delay={0.5} className="relative isolate overflow-hidden flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35 w-full">
        {/* Contact Ambient Orange Backlight - Cross-Browser & Safari-Optimized */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] md:w-[850px] h-[300px] sm:h-[420px] md:h-[500px] rounded-full [background:radial-gradient(ellipse_at_center,rgba(225,113,0,0.25)_0%,rgba(255,170,85,0.12)_35%,rgba(225,113,0,0.03)_70%,rgba(225,113,0,0)_100%)] blur-[40px] md:blur-[70px] transform-gpu will-change-transform z-0"
        />

        <Card className="relative z-10 flex flex-col gap-[1.25rem] text-center max-w-[1000px] w-full items-center border border-[var(--brand-orange)]/30 shadow-[inset_0_1px_0_0_rgba(255,170,85,0.25),0_20px_50px_-15px_rgba(225,113,0,0.15)]">
          <h2 className="text-[32px] md:text-[48px] leading-tight font-audiowide">
            <AudiowaveText>Let&apos;s Connect: Start Your Project with Appibara</AudiowaveText>
          </h2>
          <p className="text-[20px] font-nunito text-[var(--text-secondary)]">
            Need a calm hand for your next design or development cycle? We're here — quietly, but ready to help.
          </p>
          <div className="flex flex-row items-center gap-[0.5rem] justify-center">
            <Mail size={'1.5rem'} strokeWidth="3" color="var(--brand-orange)" />
            <span className="text-[20px] text-[var(--brand-orange)]">contact@appibara.com</span>
          </div>
          <p className="text-[1rem] font-nunito text-[var(--text-secondary)]">We typically respond within 24 hours</p>
          <PrimaryButton href="mailto:contact@appibara.com" icon={<Send className="w-5 h-5" />}>
            Hire Us
          </PrimaryButton>
        </Card>
      </MotionSection>
    </main>
    <Footer />
  </>

}
