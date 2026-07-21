import { SubmitExperiencePage } from "@/app/paylas/_components/SubmitExperiencePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deneyimini Paylaş",
  description:
    "Mülakat, çalışma veya staj deneyimini anonim olarak paylaş ve diğer adaylara yardımcı ol.",
  alternates: {
    canonical: "/paylas",
  },
  robots: {
    index: false,
    follow: true,
  },
};

type ShareRouteProps = {
  searchParams: Promise<{
    sirket?: string | string[];
  }>;
};

export default async function ShareRoute({ searchParams }: ShareRouteProps) {
  const resolvedSearchParams = await searchParams;

  const companySlug = Array.isArray(resolvedSearchParams.sirket)
    ? resolvedSearchParams.sirket[0]
    : resolvedSearchParams.sirket;

  return <SubmitExperiencePage companySlug={companySlug} />;
}
