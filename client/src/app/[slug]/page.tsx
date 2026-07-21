import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EmptyState } from "@/shared/components";
import { getCompanyBySlug } from "@/shared/api/server";
import { CompanyHeader } from "@/app/[slug]/_components/CompanyHeader";
import { ExperienceRow } from "@/app/[slug]/_components/ExperienceRow";

type CompanyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) {
    return {
      title: "Şirket bulunamadı",
      description: "Aradığınız şirket İçerdenBilgi üzerinde bulunamadı.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${company.name} Çalışan Deneyimleri ve Mülakat Süreçleri`;
  const description =
    `${company.name} çalışanlarının paylaştığı mülakat süreçlerini, ` +
    `çalışma deneyimlerini ve pozisyon değerlendirmelerini keşfet.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${company.slug}`,
    },
    openGraph: {
      title: `${title} | İçerdenBilgi`,
      description,
      type: "website",
      locale: "tr_TR",
      url: `/${company.slug}`,
    },
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <CompanyHeader
        companyName={company.name}
        companySlug={company.slug}
        experienceCount={company.experiences.length}
      />

      <div className="mt-8">
        {company.experiences.length === 0 ? (
          <EmptyState
            title="Henüz deneyim paylaşılmamış"
            description="Bu şirket hakkındaki ilk deneyimi sen paylaşabilirsin."
          />
        ) : (
          company.experiences.map((experience) => (
            <ExperienceRow key={experience.id} experience={experience} />
          ))
        )}
      </div>
    </div>
  );
}
