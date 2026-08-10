import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import { Providers } from "@/providers";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/shared/components/Footer";
import { getServerSession } from "@/shared/auth/getServerSession";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://icerdenbilgi.vercel.app"),

  title: {
    default: "İçerdenBilgi",
    template: "%s | İçerdenBilgi",
  },

  description:
    "Şirketlerin mülakat süreçlerini ve çalışma deneyimlerini gerçek kullanıcı paylaşımlarıyla keşfet.",

  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "İçerdenBilgi",
    title: "İçerdenBilgi",
    description:
      "Şirketlerin mülakat süreçlerini ve çalışma deneyimlerini gerçek kullanıcı paylaşımlarıyla keşfet.",
    url: "/",
  },

  twitter: {
    card: "summary_large_image",
    title: "İçerdenBilgi",
    description:
      "Şirketlerin mülakat süreçlerini ve çalışma deneyimlerini gerçek kullanıcı paylaşımlarıyla keşfet.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="tr">
      <body
        className={`${inter.className} min-h-screen bg-white text-zinc-950 antialiased`}
      >
        <Providers initialUser={session?.user ?? null}>
          <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 pt-16">{children}</main>

            <Footer />
          </div>
        </Providers>

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
