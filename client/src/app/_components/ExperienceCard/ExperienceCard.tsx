import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

import type { LatestExperience } from "@/shared/types";
import { formatDate } from "@/shared/utils";
import { HelpfulButton } from "@/shared/components/HelpfulButton";

type ExperienceCardProps = {
  experience: LatestExperience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const {
    id,
    title,
    content,
    position,
    createdAt,
    company,
    helpfulCount,
    hasVoted,
  } = experience;

  return (
    <article className="group relative min-w-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_14px_35px_-14px_rgba(79,70,229,0.18)] sm:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 opacity-0 transition group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <Link
          href={`/${company.slug}`}
          className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-700">
            {company.name.charAt(0).toLocaleUpperCase("tr-TR")}
          </span>

          <span className="truncate">{company.name}</span>
        </Link>

        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-zinc-300 transition group-hover:text-indigo-500"
          aria-hidden="true"
        />
      </div>

      <h2 className="mt-5 wrap-break-word text-lg font-semibold leading-7 tracking-tight text-zinc-950">
        {title}
      </h2>

      <div className="mt-2 flex items-center gap-1.5 text-sm text-zinc-500">
        <BriefcaseBusiness
          className="h-3.5 w-3.5 shrink-0 text-zinc-400"
          aria-hidden="true"
        />

        <span className="truncate">{position}</span>
      </div>

      <p className="mt-4 line-clamp-3 wrap-break-word text-sm leading-6 text-zinc-600">
        {content}
      </p>

      <div className="mt-6 h-px bg-zinc-100" />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <time
          dateTime={createdAt}
          className="text-xs font-medium text-zinc-400"
        >
          {formatDate(createdAt)}
        </time>

        <div className="shrink-0">
          <HelpfulButton
            experienceId={id}
            initialHelpfulCount={helpfulCount}
            initialHasVoted={hasVoted}
          />
        </div>
      </div>
    </article>
  );
}
