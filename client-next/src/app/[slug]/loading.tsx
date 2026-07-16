import { Skeleton } from "@/shared/components";

export default function CompanyLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="border-b border-zinc-200 pb-8">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="mt-4 h-10 w-64" />
        <Skeleton className="mt-4 h-5 w-80" />
      </section>

      <div className="mt-8 space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <article key={index} className="border-b border-zinc-100 pb-6">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="mt-4 h-5 w-56" />

            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-8/12" />
            </div>

            <Skeleton className="mt-5 h-4 w-32" />
          </article>
        ))}
      </div>
    </div>
  );
}
