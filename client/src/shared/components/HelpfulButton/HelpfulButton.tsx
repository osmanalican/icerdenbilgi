"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ThumbsUp } from "lucide-react";

import { toggleHelpfulVote } from "@/shared/api/client";
import { useAuth } from "@/shared/hooks";

type HelpfulButtonProps = {
  experienceId: string;
  initialHelpfulCount: number;
  initialHasVoted: boolean;
};

export function HelpfulButton({
  experienceId,
  initialHelpfulCount,
  initialHasVoted,
}: HelpfulButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isAuthenticated } = useAuth();

  const [helpfulCount, setHelpfulCount] = useState(initialHelpfulCount);
  const [isHelpful, setIsHelpful] = useState(initialHasVoted);
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    if (!isAuthenticated) {
      const currentPath = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      router.push(`/giris?redirect=${encodeURIComponent(currentPath)}`);

      return;
    }

    if (isPending) {
      return;
    }

    const previousIsHelpful = isHelpful;
    const previousHelpfulCount = helpfulCount;

    const optimisticIsHelpful = !previousIsHelpful;
    const optimisticHelpfulCount = previousIsHelpful
      ? Math.max(0, previousHelpfulCount - 1)
      : previousHelpfulCount + 1;

    setIsHelpful(optimisticIsHelpful);
    setHelpfulCount(optimisticHelpfulCount);
    setIsPending(true);

    try {
      const result = await toggleHelpfulVote(experienceId);

      setIsHelpful(result.isHelpful);
      setHelpfulCount(result.helpfulCount);
    } catch (error) {
      setIsHelpful(previousIsHelpful);
      setHelpfulCount(previousHelpfulCount);

      console.error("Helpful vote failed:", error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isHelpful}
      className="inline-flex items-center cursor-pointer gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
    >
      <ThumbsUp
        className={`h-4 w-4 ${isHelpful ? "fill-current" : ""}`}
        aria-hidden="true"
      />

      <span>Faydalı</span>

      <span>{helpfulCount}</span>
    </button>
  );
}
