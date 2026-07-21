import Link from "next/link";

import { EmptyState } from "@/shared/components";

export default function CompanyNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-6 py-12">
      <EmptyState
        title="Şirket bulunamadı"
        description="Aradığınız şirkete ait bir kayıt bulunamadı."
        action={
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Ana sayfaya dön
          </Link>
        }
      />
    </div>
  );
}
