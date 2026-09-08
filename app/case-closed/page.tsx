import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { MotionSection } from "@/components/MotionSection";
import { ShieldCheck, FileText, Mail, Smartphone, Search, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Closed | Detective Mystery Game by Appibara",
  description:
    "Case Closed is an immersive detective puzzle game developed by Appibara LTD. Solve crime mysteries, analyze evidence, and crack the case.",
};

export default function CaseClosedPage() {
  return (
    <>
      <main className="flex flex-col items-center flex-auto justify-center pt-[100px] font-sans">
        <Header />

        <MotionSection className="flex flex-col justify-center gap-[2rem] items-center flex-auto min-h-[calc(100vh-105px)] p-4 sm:p-8 w-full max-w-[1000px]">
          <Card className="flex flex-col gap-8 w-full p-6 sm:p-12 text-slate-800">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center gap-3 border-b border-slate-200 pb-8">
              <span className="text-xs font-bold tracking-wider text-amber-600 uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Official Application Page
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 font-audiowide">
                Case Closed
              </h1>
              <p className="text-lg text-slate-600 max-w-xl">
                An immersive mobile detective and crime mystery puzzle game developed by{" "}
                <span className="font-semibold text-slate-900">Appibara LTD</span>.
              </p>
            </div>

            {/* About Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-600" />
                About Case Closed
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Step into the role of a lead detective in <strong>Case Closed</strong>. Examine crime scene evidence,
                interrogate suspects, decipher cryptic messages, and piece together the puzzle to solve high-stakes mysteries.
                Every choice matters, and every clue brings you one step closer to justice.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <Award className="w-4 h-4 text-amber-600" />
                  Intriguing Mysteries
                </div>
                <p className="text-sm text-slate-600">
                  Rich, narrative-driven detective cases crafted with challenging puzzles and forensic investigations.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  Cross-Platform Sync
                </div>
                <p className="text-sm text-slate-600">
                  Secure progress synchronization across iOS and Android devices through Google and Apple sign-in.
                </p>
              </div>
            </div>

            {/* Privacy & Authentication Info */}
            <div className="flex flex-col gap-4 p-5 rounded-xl border border-blue-100 bg-blue-50/60 text-slate-700">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                Account & Privacy Commitment
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>Case Closed</strong> uses secure third-party authentication services, such as Google Sign-In and Sign in with Apple,
                strictly to verify player identity and securely save game progression to your cloud profile. We only access basic, non-sensitive profile information
                (such as email and display name) necessary for account identification, and we never share your personal information with third parties.
              </p>
            </div>

            {/* Legal & Policy Links */}
            <div className="flex flex-col gap-4 border-t border-slate-200 pt-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-700" />
                Legal & Policies
              </h3>
              <div className="flex flex-wrap gap-4 text-sm font-medium">
                <Link
                  href="/privacy-policy"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                >
                  Privacy Policy &rarr;
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                >
                  Terms & Conditions &rarr;
                </Link>
                <Link
                  href="/cookie-policy"
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                >
                  Cookie Policy &rarr;
                </Link>
              </div>
            </div>
          </Card>
        </MotionSection>
      </main>
      <Footer />
    </>
  );
}
