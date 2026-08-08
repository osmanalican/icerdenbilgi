"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  LoaderCircle,
  LockKeyhole,
  Pencil,
  ThumbsUp,
  Trash2,
} from "lucide-react";

import { deleteExperience } from "@/shared/api/client";
import { ConfirmDialog } from "@/shared/components";
import type {
  ExperienceStatus,
  ExperienceType,
  MyExperience,
} from "@/shared/types";
import { formatDate } from "@/shared/utils";

type MyExperienceCardProps = {
  experience: MyExperience;
};

const experienceTypeLabels: Record<ExperienceType, string> = {
  INTERVIEW: "Mülakat",
  WORK: "Çalışma deneyimi",
  INTERNSHIP: "Staj",
  OTHER: "Diğer",
};

const experienceTypeClassNames: Record<ExperienceType, string> = {
  INTERVIEW: "border-indigo-100 bg-indigo-50 text-indigo-700",
  WORK: "border-emerald-100 bg-emerald-50 text-emerald-700",
  INTERNSHIP: "border-amber-100 bg-amber-50 text-amber-700",
  OTHER: "border-zinc-200 bg-zinc-100 text-zinc-600",
};

const statusLabels: Record<ExperienceStatus, string> = {
  PUBLISHED: "Yayında",
  PENDING: "Onay bekliyor",
  REJECTED: "Reddedildi",
};

const statusClassNames: Record<ExperienceStatus, string> = {
  PUBLISHED: "bg-emerald-500",
  PENDING: "bg-amber-500",
  REJECTED: "bg-red-500",
};

export function MyExperienceCard({ experience }: MyExperienceCardProps) {
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteExperience(experience.id),

    onSuccess: () => {
      setIsDeleteDialogOpen(false);

      toast.success("Deneyim silindi.");

      router.refresh();
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Deneyim silinemedi.",
      );
    },
  });

  function handleDelete() {
    deleteMutation.mutate();
  }

  return (
    <>
      <article className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition duration-200 hover:border-indigo-200 hover:shadow-[0_12px_35px_-18px_rgba(79,70,229,0.22)] sm:p-6">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-0.5 bg-linear-to-b from-indigo-500 via-violet-500 to-transparent opacity-0 transition group-hover:opacity-100"
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={[
                  "rounded-full border px-2.5 py-1 text-xs font-semibold",
                  experienceTypeClassNames[experience.type],
                ].join(" ")}
              >
                {experienceTypeLabels[experience.type]}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600">
                <span
                  className={[
                    "size-1.5 rounded-full",
                    statusClassNames[experience.status],
                  ].join(" ")}
                  aria-hidden="true"
                />

                {statusLabels[experience.status]}
              </span>

              {experience.isAnonymous && (
                <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                  <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
                  Anonim
                </span>
              )}
            </div>

            <h2 className="mt-4 wrap-break-word text-lg font-semibold leading-7 tracking-tight text-zinc-950">
              {experience.title}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
              <Link
                href={`/${experience.company.slug}`}
                className="inline-flex min-w-0 items-center gap-1.5 font-medium text-indigo-600 transition hover:text-indigo-800 hover:underline"
              >
                <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />

                <span className="truncate">{experience.company.name}</span>
              </Link>

              <span className="inline-flex min-w-0 items-center gap-1.5">
                <BriefcaseBusiness
                  className="h-4 w-4 shrink-0 text-zinc-400"
                  aria-hidden="true"
                />

                <span className="truncate">{experience.position}</span>
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Link
              href={`/paylas/${experience.id}/duzenle`}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              Düzenle
            </Link>

            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={deleteMutation.isPending}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 text-xs font-medium text-red-600 transition hover:border-red-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleteMutation.isPending ? (
                <LoaderCircle
                  className="h-3.5 w-3.5 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              )}

              {deleteMutation.isPending ? "Siliniyor..." : "Sil"}
            </button>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 whitespace-pre-line wrap-break-word text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
          {experience.content}
        </p>

        <div className="mt-6 border-t border-zinc-100 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <time
              dateTime={experience.createdAt}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400"
            >
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />

              {formatDate(experience.createdAt)}
            </time>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-500">
              <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
              {experience.helpfulCount} faydalı
            </div>
          </div>
        </div>
      </article>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Deneyimi sil"
        description="Bu deneyimi silmek istediğine emin misin? Bu işlem geri alınamaz."
        confirmLabel="Deneyimi sil"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}
