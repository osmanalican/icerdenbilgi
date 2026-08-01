"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BriefcaseBusiness,
  LoaderCircle,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";

import { deleteExperience } from "@/shared/api/client";
import { ConfirmDialog } from "@/shared/components";
import type { CompanyExperience, ExperienceType } from "@/shared/types";
import { formatDate } from "@/shared/utils";
import { HelpfulButton } from "@/shared/components/HelpfulButton";

type ExperienceRowProps = {
  experience: CompanyExperience;
};

const experienceTypeLabels: Record<ExperienceType, string> = {
  INTERVIEW: "Mülakat",
  WORK: "Çalışma deneyimi",
  INTERNSHIP: "Staj",
  OTHER: "Diğer",
};

export function ExperienceRow({ experience }: ExperienceRowProps) {
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    title,
    position,
    content,
    type,
    createdAt,
    isAnonymous,
    user,
    canEdit,
  } = experience;

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  const authorName = isAnonymous || !fullName ? "Anonim kullanıcı" : fullName;

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
      <article className="border-b border-zinc-100 py-6 first:pt-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                {experienceTypeLabels[type]}
              </span>

              <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                <BriefcaseBusiness className="h-3.5 w-3.5" aria-hidden="true" />

                {position}
              </span>
            </div>

            <h2 className="mt-3 text-base font-semibold text-zinc-950">
              {title}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {canEdit && (
              <>
                <Link
                  href={`/paylas/${experience.id}/duzenle`}
                  className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-zinc-950"
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  Düzenle
                </Link>

                <button
                  type="button"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  disabled={deleteMutation.isPending}
                  className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-red-500 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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
              </>
            )}

            <time dateTime={createdAt} className="text-xs text-zinc-400">
              {formatDate(createdAt)}
            </time>
          </div>
        </div>

        <p className="mt-3 whitespace-pre-line leading-7 text-zinc-600">
          {content}
        </p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <UserRound className="h-3.5 w-3.5" aria-hidden="true" />

            {authorName}
          </div>

          <HelpfulButton
            experienceId={experience.id}
            initialHelpfulCount={experience.helpfulCount}
            initialHasVoted={experience.hasVoted}
          />
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
