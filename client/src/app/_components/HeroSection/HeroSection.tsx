import { Sparkles } from "lucide-react";

import { HomeCompanySearch } from "@/app/(home)/_components";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden  bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-100/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 right-0 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50/80 px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm sm:text-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Gerçek deneyimler, içeriden bilgiler
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-[-0.035em] text-zinc-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Bir şirkete girmeden önce{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              içeriden bak.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:mt-6 sm:text-lg sm:leading-8">
            Mülakat süreçlerini, çalışma ortamını ve gerçek çalışan
            deneyimlerini anonim paylaşımlardan keşfet.
          </p>

          <HomeCompanySearch />
        </div>
      </div>
    </section>
  );
}
