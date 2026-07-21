import { FirebaseError } from "firebase/app";

export function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return "Beklenmeyen bir hata oluştu. Lütfen tekrar dene.";
  }

  switch (error.code) {
    case "auth/invalid-credential":
      return "Email veya şifre hatalı.";

    case "auth/invalid-email":
      return "Geçerli bir email adresi gir.";

    case "auth/user-disabled":
      return "Bu kullanıcı hesabı devre dışı bırakılmış.";

    case "auth/too-many-requests":
      return "Çok fazla başarısız deneme yapıldı. Bir süre sonra tekrar dene.";

    case "auth/network-request-failed":
      return "Bağlantı hatası oluştu. İnternet bağlantını kontrol et.";

    case "auth/popup-closed-by-user":
      return "Google giriş penceresi tamamlanmadan kapatıldı.";

    case "auth/popup-blocked":
      return "Google giriş penceresi tarayıcı tarafından engellendi.";

    default:
      return "Giriş işlemi tamamlanamadı. Lütfen tekrar dene.";
  }
}
