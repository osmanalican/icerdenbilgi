import { createUser, findUserByFireBaseUid } from "./auth.repository";

type SyncUserInput = {
  firebaseUid: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
};

function splitFullName(name?: string | null) {
  if (!name) {
    return {
      firstName: null,
      lastName: null,
    };
  }

  const [firstName, ...rest] = name.trim().split(" ");

  return {
    firstName,
    lastName: rest.length > 0 ? rest.join(" ") : null,
  };
}

export async function syncUserService(input: SyncUserInput) {
  const existingUser = await findUserByFireBaseUid(input.firebaseUid);

  if (existingUser) {
    return existingUser;
  }

  const { firstName, lastName } = splitFullName(input.name);

  return createUser({
    firebaseUid: input.firebaseUid,
    email: input.email,
    firstName,
    lastName,
    avatarUrl: input.avatarUrl,
  });
}
