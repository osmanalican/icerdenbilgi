"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthCard } from "@/shared/components/AuthCard";
import { RegisterForm } from "./RegisterForm";

import { signInWithGoogle } from "@/shared/firebase";
import { useAuth } from "@/shared/hooks";

type RegisterPageProps = {
  redirectTo?: string;
};

function getSafeRedirectPath(path?: string) {
  if (!path) return "/";

  if (!path.startsWith("/") || path.startsWith("//")) {
    return "/";
  }

  return path;
}

export function RegisterPage({ redirectTo }: RegisterPageProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const safeRedirect = getSafeRedirectPath(redirectTo);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(safeRedirect);
    }
  }, [isAuthenticated, isLoading, router, safeRedirect]);

  async function handleGoogleRegister() {
    await signInWithGoogle();
  }

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <AuthCard
      title="Kayıt ol"
      description="İçerdenBilgi'ye katılmaya birkaç adım kaldı."
      footerText="Zaten hesabın var mı?"
      footerLinkText="Giriş yap"
      footerLinkTo="/giris"
    >
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-white font-medium hover:bg-zinc-50"
        >
          Google ile devam et
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs text-zinc-400">veya</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <RegisterForm />
      </div>
    </AuthCard>
  );
}
