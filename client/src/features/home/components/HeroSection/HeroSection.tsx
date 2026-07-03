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
        Mülakat süreçlerini ve çalışma deneyimlerini anonim paylaşımlarla keşfet.
      </p>

      <div className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Trendyol, Getir, Peak Games..."
          className="h-12 flex-1 rounded-xl border border-zinc-300 bg-white px-4 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500"
        />

        <button className="h-12 rounded-xl bg-zinc-950 px-6 font-medium cursor-pointer text-white transition hover:bg-zinc-800">
          Ara
        </button>
      </div>

      <div className="mt-4 text-sm text-zinc-500">
        Popüler: <span className="text-zinc-800">Trendyol</span> ·{' '}
        <span className="text-zinc-800">Getir</span> ·{' '}
        <span className="text-zinc-800">Hepsiburada</span> ·{' '}
        <span className="text-zinc-800">Insider</span>
      </div>
    </section>
  );
}
