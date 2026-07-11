export type ExperienceType = 'interview' | 'work' | 'internship' | 'other';

export type ExperienceFormValues = {
  companyName: string;
  position: string;
  title: string;
  type: ExperienceType;
  content: string;
  isAnonymous: boolean;
};
