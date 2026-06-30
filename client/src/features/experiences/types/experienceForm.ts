export type ExperienceType = 'interview' | 'work' | 'internship' | 'other';

export type ExperienceFormValues = {
  companyName: string;
  position: string;
  type: ExperienceType;
  title: string;
  content: string;
  isAnonymous: boolean;
};