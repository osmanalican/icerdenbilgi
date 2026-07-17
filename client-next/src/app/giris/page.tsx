import { LoginPage } from "@/app/giris/_components/LoginPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description:
    "İçerdenBilgi hesabına giriş yaparak deneyim paylaşmaya ve topluluğa katkı sağlamaya devam et.",
  alternates: {
    canonical: "/giris",
  },
  robots: {
    index: false,
    follow: true,
  },
};

type LoginRouteProps = {
  searchParams: Promise<{
    redirect?: string | string[];
  }>;
};

export default async function LoginRoute({ searchParams }: LoginRouteProps) {
  const resolvedSearchParams = await searchParams;

  const redirectParam = Array.isArray(resolvedSearchParams.redirect)
    ? resolvedSearchParams.redirect[0]
    : resolvedSearchParams.redirect;

  return <LoginPage redirectTo={redirectParam} />;
}
