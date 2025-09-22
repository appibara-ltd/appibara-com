import Image from "next/image";

export default function Home() {
  return (
    <div className="font-nunito grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
          className="hidden dark:block max-w-3xl w-full"
          src="/appibara_logo_dark.png"
          alt="Appibara Logo"
          width={4091}
          height={1025}
        />
        <Image
          className="block dark:hidden max-w-3xl w-full"
          src="/appibara_logo.png"
          alt="Appibara Logo"
          width={4091}
          height={1025}
        />
        <h1 className="text-2xl">We&apos;re under construction. Please check back for an update soon.</h1>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        ©Copyright 2025, Appibara LTD
      </footer>
    </div>
  );
}
