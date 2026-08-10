import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik ve Kişisel Veriler",
  description:
    "İçerdenBilgi'nin kişisel verilerin işlenmesine ve gizliliğe ilişkin bilgilendirme metni.",
  alternates: {
    canonical: "/gizlilik",
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-linear-to-b from-indigo-50/40 via-zinc-50 to-zinc-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
            İçerdenBilgi
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950">
            Gizlilik ve Kişisel Veriler
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Son güncelleme: 10 Ağustos 2026
          </p>

          <div className="mt-8 space-y-8 text-sm leading-7 text-zinc-600 sm:text-base">
            <section>
              <h2 className="text-lg font-semibold text-zinc-950">
                1. Hangi verileri işliyoruz?
              </h2>

              <p className="mt-2">
                İçerdenBilgi hesabı oluşturduğunda e-posta adresin, varsa ad ve
                soyad bilgilerin ile hesap kimliğin işlenebilir. Platformda
                paylaştığın deneyimler, deneyim türü, pozisyon, şirket bilgisi
                ve paylaşım tercihlerin de hizmetin sunulması amacıyla
                saklanabilir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-950">
                2. Verileri neden kullanıyoruz?
              </h2>

              <p className="mt-2">
                Veriler; hesabının oluşturulması ve güvenli şekilde
                çalıştırılması, deneyim paylaşma ve yönetme özelliklerinin
                sunulması, kötüye kullanımın önlenmesi ve platformun işletilmesi
                amacıyla kullanılır.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-950">
                3. Anonim paylaşımlar
              </h2>

              <p className="mt-2">
                Bir deneyimi anonim paylaşmayı seçtiğinde ad ve soyad bilgin
                diğer kullanıcılara gösterilmez. Bununla birlikte paylaşım,
                sistem içerisinde hesabınla ilişkilendirilebilir; bu ilişki
                içeriğini düzenleyebilmen, silebilmen ve platform güvenliğinin
                sağlanması için gereklidir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-950">
                4. Üçüncü taraf hizmetler
              </h2>

              <p className="mt-2">
                İçerdenBilgi altyapısında kimlik doğrulama, veri tabanı ve
                barındırma hizmetleri için üçüncü taraf teknoloji
                sağlayıcılarından yararlanılabilir. Bu hizmetler kapsamında
                veriler yalnızca platformun çalışması için gerekli ölçüde
                işlenebilir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-950">
                5. Çerezler ve oturum bilgileri
              </h2>

              <p className="mt-2">
                Giriş yaptığında oturumunun güvenli şekilde sürdürülebilmesi
                için zorunlu oturum çerezleri kullanılabilir. Bu çerezler
                hesabına giriş yapma ve kimliğini doğrulama gibi temel
                işlevlerin çalışması için kullanılır.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-950">
                6. Verilerin saklanması
              </h2>

              <p className="mt-2">
                Kişisel veriler, hizmetin sunulması ve ilgili yükümlülüklerin
                yerine getirilmesi için gerekli olduğu süre boyunca
                saklanabilir. Gerekli olmayan veriler uygun yöntemlerle
                silinebilir veya anonim hale getirilebilir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-950">
                7. Hakların
              </h2>

              <p className="mt-2">
                Kişisel verilerinle ilgili olarak verilerinin işlenip
                işlenmediğini öğrenme, işlenen veriler hakkında bilgi talep etme
                ve mevzuat kapsamında düzeltme veya silme talebinde bulunma
                haklarına sahip olabilirsin.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-950">
                8. Değişiklikler
              </h2>

              <p className="mt-2">
                Bu metin, platformdaki özellikler veya kullanılan hizmetler
                değiştikçe güncellenebilir. Güncel sürüm her zaman bu sayfada
                yayımlanır.
              </p>
            </section>
          </div>

          <div className="mt-10 border-t border-zinc-100 pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Ana sayfaya dön
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
