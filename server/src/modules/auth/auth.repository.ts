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

type UpdateUserFirebaseUidData = UpdateUserData & {
  firebaseUid: string;
};

export function findUserByFireBaseUid(firebaseUid: string) {
  return prisma.user.findUnique({
    where: { firebaseUid },
  });
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
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

export function updateUserById(id: string, data: UpdateUserFirebaseUidData) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export function deleteUserById(id: string) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}
