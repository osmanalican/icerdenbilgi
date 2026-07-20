import type { Metadata } from "next";

import { RegisterPage } from "./_components/RegisterPage";

export const metadata: Metadata = {
  title: "Kayıt Ol",
  description:
    "İçerdenBilgi'ye katıl, deneyimlerini paylaş ve topluluğun bir parçası ol.",
  alternates: {
    canonical: "/kayit",
  },
  robots: {
    index: false,
    follow: true,
  },
};

type RegisterRouteProps = {
  searchParams: Promise<{
    redirect?: string | string[];
  }>;
};

export default async function RegisterRoute({
  searchParams,
}: RegisterRouteProps) {
  const resolvedSearchParams = await searchParams;

  const redirectParam = Array.isArray(resolvedSearchParams.redirect)
    ? resolvedSearchParams.redirect[0]
    : resolvedSearchParams.redirect;

  return <RegisterPage redirectTo={redirectParam} />;
}
