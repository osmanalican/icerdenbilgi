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
    <article className="rounded-2xl border border-zinc-200 bg-slate-100 p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md">
      <Link
        href={`/${company.slug}`}
        className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900 hover:underline"
      >
        {company.name}
      </Link>

      <h2 className="mt-2 text-lg font-semibold text-zinc-950">{title}</h2>

      <p className="mt-1 text-sm text-zinc-500">{position}</p>

      <p className="mt-4 line-clamp-3 leading-7 text-zinc-600">{content}</p>

      <div className="mt-5 flex items-center justify-between text-sm text-zinc-400">
        <time dateTime={createdAt}>{formatDate(createdAt)}</time>

        <HelpfulButton
          experienceId={id}
          initialHelpfulCount={helpfulCount}
          initialHasVoted={hasVoted}
        />
      </div>
    </article>
  );
}
