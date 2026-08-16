import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "İçerdenBilgi kişisel verilerin işlenmesine ilişkin KVKK Aydınlatma Metni.",
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: "1. Veri Sorumlusu",
    content: (
      <>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında,
          İçerdenBilgi platformunun işletilmesi sırasında işlenen kişisel
          veriler bakımından veri sorumlusu, platformu işleten gerçek kişidir.
        </p>

        <p className="mt-3">
          Kişisel verilerinizle ilgili talepleriniz için bizimle{" "}
          <a
            href="mailto:iletisim@icerdenbilgi.com"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            iletisim@icerdenbilgi.com
          </a>{" "}
          adresi üzerinden iletişime geçebilirsiniz.
        </p>
      </>
    ),
  },
  {
    title: "2. İşlenen Kişisel Veriler",
    content: (
      <>
        <p>
          İçerdenBilgi&apos;yi kullanmanız sırasında, sunduğunuz hizmetlere ve
          kullanım şeklinize bağlı olarak aşağıdaki kişisel veriler işlenebilir:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Ad ve soyad bilgisi,</li>
          <li>E-posta adresi,</li>
          <li>Hesap ve oturum bilgileri,</li>
          <li>Platform üzerinde paylaştığınız deneyimler ve içerikler,</li>
          <li>
            Platformun güvenliğinin sağlanması amacıyla oluşabilecek teknik
            kayıtlar.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Kişisel Verilerin İşlenme Amaçları",
    content: (
      <>
        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenebilir:</p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Kullanıcı hesabının oluşturulması ve yönetilmesi,</li>
          <li>Kimlik doğrulama ve oturum işlemlerinin gerçekleştirilmesi,</li>
          <li>
            Deneyim paylaşma, düzenleme ve diğer platform özelliklerinin
            sunulması,
          </li>
          <li>
            Platform güvenliğinin ve kötüye kullanım önlemlerinin sağlanması,
          </li>
          <li>
            Kullanıcı taleplerinin ve iletişim başvurularının karşılanması,
          </li>
          <li>Yasal yükümlülüklerin yerine getirilmesi.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi",
    content: (
      <p>
        Kişisel verileriniz; üyelik oluşturmanız, platformu kullanmanız, deneyim
        paylaşmanız veya bizimle iletişime geçmeniz sırasında elektronik ortamda
        elde edilmektedir. Veriler, KVKK&apos;nın 5. maddesinde belirtilen
        sözleşmenin kurulması veya ifası, veri sorumlusunun hukuki
        yükümlülüklerinin yerine getirilmesi ve meşru menfaat gibi ilgili
        kişisel veri işleme şartlarına dayanılarak işlenebilir.
      </p>
    ),
  },
  {
    title: "5. Kişisel Verilerin Aktarılması",
    content: (
      <>
        <p>
          Platformun çalışması için gerekli olduğu ölçüde kişisel veriler,
          altyapı ve hizmet sağlayıcılarla paylaşılabilir.
        </p>

        <p className="mt-3">
          Bu kapsamda kimlik doğrulama, barındırma, veri tabanı, e-posta ve
          benzeri teknik hizmetlerden yararlanılabilir. Ayrıca hukuken zorunlu
          olması halinde kişisel veriler yetkili kamu kurum ve kuruluşlarıyla
          paylaşılabilir.
        </p>
      </>
    ),
  },
  {
    title: "6. Verilerin Saklanması ve Silinmesi",
    content: (
      <p>
        Kişisel veriler, işlenme amacı için gerekli olan süre boyunca ve ilgili
        mevzuatta öngörülen sürelerle sınırlı olarak saklanır. İşlenmesini
        gerektiren sebeplerin ortadan kalkması halinde kişisel veriler, mevzuata
        uygun şekilde silinir, yok edilir veya anonim hale getirilir.
        Kullanıcılar hesaplarını platformdaki profil alanından silebilir.
      </p>
    ),
  },
  {
    title: "7. KVKK Kapsamındaki Haklarınız",
    content: (
      <>
        <p>
          KVKK&apos;nın 11. maddesi kapsamında kişisel verilerinizle ilgili
          olarak; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna
          ilişkin bilgi talep etme, düzeltilmesini veya şartları oluşmuşsa
          silinmesini isteme ve Kanun kapsamında sahip olduğunuz diğer hakları
          kullanabilirsiniz.
        </p>

        <p className="mt-3">
          Bu kapsamdaki taleplerinizi{" "}
          <a
            href="mailto:iletisim@icerdenbilgi.com"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            iletisim@icerdenbilgi.com
          </a>{" "}
          adresine iletebilirsiniz.
        </p>
      </>
    ),
  },
  {
    title: "8. Güncellemeler",
    content: (
      <p>
        Bu Aydınlatma Metni; mevzuattaki, platformdaki veya kişisel veri işleme
        faaliyetlerindeki değişikliklere bağlı olarak güncellenebilir. Güncel
        metin İçerdenBilgi üzerinden yayımlanır.
      </p>
    ),
  },
];

export default function KvkkPage() {
  return (
    <div className="min-h-full bg-linear-to-b from-indigo-50/40 via-white to-white">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="border-b border-zinc-200 pb-8">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">
            Yasal
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            KVKK Aydınlatma Metni
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
            İçerdenBilgi kapsamında kişisel verilerinizin nasıl işlendiği, hangi
            amaçlarla kullanıldığı ve haklarınız hakkında bilgi.
          </p>

          <p className="mt-4 text-xs text-zinc-400">
            Son güncelleme: 15 Ağustos 2026
          </p>
        </header>

        <div className="mt-8 space-y-4">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
                {section.title}
              </h2>

              <div className="mt-3 text-sm leading-7 text-zinc-600">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 sm:p-6">
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-semibold text-zinc-950">
                Kişisel verilerinizle ilgili bir talebiniz mi var?
              </h2>

              <p className="mt-1 text-sm leading-6 text-zinc-600">
                KVKK kapsamındaki başvurularınız için bizimle iletişime
                geçebilirsiniz.
              </p>

              <a
                href="mailto:iletisim@icerdenbilgi.com"
                className="mt-3 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                iletisim@icerdenbilgi.com
              </a>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-zinc-200 pt-6 text-sm">
          <Link
            href="/gizlilik"
            className="font-medium text-zinc-500 transition hover:text-indigo-600"
          >
            Gizlilik Politikası
          </Link>

          <Link
            href="/iletisim"
            className="font-medium text-zinc-500 transition hover:text-indigo-600"
          >
            İletişim
          </Link>

          <Link
            href="/"
            className="font-medium text-zinc-500 transition hover:text-indigo-600"
          >
            Ana sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}
