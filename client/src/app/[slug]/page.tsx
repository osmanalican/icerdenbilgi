import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { EmptyState } from "@/shared/components";
import { getCompanyBySlug } from "@/shared/api/server";
import { CompanyHeader } from "@/app/[slug]/_components/CompanyHeader";
import { CompanyPagination } from "@/app/[slug]/_components/CompanyPagination";
import { ExperienceRow } from "@/app/[slug]/_components/ExperienceRow";

type CompanyPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

function parsePositiveInteger(value: string | undefined, fallback: number) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
}

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;

  const result = await getCompanyBySlug(slug, {
    page: 1,
  });

  if (!result) {
    return {
      title: "Şirket bulunamadı",
      description: "Aradığınız şirket İçerdenBilgi üzerinde bulunamadı.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { company } = result;

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

export default async function CompanyPage({
  params,
  searchParams,
}: CompanyPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  const page = parsePositiveInteger(query.page, 1);

  const result = await getCompanyBySlug(slug, {
    page,
  });

  if (!result) {
    notFound();
  }

  const { company, pagination } = result;

  if (pagination.totalPages > 0 && page > pagination.totalPages) {
    const redirectUrl =
      pagination.totalPages === 1
        ? `/${company.slug}`
        : `/${company.slug}?page=${pagination.totalPages}`;

    redirect(redirectUrl);
  }

  return (
    <div className="min-h-full bg-linear-to-b from-indigo-50/35 via-zinc-50 to-zinc-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <CompanyHeader
          companyName={company.name}
          companySlug={company.slug}
          experienceCount={company.experienceCount}
        />

        <section
          aria-labelledby="company-experiences-title"
          className="mt-8 sm:mt-10"
        >
          <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
                Topluluktan
              </p>

              <h2
                id="company-experiences-title"
                className="mt-1.5 text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl"
              >
                Paylaşılan deneyimler
              </h2>
            </div>
          </div>

          {company.experiences.length === 0 ? (
            <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
              <EmptyState
                title="Henüz deneyim paylaşılmamış"
                description="Bu şirket hakkındaki ilk deneyimi sen paylaşabilirsin."
              />
            </div>
          ) : (
            <div className="space-y-4">
              {company.experiences.map((experience) => (
                <ExperienceRow key={experience.id} experience={experience} />
              ))}
            </div>
          )}
        </section>

        <CompanyPagination
          slug={company.slug}
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
        />
      </div>
    </div>
  );
}
