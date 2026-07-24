"use client";

import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "@/shared/context";
import { getSession } from "@/shared/auth";
import type { SessionUser } from "@/shared/auth";

type AuthProviderProps = {
  children: ReactNode;
  initialUser: SessionUser | null;
};

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState(false);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);

    try {
      const session = await getSession();

      setUser(session?.user ?? null);
    } catch (error) {
      console.error("Session verification failed:", error);

      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      refreshSession,
    }),
    [user, isLoading, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
