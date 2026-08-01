"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { deleteSession } from "@/shared/auth";
import { logout } from "@/shared/firebase";
import { useAuth } from "@/shared/hooks";

export function Header() {
  const router = useRouter();

  const { user, isAuthenticated, isLoading, refreshSession } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userInitial = user?.firstName?.[0] ?? user?.email?.[0] ?? "?";

  async function handleLogout() {
    try {
      await deleteSession();
      await logout();
      await refreshSession();

      setIsUserMenuOpen(false);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-base font-semibold tracking-tight text-zinc-950 sm:text-lg"
        >
          İçerden
        </Link>

        <nav
          aria-label="Ana menü"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          {!isLoading &&
            (isAuthenticated ? (
              <>
                <Link
                  href="/paylas"
                  className="hidden h-9 items-center justify-center rounded-full bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 sm:inline-flex"
                >
                  Deneyim ekle
                </Link>

                <Link
                  href="/paylas"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white transition hover:bg-zinc-800 sm:hidden"
                  aria-label="Deneyim ekle"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </Link>

                <div className="relative">
                  <button
                    type="button"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="menu"
                    onClick={() =>
                      setIsUserMenuOpen((previousValue) => !previousValue)
                    }
                    className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-1 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 sm:px-2"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold uppercase text-zinc-700">
                      {userInitial}
                    </span>

                    <span className="hidden max-w-32 truncate text-sm font-medium text-zinc-700 sm:block">
                      {user?.firstName
                        ? `${user.firstName}${
                            user.lastName ? ` ${user.lastName}` : ""
                          }`
                        : user?.email}
                    </span>

                    <span
                      aria-hidden="true"
                      className="hidden text-zinc-400 sm:block"
                    >
                      ⌄
                    </span>
                  </button>

                  {isUserMenuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 mt-3 w-[calc(100vw-2rem)] max-w-64 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl"
                    >
                      <div className="px-3 py-2">
                        <p className="truncate text-sm font-medium text-zinc-900">
                          {user?.firstName
                            ? `${user.firstName}${
                                user.lastName ? ` ${user.lastName}` : ""
                              }`
                            : "Kullanıcı"}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-zinc-400">
                          {user?.email}
                        </p>
                      </div>

                      <div className="my-1 h-px bg-zinc-100" />

                      <button
                        type="button"
                        role="menuitem"
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
                <Link
                  href="/giris"
                  className="whitespace-nowrap text-sm text-zinc-600 transition hover:text-zinc-950"
                >
                  Giriş yap
                </Link>

                <Link
                  href="/kayit"
                  className="whitespace-nowrap rounded-full border border-zinc-300 px-3 py-2 text-sm text-zinc-900 transition hover:border-zinc-500 sm:px-4"
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
