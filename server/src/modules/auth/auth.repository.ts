import { prisma } from "../../lib/prisma";

type CreateUserData = {
  firebaseUid: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
};

type UpdateUserData = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
};

export function findUserByFireBaseUid(firebaseUid: string) {
  return prisma.user.findUnique({
    where: { firebaseUid },
  });
}

export function createUser(data: CreateUserData) {
  return prisma.user.create({
    data,
  });
}

export function updateUserByFirebaseUid(
  firebaseUid: string,
  data: UpdateUserData,
) {
  return prisma.user.update({
    where: { firebaseUid },
    data,
  });
}
