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
      className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16"
    >
      <div className="mb-5 sm:mb-6">
        <h2
          id="recent-experiences-title"
          className="text-lg font-semibold text-zinc-950 sm:text-xl"
        >
          Son Paylaşılanlar
        </h2>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          Topluluğun en son paylaştığı deneyimler
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
    </section>
  );
}
