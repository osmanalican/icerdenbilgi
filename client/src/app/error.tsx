"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw, ShieldAlert } from "lucide-react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-linear-to-b from-indigo-50/50 via-zinc-50 to-zinc-50 px-4 py-16 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-200/35 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-violet-200/25 blur-3xl"
      />

      <section className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/95 p-6 text-center shadow-[0_24px_70px_-30px_rgba(79,70,229,0.28)] backdrop-blur-sm sm:p-9">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-red-50 to-rose-100 text-red-600 shadow-sm">
          <ShieldAlert className="h-7 w-7" aria-hidden="true" />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          Bir şeyler ters gitti
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
          Beklenmedik bir hata oluştu.
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500 sm:text-base">
          Bu sayfa yüklenirken bir sorun oluştu. İşlemi tekrar deneyebilir veya
          güvenli şekilde ana sayfaya dönebilirsin.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Tekrar dene
          </button>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Ana sayfaya dön
          </Link>
        </div>

        {error.digest && (
          <div className="mt-7 border-t border-zinc-100 pt-4">
            <p className="text-xs text-zinc-400">
              Hata kodu:{" "}
              <span className="font-mono text-zinc-500">{error.digest}</span>
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
