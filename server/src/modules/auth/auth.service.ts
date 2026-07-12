import {
  createUser,
  findUserByFireBaseUid,
  updateUserByFirebaseUid,
} from "./auth.repository";

type SyncUserInput = {
  firebaseUid: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
};

function splitFullName(name?: string | null) {
  const normalizedName = name?.trim();

  if (!normalizedName) {
    return {
      firstName: null,
      lastName: null,
    };
  }

  const [firstName, ...rest] = normalizedName.split(/\s+/);

  return {
    firstName,
    lastName: rest.length > 0 ? rest.join(" ") : null,
  };
}

export async function syncUserService(input: SyncUserInput) {
  const existingUser = await findUserByFireBaseUid(input.firebaseUid);
  const { firstName, lastName } = splitFullName(input.name);

  if (existingUser) {
    return updateUserByFirebaseUid(input.firebaseUid, {
      email: input.email,
      firstName: firstName ?? existingUser.firstName,
      lastName: lastName ?? existingUser.lastName,
      avatarUrl: input.avatarUrl ?? existingUser.avatarUrl,
    });
  }

  return createUser({
    firebaseUid: input.firebaseUid,
    email: input.email,
    firstName,
    lastName,
    avatarUrl: input.avatarUrl,
  });
}
