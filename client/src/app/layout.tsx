import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "@/providers";
import { Header } from "@/shared/components/Header";
import { Footer } from "@/shared/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "İçerdenBilgi",
    template: "%s | İçerdenBilgi",
  },
  description:
    "Şirketlerin mülakat süreçlerini ve çalışma deneyimlerini gerçek kullanıcı paylaşımlarıyla keşfet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.className} min-h-screen bg-white text-zinc-950 antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 pt-16">{children}</main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
