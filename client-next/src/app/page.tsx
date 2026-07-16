import type { Metadata } from "next";

import { HeroSection, RecentExperiences } from "./_components";
import { getLatestExperiences } from "@/shared/api/server";

export const metadata: Metadata = {
  title: "Şirket Mülakatları ve Çalışan Deneyimleri",
  description:
    "Şirketlerin mülakat süreçlerini, çalışma ortamlarını ve gerçek çalışan deneyimlerini anonim paylaşımlarla keşfet.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Şirket Mülakatları ve Çalışan Deneyimleri | İçerdenBilgi",
    description:
      "Gerçek kullanıcıların paylaştığı mülakat ve çalışma deneyimlerini keşfet.",
    type: "website",
    locale: "tr_TR",
    url: "/",
  },
};

export default async function HomePage() {
  const { experiences } = await getLatestExperiences({
    page: 1,
    limit: 6,
  });

  return (
    <>
      <HeroSection />
      <RecentExperiences experiences={experiences} />
    </>
  );
}
