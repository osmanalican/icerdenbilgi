import { slugify } from '@/shared/lib';
import { Link } from 'react-router-dom';

type CompanyHeaderProps = {
  companyName: string;
  experienceCount: number;
};

export function CompanyHeader({ companyName, experienceCount }: CompanyHeaderProps) {
  return (
    <section className="border-b border-zinc-200 pb-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">Şirket deneyimleri</p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">{companyName}</h1>

          <p className="mt-3 text-zinc-600">
            Bu şirket hakkında {experienceCount} deneyim paylaşıldı.
          </p>
        </div>

        <Link to={`/paylas?sirket=${slugify(companyName)}`}>
          <button className="h-11 rounded-xl bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800">
            Deneyim paylaş
          </button>
        </Link>
      </div>
    </section>
  );
}
