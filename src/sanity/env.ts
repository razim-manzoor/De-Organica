export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim();

export const readToken = (process.env.SANITY_API_READ_TOKEN || "").trim();

export const revalidateSecret = (
  process.env.SANITY_REVALIDATE_SECRET || ""
).trim();

/**
 * True only when a non-empty valid Sanity projectId is configured.
 * Allows local builds, CI, and fallback mode to operate seamlessly without Sanity credentials.
 */
export const isSanityConfigured = Boolean(
  projectId && /^[a-z0-9-]+$/i.test(projectId)
);
