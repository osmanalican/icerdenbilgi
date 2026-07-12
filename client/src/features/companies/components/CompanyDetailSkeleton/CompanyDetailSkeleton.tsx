import { Skeleton } from '@/shared/components';

export function CompanyDetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-3 h-5 w-40" />

      {/* Experience 1 */}
      <div className="mt-10 border-b border-zinc-100 pb-6">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-11/12" />
        <Skeleton className="mt-2 h-4 w-10/12" />
      </div>

      {/* Experience 2 */}
      <div className="mt-6 border-b border-zinc-100 pb-6">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-24" />
        </div>

        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-9/12" />
        <Skeleton className="mt-2 h-4 w-8/12" />
      </div>
    </div>
  );
}
