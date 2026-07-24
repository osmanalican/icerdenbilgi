"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "./AuthProvider";
import { QueryProvider } from "./QueryProvider";
import type { SessionUser } from "@/shared/auth";

type ProvidersProps = {
  children: ReactNode;
  initialUser: SessionUser | null;
};

export function Providers({ children, initialUser }: ProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
    </QueryProvider>
  );
}
