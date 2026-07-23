import { ExperienceType } from "./experience";

export type CompanyExperience = {
  id: string;
  title: string;
  content: string;
  position: string;
  type: ExperienceType;
  isAnonymous: boolean;
  createdAt: string;
  user: {
    firstName: string | null;
    lastName: string | null;
  };
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  experienceCount: number;
  experiences: CompanyExperience[];
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type GetCompanyResponse = {
  company: Company;
  pagination: Pagination;
};
