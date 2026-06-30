import { ExperienceCard } from '@/features/home/components/ExperienceCard';
import { mockExperiences } from '@/features/home/data/mockExperiences';

export function RecentExperiences() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-950">Son Paylaşılanlar</h2>
          <p className="mt-1 text-sm text-zinc-500">Son deneyimlerin bazıları</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {mockExperiences.map((experience) => (
          <ExperienceCard key={experience.id} {...experience} />
        ))}
      </div>
    </section>
  );
}
