import { AudiowaveText } from "@/components/AudiowaveText";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { MotionSection } from "@/components/MotionSection";
import { Card } from "@/components/Card";
import { IconCard } from "@/components/IconCard";
import { Footer } from "@/components/Footer";
import { ChevronRight, Briefcase, Lightbulb, Award, Handshake } from "lucide-react";
import { Header } from "@/components/header";
import Image from "next/image";

export default function Home() {

  return <>
    <main className="flex flex-col row-start-2 items-center font-audiowide flex-auto">
      <Header />
      <MotionSection className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)]">
        <div className="text-[72px] flex flex-col justify-center items-center">
          <AudiowaveText className="leading-none">Calm Tech for</AudiowaveText>
          <AudiowaveText className="leading-none">Complex Needs</AudiowaveText>
        </div>
        <p className="text-[20px] leading-none m-0 p-0 text-center font-nunito">Welcome to Appibara, where innovative solutions meet simplicity and clarity.</p>
        <div className="flex gap-4">
          <PrimaryButton href="/contact" icon={<ChevronRight className="w-4 h-4" />}>
            Get Started
          </PrimaryButton>
          <SecondaryButton href="/products">
            Explore Products
          </SecondaryButton>
        </div>
      </MotionSection>
      <MotionSection delay={0.2} className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)]">
        <Card className="flex flex-col gap-[32px] text-center max-w-[1000px] items-center">

          <AudiowaveText className="text-[48px] leading-tight">Who We Are</AudiowaveText>
          <p className="text-[20px] font-nunito text-gray-700">
            At Appibara, our focused team combines expertise in design and development to create seamless and intuitive digital experiences.
          </p>
          <p className="text-[18px] font-nunito italic text-[#e17200]">
            Passionate developers, designers, and innovators
          </p>
          <div className="flex gap-[2rem] flex-row w-full">
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
      <MotionSection delay={0.3} className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)]">
        <Card className="flex flex-col gap-[32px] text-center max-w-[1000px] w-full items-center">
          <AudiowaveText className="text-[48px] leading-tight">Our Services</AudiowaveText>
          <p className="text-[20px] font-nunito text-gray-700">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </Card>
      </MotionSection>
      <MotionSection delay={0.4} className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)]">
        <Card className="flex flex-col gap-[32px] text-center max-w-[1000px] w-full items-center">
          <AudiowaveText className="text-[48px] leading-tight">Our Products</AudiowaveText>
          <p className="text-[20px] font-nunito text-gray-700">
            Building the future with cutting-edge applications
          </p>
        </Card>
      </MotionSection>
      <MotionSection delay={0.5} className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)]">
        <Card className="flex flex-col gap-[32px] text-center max-w-[1000px] w-full items-center">
          <AudiowaveText className="text-[48px] leading-tight">Let&apos;s Connect</AudiowaveText>
          <p className="text-[20px] font-nunito text-gray-700">
            Ready to start your project? Get in touch with us today.
          </p>
          <PrimaryButton href="/contact" icon={<ChevronRight className="w-4 h-4" />}>
            Contact Us
          </PrimaryButton>
        </Card>
      </MotionSection>
    </main>
    <Footer />
  </>

}
