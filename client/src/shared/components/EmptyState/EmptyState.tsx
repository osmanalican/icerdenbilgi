type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-white px-8 py-16 text-center">
      <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>

      {description && <p className="mt-3 max-w-md text-zinc-500">{description}</p>}

      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
