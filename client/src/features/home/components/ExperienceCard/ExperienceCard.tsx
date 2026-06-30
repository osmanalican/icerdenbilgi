import { Link } from 'react-router-dom';

type ExperienceCardProps = {
  companyName: string;
  position: string;
  summary: string;
  createdAt: string;
  helpfulCount: number;
};

export function ExperienceCard({
  companyName,
  position,
  summary,
  createdAt,
  helpfulCount,
}: ExperienceCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-slate-100 p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md">
      <Link
        to={`/${companyName.toLowerCase()}`}
        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:underline"
      >
        {companyName}
      </Link>
      <h3 className="mt-2 text-lg font-semibold text-zinc-950">{position}</h3>

      <p className="mt-4 line-clamp-3 leading-7 text-zinc-600">{summary}</p>

      <div className="mt-5 flex justify-between text-sm text-zinc-400">
        <span>{createdAt}</span>
        <button type="button" className="flex items-center gap-1 hover:text-zinc-700">
          <svg
            className="h-4 w-4 cursor-pointer"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2"
            />
          </svg>
          {helpfulCount}
        </button>
      </div>
    </article>
  );
}
