import type { ExperienceType } from "./experience";

export type ExperienceStatus = "PUBLISHED" | "PENDING" | "REJECTED";

export type MyExperience = {
  id: string;
  title: string;
  content: string;
  position: string;
  type: ExperienceType;
  status: ExperienceStatus;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
  helpfulCount: number;

  company: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
  };
};

export type MyExperiencesPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetMyExperiencesResponse = {
  experiences: MyExperience[];
  pagination: MyExperiencesPagination;
};
