import { LoginForm } from '@/features/auth/components/LoginForm';
import { AuthCard } from './components/AuthCard';
import { useAuth } from '@/features/auth/hooks';
import { signInWithGoogle } from '@/shared/firebase';
import { Navigate, useLocation } from 'react-router-dom';

export function LoginPage() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  const from = location.state?.from?.pathname ?? '/';

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
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
          onClick={() => signInWithGoogle()}
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
