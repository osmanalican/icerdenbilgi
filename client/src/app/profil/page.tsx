import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText, Plus, UserRound } from "lucide-react";

import { getMyExperiences } from "@/shared/api/server";
import { getServerSession } from "@/shared/auth/getServerSession";
import { MyExperienceCard } from "./_components/MyExperienceCard";
import { ProfilePagination } from "./_components/ProfilePagination";

export const metadata: Metadata = {
  title: "Profil",
  description: "Paylaştığın deneyimleri görüntüle ve yönet.",
  robots: {
    index: false,
    follow: false,
  },
};

type ProfilePageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

function parsePositiveInteger(value: string | undefined, fallback: number) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/giris?redirect=/profil");
  }

  const query = await searchParams;

  const page = parsePositiveInteger(query.page, 1);

  const result = await getMyExperiences({
    page,
  });

  if (!result) {
    redirect("/giris?redirect=/profil");
  }

  const { experiences, pagination } = result;

  if (pagination.totalPages === 0 && page > 1) {
    redirect("/profil");
  }

  if (pagination.totalPages > 0 && page > pagination.totalPages) {
    const redirectUrl =
      pagination.totalPages === 1
        ? "/profil"
        : `/profil?page=${pagination.totalPages}`;

    redirect(redirectUrl);
  }

  const fullName = [session.user.firstName, session.user.lastName]
    .filter(Boolean)
    .join(" ");

  const displayName = fullName || session.user.email || "Kullanıcı";

  return (
    <div className="min-h-full bg-linear-to-b from-indigo-50/40 via-zinc-50 to-zinc-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="relative overflow-hidden rounded-3xl border border-indigo-100/80 bg-white p-5 shadow-[0_12px_45px_-20px_rgba(79,70,229,0.25)] sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -right-20 h-64 w-64 rounded-full bg-indigo-100/70 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-12 h-64 w-64 rounded-full bg-violet-100/50 blur-3xl"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200/70 sm:size-16">
                <UserRound
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
                  Profil
                </p>

                <h1 className="mt-1 wrap-break-word text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                  {displayName}
                </h1>

                <p className="mt-1 truncate text-sm text-zinc-500">
                  {session.user.email}
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm">
              <FileText
                className="h-4 w-4 text-indigo-600"
                aria-hidden="true"
              />

              <span className="text-zinc-600">
                Toplam{" "}
                <strong className="font-semibold text-indigo-700">
                  {pagination.total}
                </strong>{" "}
                paylaşım
              </span>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="my-experiences-title"
          className="mt-8 sm:mt-10"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
                İçeriklerin
              </p>

              <h2
                id="my-experiences-title"
                className="mt-1.5 text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl"
              >
                Paylaşımlarım
              </h2>

              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Paylaştığın deneyimleri görüntüle, düzenle veya sil.
              </p>
            </div>

            <Link
              href="/paylas"
              className="inline-flex h-10 w-fit items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Yeni deneyim
            </Link>
          </div>

          {experiences.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-indigo-200 bg-white/70 px-5 py-14 text-center shadow-sm">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-4 font-semibold text-zinc-950">
                Henüz bir deneyim paylaşmadın
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                Mülakat veya çalışma deneyimini paylaşarak diğer adaylara
                içeriden bilgi verebilirsin.
              </p>

              <Link
                href="/paylas"
                className="mt-5 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                İlk deneyimini paylaş
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {experiences.map((experience) => (
                <MyExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          )}

          <ProfilePagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
          />
        </section>
      </div>
    </div>
  );
}
