"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { LoginForm } from "./LoginForm";
import { AuthCard } from "@/shared/components/AuthCard";
import { signInWithGoogle } from "@/shared/firebase";
import { useAuth } from "@/shared/hooks";

type LoginPageProps = {
  redirectTo?: string;
};

function getSafeRedirectPath(redirectTo?: string) {
  if (!redirectTo) {
    return "/";
  }

  if (!redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
    return "/";
  }

  return redirectTo;
}

export function LoginPage({ redirectTo }: LoginPageProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const safeRedirectPath = getSafeRedirectPath(redirectTo);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(safeRedirectPath);
    }
  }, [isAuthenticated, isLoading, router, safeRedirectPath]);

  async function handleGoogleLogin() {
    await signInWithGoogle();
  }

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <AuthCard
      title="Giriş yap"
      description="İçerdenBilgi’ye devam etmek için hesabına giriş yap."
      footerText="Henüz hesabın yok mu?"
      footerLinkText="Katıl"
      footerLinkTo="/kayit"
    >
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-800 transition hover:bg-zinc-50"
        >
          Google ile devam et
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs text-zinc-400">veya</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <LoginForm />
      </div>
    </AuthCard>
  );
}
