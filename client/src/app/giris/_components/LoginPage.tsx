"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks";
import { LoginForm } from "./LoginForm";
import { AuthCard } from "@/shared/components/AuthCard";
import { createSession } from "@/shared/auth";
import { signInWithGoogle } from "@/shared/firebase";
import { getAuthErrorMessage } from "@/shared/utils";

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
  const { refreshSession } = useAuth();
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const safeRedirectPath = getSafeRedirectPath(redirectTo);

  async function handleGoogleLogin() {
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
      title="Giriş yap"
      description="İçerdenBilgi’ye devam etmek için hesabına giriş yap."
      footerText="Henüz hesabın yok mu?"
      footerLinkText="Katıl"
      footerLinkTo={
        redirectTo
          ? `/kayit?redirect=${encodeURIComponent(safeRedirectPath)}`
          : "/kayit"
      }
    >
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-800 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGoogleLoading
            ? "Google ile giriş yapılıyor..."
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

        <LoginForm redirectTo={safeRedirectPath} />
      </div>
    </AuthCard>
  );
}
