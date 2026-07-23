"use client";

import Link from "next/link";

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

  return (
    <section className="border-b border-zinc-200 pb-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">
            Şirket deneyimleri
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">
            {companyName}
          </h1>

          <p className="mt-3 text-zinc-600">
            Bu şirket hakkında {experienceCount} deneyim paylaşıldı.
          </p>
        </div>

        {isLoading ? (
          <div
            aria-hidden="true"
            className="h-11 w-56 animate-pulse rounded-xl bg-zinc-200"
          />
        ) : (
          <Link
            href={href}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            {isAuthenticated ? "Deneyim paylaş" : "Giriş yap ve deneyim paylaş"}
          </Link>
        )}
      </div>
    </section>
  );
}
