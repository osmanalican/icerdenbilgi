import { HomeCompanySearch } from "@/app/(home)/_components";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="mb-5 text-sm font-medium tracking-wide text-zinc-500">
        Mülakatlar. Deneyimler. Gerçek insanlar.
      </p>

      <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-zinc-950 md:text-6xl">
        Şirketleri içeriden tanı.
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
        Mülakat süreçlerini ve çalışma deneyimlerini anonim paylaşımlarla
        keşfet.
      </p>

      <HomeCompanySearch />
    </section>
  );
}
