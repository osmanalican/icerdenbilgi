export type ExperienceFormType = 'interview' | 'work' | 'internship' | 'other';

export type ExperienceFormValues = {
  companyName: string;
  position: string;
  title: string;
  type: ExperienceFormType;
  content: string;
  isAnonymous: boolean;
};
