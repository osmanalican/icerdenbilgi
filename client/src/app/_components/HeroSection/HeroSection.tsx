import { HomeCompanySearch } from "@/app/(home)/_components";

export function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-3xl">
        <p className="mb-3 text-xs font-medium tracking-wide text-zinc-500 sm:mb-5 sm:text-sm">
          Mülakatlar. Deneyimler. Gerçek insanlar.
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl">
          Şirketleri içeriden tanı.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:mt-6 sm:text-lg sm:leading-8">
          Mülakat süreçlerini ve çalışma deneyimlerini anonim paylaşımlarla
          keşfet.
        </p>

        <HomeCompanySearch />
      </div>
    </section>
  );
}
