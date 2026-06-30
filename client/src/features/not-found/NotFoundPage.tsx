import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="text-2xl font-semibold text-zinc-950">Sayfa bulunamadı</h1>
      <p className="mt-2 text-sm text-zinc-500">Aradığın şirket ya da sayfa burada değil.</p>
      <Link
        to="/"
        className="mt-6 inline-block text-sm font-medium text-zinc-700 hover:text-zinc-950"
      >
        ← Ana sayfaya dön
      </Link>
    </div>
  );
}
