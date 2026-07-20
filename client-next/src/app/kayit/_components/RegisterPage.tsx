"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks";
import { RegisterForm } from "./RegisterForm";
import { AuthCard } from "@/shared/components/AuthCard";
import { createSession } from "@/shared/auth";
import { signInWithGoogle } from "@/shared/firebase";
import { getAuthErrorMessage } from "@/shared/utils";

type RegisterPageProps = {
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

export function RegisterPage({ redirectTo }: RegisterPageProps) {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const safeRedirectPath = getSafeRedirectPath(redirectTo);

  async function handleGoogleRegister() {
    setGoogleError(null);
    setIsGoogleLoading(true);

    try {
      const credentials = await signInWithGoogle();
      const idToken = await credentials.user.getIdToken(true);

      await createSession(idToken);
      await refreshSession();

      router.replace(safeRedirectPath);
      router.refresh();
    } catch (error) {
      setGoogleError(getAuthErrorMessage(error));
      setIsGoogleLoading(false);
    }
  }

  return (
    <AuthCard
      title="Kayıt ol"
      description="İçerdenBilgi'ye katılmaya birkaç adım kaldı."
      footerText="Zaten hesabın var mı?"
      footerLinkText="Giriş yap"
      footerLinkTo={
        redirectTo
          ? `/giris?redirect=${encodeURIComponent(safeRedirectPath)}`
          : "/giris"
      }
    >
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={isGoogleLoading}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-800 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGoogleLoading
            ? "Google ile kayıt olunuyor..."
            : "Google ile devam et"}
        </button>

        {googleError && (
          <p
            role="alert"
            className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {googleError}
          </p>
        )}

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs text-zinc-400">veya</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <RegisterForm redirectTo={safeRedirectPath} />
      </div>
    </AuthCard>
  );
}
