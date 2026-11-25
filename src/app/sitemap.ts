import type { MetadataRoute } from "next";
import { getTours } from "@/sanity/lib/fetch";

export const revalidate = 60;

const STATIC_LAST_MODIFIED = new Date("2026-11-25T00:00:00Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://deorganica.am";
  const tours = await getTours();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/travel`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/manpower`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const tourRoutes: MetadataRoute.Sitemap = tours
    .filter((t) => Boolean(t.slug))
    .map((t) => ({
      url: `${baseUrl}/travel/${t.slug}`,
      lastModified: t.updatedAt ? new Date(t.updatedAt) : STATIC_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...tourRoutes];
}
