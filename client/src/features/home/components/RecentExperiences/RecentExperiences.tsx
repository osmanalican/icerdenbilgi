import { useLatestExperiences } from '@/features/experiences/hooks';
import { ExperienceCard } from '@/features/home/components/ExperienceCard';
import { EmptyState, Skeleton } from '@/shared/components';

function RecentExperiencesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-zinc-200 bg-slate-100 p-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-6 w-48" />
          <Skeleton className="mt-2 h-4 w-32" />

          <div className="mt-5 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-8/12" />
          </div>

          <div className="mt-6 flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RecentExperiences() {
  const { data, isLoading, isError } = useLatestExperiences({
    page: 1,
    limit: 6,
  });

  const experiences = data?.experiences ?? [];

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-950">Son Paylaşılanlar</h2>

          <p className="mt-1 text-sm text-zinc-500">Topluluğun en son paylaştığı deneyimler</p>
        </div>
      </div>

      {isLoading && <RecentExperiencesSkeleton />}

      {!isLoading && isError && (
        <EmptyState
          title="Deneyimler yüklenemedi"
          description="Son paylaşılan deneyimleri getirirken bir sorun oluştu."
        />
      )}

      {!isLoading && !isError && experiences.length === 0 && (
        <EmptyState
          title="Henüz deneyim paylaşılmamış"
          description="Topluluktaki ilk deneyimi sen paylaşabilirsin."
        />
      )}

      {!isLoading && !isError && experiences.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} {...experience} />
          ))}
        </div>
      )}
    </section>
  );
}
