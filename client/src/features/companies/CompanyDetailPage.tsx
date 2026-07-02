import { useParams } from 'react-router-dom';
import { mockExperiences } from '../home/data/mockExperiences';
import { NotFoundPage } from '@/features/not-found/NotFoundPage';
import { ExperienceRow } from '@/features/companies/components/ExperienceRow';
import { CompanyHeader } from '@/features/companies/components/CompanyHeader';
import { slugify } from '@/shared/lib';

export function CompanyDetailPage() {
  const { slug } = useParams();

  const companyExperiences = mockExperiences.filter((exp) => slugify(exp.companyName) === slug);

  if (companyExperiences.length === 0) {
    return <NotFoundPage />;
  }

  const companyName = companyExperiences[0].companyName;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <CompanyHeader companyName={companyName} experienceCount={companyExperiences.length} />

      <div className="mt-8">
        {companyExperiences.map((experience) => (
          <ExperienceRow key={experience.id} {...experience} />
        ))}
      </div>
    </div>
  );
}
