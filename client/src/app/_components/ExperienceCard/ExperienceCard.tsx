import Link from "next/link";

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
    <article className="min-w-0 rounded-2xl border border-zinc-200 bg-slate-100 p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-md sm:p-5">
      <Link
        href={`/${company.slug}`}
        className="inline-block max-w-full truncate text-sm font-medium text-zinc-500 transition hover:text-zinc-900 hover:underline"
      >
        {company.name}
      </Link>

      <h2 className="mt-2 break-words text-base font-semibold leading-6 text-zinc-950 sm:text-lg sm:leading-7">
        {title}
      </h2>

      <p className="mt-1 break-words text-sm text-zinc-500">{position}</p>

      <p className="mt-4 line-clamp-3 break-words text-sm leading-6 text-zinc-600 sm:leading-7">
        {content}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
        <time dateTime={createdAt} className="shrink-0">
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
