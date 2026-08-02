import type { LatestExperience } from "@/shared/types";

import { EmptyState } from "@/shared/components";
import { ExperienceCard } from "@/app/_components/ExperienceCard";

type RecentExperiencesProps = {
  experiences: LatestExperience[];
};

export function RecentExperiences({ experiences }: RecentExperiencesProps) {
  return (
    <section
      aria-labelledby="recent-experiences-title"
      className="relative overflow-hidden bg-gradient-to-b from-white via-zinc-50/80 to-zinc-50"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-indigo-100/35 via-violet-50/20 to-transparent blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 inline-flex items-center rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm">
            Topluluktan
          </div>

          <h2
            id="recent-experiences-title"
            className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl"
          >
            Son Paylaşılanlar
          </h2>

          <p className="mt-1.5 max-w-xl text-sm leading-6 text-zinc-500">
            Topluluğun en son paylaştığı mülakat ve çalışma deneyimlerini
            keşfet.
          </p>
        </div>

        {experiences.length === 0 ? (
          <EmptyState
            title="Henüz deneyim paylaşılmamış"
            description="Topluluktaki ilk deneyimi sen paylaşabilirsin."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
