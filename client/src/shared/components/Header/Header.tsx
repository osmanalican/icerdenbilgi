import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { logout } from '@/shared/firebase';

export function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userInitial = user?.displayName?.[0] ?? user?.email?.[0] ?? '?';

  async function handleLogout() {
    await logout();
    setIsUserMenuOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight text-zinc-950">
          İçerden
        </Link>

        <nav className="flex items-center gap-2 text-sm sm:gap-3">
          {!isLoading &&
            (isAuthenticated ? (
              <>
                <Link
                  to="/paylas"
                  className="hidden rounded-full bg-zinc-950 px-4 py-2 font-medium text-white transition hover:bg-zinc-800 sm:inline-flex"
                >
                  Deneyim ekle
                </Link>

                <Link
                  to="/paylas"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-lg font-medium text-white transition hover:bg-zinc-800 sm:hidden"
                  aria-label="Deneyim ekle"
                >
                  +
                </Link>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-2 py-1.5 text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold uppercase text-zinc-700">
                      {userInitial}
                    </span>

                    <span className="hidden max-w-32 truncate font-medium sm:block">
                      {user?.displayName ?? user?.email}
                    </span>

                    <span className="hidden text-zinc-400 sm:block">⌄</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl">
                      <div className="px-3 py-2">
                        <p className="truncate text-sm font-medium text-zinc-900">
                          {user?.displayName ?? 'Kullanıcı'}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-zinc-400">{user?.email}</p>
                      </div>

                      <div className="my-1 h-px bg-zinc-100" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
                      >
                        Çıkış yap
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/giris" className="text-zinc-600 transition hover:text-zinc-950">
                  Giriş yap
                </Link>

                <Link
                  to="/kayit"
                  className="rounded-full border border-zinc-300 px-4 py-2 text-zinc-900 transition hover:border-zinc-500"
                >
                  Katıl
                </Link>
              </>
            ))}
        </nav>
      </div>
    </header>
  );
}
