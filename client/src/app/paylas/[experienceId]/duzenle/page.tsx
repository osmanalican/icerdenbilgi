import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getExperienceForEdit } from "@/shared/api/server";
import { ExperienceForm } from "@/app/paylas/_components/ExperienceForm";

export const metadata: Metadata = {
  title: "Deneyimi Düzenle",
  description: "Daha önce paylaştığın deneyimi düzenle.",
  robots: {
    index: false,
    follow: false,
  },
};

type EditExperienceRouteProps = {
  params: Promise<{
    experienceId: string;
  }>;
};

export default async function EditExperienceRoute({
  params,
}: EditExperienceRouteProps) {
  const { experienceId } = await params;

  const experience = await getExperienceForEdit(experienceId);

  if (!experience) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
        Deneyimini düzenle
      </h1>

      <p className="mt-3 text-zinc-600">
        Paylaştığın deneyimde değişiklik yap ve güncel halini kaydet.
      </p>

      <div className="mt-8">
        <ExperienceForm
          mode="edit"
          experienceId={experience.id}
          initialValues={experience}
        />
      </div>
    </section>
  );
}
