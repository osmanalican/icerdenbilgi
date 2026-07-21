import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  children: ReactNode;
};

export function AuthCard({
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkTo,
  children,
}: AuthCardProps) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-6 py-16">
      <div className="w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
            {title}
          </h1>

          <p className="mt-3 text-zinc-600">{description}</p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          {children}
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          {footerText}{" "}
          <Link
            href={footerLinkTo}
            className="font-medium text-zinc-950 hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </section>
  );
}
