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
      className="mx-auto max-w-7xl px-6 pb-16"
    >
      <div className="mb-6">
        <h2
          id="recent-experiences-title"
          className="text-xl font-semibold text-zinc-950"
        >
          Son Paylaşılanlar
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Topluluğun en son paylaştığı deneyimler
        </p>
      </div>

      {experiences.length === 0 ? (
        <EmptyState
          title="Henüz deneyim paylaşılmamış"
          description="Topluluktaki ilk deneyimi sen paylaşabilirsin."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      )}
    </section>
  );
}
