"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Plus } from "lucide-react";

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-sm shadow-indigo-200 transition group-hover:scale-105">
            İ
          </span>

          <span className="text-base font-bold tracking-tight text-zinc-950 sm:text-lg">
            İçerden
            <span className="text-indigo-600">Bilgi</span>
          </span>
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
                  className="hidden h-9 items-center justify-center gap-1.5 rounded-full bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:inline-flex"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Deneyim ekle
                </Link>

                <Link
                  href="/paylas"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 sm:hidden"
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
                    className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-1 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/50 sm:px-2"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold uppercase text-indigo-700">
                      {userInitial}
                    </span>

                    <span className="hidden max-w-32 truncate text-sm font-medium text-zinc-700 sm:block">
                      {user?.firstName
                        ? `${user.firstName}${
                            user.lastName ? ` ${user.lastName}` : ""
                          }`
                        : user?.email}
                    </span>

                    <ChevronDown
                      className={[
                        "hidden h-3.5 w-3.5 text-zinc-400 transition sm:block",
                        isUserMenuOpen ? "rotate-180" : "",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 mt-3 w-[calc(100vw-2rem)] max-w-64 rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl"
                    >
                      <div className="px-3 py-2">
                        <p className="truncate text-sm font-semibold text-zinc-900">
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
                        className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-zinc-600 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
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
                  className="whitespace-nowrap text-sm font-medium text-zinc-600 transition hover:text-indigo-600"
                >
                  Giriş yap
                </Link>

                <Link
                  href="/kayit"
                  className="whitespace-nowrap rounded-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:px-4"
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
