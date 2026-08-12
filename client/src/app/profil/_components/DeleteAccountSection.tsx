"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, LoaderCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteAccount } from "@/shared/api/client";
import {} from "@/shared/auth";
import { logout } from "@/shared/firebase";
import { ConfirmDialog } from "@/shared/components";
import { useAuth } from "@/shared/hooks";

export function DeleteAccountSection() {
  const router = useRouter();

  const { refreshSession } = useAuth();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,

    onSuccess: async () => {
      setIsDialogOpen(false);

      try {
        await logout();
        await refreshSession();
      } catch (error) {
        console.error("Client auth cleanup failed:", error);
      }

      toast.success("Hesabın kalıcı olarak silindi.");

      router.replace("/");
      router.refresh();
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Hesap silinirken beklenmeyen bir hata oluştu.",
      );
    },
  });

  function handleDeleteAccount() {
    deleteAccountMutation.mutate();
  }

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-red-200 bg-white shadow-sm">
        <div className="border-b border-red-100 bg-red-50/70 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-semibold text-zinc-950">Tehlikeli bölge</h2>

              <p className="mt-0.5 text-sm text-zinc-500">
                Bu işlemler geri alınamaz.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h3 className="font-semibold text-zinc-950">
                Hesabı kalıcı olarak sil
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Hesabını sildiğinde hesap bilgilerin, paylaştığın deneyimler ve
                hesabına bağlı oylar kalıcı olarak silinir. Bu işlem geri
                alınamaz.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              disabled={deleteAccountMutation.isPending}
              className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleteAccountMutation.isPending ? (
                <LoaderCircle
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              )}

              {deleteAccountMutation.isPending
                ? "Siliniyor..."
                : "Hesabımı sil"}
            </button>
          </div>
        </div>
      </section>

      <ConfirmDialog
        open={isDialogOpen}
        title="Hesabını kalıcı olarak sil"
        description="Hesabın, paylaştığın tüm deneyimler ve hesabına bağlı veriler kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam etmek istediğine emin misin?"
        confirmLabel="Hesabımı kalıcı olarak sil"
        isLoading={deleteAccountMutation.isPending}
        onConfirm={handleDeleteAccount}
        onCancel={() => setIsDialogOpen(false)}
      />
    </>
  );
}
