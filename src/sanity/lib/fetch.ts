import { draftMode } from "next/headers";
import { getSanityClient, getSanityPreviewClient } from "./client";
import { isSanityConfigured } from "../env";
import {
  CONTACT_PAGE_QUERY,
  FAQS_BY_CATEGORY_QUERY,
  HOME_PAGE_QUERY,
  JOB_SECTORS_QUERY,
  JOB_VACANCIES_QUERY,
  MANPOWER_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  TOURS_QUERY,
  TOUR_BY_SLUG_QUERY,
  TRAVEL_PAGE_QUERY,
  TRAVEL_SERVICES_QUERY,
} from "./queries";
import {
  defaultContactPageContent,
  defaultHomePageContent,
  defaultJobVacancies,
  defaultManpowerFaqs,
  defaultManpowerPageContent,
  defaultSiteSettings,
  defaultTours,
  defaultTravelFaqs,
  defaultTravelPageContent,
  defaultTravelServices,
} from "@/data/cms-fallbacks";
import type {
  CompanyInfo,
  ContactPageContent,
  FaqItem,
  HomePageContent,
  JobVacancy,
  ManpowerPageContent,
  ManpowerSector,
  SiteSettings,
  TourPackage,
  TravelPageContent,
  TravelService,
} from "@/types/content";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

/**
 * Merges a partial CMS payload onto typed fallback defaults so partially populated
 * Sanity documents never produce undefined fields or broken UI.
 */
function mergeWithFallback<T>(fallback: T, override: unknown): T {
  if (override === null || override === undefined) {
    return fallback;
  }

  if (Array.isArray(fallback)) {
    return (Array.isArray(override) && override.length > 0
      ? override
      : fallback) as unknown as T;
  }

  if (isPlainObject(fallback) && isPlainObject(override)) {
    const result: Record<string, unknown> = { ...fallback };
    for (const key of Object.keys(override)) {
      const overrideVal = override[key];
      const fallbackVal = fallback[key];
      if (overrideVal === undefined || overrideVal === null) {
        continue;
      }
      if (typeof overrideVal === "string" && overrideVal.trim() === "" && typeof fallbackVal === "string" && fallbackVal !== "") {
        continue;
      }
      if (isPlainObject(fallbackVal) && isPlainObject(overrideVal)) {
        result[key] = mergeWithFallback(fallbackVal, overrideVal);
      } else if (Array.isArray(fallbackVal)) {
        result[key] =
          Array.isArray(overrideVal) && overrideVal.length > 0
            ? overrideVal
            : fallbackVal;
      } else {
        result[key] = overrideVal;
      }
    }
    return result as T;
  }

  return (override ?? fallback) as T;
}

async function resolveDraftMode(): Promise<boolean> {
  try {
    const dm = await draftMode();
    return dm.isEnabled;
  } catch {
    return false;
  }
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  const isDraft = await resolveDraftMode();
  const client = isDraft ? getSanityPreviewClient() : getSanityClient();
  if (!client) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: isDraft ? 0 : 900,
        tags,
      },
    });
  } catch (err) {
    console.warn("[Sanity] Fetch fallback activated:", err);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const cmsData = await sanityFetch<Partial<SiteSettings>>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });
  return mergeWithFallback(defaultSiteSettings, cmsData);
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  const settings = await getSiteSettings();
  return settings.company;
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const cmsData = await sanityFetch<Partial<HomePageContent>>({
    query: HOME_PAGE_QUERY,
    tags: ["homePage"],
  });
  return mergeWithFallback(defaultHomePageContent, cmsData);
}

export async function getTravelPageContent(): Promise<TravelPageContent> {
  const cmsData = await sanityFetch<Partial<TravelPageContent>>({
    query: TRAVEL_PAGE_QUERY,
    tags: ["travelPage"],
  });
  return mergeWithFallback(defaultTravelPageContent, cmsData);
}

export async function getManpowerPageContent(): Promise<ManpowerPageContent> {
  const [cmsData, cmsSectors] = await Promise.all([
    sanityFetch<Partial<ManpowerPageContent>>({
      query: MANPOWER_PAGE_QUERY,
      tags: ["manpowerPage"],
    }),
    sanityFetch<ManpowerSector[]>({
      query: JOB_SECTORS_QUERY,
      tags: ["jobSector"],
    }),
  ]);
  const merged = mergeWithFallback(defaultManpowerPageContent, cmsData);
  if (Array.isArray(cmsSectors) && cmsSectors.length > 0) {
    const validSectors = cmsSectors.filter((s) => Boolean(s?.id && s?.label_en));
    if (validSectors.length > 0) {
      const allTab = defaultManpowerPageContent.candidateHub.sectors[0];
      const deduped = validSectors.filter((s) => s.id !== "all");
      merged.candidateHub.sectors = [allTab, ...deduped];
    }
  }
  return merged;
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  const cmsData = await sanityFetch<Partial<ContactPageContent>>({
    query: CONTACT_PAGE_QUERY,
    tags: ["contactPage"],
  });
  return mergeWithFallback(defaultContactPageContent, cmsData);
}

export async function getTours(): Promise<TourPackage[]> {
  const cmsTours = await sanityFetch<TourPackage[]>({
    query: TOURS_QUERY,
    tags: ["tourPackage"],
  });
  if (Array.isArray(cmsTours) && cmsTours.length > 0) {
    return cmsTours.map((t, index) => {
      const match =
        defaultTours.find((d) => d.slug === t.slug || d.id === t.id) ||
        defaultTours[index];
      return {
        ...mergeWithFallback(match || defaultTours[0], t),
        image: t.image || match?.image || "/images/tours/garni-temple.jpg",
        highlights_en: Array.isArray(t.highlights_en) ? t.highlights_en : match?.highlights_en || [],
        highlights_hy: Array.isArray(t.highlights_hy) ? t.highlights_hy : match?.highlights_hy || [],
        inclusions_en: Array.isArray(t.inclusions_en) ? t.inclusions_en : match?.inclusions_en || [],
        inclusions_hy: Array.isArray(t.inclusions_hy) ? t.inclusions_hy : match?.inclusions_hy || [],
      };
    });
  }
  return defaultTours.filter((t) => t.isPublished !== false);
}

export async function getTourBySlug(slug: string): Promise<TourPackage | null> {
  const cmsTour = await sanityFetch<TourPackage | null>({
    query: TOUR_BY_SLUG_QUERY,
    params: { slug },
    tags: ["tourPackage", `tourPackage:${slug}`],
  });

  if (cmsTour) {
    const fallbackMatch =
      defaultTours.find((d) => d.slug === slug || d.id === cmsTour.id) ||
      defaultTours[0];
    return {
      ...mergeWithFallback(fallbackMatch, cmsTour),
      image: cmsTour.image || fallbackMatch?.image || "/images/tours/garni-temple.jpg",
    };
  }

  return defaultTours.find((t) => t.slug === slug && t.isPublished !== false) || null;
}

export async function getTravelServices(): Promise<TravelService[]> {
  const cmsServices = await sanityFetch<TravelService[]>({
    query: TRAVEL_SERVICES_QUERY,
    tags: ["travelService"],
  });
  if (Array.isArray(cmsServices) && cmsServices.length > 0) {
    return cmsServices.map((s, index) => {
      const match =
        defaultTravelServices.find((d) => d.slug === s.slug || d.id === s.id) ||
        defaultTravelServices[index];
      return {
        ...mergeWithFallback(match || defaultTravelServices[0], s),
        image: s.image || match?.image || "/images/tours/wings-of-tatev.jpg",
        features_en: Array.isArray(s.features_en) ? s.features_en : match?.features_en || [],
        features_hy: Array.isArray(s.features_hy) ? s.features_hy : match?.features_hy || [],
      };
    });
  }
  return defaultTravelServices.filter((s) => s.isPublished !== false);
}

export async function getJobVacancies(): Promise<JobVacancy[]> {
  const cmsVacancies = await sanityFetch<JobVacancy[]>({
    query: JOB_VACANCIES_QUERY,
    tags: ["jobVacancy"],
  });
  if (Array.isArray(cmsVacancies) && cmsVacancies.length > 0) {
    return cmsVacancies
      .filter((v) => v.isPublished !== false)
      .map((v, index) => {
        const match =
          defaultJobVacancies.find((d) => d.id === v.id) ||
          defaultJobVacancies[index];
        return {
          ...mergeWithFallback(match || defaultJobVacancies[0], v),
          requirements_en: Array.isArray(v.requirements_en) ? v.requirements_en : match?.requirements_en || [],
          requirements_hy: Array.isArray(v.requirements_hy) ? v.requirements_hy : match?.requirements_hy || [],
          benefits_en: Array.isArray(v.benefits_en) ? v.benefits_en : match?.benefits_en || [],
          benefits_hy: Array.isArray(v.benefits_hy) ? v.benefits_hy : match?.benefits_hy || [],
        };
      });
  }
  return defaultJobVacancies.filter((v) => v.isPublished);
}

export async function getFaqs(category: "travel" | "manpower"): Promise<FaqItem[]> {
  const cmsFaqs = await sanityFetch<FaqItem[]>({
    query: FAQS_BY_CATEGORY_QUERY,
    params: { category },
    tags: ["faqItem"],
  });
  if (Array.isArray(cmsFaqs) && cmsFaqs.length > 0) {
    return cmsFaqs.filter((f) => f.isPublished !== false);
  }
  return category === "travel" ? defaultTravelFaqs : defaultManpowerFaqs;
}
