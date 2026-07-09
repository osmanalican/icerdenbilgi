import { prisma } from "../../lib/prisma";

type CreateExperienceData = {
  title: string;
  content: string;
  position: string;
  type: "INTERVIEW" | "WORK" | "INTERNSHIP" | "OTHER";
  isAnonymous: boolean;
  userId: string;
  companyId: string;
};

export function createExperience(data: CreateExperienceData) {
  return prisma.experience.create({
    data,
  });
}

export function findCompanyBySlug(slug: string) {
  return prisma.company.findUnique({
    where: { slug },
  });
}

export function findUserByFireBaseUid(firebaseUid: string) {
  return prisma.user.findUnique({
    where: { firebaseUid },
  });
}
