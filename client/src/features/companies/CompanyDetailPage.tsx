import { useParams } from 'react-router-dom';
import { mockExperiences } from '../home/data/mockExperiences';
import { ExperienceRow } from './components/ExperienceRow';
import { NotFoundPage } from '@/features/not-found/NotFoundPage';

export function CompanyDetailPage() {
  const { slug } = useParams();

  const companyExperiences = mockExperiences.filter(
    (exp) => exp.companyName.toLowerCase() === slug?.toLowerCase(),
  );

  const companyExist = companyExperiences.length > 0;

  if (!companyExist) {
    return <NotFoundPage />;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-zinc-950 capitalize">{slug}</h1>
      <p className="mt-1 text-sm text-zinc-500">{companyExperiences.length} deneyim paylaşıldı</p>

      <div className="mt-8">
        {companyExperiences.map((exp) => (
          <ExperienceRow key={exp.id} {...exp} />
        ))}
      </div>
    </div>
  );
}
