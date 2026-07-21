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
  experiences: CompanyExperience[];
};

export type GetCompanyResponse = {
  company: Company;
};
