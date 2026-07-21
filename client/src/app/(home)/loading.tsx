import { Skeleton } from "@/shared/components";

export default function Loading() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="mt-6 h-14 max-w-3xl" />
        <Skeleton className="mt-6 h-6 max-w-2xl" />
        <Skeleton className="mt-10 h-12 max-w-2xl" />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="mt-3 h-4 w-72" />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-200 bg-slate-100 p-5"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-4 h-6 w-48" />
              <Skeleton className="mt-2 h-4 w-32" />
              <Skeleton className="mt-5 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-11/12" />
              <Skeleton className="mt-2 h-4 w-8/12" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
