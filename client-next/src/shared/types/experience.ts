export type ExperienceType = "INTERVIEW" | "WORK" | "INTERNSHIP" | "OTHER";

export type LatestExperience = {
  id: string;
  title: string;
  content: string;
  position: string;
  type: ExperienceType;
  isAnonymous: boolean;
  createdAt: string;
  company: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
  };
  user: {
    firstName: string | null;
    lastName: string | null;
  };
  _count: {
    helpfulVotes: number;
  };
};

export type ExperiencesPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetLatestExperiencesResponse = {
  experiences: LatestExperience[];
  pagination: ExperiencesPagination;
};
