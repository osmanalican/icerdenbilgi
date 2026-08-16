import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/giris", "/kayit", "/paylas", "/profil", "/paylasimlarim"],
    },

    sitemap: "https://icerdenbilgi.com/sitemap.xml",
  };
}
