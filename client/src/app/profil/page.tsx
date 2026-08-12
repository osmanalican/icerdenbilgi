import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText, Mail, ShieldCheck, UserRound } from "lucide-react";

import { getServerSession } from "@/shared/auth/getServerSession";
import { DeleteAccountSection } from "@/app/profil/_components/DeleteAccountSection";

export const metadata: Metadata = {
  title: "Profil",
  description: "Hesap bilgilerini ve hesap ayarlarını yönet.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/giris?redirect=/profil");
  }

  const fullName = [session.user.firstName, session.user.lastName]
    .filter(Boolean)
    .join(" ");

  const displayName = fullName || session.user.email || "Kullanıcı";

  return (
    <div className="min-h-full bg-linear-to-b from-indigo-50/40 via-zinc-50 to-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="relative overflow-hidden rounded-3xl border border-indigo-100/80 bg-white p-5 shadow-[0_12px_45px_-20px_rgba(79,70,229,0.25)] sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -right-20 h-64 w-64 rounded-full bg-indigo-100/70 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-12 h-64 w-64 rounded-full bg-violet-100/50 blur-3xl"
          />

          <div className="relative flex min-w-0 items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200/70 sm:size-16">
              <UserRound className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
                Profil
              </p>

              <h1 className="mt-1 wrap-break-word text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                {displayName}
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                Hesap bilgilerini ve tercihlerini yönet.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <UserRound className="h-4 w-4" aria-hidden="true" />
                </div>

                <div>
                  <h2 className="font-semibold text-zinc-950">
                    Hesap bilgileri
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    İçerdenBilgi hesabına bağlı temel bilgiler.
                  </p>
                </div>
              </div>

              <dl className="mt-6 divide-y divide-zinc-100">
                <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:items-center">
                  <dt className="text-sm font-medium text-zinc-500">
                    Ad soyad
                  </dt>

                  <dd className="wrap-break-word text-sm font-medium text-zinc-900">
                    {fullName || "Belirtilmemiş"}
                  </dd>
                </div>

                <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:items-center">
                  <dt className="text-sm font-medium text-zinc-500">E-posta</dt>

                  <dd className="flex min-w-0 items-center gap-2 text-sm font-medium text-zinc-900">
                    <Mail
                      className="h-4 w-4 shrink-0 text-zinc-400"
                      aria-hidden="true"
                    />

                    <span className="truncate">{session.user.email}</span>
                  </dd>
                </div>

                <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:items-center">
                  <dt className="text-sm font-medium text-zinc-500">
                    Hesap durumu
                  </dt>

                  <dd>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      Aktif
                    </span>
                  </dd>
                </div>
              </dl>
            </section>

            <DeleteAccountSection />
          </div>

          <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileText className="h-4 w-4" aria-hidden="true" />
            </div>

            <h2 className="mt-4 font-semibold text-zinc-950">Paylaşımların</h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Paylaştığın mülakat, çalışma ve staj deneyimlerini ayrı sayfadan
              görüntüleyebilir ve yönetebilirsin.
            </p>

            <Link
              href="/paylasimlarim"
              className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-4 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              Paylaşımlarıma git
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
