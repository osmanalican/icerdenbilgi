import { FirebaseError } from 'firebase/app';

export function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return 'Beklenmeyen bir hata oluştu.';
  }

  switch (error.code) {
    case 'auth/weak-password':
      return 'Şifre en az 6 karakter olmalı.';

    case 'auth/email-already-in-use':
      return 'Bu email adresi zaten kullanılıyor.';

    case 'auth/invalid-email':
      return 'Geçerli bir email adresi gir.';

    case 'auth/invalid-credential':
      return 'Email veya şifre hatalı.';

    case 'auth/user-not-found':
      return 'Bu email ile kayıtlı kullanıcı bulunamadı.';

    case 'auth/wrong-password':
      return 'Şifre hatalı.';

    default:
      return 'İşlem sırasında bir hata oluştu.';
  }
}
