import { useParams } from 'react-router-dom';
import { useCompany } from '@/features/companies/hooks/useCompany';
import { ExperienceRow } from '@/features/companies/components/ExperienceRow';
import { CompanyHeader } from '@/features/companies/components/CompanyHeader';
import { CompanyDetailSkeleton } from '@/features/companies/components/CompanyDetailSkeleton';
import { EmptyState } from '@/shared/components';

export function CompanyDetailPage() {
  const { slug } = useParams();

  const { data: company, isLoading, isError } = useCompany(slug);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <CompanyDetailSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <EmptyState title="Bir hata oluştu" description="Şirket bilgileri yüklenemedi." />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <EmptyState
          title="Şirket bulunamadı"
          description="Aradığınız şirkete ait bir kayıt bulunamadı."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <CompanyHeader companyName={company.name} experienceCount={company.experiences.length} />

      <div className="mt-8">
        {company.experiences.length === 0 ? (
          <EmptyState
            title="Henüz deneyim paylaşılmamış"
            description="Bu şirket hakkındaki ilk deneyimi sen paylaşabilirsin."
          />
        ) : (
          company.experiences.map((experience) => (
            <ExperienceRow key={experience.id} {...experience} />
          ))
        )}
      </div>
    </div>
  );
}
