"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "@/shared/context";
import { getSession, SessionUser } from "@/shared/auth";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshSession();
  }, [refreshSession]);

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
