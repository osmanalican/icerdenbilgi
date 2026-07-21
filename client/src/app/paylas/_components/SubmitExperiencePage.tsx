"use client";

import { slugify } from "@/shared/utils/slugify";

import { ExperienceForm } from "./ExperienceForm";
import { mockExperiences } from "@/shared/data/mockExperiences";

type SubmitExperiencePageProps = {
  companySlug?: string;
};

export function SubmitExperiencePage({
  companySlug,
}: SubmitExperiencePageProps) {
  const company = companySlug
    ? mockExperiences.find(
        (experience) => slugify(experience.companyName) === companySlug,
      )
    : undefined;

  const fixedCompanyName = company?.companyName;

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
        Deneyimini paylaş
      </h1>

      <p className="mt-3 text-zinc-600">
        Şirket, mülakat veya çalışma deneyimini anonim olarak paylaş.
      </p>

      <div className="mt-8">
        <ExperienceForm fixedCompanyName={fixedCompanyName} />
      </div>
    </section>
  );
}
