import type { MetadataRoute } from "next";

type SitemapCompany = {
  slug: string;
  updatedAt: string;
};

type SitemapCompaniesResponse = {
  companies: SitemapCompany[];
};

const baseUrl = "https://icerdenbilgi.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return staticPages;
  }

  try {
    const response = await fetch(`${apiUrl}/companies/sitemap`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return staticPages;
    }

    const data = (await response.json()) as SitemapCompaniesResponse;

    const companyPages: MetadataRoute.Sitemap = data.companies.map(
      (company) => ({
        url: `${baseUrl}/${company.slug}`,
        lastModified: new Date(company.updatedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    );

    return [...staticPages, ...companyPages];
  } catch (error) {
    console.error("Sitemap companies could not be fetched:", error);

    return staticPages;
  }
}
