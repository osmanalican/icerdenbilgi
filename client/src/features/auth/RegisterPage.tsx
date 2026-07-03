import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { AuthCard } from './components/AuthCard';
import { useAuth } from '@/features/auth';
import { Navigate } from 'react-router-dom';

export function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <AuthCard
      title="Katıl"
      description="Deneyim paylaşmak ve topluluğa katkı sağlamak için hesap oluştur."
      footerText="Zaten hesabın var mı?"
      footerLinkText="Giriş yap"
      footerLinkTo="/giris"
    >
      <div className="space-y-4">
        <button className="h-12 w-full rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-800 transition hover:bg-zinc-50">
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
