import { AudiowaveText } from "@/components/AudiowaveText";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { MotionSection } from "@/components/MotionSection";
import { Card } from "@/components/Card";
import { IconCard } from "@/components/IconCard";
import { Footer } from "@/components/Footer";
import { ChevronRight, Smartphone, Lightbulb, Award, Handshake, Server, CircleCheck, Mail, Send } from "lucide-react";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {

  return <>
    <main className="flex flex-col row-start-2 items-center font-audiowide flex-auto justify-center">
      <Header />
      <MotionSection id="home" className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35">
        <div className="text-[42px] md:text-[72px] flex flex-col justify-center items-center text-center">
          <AudiowaveText className="leading-none">Calm Tech for</AudiowaveText>
          <AudiowaveText className="leading-none">Complex Needs</AudiowaveText>
        </div>
        <p className="text-[20px] leading-none m-0 p-0 text-center font-nunito">Welcome to Appibara, where innovative solutions meet simplicity and clarity.</p>
        <div className="flex gap-4">
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

          <AudiowaveText className="text-[32px] md:text-[48px] leading-tight">Who We Are</AudiowaveText>
          <p className="text-[20px] font-nunito text-gray-700">
            At Appibara, our focused team combines expertise in design and development to create seamless and intuitive digital experiences.
          </p>
          <p className="text-[18px] font-nunito italic text-[#e17200]">
            Passionate developers, designers, and innovators
          </p>
          <div className="flex gap-[2rem] flex-col md:flex-row w-full">
            <div className="flex items-center gap-[1rem] flex-col w-full">
              <IconCard icon={Lightbulb} />
              <AudiowaveText useGradient={false}>Innovation</AudiowaveText>
              <p className="font-nunito">Pushing boundaries with cutting-edge technology</p>
            </div>
            <div className="flex items-center gap-[1rem] flex-col w-full">
              <IconCard icon={Award} />
              <AudiowaveText useGradient={false}>Quality</AudiowaveText>
              <p className="font-nunito">Delivering excellence in every project</p>
            </div>
            <div className="flex items-center gap-[1rem] flex-col w-full">
              <IconCard icon={Handshake} />
              <AudiowaveText useGradient={false}>Partnership</AudiowaveText>
              <p className="font-nunito">Your success is our mission</p>
            </div>
          </div>
        </Card>
      </MotionSection>

      <MotionSection id="our-services" delay={0.3} className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35">
        <Card className="flex flex-col gap-[32px] text-center max-w-[1000px] w-full items-center">
          <AudiowaveText className="text-[32px] md:text-[48px] leading-tight">Our Services</AudiowaveText>
          <p className="text-[20px] font-nunito text-gray-700">
            Comprehensive solutions for modern challenges
          </p>
          <div className="flex flex-col md:flex-row w-full gap-[2rem] md:gap-0">
            <div className="flex flex-col gap-[1rem] w-full md:w-[50%]">
              <div className="flex items-center gap-[1rem]">
                <IconCard icon={Server} />
                <AudiowaveText useGradient={false} className="text-[24px]">SaaS Products</AudiowaveText>
              </div>
              <div>
                <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">Transform your business operations with our cutting-edge Software as a Service solutions. We specialize in creating scalable, cloud-based platforms that adapt to your growing needs.</p>
              </div>
            </div>
            <div className="text-left pt-[1rem] md:pt-0 w-full md:w-[50%] md:pl-8">
              <AudiowaveText useGradient={false} className="text-[20px] text-left">Key Features</AudiowaveText>
              <div className="flex flex-col">
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">Cloud-native architecture for maximum scalability</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">Real-time data synchronization across devices</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem]  self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">Advanced security and compliance features</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">Intuitive user interfaces and dashboards</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">API-first design for seamless integrations</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-[2rem] md:gap-0">
            <div className="flex flex-col gap-[1rem] w-full md:w-[50%]">
              <div className="flex items-center gap-[1rem]">
                <IconCard icon={Smartphone} />
                <AudiowaveText useGradient={false} className="text-[24px]">Mobile Applications</AudiowaveText>
              </div>
              <div>
                <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">Create engaging mobile experiences that connect with your audience. Our mobile applications combine beautiful design with powerful functionality for both iOS and Android platforms.</p>
              </div>
            </div>
            <div className="text-left pt-[1rem] md:pt-0 w-full md:w-[50%] md:pl-8">
              <AudiowaveText useGradient={false} className="text-[20px] text-left">Key Features</AudiowaveText>
              <div className="flex flex-col">
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">Native iOS and Android development</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">Cross-platform solutions with React Native</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">Offline functionality and data sync</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">Push notifications and real-time updates</p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <CircleCheck className="w-[1.25rem] h-[1.25rem] self-start shrink-0" color="var(--border)" />
                  <p className="text-[1rem] font-nunito text-gray-700 font-medium text-left">App Store/Play Console optimizations and deployment</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </MotionSection>

      <MotionSection id="our-products" delay={0.4} className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35">
        <Card className="flex flex-col gap-[32px] text-center max-w-[1000px] w-full items-center">
          <AudiowaveText className="text-[32px] md:text-[48px] leading-tight">Our Products</AudiowaveText>
          <p className="text-[20px] font-nunito text-gray-700">
            Building the future with cutting-edge applications
          </p>
          <ProductCard
            title="NativeFlow"
            description="A no-code app builder where you can design apps in your browser with drag-and-drop and publish directly to the App Store and Google Play — fast, simple, and code-free. See your apps live as you build. Test, preview, and interact in real time."
            href="https://nativeflow.app"
            buttonText="Try NativeFlow"
            tags={["No-Code", "Web App", "Mobile App Builder"]}
            logoUrl="https://www.nativeflow.app/logo.png"
          />
        </Card>
      </MotionSection>

      <MotionSection id="contact" delay={0.5} className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8 pt-35">
        <Card className="flex flex-col gap-[1rem] text-center max-w-[1000px] w-full items-center">
          <AudiowaveText className="text-[32px] md:text-[48px] leading-tight">Let&apos;s Connect</AudiowaveText>
          <p className="text-[20px] font-nunito text-gray-700">
            Need a calm hand? We're here — quietly, but ready to help.
          </p>
          <div className="flex flex-row items-center gap-[0.5rem] justify-center">
            <Mail size={'1.5rem'} strokeWidth="3" color="var(--brand-orange)" />
            <AudiowaveText className="text-[20px]" useGradient={false}>contact@appibara.com</AudiowaveText>
          </div>
          <p className="text-[1rem] font-nunito text-gray-700">We typically respond within 24 hours</p>
          <PrimaryButton href="mailto:contact@appibara.com" icon={<Send className="w-5 h-5" />}>
            Get In Touch
          </PrimaryButton>
        </Card>
      </MotionSection>
    </main>
    <Footer />
  </>

}
