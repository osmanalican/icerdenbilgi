import { ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { LatestExperience } from '@/features/experiences/types';
import { formatDate } from '@/shared/utils';

type ExperienceCardProps = LatestExperience;

export function ExperienceCard({
  title,
  content,
  position,
  createdAt,
  company,
  _count,
}: ExperienceCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-slate-100 p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md">
      <Link
        to={`/${company.slug}`}
        className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900 hover:underline"
      >
        {company.name}
      </Link>

      <h3 className="mt-2 text-lg font-semibold text-zinc-950">{title}</h3>

      <p className="mt-1 text-sm text-zinc-500">{position}</p>

      <p className="mt-4 line-clamp-3 leading-7 text-zinc-600">{content}</p>

      <div className="mt-5 flex items-center justify-between text-sm text-zinc-400">
        <time dateTime={createdAt}>{formatDate(createdAt)}</time>

        <div
          className="flex items-center gap-1"
          aria-label={`${_count.helpfulVotes} kişi faydalı buldu`}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{_count.helpfulVotes}</span>
        </div>
      </div>
    </article>
  );
}
