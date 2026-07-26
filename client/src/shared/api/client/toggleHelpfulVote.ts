import { apiFetch } from "./apiFetch";

type ToggleHelpfulVoteResponse = {
  isHelpful: boolean;
  helpfulCount: number;
};

export async function toggleHelpfulVote(
  experienceId: string,
): Promise<ToggleHelpfulVoteResponse> {
  const response = await apiFetch(
    `/experiences/${experienceId}/helpful`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Helpful vote could not be updated.");
  }

  return response.json() as Promise<ToggleHelpfulVoteResponse>;
}