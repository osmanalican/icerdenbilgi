import { apiFetch } from "./apiFetch";

export type HelpfulVotesResponse = {
  experienceIds: string[];
};

export async function getHelpfulVotes(): Promise<HelpfulVotesResponse> {
  const response = await apiFetch("/experiences/helpful-votes", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Helpful votes could not be fetched.");
  }

  return response.json() as Promise<HelpfulVotesResponse>;
}
