import { AudiowaveText } from "@/components/AudiowaveText";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { MotionSection } from "@/components/MotionSection";
import { Card } from "@/components/Card";
import { IconCard } from "@/components/IconCard";
import { Footer } from "@/components/Footer";
import { ChevronRight, Smartphone, Lightbulb, Award, Handshake, Server, CircleCheck, Mail, Send } from "lucide-react";
import { Header } from "@/components/header";
import { ProductShowcase } from "@/components/ProductShowcase";
import { PageNavigation } from "@/components/PageNavigation";

export default function Home() {

  return <>
    <PageNavigation />
    <main className="flex flex-col row-start-2 items-center font-audiowide flex-auto justify-center">
      <Header />
      <MotionSection id="home" className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35">
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
                  <AudiowaveText useGradient={false}>Cross-Platform Mobile Apps (React Native)</AudiowaveText>
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
                  <p className="text-[1rem] font-nunito text-[var(--text-secondary)] font-medium text-left">Cross-platform solutions with React Native</p>
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

      <MotionSection id="contact" delay={0.5} className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35">
        <Card className="flex flex-col gap-[1rem] text-center max-w-[1000px] w-full items-center">
          <h2 className="text-[32px] md:text-[48px] leading-tight font-audiowide">
            <AudiowaveText>Let&apos;s Connect: Start Your Project with Appibara</AudiowaveText>
          </h2>
          <p className="text-[20px] font-nunito text-[var(--text-secondary)]">
            Need a calm hand for your next design or development cycle? We're here — quietly, but ready to help.
          </p>
          <div className="flex flex-row items-center gap-[0.5rem] justify-center">
            <Mail size={'1.5rem'} strokeWidth="3" color="var(--brand-orange)" />
            <AudiowaveText className="text-[20px]" useGradient={false}>contact@appibara.com</AudiowaveText>
          </div>
          <p className="text-[1rem] font-nunito text-[var(--text-secondary)]">We typically respond within 24 hours</p>
          <PrimaryButton href="mailto:contact@appibara.com" icon={<Send className="w-5 h-5" />}>
            Get In Touch
          </PrimaryButton>
        </Card>
      </MotionSection>
    </main>
    <Footer />
  </>

}
