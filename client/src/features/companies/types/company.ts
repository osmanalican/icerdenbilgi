export interface CompanyExperience {
  id: string;
  title: string;
  content: string;
  position: string;
  type: 'INTERVIEW' | 'WORK' | 'INTERNSHIP' | 'OTHER';
  isAnonymous: boolean;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  experiences: CompanyExperience[];
}

export interface GetCompanyResponse {
  company: Company;
}
