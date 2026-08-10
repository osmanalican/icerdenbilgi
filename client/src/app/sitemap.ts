import type { MetadataRoute } from "next";

type SitemapCompany = {
  slug: string;
  updatedAt: string;
};

type SitemapCompaniesResponse = {
  companies: SitemapCompany[];
};

const baseUrl = "https://icerdenbilgi.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL is missing.");
  }

  const response = await fetch(`${apiUrl}/companies/sitemap`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }

  const data = (await response.json()) as SitemapCompaniesResponse;

  const companyPages: MetadataRoute.Sitemap = data.companies.map((company) => ({
    url: `${baseUrl}/${company.slug}`,
    lastModified: new Date(company.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...companyPages,
  ];
}
