import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from './config';

const googleProvider = new GoogleAuthProvider();

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function registerWithEmail(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const credentials = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(credentials.user, {
    displayName: `${firstName.trim()} ${lastName.trim()}`,
  });

  await credentials.user.reload();
  await credentials.user.getIdToken(true);

  return credentials;
}

export function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}
