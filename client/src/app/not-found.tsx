import Link from "next/link";
import { ArrowLeft, Compass, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-linear-to-b from-indigo-50/40 via-zinc-50 to-zinc-50 px-4 py-16 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-violet-200/20 blur-3xl"
      />

      <section className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-indigo-100/80 bg-white/95 p-6 text-center shadow-[0_24px_70px_-30px_rgba(79,70,229,0.25)] backdrop-blur-sm sm:p-9">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-50 to-violet-100 text-indigo-600 shadow-sm">
          <SearchX className="h-7 w-7" aria-hidden="true" />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
          <Compass className="h-3.5 w-3.5" aria-hidden="true" />
          404 · Sayfa bulunamadı
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
          Aradığın sayfaya ulaşamadık.
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500 sm:text-base">
          Sayfa kaldırılmış, taşınmış veya adres yanlış yazılmış olabilir. Ana
          sayfaya dönerek devam edebilirsin.
        </p>

        <div className="mt-7 flex justify-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Ana sayfaya dön
          </Link>
        </div>

        <div className="mt-8 border-t border-zinc-100 pt-5">
          <p className="text-xs leading-5 text-zinc-400">
            Şirket arıyorsan ana sayfadaki arama alanından tekrar
            deneyebilirsin.
          </p>
        </div>
      </section>
    </main>
  );
}
