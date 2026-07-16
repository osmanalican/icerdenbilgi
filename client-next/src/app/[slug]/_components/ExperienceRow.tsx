import { BriefcaseBusiness, UserRound } from "lucide-react";

import type { CompanyExperience, ExperienceType } from "@/shared/types";
import { formatDate } from "@/shared/utils";

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
  const { title, position, content, type, createdAt, isAnonymous, user } =
    experience;

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  const authorName = isAnonymous || !fullName ? "Anonim kullanıcı" : fullName;

  return (
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

        <time dateTime={createdAt} className="shrink-0 text-xs text-zinc-400">
          {formatDate(createdAt)}
        </time>
      </div>

      <p className="mt-3 whitespace-pre-line leading-7 text-zinc-600">
        {content}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-400">
        <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
        {authorName}
      </div>
    </article>
  );
}
