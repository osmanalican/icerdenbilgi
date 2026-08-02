import { ExperienceForm } from "./ExperienceForm";

type SubmitExperiencePageProps = {
  fixedCompanyName?: string;
};

export function SubmitExperiencePage({
  fixedCompanyName,
}: SubmitExperiencePageProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
        Deneyimini paylaş
      </h1>

      <p className="mt-3 text-zinc-600">
        Şirket, mülakat veya çalışma deneyimini anonim olarak paylaş.
      </p>

      <div className="mt-8">
        <ExperienceForm mode="create" fixedCompanyName={fixedCompanyName} />
      </div>
    </section>
  );
}
