"use client";

import Link from "next/link";
import { Building2, MessageSquareText, Plus, ShieldCheck } from "lucide-react";

import { useAuth } from "@/shared/hooks";

type CompanyHeaderProps = {
  companyName: string;
  companySlug: string;
  experienceCount: number;
};

export function CompanyHeader({
  companyName,
  companySlug,
  experienceCount,
}: CompanyHeaderProps) {
  const { isAuthenticated, isLoading } = useAuth();

  const sharePath = `/paylas?sirket=${encodeURIComponent(companySlug)}`;

  const href = isAuthenticated
    ? sharePath
    : `/giris?redirect=${encodeURIComponent(sharePath)}`;

  const companyInitial =
    companyName.charAt(0).toLocaleUpperCase("tr-TR") || "?";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-indigo-100/80 bg-white p-5 shadow-[0_12px_45px_-20px_rgba(79,70,229,0.28)] sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-indigo-100/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-20 h-56 w-56 rounded-full bg-violet-100/45 blur-3xl"
      />

      <div className="relative">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-4 sm:gap-5">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 text-xl font-bold text-white shadow-lg shadow-indigo-200/70 sm:size-16 sm:text-2xl">
              {companyInitial}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                  <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Şirket profili
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Topluluk verisi
                </span>
              </div>

              <h1 className="mt-3 wrap-break-word text-3xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
                {companyName}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
                <MessageSquareText
                  className="h-4 w-4 text-indigo-500"
                  aria-hidden="true"
                />

                <span>
                  <strong className="font-semibold text-zinc-700">
                    {experienceCount}
                  </strong>{" "}
                  deneyim paylaşıldı
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            {isLoading ? (
              <div
                aria-hidden="true"
                className="h-11 w-full animate-pulse rounded-xl bg-zinc-200 sm:w-56"
              />
            ) : (
              <Link
                href={href}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 sm:w-auto"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />

                {isAuthenticated ? "Deneyim paylaş" : "Giriş yap ve paylaş"}
              </Link>
            )}
          </div>
        </div>

        <div className="mt-7 border-t border-zinc-100 pt-5">
          <p className="max-w-3xl text-sm leading-6 text-zinc-500">
            Buradaki paylaşımlar gerçek kullanıcı deneyimlerinden oluşur.
            Mülakat süreci, pozisyon ve çalışma ortamı hakkında içeriden bilgi
            edin.
          </p>
        </div>
      </div>
    </section>
  );
}
