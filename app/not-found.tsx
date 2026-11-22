import type { Metadata } from "next";
import { Home, ChevronRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { MotionSection } from "@/components/MotionSection";
import { AmbientGlowCanvas } from "@/components/AmbientGlowCanvas";
import { AudiowaveText } from "@/components/AudiowaveText";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Appibara",
  description: "The page you are looking for could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <main className="flex flex-col row-start-2 items-center font-audiowide flex-auto justify-center w-full">
        <Header />
        <MotionSection className="relative isolate overflow-hidden flex flex-col justify-center gap-8 items-center font-audiowide flex-auto p-8 pt-35 w-full">
          <AmbientGlowCanvas />

          <div className="relative z-10 flex flex-col items-center justify-center gap-6 md:gap-8 text-center max-w-[720px]">
            <h1 className="flex flex-col items-center justify-center gap-2 text-center">
              <AudiowaveText className="text-[72px] md:text-[120px] leading-none">
                404
              </AudiowaveText>
              <AudiowaveText className="text-[28px] md:text-[44px] leading-tight">
                Page Not Found
              </AudiowaveText>
            </h1>

            <p className="text-[18px] md:text-[20px] leading-relaxed m-0 p-0 text-center font-nunito text-[var(--text-secondary)] max-w-[540px]">
              The page you&apos;re looking for may have been moved, renamed, or no longer exists. Let&apos;s get you back to calmer waters.
            </p>

            <div className="flex flex-col min-[426px]:flex-row gap-4 items-center justify-center mt-2">
              <PrimaryButton href="/" icon={<Home className="w-4 h-4" />}>
                Back to Home
              </PrimaryButton>
              <SecondaryButton
                href="/blog"
                icon={<ChevronRight className="w-4 h-4" />}
              >
                Explore Blog
              </SecondaryButton>
            </div>
          </div>
        </MotionSection>
      </main>
      <Footer />
    </>
  );
}
