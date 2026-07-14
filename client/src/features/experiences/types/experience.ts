export type ExperienceType = 'INTERVIEW' | 'WORK' | 'INTERNSHIP' | 'OTHER';

export type LatestExperience = {
  id: string;
  title: string;
  content: string;
  position: string;
  type: string;
  isAnonymous: boolean;
  createdAt: string;
  company: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
  };
  user: {
    firstName: string;
    lastName: string;
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
