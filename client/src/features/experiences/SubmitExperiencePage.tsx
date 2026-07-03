import { ExperienceForm } from '@/features/experiences/components/ExperienceForm/ExperienceForm';
import { mockExperiences } from '@/features/home/data/mockExperiences';
import { slugify } from '@/shared/utils/slugify';
import { useSearchParams } from 'react-router-dom';

export function SubmitExperiencePage() {
  const [searchParams] = useSearchParams();
  const sirketParam = searchParams.get('sirket');

  const isKnownCompany = sirketParam
    ? mockExperiences.some((exp) => slugify(exp.companyName) === sirketParam)
    : false;

  const fixedCompanyName = isKnownCompany
    ? mockExperiences.find((exp) => slugify(exp.companyName) === sirketParam)?.companyName
    : undefined;

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Deneyimini paylaş</h1>
      <p className="mt-3 text-zinc-600">
        Şirket, mülakat veya çalışma deneyimini anonim olarak paylaş.
      </p>

      <div className="mt-8">
        <ExperienceForm fixedCompanyName={fixedCompanyName} />
      </div>
    </section>
  );
}
