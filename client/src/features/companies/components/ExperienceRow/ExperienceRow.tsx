type ExperienceRowProps = {
  position: string;
  content: string;
  createdAt: string;
};

export function ExperienceRow({ position, content, createdAt }: ExperienceRowProps) {
  return (
    <article className="border-b border-zinc-100 py-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-900">{position}</h3>
        <span className="text-xs text-zinc-400">{createdAt}</span>
      </div>
      <p className="mt-2 leading-7 text-zinc-600">{content}</p>
      <div className="mt-3 flex items-center gap-1 text-xs text-zinc-400">
        <svg
          className="h-3.5 w-3.5"
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
        ...
      </div>
    </article>
  );
}
